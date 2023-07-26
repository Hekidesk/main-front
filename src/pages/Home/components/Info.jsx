// PRIME REACT
import { Image } from "primereact/image";

// SVG
import Icon from "HEKIDESK/assets/logo/hekidesk-transparent.svg";
import HeartbeatIcon from "HEKIDESK/assets/icon/heartbeat.svg";
import StethoscopeIcon from "HEKIDESK/assets/icon/stethoscope.svg";
import BluetoothIcon from "HEKIDESK/assets/icon/bluetooth.svg";
import SearchIcon from "HEKIDESK/assets/icon/question.svg";

// HEKIDESK
import { Text } from "HEKIDESK/components/reusable/Text";
import { List, ListItems } from "HEKIDESK/components/reusable/List";
import {
  ImageWrapper,
  QuestionWrapper,
} from "HEKIDESK/components/reusable/ImageWrapper";

const InfoHome = () => (
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
        BLUETOOTH CONNECTION
      </ListItems>
    </List>
    <ImageWrapper>
      <Image src={Icon} alt="icon" width="100%" />
    </ImageWrapper>
    <QuestionWrapper>
      <Image src={SearchIcon} alt="search" width="100%" />
    </QuestionWrapper>
  </span>
);

export default InfoHome;
