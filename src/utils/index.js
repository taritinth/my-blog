const getDateText = (date) => {
  if (date) {
    date = new Date(date);
    let options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleString("en-US", options);
  } else {
    return "Invalid Date";
  }
};

export { getDateText };
