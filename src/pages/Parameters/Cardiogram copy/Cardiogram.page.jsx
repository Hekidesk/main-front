import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Diagram from "@/components/Datagram/Diagram";
import HeartIcon from "@/assets/icon/parameter/cardiogram.svg";
import HighlightTitle from "@/components/HighlightTitle/HighlightTitle";
import { useEffect, useState, useRef, useContext } from "react";
import { BluetoothContext } from "@/App";
import {
  CircularContainer,
  Description,
  DiagramButton,
  DiagramContainer,
  DiagramText,
  DiagramWrapper,
  CircularPhoto,
  AbnormalityDiagramContainer,
} from "./components/CSS";
import PageButtons from "@/components/reusable/PageButtons";
import { useAddToDB } from "@/database/AddToDB";
import AbnormalityDetection from "./components/AbnormalityDetection";
import Counter from "@/components/Counter/Counter";
import {
  COMMAND,
  delayTime,
  initial_state,
  pendingTime,
  types,
  types2,
} from "./components/Constants";
import { makeArrayForChart } from "@/components/reusableDataFunc/DataFunc";
import { calculateBeatPerMinuteAPI } from "./components/Functions";
import { SampleTimeDropDown } from "@/components/SampleTimeDropDown";
import { Info } from "./components/InfoContainer";
import Timer from "@/components/Timer/Timer";

const CardiogramCopyPage = () => {
  const bluetooth = useContext(BluetoothContext);
  const dbFunc = useAddToDB("cardiogramData");

  const [data, setData] = useState();
  const [filteredArray, setFilteredArray] = useState([]);
  const [filter, setFilter] = useState(1);
  const [chartData, setChartData] = useState();
  const [sizeOfSlice, setSizeOfSlice] = useState(-1);
  const [disable, setDisable] = useState(1);

  const [result, setResult] = useState(initial_state);
  const [startCountDown, setStartCountDown] = useState(0);
  const [counter, setCounter] = useState(5);
  const [sampleTime, setSampleTime] = useState(10);

  const startTime = useRef(null);
  const endTime = useRef(null);

  const flushData = () => {
    setDisable(1);
    setChartData([]);
    setStartCountDown(1);
    setResult(initial_state);
  };

  const startInput = () => {
    let startTimeDuration = 0;
    flushData();

    bluetooth.SendCommand(COMMAND, (input) => {
      setChartData(makeArrayForChart(input.ecg));
      setData(input.ecg);
    });

    startTime.current = setTimeout(() => {
      bluetooth.Start().then((result) => (startTimeDuration = result));
      setSizeOfSlice(80);
      setCounter(sampleTime);
    }, [pendingTime + delayTime]);
    endTime.current = setTimeout(() => {
      setCounter(5);
      setStartCountDown(0);
      bluetooth.Stop(startTimeDuration);
      setSizeOfSlice(-1);
    }, [sampleTime * 1000 + pendingTime + delayTime]);
  };

  useEffect(() => {
    if (bluetooth.finish) {
      calculateBeatPerMinuteAPI(
        data,
        bluetooth,
        setResult,
        setFilteredArray,
        setDisable
      );
    }
    return bluetooth.TurnOff;
  }, [bluetooth]);

  useEffect(() => {
    setChartData(filteredArray[filter]);
  }, [filter]);

  return (
    <PageWrapper>
      <div style={{ display: "flex" }}>
        <div style={{ width: "75%" }}>
          <HighlightTitle title="Cardiogram" icon={HeartIcon} />
          <div style={{ position: "relative", display: "flex" }}>
            <DiagramButton onClick={startInput}>START</DiagramButton>
            <Timer sampleTime={sampleTime} setSampleTime={setSampleTime} />
            {/* <CircularContainer>
              <Counter counter={counter} startCountDown={startCountDown} />
            </CircularContainer> */}
          </div>
          <br />
          <DiagramWrapper>
            <Description>
              <DiagramText>
                <CircularPhoto>
                  {" "}
                  <img src={HeartIcon} />{" "}
                </CircularPhoto>
                Please put your right and left fingers on ECG sensors and then
                press
              </DiagramText>
            </Description>
            <DiagramContainer>
              <Diagram data={chartData} sizeOfSlice={sizeOfSlice} />
            </DiagramContainer>
          </DiagramWrapper>
          <AbnormalityDiagramContainer>
            <AbnormalityDetection
              heartBeat={result.heartBeat}
              hrv={result.hrv}
              hrvVal={result.hrv_val}
              ssTime={result.ssTime}
              singleSpike={result.singleSpike}
              PQRST_ss={result.PQRST_ss}
            ></AbnormalityDetection>
          </AbnormalityDiagramContainer>
        </div>
        <div style={{ width: "35%" }}>
          <Info
            result={result}
            disable={disable}
            setFilter={setFilter}
            filter={filter}
          />
          <PageButtons
            disable={false}
            dataName="cardiogramData"
            texts={[
              "Heart beat: " + result.heartBeat,
              "PR/RR Interval: " + result.PR_RR_Interval,
              "QRS Duration: " + result.QRS_Duration,
            ]}
            extraChartName={[
              "#chartContainerAbnormality1 canvas",
              "#chartContainerAbnormality2 canvas",
            ]}
            extraText={[
              ["hrv: " + result.hrvVal],
              [
                "Arrythmia Type: " + types[result.ArrythmiaType],
                "Arrythmia Type 2: " + types2[result.ArrythmiaType2],
              ],
            ]}
            onClick={() => {
              var dataParameter = {};
              dataParameter["heartBeatECG"] = result.heartBeat;
              dataParameter["PR_RR_Interval"] = result.PR_RR_Interval;
              dataParameter["QRS_Duration"] = result.QRS_Duration;
              dataParameter["hrvVal"] = result.hrvVal;
              dataParameter["ArrythmiaType"] = types[result.ArrythmiaType];
              dbFunc.updateHistory(dataParameter);
            }}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default CardiogramCopyPage;
