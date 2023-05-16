import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/Home/Home.page";
import RegisterPage from "./pages/RegisterUser/Register.page";
import RegisterDevicePage from "./pages/RegisterDevice/RegisterDevice.page";
import Measurement from "./pages/measurement/measurement";
import ParameterHistory from "./pages/History/parameter/ParameterHistory";
import TimeHistory from "./pages/History/time/TimeHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={null}>
          <Route index element={<HomePage />} />
          <Route path={"register-user"} element={<RegisterPage />} />
          <Route path={"register-device"} element={<RegisterDevicePage />} />
          <Route path={"measurement"} element={<Measurement />} />
          {/* <Route path={"connect-device"} element={<ConnectDevice />} /> */}
          <Route path={"history/parameter-history"} element={<ParameterHistory />} />TimeHistory
          <Route path={"history/time-history"} element={<TimeHistory />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
