import styled from "styled-components";
import { devices } from "HEKIDESK/assets/styles/size";

export const TitleContainer = styled.div`
  display: flex;
  padding: 0.1em 0.6em;
  justify-content: space-around;
  background-color: var(--light-blue);
  border-radius: 10px;
  width: 100%;
  max-width: 50em;
  @media ${devices.tablet} {
    width: 70%;
  }
`;
export const H6 = styled.h6`
  font-size: 1.2em;
  font-weight: bold;
  @media ${devices.tablet} {
    font-size: 2em;
  }
`;
export const H6Wrapper = styled.span`
  display: grid;
  width: 50%;
  place-items: center;
`;
