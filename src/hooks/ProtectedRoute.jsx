/* eslint-disable no-undef */
import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BluetoothContext } from "@/App";
import Swal from "sweetalert2";

function ProtectedRoute(props) {
  const bluetooth = useContext(BluetoothContext);
  const isAccountSelected = localStorage.getItem("account-id") != -1;
  const navigate = useNavigate();
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

  useEffect(() => {
    console.log(isLoggedIn + " " + isAccountSelected);
    if (isLoggedIn) {
      if (isAccountSelected) {
        console.log("hi: " + !bluetooth.isConnected);
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
      }
    }
  }, [bluetooth]);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (!isAccountSelected && props.children.type.name !== "HomePage") {
    return <Navigate to={process.env.REACT_APP_BASE_URL + "/home"} replace />;
  }

  // if (
  //   !bluetooth.isConnected &&
  //   props.needsDevice &&
  //   props.children.type.name === "MeasurementPage"
  // )
  //   return (
  //     <Navigate to={process.env.REACT_APP_BASE_URL + "/connection"} replace />
  //   );
  return props.children;
}
export default ProtectedRoute;
