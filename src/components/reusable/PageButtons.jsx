import React from "react";
import { Image, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ButtonMeasurementStyle } from "@/components/reusable/ButtonStyle";
import backIcon from "@/assets/icon/measurement/back.svg";
import shareIcon from "@/assets/icon/measurement/shareIcon.svg";
import saveIcon from "@/assets/icon/measurement/saveIcon.svg";
import ckeckmarkIcon from "@/assets/icon/ckeckmarkIcon.svg";
import { shareData } from "@/utilities/share/Share";

const PageButtons = ({
  disable,
  dataName,
  texts,
  saved,
  setSaved,
  extraChartName = [],
  extraText = [],
}) => {
  return (
    <Row className="d-flex justify-content-between">
      <Col>
        <Button
          onClick={() => setSaved(1)}
          style={ButtonMeasurementStyle}
          className="d-flex justify-content-center"
          disabled = {disable}
        >
          {saved ? (
            <Image
              src={ckeckmarkIcon}
              alt="Image"
              width="16px"
              style={{ margin: "0em 0.6em" }}
            />
          ) : (
            <Image
              src={saveIcon}
              alt="Image"
              width="16px"
              style={{ margin: "0em 0.6em" }}
            />
          )}
          <span>Save</span>
        </Button>
      </Col>
      <Col>
        <Button
          onClick={() => shareData(dataName, texts, extraChartName, extraText)}
          style={ButtonMeasurementStyle}
          className="d-flex justify-content-center"
        >
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
        <Link
          to={process.env.REACT_APP_BASE_URL + "/measurement"}
          className="d-flex justify-content-center"
        >
          <Button
            style={ButtonMeasurementStyle}
            className="d-flex justify-content-center"
          >
            <Image
              src={backIcon}
              alt="Image"
              width="8px"
              style={{ margin: "0em 0.6em" }}
            />
            <span>Back</span>
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default PageButtons;
