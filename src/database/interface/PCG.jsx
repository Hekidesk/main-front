export const PCG = {
  store: "PCGData",
  storeConfig: { keyPath: "dateAndId", autoIncrement: false },
  storeSchema: [
    { name: "userId", keypath: "userId", options: { unique: false } },
    {
      name: "heartBeatSound",
      keypath: "heartBeatSound",
      options: { unique: false },
    },
    {
      name: "respirationRate",
      keypath: "respirationRate",
      options: { unique: false },
    },
  ],
};
