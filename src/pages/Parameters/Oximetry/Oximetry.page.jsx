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
} from "./components/CSS";
import { BluetoothContext } from "@/App";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
// import "../../../assets/styles/measurement.css";
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
  const [filterActiveNum, setFilterActiveNum] = useState(0);
  const [filter, setFilter] = useState(1);

  const bluetooth = useContext(BluetoothContext);

  const COMMAND = 0x01;

  async function calculateBeatPerMinuteAPI(irData, RedData) {
    console.log(bluetooth.GetFrequency()[0]);
    let payload = {
      IR: "[" + irData.toString() + "]",
      Red: "[" + RedData.toString() + "]",
      fs: bluetooth.GetFrequency()[0],
    };
    let res = await axios.post("http://127.0.0.1:5000//PPG_signal", payload);
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
    setChartData(
      filter
        ? filteredArray[filterActiveNum]
        : filteredArray[filterActiveNum + 1]
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

  const pendingTime = 5000;
  const sampleTime = 10000;
  const startTime = useRef(null);
  const endTime = useRef(null);

  const startInput = () => {
    let startTimeDuration = 0;
    setStartCountDown(1);
    setSaved(0);
    setHeartBeat("-?-");
    setSPO2("-");
    setQualityIndex("-");
    startTime.current = setTimeout(() => {
      bluetooth.Start().then((result) => (startTimeDuration = result));
      setSizeOfSlice(400);
      setStartCountDown(0);
    }, [pendingTime]);
    endTime.current = setTimeout(() => {
      bluetooth.Stop(startTimeDuration);
      setSizeOfSlice(-1);
    }, [sampleTime + pendingTime]);
  };

  return (
    <PageWrapper>
      <div style={{ display: "grid", placeItems: "center" }}>
        <HighlightTitle title="Oximetry" icon={HeartIcon} />
        <br />
        <DiagramWrapper>
          <Description>
            <DiagramText>
              Please put your right and left fingers on ECG sensors and then
              press
            </DiagramText>
            <DiagramButton onClick={startInput}>Start</DiagramButton>
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
              <CircularContainer>                
                  <Counter startCountDown={startCountDown} />
              </CircularContainer>
              <Button
                style={filterButton}
                onClick={() => setFilter(1 - filter)}
              >
                {filter % 2 ? "filtered" : "main"} signal
              </Button>
              <DropdownButton id="dropdown-basic-button" title="Choose signal">
                <Dropdown.Item
                  onClick={() => setFilterActiveNum(0)}
                  active={filterActiveNum === 0 || filterActiveNum === 1}
                >
                  ir
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setFilterActiveNum(2)}
                  active={filterActiveNum === 2 || filterActiveNum === 3}
                >
                  red
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setFilterActiveNum(4)}
                  active={filterActiveNum === 4 || filterActiveNum === 5}
                >
                  filtered ppg
                </Dropdown.Item>
              </DropdownButton>
            </InfoContainer>
          </DiagramContainer>
        </DiagramWrapper>
      </div>
      <PageButtons
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
