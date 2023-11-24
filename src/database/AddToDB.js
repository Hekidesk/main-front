import { useIndexedDB } from "react-indexed-db";

import { GetCurrentDateTimeDB } from "@/utilities/time/time";

export const useAddToDB = (DBName) => {
  const { update: updateParameterHistory } = useIndexedDB(DBName);
  const { getByID, update: updateTimeHistory } = useIndexedDB("time");

  const currentDate = GetCurrentDateTimeDB();
  const id = parseInt(String(currentDate + localStorage.getItem("account-id")));

  const updateHistory = (timeData) => {
    updateParameterHistory({
      dateAndId: id,
      userId: localStorage.getItem("account-id"),
      ...timeData,
    }).then(
      (event) => {
        console.log(DBName + " updated: ", event);
      },
      (error) => {
        console.log(error);
      }
    );

    var newParameter = timeData;
    getByID(id)
      .then((data) => {
        var newData = {};
        if (typeof data !== 'undefined')
          newData = data.parameters;
          newParameter = { ...newData, ...timeData };
      })
      .then(() => {
        updateTimeHistory({
          dateAndId: id,
          userId: localStorage.getItem("account-id"),
          parameters: newParameter,
        }).then(
          (event) => {
            console.log("timeData updated: ", event);
          },
          (error) => {
            console.log(error);
          }
        );
      });
  };

  return {
    updateHistory,
  };
};
