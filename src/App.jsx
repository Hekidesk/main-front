import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/Home.page";
import LoginPage from "./pages/Login/Login.page";
import RegisterPage from "./pages/Login copy/Register.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={null}>
          <Route index element={<HomePage />} />
          <Route path={"login"} element={<LoginPage />} />
          <Route path={"register-user"} element={<RegisterPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
