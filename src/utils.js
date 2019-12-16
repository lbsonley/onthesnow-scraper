export const inToCm = inches => inches * 2.54;

export const getTimezoneAdjustedDate = date => {
  const unadjustedDate = new Date(
    +date.year,
    getMonthIndex(date.month),
    +date.dayNum
  );
  return new Date(
    unadjustedDate.getTime() +
      Math.abs(unadjustedDate.getTimezoneOffset() * 60000)
  );
};

export const getMonthIndex = monthString => {
  switch (monthString) {
    case "Jan":
      return 0;
    case "Feb":
      return 1;
    case "Mar":
      return 2;
    case "Apr":
      return 3;
    case "May":
      return 4;
    case "Jun":
      return 5;
    case "Jul":
      return 6;
    case "Aug":
      return 7;
    case "Sep":
      return 8;
    case "Oct":
      return 9;
    case "Nov":
      return 10;
    case "Dec":
      return 11;
    default:
      return;
  }
};
