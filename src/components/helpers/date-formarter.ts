import moment from "moment";

export const dateFormater = (date: Date | string, format: string): string => {
  const formatedDate =
    format === "US"
      ? moment(date, "MM-DD-YYYY").format("D MMMM YYYY")
      : moment(date, "DD-MM-YYYY").format("D MMMM YYYY");

  return formatedDate;
};
