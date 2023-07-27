import styled from "styled-components";
import { devices, wrapperWidth } from "HEKIDESK/assets/styles/size";

export const Wrapper = styled.div`
  width: ${wrapperWidth};
  min-height: 80vh;
  background-color: white;
  padding: 1em 1em 5em 1em;
  border-radius: 40px;
  display: flex;
  position: relative;
  flex-direction: column-reverse;
  @media ${devices.tablet} {
    flex-direction: row;
    min-height: 90vh;
    padding: 1em;
  }
`;
export const ProfileContainer = styled.span`
  position: absolute;
  top: 1em;
  right: 2em;
  display: flex;
  width: 20em;
`;
export const SidebarContainer = styled.div`
  margin-right: 40px;
`;
export const ChildContainer = styled.div`
  width: 100%;
  padding-top: 5em;
  @media ${devices.tablet} {
    width: 95%;
  }
`;
