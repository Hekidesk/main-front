import fullCharge from "@/assets/icon/battery/fullCharge.svg";
import semiFullCharge from "@/assets/icon/battery/semiFullCharge.svg";
import halfCharge from "@/assets/icon/battery/halfCharge.svg";
import semiHalfCharge from "@/assets/icon/battery/semiHalfCharge.svg";
import lowCharge from "@/assets/icon/battery/lowCharge.svg";
import React, { useEffect, useState, useContext } from "react";
import { BluetoothContext } from "@/App";

export default function BatteryCharge() {
  const [charge, setCharge] = useState(0);
  const bluetooth = useContext(BluetoothContext);

  const getCharge = () => {
    if(bluetooth.isConnected)
      bluetooth.GetRemainCharge(setCharge);
  }

  const intervalId = setInterval(getCharge, 1 * 60 * 1000);

  useEffect(() => {
    getCharge();
    return clearInterval(intervalId);
  }, []);



  const BatteryImg =
    charge > 80
      ? fullCharge
      : charge > 60
      ? semiFullCharge
      : charge > 40
      ? halfCharge
      : charge > 20
      ? semiHalfCharge
      : lowCharge;
  return <img src={BatteryImg} alt="My Image" />;
}
