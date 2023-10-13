import React from "react";
import positionIcon from "@/assets/icon/positionIcon.svg";
import positionPhoto from "@/assets/icon/positionPhoto.svg";
import { CircularPositionPhoto, DiagramPositionText, PositionText } from "./CSS";
import { RadioButton } from "primereact/radiobutton";

const PositionChoose = ({position, setPosition}) => {
  return (
    <PositionText>
      <DiagramPositionText>
        <CircularPositionPhoto>
          <img src={positionIcon} width={15} />{" "}
        </CircularPositionPhoto>
        please choose position
        <div
          className="flex align-items-center"
          style={{
            marginLeft: "30px",
            marginRight: "10px",
            color: "white",
            paddingBottom: "0.4em",
          }}
        >
          <RadioButton
            style={{ marginLeft: "10px" }}
            inputId="ingredient1"
            name="heart"
            value="heart"
            onChange={(e) => setPosition(e.value)}
            checked={position === "heart"}
          />
          <label
            htmlFor="ingredient1"
            style={{ marginLeft: "5px", color: "white" }}
          >
            Heart
          </label>
          <RadioButton
            style={{ marginLeft: "10px" }}
            inputId="ingredient2"
            name="lung"
            value="lung"
            onChange={(e) => setPosition(e.value)}
            checked={position === "lung"}
          />
          <label
            htmlFor="ingredient2"
            style={{ marginLeft: "5px", color: "white" }}
          >
            Lung
          </label>
          <RadioButton
            style={{ marginLeft: "10px" }}
            inputId="ingredient3"
            name="optional"
            value="optional"
            onChange={(e) => setPosition(e.value)}
            checked={position === "optional"}
          />
          <label
            htmlFor="ingredient3"
            style={{ marginLeft: "5px", color: "white" }}
          >
            Optional
          </label>
        </div>
      </DiagramPositionText>
      <div style={{ width: "22%" }}>
        <img src={positionPhoto} width={60} />
      </div>
    </PositionText>
  );
};

export default PositionChoose;
