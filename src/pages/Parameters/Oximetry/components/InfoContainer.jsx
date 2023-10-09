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
  ChooseSignalWrapper,
  ButtonContainer,
  OneButtonContainer,
  filterButton,

} from "./CSS";
import { Button } from "primereact/button";
import resultIcon from "@/assets/icon/resultIcon.svg";
import ChooseSignalIcon from "@/assets/icon/parameter/ChooseSignalIcon.svg";
import downArrowIcon from "@/assets/icon/downArrowIcon.svg";
import upArrowIcon from "@/assets/icon/upArrowIcon.svg";
import PageButtons from "@/components/reusable/PageButtons";
import { useAddToDB } from "@/database/AddToDB";
import { useState } from "react";

export const Info = ({ result, disable, setFilter, filter, setFilterActiveNum }) => {
  const dbFunc = useAddToDB("oximetryData");
  const [ChooseSignalClicked, setClicked] = useState(false);

  return (
    <InfoContainer>
      <DiagramText>
        <CircularPhoto margin={true}>
          <img src={resultIcon} width={15} />
        </CircularPhoto>
        Results
      </DiagramText>
      <ParameterContainer>
        <ImportantTitle>Heart Rate (bpm)</ImportantTitle>
        <ImportantValue>{result.heartBeat}</ImportantValue>
        <SimpleTitle>SPO2 %</SimpleTitle>
        <SimpleValue>{result.SPO2}</SimpleValue>
        <SimpleTitle>Quality Index %</SimpleTitle>
        <SimpleValue>{result.qualityIndex}</SimpleValue>
        <ChooseSignalWrapper clicked={ChooseSignalClicked}>
          <CircularPhoto margin={true}>
            <img src={ChooseSignalIcon} width={15} />
          </CircularPhoto>
          Choose Signal
          <CircularPhoto
            margin={false}
            onClick={() => setClicked(1 - ChooseSignalClicked)}
          >
            <img
              src={ChooseSignalClicked ? upArrowIcon : downArrowIcon}
              width={15}
            />
          </CircularPhoto>
          <ButtonContainer>
            <OneButtonContainer clicked={ChooseSignalClicked}>
              <Button
                style={filterButton}
                onClick={() => setFilterActiveNum(0)}
                disabled={disable}
              >
                IR
              </Button>
            </OneButtonContainer>
            <OneButtonContainer clicked={ChooseSignalClicked}>
              <Button
                style={filterButton}
                onClick={() => setFilterActiveNum(2)}
                disabled={disable}
              >
                RED
              </Button>
            </OneButtonContainer>
          </ButtonContainer>
        </ChooseSignalWrapper>
        <FilterButton>
          <Button
            onClick={() => setFilter(1 - filter)}
            className="filter-btn"
            disabled={disable}
          >
            {filter % 2 ? "Filtered" : "Main"} Signal
          </Button>
        </FilterButton>
      </ParameterContainer>
      <PageButtons
        disable={disable}
        dataName="oximetryData"
        texts={[
          "Heart beat: " + result.heartBeat,
          "SPO2: " + result.SPO2,
          "Quality index: " + result.qualityIndex,
        ]}
        onClick={() => {
          var dataParameter = {};
          dataParameter["heartBeatPPG"] = result.heartBeat;
          dataParameter["SPO2"] = result.SPO2;
          dbFunc.updateHistory(dataParameter);
        }}
      />
    </InfoContainer>
  );
};
