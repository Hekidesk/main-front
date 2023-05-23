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
import HistoryDeskPage from "./pages/History/HistoryDesk/HistoryDesk.page";
import CardiogramPage from "./pages/Parameters/Cardiogram/Cardiogram.page";
import OximetryPage from "./pages/Parameters/Oximetry/Oximetry.page";
import TemperaturePage from "./pages/Parameters/Temperature/Temperature.page";
import BloodPressurePage from "./pages/Parameters/BloodPressure/BloodPressure.page";
import HeartAndLungSoundPage from "./pages/Parameters/HeartAndLungSound/HeartAndLungSound.page";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {
  return (
    <BrowserRouter>
      {/* <TransitionGroup>
          <CSSTransition
            classNames="fade"
            timeout={300}
            > */}
        <Routes>
        <Route path="/" element={null}>
          <Route index element={<HomePage />} />
          <Route path={"register-user"} element={<RegisterPage />} />
          <Route path={"register-device"} element={<RegisterDevicePage />} />
          <Route path={"user-desk"} element={<DeskPage />} />
          <Route path={"connection"} element={<ConnectionPage />} />
          <Route path="/history" element={null}>
            <Route index element={<HistoryDeskPage />} />
            <Route path={"parameter"} element={<ParameterHistoryPage />} />
            <Route path={"time"} element={<TimeHistoryPage />} />
          </Route>
          <Route path="/measurement" element={null}>
            <Route index element={<MeasurementPage />} />
            <Route path={"cardiogram"} element={<CardiogramPage />} />
            <Route path={"oximetry"} element={<OximetryPage />} />
            <Route path={"blood-pressure"} element={<BloodPressurePage />} />
            <Route path={"temperature"} element={<TemperaturePage />} />
            <Route path={"heart-and-lung-sound"} element={<HeartAndLungSoundPage />} />
          </Route>
        </Route>
      </Routes>
      {/* </CSSTransition>
      </TransitionGroup> */}

    </BrowserRouter>
  );
}

export default App;
