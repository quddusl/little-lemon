const ratioOfFullyBlockedSlotsPerDay = 0.33;
const probabilityOfBookingFailure = -0.01; // simulate 0, always success
const minDelay = 100;
const maxDelay = 200;
const allSlots = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

export const getAllSlots = () => [...allSlots];

export const fetchAPI = (date) => {
  if (!(date instanceof Date)) {
    return [];
  }

  const freeSlots = Math.floor(
    allSlots.length * (1 - ratioOfFullyBlockedSlotsPerDay)
  );
  const slots = [];
  let i = 0;
  while (i < freeSlots - 1) {
    let slot = allSlots[Math.floor(Math.random() * (allSlots.length - 1))];
    if (!slots.find((s) => s === slot)) {
      slots.push(slot);
      i++;
    }
  }
  slots.push("22:00"); // let "22:00" be always in the list, for testing purposes
  slots.sort();
  return slots;
};

export const submitAPI = (booking) =>
  Math.random() > probabilityOfBookingFailure;

export const fetchAPIAsync = (date) => {
  return new Promise((resolve) => {
    setInterval(() => {
      resolve(fetchAPI(date));
    }, minDelay + Math.random(maxDelay - minDelay));
  });
};

export const submitAPIAsync = (booking) =>
  new Promise((resolve) => {
    setInterval(() => {
      resolve(submitAPI(booking));
    }, minDelay + Math.random(maxDelay - minDelay));
  });
