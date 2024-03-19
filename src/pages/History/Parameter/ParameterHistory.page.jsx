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

import HistoryChart from "../Chart/HistoryChart";
import { GetDateTimeDB } from "@/utilities/time/time";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { ParameterSection, TitleName } from "./component/CSS";
import axios from "axios";
import Swal from "sweetalert2";

const ParameterHistoryPage = () => {
  const [parameterData, setData] = useState([]);

  useEffect(() => {
    const delay = async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    };

    let datas = Array(10).fill(undefined);
    const promise1 = axios
      .get("ECG_signal/" + localStorage.getItem("account-id") + "/0")
      .then(
        (response) => {
          const result = response.data;
          let tempFlow = [];
          result.map((res) =>
            tempFlow.push({
              date: GetDateTimeDB(String(res["time"])),
              value: res["heart_rate"],
            })
          );
          datas[0] = {
            img: HeartRateIcon,
            title: "Heart Rate (bpm) - ecg",
            color: "#43a5d6",
            chartName: ["heartbeat ecg"],
            data: [tempFlow],
          };
          tempFlow = [];
          result.map((res) =>
            tempFlow.push({
              date: GetDateTimeDB(String(res["time"])),
              value: res["pr_interval"],
            })
          );
          datas[1] = {
            img: PR_RR_INTERVAL,
            title: "PR/RR Interval (msec)",
            color: "orange",
            chartName: ["PR RR Interval"],
            data: [tempFlow],
          };

          tempFlow = [];
          result.map((res) =>
            tempFlow.push({
              date: GetDateTimeDB(String(res["time"])),
              value: res["qrs_duration"],
            })
          );
          datas[2] = {
            img: QRS_Duration_Icon,
            title: "QRS Duration (msec)",
            color: "black",
            chartName: ["QRS Duration"],
            data: [tempFlow],
          };

          tempFlow = [];
          result.map((res) =>
            tempFlow.push({
              date: GetDateTimeDB(String(res["time"])),
              value: res["hrv_val"],
            })
          );
          datas[3] = {
            img: SYSDIAIcon,
            title: "HR Variation",
            color: "green",
            chartName: ["hrv"],
            data: [tempFlow],
          };
        },
        (error) => {
          Swal.fire({
            icon: error,
            title: error.response,
            text: "Please repeat procedure!",
          });
        }
      );

    const promise2 = axios
      .get("PPG_signal/" + localStorage.getItem("account-id") + "/0")
      .then((response) => {
        const result = response.data;
        let tempFlow = [];
        result.map((res) =>
          tempFlow.push({
            date: GetDateTimeDB(String(res["time"])),
            value: res["heart_rate"],
          })
        );
        datas[4] = {
          img: HeartRateIcon,
          title: "Heart Rate (bpm) - ppg",
          color: "red",
          chartName: ["heartbeat ppg"],
          data: [tempFlow],
        };
        tempFlow = [];
        result.map((res) =>
          tempFlow.push({
            date: GetDateTimeDB(String(res["time"])),
            value: res["spo2"],
          })
        );
        datas[5] = {
          img: Spo2Icon,
          title: "SpO2 (%)",
          color: "#8CCD47",
          chartName: ["SPO2"],
          data: [tempFlow],
        };
      });

    const promise3 = axios
      .get("bp_signal/" + localStorage.getItem("account-id") + "/0")
      .then((response) => {
        const result = response.data;
        let tempFlow = [];
        result.map((res) =>
          tempFlow.push({
            date: GetDateTimeDB(String(res["time"])),
            value: res["systolic"],
          })
        );

        let tempFlow2 = [];
        result.map((res) =>
          tempFlow2.push({
            date: GetDateTimeDB(String(res["time"])),
            value: res["diastolic"],
          })
        );
        datas[6] = {
          img: SYSDIAIcon,
          title: "SYS/DIA(mmHg)",
          color: "yellow",
          chartName: ["SYS", "DIA"],
          data: [tempFlow, tempFlow2],
        };
      });

    const promise4 = axios
      .get("temperature_signal/" + localStorage.getItem("account-id") + "/0")
      .then((response) => {
        const result = response.data;
        let tempFlow = [];
        result.map((res) =>
          tempFlow.push({
            date: GetDateTimeDB(String(res["time"])),
            value: res["temperature"],
          })
        );
        datas[7] = {
          img: TemperatureIcon,
          title: "Temperature",
          color: "purple",
          chartName: ["Temperature"],
          data: [tempFlow],
        };
      });

    const promise5 = axios
      .get("PCG_signal/" + localStorage.getItem("account-id") + "/0")
      .then((response) => {
        const result = response.data;
        let tempFlow = [];
        result.map((res) =>
          tempFlow.push({
            date: GetDateTimeDB(String(res["time"])),
            value: res["heart_rate"],
          })
        );
        datas[8] = {
          img: HeartAbnormalityIcon,
          title: "Heart Rate - sound (bpm)",
          color: "#black",
          chartName: ["HeartBeat Sound"],
          data: [tempFlow],
        };

        tempFlow = [];
        result.map((res) =>
          tempFlow.push({
            date: GetDateTimeDB(String(res["time"])),
            value: res["respiration_rate"],
          })
        );
        datas[9] = {
          img: RespirationRateIcon,
          title: "Respiration Rate (bpm)",
          color: "#43a5d6",
          chartName: ["Rrespiration Rate"],
          data: [tempFlow],
        };
      });

    Promise.all([promise1, promise2, promise3, promise4, promise5]).then(() => {
      console.log(datas);
      setData(datas);
      delay();
      console.log(datas);
    });
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
          {parameterData.map((data, i) => {
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
