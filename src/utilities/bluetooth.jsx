import { useState } from "react";

const ServiceUUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const ReadCharistristicUUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";
const WriteCharistristicUUID = "e505ffd3-ecd5-4365-b57d-70202ab71692";

export const useSignalFeed = () => {
  const [device, setDevice] = useState();
  const [service, setService] = useState();
  const [charastirctic, setCharastirctic] = useState();
  console.log(
    "🚀 ~ file: bluetooth.jsx:11 ~ useSignalFeed ~ charastirctic",
    charastirctic
  );

  const disconnect = () => {
    device.gatt.disconnect();
    setService(null);
    setCharastirctic(null);
  };

  const start = async () => {
    charastirctic.startNotifications();
  };

  const stop = async () => {
    charastirctic.stopNotifications();
  };

  const connect = () => {
    navigator.bluetooth
      .requestDevice({
        optionalServices: [ServiceUUID],
        filters: [{ name: "ECG-PPG-Server" }],
      })
      .then((device) => {
        setDevice(device);
        device.gatt.connect().then((gatt) => {
          gatt.getPrimaryService(ServiceUUID).then((service) => {
            setService(service);
            service.getCharacteristic(WriteCharistristicUUID).then((char) => {
              char.writeValue(new Uint8Array([0x8f]).buffer);
            });
          });
        });
      });
  };

  const sendCommand = async (command, callBack) => {
    setCharastirctic(null);
    console.log("called");
    service
      .getCharacteristic(WriteCharistristicUUID)
      .then((char2) => {
        return char2.writeValue(new Uint8Array([command]).buffer);
      })
      .then(() => {
        service
          .getCharacteristic(ReadCharistristicUUID)
          .then((charastirctic) => {
            charastirctic.oncharacteristicvaluechanged = (data) => {
              const ppg = data.srcElement.value.getUint16(0, true);
              const ecg = data.srcElement.value.getInt16(2, true);
              const force = Bytes2Float16(
                data.srcElement.value.getUint16(4, true)
              );

              callBack({ ppg, ecg, force });
            };
            setCharastirctic(charastirctic);
          });
      });
  };

  return {
    device,
    stop,
    start,
    isConnected: service !== undefined,
    channelConnected: !!charastirctic,
    connect,
    disconnect,
    sendCommand,
  };
};

const Bytes2Float16 = (bytes) => {
  let sign = bytes & 0x8000 ? -1 : 1;
  let exponent = ((bytes >> 10) & 0x1f) - 15;
  let significand = bytes & ~(-1 << 10);

  if (exponent === 16)
    return sign * (significand ? Number.NaN : Number.POSITIVE_INFINITY);

  if (exponent === -15) {
    if (significand === 0) return sign * 0.0;
    exponent = -14;
    significand /= 1 << 9;
  } else significand = (significand | (1 << 10)) / (1 << 10);

  return sign * significand * Math.pow(2, exponent);
};
