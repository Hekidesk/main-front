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
  ArrythmiaTitle,
} from "./CSS";
import { types, types2 } from "./Constants";
import { Button } from "primereact/button";
import resultIcon from "@/assets/icon/resultIcon.svg";
import PageButtons from "@/components/reusable/PageButtons";
import { useAddToDB } from "@/database/AddToDB";

export const Info = ({ result, disable, setFilter, filter }) => {
  const dbFunc = useAddToDB("cardiogramData");

  return (
    <InfoContainer>
      <DiagramText>
        <CircularPhoto>
          <img src={resultIcon} width={15} />
        </CircularPhoto>
        Results
      </DiagramText>
      <ParameterContainer padding={true}>
        <ImportantTitle>Heart Beat (bpm)</ImportantTitle>
        <ImportantValue>{result.heartBeat}</ImportantValue>
        <SimpleTitle>PR/RR Interval</SimpleTitle>
        <SimpleValue>{result.PR_RR}</SimpleValue>
        <SimpleTitle>QRS Duration</SimpleTitle>
        <SimpleValue>{result.QRS_duration}</SimpleValue>
        <SimpleTitle>Quality Index</SimpleTitle>
        <SimpleValue>{result.Quality_index}</SimpleValue>
        <SimpleTitle>Arrhyithmia type</SimpleTitle>
        <ArrythmiaTitle>
          {result.ArrythmiaType !== -1 ? types[result.ArrythmiaType] : "-"}
        </ArrythmiaTitle>
        <SimpleTitle>Arrhyithmia type 2</SimpleTitle>
        <ArrythmiaTitle>
          {result.ArrythmiaType2 !== -1 ? types2[result.ArrythmiaType2] : "-"}
        </ArrythmiaTitle>
      </ParameterContainer>
      <FilterButton>
        <Button
          className="filter-btn"
          onClick={() => setFilter(1 - filter)}
          disabled={disable}
        >
          {filter % 2 ? "Filtered" : "Main"} Signal
        </Button>
      </FilterButton>
      <PageButtons
        disable={disable}
        dataName="cardiogramData"
        texts={[
          "Heart beat: " + result.heartBeat,
          "PR/RR Interval: " + result.PR_RR_Interval,
          "QRS Duration: " + result.QRS_duration,
        ]}
        extraChartName={[
          "#chartContainerAbnormality1 canvas",
          "#chartContainerAbnormality2 canvas",
        ]}
        extraText={[
          ["hrv: " + result.hrv_val],
          [
            "Arrythmia Type: " + types[result.ArrythmiaType],
            "Arrythmia Type 2: " + types2[result.ArrythmiaType2],
          ],
        ]}
        onClick={() => {
          var dataParameter = {};
          dataParameter["heartBeatECG"] = result.heartBeat;
          dataParameter["PR_RR_Interval"] = result.PR_RR_Interval;
          dataParameter["QRS_Duration"] = result.QRS_duration;
          dataParameter["hrvVal"] = result.hrv_val;
          dataParameter["ArrythmiaType"] = types[result.ArrythmiaType];
          dbFunc.updateHistory(dataParameter);
        }}
      />
    </InfoContainer>
  );
};
