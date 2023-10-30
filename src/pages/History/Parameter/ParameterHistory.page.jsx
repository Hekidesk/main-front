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
import { ParameterSection, TitleName } from "./component/CSS";

const ParameterHistoryPage = () => {
  
  const { getAll: getAllOximetryData } = useIndexedDB("oximetryData");
  const { getAll: getAllCardiogramData } = useIndexedDB("cardiogramData");
  const { getAll: getAllBPData } = useIndexedDB("BPData");
  const { getAll: getAllTemperatureData } = useIndexedDB("TemperatureData");
  const { getAll: getAllPCGData } = useIndexedDB("PCGData");
  const [parameterData, setData] = useState([]);

  useEffect(() => {
    let datas = [];
    getAllOximetryData().then((dataFromDB) => {
      let tempFlow = [];
      const result = dataFromDB.filter(
        (temp) => temp.userId === localStorage.getItem("id")
      );
      result.map((res) =>
        tempFlow.push({
          date: GetDateTimeDB(String(res["dateAndId"])),
          value: res["heartBeatPPG"],
        })
      );
      datas.push({
        img: HeartRateIcon,
        title: "Heart Rate (bpm) - ppg",
        color: "red",
        chartName: ["heartbeat ppg"],
        data: [tempFlow],
      });
      console.log(datas);
      tempFlow = [];
      result.map((res) =>
        tempFlow.push({
          date: GetDateTimeDB(String(res["dateAndId"])),
          value: res["SPO2"],
        })
      );
      datas.push({
        img: Spo2Icon,
        title: "SpO2 (%)",
        color: "#8CCD47",
        chartName: ["SPO2"],
        data: [tempFlow],
      });
    });

    getAllCardiogramData().then((dataFromDB) => {
      const result = dataFromDB.filter(
        (temp) => temp.userId === localStorage.getItem("id")
      );
      let tempFlow = [];
      result.map((res) =>
        tempFlow.push({
          date: GetDateTimeDB(String(res["dateAndId"])),
          value: res["heartBeatECG"],
        })
      );
      datas.push({
        img: HeartRateIcon,
        title: "Heart Rate (bpm) - ecg",
        color: "#43a5d6",
        chartName: ["heartbeat ecg"],
        data: [tempFlow],
      });

      tempFlow = [];
      result.map((res) =>
        tempFlow.push({
          date: GetDateTimeDB(String(res["dateAndId"])),
          value: res["PR_RR_Interval"],
        })
      );
      datas.push({
        img: PR_RR_INTERVAL,
        title: "PR/RR Interval (msec)",
        color: "orange",
        chartName: ["PR RR Interval"],
        data: [tempFlow],
      });

      tempFlow = [];
      result.map((res) =>
        tempFlow.push({
          date: GetDateTimeDB(String(res["dateAndId"])),
          value: res["QRS_Duration"],
        })
      );
      datas.push({
        img: QRS_Duration_Icon,
        title: "QRS Duration (msec)",
        color: "black",
        chartName: ["QRS Duration"],
        data: [tempFlow],
      });

      tempFlow = [];
      result.map((res) =>
        tempFlow.push({
          date: GetDateTimeDB(String(res["dateAndId"])),
          value: res["hrvVal"],
        })
      );
      datas.push({
        img: SYSDIAIcon,
        title: "HR Variation",
        color: "green",
        chartName: ["hrv"],
        data: [tempFlow],
      });
    });

    getAllBPData().then((dataFromDB) => {
      const result = dataFromDB.filter(
        (temp) => temp.userId === localStorage.getItem("id")
      );
      let tempFlow = [];
      result.map((res) =>
        tempFlow.push({
          date: GetDateTimeDB(String(res["dateAndId"])),
          value: res["SYS"],
        })
      );

      let tempFlow2 = [];
      result.map((res) =>
        tempFlow2.push({
          date: GetDateTimeDB(String(res["dateAndId"])),
          value: res["DIA"],
        })
      );
      datas.push({
        img: SYSDIAIcon,
        title: "SYS/DIA(mmHg)",
        color: "yellow",
        chartName: ["SYS", "DIA"],
        data: [tempFlow, tempFlow2],
      });
    });

    getAllTemperatureData().then((dataFromDB) => {
      const result = dataFromDB.filter(
        (temp) => temp.userId === localStorage.getItem("id")
      );
      let tempFlow = [];
      result.map((res) =>
        tempFlow.push({
          date: GetDateTimeDB(String(res["dateAndId"])),
          value: res["temperature"],
        })
      );
      datas.push({
        img: TemperatureIcon,
        title: "Temperature",
        color: "purple",
        chartName: ["Temperature"],
        data: [tempFlow],
      });
    });

    getAllPCGData()
      .then((dataFromDB) => {
        const result = dataFromDB.filter(
          (temp) => temp.userId === localStorage.getItem("id")
        );
        let tempFlow = [];
        result.map((res) =>
          tempFlow.push({
            date: GetDateTimeDB(String(res["dateAndId"])),
            value: res["heartBeatSound"],
          })
        );
        datas.push({
          img: HeartAbnormalityIcon,
          title: "Heart Rate - sound (bpm)",
          color: "#black",
          chartName: ["HeartBeat Sound"],
          data: [tempFlow],
        });

        tempFlow = [];
        result.map((res) =>
          tempFlow.push({
            date: GetDateTimeDB(String(res["dateAndId"])),
            value: res["respirationRate"],
          })
        );
        datas.push({
          img: RespirationRateIcon,
          title: "Respiration Rate (bpm)",
          color: "#43a5d6",
          chartName: ["Rrespiration Rate"],
          data: [tempFlow],
        });
      })
      .then(() => setData(datas));
    console.log(datas);
  }, []);

  return (
    <PageWrapper>
      <div style={{ marginRight: "20px" }}>
        <Row>
          <TitleName>Parameters</TitleName>
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
              height={240}
            />
          </Col>
        </Row>
        <Row>
          {console.log(parameterData)}
          {parameterData.map((data, i) => {
            {
              console.log(data);
            }
            return (
              <Col md={6} key={i}>
                <ParameterSection>
                  <img src={data.img} alt="time-history-photo" />
                  <div>{data.title}</div>
                  <HistoryChart
                    color={data.color}
                    data={data.data}
                    name={data.chartName}
                  />
                </ParameterSection>
              </Col>
            );
          })}
        </Row>
      </div>
    </PageWrapper>
  );
};

export default ParameterHistoryPage;
