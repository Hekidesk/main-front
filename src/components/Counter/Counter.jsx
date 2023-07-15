import React from "react";
import { useEffect, useState } from "react";
import { CountDownNumber } from "./style/CSS";
import CircularSlider from "@fseehawer/react-circular-slider";


const Counter = ({ startCountDown }) => {
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const timer =
      startCountDown &&
      counter >= 0 &&
      setInterval(() => setCounter(counter - 1), 1000);
    console.log("counter is: " + counter);
    if (!startCountDown) setCounter(5);
    return () => clearInterval(timer);
  }, [counter, startCountDown]);

  return (
    <div>
      <CircularSlider
        width={50}
        label={counter.toString()}
        min={0}
        max={5}
        value= {counter}
        labelColor="#00bfbd"
        labelBottom = {true}
        valueFontSize="0.01rem"
        knobColor="#1CB5BD"
        knobSize={22}
        progressColorFrom="#00bfbd"
        progressColorTo="#00bfbd"
        progressSize={5}
        trackColor="#dfffff"
        trackSize={5}
        // knobDraggable={false}
      >
        <div></div>
      </CircularSlider>
    </div>
  );
};

export default Counter;
