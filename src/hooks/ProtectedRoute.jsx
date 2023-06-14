import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { BluetoothContext } from "@/App";

function ProtectedRoute(props) {
  const bluetooth = useContext(BluetoothContext);
  const isSignedIn = true;
  const isDeviceRegistered = true;

  if (!bluetooth.isConnected && props.needsDevice) { //changed
    return <Navigate to="/connection" replace />;
  }
  if (!isSignedIn || !isDeviceRegistered) {
    return <Navigate to="/" replace />;
  }
  return props.children;
}
export default ProtectedRoute;
