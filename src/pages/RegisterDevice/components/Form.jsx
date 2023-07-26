import { useState } from "react";

// Third party
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

// HEKIDESK
import {
  ButtonOutlineStyle,
  ButtonStyle,
} from "HEKIDESK/components/reusable/ButtonStyle";
import { InputTextGroup } from "HEKIDESK/components/reusable/InputTextGroup";

import { Col, Container, Row } from "./CSS";

const RegisterForm = () => {
  const [form, setForm] = useState({
    serial: "",
  });
  const onChangeValue = (n, v) => setForm({ ...form, [n]: v });

  const history = useNavigate();

  // todo
  // add information of device after confirmation
  const submitRegisteryCode = () => {
    // todo
    // implement registery
    history("/?is_valid=true"); // or false
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
          <Button style={ButtonOutlineStyle} onClick={() => history(-1)}>
            back
          </Button>
        </Col>
        <Col>
          <Button
            disabled={form.serial.length === 0}
            style={ButtonStyle}
            onClick={submitRegisteryCode}
          >
            {"Continue >"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
