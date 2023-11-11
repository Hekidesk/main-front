import {useState } from "react";

export const UserInfo = () => {
  const [username, setUsername] = useState("");
  
  const SetAllInfo = (user) => {
    console.log(user);
    setUsername(user.username);
    localStorage.setItem("isLoggedIn", true);
  };

  return {
    username,
    setUsername, 
    SetAllInfo,
  };
};

export default UserInfo;
