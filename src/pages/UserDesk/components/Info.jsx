// SVG
import Icon from "HEKIDESK/assets/logo/hekidesk-transparent.svg";
import HistoryIcon from "HEKIDESK/assets/icon/history.svg";
import AddIcon from "HEKIDESK/assets/icon/add.svg";
import SearchIcon from "HEKIDESK/assets/icon/question.svg";

// PRIME REACT
import { Image } from "primereact/image";

// HEKIDESK
import { Text } from "HEKIDESK/components/reusable/Text";
import { List, ListItems } from "HEKIDESK/components/reusable/List";
import {
  ImageWrapper,
  QuestionWrapper,
} from "HEKIDESK/components/reusable/ImageWrapper";

const DeskInfo = () => {
  return (
    <span>
      <Text>My Desk</Text>
      <List>
        <ListItems>
          <Image src={AddIcon} alt="Image" width="16px" className="mx-1" />
          Add new medical records by connecting to device.
        </ListItems>
        <ListItems>
          <Image src={HistoryIcon} alt="Image" width="16px" className="mx-1" />
          View medical record history
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

export default DeskInfo;
