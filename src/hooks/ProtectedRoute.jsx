import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  const isSignedIn = false;
  const isDeviceRegistered = false;
  const isDeviceConnected = false;

  if (!isDeviceConnected && props.needsDevice) {
    return <Navigate to="/connection" replace />;
  }
  if (!isSignedIn || !isDeviceRegistered) {
    return <Navigate to="/" replace />;
  }
  return props.children;
}
export default ProtectedRoute;
