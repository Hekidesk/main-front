export const cardiogram = {
  store: "cardiogramData",
  storeConfig: { keyPath: "dateAndId", autoIncrement: false },
  storeSchema: [
    { name: "userId", keypath: "userId", options: { unique: false } },
    {
      name: "heartBeatECG",
      keypath: "heartBeatECG",
      options: { unique: false },
    },
    {
      name: "PR_RR_Interval",
      keypath: "PRRRInterval",
      options: { unique: false },
    },
    {
      name: "QRS_Duration",
      keypath: "QRSDuration",
      options: { unique: false },
    },
  ],
};
