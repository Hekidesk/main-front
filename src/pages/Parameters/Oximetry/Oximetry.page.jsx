import "@/assets/styles/primereactStyle.css";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Diagram from "@/components/Datagram/Diagram";
import oximetryIcon from "@/assets/icon/parameter/oximetry.svg";
import ChooseSignalHand from "@/assets/icon/parameter/ChooseSignalHand.svg";
import HighlightTitle from "@/components/HighlightTitle/HighlightTitle";
import { useEffect, useState, useContext, useRef } from "react";
import {
  Description,
  DiagramButton,
  DiagramContainer,
  DiagramText,
  DiagramWrapper,
  CircularPhoto,
  TimerWrapper,
} from "./components/CSS";
import { BluetoothContext } from "@/App";
import axios from "axios";
import {
  makeArrayForChart,
  makeArrayFormString,
} from "@/components/reusableDataFunc/DataFunc";
import Swal from "sweetalert2";
import { COMMAND, delayTime, pendingTime } from "./components/Constants";
import Timer from "@/components/Timer/Timer";
import { Info } from "./components/InfoContainer";

const OximetryPage = () => {
  const [IrData, setIrData] = useState();
  const [RedData, setRedData] = useState();
  const [chartData, setChartData] = useState();
  const [sizeOfSlice, setSizeOfSlice] = useState(-1);

  const initial_state = {
    heartBeat: "-?-",
    SPO2: "-",
    qualityIndex: "-",
  };
  const [result, setResult] = useState(initial_state);

  const [filteredArray, setFilteredArray] = useState([]);
  const [filterActiveNum, setFilterActiveNum] = useState(-1);
  const [filter, setFilter] = useState(1);
  const [disable, setDisable] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [startCountDown, setStartCountDown] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [counter, setCounter] = useState(5);
  const [sampleTime, setSampleTime] = useState(10);

  const startTime = useRef(null);
  const endTime = useRef(null);

  const bluetooth = useContext(BluetoothContext);

  async function calculateBeatPerMinuteAPI(irData, RedData) {
    let payload = {
      IR: "[" + irData?.toString() + "]",
      Red: "[" + RedData?.toString() + "]",
      fs: bluetooth.GetFrequency()[0],
    };
    let res = await axios.post("/PPG_signal", payload).catch(console.log);
    if (res?.data) {
      if (!Number(res?.data.Try_Again)) {
        setResult({
          heartBeat: res.data.HeartRate,
          SPO2: res.data.SpO2,
          qualityIndex: res.data.Quality_index,
        });
        setFilteredArray([
          makeArrayForChart(irData),
          makeArrayForChart(makeArrayFormString(res.data.clear_IR)),
          makeArrayForChart(RedData),
          makeArrayForChart(makeArrayFormString(res.data.clear_Red)),
          makeArrayForChart(makeArrayFormString(res.data.PPG_clear)),
          makeArrayForChart(makeArrayFormString(res.data.PPG_clear)),
        ]);
        setDisable(0);
      }
    } else
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please repeat procedure!",
        confirmButtonColor: "#3085d6",
      });
  }

  useEffect(() => {
    if (bluetooth.finish) {
      calculateBeatPerMinuteAPI(IrData, RedData);
    }
    return bluetooth.TurnOff;
  }, [bluetooth]);

  const [showDownCounter, setShowDownCounter] = useState(false);

  useEffect(() => {
    setCounter(sampleTime);
  }, [sampleTime]);

  const flushData = () => {
    setDisable(1);
    setChartData([]);
    setResult(initial_state);
    setCounter(sampleTime);
    setShowDownCounter(true);
  };

  const startInput = () => {
    if (bluetooth.CheckConnection()) return;
    let startTimeDuration = 0;
    flushData();

    bluetooth.SendCommand(COMMAND, (input) => {
      setChartData(makeArrayForChart(input.ir));
      setIrData(input.ir);
      setRedData(input.red);
    });

    startTime.current = setTimeout(() => {
      console.log("hi it's me");
      bluetooth.Start().then((result) => (startTimeDuration = result));
      setShowDownCounter(false);
      setStartCountDown(1);
      setSizeOfSlice(400);
    }, [pendingTime + delayTime]);
    endTime.current = setTimeout(() => {
      setSizeOfSlice(-1);
      setStartCountDown(0);
      setCounter(sampleTime);
      bluetooth.Stop(startTimeDuration);
    }, [sampleTime * 1000 + pendingTime + delayTime * 2]);
  };

  return (
    <PageWrapper
      showDownCounter={showDownCounter}
      blurBackground={showDownCounter}
    >
      <HighlightTitle title="Oximetry" />
      <div style={{ display: "flex", marginBottom: "2em" }}>
        <div style={{ width: "75%" }}>
          <TimerWrapper>
            <Timer sampleTime={sampleTime} setSampleTime={setSampleTime} />
            <DiagramButton onClick={startInput}>START</DiagramButton>
          </TimerWrapper>
          <br />
          <DiagramWrapper>
            <Description>
              <CircularPhoto margin={true}>
                <img src={oximetryIcon} />{" "}
              </CircularPhoto>
              <DiagramText>
                Please put your finger on PPG sensor and then press
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
                    ? filteredArray[
                        filterActiveNum === -1
                          ? filterActiveNum + 1
                          : filterActiveNum
                      ]
                    : filteredArray[
                        filterActiveNum === -1
                          ? filterActiveNum + 2
                          : filterActiveNum + 1
                      ]
                }
                sizeOfSlice={sizeOfSlice}
              />
            </DiagramContainer>
          </DiagramWrapper>
        </div>
        <div style={{ width: "35%" }}>
          <Info
            result={result}
            disable={disable}
            setFilter={setFilter}
            filter={filter}
            setFilterActiveNum={setFilterActiveNum}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default OximetryPage;
