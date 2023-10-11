import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Diagram from "@/components/Datagram/Diagram";
import bloodPressure from "@/assets/icon/parameter/force1.svg";
import bloodPressure2 from "@/assets/icon/parameter/force2.svg";
import resultIcon from "@/assets/icon/resultIcon.svg";
import HighlightTitle from "@/components/HighlightTitle/HighlightTitle";
import { useEffect, useState, useContext, useRef } from "react";
import {
  SimpleValue,
  SimpleTitle,
  Description,
  DiagramButton,
  DiagramContainer,
  DiagramText,
  DiagramWrapper,
  ImportantTitle,
  ImportantValue,
  InfoContainer,
  TimerWrapper,
  CircularPhoto,
  ParameterContainer,
} from "./components/CSS";
import PageButtons from "@/components/reusable/PageButtons";
import axios from "axios";
import Swal from "sweetalert2";
import { useAddToDB } from "@/database/AddToDB";
import { BluetoothContext } from "@/App";
import { makeArrayForChart } from "@/components/reusableDataFunc/DataFunc";
import Counter from "@/components/Counter/Counter";
import { COMMAND, delayTime, fs, pendingTime } from "./components/Constants";
import Timer from "@/components/Timer/Timer";

const BloodPressurePage = () => {
  const [IrData, setIrData] = useState();
  const [forceData, setforceData] = useState();
  const [IRChartData, setIRChartData] = useState();
  const [forceChartData, setForceChartData] = useState();
  const dbFunc = useAddToDB("BPData");

  const [SYS, setSYS] = useState("-");
  const [DIA, setDIA] = useState("-");
  const [qualityIndex, setQualityIndex] = useState("-");
  const [disable, setDisable] = useState(1);

  const bluetooth = useContext(BluetoothContext);

  async function calculate(irData, forceData) {
    console.log("ir Data: " + irData)
    console.log("force Data: " + forceData)

    let payload = {
      IR: "[" + irData?.toString() + "]",
      force: "[" + forceData?.toString() + "]",
      fs: bluetooth.GetFrequency()[0],
    };
    let res = await axios.post("/bp_signal", payload).catch(console.log);
    if (res?.status < 400 && !Number(res.data.Try_Again)) {
      setSYS(res.data.Diastolic);
      setDIA(res.data.Systolic);
      setQualityIndex(res.data.Quality_index);
      setDisable(0);
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please repeat procedure!",
        confirmButtonColor: "#3085d6",
      });
    }
  }

  useEffect(() => {
    if (bluetooth.finish) {
      calculate(IrData, forceData);
    }
    return bluetooth.TurnOff;
  }, [bluetooth]);

  const [startCountDown, setStartCountDown] = useState(0);
  const [counter, setCounter] = useState(5);
  const [sampleTime, setSampleTime] = useState(10);

  const startTime = useRef(null);
  const endTime = useRef(null);

  const flushData = () => {
    setSYS("-");
    setDIA("-");
    setQualityIndex("-");
    setDisable(1);
    setIRChartData([]);
    setStartCountDown(1);
  };

  const startInput = () => {
    let startTimeDuration = 0;
    flushData();

    bluetooth.SendCommand(COMMAND, (input) => {
      setIRChartData(makeArrayForChart(input.ir));
      setForceChartData(makeArrayForChart(input.force));
      setIrData(input.ir);
      setforceData(input.force);
    });

    startTime.current = setTimeout(() => {
      bluetooth.Start().then((result) => (startTimeDuration = result));
      setCounter(sampleTime);
    }, [pendingTime + delayTime]);
    endTime.current = setTimeout(() => {
      setCounter(5);

      setStartCountDown(0);
      bluetooth.Stop(startTimeDuration);
    }, [sampleTime * 1000 + pendingTime + delayTime]);
  };

  return (
    <PageWrapper>
      <HighlightTitle title="Blood Pressure" icon={bloodPressure} />
      <div style={{ display: "flex", marginBottom: "1em" }}>
        <div style={{ width: "75%" }}>
          <br />
            <TimerWrapper>
              <Timer sampleTime={sampleTime} setSampleTime={setSampleTime} />
              <DiagramButton onClick={startInput}>START</DiagramButton>
            </TimerWrapper>
          <DiagramWrapper>
            <Description>
              <CircularPhoto>
                <img src={bloodPressure} />{" "}
              </CircularPhoto>
              <DiagramText>
                Please put your finger on PPG sensors and then press it slowly
              </DiagramText>
            </Description>
            <DiagramContainer>
              <Diagram
                data={IRChartData}
                sizeOfSlice={-1}
                maximumNum={sampleTime * fs}
                type="ppg"
              />
            </DiagramContainer>
          </DiagramWrapper>
          <br />
          <DiagramWrapper>
            <Description>
              <CircularPhoto>
                <img src={bloodPressure2} width={12} />{" "}
              </CircularPhoto>
              <DiagramText>Force</DiagramText>
            </Description>
            <DiagramContainer>
              <Diagram
                data={forceChartData}
                sizeOfSlice={-1}
                maximumNum={sampleTime * fs}
                type="force"
              />
            </DiagramContainer>
          </DiagramWrapper>
        </div>
        <div style={{ width: "35%" }}>
          <InfoContainer>
            <DiagramText>
              <CircularPhoto margin={true}>
                <img src={resultIcon} width={15} />
              </CircularPhoto>
              Results
            </DiagramText>
            <ParameterContainer>
              <ImportantTitle>SYS/DIA (mmHg)</ImportantTitle>
              <ImportantValue>
                {SYS}/{DIA}
              </ImportantValue>
              <SimpleTitle>Quality Index (%)</SimpleTitle>
              <SimpleValue>
                {qualityIndex} {qualityIndex != "-" ? "%" : ""}
              </SimpleValue>
            </ParameterContainer>
            <PageButtons
              disable={disable}
              dataName="BloodPressureData"
              texts={["SYS/DIA " + SYS + "/" + DIA]}
              extraChartName={["#forceDiagram #chartContainer canvas"]}
              extraText={[[""]]}
              onClick={() => {
                var dataParameter = {};
                dataParameter["SYS"] = SYS;
                dataParameter["DIA"] = DIA;
                dbFunc.updateHistory(dataParameter);
              }}
            />
          </InfoContainer>
        </div>
      </div>
    </PageWrapper>
  );
};

export default BloodPressurePage;
