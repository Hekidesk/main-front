import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";
import "@/assets/styles/history.css";
import "@/assets/styles/profile.css";

import PrimeReact from "primereact/api";

PrimeReact.appendTo = "self";

ReactDOM.createRoot(document.getElementById("root")).render(
    <App />
);
