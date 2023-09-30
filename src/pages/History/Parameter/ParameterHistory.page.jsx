import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ProfileSection from "@/components/Profile/ProfileSection";
import ParameterPhotoIcon from "@/assets/icon/parameterHistory.svg";
import HeartRateIcon from "@/assets/icon/history/heartRateIcon.svg";
import Spo2Icon from "@/assets/icon/history/spo2Icon.svg";
import RespirationRateIcon from "@/assets/icon/history/respirationRateIcon.svg";
import HeartAbnormalityIcon from "@/assets/icon/history/heartAbnormalityIcon.svg";
import TemperatureIcon from "@/assets/icon/history/temperatureIcon.svg";

import PR_RR_INTERVAL from "@/assets/icon/history/PR_RR_INTERVAL.svg";
import QRS_Duration_Icon from "@/assets/icon/history/QRS_Duration.svg";
import SYSDIAIcon from "@/assets/icon/history/bloodPressureIcon.svg";

import "@/assets/styles/history.css";
import "@/assets/styles/profile.css";
import HistoryChart from "../Chart/HistoryChart";
import { useIndexedDB } from "react-indexed-db";
import { GetDateTimeDB } from "@/utilities/time/time";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

const ParameterHistoryPage = () => {
  const { getAll: getAllOximetryData } = useIndexedDB("oximetryData");
  const { getAll: getAllCardiogramData } = useIndexedDB("cardiogramData");
  const { getAll: getAllBPData } = useIndexedDB("BPData");
  const { getAll: getAllTemperatureData } = useIndexedDB("TemperatureData");
  const { getAll: getAllPCGData } = useIndexedDB("PCGData");

  const [heartBeatPPG, setHeartBeatPPG] = useState([]);
  const [SPO2, setSPO2] = useState([]);

  const [heartBeatECG, setHeartBeatECG] = useState([]);
  const [PR_RR_Interval, setPR_RR_Interval] = useState([]);
  const [QRS_Duration, setQRSDuration] = useState([]);
  const [hrvVal, setHrvVal] = useState([]);

  const [SYS, setSYS] = useState([]);
  const [DIA, setDIA] = useState([]);

  const [temperature, setTemperature] = useState([]);

  const [heartBeatSound, setHeartBeatSound] = useState([]);
  const [respirationRate, setRespirationRate] = useState([]);

  useEffect(() => {
    getAllOximetryData().then((dataFromDB) => {
      const result = dataFromDB.filter(
        (temp) => temp.userId === localStorage.getItem("id")
      );
      let tempFlow1 = [];
      result.map((res) =>
        tempFlow1.push({
          date: GetDateTimeDB(String(res["dateAndId"])),
          value: res["heartBeatPPG"],
        })
      );
      setHeartBeatPPG(tempFlow1);
      let tempFlow2 = [];
      result.map((res) =>
        tempFlow2.push({
          date: GetDateTimeDB(String(res["dateAndId"])),
          value: res["SPO2"],
        })
      );
      setSPO2(tempFlow2);
    });

    getAllCardiogramData().then((dataFromDB) => {
      const result = dataFromDB.filter(
        (temp) => temp.userId === localStorage.getItem("id")
      );
      let tempFlow1 = [];
      result.map((res) =>
        tempFlow1.push({
          date: GetDateTimeDB(String(res["dateAndId"])),
          value: res["heartBeatECG"],
        })
      );
      setHeartBeatECG(tempFlow1);
      let tempFlow2 = [];
      result.map((res) =>
        tempFlow2.push({
          date: GetDateTimeDB(String(res["dateAndId"])),
          value: res["PR_RR_Interval"],
        })
      );
      setPR_RR_Interval(tempFlow2);
      let tempFlow3 = [];
      result.map((res) =>
        tempFlow3.push({
          date: GetDateTimeDB(String(res["dateAndId"])),
          value: res["QRS_Duration"],
        })
      );
      setQRSDuration(tempFlow3);
      let tempFlow4 = [];
      result.map((res) =>
        tempFlow4.push({
          date: GetDateTimeDB(String(res["dateAndId"])),
          value: res["hrvVal"],
        })
      );
      setHrvVal(tempFlow4);
    });

    getAllBPData().then((dataFromDB) => {
      const result = dataFromDB.filter(
        (temp) => temp.userId === localStorage.getItem("id")
      );
      let tempFlow1 = [];
      result.map((res) =>
        tempFlow1.push({
          date: GetDateTimeDB(String(res["dateAndId"])),
          value: res["SYS"],
        })
      );
      setSYS(tempFlow1);

      let tempFlow2 = [];
      result.map((res) =>
        tempFlow2.push({
          date: GetDateTimeDB(String(res["dateAndId"])),
          value: res["DIA"],
        })
      );
      setDIA(tempFlow2);
    });

    getAllTemperatureData().then((dataFromDB) => {
      const result = dataFromDB.filter(
        (temp) => temp.userId === localStorage.getItem("id")
      );
      let tempFlow1 = [];
      result.map((res) =>
        tempFlow1.push({
          date: GetDateTimeDB(String(res["dateAndId"])),
          value: res["temperature"],
        })
      );
      setTemperature(tempFlow1);
    });

    getAllPCGData().then((dataFromDB) => {
      const result = dataFromDB.filter(
        (temp) => temp.userId === localStorage.getItem("id")
      );
      let tempFlow1 = [];
      result.map((res) =>
        tempFlow1.push({
          date: GetDateTimeDB(String(res["dateAndId"])),
          value: res["heartBeatSound"],
        })
      );
      setHeartBeatSound(tempFlow1);

      let tempFlow2 = [];
      result.map((res) =>
        tempFlow2.push({
          date: GetDateTimeDB(String(res["dateAndId"])),
          value: res["respirationRate"],
        })
      );
      setRespirationRate(tempFlow2);
    });
  }, []);

  return (
    <PageWrapper>
      <Row>
        <h2 className="title-name">Parameters</h2>
      </Row>
      <Row>
        <Col lg={4} md={12}>
          <ProfileSection />
        </Col>
        <Col lg={8} md={12}>
          <img
            src={ParameterPhotoIcon}
            className="top-history-img"
            alt="time-history-photo"
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className="parameter-section">
            <img src={HeartRateIcon} alt="time-history-photo" />
            <div>Heart Rate (bpm) - ppg</div>
            <HistoryChart
              color="red"
              data={[heartBeatPPG]}
              name={["heartbeat ppg"]}
            />
          </div>
        </Col>
        <Col md={6}>
          <div className="parameter-section">
            <img src={Spo2Icon} alt="time-history-photo" />
            <div>SpO2 (%)</div>
            <HistoryChart color="#8CCD47" data={[SPO2]} name={["SPO2"]} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className="parameter-section">
            <img src={HeartRateIcon} alt="time-history-photo" />
            <div>Heart Rate (bpm) - ecg</div>
            <HistoryChart
              color="#43a5d6"
              data={[heartBeatECG]}
              name={["heartbeat ecg"]}
            />
          </div>
        </Col>
        <Col md={6}>
          <div className="parameter-section">
            <img src={PR_RR_INTERVAL} alt="time-history-photo" />
            <div>PR/RR Interval (msec)</div>
            <HistoryChart
              color="orange"
              data={[PR_RR_Interval]}
              name={["PR RR Interval"]}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className="parameter-section">
            <img src={QRS_Duration_Icon} alt="time-history-photo" />
            <div>QRS Duration (msec)</div>
            <HistoryChart
              color="black"
              data={[QRS_Duration]}
              name={["QRS Duration"]}
            />
          </div>
        </Col>
        <Col md={6}>
          <div className="parameter-section">
            <img alt="hr" src={SYSDIAIcon} />
            <div>HR Variation</div>
            <HistoryChart color="green" data={[hrvVal]} name={["hrv"]} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className="parameter-section">
            <img src={SYSDIAIcon} alt="time-history-photo" />
            <div>SYS/DIA(mmHg)</div>
            <HistoryChart
              color="yellow"
              data={[SYS, DIA]}
              name={["SYS", "DIA"]}
            />
          </div>
        </Col>
        <Col md={6}>
          <div className="parameter-section">
            <img src={TemperatureIcon} alt="time-history-photo" />
            <div>Temperature</div>
            <HistoryChart
              color="purple"
              data={[temperature]}
              name={["Temperature"]}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className="parameter-section">
            <img src={RespirationRateIcon} alt="time-history-photo" />
            <div>Respiration Rate (bpm)</div>
            <HistoryChart
              color="#43a5d6"
              data={[respirationRate]}
              name={["Rrespiration Rate"]}
            />
          </div>
        </Col>
        <Col md={6}>
          <div className="parameter-section">
            <img src={HeartAbnormalityIcon} alt="time-history-photo" />
            <div>Heart Rate - sound</div>
            <HistoryChart
              color="black"
              data={[heartBeatSound]}
              name={["HeartBeat Sound"]}
            />
          </div>
        </Col>
      </Row>
    </PageWrapper>
  );
};

export default ParameterHistoryPage;
