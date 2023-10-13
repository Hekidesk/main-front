import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Diagram from "@/components/Datagram/Diagram";
import heartAndLungSound from "@/assets/icon/parameter/heartAndLungSound.svg";
import ChooseSignalIcon from "@/assets/icon/parameter/ChooseSignalIcon.svg";
import ChooseSignalHand from "@/assets/icon/parameter/ChooseSignalHand.svg";
import downArrowIcon from "@/assets/icon/downArrowIcon.svg";
import upArrowIcon from "@/assets/icon/upArrowIcon.svg";
// import playSoundIcon from "@/assets/icon/playSoundIcon.png";
import HighlightTitle from "@/components/HighlightTitle/HighlightTitle";
import { useEffect, useState, useContext, useRef } from "react";
import { BluetoothContext } from "@/App";
import { useAddToDB } from "@/database/AddToDB";
import {
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
  PlaySoundText,
  PlayBox,
  TimerWrapper,
  CircularPhoto,
  FilterButton,
  ChooseSignalWrapper,
  ButtonContainer,
  OneButtonContainer,
  ParameterContainer,
} from "./components/CSS";
import PageButtons from "@/components/reusable/PageButtons";
import axios from "axios";
import {
  makeArrayForChart,
  makeArrayFormString,
} from "@/components/reusableDataFunc/DataFunc";
import { Button } from "primereact/button";
import Counter from "@/components/Counter/Counter";
import AudioPlayer from "./components/AudioPlayer";
import { COMMAND, delayTime, pendingTime } from "./components/Constants";
import Swal from "sweetalert2";
import Timer from "@/components/Timer/Timer";
import resultIcon from "@/assets/icon/resultIcon.svg";
import PositionChoose from "./components/PositionChoose";

const HeartAndLungSoundPage = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState();
  const [filteredArray, setFilteredArray] = useState([]);
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

  const [answerReady, setAnswerReady] = useState(false);

  const [url, setUrl] = useState("");

  const [ChooseSignalClicked, setClicked] = useState(false);

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
    setAnswerReady(true);
    getDataAPI(pcg, bluetooth.GetFrequency()[0]).then((res) => {
      if (!res) {
        setAnswerReady(false);
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: "Please repeat procedure!",
          confirmButtonColor: "#3085d6",
        });
        return;
      }
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
      setAnswerReady(false);
    });
  }

  const isFirstRender1 = useRef(true);
  useEffect(() => {
    if (isFirstRender1.current) {
      isFirstRender1.current = false;
      return;
    }
    playAudio();
  }, [filteredArray]);

  const isFirstRender2 = useRef(true);
  useEffect(() => {
    if (isFirstRender2.current) {
      isFirstRender2.current = false;
      return;
    }
    playAudio();
  }, [filterActiveNum, filter]);

  useEffect(() => {
    if (bluetooth.finish) {
      if (data.length) {
        setChartData(makeArrayForChart(data));
        calculateBeatPerMinuteAPI(data);
        console.log("hi");
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
    setFilteredArray([]);
    setHeartBeat("-?-");
    setRespirationRate("-?-");
    setCounter(5);
    setQualityIndex(0);
  };

  const tempSizeOfSlice = 20000;

  const startInput = () => {
    flushData();
    bluetooth.SendCommand(COMMAND, (input) => {
      setChartData(
        makeArrayForChart(
          bluetooth.finish
            ? input.pcg.length - tempSizeOfSlice > 0
              ? input.pcg.slice(input.pcg.length - tempSizeOfSlice)
              : input.pcg
            : input.pcg
        )
      );
      setData(
        bluetooth.finish
          ? input.pcg.length - tempSizeOfSlice > 0
            ? input.pcg.slice(input.pcg.length - tempSizeOfSlice)
            : input.pcg
          : input.pcg
      );
    });
    let startTimeDuration = 0;
    startTime.current = setTimeout(() => {
      bluetooth.Start().then((result) => (startTimeDuration = result));
      setCounter(sampleTime);
      setSizeOfSlice(tempSizeOfSlice);
    }, [pendingTime + delayTime]);
    endTime.current = setTimeout(() => {
      setCounter(5);
      setStartCountDown(0);
      bluetooth.Stop(startTimeDuration);
      setSizeOfSlice(-1);
    }, [sampleTime * 1000 + pendingTime + delayTime]);
  };

  async function playAudio() {
    const finalSound =
      filter && filterActiveNum !== -1
        ? filteredArray[filterActiveNum]
        : filteredArray[filterActiveNum + 1];
    let payload = {
      sound: "[" + finalSound?.toString() + "]",
      fs: bluetooth.GetFrequency()[0],
    };
    let res = await axios.post("/rcv_audio", payload);
    console.log(res);
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
      setUrl(url);
    }
  }

  return (
    <PageWrapper blurBackground={answerReady} answerReady={answerReady}>
      <HighlightTitle title="Heart Lung Sound" icon={heartAndLungSound} />
      <div style={{ display: "flex", marginBottom: "2em" }}>
        <div style={{ width: "75%" }}>
          <TimerWrapper>
            <PositionChoose position={position} setPosition={setPosition} />
            <Timer sampleTime={sampleTime} setSampleTime={setSampleTime} />
            <DiagramButton onClick={startInput}>START</DiagramButton>
          </TimerWrapper>
          <DiagramWrapper>
            <Description>
              <DiagramText>
                <CircularPhoto margin={true}>
                  <img src={heartAndLungSound} />{" "}
                </CircularPhoto>
                Please put your device on your specified posiotion{"   "}
              </DiagramText>
            </Description>
            <DiagramContainer>
              <Diagram data={chartData} sizeOfSlice={sizeOfSlice} />
            </DiagramContainer>
          </DiagramWrapper>
          <br />
          <DiagramWrapper>
            <Description>
              <CircularPhoto margin={true}>
                <img src={ChooseSignalHand} />{" "}
              </CircularPhoto>
              <DiagramText>please choose signal</DiagramText>
            </Description>
            <DiagramContainer>
              <Diagram
                data={
                  filter
                    ? makeArrayForChart(
                        filteredArray[
                          filterActiveNum === -1
                            ? filterActiveNum + 1
                            : filterActiveNum
                        ]
                      )
                    : makeArrayForChart(
                        filteredArray[
                          filterActiveNum === -1
                            ? filterActiveNum + 2
                            : filterActiveNum + 1
                        ]
                      )
                }
                sizeOfSlice={sizeOfSlice}
              />
            </DiagramContainer>
          </DiagramWrapper>
        </div>
        <div style={{ width: "30%" }}>
          <InfoContainer>
            <DiagramText>
              <CircularPhoto margin={true}>
                <img src={resultIcon} width={15} />
              </CircularPhoto>
              Results
            </DiagramText>
            <ParameterContainer>
              <ImportantTitle>Heart Beat (bpm)</ImportantTitle>
              <ImportantValue>{heartBeat}</ImportantValue>
              <SimpleTitle>Respiration Rate (bpm)</SimpleTitle>
              <SimpleValue>{respirationRate}</SimpleValue>
              <PlayBox>
                <PlaySoundText>
                  <div>Play Sound</div>
                </PlaySoundText>
                <AudioPlayer url={url} />
              </PlayBox>
            </ParameterContainer>
            <ChooseSignalWrapper clicked={ChooseSignalClicked}>
              <CircularPhoto margin={true}>
                <img src={ChooseSignalIcon} width={15} />
              </CircularPhoto>
              Choose Signal
              <CircularPhoto
                margin={false}
                onClick={() => setClicked(1 - ChooseSignalClicked)}
              >
                <img
                  src={ChooseSignalClicked ? upArrowIcon : downArrowIcon}
                  width={15}
                />
              </CircularPhoto>
              <ButtonContainer>
                <OneButtonContainer clicked={ChooseSignalClicked}>
                  <Button
                    className="filter-button filter-button-heart-size"
                    onClick={() => setFilterActiveNum(0)}
                    disabled={disable}
                  >
                    Both
                  </Button>
                </OneButtonContainer>
                <OneButtonContainer clicked={ChooseSignalClicked}>
                  <Button
                    className="filter-button filter-button-heart-size"
                    onClick={() => setFilterActiveNum(2)}
                    disabled={disable}
                  >
                    Heart
                  </Button>
                </OneButtonContainer>
                <OneButtonContainer clicked={ChooseSignalClicked}>
                  <Button
                    className="filter-button filter-button-heart-size"
                    onClick={() => setFilterActiveNum(2)}
                    disabled={disable}
                  >
                    Lung
                  </Button>
                </OneButtonContainer>
              </ButtonContainer>
            </ChooseSignalWrapper>
            <FilterButton>
              <Button
                onClick={() => setFilter(1 - filter)}
                className="filter-btn"
                disabled={disable}
              >
                {filter % 2 ? "Filtered" : "Main"} Signal
              </Button>
            </FilterButton>

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
          </InfoContainer>
        </div>
      </div>
    </PageWrapper>
  );
};

export default HeartAndLungSoundPage;
