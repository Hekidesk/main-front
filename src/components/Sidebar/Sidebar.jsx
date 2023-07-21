import React from "react";
import Logo from "HEKIDESK/assets/icon/logo.svg";
import HomeIcon from "HEKIDESK/assets/icon/home.svg";
import MyDeskIcon from "HEKIDESK/assets/icon/myDesk.svg";
import HistoryIcon from "HEKIDESK/assets/icon/history.svg";
import MeasurementIcon from "HEKIDESK/assets/icon/3D.svg";
import "../../assets/styles/Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isActive = (url) => (url === window.location.pathname ? "active" : "");
  const routes = [
    { to: "/", icon: HomeIcon, name: "Home" },
    { to: "/user-desk", icon: MyDeskIcon, name: "My Desk" },
    { to: "/measurement", icon: MeasurementIcon, name: "Measurement" },
    { to: "/history", icon: HistoryIcon, name: "History" },
  ];

  return (
    <div
      className={
        routes.filter((item) => isActive(item.to))
          ? "sidebar-container"
          : "sidebar-container expanded"
      }
    >
      <div className="SlickBar">
        <div className="logo">
          <img src={Logo} alt="logo" width="30" />
          <div className="logo-text">Hekidesk</div>
        </div>
        <div className="sidebar-item">
          {routes.map((item, i) => (
            <Link
              key={i}
              // eslint-disable-next-line no-undef
              to={process.env.REACT_APP_BASE_URL + item.to}
              className={isActive(item.to)}
            >
              <img src={item.icon} alt="logo" width="25" />
              <div className="sidebar-text">{item.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
