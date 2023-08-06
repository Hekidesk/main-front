/* eslint-disable no-undef */
import React from "react";

// Third party
import { BrowserRouter, Route, Routes } from "react-router-dom";

// HEKIDESK
import ProtectedRoute from "HEKIDESK/hooks/ProtectedRoute";

// Routes
const HomePage = React.lazy(() => import("HEKIDESK/pages/Home/Home.page"));
const RegisterPage = React.lazy(() =>
  import("HEKIDESK/pages/RegisterUser/Register.page")
);
const RegisterDevicePage = React.lazy(() =>
  import("HEKIDESK/pages/RegisterDevice/RegisterDevice.page")
);
const DeskPage = React.lazy(() =>
  import("HEKIDESK/pages/UserDesk/UserDesk.page")
);
const ConnectionPage = React.lazy(() =>
  import("HEKIDESK/pages/Connection/Connection.page")
);
const ParameterHistoryPage = React.lazy(() =>
  import("HEKIDESK/pages/History/Parameter/ParameterHistory.page")
);
const TimeHistoryPage = React.lazy(() =>
  import("HEKIDESK/pages/History/Time/TimeHistory.page")
);
const MeasurementPage = React.lazy(() =>
  import("HEKIDESK/pages/Measurement/Measurement.page")
);
const HistoryDeskPage = React.lazy(() =>
  import("HEKIDESK/pages/History/HistoryDesk/HistoryDesk.page")
);
const CardiogramPage = React.lazy(() =>
  import("HEKIDESK/pages/Parameters/Cardiogram/Cardiogram.page")
);

const OximetryPage = React.lazy(() =>
  import("HEKIDESK/pages/Parameters/Oximetry/Oximetry.page")
);
const TemperaturePage = React.lazy(() =>
  import("HEKIDESK/pages/Parameters/Temperature/Temperature.page")
);
const BloodPressurePage = React.lazy(() =>
  import("HEKIDESK/pages/Parameters/BloodPressure/BloodPressure.page")
);
const HeartAndLungSoundPage = React.lazy(() =>
  import("HEKIDESK/pages/Parameters/HeartAndLungSound/HeartAndLungSound.page")
);

const loading = <div className="pt-3 text-center"></div>;

function AppRoutes() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Routes>
          <Route
            path={process.env.REACT_APP_BASE_URL}
            element={null}
          >
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
            // eslint-disable-next-line no-undef
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
      </React.Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
