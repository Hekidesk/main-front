import Icon from "../../../../assets/logo/hekidesk-green.svg";
import { Image } from "primereact/image";
import { Link } from "react-router-dom";
import { ContainerWithoutHeight } from "../../../../components/reusable/Container";
import { Title } from "../../../../components/reusable/Title";
import {
  ButtonOutlineStyle,
  ButtonStyle,
} from "../../../../components/reusable/ButtonStyle";
import { LogoRow } from "./CSS";
import { useState, useEffect } from "react";
import HomeIcon from "../../../../assets/icon/home-green.svg";
import timeIcon from "../../../../assets/icon/history/timeIcon.svg";
import parameterIcon from "../../../../assets/icon/history/parameterIcon.svg";

const HistoryForm = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setUser(localStorage.getItem("user"));
    }
  }, []);

  return (
    <ContainerWithoutHeight>
      <LogoRow>
        <Image src={Icon} alt="icon" width="60px" />
        <Title>Hi {user}</Title>
      </LogoRow>
      <Link to={process.env.REACT_APP_BASE_URL + "/history/time"} style={ButtonStyle}>
        <Image
          src={timeIcon}
          alt="Image"
          width="16px"
          style={{ margin: "0em 0.2em" }}
        />
        Time
      </Link>
      <Link
        to={process.env.REACT_APP_BASE_URL + "/history/parameter"}
        style={ButtonStyle}
      >
        <Image
          src={parameterIcon}
          alt="Image"
          width="16px"
          style={{ margin: "0em 0.2em" }}
        />
        Parameter
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

export default HistoryForm;
