import { initializeTimes, Main } from "./Main";
import { BookingPage } from "../pages/BookingPage";
import { BrowserRouter } from "react-router-dom";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { dateToStr } from "./util";

const d = new Date();
const today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
const tomorrow = ((d) => new Date(new Date().setDate(d.getDate() + 1)))(
  new Date(today)
);

// Mock fetchAPI(), to get predictable results for testing
jest.mock("./api.js", () => ({
  ...jest.requireActual("./api"),
  fetchAPI: (day) => {
    if (!day instanceof Date) {
      return [];
    }
    day = new Date(day);
    const d = new Date();
    const today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const tomorrow = ((d) => new Date(new Date(d).setDate(d.getDate() + 1)))(
      new Date(today)
    );
    const dayMidnight = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate()
    );
    if (dayMidnight.getTime() < today.getTime()) {
      return Promise.resolve([]);
    } else if (dayMidnight.getTime() == today.getTime()) {
      return Promise.resolve(["17:00", "18:00"]);
    } else if (dayMidnight.getTime() == tomorrow.getTime()) {
      return Promise.resolve(["19:00", "20:00", "21:00", "22:00"]);
    }
    return Promise.resolve([
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
    ]);
  },
}));

it("(initializeTimes()) shall give a list of time slots for today", async () => {
  let slots = await initializeTimes();
  expect(slots.length).toBeGreaterThan(0);
  expect(slots).toEqual(["17:00", "18:00", "22:00"]);
});

it("(updateTimes()) shall update the list of time slots", async () => {
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <Main>
        <BookingPage />
      </Main>
    </BrowserRouter>
  );
  const dateEl = screen.getByLabelText("Booking date");

  await user.clear(dateEl);
  await waitFor(() => user.type(dateEl, dateToStr(tomorrow)));
  expect(screen.getByRole("option", { name: "19:00" }).selected).toBe(false);
  expect(screen.getByRole("option", { name: "20:00" }).selected).toBe(false);
  expect(screen.getByRole("option", { name: "20:00" }).selected).toBe(false);
  expect(screen.getByRole("option", { name: "22:00" }).selected).toBe(false);

  await user.clear(dateEl);
  await waitFor(() => user.type(dateEl, dateToStr(today)));
  expect(screen.getByRole("option", { name: "17:00" }).selected).toBe(false);
  expect(screen.getByRole("option", { name: "18:00" }).selected).toBe(false);
});
