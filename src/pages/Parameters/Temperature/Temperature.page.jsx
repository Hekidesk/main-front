import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Diagram from "@/components/Datagram/Diagram";
import temperatureIcon from "@/assets/icon/parameter/temeperature.svg";
import HighlightTitle from "@/components/HighlightTitle/HighlightTitle";
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
} from "./components/CSS";
import PageButtons from "@/components/reusable/PageButtons";
import { useAddToDB } from "@/database/AddToDB";
import { BluetoothContext } from "@/App";
import { makeArrayForChart } from "@/components/reusableDataFunc/DataFunc";
import Counter from "@/components/Counter/Counter";

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
    console.log(data);
    const average = data.reduce((a, b) => a + b, 0) / data.length;
    console.log(Number(average).toFixed(2));
    setTemperature(Number(average).toFixed(2));
    setQualityIndex(100);
    setDisable(0);
  }

  useEffect(() => {
    if (bluetooth)
      bluetooth.SendCommand(COMMAND, (input) => {
        console.log(input.temperature);
        setChartData(makeArrayForChart(input.temperature));
        setData(input.temperature);
      });
    if (bluetooth.finish) {
      console.log("here?")
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

  const pendingTime = 5000;
  const sampleTime = 10000;
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
  }

  const startInput = () => {
    let startTimeDuration = 0;
    flushData();
    startTime.current = setTimeout(() => {
      setCounter(10);
      bluetooth.Start().then((result) => (startTimeDuration = result));
    }, [pendingTime + delayTime]);
    endTime.current = setTimeout(() => {
      setStartCountDown(0);
      setCounter(5);
      bluetooth.Stop(startTimeDuration);
    }, [sampleTime + pendingTime + delayTime]);
  };

  return (
    <PageWrapper>
      <div style={{ display: "grid", placeItems: "center" }}>
        <HighlightTitle title="Temperature" icon={temperatureIcon} />
        <br />
        <DiagramWrapper>
          <Description>
            <DiagramText>
              Please put your right and left fingers on ECG sensors and then
              press
            </DiagramText>
            <DiagramButton onClick={startInput}>Start</DiagramButton>
              <CircularContainer>
                <Counter counter = {counter} startCountDown={startCountDown} />
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
        disable = {disable}
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
