// PRIME REACT
import { Image } from "primereact/image";

// HEKIDESK
import { Text } from "HEKIDESK/components/reusable/Text";
import { List, ListItems } from "HEKIDESK/components/reusable/List";

// SVG
import Icon from "HEKIDESK/assets/logo/hekidesk-transparent.svg";
import BluetoothIcon from "HEKIDESK/assets/icon/bluetooth.svg";
import OffIcon from "HEKIDESK/assets/icon/off.svg";
import SearchIcon from "HEKIDESK/assets/icon/question.svg";

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
            className="mx-2"
          />
          Turn on bluetooth on this device
        </ListItems>
        <ListItems>
          <Image src={OffIcon} alt="Image" width="16px" className="mx-2" />
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
