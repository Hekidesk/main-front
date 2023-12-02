import Icon from "@/assets/logo/hekidesk-green.svg";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { ButtonStyle } from "@/components/reusable/ButtonStyle";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextGroup } from "@/components/reusable/InputTextGroup";
import { ContainerWithoutHeight } from "@/components/reusable/Container";
import { useNavigate } from "react-router-dom";
import { Col, LogoRow, Row, Title, LogoWrapper } from "./CSS";
import { Calendar } from "primereact/calendar";
import axios from "axios";
import Swal from "sweetalert2";
import variable from "@/assets/var/variable.json";

const RegisterForm = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    blood_type : "A+",
    dateOfBirth: "",
    weight: "",
    height: "",
    gender: "0",
  });
  const onChangeValue = (n, v) => setForm({ ...form, [n]: v });

  const history = useNavigate();


  const initialWarning = {
    first_name: false,
    last_name: false,
    blood_type : false,
    dateOfBirth: false,
    weight: false,
    height: false,
    gender: false,
  };

  const [warning, setWarning] = useState(initialWarning);

  const addUser = () => {
    setWarning(initialWarning);
    setWarning({
      first_name: !form.first_name,
      last_name: !form.last_name,
      blood_type : !form.blood_type ,
      dateOfBirth: !form.dateOfBirth,
      weight: !form.weight,
      height: !form.height,
      gender: !form.gender,
    });
    if (
      !form.first_name ||
      !form.last_name ||
      !form.blood_type  ||
      !form.dateOfBirth ||
      !form.weight ||
      !form.height ||
      !form.gender
    )
    {
      return;
    }
    localStorage.setItem("user", form.username);
    const updatedForm = {
      ...form,
      height: Number(form.height),
      weight: Number(form.weight),
      gender: Boolean(form.gender)
    };
    setForm(updatedForm)
    console.log(updatedForm);
    axios.post("account", updatedForm).then(
      (response) => {
        console.log(response.data);
        localStorage.setItem("user", form.first_name);
        localStorage.setItem("account-id", response.data.account_id);
        history(process.env.REACT_APP_BASE_URL + "/home");
      },
      (error) => {
        Swal.fire({
          icon: error,
          title: error.response.data.error,
          text: "Please repeat procedure!",
        });
      }
    );
  }

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
          state={form.first_name}
          label={"First Name"}
          placeHolder={"First Name"}
          setState={(v) => onChangeValue("first_name", v)}
          warning={warning.first_name}
          necessary={true}
          warningMessage="first name cannot be empty"
        />
        <InputTextGroup
          state={form.last_name}
          label={"Last Name"}
          placeHolder={"Last Name"}
          setState={(v) => onChangeValue("last_name", v)}
          warning={warning.last_name}
          necessary={true}
          warningMessage="Last name cannot be empty"
        />
      </Row>
      <Row>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            margin: "0.5em 0",
            position: "relative",
          }}
        >
          <label htmlFor={"dob"}>Date of Birth</label>
          <Calendar
            value={form.dateOfBirth}
            onChange={(v) => onChangeValue("dateOfBirth", v.target.value)}
            placeholder={"YYYY-MM-DD"}
            dateFormat="dd/mm/yy"
            showIcon
            className={"p-inputtext-sm " + (warning.dateOfBirth ? "p-invalid" : {})}
          />
        </div>
      </Row>
      <Row>
        <InputTextGroup
          state={form.weight}
          label={"Weight"}
          placeHolder={"Weight (kg)"}
          setState={(v) => onChangeValue("weight", v)}
          warning={warning.weight}
          necessary={true}
          warningMessage="weight name cannot be empty"
        />
        <InputTextGroup
          state={form.height}
          label={"Height"}
          placeHolder={"Height (cm)"}
          setState={(v) => onChangeValue("height", v)}
          warning={warning.height}
          necessary={true}
          warningMessage="height name cannot be empty"
        />
      </Row>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          margin: "0.5em 0",
        }}
      >
        <label htmlFor={"blood_type "}>Blood Type</label>
        <Dropdown
          value={form.blood_type }
          onChange={(v) => onChangeValue("blood_type ", v.value)}
          className={"register-dropdown p-inputtext-sm " + (warning.blood_type  ? "p-invalid" : {})}
          options={[
            { value: "A+" },
            { value: "A-" },
            { value: "B+" },
            { value: "B-" },
            { value: "O+" },
            { value: "O-" },
            { value: "AB+" },
            { value: "AB-" },
          ]}
          optionLabel="value"
          placeholder="Select a blood_type "
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          margin: "0.5em 0",
        }}
      >
        <label htmlFor={"gender"}>Gender</label>
        <Dropdown
          value={form.gender}
          onChange={(v) => onChangeValue("gender", v.value)}
          className={"register-dropdown p-inputtext-sm " + (warning.gender ? "p-invalid" : {})}
          options={[
            { name: "Male", value: "1" },
            { name: "Female", value: "0" },
          ]}
          optionLabel="name"
          placeholder="Select a gender"
        />
      </div>
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

export default RegisterForm;
