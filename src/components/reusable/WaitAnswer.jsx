/* eslint-disable no-undef */
import React from "react";
import waitingIcon from "@/assets/icon/waitingIcon.svg";

const WaitAnswer = () => {
  return (
    <div>
      Wait until the answer is ready {"   "}
      <img src={waitingIcon} alt="waiting..." width={60} />
    </div>
  );
};

export default WaitAnswer;
