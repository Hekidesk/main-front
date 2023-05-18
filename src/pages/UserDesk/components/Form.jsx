import Icon from "@/assets/svg/hekidesk-green.svg";
import { Image } from "primereact/image";
import { Link } from "react-router-dom";
import { ContainerWithoutHeight } from "@/components/reusable/Container";
import { Title } from "@/components/reusable/Title";
import {
  ButtonOutlineStyle,
  ButtonStyle,
} from "@/components/reusable/ButtonStyle";
import { LogoRow } from "./CSS";
import { useState } from "react";
import HeartbeatIcon from "@/assets/icon/heartbeat.svg";
import HistoryIcon from "@/assets/icon/history.svg";
import HomeIcon from "@/assets/icon/home-green.svg";

const DeskForm = () => {
  const [user] = useState("Saeed");
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
      <Link to="/measurement" style={ButtonStyle}>
        <Image
          src={HeartbeatIcon}
          alt="Image"
          width="16px"
          style={{ margin: "0em 0.2em" }}
        />
        Measurement
      </Link>
      <Link to="/history" style={ButtonStyle}>
        <Image
          src={HistoryIcon}
          alt="Image"
          width="16px"
          style={{ margin: "0em 0.2em" }}
        />
        History
      </Link>
      <Link to="/" style={ButtonOutlineStyle}>
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
