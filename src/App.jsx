import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "@/pages/Home/Home.page";
import RegisterPage from "@/pages/RegisterUser/Register.page";
import RegisterDevicePage from "@/pages/RegisterDevice/RegisterDevice.page";
import DeskPage from "@/pages/UserDesk/UserDesk.page";
import ConnectionPage from "@/pages/Connection/Connection.page";
import ParameterHistoryPage from "@/pages/History/parameter/ParameterHistory.page";
import TimeHistoryPage from "@/pages/History/time/TimeHistory.page";
import MeasurementPage from "@/pages/Measurement/Measurement.page";
import DemoPage from "@/pages/Demo/Demo.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={null}>
          <Route index element={<HomePage />} />
          <Route path={"register-user"} element={<RegisterPage />} />
          <Route path={"register-device"} element={<RegisterDevicePage />} />
          <Route path={"user-desk"} element={<DeskPage />} />
          <Route path={"connection"} element={<ConnectionPage />} />
          <Route path={"measurement"} element={<MeasurementPage />} />
          <Route path="/history" element={null}>
            <Route path={"parameter"} element={<ParameterHistoryPage />} />
            <Route path={"time"} element={<TimeHistoryPage />} />
          </Route>
          <Route path={"demo"} element={<DemoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
