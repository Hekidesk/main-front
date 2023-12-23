import Icon from "@/assets/logo/hekidesk-transparent.svg";
import HeartbeatIcon from "@/assets/icon/heartbeat.svg";
import StethoscopeIcon from "@/assets/icon/stethoscope.svg";
import BluetoothIcon from "@/assets/icon/bluetooth.svg";
import { Image } from "primereact/image";
import { Text } from "@/components/reusable/Text";
import { List, ListItems } from "@/components/reusable/List";
import { ImageWrapper } from "@/components/reusable/ImageWrapper";

const InfoHome = () => {
  return (
    <span>
      <Text>Smart Listening Device - Smart Activity Fitness Tracker</Text>
      <List>
        <ListItems>
          <Image
            src={StethoscopeIcon}
            alt="Image"
            width="16px"
            style={{ margin: "0em 0.5em", textTransform: "uppercase" }}
            loading="lazy"
          />
          AMAZING AUSCULTATION EXPERIENCE
        </ListItems>
        <ListItems>
          <Image
            src={HeartbeatIcon}
            alt="Image"
            width="16px"
            style={{ margin: "0em 0.5em", textTransform: "uppercase" }}
            loading="lazy"
          />
          PERSONAL HEALTH MONITORING
        </ListItems>
        <ListItems>
          <Image
            src={BluetoothIcon}
            alt="Image"
            width="10px"
            style={{ margin: "0em 0.5em", textTransform: "uppercase" }}
            loading="lazy"
          />
          BLUETOOTH CONNECTION{" "}
        </ListItems>
      </List>
      <ImageWrapper>
        <Image src={Icon} alt="icon" width="100%" loading="lazy"/>
      </ImageWrapper>
    </span>
  );
};

export default InfoHome;
