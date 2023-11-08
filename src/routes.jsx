/* eslint-disable no-undef */
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "@/pages/Home/Home.page";
import LoginPage from "@/pages/LoginUser/Login.page";
import RegisterPage from "@/pages/RegisterUser/Register.page";
import DeskPage from "@/pages/UserDesk/UserDesk.page";
import ConnectionPage from "@/pages/Connection/Connection.page";
import ParameterHistoryPage from "@/pages/History/Parameter/ParameterHistory.page";
import TimeHistoryPage from "@/pages/History/Time/TimeHistory.page";
import MeasurementPage from "@/pages/Measurement/Measurement.page";
import HistoryDeskPage from "@/pages/History/HistoryDesk/HistoryDesk.page";
import CardiogramPage from "@/pages/Parameters/Cardiogram/Cardiogram.page";
import OximetryPage from "@/pages/Parameters/Oximetry/Oximetry.page";
import TemperaturePage from "@/pages/Parameters/Temperature/Temperature.page";
import BloodPressurePage from "@/pages/Parameters/BloodPressure/BloodPressure.page";
import HeartAndLungSoundPage from "@/pages/Parameters/HeartAndLungSound/HeartAndLungSound.page";
import ProtectedRoute from "@/hooks/ProtectedRoute";
import SignUpPage from "./pages/SignUpUser/SignUp.page.jsx";

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path={process.env.REACT_APP_BASE_URL} element={null}>
            <Route index element={<LoginPage />} />
            <Route path={"signup-user"} element={<SignUpPage />} />
            <Route
              path={"home"}
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path={"register-user"}
              element={
                <ProtectedRoute>
                  <RegisterPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={"user-desk"}
              element={
                <ProtectedRoute>
                  <DeskPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={"connection"}
              element={
                <ProtectedRoute>
                  <ConnectionPage />
                </ProtectedRoute>
              }
            />
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
              element={
                <ProtectedRoute needsDevice>
                  <HeartAndLungSoundPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
