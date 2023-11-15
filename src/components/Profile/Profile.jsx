import React, { useEffect, useState, useContext } from "react";
import {  Row } from "react-bootstrap";
import ProfilePhotoIcon from "@/assets/icon/profileIcon.svg";
import connectedIcon from "@/assets/icon/deviceConnection/greenDeviceConnectionIcon.svg";
import disconnectedIcon from "@/assets/icon/deviceConnection/blackDeviceConnectionIcon.svg";
import { BluetoothContext } from "@/App";
// import { Button } from "primereact/button";
import {
  NameProfileContainer,
  WelcomeProfileContainer,
  PhotoCol,
  TextCol,
  ConnectionIconCol,
  BatteryIconCol,
  Waste
} from "./components/CSS";
import { Link } from "react-router-dom";
import BatteryCharge from "./components/BatteryCharge";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [username, setUsername] = useState("");
  const bluetooth = useContext(BluetoothContext);
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(localStorage.getItem("user"));
  }, []);

  const redirect = () => {
    // eslint-disable-next-line no-undef
    navigate(process.env.REACT_APP_BASE_URL + "/home");
  }

  return (
    <Row className="profile" onClick={() => redirect()}>
      <PhotoCol>
        <img src={ProfilePhotoIcon} alt="profile" width={40} />
      </PhotoCol>
      <TextCol>
        <WelcomeProfileContainer>Welcome</WelcomeProfileContainer>
        <NameProfileContainer>{username}</NameProfileContainer>
      </TextCol>
      <ConnectionIconCol>
        <Link
          // eslint-disable-next-line no-undef
          to={process.env.REACT_APP_BASE_URL + "/connection"}
        >
            {bluetooth.isConnected ? (
              <img
                src={connectedIcon}
                alt="profile"
                width={25}
                className="bell-profile"
              />
            ) : (
              <img
                src={disconnectedIcon}
                alt="profile"
                width={25}
                className="bell-profile"
              />
            )}
        </Link>
      </ConnectionIconCol>
      <BatteryIconCol>
        <BatteryCharge />
      </BatteryIconCol>
      <Waste></Waste>
    </Row>
  );
};

export default Profile;
