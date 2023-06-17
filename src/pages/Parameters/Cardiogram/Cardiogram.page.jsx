import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Diagram from "@/components/Datagram/Diagram";
import HeartIcon from "@/assets/icon/parameter/heart.svg";
import HighlightTitle from "@/components/HighlightTitle/HighlightTitle";
import { useEffect, useState } from "react";
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
} from "./components/CSS";
import PageButtons from "@/components/reusable/PageButtons";
import axios from "axios";
import Swal from "sweetalert2";

const CardiogramPage = () => {
  const [data, setData] = useState();

  const [heartBeat, setHeartBeat] = useState("");
  const [qualityIndex, setQualityIndex] = useState("");
  const [PR_RR_Interval, setPR_RR_Interval] = useState("");
  const [QRS_Duration, setQRSDuration] = useState("");
  const [dot, setDot] = useState([]);
  const [saved, setSaved] = useState(0);
  const [hrv, setHrv] = useState([]);
  const [hrvVal, setHrvVal] = useState(0);
  const [ssTime, setSsTime] = useState([]);
  const [singleSpike, setSingleSpike] = useState([]);
  const [PQRST_ss, setPQRST_ss] = useState([]);
  const [ArrythmiaType, setArrythmiaType] = useState("");

  const [filteredArray, setFilteredArray] = useState([]);

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

  function makeArrayFormString(arr) {
    return arr
      .split(" ")
      .map(function (item) {
        return Number(item);
      });
  }

  async function calculateBeatPerMinuteAPI(inputs){
    console.log(inputs.data);
    let payload = {
      ECG: "[" + inputs.data.ecg.toString() + "]",
      fs: inputs.freq,
    };
    let res = await axios.post("http://127.0.0.1:5000//ECG_signal", payload);
    console.log(res.data);
    if(!Number(res.data.Try_Again)){
      setHeartBeat(Number(res.data.HeartRate));
      setPR_RR_Interval(res.data.PR_RR);
      setQRSDuration(res.data.QRS_duration);
      setQualityIndex(res.data.Quality_index);
      let newArr = makePQRST(
        makeArrayFormString(res.data.P),
        makeArrayFormString(res.data.Q),
        makeArrayFormString(res.data.R),
        makeArrayFormString(res.data.S),
        makeArrayFormString(res.data.T)
      );
      setDot(newArr);

      setSsTime(makeArrayFormString(res.data.ss_time));
      setSingleSpike(makeArrayFormString(res.data.single_spike));
      setPQRST_ss(makeArrayFormString(res.data.PQRST_ss));
      setHrv(makeArrayFormString(res.data.hrv));
      setHrvVal(res.data.hrv_val);
      setArrythmiaType(parseInt(res.data.arrhythmia_type_PQRST));
      let filterd_signal = makeArrayFormString(res.data.ECG_filtered);
      setFilteredArray([filterd_signal]);
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
    setData([
      { x: new Date(2017, 0, 1), y: 610 },
      { x: new Date(2017, 0, 2), y: 680 },
      { x: new Date(2017, 0, 3), y: 690 },
      { x: new Date(2017, 0, 4), y: 700 },
      { x: new Date(2017, 0, 5), y: 710 },
      { x: new Date(2017, 0, 6), y: 658 },
      { x: new Date(2017, 0, 7), y: 734 },
      { x: new Date(2017, 0, 8), y: 963 },
      { x: new Date(2017, 0, 9), y: 847 },
      { x: new Date(2017, 0, 10), y: 853 },
      { x: new Date(2017, 0, 11), y: 869 },
      { x: new Date(2017, 0, 12), y: 943 },
      { x: new Date(2017, 0, 13), y: 970 },
      { x: new Date(2017, 0, 14), y: 869 },
      { x: new Date(2017, 0, 15), y: 890 },
      { x: new Date(2017, 0, 16), y: 930 },
      { x: new Date(2017, 0, 17), y: 1850 },
      { x: new Date(2017, 0, 29), y: 890 },
      { x: new Date(2017, 0, 30), y: 930 },
      { x: new Date(2017, 0, 31), y: 750 },
    ]);
  }, []);

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
            <DiagramButton>Start</DiagramButton>
          </Description>
          <DiagramContainer>
            <Diagram data={data} />
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
      />
    </PageWrapper>
  );
};

export default CardiogramPage;
