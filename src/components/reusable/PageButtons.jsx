import { Row, Col } from "react-bootstrap";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { ButtonMeasurementStyle } from "@/components/reusable/ButtonStyle";
import backIcon from "@/assets/icon/measurement/back.svg";
import shareIcon from "@/assets/icon/measurement/shareIcon.svg";
import saveIcon from "@/assets/icon/measurement/saveIcon.svg";
import ckeckmarkIcon from "@/assets/icon/ckeckmarkIcon.svg";
import { downloadSVGAsPNG } from "@/utilities/share/downloadFile";
import { useState } from "react";

const PageButtons = ({
  disable,
  dataName,
  texts,
  onClick,
  extraChartName = [],
  extraText = [],
}) => {
  const [save, setSave] = useState(false);
  return (
    <Row className="d-flex justify-content-between">
      <Col>
        <Button
          onClick={() => {
            onClick(1);
            setSave(true);
          }}
          style={ButtonMeasurementStyle}
          className="page-btn d-flex justify-content-center"
          disabled={disable}
        >
          {save ? (
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
          onClick={() =>
            downloadSVGAsPNG(dataName, texts, extraChartName, extraText)
          }
          style={ButtonMeasurementStyle}
          disabled={disable}
          className="page-btn d-flex justify-content-center"
        >
          <img
            src={shareIcon}
            alt="Image"
            width="16px"
            style={{ margin: "0em 0.6em" }}
          />
          <span>Download</span>
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
