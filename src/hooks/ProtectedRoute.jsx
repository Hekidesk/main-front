import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { BluetoothContext } from "HEKIDESK/App";

// change it to Mock device
const devMode = true;

function ProtectedRoute(props) {
  const bluetooth = devMode || useContext(BluetoothContext).isConnected;
  const isSignedIn = devMode || localStorage.getItem("user") !== null;
  const isDeviceRegistered = true;

  if (!bluetooth && props.needsDevice) {
    return (
      <Navigate
        // eslint-disable-next-line no-undef
        to={process.env.REACT_APP_BASE_URL + "/connection"}
        replace
      />
    );
  }
  if (!isSignedIn || !isDeviceRegistered) {
    return (
      <Navigate
        // eslint-disable-next-line no-undef
        to={process.env.REACT_APP_BASE_URL + "/"}
        replace
      />
    );
  }
  return props.children;
}
export default ProtectedRoute;
