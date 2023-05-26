import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "./routes";
import { createContext, useMemo } from "react";
import { useSignalFeed } from "./utilities/bluetooth";

export const BluetoothContext = createContext({});

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
