import Icon from "HEKIDESK/assets/logo/hekidesk-green.svg";
import { Image } from "primereact/image";
import { Link } from "react-router-dom";
import { ContainerWithoutHeight } from "HEKIDESK/components/reusable/Container";
import { Title } from "HEKIDESK/components/reusable/Title";
import {
  ButtonOutlineStyle,
  ButtonStyle,
} from "HEKIDESK/components/reusable/ButtonStyle";
import { LogoRow } from "./CSS";
import { useState } from "react";
import HeartbeatIcon from "HEKIDESK/assets/icon/heartbeat.svg";
import HistoryIcon from "HEKIDESK/assets/icon/history.svg";
import HomeIcon from "HEKIDESK/assets/icon/home-green.svg";

const DeskForm = () => {
  const [user] = useState(localStorage.getItem("user"));
  return (
    <ContainerWithoutHeight>
      <LogoRow>
        <Image
          src={Icon}
          alt="icon"
          width="60px"
          style={{ paddingLeft: "0.5em", marginBottom: "0.5em" }}
        />
        <Title>Hi {user}</Title>
      </LogoRow>
      <br />
      <br />
      <Link
        to={process.env.REACT_APP_BASE_URL + "/measurement"}
        style={ButtonStyle}
      >
        <Image
          src={HeartbeatIcon}
          alt="Image"
          width="16px"
          style={{ margin: "0em 0.2em" }}
        />
        Measurement
      </Link>
      <Link
        to={process.env.REACT_APP_BASE_URL + "/history"}
        style={ButtonStyle}
      >
        <Image
          src={HistoryIcon}
          alt="Image"
          width="16px"
          style={{ margin: "0em 0.2em" }}
        />
        History
      </Link>
      <Link
        to={process.env.REACT_APP_BASE_URL + "/"}
        style={ButtonOutlineStyle}
      >
        <Image
          src={HomeIcon}
          alt="Image"
          width="16px"
          style={{ margin: "0em 0.2em" }}
        />
        Home
      </Link>
    </ContainerWithoutHeight>
  );
};

export default DeskForm;
