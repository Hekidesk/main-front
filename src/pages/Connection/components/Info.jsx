import Icon from "@/assets/svg/hekidesk-transparent.svg";
import BluetoothIcon from "@/assets/icon/bluetooth.svg";
import OffIcon from "@/assets/icon/off.svg";
import SearchIcon from "@/assets/icon/question.svg";
import { Image } from "primereact/image";
import { Text } from "@/components/reusable/Text";
import { List, ListItems } from "@/components/reusable/List";
import {
  ImageWrapper,
  QuestionWrapper,
} from "../../../components/reusable/ImageWrapper";

const ConnectionInfo = () => {
  return (
    <span>
      <Text>Connection</Text>
      <List>
        <ListItems>
          <Image
            src={BluetoothIcon}
            alt="Image"
            width="16px"
            style={{ margin: "0em 1em" }}
          />
          Turn on bluetooth on this device
        </ListItems>
        <ListItems>
          <Image
            src={OffIcon}
            alt="Image"
            width="16px"
            style={{ margin: "0em 1em" }}
          />
          Turn on the Hekidesk
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
};

export default ConnectionInfo;
