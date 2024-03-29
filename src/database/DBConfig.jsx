export const DBConfig = {
  name: "hekidesk",
  version: 8,
  objectStoresMeta: [
    {
      store: "users",
      storeConfig: { keypath: "id", autoIncrement: true },
      storeSchema: [
        { name: "username", keypath: "username", options: { unique: true } },
        { name: "dateOfBirth", keypath: "dateOfBirth", options: { unique: false }},
        { name: "weight", keypath: "weight", options: { unique: false } },
        { name: "height", keypath: "height", options: { unique: false } },
        { name: "gender", keypath: "gender", options: { unique: false } },
      ],
    },
    {
      store: "devices",
      storeConfig: { keypath: "id", autoIncrement: true },
      storeSchema: [
        { name: "name", keypath: "name", options: { unique: true } },
        { name: "serial", keypath: "serial", options: { unique: false } },
      ],
    },
    {
      store: "time",
      storeConfig: { keyPath: "dateAndId", autoIncrement: false},
      storeSchema: [
        { name: "parameters", keypath: "parameters", options: { unique: false } },
      ],
    },
    {
      store: "PCGData",
      storeConfig: { keyPath: "dateAndId", autoIncrement: false },
      storeSchema: [
        { name: "userId", keypath: "userId", options: { unique: false } },
        { name: "heartBeatSound", keypath: "heartBeatSound", options: { unique: false } },
        { name: "respirationRate", keypath: "respirationRate", options: { unique: false } },
      ],
    },
    {
      store: "cardiogramData",
      storeConfig: { keyPath: "dateAndId", autoIncrement: false },
      storeSchema: [
        { name: "userId", keypath: "userId", options: { unique: false } },
        { name: "heartBeatECG", keypath: "heartBeatECG", options: { unique: false } },
        { name: "PR_RR_Interval", keypath: "PRRRInterval", options: { unique: false } },
        { name: "QRS_Duration", keypath: "QRSDuration", options: { unique: false } }
      ],
    },
    {
      store: "oximetryData",
      storeConfig: { keyPath: "dateAndId", autoIncrement: false },
      storeSchema: [
        { name: "userId", keypath: "userId", options: { unique: false } },
        { name: "heartBeatPPG", keypath: "heartBeatPPG", options: { unique: false } },
        { name: "SPO2", keypath: "SPO2", options: { unique: false } },
      ],
    },
    {
      store: "BPData",
      storeConfig: { keyPath: "dateAndId", autoIncrement: false },
      storeSchema: [
        { name: "userId", keypath: "userId", options: { unique: false } },
        { name: "SYS_DIA", keypath: "SYS_DIA", options: { unique: false } },
      ],
    },
    {
      store: "TemperatureData",
      storeConfig: { keyPath: "dateAndId", autoIncrement: false },
      storeSchema: [
        { name: "userId", keypath: "userId", options: { unique: false } },
        { name: "temperature", keypath: "temperature", options: { unique: false } },
      ],
    }
  ],
};
