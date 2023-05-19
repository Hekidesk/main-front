import React from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { Col, Row, Image } from "react-bootstrap";
import Profile from "../../Profile/Profile";
import ProfileSection from "../../Profile/ProfileSection";
import ParameterPhotoIcon from "@/assets/icon/parameterHistory.svg";
import HeartRateIcon from "@/assets/icon/history/heartRateIcon.svg";
import Spo2Icon from "@/assets/icon/history/spo2Icon.svg";
import RespirationRateIcon from "@/assets/icon/history/respirationRateIcon.svg";
import HeartAbnormalityIcon from "@/assets/icon/history/heartAbnormalityIcon.svg";
import TemperatureIcon from "@/assets/icon/history/temperatureIcon.svg";
import "@/assets/styles/history.css";
import "@/assets/styles/profile.css";
import HistoryChart from "../Chart/HistoryChart";
import upIcon from "@/assets/icon/history/upIcon.svg";
import {ButtonMyDeskStyle} from "@/components/reusable/ButtonStyle";
import { Link } from "react-router-dom";

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
                <HistoryChart color = "red" />
              </div>
            </Col>
            <Col md={6}>
              <div className="parameter-section">
                <Image src={Spo2Icon} alt="time-history-photo" />
                <div>SpO2 (%)</div>
                <HistoryChart color = "#8CCD47" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="parameter-section">
                <Image src={RespirationRateIcon} alt="time-history-photo" />
                <div>Respiration Rate (bpm)</div>
                <HistoryChart color = "blue" />
              </div>
            </Col>
            <Col md={6}>
              <div className="parameter-section">
                <Image src={HeartAbnormalityIcon} alt="time-history-photo" />
                <div>Heart Abnormality</div>
                <HistoryChart color = "black" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="parameter-section">
                <Image src={TemperatureIcon} alt="time-history-photo" />
                <div>Temperature</div>
                <HistoryChart color = "purple" />
              </div>
            </Col>
            <Col md={6}>
              <div className="parameter-section">
                <Image src={HeartAbnormalityIcon} alt="time-history-photo" />
                <div>Lung Abnormality</div>
                <HistoryChart color = "#1CB5BD"/>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="d-flex justify-content-end">
        <Link to="/history" style={ButtonMyDeskStyle}>
          <Image
            src={upIcon}
            alt="Image"
            width="16px"
            style={{ margin: "0em 0.2em" }}
          />
          Up
        </Link>
      </Row>
    </div>
  );
};

export default ParameterHistoryPage;
