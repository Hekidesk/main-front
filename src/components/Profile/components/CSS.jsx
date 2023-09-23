import styled from "styled-components";

export const ButtonProfile = {
  color: "black",
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: "2px",
  paddingLeft: "10px",
  backgroundColor: "transparent",
  border: "none",
};
export const Battery = styled.div`
  position: relative;
  width: max-content;
  &:after {
    content: " ";
    top: 9.5px;
    right: -1px;
    height: 5px;
    width: 1.5px;
    position: absolute;
    background: black;
  }
`;
export const Bar = styled.div`
  cursor: pointer;
  display: inline-block;
  width: 0;
  border: solid thin black;
  padding: 5px 3px;
  height: 5px;
  background: transparent;
  transition: background 1s;
  ${(props) => props.up && "border-radius: 0 2px 2px 0;"}
  ${(props) => props.down && "border-radius: 2px 0 0 2px;"}
`;
export const WelcomeProfileContainer = styled.div`
  padding-top: 8px;
  font-style: normal;
  font-weight: 400;
  font-size: 10.4464px;
  line-height: 14px;
  color: #a8bec5;
`;
export const NameProfileContainer = styled.div`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 450;
  font-size: 15px;
  line-height: 20px;
`;
export const PhotoCol = styled.div`
  width: 20%;
  paddingRight: 10px
`;
export const TextCol = styled.div`
  width: 30%;
  padding: 5px 20px 0px 15px;
`;
export const ConnectionIconCol = styled.div`
  padding-top: 4px;
  width: 20%;
`;
export const BatteryIconCol = styled.div`
  width: 20%;
  display: grid;
  place-items: center;
  padding: 5px;
  transform: rotate(270deg);
`;
export const Waste = styled.div`
  width: 10%;
`;
