import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { BluetoothContext } from "@/App";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ProtectedRoute(props) {
  const bluetooth = useContext(BluetoothContext);
  const isSignedIn = localStorage.getItem("user") !== null;
  const isDeviceRegistered = true;
  const navigate = useNavigate();

  if (!bluetooth.isConnected && props.needsDevice) {
    //changed

    Swal.fire({
      title: "Your device is disconnected",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Connect Your Device",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("here ??")
        navigate(process.env.REACT_APP_BASE_URL + "/connection");
      }
    });
    
    // return (
    //   <Navigate to={process.env.REACT_APP_BASE_URL + "/connection"} replace />
    // );
  }
  if (!isSignedIn || !isDeviceRegistered) {
    return <Navigate to={process.env.REACT_APP_BASE_URL + "/"} replace />;
  }
  return props.children;
}
export default ProtectedRoute;
