import { useState, useLayoutEffect } from "react";
import styled from "styled-components";
import "./Timer.css";
import { showClock } from "./functions";
import { Draggable } from "gsap/all";
import gsap from "gsap";

const Timer = ({ sampleTime, setSampleTime }) => {
  const [time, setTime] = useState(5);

  useLayoutEffect(() => {
    gsap.registerPlugin(Draggable);
    showClock(0);
    const wheel = Draggable.create(document.querySelectorAll("#timer"), {
      type: "rotation",
      bounds: { minRotation: 0, maxRotation: 336 },
    })[0];
    wheel.addEventListener("drag", () => {
      let value = Math.ceil(Math.ceil(wheel.rotation) / 30) * 5;
      setTime(value);
      showClock();
    });
  }, []);

  return (
    <Container>
      <TextContainer>
        <Title>Time</Title>
        <SubTitle>Drag the circle to set the time</SubTitle>
        <Time>{time} Seconds</Time>
      </TextContainer>
      <CanvasContainer>
        <canvas id="timer" width="200px" height="200px"></canvas>
      </CanvasContainer>
    </Container>
  );
};

export default Timer;

const CanvasContainer = styled.div`
  position: absolute;
  top: -30px;
  right: -70px;
`;

const Container = styled.div`
  width: clamp(150px, 100%, 380px);
  padding: 1.2em;
  border-radius: 45px;
  background: linear-gradient(180deg, #16a1d5 0%, #77dce3 100%);
  display: flex;
  overflow: hidden;
  position: relative;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-contents: center;
`;

const Title = styled.h3`
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const SubTitle = styled.h5`
  color: #fff;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  opacity: 0.7;
`;

const Time = styled.h2`
  color: #fff;
  font-size: 28.992px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  line-height: normal;
`;
