// import * as CanvasJS from "@canvasjs/charts";
import {  DiagramWrapper } from "./CSS";

import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Diagram = ({ data, sizeOfSlice = -1, maximumNum = -1 }) => {

  const options = {
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
        minimum: sizeOfSlice > 0 && data ? (data.length - sizeOfSlice > 0 ? data.length - sizeOfSlice : 0) : null,
        maximum: sizeOfSlice > 0 && data && maximumNum < 0 ? (data.length < sizeOfSlice ? sizeOfSlice : data.length) : maximumNum > 0 ? maximumNum: null,
         labelFormatter: function () {
          return "";
        },
      },
      axisY: {
        lineThickness: 0,
        // interval: 50,
        tickLength: 0,
        gridColor: "#1CB5BDb1",
        gridThickness: 0.5,
        labelFormatter: function () {
          return "";
        },
      },
      animationDuration: 500,
      data: [
        {
          type: "line",
          color: "#1CB5BD",
          // dataPoints: data,
          dataPoints:
          data && sizeOfSlice > 0 && data.length - sizeOfSlice > 0 ? data.slice(data.length - sizeOfSlice) : data,
          markerSize: 0,
          lineThickness: 2,
        },
      ],
  };

  return (
    <div style={DiagramWrapper}>
      <div id = "chartContainer">
        <CanvasJSChart options={options} style={{height: "200px"}}/>
      </div>
      <div
        style={{
          width: "8em",
          position: "absolute",
          bottom: "22px",
          height: "16px",
          background: "#C8E7F1",
        }}
      >
        <span style={{ color: "white" }}>.</span>{" "}
      </div>
    </div>
  );
};

export default Diagram;
