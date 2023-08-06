/* eslint-disable no-undef */
import React, { useContext } from "react";
import { Navigate ,useNavigate} from "react-router-dom";
import { BluetoothContext } from "HEKIDESK/App";
import Swal from "sweetalert2";

const devMode = true;
function ProtectedRoute(props) {
  const bluetooth = devMode || useContext(BluetoothContext).isConnected;
  const isSignedIn = devMode || localStorage.getItem("user") !== null;
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
        navigate(process.env.REACT_APP_BASE_URL + "/connection");
      }
    });
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
