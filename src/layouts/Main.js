import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI, submitAPI } from "./api";

const today = ((d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()))(
  new Date()
);

export const updateTimes = (availableTimes, date) => {
  return fetchAPI(date);
};

export const initializeTimes = () => fetchAPI(today);

export const Main = ({ children }) => {
  const [availableTimes, setAvailableTimes] = useReducer(
    updateTimes,
    initializeTimes()
  );

  const navigate = useNavigate();

  const submitForm = (formData) => {
    const success = submitAPI(formData);
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
          setAvailableTimes,
          submitForm,
        })
      )}
    </main>
  );
};