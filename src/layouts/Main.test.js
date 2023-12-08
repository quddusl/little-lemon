import { initializeTimes, updateTimes } from "./Main";

const d = new Date();
const today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
const tomorrow = new Date(new Date(today).setDate(d.getDate() + 1));

// Mock fetchAPI()
jest.mock("./api.js", () => ({
  ...jest.requireActual("./api"),
  fetchAPI: (day) => {
    const d = new Date();
    const today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const tomorrow = new Date(new Date(today).setDate(today.getDate() + 1));
    const dayMidnight = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate()
    );
    if (dayMidnight.getTime() < today.getTime()) {
      return [];
    } else if (dayMidnight.getTime() == today.getTime()) {
      return ["17:00", "18:00"];
    } else if (dayMidnight.getTime() == tomorrow.getTime()) {
      return ["19:00", "20:00", "21:00", "22:00"];
    }
    return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
  },
}));

it("(initializeTimes()) shall give a list of time slots for today", () => {
  let slots = initializeTimes();
  expect(slots.length).toBeGreaterThan(0);
  expect(slots).toEqual(["17:00", "18:00"]);
});

it("(updateTimes()) shall update the list of time slots", () => {
  let slots = updateTimes([], tomorrow);
  expect(slots.length).toBeGreaterThan(0);
  expect(slots).toEqual(["19:00", "20:00", "21:00", "22:00"]);

  slots = updateTimes(["19:00", "22:00"], today);
  expect(slots.length).toBeGreaterThan(0);
  expect(slots).toEqual(["17:00", "18:00"]);
});
