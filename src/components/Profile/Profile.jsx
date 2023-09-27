import React, { useEffect, useState, useContext } from "react";
import {  Row } from "react-bootstrap";
import ProfilePhotoIcon from "@/assets/icon/profile.svg";
import greenDCIcon from "@/assets/icon/greenDeviceConnectionIcon.svg";
import redDCIcon from "@/assets/icon/blackDeviceConnectionIcon.svg";
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

const Profile = () => {
  const [username, setUsername] = useState("");
  const bluetooth = useContext(BluetoothContext);

  useEffect(() => {
    setUsername(localStorage.getItem("user"));
  }, []);
  return (
    <Row className="profile">
      <PhotoCol >
        <img src={ProfilePhotoIcon} alt="profile" width={60} />
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
                src={greenDCIcon}
                alt="profile"
                width={25}
                className="bell-profile"
              />
            ) : (
              <img
                src={redDCIcon}
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
