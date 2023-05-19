import styled from "styled-components";
import { devices, wrapperWidth } from "@/assets/styles/size";

export const Wrapper = styled.div`
  width: ${wrapperWidth};
  min-height: 80vh;
  background-color: white;
  padding: 1em;
  border-radius: 40px;
  display: flex;
  position: relative;
  flex-direction: column-reverse;
  @media ${devices.tablet} {
    flex-direction: row;
    min-height: 90vh;
  }
`;

export const ProfileContainer = styled.span`
  position: absolute;
  top: 1em;
  right: 2em;
  display: flex;
  width: 10em;
`;
export const SidebarContainer = styled.div`
  width: 15%;
  margin-right: 25px;
`;
export const ChildContainer = styled.div`
  width: 100%;
  padding-top: 4em;
  @media ${devices.tablet} {
    width: 95%;
  }
`;
