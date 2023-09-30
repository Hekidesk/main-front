import React, { useEffect, useState } from "react";
import Logo from "@/assets/icon/logo.svg";
import HomeIcon from "@/assets/icon/home.svg";
import MyDeskIcon from "@/assets/icon/myDesk.svg";
import HistoryIcon from "@/assets/icon/history.svg";
import MeasurementIcon from "@/assets/icon/3D.svg";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const MenuItem = ({ link, image, name }) => {
    return (
      <Link
        // eslint-disable-next-line no-undef
        to={process.env.REACT_APP_BASE_URL + link}
        className={
          location.pathname !== link ? "side-item" : "side-item-active"
        }
      >
        <span>
          <img src={image} alt="logo" width="25" />
          <p className="item-title">{name}</p>
        </span>
      </Link>
    );
  };

  return (
    <div className={"sidebar-container"}>
      <div className="side-bar-list">
        <div className="logo">
          <img src={Logo} alt="logo" width="50" />
          <h4 className="logo-text">Hekidesk</h4>
        </div>
        <div className="sidebar-items">
          {[
            { link: "/", name: "Home", image: HomeIcon },
            { link: "/user-desk", name: "My Desk", image: MyDeskIcon },
            {
              link: "/measurement",
              name: "Measurement",
              image: MeasurementIcon,
            },
            { link: "/history", name: "History", image: HistoryIcon },
          ].map((item, i) => (
            <MenuItem
              name={item.name}
              image={item.image}
              link={item.link}
              key={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
