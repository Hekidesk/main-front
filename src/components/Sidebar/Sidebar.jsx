import React, { useState } from "react";
import Logo from "@/assets/icon/logo.svg";
import HomeIcon from "@/assets/icon/home.svg";
import MyDeskIcon from "@/assets/icon/myDesk.svg";
import HistoryIcon from "@/assets/icon/history.svg";
import MeasurementIcon from "@/assets/icon/3D.svg";
import LogoutIcon from "@/assets/icon/logoutIcon.svg";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const MenuItem = ({ link, image, name, show }) => {
    return (
      show && (
        <Link
          // eslint-disable-next-line no-undef
          to={process.env.REACT_APP_BASE_URL + link}
          className={
            location.pathname !== link ? "side-item" : "side-item-active"
          }
        >
          <span>
            <img src={image} alt="logo" width="25" />
            <p>{name}</p>
          </span>
        </Link>
      )
    );
  };

  const navigate = useNavigate();
  const Logout = () => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("user", "");
    localStorage.setItem("account-id", -1);
    localStorage.setItem("token", "");
    localStorage.setItem("expireDate", "");
    // eslint-disable-next-line no-undef
    navigate(process.env.REACT_APP_BASE_URL + "/");
  };

  const location = useLocation();
  const [showMeasurement] = useState(
    location.pathname.includes("/measurement") &&
      location.pathname !== "/measurement"
  );
  const [showHistory] = useState(location.pathname.includes("/history"));

  return (
    <div className={"sidebar-container"}>
      <div className="side-bar-list">
        <div className="logo">
          <img src={Logo} alt="logo" width="50" />
          <h4 className="logo-text">Hekidesk</h4>
        </div>
        <div className="sidebar-items">
          {[
            { link: "/home", name: "Home", image: HomeIcon, show: true },
            {
              link: "/user-desk",
              name: "My Desk",
              image: MyDeskIcon,
              show: true,
            },
            {
              link: "/measurement",
              name: "Measurement",
              image: MeasurementIcon,
              show: showMeasurement,
            },
            {
              link: "/history",
              name: "History",
              image: HistoryIcon,
              show: showHistory,
            },
          ].map((item, i) => (
            <MenuItem
              name={item.name}
              image={item.image}
              link={item.link}
              show={item.show}
              key={i}
            />
          ))}
        </div>
        <div className="sidebar-item-end">
          <span onClick={() => Logout()}>
            <img src={LogoutIcon} alt="logo" width="25"/>
            <p>Log out</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
