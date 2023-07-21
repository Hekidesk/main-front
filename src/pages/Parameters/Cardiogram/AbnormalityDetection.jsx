import React from "react";
import { Row, Col } from "react-bootstrap";
import CanvasJSReact from "@/components/Datagram/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import { AbnormalityDiagramTitleContainer } from "./components/CSS";

function AbnormalityDetection({
  heartBeat,
  hrv,
  ssTime,
  singleSpike,
  PQRST_ss,
}) {
  const getHrvSteam = () => {
    let steam = [...hrv].map((item, id) => {
      return {
        label: item?.id ?? id,
        y: heartBeat < item ? [heartBeat, item] : [item, heartBeat],
      };
    });
    return steam;
  };

  const getSingleSpikeSteam = () => {
    let steam = [...singleSpike].map((item, id) => {
      return {
        x: item?.id ?? ssTime[id],
        y: item?.value ?? item,
      };
    });
    if (PQRST_ss.length > 0) {
      let i = 0;
      let color = ["red", "blue", "black", "white", "orange"];
      steam = steam.map((item, e) => {
        if (Number(PQRST_ss[i]) === Number(e)) {
          item.markerColor = color[i];
          i++;
          item.markerSize = 10;
        } else {
          item.markerSize = 1;
        }
        return item;
      });
    }
    return steam;
  };

  function getOptions(data) {
    return {
      animationEnabled: true,
      zoomEnabled: true,
      backgroundColor: "#C8E7F1",
      toolTip: {
        animationEnabled: true,
      },
      axisY: {
        lineThickness: 0,
        tickLength: 0,
        gridColor: "#1CB5BDb1",
        gridThickness: 0,
        labelFormatter: function () {
          return "";
        },
        stripLines: [
          {
            startValue: heartBeat,
            endValue: heartBeat + 0.08,
            lineDashType: "dot",
            color: "black",
          },
        ],
      },
      axisX: {
        lineThickness: 0,
        tickLength: 0,
        gridColor: "#1CB5BDb1",
        gridThickness: 0,
        labelFormatter: function () {
          return "";
        },
      },
      animationDuration: 500,
      dataPointWidth: 2,
      data: [
        {
          type: data === "hrv" ? "rangeColumn" : "line",
          lineColor: "#1CB5BD",
          color: "#1CB5BD",
          lineThickness: 0,
          dataPoints:
            data === "hrv" ? [...getHrvSteam()] : getSingleSpikeSteam(),
        },
      ],
    };
  }

  return (
    <div>
      <Row style={{backgroundColor: "#A5C2CB", width: "100%", marginLeft: "0.1px"}}>
        <Col>
          <AbnormalityDiagramTitleContainer>
            HRV
          </AbnormalityDiagramTitleContainer>
        </Col>
        <Col>
          <AbnormalityDiagramTitleContainer>
            Single Spike
          </AbnormalityDiagramTitleContainer>
        </Col>
      </Row>
      <Row>
        <Col
          style={{ marginRight: "50px", position: "relative" }}
          id="chartContainerAbnormality1"
        >
          <CanvasJSChart options={getOptions("hrv")} />
          <div
            style={{
              width: "8em",
              position: "absolute",
              bottom: "2px",
              height: "16px",
              background: "#C8E7F1",
            }}
          >
            <span style={{ color: "white" }}>.</span>{" "}
          </div>
        </Col>
        <Col
          style={{ marginLeft: "50px", position: "relative" }}
          id="chartContainerAbnormality2"
        >
          <CanvasJSChart options={getOptions("singleSpike")} />
          <div
            style={{
              width: "8em",
              position: "absolute",
              bottom: "2px",
              height: "16px",
              background: "#C8E7F1",
            }}
          >
            <span style={{ color: "white" }}>.</span>{" "}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AbnormalityDetection;
