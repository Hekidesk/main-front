import { Row, Col } from "react-bootstrap";
import { AbnormalityDiagramTitleContainer } from "./components/CSS";
import * as CanvasJS from "@canvasjs/charts";
import React, { useEffect } from "react";
import { DiagramWrapper } from "../../../components/Datagram/CSS";

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
      backgroundColor: "#C8E7F1",// hex
      position: "relative",
      toolTip: {
        animationEnabled: true,
      },
      axisY: {
        lineThickness: 0,
        tickLength: 0,
        gridColor: "#1CB5BDb1",// hex
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
        gridColor: "#1CB5BDb1",// hex
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
          lineColor: "#1CB5BD",// hex
          color: "#1CB5BD",// hex
          lineThickness: 0,
          dataPoints:
            data === "hrv" ? [...getHrvSteam()] : getSingleSpikeSteam(),
        },
      ],
    };
  }
  useEffect(() => {
    const chart1 = new CanvasJS.Chart("chartContainer1", getOptions("hrv"));
    chart1.render();
    const chart2 = new CanvasJS.Chart(
      "chartContainer2",
      getOptions("singleSpike")
    );
    chart2.render();
  }, []);

  return (
    <div>
      <Row
        style={{
          backgroundColor: "#A5C2CB",// hex
          width: "100%",
          marginLeft: "0.1px",
          position: "relative",
        }}
      >
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
        <Col style={DiagramWrapper} id="chartContainerAbnormality1">
          <div id="chartContainer1"></div>
          <div
            style={{
              width: "8em",
              position: "absolute",
              bottom: "25px",
              height: "16px",
              background: "#C8E7F1",// hex
            }} // hex
          >
            <span style={{ color: "white" }}> </span>
          </div>
        </Col>
        <Col style={DiagramWrapper} id="chartContainerAbnormality2">
          <div id="chartContainer2"></div>
          <div
            style={{
              width: "8em",
              bottom: "25px",
              height: "16px",
              position: "absolute",
              background: "#C8E7F1", // hex
            }}
          >
            <span style={{ color: "white" }}> </span>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AbnormalityDetection;
