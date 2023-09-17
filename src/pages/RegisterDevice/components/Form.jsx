import { Button } from "primereact/button";
import { ButtonStyle } from "@/components/reusable/ButtonStyle";
import { useState } from "react";
import { InputTextGroup } from "@/components/reusable/InputTextGroup";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "./CSS";
import { useIndexedDB } from "react-indexed-db";
import Swal from "sweetalert2";

const RegisterForm = () => {
  const [deviceNames] = useState({ name: "HekiDesk_v1.2", code: "123456" });

  const [form, setForm] = useState({
    serial: "",
  });
  const onChangeValue = (n, v) => setForm({ ...form, [n]: v });

  const history = useNavigate();
  const { add } = useIndexedDB("devices");

  const submitRegisteryCode = () => {
    if (Object.values(deviceNames).includes(form.serial)) {
      localStorage.setItem("device", deviceNames["name"]);
      add({ name: deviceNames["name"], serial: deviceNames["serial"] }).then(
        () => {
          history("/");
        },
        (error) => {
          console.log(error);
        }
      );
    } else
      Swal.fire({
        icon: "error",
        title: "This serial code is invalid",
        text: "Please enter the correct code!",
        confirmButtonColor: "#3085d6",
      });
  };

  return (
    <Container>
      <br />
      <InputTextGroup
        state={form.serial}
        placeHolder={"Serial number"}
        setState={(v) => onChangeValue("serial", v)}
        label={"Serial number"}
      />

      <Row>
        <Col>
          <Button style={ButtonStyle} onClick={() => history(-1)}>
            back
          </Button>
        </Col>
        <Col>
          <Button
            disabled={form.serial < 100000}
            style={ButtonStyle}
            onClick={submitRegisteryCode}
          >
            Continue {">"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
