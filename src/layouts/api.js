const ratioOfFullyBlockedSlotsPerDay = 0.33;
const probabilityOfBookingFailure = -0.01; // simulate 0, always success
const minDelay = 40;
const maxDelay = 80;
const allSlots = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

export const getAllSlots = () => [...allSlots];

// Asynchronous API
// Use timeout and synchronous API
// to simulate asynchronous API
export const fetchAPI = (date) => {
  return new Promise((resolve) => {
    // Simulate async API with a random delay
    setInterval(() => {
      resolve(fetchAPISynchronous(date));
    }, minDelay + Math.floor(Math.random() * (maxDelay - minDelay)));
  });
};

export const submitAPI = (booking) =>
  new Promise((resolve) => {
    // Simulate async API with timeout
    setInterval(() => {
      resolve(submitAPISynchronous(booking));
    }, minDelay + Math.floor(Math.random() * (maxDelay - minDelay)));
  });

// Synchronous API
export const fetchAPISynchronous = (date) => {
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

export const submitAPISynchronous = (booking) =>
  Math.random() > probabilityOfBookingFailure;
