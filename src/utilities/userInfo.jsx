import { useEffect, useState } from "react";

export const UserInfo = () => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log("wolaaa " + isLoggedIn);
  }, [isLoggedIn])
  
  
  const SetAllInfo = (user) => {
    console.log(user);
    setLoggedIn(true);
    setUsername(user.username);
  };

  return {
    username,
    isLoggedIn,
    setUsername, 
    SetAllInfo,
  };
};

export default UserInfo;
