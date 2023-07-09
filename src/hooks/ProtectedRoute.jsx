import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { BluetoothContext } from "@/App";

function ProtectedRoute(props) {
  const bluetooth = useContext(BluetoothContext);
  const isSignedIn = false;
  const isDeviceRegistered = false;

  if (!bluetooth.isConnected && props.needsDevice) {
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
