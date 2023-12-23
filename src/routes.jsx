/* eslint-disable no-undef */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";

import LoginPage from "@/pages/LoginUser/Login.page";
import ProtectedRoute from "@/hooks/ProtectedRoute";
const SignUpPage = React.lazy(() =>
  import("./pages/SignUpUser/SignUp.page.jsx")
);
const MeasurementPage = React.lazy(() =>
  import("./pages/Measurement/Measurement.page")
);
const HeartAndLungSoundPage = React.lazy(() =>
  import("@/pages/Parameters/HeartAndLungSound/HeartAndLungSound.page")
);
const BloodPressurePage = React.lazy(() =>
  import("@/pages/Parameters/BloodPressure/BloodPressure.page")
);
const TemperaturePage = React.lazy(() =>
  import("@/pages/Parameters/Temperature/Temperature.page")
);
const OximetryPage = React.lazy(() =>
  import("@/pages/Parameters/Oximetry/Oximetry.page")
);
const CardiogramPage = React.lazy(() =>
  import("@/pages/Parameters/Cardiogram/Cardiogram.page")
);
const HistoryDeskPage = React.lazy(() =>
  import("@/pages/History/HistoryDesk/HistoryDesk.page")
);
const TimeHistoryPage = React.lazy(() =>
  import("@/pages/History/Time/TimeHistory.page")
);
const ParameterHistoryPage = React.lazy(() =>
  import("@/pages/History/Parameter/ParameterHistory.page")
);
const ConnectionPage = React.lazy(() =>
  import("@/pages/Connection/Connection.page")
);
const DeskPage = React.lazy(() => import("@/pages/UserDesk/UserDesk.page"));
const RegisterPage = React.lazy(() =>
  import("@/pages/RegisterUser/Register.page")
);
const HomePage = React.lazy(() => import("@/pages/Home/Home.page"));

function AppRoutes() {
  return (
    <Suspense>
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
    </Suspense>
  );
}

export default AppRoutes;
