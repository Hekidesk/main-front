// Third party
import { useIndexedDB } from "react-indexed-db";

// HEKIDESK
import { GetCurrentDateTimeDB } from "HEKIDESK/utilities/time";

export const useAddToDB = (DBName) => {
  const { update: updateParameterHistory } = useIndexedDB(DBName);
  const { getByID, update: updateTimeHistory } = useIndexedDB("time");

  const currentDate = GetCurrentDateTimeDB();
  const id = parseInt(String(currentDate + localStorage.getItem("id")));

  const updateHistory = (timeData) => {
    updateParameterHistory({
      dateAndId: id,
      userId: localStorage.getItem("id"),
      ...timeData,
    });

    var newParameter = timeData;
    getByID(id)
      .then((data) => {
        var newData = {};
        if (typeof data !== "undefined") newData = data.parameters;
        newParameter = { ...newData, ...timeData };
      })
      .then(() => {
        updateTimeHistory({
          dateAndId: id,
          userId: localStorage.getItem("id"),
          parameters: newParameter,
        });
      });
  };

  return {
    updateHistory,
  };
};
