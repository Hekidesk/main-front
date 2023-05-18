import Icon from "@/assets/svg/hekidesk-transparent.svg";
import HistoryIcon from "@/assets/icon/history.svg";
import AddIcon from "@/assets/icon/add.svg";
import SearchIcon from "@/assets/icon/question.svg";
import { Image } from "primereact/image";
import { Text } from "@/components/reusable/Text";
import { List, ListItems } from "@/components/reusable/List";
import {
  ImageWrapper,
  QuestionWrapper,
} from "@/components/reusable/ImageWrapper";

const DeskInfo = () => {
  return (
    <span>
      <Text>My Desk</Text>
      <List>
        <ListItems>
          <Image
            src={AddIcon}
            alt="Image"
            width="16px"
            style={{ margin: "0em 1em" }}
          />
          Add new medical records by connecting to device.
        </ListItems>
        <ListItems>
          <Image
            src={HistoryIcon}
            alt="Image"
            width="16px"
            style={{ margin: "0em 1em" }}
          />
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
