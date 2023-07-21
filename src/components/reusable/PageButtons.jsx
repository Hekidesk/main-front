import React from "react";
import { Row, Col } from "react-bootstrap";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { ButtonMeasurementStyle } from "HEKIDESK/components/reusable/ButtonStyle";
import backIcon from "HEKIDESK/assets/icon/measurement/back.svg";
import shareIcon from "HEKIDESK/assets/icon/measurement/shareIcon.svg";
import saveIcon from "HEKIDESK/assets/icon/measurement/saveIcon.svg";
import ckeckmarkIcon from "HEKIDESK/assets/icon/ckeckmarkIcon.svg";
import { shareData } from "HEKIDESK/utilities/share/Share";

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
          className="page-btn d-flex justify-content-center"
          disabled={disable}
        >
          {saved ? (
            <img
              src={ckeckmarkIcon}
              alt="Image"
              width="16px"
              style={{ margin: "0em 0.6em" }}
            />
          ) : (
            <img
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
          className="page-btn d-flex justify-content-center"
        >
          <img
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
          // eslint-disable-next-line no-undef
          to={process.env.REACT_APP_BASE_URL + "/measurement"}
          className="d-flex justify-content-center"
        >
          <Button
            style={ButtonMeasurementStyle}
            className="page-btn d-flex justify-content-center"
          >
            <img
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
