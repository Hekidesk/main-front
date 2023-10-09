export function showClock(value) {
  var canvas = document.getElementById("timer");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var angle;
  var percent = Math.min(canvas.width, canvas.height) * 0.35;

  drawClock();

  function drawClock() {
    drawHourMarks();

    drawHourText();
  }

  function drawHourMarks() {
    for (var i = 0; i < 24; i++) {
      angle = (i * (Math.PI * 2)) / 24;
      ctx.lineWidth = percent * 0.02;

      var x1 = canvas.width / 2 + Math.cos(angle) * percent;
      var y1 = canvas.height / 2 + Math.sin(angle) * percent;
      var x2 = canvas.width / 2 + Math.cos(angle) * (percent - percent / 10);
      var y2 = canvas.height / 2 + Math.sin(angle) * (percent - percent / 10);

      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);

      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
    }
  }

  function drawHourText() {
    for (var i = 0; i < 12; i++) {
      angle = (i * (-Math.PI * 2)) / 12;
      var hour = (i + 7) % 12;
      hour = hour == 0 ? 65 : hour * 5 + 5;

      var xt = canvas.width / 2 + Math.cos(angle) * percent * 1.13;
      var yt = canvas.height / 2 + Math.sin(angle) * percent * 1.13;

      drawRotatedText(xt, yt, (value * Math.PI) / 180, hour); // todo - rotate numbers
    }
  }

  function drawRotatedText(endingX, centerY, radianAngle, text) {
    ctx.save();
    ctx.font = "bold 22px inherit";
    ctx.fillStyle = "white";
    var width = ctx.measureText(text).width;
    ctx.translate(endingX, centerY);
    ctx.rotate(radianAngle);
    ctx.fillText(text, -width, 0);
    ctx.restore();
  }
}
