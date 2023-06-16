import React, { useEffect } from "react";
// import * as CanvasJS from "@canvasjs/charts";
import { DiagramS, DiagramWrapper } from "./CSS";

import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Diagram = ({ data, sizeOfSlice = -1 }) => {
  // useEffect(() => {
  //   console.log(document.getElementById("chartContainer"))
  //   const chart = new CanvasJS.Chart("chartContainer", {
  //     animationEnabled: true,
  //     zoomEnabled: true,
  //     backgroundColor: "#C8E7F1",
  //     toolTip: {
  //       animationEnabled: true,
  //     },
  //     axisX: {
  //       lineThickness: 0,
  //       tickLength: 0,
  //       gridColor: "#1CB5BDb1",
  //       gridThickness: 1,
  //       ticksLimit: 2,
  //       minimum: 0,
  //       maximum: 200,
  //       labelFormatter: function () {
  //         return "";
  //       },
  //     },
  //     axisY: {
  //       lineThickness: 0,
  //       interval: 300,
  //       tickLength: 0,
  //       gridColor: "#1CB5BDb1",
  //       gridThickness: 1,
  //       labelFormatter: function () {
  //         return "";
  //       },
  //     },
  //     animationDuration: 500,
  //     data: [
  //       {
  //         type: "line",
  //         color: "#1CB5BD",
  //         dataPoints: data,
  //         // dataPoints:
  //         //   sizeOfSlice > 0 ? data.slice(data.length - sizeOfSlice) : data,
  //         markerSize: 0,
  //         lineThickness: 5,
  //       },
  //     ],
  //   });
  //   chart.render();
  //   console.log("here ham miay?")
  // }, [data]);

  
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
        minimum: 0,
        maximum: 1500,
         labelFormatter: function () {
          return "";
        },
      },
      axisY: {
        lineThickness: 0,
        interval: 50,
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
          dataPoints: data,
          // dataPoints:
          //   sizeOfSlice > 0 ? data.slice(data.length - sizeOfSlice) : data,
          markerSize: 0,
          lineThickness: 2,
        },
      ],
  };

  return (
    <div style={DiagramWrapper}>
      {/* <div id="chartContainer" style={DiagramS}></div> */}
      {/* {console.log("hi: " + JSON.stringify(data))} */}
      <CanvasJSChart id = "chartContainer" options={options} style={{height: "200px"}}/>
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
