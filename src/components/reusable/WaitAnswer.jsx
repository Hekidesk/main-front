/* eslint-disable no-undef */
import React from "react";
import waitingIcon from "@/assets/icon/waitingIcon.svg";
import { Link } from "react-router-dom";

const WaitAnswer = () => {
  return (
    <div>
      Wait until the answer is ready {"   "}
      <img src={waitingIcon} alt="waiting..." width={60} />
      <div style={{textAlign: "center"}}>
          <Link to={process.env.REACT_APP_BASE_URL + "/measurement"}>
            Go back measurement{" "}
          </Link>
      </div>
    </div>
  );
};

export default WaitAnswer;
