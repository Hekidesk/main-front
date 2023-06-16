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

  const [sound, setSound] = useState([]);
  const [filterdSound, setFilterdSound] = useState([]);
  const [heartSound, setHeartSound] = useState([]);
  const [preHeartSound, setPreHeartSound] = useState([]);
  const [lungSound, setLungSound] = useState([]);
  const [preLungSound, setPreLungSound] = useState([]);

  const [heartBeat, setHeartBeat] = useState(0);
  const [respirationRate, setRespirationRate] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);
  const [filterActiveNum, setFilterActiveNum] = useState(0);
  const [saved, setSaved] = useState(0);
  const [fs, setFs] = useState(0);
  const [position, setPosition] = useState("heart");

  const [filteredArray, setFilteredArray] = useState([]);

  function makeArrayFormString(arr) {
    return arr
      .split(" ")
      .map(function (item) {
        return Number(item);
      });
  }

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
