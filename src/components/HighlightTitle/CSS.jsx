import styled from "styled-components";
import { devices } from "../../assets/styles/size";

export const TitleContainer = styled.div`
  width: 100%;
  max-width: 50em;
`;
export const H6 = styled.h6`
  font-size: 2.9em !important;
  font-weight: 700 !important;
  font-family: 'Lufga'!important;
  @media ${devices.tablet} {
    font-size: 2.2em;
  }
`;
export const H6Wrapper = styled.span`
  display: grid;
  width: 60%;
  place-items: left;
`;
