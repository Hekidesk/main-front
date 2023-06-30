import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Diagram from "@/components/Datagram/Diagram";
import temeperature from "@/assets/icon/parameter/temeperature.svg";
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
  CountDownNumber,
} from "./components/CSS";
import PageButtons from "@/components/reusable/PageButtons";
import { useAddToDB } from "@/database/AddToDB";
import { BluetoothContext } from "@/App";
import { makeArrayForChart } from "@/components/reusableDataFunc/DataFunc";

const TemperaturePage = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [temperature, setTemperature] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(100);
  const [saved, setSaved] = useState(0);
  const dbFunc = useAddToDB("TemperatureData");
  const bluetooth = useContext(BluetoothContext);

  const COMMAND = 0x04;
  function calculateTemperature(data){
    console.log(data);
    const average = data.reduce((a, b) => a + b, 0) / data.length;
    setTemperature(Number(average).toFixed(2));
    setQualityIndex(100);
  }

  useEffect(() => {
    if (bluetooth)
      bluetooth.SendCommand(COMMAND, (input) => {
        console.log(input.temperature)
        setChartData(makeArrayForChart(input.temperature));
        setData(input.temperature);
      });
    if (bluetooth.finish) {
      calculateTemperature(data);
    }
    return bluetooth.turnOff;
  }, [bluetooth]);

  useEffect(() => {
    if(saved){
      var dataParameter = {};
      dataParameter["temperature"] = temeperature;
      dbFunc.updateHistory(dataParameter);
    }
  }, [saved]);

  const [counter, setCounter] = useState(5);
  const [startCountDown, setStartCountDown] = useState(0);
  useEffect(() => {
    const timer =
      startCountDown && counter >= 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter, startCountDown]);

  const pendingTime = 5000;
  const sampleTime = 10000;
  const startTime = useRef(null);
  const endTime = useRef(null);

  const startInput = () => {
    let startTimeDuration = 0;
    setStartCountDown(1);
    setCounter(5);
    startTime.current = setTimeout(() => {
      bluetooth.Start().then((result) => startTimeDuration = result);
      setStartCountDown(0);
    }, [pendingTime]);
    endTime.current = setTimeout(() => {
      bluetooth.Stop(startTimeDuration);
    }, [sampleTime + pendingTime]);
  };

  return (
    <PageWrapper>
      <div style={{ display: "grid", placeItems: "center" }}>
        <HighlightTitle title="Temperature" icon={temeperature} />
        <br />
        <DiagramWrapper>
          <Description>
            <DiagramText>
              Please put your right and left fingers on ECG sensors and then
              press
            </DiagramText>
            <DiagramButton onClick={startInput}>Start</DiagramButton>
            <CountDownNumber> {startCountDown ? counter : ""} </CountDownNumber>
          </Description>
          <DiagramContainer>
            <Diagram data={chartData} sizeOfSlice={-2} />
            <InfoContainer>
              <ImportantTitle>Temperature</ImportantTitle>
              <ImportantValue>-{temperature}-</ImportantValue>
              <CircularContainer>
                <CircularValue>100</CircularValue>
              </CircularContainer>
            </InfoContainer>
          </DiagramContainer>
        </DiagramWrapper>
      </div>
      <PageButtons
        dataName="TemperatureData"
        texts={[
          "Temperature: " + temperature,
          "Quality index: " + qualityIndex,
        ]}
        saved = {saved}
        setSaved = {setSaved}
      />
    </PageWrapper>
  );
};

export default TemperaturePage;
