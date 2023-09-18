// import * as CanvasJS from "@canvasjs/charts";
import {  DiagramWrapper } from "./CSS";

import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Diagram = ({ data, sizeOfSlice = -1, maximumNum = -1, type = "", avgTemp = null }) => {

  const options = {
      height: type == "force" || type == "ppg" ? 250 : null,
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
        tickLength: 2,
        gridColor: "#1CB5BDb1",
        gridThickness: 0.5,
        labelFontColor: "#1CB5BD",
        labelFormatter: type != "temperature" ? 
        function () {  
            return "";
        } : "",
        stripLines: type != "temperature" ? null : [
          {
            startValue: Number(avgTemp),
            endValue: Number(avgTemp) + 0.0001,
            lineDashType: "shortDash",
            label: "temperature",
            color: "black",
            labelBackgroundColor:"#1CB5BD",
            labelFontColor:"black",
          },
        ],
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
            { x: 4000, y: 19.9 },
          ] : [],
          color: "#13858B"
        },
        {
          type: "line",
          dataPoints: type == "force" ? [
            { x: 110, y: 0.9 },
            { x: 4000, y: 15.07 },
          ] : [],
          color:"#13858B"
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
          bottom: "2px",
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
