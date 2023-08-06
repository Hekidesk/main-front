export const time = {
  store: "time",
  storeConfig: { keyPath: "dateAndId", autoIncrement: false },
  storeSchema: [
    {
      name: "parameters",
      keypath: "parameters",
      options: { unique: false },
    },
  ],
};
