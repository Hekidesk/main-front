import styled from "styled-components";
import { devices } from "@/assets/styles/size";

export const Title = styled.h1`
  font-size: 36px;
  color: var(--green-color);
  margin-left: 0.2em;
`;

export const Title2 = styled.h2`
  font-style: normal;
  font-weight: 700;
  font-size: 28.3324px;
  line-height: 39px;
  color: var(--green-color);
  margin-bottom: 10px;
  @media ${devices.mobileL} {
    margin-top: 10px;
  }
`;
