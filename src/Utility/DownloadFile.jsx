import { jsPDF } from "jspdf";

export function prepareURLFile(texts, extraChart = [], extraText = []) {
  const oldCanvas = document.querySelector('#chartContainer canvas')
  const newCanvas = document.createElement('canvas');
  const context = newCanvas.getContext('2d');
  
  //set dimensions
  newCanvas.width = oldCanvas.width;
  newCanvas.height = (oldCanvas.height + 200)*(extraChart.length+1);
  context.fillStyle = "white";
  context.fillRect(0, 0, newCanvas.width, newCanvas.height);
  context.drawImage(oldCanvas, 0, 0);
  let yPosition = 50;
  texts.map((text) => {
    context.fillStyle = "black";
    context.font = "25px Comic Sans MS";
    context.fillText(text, 50, oldCanvas.height + yPosition);
    yPosition += 50;
  });

  extraChart.forEach((chart, i) => {
    const oldChart = document.querySelector(chart)
    context.drawImage(oldChart, 0, (oldCanvas.height + 200)*(i+1));
    const yPosition = 150;
    extraText[i].map((text) => {
      context.fillStyle = "black";
      context.font = "25px Comic Sans MS";
      context.fillText(text, 50, (oldCanvas.height + 200)*(i+2) - yPosition);
    });
  })

  const dataURL = newCanvas.toDataURL("image/jpeg", 1.0);
  return dataURL;
}

function downloadImage(data, filename = 'untitled.jpeg') {
  const a = document.createElement('a');
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}

export function downloadSVGAsPNG(e, dataKey, texts) {
  const dataURL = prepareURLFile(texts); 
  const fileName = dataKey + ".png";
  downloadImage(dataURL, fileName);
}

export function downloadPDFAsPNG(e, dataKey, texts) {
  const dataURL = prepareURLFile(texts); 
  const fileName = dataKey + ".pdf";
  const doc = new jsPDF();
  doc.addImage(dataURL, "png", 0, 10, 200, 100).save(fileName);
}
