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
  background-image: url("src/assets/icon/battery/batteryBodyIcon.svg");
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
  padding-right: 1em;
`;
export const TextCol = styled.div`
  width: 40%;
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
`;
export const Waste = styled.div`
  width: 10%;
`;
