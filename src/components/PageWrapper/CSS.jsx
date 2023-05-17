import styled from "styled-components";
import { devices, wrapperWidth } from "@/assets/styles/size";

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
    min-height: 90vh;
  }
`;
