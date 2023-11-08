/* eslint-disable no-undef */
import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BluetoothContext } from "@/App";
import Swal from "sweetalert2";
import { Authentication } from "@/App";

function ProtectedRoute(props) {
  const bluetooth = useContext(BluetoothContext);
  const isAccountSelected = localStorage.getItem("id") != -1;
  const navigate = useNavigate();
  const UserInfo = useContext(Authentication);

  useEffect(() => {
    if (UserInfo.isLoggedIn) {
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
  }, [bluetooth]);

  // if (
  //   !bluetooth.isConnected &&
  //   props.needsDevice &&
  //   props.children.type.name === "MeasurementPage"
  // )
  //   return (
  //     <Navigate to={process.env.REACT_APP_BASE_URL + "/connection"} replace />
  //   );
  console.log(!isAccountSelected && props.children.type.name !== "HomePage")
  if (!isAccountSelected && props.children.type.name !== "HomePage") {
    console.log("miay inja???");
    return <Navigate to={process.env.REACT_APP_BASE_URL + "/home"} replace />;
  }
  
  console.log(UserInfo.isLoggedIn)
  if (!UserInfo.isLoggedIn) {
    console.log("but why?")
    return <Navigate to="/" replace />;
  }
  return props.children;
}
export default ProtectedRoute;
