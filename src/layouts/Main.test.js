import { render, screen } from "@testing-library/react";
import { initializeTimes, updateTimes, allSlots } from "./Main";

it("shall return the same state as its input", () => {
  const initState = ["17:00"];
  const newState = updateTimes(initState, new Date());
  expect(newState).toBe(initState);
  const initState2 = ["17:00", "18:00"];
  const newState2 = updateTimes(initState2, new Date());
  expect(newState2).toBe(initState2);
});

it("shall return the expected initial time slots", () => {
  const initSlots = initializeTimes(new Date());
  expect(initSlots).toBe(allSlots);
});
