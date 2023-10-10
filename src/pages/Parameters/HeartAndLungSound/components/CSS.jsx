import styled from "styled-components";
import { devices } from "../../../../assets/styles/size";

export const DiagramWrapper = styled.div`
  width: 100%;
  background-color: #e8f0f4;
  border-radius: 30px;
  padding-bottom: 2em;
  font-size: 10px;
`;
export const Description = styled.div`
  display: flex;
  padding: 0.5em;
  align-items: center;
`;
export const DiagramText = styled.h6`
  color: black;
  font-size: 1.1em;
  font-weight: 600;
  padding-top: 0.5em;
  padding-left: 0.5em;
`;
export const DiagramButton = styled.button`
  display: inline-block;
  background: linear-gradient(to top, #77dce3, #16a1d5) !important;
  height: 4.7em;
  width: 4.5em;
  border-radius: 1.7em;
  color: white;
  border: none;
  font-size: 1.7em;
  font-weight: bold;
  margin: 1em 0 0.5em 0.5em;
`;
export const DiagramContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #c8e7f1;
  width: 100%;
  flex-direction: column;
  @media ${devices.tablet} {
    flex-direction: row;
  }
`;

export const InfoContainer = styled.div`
  background-color: #e8f0f4;
  border-radius: 30px;
  margin: 0 1em;
  padding: 0em 1em 1em;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
`;

export const ImportantTitle = styled.h6`
  color: var(--important-color);
  text-shadow: 1px 1px 10px var(--important-color);
  font-weight: bold;
`;

export const ImportantValue = styled.h3`
  color: var(--important-color);
  text-shadow: 1px 1px 10px var(--important-color);
  font-weight: bold;
  text-align: center;
`;

export const SimpleTitle = styled.h6`
  color: var(--main-green);
  text-shadow: 1px 1px 10px var(--main-green);
  font-weight: bold;
`;

export const SimpleValue = styled.h3`
  color: var(--main-green);
  text-shadow: 1px 1px 10px var(--main-green);
  font-weight: bold;
  text-align: center;
`;

export const CircularValue = styled.div`
  width: 2em;
  height: 2em;
  border-radius: 100%;
  border: 2px solid var(--main-green);
  color: var(--main-green);

  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;
export const CircularContainer = styled.div`
  margin-left: 20px;
  margin-bottom: 20px;
`;

export const filterButton = {
  margin: "20px auto",
  display: "block",
  alignItems: "center",
  backgroundColor: "var(--main-green)",
  border: "var(--main-green)",
};
export const DropdownButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
export const PlaySoundText = styled.div`
  font-size: 15px;
  display: flex;
  color: var(--main-green);
  text-align: center;
  justify-content: center;
  padding-bottom: 0.5em;
  font-weight: bold;
  box-sizing: border-box;
`;
export const PlayBox = styled.div`
  border: solid 1px var(--main-green);
  margin-top: 1em;
  padding: 1em;
  border-radius: 1em;
`;
export const TimerWrapper = styled.div`
  position: relative;
  display: flex;
`;
export const CircularPhoto = styled.div`
  display: inline-block;
  padding: 1.1em;
  background-color: white;
  border-radius: 45px;
  color: black;
  ${(props) => props.margin && "margin-right: 1em;"}
  ${(props) => !props.margin && "float: right;"}
  &:hover {
    ${(props) => !props.margin && "cursor: pointer"}
  }
`;
export const PositionText = styled.div`
  display: flex;
  background: linear-gradient(to top, #77dce3, #16a1d5) !important;
  height: 4.7em;
  width: 20em;
  border-radius: 1.7em;
  color: white;
  border: none;
  font-size: 1.7em;
  font-weight: bold;
  margin: 1em 0 0.5em 0.5em;
  `;
  export const CircularPositionPhoto = styled.div`
  display: inline-block;
  padding: 0.7em 0.8em;
  background-color: white;
  border-radius: 45px;
  color: black;
  margin-right: 1em;
`;
export const DiagramPositionText = styled.h6`
  width: 78%;
  color: white;
  font-size: 0.7em;
  font-weight: 600;
  padding-top: 0.5em;
  padding-left: 0.5em;
`;
export const FilterButton = styled.div`
  text-align: center;
`;
export const ChooseSignalWrapper = styled.div`
  padding: 0.5em;
  margin: 1.5em;
  opacity: 0.6;
  background: #0A0A0A;
  border-radius: 45px;
  backdrop-filter: blur(10px);
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  ${(props) =>
    props.clicked && "padding: 1em;"}
`;
export const ButtonContainer = styled.div`
  display: flex;
`;
export const OneButtonContainer = styled.div`
  width: 50%;
  ${(props) =>
    props.clicked
      ? `
        opacity: 1;
        height: 100%;
        overflow: visible;
      `
      : `
        opacity: 0;
        height: 0;
        overflow: hidden;
      `}
  transition: ${(props) =>
    props.clicked
      ? 'opacity 1.5s;'
      : 'opacity 1s;'};
`;
export const ParameterContainer = styled.div`
  background-color: #ffffff;
  border-radius: 2.9em;
  padding: 3em;
  padding-bottom: 0;
`;