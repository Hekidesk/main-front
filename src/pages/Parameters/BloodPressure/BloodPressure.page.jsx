import PageWrapper from "HEKIDESK/components/PageWrapper/PageWrapper";
import Diagram from "HEKIDESK/components/Datagram/Diagram";
import bloodPressure from "HEKIDESK/assets/icon/parameter/bloodPressure.svg";
import HighlightTitle from "HEKIDESK/components/HighlightTitle/HighlightTitle";
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
  DropdownButton,
} from "./components/CSS";
import PageButtons from "HEKIDESK/components/reusable/PageButtons";
import axios from "axios";
import Swal from "sweetalert2";
import { useAddToDB } from "HEKIDESK/database/AddToDB";
import { BluetoothContext } from "HEKIDESK/App";
import { makeArrayForChart } from "HEKIDESK/components/reusableDataFunc/DataFunc";
import Counter from "HEKIDESK/components/Counter/Counter";
import { Dropdown } from "primereact/dropdown";
import { Col } from "react-bootstrap";

const BloodPressurePage = () => {
  const [IrData, setIrData] = useState();
  const [forceData, setforceData] = useState();
  const [IRChartData, setIRChartData] = useState();
  const [forceChartData, setForceChartData] = useState();
  const [sizeOfSlice, setSizeOfSlice] = useState(-1);
  const [sizeOfSliceForce, setSizeOfSliceForce] = useState(-1);
  const dbFunc = useAddToDB("BPData");

  const [SYS, setSYS] = useState(0);
  const [DIA, setDIA] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);
  const [saved, setSaved] = useState(0);
  const [disable, setDisable] = useState(1);

  const bluetooth = useContext(BluetoothContext);

  const COMMAND = 0x01;

  async function calculate(irData, forceData) {
    let payload = {
      IR: "[" + irData.toString() + "]",
      force: "[" + forceData.toString() + "]",
      fs: bluetooth.GetFrequency()[0],
    };
    let res = await axios.post("https://api.hekidesk.com//bp_signal", payload);
    if (res.status < 400 && !Number(res.data.Try_Again)) {
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
    if (bluetooth)
      bluetooth.SendCommand(COMMAND, (input) => {
        setIRChartData(makeArrayForChart(input.ir));
        setForceChartData(makeArrayForChart(input.force));
        setIrData(input.ir);
        setforceData(input.force);
        console.log(input.force)
      });
    if (bluetooth.finish) {
      calculate(IrData, forceData);
    }
    return bluetooth.turnOff;
  }, [bluetooth]);

  useEffect(() => {
    if (saved) {
      var dataParameter = {};
      dataParameter["SYS"] = SYS;
      dataParameter["DIA"] = DIA;
      dbFunc.updateHistory(dataParameter);
    }
  }, [saved]);

  const [startCountDown, setStartCountDown] = useState(0);
  const [counter, setCounter] = useState(5);
  const [sampleTime, setSampleTime] = useState(10);

  const pendingTime = 5000;
  const startTime = useRef(null);
  const endTime = useRef(null);
  const delayTime = 30;

  const flushData = () => {
    setSYS("-");
    setDIA("-");
    setQualityIndex(0);
    setSaved(0);
    setDisable(1);
    setIRChartData([]);
    setStartCountDown(1);
  };

  const startInput = () => {
    if (bluetooth.CheckConnection()) {
      let startTimeDuration = 0;
      flushData();
      startTime.current = setTimeout(() => {
        bluetooth.Start().then((result) => (startTimeDuration = result));
        setCounter(sampleTime);
        setSizeOfSlice(400);
        setSizeOfSliceForce(1500);
      }, [pendingTime + delayTime]);
      endTime.current = setTimeout(() => {
        setCounter(5);
        setSizeOfSlice(-1);
        setSizeOfSliceForce(-1);
        setStartCountDown(0);
        bluetooth.Stop(startTimeDuration);
      }, [sampleTime * 1000 + pendingTime + delayTime]);
    }
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
            <DropdownButton>
              <Dropdown
                style={{ width: "100%" }}
                value={sampleTime}
                className="filter-btn"
                onChange={(e) => setSampleTime(e.value)}
                options={[
                  { name: "10s", value: 10 },
                  { name: "20s", value: 20 },
                  { name: "30s", value: 30 },
                ]}
                optionLabel="name"
                placeholder={"sample time  ↓"}
              />
            </DropdownButton>
            <CircularContainer>
              <Counter counter={counter} startCountDown={startCountDown} />
            </CircularContainer>
          </Description>
          <DiagramContainer>
              <Col md = {4} style={{ marginRight: "50px", position: "relative" }}>
                <Diagram data={IRChartData} sizeOfSlice={sizeOfSlice} />
              </Col>
              <Col md = {4} style={{ marginLeft: "50px", position: "relative" }}>
                <Diagram data={forceChartData} sizeOfSlice={sizeOfSliceForce} />
              </Col>
              <InfoContainer>
                <ImportantTitle>SYS/DIA</ImportantTitle>
                <ImportantValue>
                  {SYS}/{DIA}
                </ImportantValue>
                <SimpleTitle>Quality Index</SimpleTitle>
                <SimpleValue>{qualityIndex}</SimpleValue>
              </InfoContainer>
          </DiagramContainer>
        </DiagramWrapper>
      </div>
      <PageButtons
        disable={disable}
        dataName="BloodPressureData"
        texts={["SYS/DIA " + ""]}
        saved={saved}
        setSaved={setSaved}
      />
    </PageWrapper>
  );
};

export default BloodPressurePage;
