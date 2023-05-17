import React from "react";
import Logo from "../../assets/icon/logo.svg";
import HomeIcon from "../../assets/icon/home.svg";
import MyDeskIcon from "../../assets/icon/myDesk.svg";
import HistoryIcon from "../../assets/icon/history.svg";
import MeasurementIcon from "../../assets/icon/3D.svg";
import "../../assets/styles/Sidebar.css";

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
          <a onClick={() => setClick(false)} to="/">
            <img src={HomeIcon} alt="logo" width="25" />
            <div className="sidebar-text">Home</div>
          </a>
          <a onClick={() => setClick(false)} to="/">
            <img src={MyDeskIcon} alt="logo" width="25" />
            <div className="sidebar-text">My Desk</div>
          </a>
          <a onClick={() => setClick(false)} to="/">
            <img src={MeasurementIcon} alt="logo" width="25" />
            <div className="sidebar-text">Measurement</div>
          </a>
          <a onClick={() => setClick(false)} to="/">
            <img src={HistoryIcon} alt="logo" width="25" />
            <div className="sidebar-text">History</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
