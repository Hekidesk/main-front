import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { BluetoothContext } from "HEKIDESK/App";

function ProtectedRoute(props) {
  const bluetooth = true;//useContext(BluetoothContext).isConnected;
  const isSignedIn = true; //localStorage.getItem("user") !== null;
  const isDeviceRegistered = true;

  if (!bluetooth && props.needsDevice) {
    //changed
    return (
      <Navigate to={process.env.REACT_APP_BASE_URL + "/connection"} replace />
    );
  }
  if (!isSignedIn || !isDeviceRegistered) {
    return <Navigate to={process.env.REACT_APP_BASE_URL + "/"} replace />;
  }
  return props.children;
}
export default ProtectedRoute;
