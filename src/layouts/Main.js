import React, { useState, useReducer, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI, submitAPI } from "./api";

export const updateTimes = (availableTimes, newAvailableTimes) => {
  return newAvailableTimes;
};

// set predictable initial state, suitable for testing
export const initializeTimes = () => ["17:00", "18:00", "22:00"];

export const Main = ({ children }) => {
  const [availableTimes, setAvailableTimes] = useReducer(
    updateTimes,
    initializeTimes()
  );

  const setAvailableTimesWrapper = useCallback(async (date) => {
    const newAvailableTimes = await fetchAPI(date);
    setAvailableTimes(newAvailableTimes);
  }, []);

  const [bookingDate, setBookingDate] = useState();

  useEffect(() => {
    setAvailableTimesWrapper(bookingDate);
  }, [bookingDate, setAvailableTimesWrapper]);

  const navigate = useNavigate();

  const submitForm = async (formData) => {
    const success = await submitAPI(formData);
    if (success) {
      const formProps = {
        values: formData,
        success,
        message: "Booking success.",
      };
      navigate("/confirmation", { state: { ...formProps } });
    } else {
      const formProps = {
        values: formData,
        success,
        message: "Booking has failed.",
      };
      navigate("/confirmation", { state: { ...formProps } });
    }
  };

  return (
    <main>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          availableTimes,
          setBookingDate,
          submitForm,
        })
      )}
    </main>
  );
};
