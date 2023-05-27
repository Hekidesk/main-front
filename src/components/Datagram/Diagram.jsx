import React, { useEffect } from "react";
import * as CanvasJS from "@canvasjs/charts";
import { DiagramS, DiagramWrapper } from "./CSS";

const Diagram = ({ data }) => {
  useEffect(() => {
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      zoomEnabled: true,
      backgroundColor: "#C8E7F1",
      toolTip: {
        animationEnabled: true,
      },
      axisX: {
        lineThickness: 0,
        tickLength: 0,
        gridColor: "#1CB5BDb1",
        gridThickness: 1,
        ticksLimit: 2,
        labelFormatter: function () {
          return "";
        },
      },
      axisY: {
        lineThickness: 0,
        interval: 300,
        tickLength: 0,
        gridColor: "#1CB5BDb1",
        gridThickness: 1,
        labelFormatter: function () {
          return "";
        },
      },
      animationDuration: 500,
      data: [
        {
          type: "line",
          color: "#1CB5BD",
          dataPoints: data,
          markerSize: 0,
          lineThickness: 5,
        },
      ],
    });
    chart.render();
  }, [data]);

  return (
    <div style={DiagramWrapper}>
      <div id="chartContainer" style={DiagramS}></div>
      <div
        style={{
          background: "#C8E7F1",
          heigth: "2em",
          width: "8em",
          position: "absolute",
          bottom: "1px",
        }}
      >
        <span style={{ color: "white" }}>.</span>{" "}
      </div>
    </div>
  );
};

export default Diagram;
