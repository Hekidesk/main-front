// import { jsPDF } from "jspdf";
import {
  GetCurrentDateTimeForFileName,
} from "../time/time";

export function prepareURLFile(texts, extraChart = [], extraText = []) {
  var oldCanvas = document.querySelector("#chartContainer canvas");
  var newCanvas = document.createElement("canvas");
  var context = newCanvas.getContext("2d");

  //set dimensions
  newCanvas.width = oldCanvas.width + 60;
  newCanvas.height = (oldCanvas.height + 200) * (extraChart.length + 1);
  context.fillStyle = "white";
  context.fillRect(0, 0, newCanvas.width, newCanvas.height);
  context.drawImage(oldCanvas, 30, 30);
  var yPosition = 60;
  texts.map((text) => {
    context.fillStyle = "black";
    context.font = "25px Comic Sans MS";
    context.fillText(text, 50, oldCanvas.height + yPosition);
    yPosition += 50;
  });

  extraChart.map((chart, i) => {
    var oldChart = document.querySelector(chart);
    context.drawImage(oldChart, 30, (oldCanvas.height + 200) * (i + 1));
    var yPosition = 150;
    extraText[i].map((text) => {
      context.fillStyle = "black";
      context.font = "25px Comic Sans MS";
      context.fillText(
        text,
        50,
        (oldCanvas.height + 200) * (i + 2) - yPosition
      );
      yPosition -= 50;
    });
  });

  var dataURL = newCanvas.toDataURL("image/jpeg", 1.0);
  return dataURL;
}

function downloadImage(data, filename = "untitled.jpeg") {
  var a = document.createElement("a");
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}

export function downloadSVGAsPNG(dataKey, texts, extraChart = [], extraText = []) {
  var dataURL = prepareURLFile(texts, extraChart, extraText);
  const showTime = GetCurrentDateTimeForFileName();
  const fileName = showTime + "-" + dataKey + ".png";
  downloadImage(dataURL, fileName);
}

// export function downloadPDFAsPNG(e, dataKey, texts) {
  // var dataURL = prepareURLFile(texts);
  // const fileName = dataKey + ".pdf";
  // const doc = new jsPDF();
  // doc.addImage(dataURL, "png", 0, 10, 200, 100).save(fileName);
// }
