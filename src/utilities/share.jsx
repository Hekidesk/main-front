import {
  GetCurrentDateTime,
  GetCurrentDateTimeForFileName,
} from "./time";
import { prepareURLFile } from "./downloadFile";


export async function shareData(dataName, texts, extraChartName = [], extraText = []) {
  const showTime1 = GetCurrentDateTime();
  const showTime2 = GetCurrentDateTimeForFileName();

  var dataURL = prepareURLFile(texts, extraChartName, extraText);
  const fileName = showTime2 + "-" + dataName + ".png";
  const file = await (await fetch(dataURL)).blob();
  const image = new File([file], fileName, { type: file.type });
  if (navigator.canShare && navigator.canShare({ files: [image] })) {
    try {
      await navigator.share({
        files: [image],
        title: showTime1 + " " + dataName,
      });
    } catch (error) {
      console.log("Sharing failed!", error);
    }
  } else
    console.log("This device does not support sharing files.");

}
