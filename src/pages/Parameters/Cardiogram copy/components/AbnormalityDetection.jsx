import React from "react";
import CanvasJSReact from "@/components/Datagram/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import {
  HrvContainer,
  SingleSpikeContainer,
  CircularPhoto,
  DiagramText,
} from "./CSS";
import hrvIcon from "@/assets/icon/parameter/hrv.svg";
import singleSpikeIcon from "@/assets/icon/parameter/singleSpike.svg";

function AbnormalityDetection({
  heartBeat,
  hrv,
  hrvVal,
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
      backgroundColor: "#E8F0F4",
      height: 210,
      toolTip: {
        animationEnabled: true,
      },
      axisY: {
        lineThickness: 0,
        tickLength: 0,
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
        labelFormatter: function () {
          return "";
        },
      },
      animationDuration: 500,
      dataPointWidth: 2,
      data: [
        {
          type: data === "hrv" ? "rangeColumn" : "line",
          lineColor: "#838383",
          color: "#838383",
          lineThickness: 0,
          dataPoints:
            data === "hrv" ? [...getHrvSteam()] : getSingleSpikeSteam(),
        },
      ],
    };
  }

  return (
    <div style={{ marginTop: "2rem", marginLeft: "0.1em", display: "flex" }}>
      <HrvContainer id="chartContainerAbnormality2">
        <DiagramText>
          <CircularPhoto>
            {" "}
            <img src={hrvIcon} />{" "}
          </CircularPhoto>
          HRV
          <CircularPhoto style={{float: "right"}}>
              {hrvVal}
          </CircularPhoto>
        </DiagramText>
        <CanvasJSChart options={getOptions("hrv")} />
        <div
          style={{
            width: "8em",
            position: "absolute",
            bottom: "10px",
            height: "16px",
            background: "#E8F0F4",
          }}
        >
          <span style={{ color: "white" }}>.</span>{" "}
        </div>
      </HrvContainer>
      <SingleSpikeContainer id="chartContainerAbnormality1">
        <DiagramText>
          <CircularPhoto>
            {" "}
            <img src={singleSpikeIcon} />{" "}
          </CircularPhoto>
          Single Spike
        </DiagramText>
        <CanvasJSChart options={getOptions("singleSpike")} />
        <div
          style={{
            width: "8em",
            position: "absolute",
            bottom: "10px",
            height: "16px",
            background: "#E8F0F4",
          }}
        >
          <span style={{ color: "white" }}>.</span>{" "}
        </div>
      </SingleSpikeContainer>
    </div>
  );
}

export default AbnormalityDetection;
