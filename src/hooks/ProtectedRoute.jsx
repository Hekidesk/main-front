import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { BluetoothContext } from "../App";

function ProtectedRoute(props) {
  const bluetooth = useContext(BluetoothContext);
  const isSignedIn = false;
  const isDeviceRegistered = false;

  if (!bluetooth.isConnected && props.needsDevice) {
    return <Navigate to="/connection" replace />;
  }
  if (!isSignedIn || !isDeviceRegistered) {
    return <Navigate to="/" replace />;
  }
  return props.children;
}
export default ProtectedRoute;
