import { Row, Col } from "react-bootstrap";
import { Button } from "primereact/button";
import { ButtonMeasurementStyle } from "@/components/reusable/ButtonStyle";
import shareIcon from "@/assets/icon/measurement/BlackShareIcon.svg";
import saveIcon from "@/assets/icon/measurement/BlackSaveIcon.svg";
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
    <div style={{display: "flex", "justifyContent": "center", alignSelf: "end"}}>
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
    </div>
  );
};

export default PageButtons;
