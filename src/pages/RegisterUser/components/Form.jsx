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
import { useIndexedDB } from "react-indexed-db";
import { Calendar } from "primereact/calendar";

const RegisterForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    bloodType: "A+",
    dateOfBirth: "",
    weight: "",
    height: "",
    gender: "0",
  });
  const onChangeValue = (n, v) => setForm({ ...form, [n]: v });

  const history = useNavigate();

  const { add } = useIndexedDB("users");

  const initialWarning = {
    firstName: false,
    lastName: false,
    bloodType: false,
    dateOfBirth: false,
    weight: false,
    height: false,
    gender: false,
  };

  const [warning, setWarning] = useState(initialWarning);

  const addUser = () => {
    console.log("hi");
    setWarning(initialWarning);
    setWarning({
      firstName: !form.firstName,
      lastName: !form.lastName,
      bloodType: !form.bloodType,
      dateOfBirth: !form.dateOfBirth,
      weight: !form.weight,
      height: !form.height,
      gender: !form.gender,
    });
    if (
      !form.firstName ||
      !form.lastName ||
      !form.bloodType ||
      !form.dateOfBirth ||
      !form.weight ||
      !form.height ||
      !form.gender
    )
    {
      console.log(warning);
      return;
    }
    localStorage.setItem("user", form.username);
    add({ ...form }).then(
      (event) => {
        localStorage.setItem("id", event.target.result);
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
        <LogoWrapper>
          <Image src={Icon} alt="icon" width="40px" />
        </LogoWrapper>
        <Title>Hekidesk</Title>
      </LogoRow>
      <Row>
        <InputTextGroup
          state={form.firstName}
          label={"First Name"}
          placeHolder={"First Name"}
          setState={(v) => onChangeValue("firstName", v)}
          warning={warning.firstName}
          necessary={true}
          warningMessage="first name cannot be empty"
        />
        <InputTextGroup
          state={form.lastName}
          label={"Last Name"}
          placeHolder={"Last Name"}
          setState={(v) => onChangeValue("lastName", v)}
          warning={warning.lastName}
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
        <label htmlFor={"bloodType"}>Blood Type</label>
        <Dropdown
          value={form.bloodType}
          onChange={(v) => onChangeValue("bloodType", v.value)}
          className={"register-dropdown p-inputtext-sm " + (warning.bloodType ? "p-invalid" : {})}
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
          placeholder="Select a bloodType"
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
