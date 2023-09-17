import {
  ImportantTitle,
  ImportantValue,
  InfoContainer,
  SimpleTitle,
  SimpleValue,
  filterButton,
} from "./CSS";
import { Button } from "primereact/button";

export const Info = ({ result, disable, setFilter, filter }) => {
  return (
    <InfoContainer>
      <ImportantTitle>Heart Beat (bpm)</ImportantTitle>
      <ImportantValue>{result.heartBeat}</ImportantValue>
      <SimpleTitle>PR/RR Interval</SimpleTitle>
      <SimpleValue>{result.PR_RR_Interval}</SimpleValue>
      <SimpleTitle>QRS Duration</SimpleTitle>
      <SimpleValue>{result.QRS_Duration}</SimpleValue>
      <SimpleTitle>Quality Index</SimpleTitle>
      <SimpleValue>{result.qualityIndex}</SimpleValue>
      <Button
        style={filterButton}
        className="filter-btn"
        onClick={() => setFilter(1 - filter)}
        disabled={disable}
      >
        {filter % 2 ? "filtered" : "main"} signal
      </Button>
    </InfoContainer>
  );
};
