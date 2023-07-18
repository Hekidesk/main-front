import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Diagram from "@/components/Datagram/Diagram";
import HeartIcon from "@/assets/icon/parameter/heart.svg";
import HighlightTitle from "@/components/HighlightTitle/HighlightTitle";
import { useEffect, useState, useRef, useContext } from "react";
import { BluetoothContext } from "@/App";
import {
  CircularContainer,
  // CircularValue,
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
  SmallSimpleValue,
  filterButton,
  AbnormalityDiagramContainer,
} from "./components/CSS";
import PageButtons from "@/components/reusable/PageButtons";
import axios from "axios";
import Swal from "sweetalert2";
import {
  makeArrayForChart,
  makeArrayFormString,
  makeFilteredArray,
} from "@/components/reusableDataFunc/DataFunc";
import { Button } from "react-bootstrap";
import { useAddToDB } from "@/database/AddToDB";
import AbnormalityDetection from "./AbnormalityDetection";
import Counter from "@/components/Counter/Counter";

const CardiogramPage = () => {
  const COMMAND = 0x02;

  const bluetooth = useContext(BluetoothContext);
  const dbFunc = useAddToDB("cardiogramData");
  const [saved, setSaved] = useState(0);

  const [data, setData] = useState();
  const [filteredArray, setFilteredArray] = useState([]);
  const [filter, setFilter] = useState(1);
  const [chartData, setChartData] = useState();
  const [sizeOfSlice, setSizeOfSlice] = useState(-1);
  const [disable, setDisable] = useState(1);

  const [heartBeat, setHeartBeat] = useState("-?-");
  const [qualityIndex, setQualityIndex] = useState("-");
  const [PR_RR_Interval, setPR_RR_Interval] = useState("-");
  const [QRS_Duration, setQRSDuration] = useState("-");
  const [hrv, setHrv] = useState([]);
  const [hrvVal, setHrvVal] = useState("-");
  const [ssTime, setSsTime] = useState([]);
  const [singleSpike, setSingleSpike] = useState([]);
  const [PQRST_ss, setPQRST_ss] = useState([]);
  const [ArrythmiaType, setArrythmiaType] = useState(-1);

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

  async function calculateBeatPerMinuteAPI(ecg) {
    console.log("data: " + ecg);
    let payload = {
      ECG: "[" + ecg.toString() + "]",
      fs: bluetooth.GetFrequency()[0],
    };
    let res = await axios.post("https://api.hekidesk.com//ECG_signal", payload);
    console.log(res.data);
    if (!Number(res.data.Try_Again)) {
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
      setFilteredArray(makeFilteredArray(dot, filtered_signal));
      setFilteredArray([
        makeFilteredArray(dot, filtered_signal),
        makeArrayForChart(ecg),
      ]);
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
    setChartData(filteredArray[filter]);
  }, [filter]);

  const [startCountDown, setStartCountDown] = useState(0);
  const [counter, setCounter] = useState(5);
  
  const pendingTime = 5000;
  const sampleTime = 10000;
  const startTime = useRef(null);
  const endTime = useRef(null);
  const delayTime = 30; 

  const flushData = () => {
    setDisable(1);
    setChartData([]);
    setStartCountDown(1);
    setSaved(0);
    setHeartBeat("-?-");
    setQualityIndex("");
    setPR_RR_Interval("-");
    setQRSDuration("-");
    setHrv([]);
    setSsTime([]);
    setHrvVal("-");
    setPQRST_ss([]);
    setArrythmiaType(-1);
  }

  const startInput = () => {
    let startTimeDuration = 0;
    flushData();
    startTime.current = setTimeout(() => {
      bluetooth.Start().then((result) => (startTimeDuration = result));
      setSizeOfSlice(400);
      setCounter(10);
    }, [pendingTime + delayTime]);
    endTime.current = setTimeout(() => {
      setCounter(5);
      setStartCountDown(0);
      bluetooth.Stop(startTimeDuration);
      setSizeOfSlice(-1);
    }, [sampleTime + pendingTime + delayTime]);
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
    if (saved) {
      var dataParameter = {};
      dataParameter["heartBeatECG"] = heartBeat;
      dataParameter["PR_RR_Interval"] = PR_RR_Interval;
      dataParameter["QRS_Duration"] = QRS_Duration;
      dataParameter["hrvVal"] = hrvVal;
      dataParameter["ArrythmiaType"] = types[ArrythmiaType];
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
            <CircularContainer>
                <Counter counter = {counter} startCountDown={startCountDown} />
            </CircularContainer>
          </Description>
          <DiagramContainer>
            <Diagram data={chartData} sizeOfSlice={sizeOfSlice} />
            <InfoContainer>
              <ImportantTitle>Heart Beat (bpm)</ImportantTitle>
              <ImportantValue>{heartBeat}</ImportantValue>
              <SimpleTitle>PR/RR Interval</SimpleTitle>
              <SimpleValue>{PR_RR_Interval}</SimpleValue>
              <SimpleTitle>QRS Duration</SimpleTitle>
              <SimpleValue>{QRS_Duration}</SimpleValue>
              <SimpleTitle>hrv</SimpleTitle>
              <SimpleValue>{hrvVal}</SimpleValue>
              <SimpleTitle>Quality Index</SimpleTitle>
              <SimpleValue>{qualityIndex}</SimpleValue>
              <SimpleTitle>Arrythmia Type</SimpleTitle>
              <SmallSimpleValue>{ArrythmiaType !== -1 ?  types[ArrythmiaType] : "-"}</SmallSimpleValue>
              
              <Button
                style={filterButton}
                onClick={() => setFilter(1 - filter)}
                disabled = {disable}
              >
                {filter % 2 ? "filtered" : "main"} signal
              </Button>
            </InfoContainer>
          </DiagramContainer>
          <AbnormalityDiagramContainer>
            <AbnormalityDetection
              heartBeat={heartBeat}
              hrv={hrv}
              ssTime={ssTime}
              singleSpike={singleSpike}
              PQRST_ss={PQRST_ss}
            ></AbnormalityDetection>
          </AbnormalityDiagramContainer>
        </DiagramWrapper>
      </div>
      <PageButtons
        disable = {disable}
        dataName="cardiogramData"
        texts={[
          "Heart beat: " + heartBeat,
          "PR/RR Interval: " + PR_RR_Interval,
          "QRS Duration: " + QRS_Duration,
        ]}
        extraChartName={[
          "#chartContainerAbnormality1 canvas",
          "#chartContainerAbnormality2 canvas",
        ]}
        extraText={[
          ["hrv: " + hrvVal],
          ["Arrythmia Type: " + types[ArrythmiaType]],
        ]}
        saved={saved}
        setSaved={setSaved}
      />
    </PageWrapper>
  );
};

export default CardiogramPage;
