import {
  fetchAPI,
  submitAPI,
  fetchAPIAsync,
  submitAPIAsync,
  getAllSlots,
} from "./api";
import { addDate } from "./util";

const allSlots = getAllSlots();

it("shall provide some slots when queried", () => {
  let slots;
  const today = new Date();
  const tomorrow = addDate(today, 1);
  const afterAWeek = addDate(today, 7);

  slots = fetchAPI(today);
  expect(allSlots).toEqual(expect.arrayContaining(slots));
  expect(allSlots.length).toBeGreaterThan(slots.length);

  slots = fetchAPI(tomorrow);
  expect(allSlots).toEqual(expect.arrayContaining(slots));
  expect(allSlots.length).toBeGreaterThan(slots.length);

  slots = fetchAPI(afterAWeek);
  expect(allSlots).toEqual(expect.arrayContaining(slots));
  expect(allSlots.length).toBeGreaterThan(slots.length);

  slots = fetchAPI(today);
  expect(allSlots).toEqual(expect.arrayContaining(slots));
  expect(allSlots.length).toBeGreaterThan(slots.length);
});

it("shall return status when booings are submitted", () => {
  let success = 0,
    failure = 0,
    status;
  // Make 20 bookings
  for (let i = 0; i < 20; i++) {
    status = undefined;
    status = submitAPI({});
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
  expect(success).toEqual(20);
});

it("shall provide some slots when queried - async", async () => {
  let slots;
  const today = new Date();
  const tomorrow = addDate(today, 1);
  const afterAWeek = addDate(today, 7);

  await fetchAPIAsync(today).then((result) => (slots = result));
  expect(allSlots).toEqual(expect.arrayContaining(slots));
  expect(allSlots.length).toBeGreaterThan(slots.length);

  await fetchAPIAsync(tomorrow).then((result) => (slots = result));
  expect(allSlots).toEqual(expect.arrayContaining(slots));
  expect(allSlots.length).toBeGreaterThan(slots.length);

  await fetchAPIAsync(afterAWeek).then((result) => (slots = result));
  expect(allSlots).toEqual(expect.arrayContaining(slots));
  expect(allSlots.length).toBeGreaterThan(slots.length);

  slots = await fetchAPIAsync(today);
  expect(allSlots).toEqual(expect.arrayContaining(slots));
  expect(allSlots.length).toBeGreaterThan(slots.length);
});

it("shall return status when bookings are submitted - async", async () => {
  let success = 0,
    failure = 0,
    status;
  // Make 50 bookings
  for (let i = 0; i < 50; i++) {
    status = undefined;
    await submitAPIAsync({}).then((s) => (status = s));
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
