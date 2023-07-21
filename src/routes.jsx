import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "HEKIDESK/pages/Home/Home.page";
import RegisterPage from "HEKIDESK/pages/RegisterUser/Register.page";
import RegisterDevicePage from "HEKIDESK/pages/RegisterDevice/RegisterDevice.page";
import DeskPage from "HEKIDESK/pages/UserDesk/UserDesk.page";
import ConnectionPage from "HEKIDESK/pages/Connection/Connection.page";
import ParameterHistoryPage from "HEKIDESK/pages/History/Parameter/ParameterHistory.page";
import TimeHistoryPage from "HEKIDESK/pages/History/Time/TimeHistory.page";
import MeasurementPage from "HEKIDESK/pages/Measurement/Measurement.page";
import HistoryDeskPage from "HEKIDESK/pages/History/HistoryDesk/HistoryDesk.page";
import CardiogramPage from "HEKIDESK/pages/Parameters/Cardiogram/Cardiogram.page";
import OximetryPage from "HEKIDESK/pages/Parameters/Oximetry/Oximetry.page";
import TemperaturePage from "HEKIDESK/pages/Parameters/Temperature/Temperature.page";
import BloodPressurePage from "HEKIDESK/pages/Parameters/BloodPressure/BloodPressure.page";
import HeartAndLungSoundPage from "HEKIDESK/pages/Parameters/HeartAndLungSound/HeartAndLungSound.page";
import ProtectedRoute from "HEKIDESK/hooks/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={process.env.REACT_APP_BASE_URL} element={null}>
          <Route index element={<HomePage />} />
          <Route path={"register-user"} element={<RegisterPage />} />
          <Route path={"register-device"} element={<RegisterDevicePage />} />
          <Route path={"user-desk"} element={<DeskPage />} />
          <Route path={"connection"} element={<ConnectionPage />} />
        </Route>
        <Route
          path={process.env.REACT_APP_BASE_URL + "/history"}
          element={null}
        >
          <Route
            index
            element={
              <ProtectedRoute>
                <HistoryDeskPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={"parameter"}
            element={
              <ProtectedRoute>
                <ParameterHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={"time"}
            element={
              <ProtectedRoute>
                <TimeHistoryPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path={process.env.REACT_APP_BASE_URL + "/measurement"}
          element={null}
        >
          <Route
            index
            element={
              <ProtectedRoute needsDevice>
                <MeasurementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={"cardiogram"}
            element={
              <ProtectedRoute needsDevice>
                <CardiogramPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={"oximetry"}
            element={
              <ProtectedRoute needsDevice>
                <OximetryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={"blood-pressure"}
            element={
              <ProtectedRoute needsDevice>
                <BloodPressurePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={"temperature"}
            element={
              <ProtectedRoute needsDevice>
                <TemperaturePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={"heart-and-lung-sound"}
            element={<HeartAndLungSoundPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
