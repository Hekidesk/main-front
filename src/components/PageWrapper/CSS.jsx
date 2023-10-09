import styled from "styled-components";
import { devices, wrapperWidth } from "@/assets/styles/size";

export const Wrapper = styled.div`
  width: 100%;
  min-height: 80vh;
  background-color: white;
  margin: 1em 0 1em 0;
  border-radius: 40px;
  display: flex;
  position: relative;
  flex-direction: column;
  @media ${devices.tablet} {
    flex-direction: row;
    min-height: 90vh;
    width: ${wrapperWidth};
    max-width: 1440px;
    margin: 2em;
  }
`;
export const ProfileContainer = styled.span`
  display: flex;
  width: 27em;
  padding: 1em 1em 0 0;
  @media ${devices.tablet} {
    padding: 0;
  }
`;

export const ChildContainer = styled.div`
  width: 100%;
`;
export const ClockContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100001;
  ${(props) => !props.showDownCounter && "display: none;"}
`;
export const AnswerReadyContainer = styled.div`
  position: absolute;
  color: black;
  font-size: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100001;
  ${(props) => !props.answerReady && "display: none;"}
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  padding-top: 7em;
  margin-left: 3em;
  @media ${devices.tablet} {
    font-size: 10px !important;
  }
`;
export const BackWrapper = styled.div`
  text-align: left;
  padding-bottom: 1em;
  position: absolute;
  left: 17%;
  top: 1em;
`;
