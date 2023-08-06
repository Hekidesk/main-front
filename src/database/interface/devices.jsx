export const devices = {
  store: "devices",
  storeConfig: { keypath: "id", autoIncrement: true },
  storeSchema: [
    { name: "name", keypath: "name", options: { unique: true } },
    { name: "serial", keypath: "serial", options: { unique: false } },
  ],
};
