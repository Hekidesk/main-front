import Heartbeat from "@/assets/gif/life-heart.mp4";
import { Image } from "primereact/image";
import { ContainerWithoutHeight } from "@/components/reusable/Container";
import { Title } from "@/components/reusable/Title";
import { ButtonOutlineStyle } from "@/components/reusable/ButtonStyle";
import { LogoRow } from "./CSS";
import DisconnectIcon from "@/assets/icon/disconnect.svg";

const ConnectionForm = () => {
  return (
    <ContainerWithoutHeight>
      <LogoRow>
        <Title>Connecting...</Title>
      </LogoRow>
      <br />
      <video autoPlay>
        <source src={Heartbeat} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <br />
      <div style={ButtonOutlineStyle}>
        <Image
          src={DisconnectIcon}
          alt="Image"
          width="16px"
          style={{ margin: "0em 0.2em" }}
        />
        Disconnect
      </div>
    </ContainerWithoutHeight>
  );
};

export default ConnectionForm;
