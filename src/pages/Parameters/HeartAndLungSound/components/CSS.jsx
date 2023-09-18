import styled from "styled-components";
import { devices } from "../../../../assets/styles/size";

export const DiagramWrapper = styled.div`
  width: 100%;
  padding: 1em 0;
  background-color: var(--gray-green);
  border-radius: 10px;
`;
export const Description = styled.div`
  display: flex;
  padding: 0.5em;
  align-items: center;
`;
export const DiagramText = styled.h6`
  color: white;
  font-size: 1.2em;
`;
export const DiagramButton = styled.button`
  background: transparent;
  color: var(--gray);
  text-shadow : 1px 1px 1px #fff;
  border: none;
  font-size: 1.4em;
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
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
  background: #c8e7f1;
  border-left: 2px solid var(--main-green);
  border-right: 2px solid var(--main-green);
  border-radius: 30px ;
  width: 100%;
  margin: 1em;
  padding: 1em;
  @media ${devices.tablet} {
    width: 30%;
  }
`;

export const ImportantTitle = styled.h6`
  color: var(--important-color);
  text-shadow : 1px 1px 10px var(--important-color);
  font-weight: bold;
`;

export const ImportantValue = styled.h3`
  color: var(--important-color);
  text-shadow : 1px 1px 10px var(--important-color);
  font-weight: bold;
  text-align: center;
`;

export const SimpleTitle = styled.h6`
  color: var(--main-green);
  text-shadow : 1px 1px 10px var(--main-green);
  font-weight: bold;
`;

export const SimpleValue = styled.h3`
  color: var(--main-green);
  text-shadow : 1px 1px 10px var(--main-green);
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
}
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
