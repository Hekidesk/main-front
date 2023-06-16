import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Diagram from "../../components/Datagram/Diagram";
import HeartIcon from "@/assets/icon/parameter/heart.svg";
import HighlightTitle from "@/components/HighlightTitle/HighlightTitle";
import { useEffect, useState, useContext, useRef } from "react";
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
import { BluetoothContext } from "@/App";
import { Row, Col, Button, Dropdown, DropdownButton } from "react-bootstrap";
import "@/assets/styles/Measurement.css";
import axios from "axios";

const DemoPage = () => {
  const [IrData, setIrData] = useState();
  const [RedData, setRedData] = useState();
  const [chartData, setChartData] = useState();
  const [sizeOfSlice, setSizeOfSlice] = useState(-1);

  
  const [heartBeat, setHeartBeat] = useState(0);
  const [SPO2, setSPO2] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);

  const [filteredArray, setFilteredArray] = useState([]);
  const [filterActiveNum, setFilterActiveNum] = useState(0);
  const [filter, setFilter] = useState(0);

  const bluetooth = useContext(BluetoothContext);

  const COMMAND = 0x01;

  const makeArrayFormString = (arr) => {
    return arr.split(" ").map(function (item) {
      return Number(item);
    });
  }

  const makeArrayForChart = (arr) => {
    return arr.map((item, id) => {
      return {
        x: item?.id ?? id,
        y: item?.value ?? item,
      };
    })
  }

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
      console.log(makeArrayFormString(res.data.clear_IR))
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
      });
  }

  useEffect(() => {
    // todo
    // get data stream from last phaze, with refactor should be used here
    if (bluetooth)
      bluetooth.SendCommand(COMMAND, (input) => {
        setChartData(makeArrayForChart(input.ir));
        setIrData(input.ir);
        setRedData(input.red);
      });
    if (bluetooth.finish) {
      // todo
      // call api with "data" and set elements.then(
      calculateBeatPerMinuteAPI(IrData, RedData);
      /**
       * after call api, set the result in the indexDB
       */
      //)
    }
    return bluetooth.turnOff;
  }, [bluetooth]);

  useEffect(() => {
    setChartData(filter ? filteredArray[filterActiveNum] : filteredArray[filterActiveNum + 1]);
  },[filterActiveNum, filter])

  // todo
  // add loading ( a reusable modal with count down is needed,gets the pending time and show loading)
  const pendingTime = 5000;

  const sampleTime = 10000;
  const startTime = useRef(null);
  const endTime = useRef(null);

  const startInput = () => {
    let startTimeDuration = 0;
    startTime.current = setTimeout(() => {
      bluetooth.Start().then((result) => startTimeDuration = result);
      setSizeOfSlice(200);
    }, [pendingTime]);
    endTime.current = setTimeout(() => {
      bluetooth.Stop(startTimeDuration);
      setSizeOfSlice(-1);
    }, [sampleTime + pendingTime]);
  };

  return (
    <PageWrapper>
      <div style={{ display: "grid", placeItems: "center" }}>
        <HighlightTitle title="Cardiogram" icon={HeartIcon} />
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
              <ImportantTitle>bpmHr</ImportantTitle>
              <ImportantValue>-{heartBeat}-</ImportantValue>
              <SimpleTitle>SPO2</SimpleTitle>
              <SimpleValue>{SPO2}</SimpleValue>
              <CircularContainer>
                <CircularValue>{qualityIndex}</CircularValue>
              </CircularContainer>
              <Button style={filterButton} onClick={() => setFilter(1-filter)}>
                {filter % 2 ? "filtered" : "main"} signal
              </Button>
              <DropdownButton
                  id="dropdown-basic-button"
                  title="Choose signal"
                >
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
    </PageWrapper>
  );
};

export default DemoPage;
