import Icon from "@/assets/logo/hekidesk-green.svg";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { ButtonStyle } from "@/components/reusable/ButtonStyle";
import { useContext, useEffect, useState } from "react";
import { InputTextGroup } from "@/components/reusable/InputTextGroup";
import { ContainerWithoutHeight } from "@/components/reusable/Container";
import { LogoRow, Row, Title, LogoWrapper } from "./CSS";
import { Link } from "react-router-dom";
// import axios from "axios";
// import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Authentication } from "@/App";

const LoginForm = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const onChangeValue = (n, v) => setForm({ ...form, [n]: v });

  const initialWarning = {
    username: false,
    password: false,
  }

  const [warning, setWarning] = useState(initialWarning);
  const history = useNavigate();
  const UserInfo = useContext(Authentication);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", false);
  }, [])

  const loginUser = () => {
    setWarning(initialWarning);
    setWarning({
        password: !form.password,
        username: !form.username,
      });
    if(!form.username || !form.password)
      return;
    
    UserInfo.SetAllInfo(form);  
    history("/home");
    // axios.post("token", form).then(
    //   (response) => {
    //     console.log(response);
    //     history("/home");
    //   },
    //   (error) => {
    //     Swal.fire({
    //       icon: error,
    //       title: error.message,
    //       text: "Please repeat procedure!",
    //     });
    //   }
    // );
  }


  return (
    <ContainerWithoutHeight>
      <LogoRow>
        <LogoWrapper>
          <Image src={Icon} alt="icon" width="40px" />
        </LogoWrapper>
        <Title>Hekidesk</Title>
      </LogoRow>
      <InputTextGroup
        state={form.username}
        placeHolder={"Username"}
        label="Username"
        setState={(v) => onChangeValue("username", v)}
        warning={warning.username}
        necessary={true}
        warningMessage = "Name cannot be empty"
      />
      <br />
      <InputTextGroup
        state={form.password}
        label={"Password"}
        placeHolder={"Password"}
        setState={(v) => onChangeValue("password", v)}
        warning={warning.password}
        necessary={true}
        warningMessage = "Password cannot be empty"
      />
      <Row>
        <Button style={ButtonStyle} onClick={() => loginUser()}>
          Login
        </Button>
      </Row>
      <div style={{ textAlign: "center" }}>Does not have an account yet?</div>
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
