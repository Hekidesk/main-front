import axios from "axios";
import Swal from "sweetalert2";
import {
  makeArrayForChart,
  makeArrayFormString,
  makeFilteredArray,
} from "@/components/reusableDataFunc/DataFunc";

function makePQRST(ps, qs, rs, ss, ts) {
  let newArr = [];
  for (const p of ps) newArr.push({ x: Number(p), color: "red" });
  for (const q of qs) newArr.push({ x: Number(q), color: "blue" });
  for (const r of rs) newArr.push({ x: Number(r), color: "black" });
  for (const s of ss) newArr.push({ x: Number(s), color: "white" });
  for (const t of ts) newArr.push({ x: Number(t), color: "orange" });
  return newArr;
}

export async function calculateBeatPerMinuteAPI(
  ecg,
  bluetooth,
  setResult,
  setFilteredArray,
  setDisable
) {
  let payload = {
    ECG: "[" + ecg?.toString() + "]",
    fs: bluetooth.GetFrequency()[0],
  };
  let res = await axios.post("/ECG_signal", payload).catch(() => {
    Swal.fire({
      icon: "error",
      title: "Something went wrong",
      text: "Please repeat procedure!",
      confirmButtonColor: "#3085d6",
    });
  });
  console.log(res)
  if(!Number(res?.data.Try_Again) && res?.status < 400) {
    console.log(res.data)
    console.log(res.data.hrv)
    setResult({
      ...res.data,
      heartBeat: Number(res.data.HeartRate),
      hrv: makeArrayFormString(res.data.hrv),
      ssTime: makeArrayFormString(res.data.ss_time),
      singleSpike: makeArrayFormString(res.data.single_spike),
      PQRST_ss: makeArrayFormString(res.data.PQRST_ss),
      ArrythmiaType: parseInt(res.data.arrhythmia_type_PQRST),
      ArrythmiaType2: parseInt(res.data.Pred_Label),
    });
    let dot = []
    // makePQRST(
    //   makeArrayFormString(res.data.P),
    //   makeArrayFormString(res.data.Q),
    //   makeArrayFormString(res.data.R),
    //   makeArrayFormString(res.data.S),
    //   makeArrayFormString(res.data.T)
    // );

    let filtered_signal = makeArrayFormString(res.data.ECG_filtered);
    setFilteredArray([
      makeFilteredArray(dot, filtered_signal),
      makeArrayForChart(ecg),
    ]);
    setDisable(0);
  } else {
    Swal.fire({
      icon: "error",
      title: "Something went wrong",
      text: "Please repeat procedure!",
      confirmButtonColor: "#3085d6",
    });
  }
}
