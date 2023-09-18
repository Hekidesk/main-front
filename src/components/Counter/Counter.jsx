import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
// import { Howl } from "howler";

function Counter({ counter, startCountDown, size = 50 }) {
  const [key, setKey] = useState(0);

  const circleStyle = {
    fontSize: size > 50 ? "120px" : "20px",
    color: "black",
  };

  // const sound = new Howl({
  //   src: ["/sound/mixkit-clock-countdown-bleeps-916.wav"], // Replace with the actual path to your audio file
  // });

  // const [isPlayingSound, setIsPlayingSound] = useState(false);

  // const toggleSound = () => {
  //   if (isPlayingSound)
  //     sound.stop();
  //   else 
  //     sound.play();
  //   setIsPlayingSound(!isPlayingSound);
  // };

  return (
    <div style={{ marginTop: "15px" }}>
      <CountdownCircleTimer
        isPlaying={startCountDown}
        key={key}
        duration={counter}
        size={size}
        strokeWidth={size > 50 ? 15 : 5}
        colors={counter === 5 ? ["#1cb5bd", "#fe5558"] : ["#28acd8", "#28acd8"]}
        colorsTime={[4, 0]}
        onComplete={() => setKey((prevKey) => prevKey + 1)}
      >
        {({ remainingTime }) => {
          // if (startCountDown && remainingTime === counter && !isPlayingSound && size > 50) 
          //   toggleSound();
          // else if (!startCountDown && remainingTime === 0 && size > 50) 
          //   toggleSound();
          return <div style={circleStyle}>{remainingTime}</div>;
        }}
      </CountdownCircleTimer>
    </div>
  );
}

export default Counter;
