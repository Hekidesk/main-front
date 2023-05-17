import Icon from "../../../../assets/svg/hekidesk-transparent.svg";
import timeIcon from "../../../../assets/icon/history/timeIcon.svg";
import parameterIcon from "../../../../assets/icon/history/parameterIcon.svg";
import SearchIcon from "../../../../assets/icon/question.svg";
import { Image } from "primereact/image";
import { Text } from "../../../../components/reusable/Text";
import { List, ListItems } from "../../../../components/reusable/List";
import {
  ImageWrapper,
  QuestionWrapper,
} from "../../../../components/reusable/ImageWrapper";

const HistoryFormInfo = () => {
  return (
    <span>
      <Text>Medical records</Text>
      <List>
        <ListItems>
          <Image
            src={timeIcon}
            alt="Image"
            width="16px"
            style={{ margin: "0em 1em" }}
          />
          Measurements of specific time
        </ListItems>
        <ListItems>
          <Image
            src={parameterIcon}
            alt="Image"
            width="16px"
            style={{ margin: "0em 1em" }}
          />
          Measurements of specific vital parameter
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

export default HistoryFormInfo;
