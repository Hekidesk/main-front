import React from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { Col, Row, Image } from "react-bootstrap";
import Profile from "../../Profile/Profile";
import ProfileSection from "../../Profile/ProfileSection";
import parameterPhoto from "../../../assets/icon/parameter-history.svg";
import heart_rate from "../../../assets/icon/history/heart_rate.svg";
import spo2 from "../../../assets/icon/history/spo2.svg";
import respiration_rate from "../../../assets/icon/history/respiration_rate.svg";
import heart_abnormality from "../../../assets/icon/history/heart_abnormality.svg";
import temperature from "../../../assets/icon/history/temperature.svg";

import "../../../assets/styles/history.css";
import "../../../assets/styles/profile.css";
import HistoryChart from "../Chart/HistoryChart";

function ParameterHistory() {
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
                src={parameterPhoto}
                className="top-history-img"
                alt="time-history-photo"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="parameter-section">
                <Image src={heart_rate} alt="time-history-photo" />
                <div>Heart Rate (bpm)</div>
                <HistoryChart />
              </div>
            </Col>
            <Col md={6}>
              <div className="parameter-section">
                <Image src={spo2} alt="time-history-photo" />
                <div>SpO2 (%)</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="parameter-section">
                <Image src={respiration_rate} alt="time-history-photo" />
                <div>Respiration Rate (bpm)</div>
              </div>
            </Col>
            <Col md={6}>
              <div className="parameter-section">
                <Image src={heart_abnormality} alt="time-history-photo" />
                <div>Heart Abnormality</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="parameter-section">
                <Image src={temperature} alt="time-history-photo" />
                <div>Temperature</div>
              </div>
            </Col>
            <Col md={6}>
              <div className="parameter-section">
                <Image src={heart_abnormality} alt="time-history-photo" />
                <div>Lung Abnormality</div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ParameterHistory;
