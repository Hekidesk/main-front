import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Diagram from "@/components/Datagram/Diagram";
import heartAndLungSound from "@/assets/icon/parameter/heartAndLungSound.svg";
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

const HeartAndLungSoundPage = () => {
  const [data, setData] = useState();
  const [filteredArray, setFilteredArray] = useState([]);
  const [filterActiveNum, setFilterActiveNum] = useState(0);

  const [sound, setSound] = useState([]);
  const [filterdSound, setFilterdSound] = useState([]);
  const [heartSound, setHeartSound] = useState([]);
  const [preHeartSound, setPreHeartSound] = useState([]);
  const [lungSound, setLungSound] = useState([]);
  const [preLungSound, setPreLungSound] = useState([]);

  const [heartBeat, setHeartBeat] = useState(0);
  const [respirationRate, setRespirationRate] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);
  const [saved, setSaved] = useState(0);
  const [fs, setFs] = useState(0);
  const [position, setPosition] = useState("heart");


  async function getDataAPI(data, fs) {
    let payload = {
      pcg: "[" + data.toString() + "]",
      fs: fs,
    };
    let addr =
      position === "heart"
        ? "http://127.0.0.1:5000//PCG_signal/heart"
        : "http://127.0.0.1:5000//PCG_signal/optional";
    let res = await axios.post(addr, payload);
    return res.data;
  }

  async function calculateBeatPerMinuteAPI(inputs) {
    console.log(inputs.data);
    setSound(inputs.data.pcg);
    setFs(inputs.freq);
    return getDataAPI(inputs.data.pcg, inputs.freq).then((res) => {
      console.log(res);
      setHeartBeat(res.heart_rate);
      setRespirationRate(res.respiration_rate);
      setQualityIndex(res.lung_quality_ind);
      const filterdSound = makeArrayFormString(res.pcg_filtered);
      const preHeartSound = makeArrayFormString(res.heart_signal_pre);
      const heartSound = makeArrayFormString(res.heart_signal);
      const preLungSound = makeArrayFormString(res.lung_signal_pre);
      const lungSound = makeArrayFormString(res.lung_signal);
      setFilterdSound(filterdSound);
      setPreHeartSound(preHeartSound);
      setHeartSound(heartSound);
      setPreLungSound(preLungSound);
      setLungSound(lungSound);
      setFilteredArray([filterdSound, preHeartSound, heartSound, preLungSound, lungSound]);
    });
  }

  useEffect(() => {
    if (bluetooth)
      bluetooth.SendCommand(COMMAND, (input) => {
        console.log(input.temperature)
        setChartData(makeArrayForChart(input.temperature));
        setData(input.temperature);
      });
    if (bluetooth.finish) {
      calculateTemperature(data);
    }
    return bluetooth.turnOff;
  }, [bluetooth]);

  useEffect(() => {
    if(saved){
      var dataParameter = {};
      dataParameter["temperature"] = temeperature;
      dbFunc.updateHistory(dataParameter);
    }
  }, [saved]);

  const [counter, setCounter] = useState(5);
  const [startCountDown, setStartCountDown] = useState(0);
  useEffect(() => {
    const timer =
      startCountDown && counter >= 0 && setInterval(() => setCounter(counter - 1), 1000);
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
      setStartCountDown(0);
    }, [pendingTime]);
    endTime.current = setTimeout(() => {
      bluetooth.Stop(startTimeDuration);
    }, [sampleTime + pendingTime]);
  };


  return (
    <PageWrapper>
      <div style={{ display: "grid", placeItems: "center" }}>
        <HighlightTitle title="Heart Lung Sound" icon={heartAndLungSound} />
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
              <ImportantValue>-{heartBeat}-</ImportantValue>
              <SimpleTitle>bpm Respiration Rate</SimpleTitle>
              <SimpleValue>{respirationRate}</SimpleValue>
              <CircularContainer>
                <CircularValue>{qualityIndex}</CircularValue>
              </CircularContainer>
            </InfoContainer>
          </DiagramContainer>
        </DiagramWrapper>
      </div>
      <PageButtons
        dataName="pcgData"
        texts={[
          "Heart beat: " + heartBeat,
          "Quality index: " + qualityIndex,
        ]}
      />
    </PageWrapper>
  );
};

export default HeartAndLungSoundPage;
