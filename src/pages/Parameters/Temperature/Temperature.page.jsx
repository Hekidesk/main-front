import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Diagram from "@/components/Datagram/Diagram";
import temperatureIcon from "@/assets/icon/parameter/temperature.svg";
import resultIcon from "@/assets/icon/resultIcon.svg";
import HighlightTitle from "@/components/HighlightTitle/HighlightTitle";
import { useEffect, useState, useContext, useRef } from "react";
import {
  CircularContainer,
  CircularPhoto,
  Description,
  DiagramButton,
  DiagramContainer,
  DiagramText,
  DiagramWrapper,
  ImportantTitle,
  ImportantValue,
  InfoContainer,
  TimerWrapper,
  ParameterContainer,
} from "./components/CSS";
import PageButtons from "@/components/reusable/PageButtons";
import { useAddToDB } from "@/database/AddToDB";
import { BluetoothContext } from "@/App";
import { makeArrayForChart } from "@/components/reusableDataFunc/DataFunc";
import Counter from "@/components/Counter/Counter";
import { COMMAND, delayTime, pendingTime } from "./components/Constants";
import { SampleTimeDropDown } from "@/components/SampleTimeDropDown";
import Timer from "@/components/Timer/Timer";

const TemperaturePage = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [temperature, setTemperature] = useState("- ? -");
  const [qualityIndex, setQualityIndex] = useState(100);
  const [disable, setDisable] = useState(1);
  const [sizeOfSlice, setSizeOfSlice] = useState(-1);

  const [startCountDown, setStartCountDown] = useState(0);
  const [counter, setCounter] = useState(5);
  const [sampleTime, setSampleTime] = useState(10);

  const dbFunc = useAddToDB("TemperatureData");
  const bluetooth = useContext(BluetoothContext);

  const startTime = useRef(null);
  const endTime = useRef(null);

  function calculateTemperature(data) {
    if (data != []) {
      const average = data.reduce((a, b) => a + b, 0) / data.length;
      setTemperature(Number(average).toFixed(2));
      setQualityIndex(100);
      setDisable(0);
    }
  }

  useEffect(() => {
    if (bluetooth.finish) {
      calculateTemperature(data);
    }
    return bluetooth.TurnOff;
  }, [bluetooth]);

  const flushData = () => {
    setStartCountDown(1);
    setTemperature("- ? -");
    setCounter(5);
    setChartData([]);
    setDisable(1);
  };

  const startInput = () => {
    let startTimeDuration = 0;
    flushData();

    bluetooth.SendCommand(COMMAND, (input) => {
      setChartData(makeArrayForChart(input.temperature));
      setData(input.temperature);
    });
    startTime.current = setTimeout(() => {
      setCounter(sampleTime);
      bluetooth.Start().then((result) => (startTimeDuration = result));
      setSizeOfSlice(10);
    }, [pendingTime + delayTime]);
    endTime.current = setTimeout(() => {
      setStartCountDown(0);
      setCounter(5);
      bluetooth.Stop(startTimeDuration);
      setSizeOfSlice(sampleTime);
    }, [sampleTime * 1000 + pendingTime + delayTime]);
  };

  return (
    <PageWrapper>
      <HighlightTitle title="Temperature" />
      <div style={{ display: "flex", marginTop: "1em" }}>
        <div style={{ width: "75%" }}>
          <TimerWrapper>
            <Timer sampleTime={sampleTime} setSampleTime={setSampleTime} />
            <DiagramButton onClick={startInput}>START</DiagramButton>
          </TimerWrapper>
          <DiagramWrapper>
            <Description>
              <CircularPhoto>
                <img src={temperatureIcon} width={10} />{" "}
              </CircularPhoto>
              <DiagramText>
                Please put your finger on Temperature sensor and then press
              </DiagramText>
            </Description>
            <DiagramContainer>
              <Diagram
                data={chartData}
                sizeOfSlice={sizeOfSlice}
                type={"temperature"}
                avgTemp={temperature}
              />
            </DiagramContainer>
          </DiagramWrapper>
        </div>
        <div style={{ width: "35%" }}>
          <InfoContainer>
            <DiagramText>
              <CircularPhoto margin={true}>
                <img src={resultIcon} width={15} />
              </CircularPhoto>
              Results
            </DiagramText>
            <ParameterContainer>
              <ImportantTitle>Temperature (°C)</ImportantTitle>
              <ImportantValue>{temperature}</ImportantValue>
            </ParameterContainer>
            <PageButtons
              disable={disable}
              dataName="TemperatureData"
              texts={[
                "Temperature: " + temperature,
                "Quality index: " + qualityIndex,
              ]}
              onClick={() => {
                var dataParameter = {};
                dataParameter["temperature"] = temperature;
                dbFunc.updateHistory(dataParameter);
              }}
            />
          </InfoContainer>
        </div>
      </div>
    </PageWrapper>
  );
};

export default TemperaturePage;
