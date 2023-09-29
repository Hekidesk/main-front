import React from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import backIcon from "@/assets/icon/measurement/backIcon.svg";

const ButtonMeasurementStyle = {
    backgroundColor: "white",
    color: "black",
    border: "none",
    fontSize: "4rem",
}; 

const BackButton = () => {
  return (
        <Link
          // eslint-disable-next-line no-undef
          to={process.env.REACT_APP_BASE_URL + "/measurement"}
        >
          <Button
            style={ButtonMeasurementStyle}
            className="d-flex justify-content-center"
          >
            <img
              src={backIcon}
              alt="Image"
              width="12px"
              style={{ margin: "0em 0.6em" }}
            />
            {"  "}
            <span style={{fontSize: "1.2rem"}}>Back</span>
          </Button>
        </Link>
  );
};

export default BackButton;
