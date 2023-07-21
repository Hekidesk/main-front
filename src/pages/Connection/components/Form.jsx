import Heartbeat from "HEKIDESK/assets/gif/heartbeat.mp4";
import { Image } from "primereact/image";
import { ContainerWithoutHeight } from "HEKIDESK/components/reusable/Container";
import { Title } from "HEKIDESK/components/reusable/Title";
import {
  ButtonOutlineStyle,
  ButtonStyle,
} from "HEKIDESK/components/reusable/ButtonStyle";
import { LogoRow } from "./CSS";
import DisconnectIcon from "HEKIDESK/assets/icon/disconnect.svg";
import { BluetoothContext } from "HEKIDESK/App";
import { useContext } from "react";
import { Link } from "react-router-dom";

const ConnectionForm = () => {
  const bluetooth = useContext(BluetoothContext);
  return (
    <ContainerWithoutHeight>
      <LogoRow>
        <Title>Connect to the device</Title>
      </LogoRow>
      <br />
      {!bluetooth.isConnected && (
        <div style={ButtonStyle} onClick={bluetooth.Connect}>
          <Image
            src={DisconnectIcon}
            alt="Image"
            width="16px"
            style={{ margin: "0em 0.2em" }}
          />
          Connect
        </div>
      )}
      {bluetooth.loading && (
        <video width={150} autoPlay>
          <source src={Heartbeat} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <br />
      {bluetooth.isConnected && !bluetooth.loading && (
        <Link
          // eslint-disable-next-line no-undef
          to={process.env.REACT_APP_BASE_URL + "/measurement"}
          style={ButtonStyle}
        >
          Go to Measurement
        </Link>
      )}
      {bluetooth.isConnected && !bluetooth.loading && (
        <div style={ButtonOutlineStyle} onClick={bluetooth.Disconnect}>
          <Image
            src={DisconnectIcon}
            alt="Image"
            width="16px"
            style={{ margin: "0em 0.2em" }}
          />
          Disconnect
        </div>
      )}
    </ContainerWithoutHeight>
  );
};

export default ConnectionForm;
