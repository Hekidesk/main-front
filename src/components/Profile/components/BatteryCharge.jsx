import React, { useEffect, useState } from "react";
import { Bar, Battery } from "./CSS";

export default function BatteryCharge({ charge }) {
  const [bars, setBars] = useState(Array(5).fill(false));

  useEffect(() => {
    if (charge)
      setBars((preBars) => {
        let index = 0;
        let power = Math.round(charge / 20);
        preBars = Array(5).fill(false);
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
        data-power="20"
        style={{ background: bars[0] ? "green" : "transparent" }}
      ></Bar>
      <Bar
        data-power="40"
        style={{ background: bars[1] ? "green" : "transparent" }}
      ></Bar>
      <Bar
        data-power="60"
        style={{ background: bars[2] ? "green" : "transparent" }}
      ></Bar>
      <Bar
        data-power="80"
        style={{ background: bars[3] ? "green" : "transparent" }}
      ></Bar>
      <Bar
        data-power="100"
        style={{ background: bars[4] ? "green" : "transparent" }}
      ></Bar>
    </Battery>
  );
}
