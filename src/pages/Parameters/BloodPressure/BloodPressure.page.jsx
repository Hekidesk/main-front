import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Diagram from "@/components/Datagram/Diagram";
import bloodPressure from "@/assets/icon/parameter/bloodPressure.svg";
import HighlightTitle from "@/components/HighlightTitle/HighlightTitle";
import { useEffect, useState, useContext, useRef } from "react";
import {
  CircularContainer,
  CircularValue,
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

const BloodPressurePage = () => {
  const [IrData, setIrData] = useState();
  const [forceData, setforceData] = useState();
  const [chartData, setChartData] = useState();
  const [sizeOfSlice, setSizeOfSlice] = useState(-1);
  const dbFunc = useAddToDB("BPData");

  const [SYS, setSYS] = useState(0);
  const [DIA, setDIA] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);
  const [saved, setSaved] = useState(0);

  const bluetooth = useContext(BluetoothContext);

  const COMMAND = 0x01;

  async function calculate(irData, forceData) {
    console.log(irData);
    console.log(forceData);
    let payload = {
      IR: "[" + irData.toString() + "]",
      force: "[" + forceData.toString() + "]",
      fs: bluetooth.GetFrequency()[0],
    };
    let res = await axios.post("http://127.0.0.1:5000//bp_signal", payload);
    console.log(res);
    if ( res.status < 400 && !Number(res.data.Try_Again)) {
      console.log(SYS);
      console.log(DIA);
      setSYS(res.data.Diastolic);
      setDIA(res.data.Systolic);
      setQualityIndex(res.data.Quality_index);
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please repeat procedure!",
        confirmButtonColor: '#3085d6',
      });
    }
  }

  useEffect(() => {
    if (bluetooth)
      bluetooth.SendCommand(COMMAND, (input) => {
        setChartData(makeArrayForChart(input.ir));
        setIrData(input.ir);
        setforceData(input.force);
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

  const pendingTime = 5000;
  const sampleTime = 10000;
  const startTime = useRef(null);
  const endTime = useRef(null);

  const startInput = () => {
    let startTimeDuration = 0;
    setStartCountDown(1);
    setSaved(0);
    setSYS("-");
    setDIA("-");
    setQualityIndex(0);
    startTime.current = setTimeout(() => {
      bluetooth.Start().then((result) => (startTimeDuration = result));
      setSizeOfSlice(400);
      setStartCountDown(0);
    }, [pendingTime]);
    endTime.current = setTimeout(() => {
      bluetooth.Stop(startTimeDuration);
      setSizeOfSlice(-1);
    }, [sampleTime + pendingTime]);
  };

  return (
    <PageWrapper>
      <div style={{ display: "grid", placeItems: "center" }}>
        <HighlightTitle title="Blood Pressure" icon={bloodPressure} />
        <br />
        <DiagramWrapper>
          <Description>
            <DiagramText>
              Please put your right and left fingers on ECG sensors and then
              press
            </DiagramText>
            <DiagramButton onClick={startInput}>Start</DiagramButton>
            <Counter startCountDown = {startCountDown}/>
          </Description>
          <DiagramContainer>
            <Diagram data={chartData} sizeOfSlice={sizeOfSlice} />
            <InfoContainer>
              <ImportantTitle>SYS/DIA</ImportantTitle>
              <ImportantValue>
                {SYS}/{DIA}
              </ImportantValue>
              <CircularContainer>
                <CircularValue>{qualityIndex}</CircularValue>
              </CircularContainer>
            </InfoContainer>
          </DiagramContainer>
        </DiagramWrapper>
      </div>
      <PageButtons
        dataName="BloodPressureData"
        texts={["SYS/DIA " + ""]}
        saved={saved}
        setSaved={setSaved}
      />
    </PageWrapper>
  );
};

export default BloodPressurePage;
