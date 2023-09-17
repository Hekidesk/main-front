const initial_state = {
  heartBeat: "-?-",
  qualityIndex: "-",
  PR_RR_Interval: "-",
  QRS_Duration: "-",
  hrv: [],
  hrvVal: "-",
  ssTime: [],
  singleSpike: [],
  PQRST_ss: [],
  ArrythmiaType: -1,
  ArrythmiaType2: -1,
};

const pendingTime = 5000;
const delayTime = 30;

const COMMAND = 0x02;

const types = [
  "Normal",
  "Sinus Tachicardia",
  "Sinus Bradicardia",
  "Premature Atrial Contrature (PAC)",
  "Paroxysmal Atrial Tachycardia (PAT)",
  "Multifocul Atrial Tachycardia (MAT)",
];

const types2 = ["AF", "Normal"];

export { initial_state, pendingTime, delayTime, COMMAND, types, types2 };
