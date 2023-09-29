import styled from "styled-components";
import { devices, wrapperWidth } from "@/assets/styles/size";

export const Wrapper = styled.div`
  width: ${wrapperWidth};
  min-height: 80vh;
  background-color: white;
  padding: 1em 1em 5em 1em;
  margin: 1em 0 1em 0;
  border-radius: 40px;
  display: flex;
  position: relative;
  flex-direction: column-reverse;
  @media ${devices.tablet} {
    flex-direction: row;
    min-height: 90vh;
    padding: 1em;
  }
`;
export const ProfileContainer = styled.span`
  position: absolute;
  top: 1em;
  right: 2em;
  display: flex;
  justify-content: space-between !important;
  width: 18em;
`;
export const SidebarContainer = styled.div`
  margin-right: 40px;
`;
export const ChildContainer = styled.div`
  width: 100%;
  padding-top: 5em;
  @media ${devices.tablet} {
    width: 95%;
  }
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
export const BackWrapper = styled.div`
  text-align: left;
  padding-bottom: 1rem;
  position: absolute;
  left: 8em;
  top: 2em;
`;

