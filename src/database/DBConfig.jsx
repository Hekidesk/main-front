import { BP } from "./interface/BP";
import { PCG } from "./interface/PCG";
import { cardiogram } from "./interface/cardiogram";
import { devices } from "./interface/devices";
import { oximetry } from "./interface/oximetry";
import { temperature } from "./interface/temperature";
import { time } from "./interface/time";
import { users } from "./interface/users";

export const DBConfig = {
  name: "hekidesk",
  version: 8,
  objectStoresMeta: [
    users,
    devices,
    time,
    PCG,
    cardiogram,
    oximetry,
    BP,
    temperature,
  ],
};
