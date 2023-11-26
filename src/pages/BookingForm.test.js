import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookingForm from "./BookingForm";

let availableTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
const setAvailableTimes = (newAvailableTimes) =>
  (availableTimes = newAvailableTimes);
const bookingProps = { availableTimes, setAvailableTimes };

it("shall render the expected texts", () => {
  render(<BookingForm {...bookingProps} />);
  const bookingDate = screen.getByText("Booking date:");
  expect(bookingDate).toBeInTheDocument();
  const fullName = screen.getByText("Full name:");
});

it("shall not render unexpected text", () => {
  render(<BookingForm {...bookingProps} />);
  const notexisting = screen.queryByText("Not existing");
  expect(notexisting).not.toBeInTheDocument();
  expect(notexisting).toBeNull();
});

it("shall be possible to submit the form", async () => {
  const handleSubmit = jest.fn((v) => {
    console.log("Inside mock function, values: ", v);
  });
  handleSubmit.mockClear();

  render(<BookingForm {...bookingProps} onSubmit={handleSubmit} />);
  const fullName = screen.getByRole("textbox", { name: "Full name:" });
  const bookingDate = screen.getByLabelText("Booking date:");
  const bookingTime = screen.getByLabelText("Time:");
  const numberOfGuests = screen.getByLabelText("Number of guests:");
  const occasion = screen.getByLabelText("Occasion:");

  const submitButton = screen.getByRole("button", "Make Your Reservation");
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toHaveAttribute("disabled");

  await userEvent.clear(fullName);
  await userEvent.type(fullName, "Bruk Quddus");
  expect(fullName).toHaveValue("Bruk Quddus");

  await userEvent.clear(bookingDate);
  await userEvent.type(bookingDate, "2023-11-28");
  expect(bookingDate).toHaveValue("2023-11-28");

  await userEvent.selectOptions(bookingTime, "17:00");
  expect(bookingTime).toHaveValue("17:00");

  await userEvent.clear(numberOfGuests);
  await userEvent.type(numberOfGuests, "2");
  expect(numberOfGuests).toHaveValue(2);

  await userEvent.click(occasion);
  await userEvent.click(occasion);

  await userEvent.click(submitButton);
  //expect(submitButton).not.toHaveAttribute("disabled");
  // await waitFor(() => expect(handleSubmit).toHaveBeenCalled());
});
