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
  padding: 0px 0.5em 0.5em;
  align-items: center;
`;
export const DiagramText = styled.h6`
  color: black;
  font-size: 1.1em;
  font-weight: 600;
  padding-top: 0.5em;
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
export const TimerWrapper = styled.div`
  position: relative;
  display: flex;
`;
export const DiagramContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  box-shadow: -1px -1px 10px -12px rgba(0, 0, 0, 0.82);
  @media ${devices.tablet} {
    flex-direction: row;
  }
`;
export const AbnormalityDiagramContainer = styled.div`
  flex-direction: column;
  width: 100%;
  box-shadow: -1px -1px 10px -12px rgba(0, 0, 0, 0.82);
`;
export const AbnormalityDiagramTitleContainer = styled.div`
  height: 50px;
  padding: 10px;
  text-align: left;
  color: white;
  font-size: 20px;
  box-shadow: -7px 0 5px -5px gray;
`;
export const LeftAbnormalityDiagramTitleContainer = styled.div`
  height: 50px;
  padding: 10px;
  text-align: left;
  color: white;
  font-size: 20px;
`;
export const InfoContainer = styled.div`
  height: 100%;
  background-color: #e8f0f4;
  border-radius: 30px;
  margin: 0 1em;
  padding: 0em 1em;
  text-alighn: center;
  display: grid;
  grid-template-rows: auto 1fr;
`;
export const InfoAbnormalityContainer = styled.div`
  border-left: 2px solid var(--main-green);
  border-right: 2px solid var(--main-green);
  border-radius: 30px;
  width: 90%;
  margin: 1em;
  margin-left: 0;
  padding: 1em;
`;
export const ImportantTitle = styled.h6`
  color: var(--important-color);
  font-weight: bold;
  text-shadow: 1px 1px 10px var(--important-color);
`;

export const ImportantValue = styled.h3`
  color: var(--important-color);
  text-align: center;
  font-size: 4em;
  text-shadow: 1px 1px 10px var(--important-color);
`;

export const SimpleTitle = styled.h6`
  color: var(--main-green);
  font-size: 1.5em;
  font-weight: bold;
  text-shadow: 1px 1px 10px var(--main-green);
`;

export const SimpleValue = styled.h3`
  color: var(--main-green);
  text-align: center;
  font-size: 1.5em;
  text-shadow: 1px 1px 10px var(--main-green);
`;

export const SmallSimpleValue = styled.h5`
  color: var(--main-green);
  font-size: 12px;
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
  display: inline-block;
  margin-left: 20px;
`;
export const CircularPhoto = styled.div`
  display: inline-block;
  padding: 1.1em;
  background-color: white;
  border-radius: 45px;
  margin-right: 1em;
  color: black;
`;
export const FilterButton = styled.div`
  text-align: center;
  margin: 2em 0em;
`;
export const HrvContainer = styled.div`
  width: 67%;
  background-color: #e8f0f4;
  position: relative;
  border-radius: 2.8em;
  padding: 0 0.75em 0.75em 0.75em;
  margin-right: 2em;
`;
export const SingleSpikeContainer = styled.div`
  width: 30%;
  background-color: #e8f0f4;
  position: relative;
  border-radius: 2.8em;
  padding: 0 0.75em 0.75em 0.75em;
`;
export const ParameterContainer = styled.div`
  background-color: #ffffff;
  border-radius: 2.9em;
  padding-bottom: 1em;
  ${(props) => props.padding && "padding: 2em 2.5em;"}
`;
export const HeartImageContainer = styled.div`
  text-align: right;
  margin-right: 3em;
  padding-top: 1em;
  padding-bottom: 1em;
`;
export const ArrythmiaTitle = styled.h6`
  color: var(--main-green);
  text-align: center;
  font-size: 1.5em;
  margin: 1em 0em;
  text-shadow: 1px 1px 10px var(--main-green);
`;
export const FlexSpaceBetweenBox = styled.div`
  display: flex;
  justify-content: space-between;
  ${(props) => props.padding && "padding: 0 2em;"}
`;
