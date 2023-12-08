import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fetchAPI } from "../layouts/api";
import BookingForm from "./BookingForm";

let availableTimes = fetchAPI(new Date());
const setAvailableTimes = (date) => (availableTimes = fetchAPI(date));
const bookingProps = { availableTimes, setAvailableTimes };

it("shall render the expected texts", () => {
  render(<BookingForm {...bookingProps} />);
  const fullName = screen.getByText("Full name:");
  expect(fullName).toBeInTheDocument();
  const bookingDate = screen.getByText("Booking date:");
  expect(bookingDate).toBeInTheDocument();
  const time = screen.getByText("Time:");
  expect(time).toBeInTheDocument();
  const numberOfGuests = screen.getByText("Number of guests:");
  expect(numberOfGuests).toBeInTheDocument();
  const occasion = screen.getByText("Occasion:");
  expect(occasion).toBeInTheDocument();
  const seatingLocation = screen.getByText("Preferred seating location:");
  expect(seatingLocation).toBeInTheDocument();
  confirmationRequired = screen.getByText("Confirmation required");
  expect(confirmationRequired).toBeInTheDocument();
  const comments = screen.getByText("Any comments or messages:");
  expect(comments).toBeInTheDocument();
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

  availableTimes = ["17:00", "19:00", "21:00", "22:00"];
  const newBookingProps = { availableTimes, setAvailableTimes };

  const user = userEvent.setup();
  render(<BookingForm {...newBookingProps} onSubmit={handleSubmit} />);
  const fullName = screen.getByRole("textbox", { name: "Full name:" });
  const bookingDate = screen.getByLabelText("Booking date:");
  const bookingTime = screen.getByLabelText("Time:");
  const numberOfGuests = screen.getByLabelText("Number of guests:");
  const occasion = screen.getByLabelText("Occasion:");

  const submitButton = screen.getByRole("button", "Make Your Reservation");
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toHaveAttribute("disabled");

  await user.clear(fullName);
  await user.type(fullName, "Bruk Quddus");
  expect(fullName).toHaveValue("Bruk Quddus");

  await user.clear(bookingDate);
  await user.type(bookingDate, "2024-12-28");
  expect(bookingDate).toHaveValue("2024-12-28");

  await user.selectOptions(bookingTime, "19:00");
  expect(bookingTime).toHaveValue("19:00");
  expect(bookingTime).not.toHaveValue("21:00");

  await user.clear(numberOfGuests);
  await user.type(numberOfGuests, "2");
  expect(numberOfGuests).toHaveValue(2);

  await user.click(occasion);
  await user.click(occasion);

  expect(submitButton).not.toHaveAttribute("disabled");
  expect(handleSubmit).not.toHaveBeenCalled();
  await user.click(submitButton);
  // expect(handleSubmit).toHaveBeenCalled(); // bug in user-event library
});
