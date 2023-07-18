import React from "react";
import { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function Counter({ counter, startCountDown }) {

  const [key, setKey] = useState(0);

  const circleStyle = {
    fontSize: "20px",
    textShadow: "2px 2px 15px var(--main-green)",
  };

  return (
    <div style={{marginTop: "15px"}}>
      <CountdownCircleTimer
        isPlaying = {startCountDown}
        key = {key}
        duration={counter}
        size={50}
        strokeWidth={5}
        colors={ counter == 5 ? ["#1cb5bd", "#fe5558"] : ["#28acd8", "#28acd8"]}
        colorsTime={[4, 0]}
        onComplete= {() => setKey((prevKey) => prevKey + 1)}
        >
        {({ remainingTime }) => <div style = {{...circleStyle, color: "black"}}>{remainingTime}</div>}
      </CountdownCircleTimer>
    </div>
  );
}

export default Counter;
