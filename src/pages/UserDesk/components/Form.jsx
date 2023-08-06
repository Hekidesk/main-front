/* eslint-disable no-undef */
import { useState } from "react";

// Third party
import { Link } from "react-router-dom";

// PRIME REACT
import { Image } from "primereact/image";

// SVG
import Icon from "HEKIDESK/assets/logo/hekidesk-green.svg";
import HeartbeatIcon from "HEKIDESK/assets/icon/heartbeat.svg";
import HistoryIcon from "HEKIDESK/assets/icon/history.svg";
import HomeIcon from "HEKIDESK/assets/icon/home-green.svg";

// HEKIDESK
import { ContainerWithoutHeight } from "HEKIDESK/components/reusable/Container";
import { Title } from "HEKIDESK/components/reusable/Title";
import {
  ButtonOutlineStyle,
  ButtonStyle,
} from "HEKIDESK/components/reusable/ButtonStyle";

import { LogoRow } from "./CSS";

const DeskForm = () => {
  const [user] = useState(localStorage.getItem("user"));

  return (
    <ContainerWithoutHeight>
      <LogoRow>
        <Image src={Icon} alt="icon" width="60px" className="pl-3 mb-3" />
        <Title>Hi {user}</Title>
      </LogoRow>
      <br />
      <br />
      <Link
        to={process.env.REACT_APP_BASE_URL + "/measurement"}
        style={ButtonStyle}
      >
        <Image src={HeartbeatIcon} alt="Image" width="16px" className="mx-2" />
        Measurement
      </Link>
      <Link
        to={process.env.REACT_APP_BASE_URL + "/history"}
        style={ButtonStyle}
      >
        <Image src={HistoryIcon} alt="Image" width="16px" className="mx-2" />
        History
      </Link>
      <Link
        to={process.env.REACT_APP_BASE_URL + "/"}
        style={ButtonOutlineStyle}
      >
        <Image src={HomeIcon} alt="Image" width="16px" className="mx-2" />
        Home
      </Link>
    </ContainerWithoutHeight>
  );
};

export default DeskForm;
