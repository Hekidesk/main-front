import styled from "styled-components";
import { devices } from "../../assets/styles/size";

export const TitleContainer = styled.div`
  display: flex;
  padding: 0.1em 0.8em;
  justify-content: space-around;
  background-color: var(--light-blue);
  border-radius: 10px;
  width: 100%;
  max-width: 50em;
  @media ${devices.tablet} {
    width: 80%;
  }
`;
export const H6 = styled.h6`
  font-size: 1.8em;
  font-weight: bold;
  @media ${devices.tablet} {
    font-size: 2.8em;
  }
`;
export const H6Wrapper = styled.span`
  display: grid;
  width: 60%;
  place-items: center;
`;
