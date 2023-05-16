import React from "react";
import { Col, Row, Image } from "react-bootstrap";
import profilePhoto from "../../assets/icon/profile.svg";
import "../../assets/styles/profile.css";

function ProfileSection() {
  return (
    <div className="profile-section">
      <Row className="text-right">
        <Col>
            <Image src={profilePhoto} className="profile-photo" alt="profile" />
        </Col>
      </Row>
      <Row>
        <div className="profile-name">Nima Mizan</div>
      </Row>
      <Row>
        <p className="profile-age">24 years old, Urmia</p>
      </Row>
      <Row className="profile-inforamtion">
        <Col lg={3} md = {12} className="profile-info">
          <Row><div className="profile-info-title">Height</div></Row>
          <Row><div className="profile-info-value">177</div></Row>
        </Col>
        <Col lg={3} md = {12} className="profile-info">
          <Row><div className="profile-info-title">Weight</div></Row>
          <Row><div className="profile-info-value">69</div></Row>
        </Col>
        <Col lg={3} md = {12} className="profile-info">
          <Row><div className="profile-info-title">Blood</div></Row>
          <Row><div className="profile-info-value">O+</div></Row>
        </Col>
      </Row>
    </div>
  );
}

export default ProfileSection;
