import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "./routes";
import { createContext, useEffect, useMemo } from "react";
import { useSignalFeed } from "./utilities/bluetooth";
import { initDB } from "react-indexed-db";
import { DBConfig } from "@/database/DBConfig";
import axios from "axios";
import "@/assets/styles/Measurement.css";
import UserInfo from "./utilities/userInfo.jsx";

export const BluetoothContext = createContext({});
export const Authentication = createContext({});

initDB(DBConfig);

axios.defaults.baseURL = "https://api.hekidesk.com/";

function App() {
  const connection = useSignalFeed();
  const bluetooth = useMemo(() => {
    return connection;
  }, [connection]);
  const user = UserInfo();

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("isLoggedIn", false);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); 

  return (
    <Authentication.Provider value={user}>
      <BluetoothContext.Provider value={bluetooth}>
        <AppRoutes />
      </BluetoothContext.Provider>
    </Authentication.Provider>
  );
}

export default App;
