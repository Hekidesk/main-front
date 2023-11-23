import { Col, Row } from "react-bootstrap";
import ProfilePhotoIcon from "@/assets/icon/profile.svg";
import "../../assets/styles/profile.css";
import { useEffect, useState } from "react";
import { useIndexedDB } from "react-indexed-db";
const ProfileSection = () => {
  const { getByIndex } = useIndexedDB("users");
  const [user, setUser] = useState({});
  const [age, setAge] = useState("");

  useEffect(() => {
    getByIndex("username",localStorage.getItem("user")).then((user) => setUser(user));
  }, []);

  useEffect(() => {
    const birthDate = new Date(user.dateOfBirth);
    var today = new Date();
    const diffTime = Math.abs(today.getTime() - birthDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30 * 12));
    setAge(diffDays);
  }, [user]);
  return (
    <div className="profile-section">
      <Row className="text-right">
        <Col>
          <img src={ProfilePhotoIcon} className="profile-photo" alt="profile" />
        </Col>
      </Row>
      <Row>
        <div className="profile-name">{user.username}</div>
      </Row>
      <Row>
        <p className="profile-age">{age} years old</p>
      </Row>
      <Row className="profile-inforamtion">
        <Col lg={3} md={12} className="profile-info">
          <Row>
            <div className="profile-info-title">Height</div>
          </Row>
          <Row>
            <div className="profile-info-value">{user.height}</div>
          </Row>
        </Col>
        <Col lg={3} md={12} className="profile-info">
          <Row>
            <div className="profile-info-title">Weight</div>
          </Row>
          <Row>
            <div className="profile-info-value">{user.weight}</div>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileSection;
