export const BP = {
  store: "BPData",
  storeConfig: { keyPath: "dateAndId", autoIncrement: false },
  storeSchema: [
    { name: "userId", keypath: "userId", options: { unique: false } },
    { name: "SYS_DIA", keypath: "SYS_DIA", options: { unique: false } },
  ],
};
