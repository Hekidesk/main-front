import React, { useEffect, useState, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import ProfilePhotoIcon from "@/assets/icon/profile.svg";
import deviceConnection from "@/assets/icon/deviceConnection.png";
import { Button } from "primereact/button";
import { BluetoothContext } from "@/App";
import { ButtonProfile } from "./components/CSS";
import { Link } from "react-router-dom";
import BatteryCharge from "./components/BatteryCharge";

const Profile = () => {
  const [username, setUsername] = useState("");
  const bluetooth = useContext(BluetoothContext);

  useEffect(() => {
    setUsername(localStorage.getItem("user"));
  }, []);
  return (
    <Row className="profile">
      <Col className="profile-col">
        <Link
          // eslint-disable-next-line no-undef
          to={process.env.REACT_APP_BASE_URL + "/connection"}
        >
          <Button style={ButtonProfile} className="profile-btn">
            <div style={{ fontSize: "15px" }}>
              {bluetooth.isConnected ? "Connected" : "Disconnected"}
            </div>
            <div style={{ marginLeft: "15px", marginBottom: "12px" }}>
              <img
                src={deviceConnection}
                alt="profile"
                width={25}
                className="bell-profile"
              />
            </div>
          </Button>
        </Link>
      </Col>
      <Col className="profile-col">
        <img src={ProfilePhotoIcon} alt="profile" width={60} />
      </Col>
      <Col className="profile-col battery-container">
        <BatteryCharge charge={10} />
      </Col>
      <Col className="profile-col" style={{ width: "10em" }}>
        <div className="hello-profile">hello</div>
        <div className="name-profile">{username}</div>
      </Col>
    </Row>
  );
};

export default Profile;
