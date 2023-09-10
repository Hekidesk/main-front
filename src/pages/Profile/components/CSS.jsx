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
    top: 12px;
    right: -3px;
    height: 2px;
    width: 2px;
    position: absolute;
    background: rgb(168, 190, 197);
  }
`;

export const Bar = styled.div`
  cursor: pointer;
  display: inline-block;
  width: 0;
  border: solid thin rgb(168, 190, 197);
  padding: 4px 2px;
  height: 5px;
  background: transparent;
  transition: background 1s;
`;
