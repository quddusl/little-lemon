export const dateToStr = (d) =>
  `${d.getFullYear()}-${d.getMonth() < 9 ? "0" : ""}${d.getMonth() + 1}-${
    d.getDate() < 10 ? "0" : ""
  }${d.getDate()}`;

export const addDate = (date, moreDays) =>
  new Date(new Date(date).setDate(date.getDate() + moreDays));

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
