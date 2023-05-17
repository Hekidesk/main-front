import React from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { Col, Row, Image } from "react-bootstrap";
import Profile from "../../Profile/Profile";
import ProfileSection from "../../Profile/ProfileSection";
import ParameterPhotoIcon from "@/assets/icon/parameter-history.svg";
import HeartRateIcon from "@/assets/icon/history/heart_rate.svg";
import Spo2Icon from "@/assets/icon/history/spo2.svg";
import RespirationRateIcon from "@/assets/icon/history/respiration_rate.svg";
import HeartAbnormalityIcon from "@/assets/icon/history/heart_abnormality.svg";
import TemperatureIcon from "@/assets/icon/history/temperature.svg";
import "@/assets/styles/history.css";
import "@/assets/styles/profile.css";
import HistoryChartPage from "../Chart/HistoryChart.page";

const ParameterHistoryPage = () => {
  return (
    <div className="box">
      <Profile />
      <Row>
        <Col className="sidebar" md={1}>
          <Sidebar />
        </Col>
        <Col md={7} lg={9}>
          <Row>
            <h2 className="title-name">Parameters</h2>
          </Row>
          <Row>
            <Col lg={4} md={12}>
              <ProfileSection />
            </Col>
            <Col lg={7} md={12}>
              <Image
                src={ParameterPhotoIcon}
                className="top-history-img"
                alt="time-history-photo"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="parameter-section">
                <Image src={HeartRateIcon} alt="time-history-photo" />
                <div>Heart Rate (bpm)</div>
                <HistoryChartPage />
              </div>
            </Col>
            <Col md={6}>
              <div className="parameter-section">
                <Image src={Spo2Icon} alt="time-history-photo" />
                <div>SpO2 (%)</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="parameter-section">
                <Image src={RespirationRateIcon} alt="time-history-photo" />
                <div>Respiration Rate (bpm)</div>
              </div>
            </Col>
            <Col md={6}>
              <div className="parameter-section">
                <Image src={HeartAbnormalityIcon} alt="time-history-photo" />
                <div>Heart Abnormality</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="parameter-section">
                <Image src={TemperatureIcon} alt="time-history-photo" />
                <div>Temperature</div>
              </div>
            </Col>
            <Col md={6}>
              <div className="parameter-section">
                <Image src={HeartAbnormalityIcon} alt="time-history-photo" />
                <div>Lung Abnormality</div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ParameterHistoryPage;
