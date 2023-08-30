import Icon from "@/assets/logo/hekidesk-green.svg";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { ButtonStyle } from "@/components/reusable/ButtonStyle";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextGroup } from "@/components/reusable/InputTextGroup";
import { ContainerWithoutHeight } from "@/components/reusable/Container";
import { useNavigate } from "react-router-dom";
import { Col, LogoRow, Row, Title } from "./CSS";
import { useIndexedDB } from "react-indexed-db";
import { Calendar } from "primereact/calendar";
// import "../../../assets/styles/measurement.css";

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: "",
    dateOfBirth: "",
    weight: "",
    height: "",
    gender: 0,
  });
  console.log("🚀 ~ file: Form.jsx:23 ~ RegisterForm ~ form:", form);
  const onChangeValue = (n, v) => setForm({ ...form, [n]: v });

  const history = useNavigate();

  const { add } = useIndexedDB("users");
  const [warning, setWarning] = useState(false);

  // todo --> done
  // add register user
  function addUser() {
    console.log(form.username)
    if(!form.username){
      setWarning(true);
      return;
    }
    localStorage.setItem("user", form.username);
    add({ ...form }).then(
      (event) => {
        console.log("Data added: ", event);
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
        warning = {warning}
        necessary = {true}
      />
      <div style = {{textAlign: "left" }}>{warning && <div style = {{color : "red", fontSize: "12px", float: "left" }}> Name connot be empty </div>}</div>
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
        />
      </div>
      <InputTextGroup
        state={form.weight}
        label={"Weight"}
        placeHolder={"Weight (kg)"}
        setState={(v) => onChangeValue("weight", v)}
      />
      <InputTextGroup
        state={form.height}
        label={"Height"}
        placeHolder={"Height (cm)"}
        setState={(v) => onChangeValue("height", v)}
      />
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
          className="register-dropdown"
          options={[
            { name: "Male", value: 1 },
            { name: "Female", value: 0 },
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
