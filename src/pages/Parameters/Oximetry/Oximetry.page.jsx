import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Diagram from "@/components/Datagram/Diagram";
import oximetry from "@/assets/icon/parameter/oximetry.svg";
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

const OximetryPage = () => {
  const [data, setData] = useState();

  const [heartBeat, setHeartBeat] = useState(0);
  const [SPO2, setSPO2] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);
  const [saved, setSaved] = useState(0);
  const [filterActiveNum, setFilterActiveNum] = useState(0);

  const [filteredArray, setFilteredArray] = useState([]);

  function makeArrayFormString(arr) {
    return arr
      .split(" ")
      .map(function (item) {
        return Number(item);
      });
  }

  async function calculateBeatPerMinuteAPI(inputs) {
    console.log(inputs.data);
    let payload = {
      IR: "[" + inputs.data.ir.toString() + "]",
      Red: "[" + inputs.data.red.toString() + "]",
      fs: inputs.freq,
    };
    let res = await axios.post("http://127.0.0.1:5000//PPG_signal", payload);
    console.log(res.data);
    if (!Number(res.data.Try_Again)) {
      setHeartBeat(res.data.HeartRate);
      setSPO2(res.data.SpO2);
      setQualityIndex(res.data.Quality_index);
      setFilteredArray(
        [makeArrayFormString(res.data.clear_IR),
        inputs.data.red,
        makeArrayFormString(res.data.clear_Red),
        makeArrayFormString(res.data.PPG_clear),
        makeArrayFormString(res.data.PPG_clear)]
      );
    } else
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please repeat procedure!",
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
        <HighlightTitle title="Oximetry" icon={oximetry} />
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
              <SimpleTitle>SPO2</SimpleTitle>
              <SimpleValue>{SPO2}</SimpleValue>
              <CircularContainer>
                <CircularValue>{qualityIndex}</CircularValue>
              </CircularContainer>
            </InfoContainer>
          </DiagramContainer>
        </DiagramWrapper>
      </div>
      <PageButtons
        dataName="oximetryData"
        texts={
          ["Heart beat: " + heartBeat,
          "SPO2: " + SPO2,
          "Quality index: " + qualityIndex]
        }
      />
    </PageWrapper>
  );
};

export default OximetryPage;
