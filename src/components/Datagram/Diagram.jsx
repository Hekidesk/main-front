import React, { useEffect } from "react";
import * as CanvasJS from "@canvasjs/charts";
import { DiagramS, DiagramWrapper } from "./CSS";

const Diagram = ({ data, sizeOfSlice = -1 }) => {
  const options = {
    animationEnabled: true,
    zoomEnabled: true,
    backgroundColor: "#C8E7F1", // hex
    toolTip: {
      animationEnabled: true,
    },
    axisX: {
      lineThickness: 0,
      tickLength: 0,
      gridColor: "#1CB5BDb1", // hex
      gridThickness: 1,
      ticksLimit: 2,
      minimum:
        sizeOfSlice > 0 && data
          ? data.length - sizeOfSlice > 0
            ? data.length - sizeOfSlice
            : 0
          : null,
      maximum:
        sizeOfSlice > 0 && data
          ? data.length < sizeOfSlice
            ? sizeOfSlice
            : data.length
          : sizeOfSlice == -2
          ? 10
          : null,
      labelFormatter: function () {
        return "";
      },
    },
    axisY: {
      lineThickness: 0,
      tickLength: 0,
      gridColor: "#1CB5BDb1", // hex
      gridThickness: 0.5,
      labelFormatter: function () {
        return "";
      },
    },
    animationDuration: 500,
    data: [
      {
        type: "line",
        color: "#1CB5BD", // hex
        dataPoints:
          data && sizeOfSlice > 0 && data.length - sizeOfSlice > 0
            ? data.slice(data.length - sizeOfSlice)
            : data,
        markerSize: 0,
        lineThickness: 2,
      },
    ],
  };
  useEffect(() => {
    const chart = new CanvasJS.Chart("chartContainer", options);
    chart.render();
  }, [data]);

  return (
    <div style={DiagramWrapper}>
      <div id="chartContainer" style={DiagramS}></div>
      <div
        style={{
          background: "#C8E7F1", // hex
          heigth: "2em",
          width: "8em",
          position: "absolute",
          bottom: "1px",
        }}
      >
        <span style={{ color: "white" }}>.</span>
      </div>
    </div>
  );
};

export default Diagram;
