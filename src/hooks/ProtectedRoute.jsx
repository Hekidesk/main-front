/* eslint-disable no-undef */
import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BluetoothContext } from "@/App";
import Swal from "sweetalert2";

function ProtectedRoute(props) {
  const bluetooth = useContext(BluetoothContext);
  const isSignedIn = localStorage.getItem("user") !== null;
  const isDeviceRegistered = true ||  localStorage.getItem("device") !== null;
  const navigate = useNavigate();

  if (
    !bluetooth.isConnected &&
    props.needsDevice &&
    props.children.type.name === "MeasurementPage"
  )
    return (
      <Navigate to={process.env.REACT_APP_BASE_URL + "/connection"} replace />
    );
  if (!bluetooth.isConnected && props.needsDevice) {
    Swal.fire({
      title: "Your device is disconnected",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Connect Your Device",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(process.env.REACT_APP_BASE_URL + "/connection");
      }
    });
  }
  if (!isSignedIn || !isDeviceRegistered) {
    return <Navigate to={process.env.REACT_APP_BASE_URL + "/"} replace />;
  }
  return props.children;
}
export default ProtectedRoute;
