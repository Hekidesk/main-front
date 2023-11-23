import {useState } from "react";
import axios from "axios";

export const UserInfo = () => {
  const [username, setUsername] = useState("");
  
  const SetAllInfo = (user, token) => {
    setUsername(user.username);
    axios.defaults.headers.common['Authorization'] = token;
    localStorage.setItem("token", token);
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("expireDate", Math.floor(Date.now() / 1000) + 30*24*60*3600)
  };

  return {
    username,
    setUsername, 
    SetAllInfo,
  };
};

export default UserInfo;
