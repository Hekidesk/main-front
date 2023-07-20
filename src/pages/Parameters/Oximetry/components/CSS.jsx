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
  padding-left: 0.5em;
`;
export const DiagramButton = styled.button`
  background: transparent;
  color: var(--gray);
  border: none;
  font-size: 1.4em;
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
  text-shadow: 1px 1px 1px #fff;
`;
export const DiagramContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #c8e7f1;
  width: 100%;
  flex-direction: column;
  box-shadow: -1px -1px 50px -12px rgba(0, 0, 0, 0.82);
  @media ${devices.tablet} {
    flex-direction: row;
  }
`;

export const InfoContainer = styled.div`
  background: #c8e7f1;
  border: 3px solid;
  border-image: linear-gradient(to bottom, var(--main-green), var(--main-green))
    0 1;
  border-radius: 10px;
  width: 100%;
  margin: 0 1em;
  padding: 1em;
  @media ${devices.tablet} {
    width: 30%;
  }
`;

export const ImportantTitle = styled.h6`
  color: var(--important-color);
  font-weight: bold;
  text-shadow: 1px 1px 10px var(--important-color);
`;

export const ImportantValue = styled.h3`
  color: var(--important-color);
  font-weight: bold;
  text-align: center;
  font-size: 50px;
  text-shadow: 1px 1px 10px var(--important-color);
`;

export const SimpleTitle = styled.h6`
  color: var(--main-green);
  font-weight: bold;
  text-shadow: 1px 1px 10px var(--main-green);
`;

export const SimpleValue = styled.h3`
  color: var(--main-green);
  font-weight: bold;
  text-align: center;
  font-size: 50px;
  text-shadow: 1px 1px 10px var(--main-green);
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
export const DropdownButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: 10px;
`;
export const filterButton = {
  margin: "20px auto",
  display: "block",
  alignItems: "center",
  backgroundColor: "var(--main-green)",
  border: "var(--main-green)",
};
