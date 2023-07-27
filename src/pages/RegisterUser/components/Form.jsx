import { useState } from "react";

// Third party
import { useIndexedDB } from "react-indexed-db";
import { useNavigate } from "react-router-dom";

// PRIME REACT
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { RadioButton } from "primereact/radiobutton";
import { Image } from "primereact/image";

// HEKIDESK
import {
  ButtonStyle,
  ButtonOutlineStyle,
} from "HEKIDESK/components/reusable/ButtonStyle";
import { InputTextGroup } from "HEKIDESK/components/reusable/InputTextGroup";
import { ContainerWithoutHeight } from "HEKIDESK/components/reusable/Container";

// SVG
import Icon from "HEKIDESK/assets/logo/hekidesk-green.svg";


import { Col, LogoRow, Row, Title } from "./CSS";

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: "",
    dateOfBirth: "",
    weight: "",
    height: "",
    gender: 0,
  });

  const onChangeValue = (n, v) => setForm({ ...form, [n]: v });

  const history = useNavigate();

  const { add } = useIndexedDB("users");

  function addUser() {
    localStorage.setItem("user", form.username);
    add({ ...form }).then(
      (event) => {
        localStorage.setItem("id", event);
        history("/");
      },
      (error) => {
        console.log(error);
      }
    );
  }

  return (
    <ContainerWithoutHeight>
      <LogoRow>
        <Image src={Icon} alt="icon" width="60px" />
        <Title>Hekidesk</Title>
      </LogoRow>
      <InputTextGroup
        state={form.username}
        placeHolder={"Name"}
        label="Name"
        setState={(v) => onChangeValue("username", v)}
      />
      <div className="d-flex flex-column w-100 my-1">
        <label htmlFor={"dob"}>Date of Birth</label>
        <Calendar
          value={form.dateOfBirth}
          onChange={(v) => onChangeValue("dateOfBirth", v.target.value)}
          placeholder={"YYYY-MM-DD"}
          dateFormat="dd/mm/yy"
          showIcon
          touchUI
        />
      </div>
      <div className="w-100 d-flex flex-row gap-3">
        <InputTextGroup
          state={form.weight}
          type={"number"}
          label={"Weight"}
          placeHolder={"Weight (kg)"}
          setState={(v) => onChangeValue("weight", v)}
        />
        <InputTextGroup
          state={form.height}
          label={"Height"}
          type={"number"}
          placeHolder={"Height (cm)"}
          setState={(v) => onChangeValue("height", v)}
        />
      </div>
      <div className="d-flex flex-wrap gap-3 w-100">
        <p className="m-2">Gender</p>
        <div className="flex align-items-center">
          <RadioButton
            inputId="gender1"
            className="m-2"
            name="Male"
            value={1}
            onChange={(e) => onChangeValue("gender", e.value)}
            checked={form.gender === 1}
          />
          <label htmlFor="gender1" className="m-2">
            Male
          </label>
        </div>
        <div className="flex align-items-center">
          <RadioButton
            className="m-2"
            inputId="gender2"
            name="Female"
            value={0}
            onChange={(e) => onChangeValue("gender", e.value)}
            checked={form.gender === 0}
          />
          <label htmlFor="gender2" className="m-2">
            Female
          </label>
        </div>
      </div>
      <Row>
        <Col>
          <Button style={ButtonOutlineStyle} onClick={() => history(-1)}>
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

export default RegisterForm;
