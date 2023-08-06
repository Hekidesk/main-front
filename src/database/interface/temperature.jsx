export const temperature = {
  store: "TemperatureData",
  storeConfig: { keyPath: "dateAndId", autoIncrement: false },
  storeSchema: [
    { name: "userId", keypath: "userId", options: { unique: false } },
    { name: "temperature", keypath: "temperature", options: { unique: false } },
  ],
};
