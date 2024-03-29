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
  overflow: hidden;
  @media ${devices.tablet} {
    flex-direction: row;
  }
`;

export const InfoContainer = styled.div`
  background-color: #e8f0f4;
  border-radius: 30px;
  margin: 0 1em;
  padding: 0em 1em;
  height: 100%;
  position: relative;
`;
export const ParameterContainer = styled.div`
  background-color: #ffffff;
  border-radius: 2.9em;
  padding: 3em;
  padding-bottom: 0;
  height: 70%;
`;
export const ImportantTitle = styled.h6`
  color: var(--important-color);
  font-weight: bold;
`;

export const ImportantValue = styled.h3`
  color: var(--important-color);
  font-weight: bold;
  font-size: 50px;
  text-align: center;
  margin-top: 20px;
  text-shadow : 1px 1px 10px var(--important-color);
`;

export const SimpleTitle = styled.h6`
  color: var(--main-green);
  font-weight: bold;
  margin-top: 120px;
`;

export const SimpleValue = styled.h3`
  color: var(--main-green);
  font-weight: bold;
  text-align: center;
  font-size: 40px;
  text-shadow : 1px 1px 10px var(--main-green);
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
export const CountDownNumber = styled.div`
  background: transparent;
  color: var(--main-green);
  border: none;
  font-size: 2em;
  font-weight: 1500px;
  margin-bottom: 0.5rem;
  margin-left: 2rem;
`;
export const DropdownButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: 15px;
`;
export const TitleContainer = styled.div`
  height: 40px;
  width: 98%;
  color: white;
  background-color: #a5c2cb;
  font-size: 1.2em;
  padding-top: 3px;
  padding-left: 2em;
  border-radius: 0 5px 5px 0;`
  ;
export const ForceDataContainer = styled.div`
  background-color: #c8e7f1;
  flex-direction: column;
  box-shadow: -1px -1px 10px -12px rgba(0, 0, 0, 0.82);
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
`;
