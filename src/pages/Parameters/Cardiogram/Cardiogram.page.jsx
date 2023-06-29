import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Diagram from "@/components/Datagram/Diagram";
import HeartIcon from "@/assets/icon/parameter/heart.svg";
import HighlightTitle from "@/components/HighlightTitle/HighlightTitle";
import { useEffect, useState, useRef, useContext } from "react";
import { BluetoothContext } from "@/App";
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
  SimpleTitle,
  SimpleValue,
  filterButton,
} from "./components/CSS";
import PageButtons from "@/components/reusable/PageButtons";
import axios from "axios";
import Swal from "sweetalert2";
import { makeArrayForChart, makeArrayFormString, makeFilteredArray } from "@/components/reusableDataFunc/DataFunc";
import { CountDownNumber } from "../../Demo/components/CSS";
import { Button } from "react-bootstrap";
import { useAddToDB } from "@/database/AddToDB";

const CardiogramPage = () => {
  const COMMAND = 0x02;

  const bluetooth = useContext(BluetoothContext);
  // const dbFunc = useAddToDB("oximetryData");
  const [saved, setSaved] = useState(0);

  const [data, setData] = useState();
  const [filteredArray, setFilteredArray] = useState([]);
  const [filter, setFilter] = useState(1);
  const [chartData, setChartData] = useState();

  const [heartBeat, setHeartBeat] = useState("");
  const [qualityIndex, setQualityIndex] = useState("");
  const [PR_RR_Interval, setPR_RR_Interval] = useState("");
  const [QRS_Duration, setQRSDuration] = useState("");
  const [hrv, setHrv] = useState([]);
  const [hrvVal, setHrvVal] = useState(0);
  const [ssTime, setSsTime] = useState([]);
  const [singleSpike, setSingleSpike] = useState([]);
  const [PQRST_ss, setPQRST_ss] = useState([]);
  const [ArrythmiaType, setArrythmiaType] = useState("");

  const types = [
    "Normal",
    "Sinus Tachicardia",
    "Sinus Bradicardia",
    "Premature Atrial Contrature (PAC)",
    "Paroxysmal Atrial Tachycardia (PAT)",
    "Multifocul Atrial Tachycardia (MAT)",
  ];

  function makePQRST(ps, qs, rs, ss, ts) {
    let newArr = [];
    for (const p of ps) newArr.push({ x: Number(p), color: "red" });
    for (const q of qs) newArr.push({ x: Number(q), color: "blue" });
    for (const r of rs) newArr.push({ x: Number(r), color: "black" });
    for (const s of ss) newArr.push({ x: Number(s), color: "white" });
    for (const t of ts) newArr.push({ x: Number(t), color: "orange" });
    // console.log("newParr: " + JSON.stringify(newArr));
    return newArr;
  }

  async function calculateBeatPerMinuteAPI(ecg){
    console.log("data: " + ecg)
    let payload = {
      ECG: "[" + ecg.toString() + "]",
      fs: bluetooth.GetFrequency()[0],
    };
    let res = await axios.post("http://127.0.0.1:5000//ECG_signal", payload);
    console.log(res.data);
    if(!Number(res.data.Try_Again)){
      setHeartBeat(Number(res.data.HeartRate));
      setPR_RR_Interval(res.data.PR_RR);
      setQRSDuration(res.data.QRS_duration);
      setQualityIndex(res.data.Quality_index);
      let dot = makePQRST(
        makeArrayFormString(res.data.P),
        makeArrayFormString(res.data.Q),
        makeArrayFormString(res.data.R),
        makeArrayFormString(res.data.S),
        makeArrayFormString(res.data.T)
      );

      setSsTime(makeArrayFormString(res.data.ss_time));
      setSingleSpike(makeArrayFormString(res.data.single_spike));
      setPQRST_ss(makeArrayFormString(res.data.PQRST_ss));
      setHrv(makeArrayFormString(res.data.hrv));
      setHrvVal(res.data.hrv_val);
      setArrythmiaType(parseInt(res.data.arrhythmia_type_PQRST));
      let filtered_signal = makeArrayFormString(res.data.ECG_filtered);
      setFilteredArray(makeFilteredArray(dot,filtered_signal));
      setFilteredArray([  
        makeFilteredArray(dot,filtered_signal),
        makeArrayForChart(ecg),
      ]);
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please repeat procedure!",
      });
    }
  }

  useEffect(() => {
    setChartData(filteredArray[filter]);
  },[filter]);

  const [counter, setCounter] = useState(5);
  const [startCountDown, setStartCountDown] = useState(0);
  useEffect(() => {
    const timer =
      startCountDown && counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter, startCountDown]);

  const pendingTime = 5000;
  const sampleTime = 10000;
  const startTime = useRef(null);
  const endTime = useRef(null);

  const startInput = () => {
    let startTimeDuration = 0;
    setStartCountDown(1);
    setCounter(5);
    startTime.current = setTimeout(() => {
      bluetooth.Start().then((result) => startTimeDuration = result);
      setSizeOfSlice(200);
      setStartCountDown(0);
    }, [pendingTime]);
    endTime.current = setTimeout(() => {
      bluetooth.Stop(startTimeDuration);
      setSizeOfSlice(-1);
    }, [sampleTime + pendingTime]);
  };

  useEffect(() => {
    if (bluetooth)
      bluetooth.SendCommand(COMMAND, (input) => {
        setChartData(makeArrayForChart(input.ecg));
        setData(input.ecg);
      });
      if (bluetooth.finish) {
      calculateBeatPerMinuteAPI(data);
    }
    return bluetooth.turnOff;
  }, [bluetooth]);

  useEffect(() => {
    if(saved){
      var dataParameter = {};
      dataParameter["heartBeatPPG"] = heartBeat;
      dataParameter["SPO2"] = SPO2;
      dbFunc.updateHistory(dataParameter);
    }
  }, [saved]);

  return (
    <PageWrapper>
      <div style={{ display: "grid", placeItems: "center" }}>
        <HighlightTitle title="Cardiogram" icon={HeartIcon} />
        <br />
        <DiagramWrapper>
          <Description>
            <DiagramText>
              Please put your right and left fingers on ECG sensors and then
              press
            </DiagramText>
            <DiagramButton onClick={startInput}>Start</DiagramButton>
            <CountDownNumber> {startCountDown ? counter : ""} </CountDownNumber>
          </Description>
          <DiagramContainer>
            <Diagram data={chartData} />
            <InfoContainer>
              <ImportantTitle>bpmHr</ImportantTitle>
              <ImportantValue>{heartBeat}</ImportantValue>
              <SimpleTitle>PR/RR Interval</SimpleTitle>
              <SimpleValue>{PR_RR_Interval}</SimpleValue>
              <SimpleTitle>QRS Duration</SimpleTitle>
              <SimpleValue>{QRS_Duration}</SimpleValue>
              <CircularContainer>
                <CircularValue>{qualityIndex}</CircularValue>
              </CircularContainer>
              <Button style={filterButton} onClick={() => setFilter(1-filter)}>
                {filter % 2 ? "filtered" : "main"} signal
              </Button>
            </InfoContainer>
          </DiagramContainer>

        
        </DiagramWrapper>
      </div>
      <PageButtons
        dataName="cardiogramData"
        texts={
          ["Heart beat: " + heartBeat,
          "PR/RR Interval: " + PR_RR_Interval,
          "QRS Duration: " + QRS_Duration]
        }
        extraChartName={[
          "#chartContainerAbnormality1 canvas",
          "#chartContainerAbnormality2 canvas",
        ]}
        extraText={[
          ["hrv: " + hrvVal],
          ["Arrythmia Type: " + types[ArrythmiaType]],
        ]}
        saved = {saved}
        setSaved = {setSaved}
      />
    </PageWrapper>
  );
};

export default CardiogramPage;
