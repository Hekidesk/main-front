import { useState } from "react";

const ServiceUUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const ReadCharistristicUUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";
const WriteCharistristicUUID = "e505ffd3-ecd5-4365-b57d-70202ab71692";

const BATTERY = 0x180f;

export const useSignalFeed = () => {
  const initialState = {
    red: [],
    ecg: [],
    force: [],
    ir: [],
    pcg: [],
    temperature: [],
  };
  const [device, setDevice] = useState();
  const [loading, setLoading] = useState(false);
  const [read_charastirctic, setCharastircticR] = useState();
  const [write_charastirctic, setCharastircticW] = useState();
  const [battery_charastirctic, setCharastircticB] = useState();
  const [duration, setDuration] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [finish, setFinish] = useState(false);
  const [deviceData, setData] = useState(initialState);

  var Data = initialState;
  const FreData = [];

  const Connect = () => {
    console.log("connect");
    navigator.bluetooth
      .requestDevice({
        optionalServices: [ServiceUUID],
        // filters: [{ name: "HekiDesk1.2" }],
        acceptAllDevices: true,
      })
      .then((device) => {
        setLoading(true);
        setDevice(device);
        setIsConnected(true);
        device.gatt.connect().then((gatt) => {
          gatt.getPrimaryService(ServiceUUID).then((service) => {
            service.getCharacteristic(WriteCharistristicUUID).then((char) => {
              char.writeValue(new Uint8Array([0x8f]).buffer);
              setCharastircticW(char);
            });
            service.getCharacteristic(ReadCharistristicUUID).then((char) => {
              setCharastircticR(char);
              setLoading(false);
            });
          });
          gatt.getPrimaryService(BATTERY).then((service) => {
            service.getCharacteristic(0x2a19).then((char) => {
              console.log("char is: ", char);
              setCharastircticB(char);
              setLoading(false);
            });
          });
        });
        device.addEventListener("gattserverdisconnected", () => {
          setIsConnected(false);
          setDevice("");
        });
      });
  };

  const Disconnect = () => {
    console.log("disconnect");
    device?.gatt.disconnect();
    setCharastircticR(null);
  };

  const Start = async () => {
    console.log("start");
    setFinish(0);
    setData([]);
    Data = initialState;
    read_charastirctic?.startNotifications();
    return performance.now();
  };

  const Stop = async (startTime) => {
    console.log("stop");
    setDuration(performance.now() - startTime);
    setFinish(1);
    read_charastirctic?.stopNotifications();
    write_charastirctic.writeValue(new Uint8Array([0x000]).buffer);
  };

  const GetFrequency = () => {
    console.log(deviceData);
    const length = deviceData.length;
    return [Math.ceil(length / Math.ceil(duration / 1000)), duration];
  };

  const SendCommand = async (command, callBack) => {
    if (device?.gatt.connected) {
      console.log("command ", command);
      write_charastirctic?.writeValue(new Uint8Array([command]).buffer);
      if (!callBack) return;
      setData([]);

      if (read_charastirctic)
        read_charastirctic.oncharacteristicvaluechanged = (data) => {
          const red = [];
          const ir = [];
          const ecg = [];
          const force = [];
          const pcg = [];
          const temperature = [];
          if (finish) return;
          if (command === 0x01 || command === 0x02) {
            for (let i = 0; i < 8; i++) {
              red.push(data.srcElement.value.getUint16(8 * i + 0, true));
              ir.push(data.srcElement.value.getUint16(8 * i + 2, true));
              ecg.push(data.srcElement.value.getInt16(8 * i + 4, true));
              force.push(
                Bytes2Float16(data.srcElement.value.getUint16(8 * i + 6, true))
              );
              FreData.push(0);
            }
          } else if (command === 0x03) {
            for (let i = 0; i < 100; i++) {
              pcg.push(data.srcElement.value.getInt16(2 * i, true));
              FreData.push(0);
            }
          } else if (command === 0x04) {
            temperature.push(
              Bytes2Float16(data.srcElement.value.getUint16(0, true))
            );
            FreData.push(0);
          }

          setData(FreData);
          let recieved = {
            red,
            ecg,
            force,
            ir,
            pcg,
            temperature,
          };

          KEYS.map((key) => {
            Data[key] = [...Data[key], ...recieved[key]];
            return "";
          });
          callBack({
            red: Data.red,
            ecg: Data.ecg,
            force: Data.force,
            ir: Data.ir,
            pcg: Data.pcg,
            temperature: Data.temperature,
          });
        };
    }
  };

  const TurnOff = () => {
    setFinish(0);
  };

  const GetRemainCharge = (getBattery) => {
    if (battery_charastirctic) {
      battery_charastirctic.readValue();
      battery_charastirctic.oncharacteristicvaluechanged = (data) => {
        let battery = data.srcElement.value.getUint8(0, true);
        getBattery(battery);
      };
    }
  };

  return {
    Stop,
    Start,
    isConnected,
    isChannelExits: !!read_charastirctic,
    Connect,
    Disconnect,
    SendCommand,
    loading,
    GetFrequency,
    finish,
    TurnOff,
    GetRemainCharge,
  };
};

const Bytes2Float16 = (bytes) => {
  return (bytes & 0x00ff) + (bytes >> 8) / 100;
};

export const KEYS = ["red", "ir", "pcg", "temperature", "ecg", "force"];
