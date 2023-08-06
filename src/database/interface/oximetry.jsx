export const oximetry = {
  store: "oximetryData",
  storeConfig: { keyPath: "dateAndId", autoIncrement: false },
  storeSchema: [
    { name: "userId", keypath: "userId", options: { unique: false } },
    {
      name: "heartBeatPPG",
      keypath: "heartBeatPPG",
      options: { unique: false },
    },
    { name: "SPO2", keypath: "SPO2", options: { unique: false } },
  ],
};
