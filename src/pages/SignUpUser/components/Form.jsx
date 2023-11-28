import Icon from "@/assets/logo/hekidesk-green.svg";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { ButtonStyle } from "@/components/reusable/ButtonStyle";
import { useContext, useState } from "react";
import { InputTextGroup } from "@/components/reusable/InputTextGroup";
import { ContainerWithoutHeight } from "@/components/reusable/Container";
import { useNavigate } from "react-router-dom";
import { Col, LogoRow, Row, Title, LogoWrapper } from "./CSS";
import axios from "axios";
import Swal from "sweetalert2";
import { Authentication } from "@/App";
import variable from "@/assets/var/variable.json";

const SignUpForm = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    phoneNumber: "",
  });
  const onChangeValue = (n, v) => setForm({ ...form, [n]: v });
  const UserInfo = useContext(Authentication);

  const initialWarning = {
    username: false,
    password: false,
    phoneNumber: false,
  };

  const [warning, setWarning] = useState(initialWarning);
  const history = useNavigate();

  const addUser = () => {
    setWarning(initialWarning);
    setWarning({
      username: !form.username,
      password: !form.password,
      phoneNumber: !form.phoneNumber,
    });
    if (!form.username || !form.password || !form.phoneNumber) {
      return;
    }
    axios
      .post("user", form)
      .then((response) => {
        console.log(response);
        axios.post("token", form).then((response) => {
          console.log(response);
          UserInfo.SetAllInfo(form, response.data.token);
          history("/home");
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: error,
          title: error.response.data.error,
          text: "Please repeat procedure!",
        });
      });
  };

  return (
    <ContainerWithoutHeight>
      <LogoRow>
        <LogoWrapper>
          <Image src={Icon} alt="icon" width="40px" />
        </LogoWrapper>
        <Title>{variable['app-name']}</Title>
      </LogoRow>
      <Row>
        <InputTextGroup
          state={form.firstName}
          label={"Username"}
          placeHolder={"username"}
          setState={(v) => onChangeValue("username", v)}
          warning={warning.username}
          necessary={true}
          warningMessage="username cannot be empty"
        />
        <InputTextGroup
          state={form.password}
          label={"Password"}
          placeHolder={"Password"}
          setState={(v) => onChangeValue("password", v)}
          warning={warning.password}
          necessary={true}
          warningMessage="Password cannot be empty"
          feedback={true}
        />
      </Row>
      <br />
      <InputTextGroup
        state={form.phoneNumber}
        label={"phoneNumber"}
        placeHolder={"Phone Number"}
        setState={(v) => onChangeValue("phoneNumber", v)}
        warning={warning.phoneNumber}
        necessary={true}
        warningMessage="Phone Number cannot be empty"
      />
      <Row>
        <Col>
          <Button style={ButtonStyle} onClick={() => history(-1)}>
            back
          </Button>
        </Col>
        <Col>
          <Button style={ButtonStyle} onClick={() => addUser()}>
            Sign in
          </Button>
        </Col>
      </Row>
    </ContainerWithoutHeight>
  );
};

export default SignUpForm;
