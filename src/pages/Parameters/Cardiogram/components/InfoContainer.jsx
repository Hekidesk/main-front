import {
  ImportantTitle,
  ImportantValue,
  InfoContainer,
  SimpleTitle,
  SimpleValue,
  FilterButton,
  CircularPhoto,
  ParameterContainer,
  DiagramText,
  HeartImageContainer,
  ArrythmiaTitle,
  FlexSpaceBetweenBox,
} from "./CSS";
import {
  types,
  types2,
} from "./Constants";
import { Button } from "primereact/button";
import resultIcon from "@/assets/icon/resultIcon.svg";
import ArrhyithmiaTypeIcon from "@/assets/icon/parameter/ArrhyithmiaTypeIcon.svg";
import heartPhoto from "@/assets/icon/heartPhoto.svg";

export const Info = ({ result, disable, setFilter, filter }) => {
  return (
    <InfoContainer>
      <DiagramText>
        <CircularPhoto>
          <img src={resultIcon} width={15}/>
        </CircularPhoto>
        Results
      </DiagramText>
      <ParameterContainer padding={true}>
        <ImportantTitle>Heart Beat (bpm)</ImportantTitle>
        <ImportantValue>{result.heartBeat}</ImportantValue>
        <SimpleTitle>PR/RR Interval</SimpleTitle>
        <SimpleValue>{result.PR_RR}</SimpleValue>
        <FlexSpaceBetweenBox padding={false}>
          <SimpleTitle>QRS Duration</SimpleTitle>
          <SimpleTitle>Quality Index</SimpleTitle>
        </FlexSpaceBetweenBox>
          <FlexSpaceBetweenBox padding={true}>
            <SimpleValue>{result.QRS_duration}</SimpleValue>
            <SimpleValue>{result.Quality_index}</SimpleValue>
          </FlexSpaceBetweenBox>
      </ParameterContainer>
      <br />
      <ParameterContainer padding={false}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <DiagramText>
              <img src={ArrhyithmiaTypeIcon}/> Arrhyithmia type
            </DiagramText>
            <ArrythmiaTitle>{result.ArrythmiaType !== -1 ? types[result.ArrythmiaType] : "-"}</ArrythmiaTitle>
            <DiagramText>
              <img src={ArrhyithmiaTypeIcon} /> Arrhyithmia type 2
            </DiagramText>
            <ArrythmiaTitle>{result.ArrythmiaType2 !== -1 ? types2[result.ArrythmiaType2] : "-"}</ArrythmiaTitle>
          </div>
          <HeartImageContainer>
            <img src={heartPhoto}/>
          </HeartImageContainer>
        </div>
      </ParameterContainer>
      <FilterButton>
        <Button
          className="filter-btn"
          onClick={() => setFilter(1 - filter)}
          disabled={disable}
        >
          {filter % 2 ? "Filtered" : "main"} signal
        </Button>
      </FilterButton>
    </InfoContainer>
  );
};
