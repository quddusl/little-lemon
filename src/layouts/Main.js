import React, { useReducer } from "react";

const allSlots = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
const updateTimes = (availableTimes, date) => availableTimes;
const initializeTimes = (date) => allSlots;

export const Main = ({ children }) => {
  const [availableTimes, setAvailableTimes] = useReducer(
    updateTimes,
    new Date().setHours(0, 0, 0, 0),
    initializeTimes
  );
  return (
    <main>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          availableTimes,
          setAvailableTimes,
        })
      )}
    </main>
  );
};
