import React from 'react'
import { Image, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {ButtonMeasurementStyle, ButtonBackStyle} from "@/components/reusable/ButtonStyle";
import backIcon from "@/assets/icon/measurement/back.svg";
import shareIcon from "@/assets/icon/measurement/shareIcon.svg";
import saveIcon from "@/assets/icon/measurement/saveIcon.svg";

const PageButtons = () =>  {
  
  return (
    <Row className="d-flex justify-content-between">
        <Col>
          <Link to="/measurement" style={ButtonBackStyle} className="d-flex justify-content-center">
            <Image
              src={saveIcon}
              alt="Image"
              width="16px"
              style={{ margin: "0em 0.6em" }}
            />
            <span>Save</span>
          </Link>
        </Col>
        <Col>
          <Button onClick={() => console.log("hi")} style={ButtonMeasurementStyle} className="d-flex justify-content-center">
            <Image
              src={shareIcon}
              alt="Image"
              width="16px"
              style={{ margin: "0em 0.6em" }}
            />
            <span>Share</span>
          </Button>
        </Col>
        <Col>
          <Link to="/measurement" style={ButtonMeasurementStyle} className="d-flex justify-content-center">
            <Image
              src={backIcon}
              alt="Image"
              width="8px"
              style={{ margin: "0em 0.6em" }}
            />
            <span>Back</span>
          </Link>
        </Col>
      </Row>
  )
}

export default PageButtons
