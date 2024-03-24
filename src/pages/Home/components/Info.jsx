import Icon from "@/assets/logo/hekidesk-transparent.svg";
import HeartbeatIcon from "@/assets/icon/heartbeat.svg";
import StethoscopeIcon from "@/assets/icon/stethoscope.svg";
import BluetoothIcon from "@/assets/icon/bluetooth.svg";
import { Image } from "primereact/image";
import { Text } from "@/components/reusable/Text";
import { List, ListItems } from "@/components/reusable/List";
import { ImageWrapper } from "@/components/reusable/ImageWrapper";
import LogoutIcon from "@/assets/icon/logoutIcon.svg";
import { useNavigate } from "react-router-dom";

const InfoHome = () => {

  const navigate = useNavigate();
  const Logout = () => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("user", "");
    localStorage.setItem("account-id", "");
    localStorage.setItem("token", "");
    localStorage.setItem("expireDate", "");
    // eslint-disable-next-line no-undef
    navigate(process.env.REACT_APP_BASE_URL + "/");
  };


  return (
    <span>
      <Text>Smart Listening Device - Smart Activity Fitness Tracker</Text>
      <List>
        <ListItems>
          <Image
            src={StethoscopeIcon}
            alt="Image"
            width="16px"
            style={{ margin: "0em 0.5em", textTransform: "uppercase" }}
            loading="lazy"
          />
          AMAZING AUSCULTATION EXPERIENCE
        </ListItems>
        <ListItems>
          <Image
            src={HeartbeatIcon}
            alt="Image"
            width="16px"
            style={{ margin: "0em 0.5em", textTransform: "uppercase" }}
            loading="lazy"
          />
          PERSONAL HEALTH MONITORING
        </ListItems>
        <ListItems>
          <Image
            src={BluetoothIcon}
            alt="Image"
            width="10px"
            style={{ margin: "0em 0.5em", textTransform: "uppercase" }}
            loading="lazy"
          />
          BLUETOOTH CONNECTION{" "}
        </ListItems>
      </List>
      <ImageWrapper>
        <Image src={Icon} alt="icon" width="100%" loading="lazy"/>
      </ImageWrapper>
      <div className="sidebar-item-end">
          <span onClick={() => Logout()}>
            <img src={LogoutIcon} alt="logo" width="25"/>
            <p>Log out</p>
          </span>
      </div>
      
    </span>
  );
};

export default InfoHome;
