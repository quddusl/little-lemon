import {
  fetchAPISynchronous,
  submitAPISynchronous,
  fetchAPI,
  submitAPI,
  getAllSlots,
} from "./api";
import { addDate } from "./util";

const allSlots = getAllSlots();

it("shall provide some slots when queried - async", async () => {
  let slots;
  const today = new Date();
  const tomorrow = addDate(today, 1);
  const afterAWeek = addDate(today, 7);

  await fetchAPI(today).then((result) => (slots = result));
  expect(allSlots).toEqual(expect.arrayContaining(slots));
  expect(allSlots.length).toBeGreaterThan(slots.length);

  await fetchAPI(tomorrow).then((result) => (slots = result));
  expect(allSlots).toEqual(expect.arrayContaining(slots));
  expect(allSlots.length).not.toBeLessThan(slots.length);

  await fetchAPI(afterAWeek).then((result) => (slots = result));
  expect(allSlots).toEqual(expect.arrayContaining(slots));
  expect(allSlots.length).not.toBeLessThan(slots.length);

  slots = await fetchAPI(today);
  expect(allSlots).toEqual(expect.arrayContaining(slots));
  expect(allSlots.length).not.toBeLessThan(slots.length);
});

it("shall return status when bookings are submitted - async", async () => {
  let success = 0,
    failure = 0,
    status;
  // Make 50 bookings
  for (let i = 0; i < 50; i++) {
    undefined;
    status = await submitAPI({});
    expect(typeof status).toBe("boolean");
    if (status === true) {
      success++;
    } else if (status === false) {
      failure++;
    } else {
      throw new Error("Unexpected status!");
    }
  }
  expect(success).toEqual(50);
  expect(failure).toEqual(0);
}, 150000);

it("shall provide some slots when queried - synchronous", () => {
  let slots;
  const today = new Date();
  const tomorrow = addDate(today, 1);
  const afterAWeek = addDate(today, 7);

  slots = fetchAPISynchronous(today);
  expect(allSlots).toEqual(expect.arrayContaining(slots));
  expect(allSlots.length).toBeGreaterThan(slots.length);

  slots = fetchAPISynchronous(tomorrow);
  expect(allSlots).toEqual(expect.arrayContaining(slots));
  expect(allSlots.length).toBeGreaterThan(slots.length);

  slots = fetchAPISynchronous(afterAWeek);
  expect(allSlots).toEqual(expect.arrayContaining(slots));
  expect(allSlots.length).toBeGreaterThan(slots.length);

  slots = fetchAPISynchronous(today);
  expect(allSlots).toEqual(expect.arrayContaining(slots));
  expect(allSlots.length).toBeGreaterThan(slots.length);
});

it("shall return status when bookings are submitted - synchronous", () => {
  let success = 0,
    failure = 0,
    status;
  // Make 50 bookings
  for (let i = 0; i < 50; i++) {
    status = undefined;
    status = submitAPISynchronous({});
    expect(typeof status).toBe("boolean");
    if (status === true) {
      success++;
    } else if (status === false) {
      failure++;
    } else {
      throw new Error("Unexpected status!");
    }
  }
  expect(failure).toEqual(0);
  expect(success).toEqual(50);
});
