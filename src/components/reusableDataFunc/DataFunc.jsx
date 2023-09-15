export const makeArrayFormString = (arr) => {
    return arr.split(" ").map(function (item) {
      return Number(item);
    });
  }

export const makeArrayForChart = (arr) => {
    return arr.map((item, id) => {
      return {
        x: item?.id ?? id,
        y: item?.value ?? item,
      };
    })
  }

export const makeFilteredArray = (dots, filteredArray) => {
    let newFilteredArray = filteredArray.map((item, id) => {
        return {
          x: item?.id ?? id,
          y: item?.value ?? item,
        };
      });

    if (dots.length > 0) {
        newFilteredArray = newFilteredArray.map((item, e) => {
        for (const element of dots) {
          if (element['x'] === e) {item.markerColor = element['color'];
                                    item.markerSize = 10}                                    
        }
        return item;
      });
    }
    return newFilteredArray;
}