import "@/assets/styles/primereactStyle.css";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Diagram from "@/components/Datagram/Diagram";
import HeartIcon from "@/assets/icon/parameter/heart.svg";
import HighlightTitle from "@/components/HighlightTitle/HighlightTitle";
import { useEffect, useState, useContext, useRef } from "react";
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
import { BluetoothContext } from "@/App";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { useAddToDB } from "@/database/AddToDB";
import PageButtons from "@/components/reusable/PageButtons";
import {
  makeArrayForChart,
  makeArrayFormString,
} from "@/components/reusableDataFunc/DataFunc";
import Swal from "sweetalert2";
import Counter from "@/components/Counter/Counter";

const OximetryPage = () => {
  const [IrData, setIrData] = useState();
  const [RedData, setRedData] = useState();
  const [chartData, setChartData] = useState();
  const [sizeOfSlice, setSizeOfSlice] = useState(-1);
  const dbFunc = useAddToDB("oximetryData");

  const [heartBeat, setHeartBeat] = useState("- ? -");
  const [SPO2, setSPO2] = useState("-");
  const [qualityIndex, setQualityIndex] = useState("-");
  const [saved, setSaved] = useState(0);

  const [filteredArray, setFilteredArray] = useState([]);
  const [filterActiveNum, setFilterActiveNum] = useState(-1);
  const [filter, setFilter] = useState(1);
  const [disable, setDisable] = useState(1);

  const bluetooth = useContext(BluetoothContext);

  const COMMAND = 0x01;

  async function calculateBeatPerMinuteAPI(irData, RedData) {
    console.log(bluetooth.GetFrequency()[0]);
    let payload = {
      IR: "[" + irData.toString() + "]",
      Red: "[" + RedData.toString() + "]",
      fs: bluetooth.GetFrequency()[0],
    };
    let res = await axios.post("https://api.hekidesk.com//PPG_signal", payload);
    console.log(res.data);
    if (!Number(res.data.Try_Again)) {
      setHeartBeat(res.data.HeartRate);
      setSPO2(res.data.SpO2);
      setQualityIndex(res.data.Quality_index);
      console.log(makeArrayFormString(res.data.clear_IR));
      setFilteredArray([
        makeArrayForChart(irData),
        makeArrayForChart(makeArrayFormString(res.data.clear_IR)),
        makeArrayForChart(RedData),
        makeArrayForChart(makeArrayFormString(res.data.clear_Red)),
        makeArrayForChart(makeArrayFormString(res.data.PPG_clear)),
        makeArrayForChart(makeArrayFormString(res.data.PPG_clear)),
      ]);
      setDisable(0);
    } else
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please repeat procedure!",
        confirmButtonColor: "#3085d6",
      });
  }

  useEffect(() => {
    if (bluetooth)
      bluetooth.SendCommand(COMMAND, (input) => {
        setChartData(makeArrayForChart(input.ir));
        setIrData(input.ir);
        setRedData(input.red);
      });
    if (bluetooth.finish) {
      calculateBeatPerMinuteAPI(IrData, RedData);
    }
    return bluetooth.turnOff;
  }, [bluetooth]);

  useEffect(() => {
    console.log("filter: " + filter);
    console.log(filterActiveNum);
    console.log(filteredArray);
    setChartData(
      filter
        ? filteredArray[
            filterActiveNum === -1 ? filterActiveNum + 1 : filterActiveNum
          ]
        : filteredArray[
            filterActiveNum === -1 ? filterActiveNum + 2 : filterActiveNum + 1
          ]
    );
  }, [filterActiveNum, filter]);

  useEffect(() => {
    if (saved) {
      var dataParameter = {};
      dataParameter["heartBeatPPG"] = heartBeat;
      dataParameter["SPO2"] = SPO2;
      dbFunc.updateHistory(dataParameter);
    }
  }, [saved]);

  const [startCountDown, setStartCountDown] = useState(0);
  const [counter, setCounter] = useState(5);
  const [sampleTime, setSampleTime] = useState(10);

  // const sampleTime = 10000;
  const pendingTime = 5000;
  const startTime = useRef(null);
  const endTime = useRef(null);
  const delayTime = 30;

  const flushData = () => {
    setStartCountDown(1);
    setSaved(0);
    setDisable(1);
    setChartData([]);
    setHeartBeat("- ? -");
    setSPO2("-");
    setQualityIndex("-");
    setCounter(5);
  };

  const startInput = () => {
    if (bluetooth.CheckConnection()) {
      let startTimeDuration = 0;
      flushData();
      startTime.current = setTimeout(() => {
        setCounter(sampleTime);
        console.log(startCountDown);
        bluetooth.Start().then((result) => (startTimeDuration = result));
        setSizeOfSlice(400);
      }, [pendingTime + delayTime]);
      endTime.current = setTimeout(() => {
        setStartCountDown(0);
        setCounter(5);
        bluetooth.Stop(startTimeDuration);
        setSizeOfSlice(-1);
      }, [sampleTime * 1000 + pendingTime + delayTime]);
    }
  };

  return (
    <PageWrapper>
      <div style={{ display: "grid", placeItems: "center" }}>
        <HighlightTitle title="Oximetry" icon={HeartIcon} />
        <br />
        <DiagramWrapper>
          <Description>
            <DiagramText>
              Please put your right and left fingers on PPG sensors and then
              press
            </DiagramText>
            <DiagramButton onClick={startInput}>Start</DiagramButton>
            <DropdownButton>
              <Dropdown
                style={{ width: "100%" }}
                value={sampleTime}
                className="filter-btn"
                onChange={(e) => setSampleTime(e.value)}
                options={[
                  { name: "Sample Time: 10s", value: 10 },
                  { name: "Sample Time: 15s", value: 15 },
                  { name: "Sample Time: 20s", value: 20 },
                ]}
                optionLabel="name"
                placeholder={"sample time  ↓"}
              />
            </DropdownButton>
            <CircularContainer>
              <Counter counter={counter} startCountDown={startCountDown} />
            </CircularContainer>
          </Description>
          <DiagramContainer>
            <Diagram data={chartData} sizeOfSlice={sizeOfSlice} />
            <InfoContainer>
              <ImportantTitle>Heart Rate (bpm)</ImportantTitle>
              <ImportantValue>{heartBeat}</ImportantValue>
              <SimpleTitle>SPO2 %</SimpleTitle>
              <SimpleValue>{SPO2}</SimpleValue>
              <SimpleTitle>Quality Index %</SimpleTitle>
              <SimpleValue>{qualityIndex}</SimpleValue>
              <Button
                style={filterButton}
                onClick={() => setFilter(1 - filter)}
                className="filter-btn"
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
                    { name: "ir", value: 0 },
                    { name: "red", value: 2 },
                    { name: "filtered ppg", value: 4 },
                  ]}
                  optionLabel="name"
                  placeholder="Choose Signal  ↓"
                  disabled={disable}
                />
              </DropdownButton>
            </InfoContainer>
          </DiagramContainer>
        </DiagramWrapper>
      </div>
      <PageButtons
        disable={disable}
        dataName="oximetryData"
        texts={[
          "Heart beat: " + heartBeat,
          "SPO2: " + SPO2,
          "Quality index: " + qualityIndex,
        ]}
        saved={saved}
        setSaved={setSaved}
      />
    </PageWrapper>
  );
};

export default OximetryPage;
