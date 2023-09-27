import React, { useEffect, useState, useContext } from "react";
import { Bar, Battery } from "./CSS";
import { BluetoothContext } from "@/App";

export default function BatteryCharge() {
  const [bars, setBars] = useState(Array(3).fill(false));
  const [charge, setCharge] = useState(Array(3).fill(false));

  const bluetooth = useContext(BluetoothContext);

  useEffect(() => {
    setTimeout(() => {
      bluetooth.GetRemainCharg(setCharge);
    }, 1 * 60 * 1000);
  }, []);

  useEffect(() => {
    if (charge)
      setBars((preBars) => {
        let index = 0;
        let power = Math.round(charge / 33);
        preBars = Array(3).fill(false);
        while (power--) {
          preBars[index] = true;
          index++;
        }
        return preBars;
      });
  }, [charge]);

  return (
    <Battery>
      <Bar
        data-power="33"
        style={{ background: bars[0] ? "#2CAFA4" : "transparent" }}
        down={true}
      ></Bar>
      <Bar
        data-power="66"
        style={{ background: bars[1] ? "#2CAFA4" : "transparent" }}
        middle={true}
      ></Bar>
      <Bar
        data-power="100"
        style={{ background: bars[2] ? "#2CAFA4" : "transparent" }}
        up={true}
      ></Bar>
      {/* <Bar
        data-power="80"
        style={{ background: bars[3] ? "#2CAFA4" : "transparent" }}
      ></Bar>
      <Bar
        data-power="100"
        style={{ background: bars[4] ? "#2CAFA4" : "transparent" }}
      ></Bar> */}
    </Battery>
  );
}
