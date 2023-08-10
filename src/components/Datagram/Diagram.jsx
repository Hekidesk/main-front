// import * as CanvasJS from "@canvasjs/charts";
import {  DiagramWrapper } from "./CSS";

import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Diagram = ({ data, sizeOfSlice = -1, maximumNum = -1, type = "" }) => {

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
        minimum: sizeOfSlice > 0 && data ? (data.length - sizeOfSlice > 0 ? data.length - sizeOfSlice : 0) : 0,
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
        {
          type: "line",
          dataPoints: type == "force" ? [
            { x: 110, y: 2 },
            { x: 2500, y: 13 },
          ] : [],
          color: "#1CB5BD"
        },
        {
          type: "line",
          dataPoints: type == "force" ? [
            { x: 110, y: 0.9 },
            { x: 2800, y: 10.7 },
          ] : [],
          color:"#1CB5BD"
        }
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
