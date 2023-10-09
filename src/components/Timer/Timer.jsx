import { useLayoutEffect } from "react";
import styled from "styled-components";
import { showClock } from "./functions";
import { Draggable } from "gsap/all";
import gsap from "gsap";

const Timer = ({ sampleTime, setSampleTime }) => {
  useLayoutEffect(() => {
    gsap.registerPlugin(Draggable);
    showClock(0);
    const wheel = Draggable.create(document.querySelectorAll("#timer"), {
      type: "rotation",
      bounds: { minRotation: 0, maxRotation: 336 },
    })[0];
    wheel.addEventListener("drag", () => {
      let value = Math.ceil(Math.ceil(wheel.rotation) / 30) * 5 + 5;
      setSampleTime(value < 10 ? 10 : value);
      showClock(-wheel.rotation);
    });
  }, []);

  return (
    <Container>
      <TextContainer>
        <Title>Time</Title>
        <SubTitle>Drag the circle to set the time</SubTitle>
        <Time>{sampleTime} Seconds</Time>
      </TextContainer>
      <CanvasContainer>
        <canvas id="timer" width="130" height="130"></canvas>
      </CanvasContainer>
    </Container>
  );
};

export default Timer;

const CanvasContainer = styled.div`
  position: absolute;
  top: -25px;
  right: -40px;
`;

const Container = styled.div`
  width: clamp(50px, 100%, 250px);
  padding: 1.5em;
  border-radius: 3em;
  background: linear-gradient(180deg, #16a1d5 0%, #77dce3 100%);
  display: flex;
  overflow: hidden;
  position: relative;
  margin-left: 0.5rem;
  height: 8em;
  margin-top: 1.7em;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-contents: center;
`;

const Title = styled.h3`
  color: #fff;
  font-size: 1.2em;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 0.1em !important;
`;

const SubTitle = styled.h5`
  color: #fff;
  font-size: 1em;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  opacity: 0.7;
`;

const Time = styled.h2`
  color: #fff;
  font-size: 1.8em;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  line-height: normal;
`;
