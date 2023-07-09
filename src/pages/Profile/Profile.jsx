import React from "react";
import { Col, Row, Image } from "react-bootstrap";
import ProfilePhotoIcon from "@/assets/icon/profile.svg";
import BellIcon from "@/assets/icon/bell.svg";
import { useEffect, useState } from "react";

const Profile = () => {
  const [username,setUsername] = useState("");
  useEffect(() => {
    setUsername(localStorage.getItem("user"));
  }, [])
  return (
    <div>
      <Row className="profile">
        <Col className="profile-col">
          <Image
            src={BellIcon}
            alt="profile"
            width={25}
            className="bell-profile"
          />
        </Col>
        <Col className="profile-col">
          <Image src={ProfilePhotoIcon} alt="profile" width={60} />
        </Col>
        <Col className="profile-col">
          <div className="hello-profile">hello</div>
          <div className="name-profile">{username}</div>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
