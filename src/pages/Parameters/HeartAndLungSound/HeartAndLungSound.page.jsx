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
              <ImportantValue>-?-</ImportantValue>
              <SimpleTitle>bpm Respiration Rate</SimpleTitle>
              <SimpleValue>-</SimpleValue>
              <CircularContainer>
                <CircularValue>30</CircularValue>
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