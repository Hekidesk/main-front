import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/Home.page";
import RegisterPage from "./pages/RegisterUser/Register.page";
import RegisterDevicePage from "./pages/RegisterDevice/RegisterDevice.page";
import DeskPage from "./pages/UserDesk/UserDesk.page";
import ConnectionPage from "./pages/Connection/Connection.page";
// import "bootstrap/dist/css/bootstrap.min.css";/

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={null}>
          <Route index element={<HomePage />} />
          <Route path={"register-user"} element={<RegisterPage />} />
          <Route path={"register-device"} element={<RegisterDevicePage />} />
          <Route path={"user-desk"} element={<DeskPage />} />
          <Route path={"connection"} element={<ConnectionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
