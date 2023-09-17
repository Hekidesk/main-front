import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "./routes";
import { createContext, useMemo } from "react";
import { useSignalFeed } from "./utilities/bluetooth";
import { initDB } from "react-indexed-db";
import { DBConfig } from "@/database/DBConfig";
import axios from "axios";
import "@/assets/styles/Measurement.css";

export const BluetoothContext = createContext({});

initDB(DBConfig);

axios.defaults.baseURL = "https://api.hekidesk.com/";

function App() {
  const connection = useSignalFeed();
  const bluetooth = useMemo(() => {
    return connection;
  }, [connection]);

  return (
    <BluetoothContext.Provider value={bluetooth}>
      <AppRoutes />
    </BluetoothContext.Provider>
  );
}

export default App;
