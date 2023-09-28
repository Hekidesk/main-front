import styled from "styled-components";
import { devices } from "../../../../assets/styles/size";

export const DiagramWrapper = styled.div`
  width: 100%;
  background-color: #E8F0F4;
  border-radius: 30px;
  padding-bottom: 2em;
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
  padding-top: 0.5rem;
`;
export const DiagramButton = styled.button`
  display: inline-block;
  background: linear-gradient(to top, #77dce3, #16a1d5) !important;
  height: 4em;
  width: 4em;
  border-radius: 1.5em;
  color: white;
  border: none;
  font-size: 1.7rem;
  font-weight: bold;
  margin: 1em 0 0.5rem 0.5rem;
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
  background-color: #E8F0F4;
  border-radius: 30px;
  margin: 1em;
  padding: 1em;
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
  font-size: 1.5rem;
  font-weight: 600;
`;

export const ImportantValue = styled.h3`
  color: var(--important-color);
  text-align: center;
  font-size: 6rem;
  font-weight: 600;
`;

export const SimpleTitle = styled.h6`
  color: black;
  font-size: 1rem;
  font-weight: 600;
`;

export const SimpleValue = styled.h3`
  color: black;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
`;

export const SmallSimpleValue = styled.h5`
  color: var(--main-green);
  font-weight: bold;
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
`;
export const filterButton = {
  margin: "20px auto",
  display: "block",
  alignItems: "center",
  backgroundColor: "var(--main-green)",
  border: "var(--main-green)",
};
export const HrvContainer = styled.div`
  width: 67%;
  background-color: #E8F0F4;
  position: relative;
  border-radius: 2.8em;
  padding: 0.75em;
  margin-right: 2em;
`;
export const SingleSpikeContainer = styled.div`
  width: 30%;
  background-color: #E8F0F4;
  position: relative;
  border-radius: 2.8em;
  padding: 0.75em;
`;
export const ParameterContainer = styled.div`
  background-color: #FFFFFF;
  border-radius: 2.9rem;
  padding-bottom: 1rem;
  ${(props) => props.padding && "padding: 3rem;"}

`;
export const HeartImageContainer = styled.div`
  text-align: right;
  margin-right: 3em;
  padding-top: 1rem;
  padding-bottom: 1rem;
`
export const ArrythmiaTitle = styled.h6`
  color: black;
  font-size: 1.7rem;
  font-weight: 600;
  padding-left: 3rem;
  padding-top: 0.5rem;
`;
export const FlexSpaceBetweenBox = styled.div`
  display: flex;
  justify-content: space-between;
  ${(props) => props.padding && "padding: 0 2rem;"}
`
