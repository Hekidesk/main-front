import styled from "styled-components";
import { devices, wrapperWidth } from "../../assets/styles/size";

export const Wrapper = styled.div`
  width: ${wrapperWidth};
  min-height: auto;
  background-color: white;
  padding: 1em;
  border-radius: 40px;
  display: flex;
  flex-direction: column-reverse;
  @media ${devices.tablet} {
    flex-direction: row;
    height: 96vh;
  }
`;

export const InfoSection = styled.div`
  background: linear-gradient(157deg, #0295d3 1.06%, #92ece6 100%);
  padding: 3em;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  position: relative;
  overflow: hidden;
  @media ${devices.tablet} {
    width: 50%;
    padding: 2em;
  }
`;

export const FormSection = styled.div`
  padding: 1em 1em 0em 1em;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  position: relative;

  @media ${devices.tablet} {
    width: 50%;
    padding: 2.5em 2.5em 0 2.5em;
  }
  @media ${devices.laptop} {
    padding: 2em 2em 0 2em;
  }
`;
