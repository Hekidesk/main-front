import PageWrapper from "HEKIDESK/components/PageWrapper/PageWrapper";
import Diagram from "HEKIDESK/components/Datagram/Diagram";
import temperatureIcon from "HEKIDESK/assets/icon/parameter/temeperature.svg";
import HighlightTitle from "HEKIDESK/components/HighlightTitle/HighlightTitle";
import { useEffect, useState, useContext, useRef } from "react";
import {
  CircularContainer,
  // CircularValue,
  Description,
  DiagramButton,
  DiagramContainer,
  DiagramText,
  DiagramWrapper,
  ImportantTitle,
  ImportantValue,
  InfoContainer,
  DropdownButton,
} from "./components/CSS";
import PageButtons from "HEKIDESK/components/reusable/PageButtons";
import { useAddToDB } from "HEKIDESK/database/AddToDB";
import { BluetoothContext } from "HEKIDESK/App";
import { makeArrayForChart } from "HEKIDESK/components/reusableDataFunc/DataFunc";
import Counter from "HEKIDESK/components/Counter/Counter";
import { Dropdown } from "primereact/dropdown";

const TemperaturePage = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [temperature, setTemperature] = useState("- ? -");
  const [qualityIndex, setQualityIndex] = useState(100);
  const [saved, setSaved] = useState(0);
  const dbFunc = useAddToDB("TemperatureData");
  const bluetooth = useContext(BluetoothContext);
  const [disable, setDisable] = useState(1);

  const COMMAND = 0x04;
  function calculateTemperature(data) {
    const average = data.reduce((a, b) => a + b, 0) / data.length;
    setTemperature(Number(average).toFixed(2));
    setQualityIndex(100);
    setDisable(0);
  }

  useEffect(() => {
    if (bluetooth)
      bluetooth.SendCommand(COMMAND, (input) => {
        setChartData(makeArrayForChart(input.temperature));
        setData(input.temperature);
      });
    if (bluetooth.finish) {
      calculateTemperature(data);
    }
    return bluetooth.turnOff;
  }, [bluetooth]);

  useEffect(() => {
    if (saved) {
      var dataParameter = {};
      dataParameter["temperature"] = temperature;
      dbFunc.updateHistory(dataParameter);
    }
  }, [saved]);

  const [startCountDown, setStartCountDown] = useState(0);
  const [counter, setCounter] = useState(5);
  const [sampleTime, setSampleTime] = useState(10);

  const pendingTime = 5000;
  const startTime = useRef(null);
  const endTime = useRef(null);
  const delayTime = 30;

  const flushData = () => {
    setStartCountDown(1);
    setSaved(0);
    setTemperature("- ? -");
    setCounter(5);
    setChartData([]);
    setDisable(1);
  };

  const startInput = () => {
    if (bluetooth.CheckConnection()) {
      let startTimeDuration = 0;
      flushData();
      startTime.current = setTimeout(() => {
        setCounter(sampleTime);
        bluetooth.Start().then((result) => (startTimeDuration = result));
      }, [pendingTime + delayTime]);
      endTime.current = setTimeout(() => {
        setStartCountDown(0);
        setCounter(5);
        bluetooth.Stop(startTimeDuration);
      }, [sampleTime * 1000 + pendingTime + delayTime]);
    }
  };

  return (
    <PageWrapper>
      <div style={{ display: "grid", placeItems: "center" }}>
        <HighlightTitle title="Temperature" icon={temperatureIcon} />
        <br />
        <DiagramWrapper>
          <Description>
            <DiagramText>
              Please put your finger on Temperature sensor and then press
            </DiagramText>
            <DiagramButton onClick={startInput}>Start</DiagramButton>
            <DropdownButton>
              <Dropdown
                style={{ width: "100%" }}
                value={sampleTime}
                className="filter-btn"
                onChange={(e) => setSampleTime(e.value)}
                options={[
                  { name: "10s", value: 10 },
                  { name: "20s", value: 20 },
                  { name: "30s", value: 30 },
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
            <Diagram data={chartData} sizeOfSlice={-2} />
            <InfoContainer>
              <ImportantTitle>Temperature (°C)</ImportantTitle>
              <ImportantValue>{temperature}</ImportantValue>
            </InfoContainer>
          </DiagramContainer>
        </DiagramWrapper>
      </div>
      <PageButtons
        disable={disable}
        dataName="TemperatureData"
        texts={[
          "Temperature: " + temperature,
          "Quality index: " + qualityIndex,
        ]}
        saved={saved}
        setSaved={setSaved}
      />
    </PageWrapper>
  );
};

export default TemperaturePage;
