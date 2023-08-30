import Icon from "@/assets/logo/hekidesk-transparent.svg";
import HeartbeatIcon from "@/assets/icon/heartbeat.svg";
import StethoscopeIcon from "@/assets/icon/stethoscope.svg";
import BluetoothIcon from "@/assets/icon/bluetooth.svg";
// import SearchIcon from "@/assets/icon/question.svg";
import { Image } from "primereact/image";
import { Text } from "@/components/reusable/Text";
import { List, ListItems } from "@/components/reusable/List";
import {
  ImageWrapper,
  // QuestionWrapper,
} from "@/components/reusable/ImageWrapper";

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
            style={{ margin: "0em 1em", textTransform: "uppercase" }}
          />
          AMAZING AUSCULTATION EXPERIENCE
        </ListItems>
        <ListItems>
          <Image
            src={HeartbeatIcon}
            alt="Image"
            width="16px"
            style={{ margin: "0em 1em", textTransform: "uppercase" }}
          />
          PERSONAL HEALTH MONITORING
        </ListItems>
        <ListItems>
          <Image
            src={BluetoothIcon}
            alt="Image"
            width="10px"
            style={{ margin: "0em 1em", textTransform: "uppercase" }}
          />
          BLUETOOTH CONNECTION{" "}
        </ListItems>
      </List>
      <ImageWrapper>
        <Image src={Icon} alt="icon" width="100%" />
      </ImageWrapper>
      {/* <QuestionWrapper>
        <Image src={SearchIcon} alt="search" width="100%" />
      </QuestionWrapper> */}
    </span>
  );
};

export default InfoHome;
