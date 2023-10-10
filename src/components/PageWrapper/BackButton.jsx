/* eslint-disable no-undef */
import React from "react";
import { Button } from "primereact/button";
import { Link, useLocation } from "react-router-dom";
import backIcon from "@/assets/icon/measurement/backIcon.svg";

const ButtonMeasurementStyle = {
  backgroundColor: "white",
  color: "black",
  border: "none",
  fontSize: "1em",
};

const BackButton = () => {
  const location = useLocation();

  return (
    location.pathname !== "/measurement" ? 
    <Link
      to={
        location.pathname.includes("/measurement") ? 
        process.env.REACT_APP_BASE_URL + "/measurement"
          : process.env.REACT_APP_BASE_URL + "/history"
      }
    >
      <Button
        style={ButtonMeasurementStyle}
        className="d-flex justify-content-center"
      >
        <img
          src={backIcon}
          alt="Image"
          width="7px"
          style={{ margin: "0em 0.6em" }}
        />
        {"     "}
        <span style={{ fontSize: "1.4em" }}>Back</span>
      </Button>
    </Link> : <></>
  );
};

export default BackButton;
