import React from "react";
import Logo from "@/assets/icon/logo.svg";
import HomeIcon from "@/assets/icon/home.svg";
import MyDeskIcon from "@/assets/icon/myDesk.svg";
import HistoryIcon from "@/assets/icon/history.svg";
import MeasurementIcon from "@/assets/icon/3D.svg";
import "../../assets/styles/Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [click, setClick] = React.useState(false);

  return (
    <div className={click ? "sidebar-container" : "sidebar-container expanded"}>
      <div className="SlickBar">
        <div className="logo">
          <img src={Logo} alt="logo" width="30" />
          <div className="logo-text">Hekidesk</div>
        </div>
        <div className="sidebar-item">
          <Link
            onClick={() => setClick(false)}
            to={process.env.REACT_APP_BASE_URL + "/"}
          >
            <img src={HomeIcon} alt="logo" width="25" />
            <div className="sidebar-text">Home</div>
          </Link>
          <Link
            onClick={() => setClick(false)}
            to={process.env.REACT_APP_BASE_URL + "/user-desk"}
          >
            <img src={MyDeskIcon} alt="logo" width="25" />
            <div className="sidebar-text">My Desk</div>
          </Link>
          <Link
            onClick={() => setClick(false)}
            to={process.env.REACT_APP_BASE_URL + "/measurement"}
          >
            <img src={MeasurementIcon} alt="logo" width="25" />
            <div className="sidebar-text">Measurement</div>
          </Link>
          <Link
            onClick={() => setClick(false)}
            to={process.env.REACT_APP_BASE_URL + "/history"}
          >
            <img src={HistoryIcon} alt="logo" width="25" />
            <div className="sidebar-text">History</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
