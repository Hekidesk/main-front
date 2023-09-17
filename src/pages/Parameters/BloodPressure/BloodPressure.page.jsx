import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Diagram from "@/components/Datagram/Diagram";
import bloodPressure from "@/assets/icon/parameter/bloodPressure.svg";
import HighlightTitle from "@/components/HighlightTitle/HighlightTitle";
import { useEffect, useState, useContext, useRef } from "react";
import {
  CircularContainer,
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
} from "./components/CSS";
import PageButtons from "@/components/reusable/PageButtons";
import axios from "axios";
import Swal from "sweetalert2";
import { useAddToDB } from "@/database/AddToDB";
import { BluetoothContext } from "@/App";
import { makeArrayForChart } from "@/components/reusableDataFunc/DataFunc";
import Counter from "@/components/Counter/Counter";
import { Row, Col } from "react-bootstrap";
import { COMMAND, delayTime, fs, pendingTime } from "./components/Constants";
import { SampleTimeDropDown } from "@/components/SampleTimeDropDown";
import ForceDiagram from "./components/ForceDiagram";

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
      <div style={{ display: "grid", placeItems: "center" }}>
        <HighlightTitle title="Blood Pressure" icon={bloodPressure} />
        <br />
        <DiagramWrapper>
          <Description>
            <DiagramText>
              Please put your finger on PPG sensors and then press it slowly
            </DiagramText>
            <DiagramButton onClick={startInput}>Start</DiagramButton>
            <SampleTimeDropDown
              sampleTime={sampleTime}
              setSampleTime={setSampleTime}
            />
            <CircularContainer>
              <Counter counter={counter} startCountDown={startCountDown} />
            </CircularContainer>
          </Description>
          <DiagramContainer>
            <Col md={9}>
              <Row>
                <Col>
                  <Diagram
                    data={IRChartData}
                    sizeOfSlice={-1}
                    maximumNum={sampleTime * fs}
                    type="ppg"
                  />
                </Col>
              </Row>
              <ForceDiagram
                forceChartData={forceChartData}
                maximumNum={sampleTime * fs}
              />
            </Col>
            <Col md={2} style={{ alignSelf: "flex-start", marginTop: "2em" }}>
              <InfoContainer>
                <ImportantTitle>SYS/DIA (mmHg)</ImportantTitle>
                <ImportantValue>
                  {SYS}/{DIA}
                </ImportantValue>
                <SimpleTitle>Quality Index (%)</SimpleTitle>
                <SimpleValue>
                  {qualityIndex} {qualityIndex != "-" ? "%" : ""}
                </SimpleValue>
              </InfoContainer>
            </Col>
          </DiagramContainer>
        </DiagramWrapper>
      </div>
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
    </PageWrapper>
  );
};

export default BloodPressurePage;
