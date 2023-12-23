import Icon from "@/assets/logo/hekidesk-green.svg";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { ButtonStyle } from "@/components/reusable/ButtonStyle";
import { useContext, useMemo, useState, useEffect } from "react";
import { InputTextGroup } from "@/components/reusable/InputTextGroup";
import { ContainerWithoutHeight } from "@/components/reusable/Container";
import { LogoRow, Row, Title, LogoWrapper } from "./CSS";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Authentication } from "@/App";
import validateToken from "../Authentication/validateTokens";
import variable from "@/assets/var/variable.json";

const LoginForm = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const onChangeValue = (n, v) => setForm({ ...form, [n]: v });

  const initialWarning = useMemo(() => ({
    username: false,
    password: false,
  }), []);

  const [warning, setWarning] = useState(initialWarning);
  const history = useNavigate();
  const UserInfo = useContext(Authentication);

  function getUserInformation() {
    axios.get("user", {Authentication: localStorage.getItem("token")}).then(
      (response) => {
        UserInfo.SetAllInfo(response.data, localStorage.getItem("token"));
        // eslint-disable-next-line no-undef
        history(process.env.REACT_APP_BASE_URL + "/home");
      },
      (error) => {
        Swal.fire({
          icon: error,
          title: error.response.data,
          text: "Please repeat procedure!",
        });
      }
    );
  }

  useEffect(() => {
    localStorage.setItem("isLoggedIn", false);
    if (validateToken()) {
      getUserInformation();
    }
  }, []);

  const loginUser = () => {
    setWarning(() => ({
      ...initialWarning,
      password: !form.password,
      username: !form.username,
    }));
    if (!form.username || !form.password) return;

    axios
      .post("token", form)
      .then((response) => {
        console.log(response);
        UserInfo.SetAllInfo(form, response.data.token);
        // eslint-disable-next-line no-undef
        history(process.env.REACT_APP_BASE_URL + "/home");
      })
      .catch((error) => {
        Swal.fire({
          icon: error,
          title: "Login failed",
          text: "Username or password is wrong!",
        });
      });
  };

  return (
    <ContainerWithoutHeight>
      <LogoRow>
        <LogoWrapper>
          <Image src={Icon} alt="icon" width="40px" loading="lazy"/>
        </LogoWrapper>
        <Title>{variable['app-name']}</Title>
      </LogoRow>
      <InputTextGroup
        state={form.username}
        placeHolder={"Username"}
        label="Username"
        setState={(v) => onChangeValue("username", v)}
        warning={warning.username}
        necessary={true}
        warningMessage="Name cannot be empty"
      />
      <br />
      <InputTextGroup
        state={form.password}
        label={"Password"}
        placeHolder={"Password"}
        setState={(v) => onChangeValue("password", v)}
        warning={warning.password}
        necessary={true}
        warningMessage="Password cannot be empty"
      />
      <Row>
        <Button style={ButtonStyle} onClick={() => loginUser()}>
          Login
        </Button>
      </Row>
      <div style={{ textAlign: "center" }}>Do not have an account yet?</div>
      <Row>
        <Link
          // eslint-disable-next-line no-undef
          to={process.env.REACT_APP_BASE_URL + "/signup-user"}
          style={ButtonStyle}
        >
          Sign Up
        </Link>
      </Row>
    </ContainerWithoutHeight>
  );
};

export default LoginForm;
