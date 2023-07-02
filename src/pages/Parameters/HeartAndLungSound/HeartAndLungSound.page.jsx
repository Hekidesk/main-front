import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Diagram from "@/components/Datagram/Diagram";
import heartAndLungSound from "@/assets/icon/parameter/heartAndLungSound.svg";
import playSoundIcon from "@/assets/icon/playSoundIcon.png";
import HighlightTitle from "@/components/HighlightTitle/HighlightTitle";
import { useEffect, useState, useContext, useRef } from "react";
import { BluetoothContext } from "@/App";
import { useAddToDB } from "@/database/AddToDB";
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
import {
  makeArrayForChart,
  makeArrayFormString,
} from "@/components/reusableDataFunc/DataFunc";
import { Button, Dropdown, DropdownButton, Image } from "react-bootstrap";
import { RadioButton } from "primereact/radiobutton";
import Counter from "@/components/Counter/Counter";

const HeartAndLungSoundPage = () => {
  const [data, setData] = useState();
  const [chartData, setChartData] = useState();
  const [filteredArray, setFilteredArray] = useState(null);
  const [filter, setFilter] = useState(1);
  const [filterActiveNum, setFilterActiveNum] = useState(0);
  const [sizeOfSlice, setSizeOfSlice] = useState(-1);
  const [disable, setDisable] = useState(1);

  const [heartBeat, setHeartBeat] = useState(0);
  const [respirationRate, setRespirationRate] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);
  const [position, setPosition] = useState("heart");

  const dbFunc = useAddToDB("PCGData");
  const [saved, setSaved] = useState(0);

  const bluetooth = useContext(BluetoothContext);
  const COMMAND = 0x03;

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

  async function calculateBeatPerMinuteAPI(pcg) {
    console.log(pcg);
    return getDataAPI(pcg, bluetooth.GetFrequency()[0]).then((res) => {
      console.log(res);
      setHeartBeat(res.heart_rate);
      setRespirationRate(res.respiration_rate);
      setQualityIndex(res.lung_quality_ind);
      setFilteredArray([
        data,
        makeArrayFormString(res.pcg_filtered),
        makeArrayFormString(res.heart_signal_pre),
        makeArrayFormString(res.heart_signal),
        makeArrayFormString(res.lung_signal_pre),
        makeArrayFormString(res.lung_signal),
      ]);
      setDisable(0);
    });
  }

  useEffect(() => {
    console.log(filterActiveNum);
    console.log(filter);
    if (filteredArray) {
      console.log(
        filter
          ? filteredArray[filterActiveNum]
          : filteredArray[filterActiveNum + 1]
      );
      setChartData(
        filter
          ? makeArrayForChart(filteredArray[filterActiveNum])
          : makeArrayForChart(filteredArray[filterActiveNum + 1])
      );
    }
  }, [filterActiveNum, filter]);

  useEffect(() => {
    if (bluetooth)
      bluetooth.SendCommand(COMMAND, (input) => {
        setChartData(makeArrayForChart(input.pcg));
        setData(input.pcg);
      });
    if (bluetooth.finish) {
      calculateBeatPerMinuteAPI(data);
      console.log(filteredArray);
    }
    return bluetooth.turnOff;
  }, [bluetooth]);

  useEffect(() => {
    if (saved) {
      var dataParameter = {};
      dataParameter["heartBeatSound"] = heartBeat;
      dataParameter["respirationRate"] = respirationRate;
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
    startTime.current = setTimeout(() => {
      bluetooth.Start().then((result) => (startTimeDuration = result));
      setStartCountDown(0);
      setSizeOfSlice(10000);
    }, [pendingTime]);
    endTime.current = setTimeout(() => {
      bluetooth.Stop(startTimeDuration);
      setSizeOfSlice(-1);
    }, [sampleTime + pendingTime]);
  };

  async function playAudio() {
    const finalSound = filter
      ? filteredArray[filterActiveNum]
      : filteredArray[filterActiveNum + 1];
    console.log(finalSound);
    let payload = {
      sound: "[" + finalSound.toString() + "]",
      fs: bluetooth.GetFrequency()[0],
    };
    let res = await axios.post("http://127.0.0.1:5000//rcv_audio", payload);
    if (res.statusText === "OK") {
      const { data } = await axios.get("http://127.0.0.1:5000//snd_audio", {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "audio/x-wav",
        },
      });
      const blob = new Blob([data], {
        type: "audio/x-wav",
      });
      const url = URL.createObjectURL(blob);
      let audio = new Audio(url);
      audio.play();
    }
  }

  return (
    <PageWrapper>
      <div style={{ display: "grid", placeItems: "center" }}>
        <HighlightTitle title="Heart Lung Sound" icon={heartAndLungSound} />
        <br />
        <DiagramWrapper>
          <Description>
            <DiagramText>
              Please put your device on your specified posiotion{"   "}
            </DiagramText>
            <div
              className="flex align-items-center"
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                color: "white",
                paddingBottom: "0.4em",
              }}
            >
              <RadioButton
                style={{ marginLeft: "10px" }}
                inputId="ingredient1"
                name="heart"
                value="heart"
                onChange={(e) => setPosition(e.value)}
                checked={position === "heart"}
              />
              <label htmlFor="ingredient1" style={{ marginLeft: "5px" }}>
                Heart
              </label>
              <RadioButton
                style={{ marginLeft: "10px" }}
                inputId="ingredient2"
                name="optional"
                value="optional"
                onChange={(e) => setPosition(e.value)}
                checked={position === "optional"}
              />
              <label htmlFor="ingredient2" style={{ marginLeft: "5px" }}>
                Optional
              </label>
            </div>
            <DiagramButton onClick={startInput}>Start</DiagramButton>
            <Counter startCountDown = {startCountDown}/>
          </Description>
          <DiagramContainer>
            <Diagram data={chartData} sizeOfSlice={sizeOfSlice} />
            <InfoContainer>
              <ImportantTitle>bpmHr</ImportantTitle>
              <ImportantValue>-{heartBeat}-</ImportantValue>
              <SimpleTitle>bpm Respiration Rate</SimpleTitle>
              <SimpleValue>{respirationRate}</SimpleValue>
              <CircularContainer>
                <CircularValue>{qualityIndex}</CircularValue>
              </CircularContainer>
              <Button
                style={filterButton}
                onClick={() => setFilter(1 - filter)}
                disabled={disable}
              >
                {filter % 2 ? "filtered" : "main"} signal
              </Button>
              <DropdownButton
                id="dropdown-basic-button"
                title="Choose signal"
                disabled={disable}
              >
                <Dropdown.Item
                  onClick={() => setFilterActiveNum(0)}
                  active={filterActiveNum === 0 || filterActiveNum === 1}
                >
                  both
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setFilterActiveNum(2)}
                  active={filterActiveNum === 2 || filterActiveNum === 3}
                >
                  heart
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setFilterActiveNum(4)}
                  active={filterActiveNum === 4 || filterActiveNum === 5}
                >
                  lung
                </Dropdown.Item>
              </DropdownButton>
              <Button style={filterButton} onClick={() => playAudio()} disabled={disable}>
                <div style={{ fontSize: "15px", display: "inline" }}>
                  Play Sound
                </div>{" "}
                <div style={{ display: "inline" }}>
                  <Image src={playSoundIcon} width={"20"} height={"20"} />
                </div>
              </Button>
            </InfoContainer>
          </DiagramContainer>
        </DiagramWrapper>
      </div>
      <PageButtons
        dataName="pcgData"
        texts={["Heart beat: " + heartBeat, "Respiration rate: " + respirationRate ,"Quality index: " + qualityIndex]}
        saved={saved}
        setSaved={setSaved}
      />
    </PageWrapper>
  );
};

export default HeartAndLungSoundPage;
