import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Diagram from "../../components/Datagram/Diagram";
import HeartIcon from "@/assets/icon/measurement/heart.svg";
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
} from "./components/CSS";
import { BluetoothContext } from "@/App";

const DemoPage = () => {
  const [data, setData] = useState();

  const bluetooth = useContext(BluetoothContext);

  const COMMAND = 0x02;

  useEffect(() => {
    // todo
    // get data stream from last phaze, with refactor should be used here
    if (bluetooth)
      bluetooth.SendCommand(COMMAND, (input) => {
        setData(
          input.ecg
            .slice(input.ecg.length - 200 > 0 ? input.ecg.length - 200 > 0 : 0)
            .map((item, id) => {
              return {
                x: item?.id ?? id,
                y: item?.value ?? item,
              };
            })
        );
      });
    if (bluetooth.finish) {
      // todo
      // call api with "data" and set elements.then(
      /**
       * after call api, set the result in the indexDB
       */
      //)
    }
    return bluetooth.turnOff;
  }, [bluetooth]);

  // todo
  // add loading ( a reusable modal with count down is needed,gets the pending time and show loading)
  const pendingTime = 5000;

  const sampleTime = 10000;
  const startTime = useRef(null);
  const endTime = useRef(null);

  const startInput = () => {
    setData();
    startTime.current = setTimeout(() => {
      bluetooth.Start();
    }, [pendingTime]);
    endTime.current = setTimeout(() => {
      bluetooth.Stop();
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
            <Diagram data={data} />
            <InfoContainer>
              <ImportantTitle>bpmHr</ImportantTitle>
              <ImportantValue>-?-</ImportantValue>
              <SimpleTitle>PR/RR Interval</SimpleTitle>
              <SimpleValue>-</SimpleValue>
              <SimpleTitle>QRS Duration</SimpleTitle>
              <SimpleValue>-</SimpleValue>
              <CircularContainer>
                <CircularValue>30</CircularValue>
              </CircularContainer>
            </InfoContainer>
          </DiagramContainer>
        </DiagramWrapper>
      </div>
    </PageWrapper>
  );
};

export default DemoPage;
