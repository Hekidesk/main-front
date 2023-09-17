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
  DropdownButton,
} from "./components/CSS";
import PageButtons from "@/components/reusable/PageButtons";
import axios from "axios";
import {
  makeArrayForChart,
  makeArrayFormString,
} from "@/components/reusableDataFunc/DataFunc";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import Counter from "@/components/Counter/Counter";
import { COMMAND, delayTime, pendingTime } from "./components/Constants";
import { SampleTimeDropDown } from "@/components/SampleTimeDropDown";

const HeartAndLungSoundPage = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState();
  const [filteredArray, setFilteredArray] = useState(null);
  const [filter, setFilter] = useState(1);
  const [filterActiveNum, setFilterActiveNum] = useState(-1);
  const [sizeOfSlice, setSizeOfSlice] = useState(-1);
  const [disable, setDisable] = useState(1);

  const [heartBeat, setHeartBeat] = useState("-?-");
  const [respirationRate, setRespirationRate] = useState("-?-");
  const [qualityIndex, setQualityIndex] = useState(0);
  const [position, setPosition] = useState("heart");

  const dbFunc = useAddToDB("PCGData");

  const bluetooth = useContext(BluetoothContext);

  async function getDataAPI(data, fs) {
    let payload = {
      pcg: "[" + data?.toString() + "]",
      fs: fs,
    };
    let addr =
      position === "heart" ? "/PCG_signal/heart" : "/PCG_signal/optional";
    let res = await axios.post(addr, payload).catch(console.log);
    return res?.data;
  }

  async function calculateBeatPerMinuteAPI(pcg) {
    getDataAPI(pcg, bluetooth.GetFrequency()[0]).then((res) => {
      if (!res) return;
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
    if (filteredArray) {
      setChartData(
        filter
          ? makeArrayForChart(
              filteredArray[
                filterActiveNum === -1 ? filterActiveNum + 1 : filterActiveNum
              ]
            )
          : makeArrayForChart(
              filteredArray[
                filterActiveNum === -1
                  ? filterActiveNum + 2
                  : filterActiveNum + 1
              ]
            )
      );
    }
  }, [filterActiveNum, filter]);

  useEffect(() => {
    if (bluetooth.finish) {
      if (data.length) {
        setChartData(makeArrayForChart(data));
        calculateBeatPerMinuteAPI(data);
      }
    }
    return bluetooth.TurnOff;
  }, [bluetooth]);

  const [startCountDown, setStartCountDown] = useState(0);
  const [counter, setCounter] = useState(5);
  const [sampleTime, setSampleTime] = useState(10);

  const startTime = useRef(null);
  const endTime = useRef(null);

  const flushData = () => {
    setStartCountDown(1);
    setDisable(1);
    setData([]);
    setChartData([]);
    setHeartBeat("-?-");
    setRespirationRate("-?-");
    setQualityIndex(0);
  };

  const startInput = () => {
    flushData();

    bluetooth.SendCommand(COMMAND, (input) => {
      setChartData(makeArrayForChart(input.pcg));
      setData(input.pcg);
    });

    setCounter(5);
    let startTimeDuration = 0;
    startTime.current = setTimeout(() => {
      bluetooth.Start().then((result) => (startTimeDuration = result));
      setCounter(sampleTime);
      setSizeOfSlice(12000);
    }, [pendingTime + delayTime]);
    endTime.current = setTimeout(() => {
      setCounter(5);
      setStartCountDown(0);
      bluetooth.Stop(startTimeDuration);
      setSizeOfSlice(-1);
    }, [sampleTime * 1000 + pendingTime + delayTime]);
  };

  async function playAudio() {
    const finalSound = filter
      ? filteredArray[filterActiveNum]
      : filteredArray[filterActiveNum + 1];
    let payload = {
      sound: "[" + finalSound?.toString() + "]",
      fs: bluetooth.GetFrequency()[0],
    };
    let res = await axios.post("/rcv_audio", payload).catch(console.log);
    if (res.statusText === "OK") {
      const { data } = await axios.get("/snd_audio", {
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
            <SampleTimeDropDown
              sampleTime={sampleTime}
              setSampleTime={setSampleTime}
            />
            <CircularContainer>
              <Counter counter={counter} startCountDown={startCountDown} />
            </CircularContainer>
          </Description>
          <DiagramContainer>
            <Diagram data={chartData} sizeOfSlice={sizeOfSlice} />
            <InfoContainer>
              <ImportantTitle>Heart Beat (bpm)</ImportantTitle>
              <ImportantValue>{heartBeat}</ImportantValue>
              <SimpleTitle>Respiration Rate (bpm)</SimpleTitle>
              <SimpleValue>{respirationRate}</SimpleValue>
              <Button
                style={filterButton}
                onClick={() => setFilter(1 - filter)}
                disabled={disable}
              >
                {filter % 2 ? "filtered" : "main"} signal
              </Button>
              <DropdownButton>
                <Dropdown
                  style={{ width: "80%" }}
                  value={filterActiveNum}
                  onChange={(e) => setFilterActiveNum(e.value)}
                  options={[
                    { name: "both", value: 0 },
                    { name: "heart", value: 2 },
                    { name: "lung", value: 4 },
                  ]}
                  optionLabel="name"
                  placeholder="Choose Signal  ↓"
                  disabled={disable}
                />
              </DropdownButton>
              <Button
                style={filterButton}
                onClick={() => playAudio()}
                className="filter-btn"
                disabled={disable}
              >
                <div style={{ fontSize: "15px", display: "inline" }}>
                  Play Sound
                </div>{" "}
                <div style={{ display: "inline" }}>
                  <img src={playSoundIcon} width={"20"} height={"20"} />
                </div>
              </Button>
            </InfoContainer>
          </DiagramContainer>
        </DiagramWrapper>
      </div>
      <PageButtons
        disable={disable}
        dataName="pcgData"
        texts={[
          "Heart beat: " + heartBeat,
          "Respiration rate: " + respirationRate,
          "Quality index: " + qualityIndex,
        ]}
        onClick={() => {
          var dataParameter = {};
          dataParameter["heartBeatSound"] = heartBeat;
          dataParameter["respirationRate"] = respirationRate;
          dbFunc.updateHistory(dataParameter);
        }}
      />
    </PageWrapper>
  );
};

export default HeartAndLungSoundPage;
