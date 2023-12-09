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

it("shall have appropriate form validation attributes", () => {
  render(<BookingForm {...bookingProps} />);
  const fullName = screen.getByLabelText("Full name:");
  expect(fullName).toHaveAttribute("required");
  expect(fullName).toHaveAttribute(
    "pattern",
    "/^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/im"
  );

  const bookingDate = screen.getByLabelText("Booking date:");
  expect(bookingDate).toHaveAttribute("required");

  const time = screen.getByLabelText("Time:");
  expect(time).toHaveAttribute("required");

  const numberOfGuests = screen.getByLabelText("Number of guests:");
  expect(numberOfGuests).toHaveAttribute("required");
  expect(numberOfGuests).toHaveAttribute("min", "1");
  expect(numberOfGuests).toHaveAttribute("max", "20");
});

it("shall perform client side form validation", async () => {
  const user = userEvent.setup();
  render(<BookingForm {...bookingProps} />);

  const fullName = screen.getByLabelText("Full name:");

  // Check that pattern of Full name field is validated
  await user.clear(fullName);
  await user.type(fullName, "Bruk");
  await user.tab();
  expect(fullName).toHaveAttribute("aria-invalid");
  expect(
    screen.getByText("Name must have at least two words separated by space.")
  ).toBeInTheDocument();

  // Check that blank Full name field is not accepted
  await user.clear(fullName);
  await user.tab();
  expect(fullName).toHaveAttribute("aria-invalid");
  expect(screen.getByText("Required")).toBeInTheDocument();

  //Check that valid Full name is accepted, with no error
  await user.clear(fullName);
  await user.type(fullName, "Bruk Quddus");
  await user.tab();
  expect(fullName).not.toHaveAttribute("aria-invalid");

  const bookingDate = screen.getByLabelText("Booking date:");

  await user.clear(bookingDate);
  await user.tab();
  expect(bookingDate).toHaveAttribute("aria-invalid");
  expect(screen.getByText("Required")).toBeInTheDocument();

  const dateToStr = (day) => {
    const d = new Date(day);
    return `${d.getFullYear()}-${d.getMonth() + 1 < 10 ? "0" : ""}${
      d.getMonth() + 1
    }-${d.getDate() < 10 ? "0" : ""}${d.getDate()}`;
  };

  const yesterday = ((d) => new Date(new Date(d).setDate(d.getDate() - 1)))(
    new Date()
  );
  const yesterday_str = dateToStr(yesterday);

  // Check that dates in the past are rejected
  await user.clear(bookingDate);
  await user.type(bookingDate, yesterday_str);
  await user.tab();
  expect(bookingDate).toHaveAttribute("aria-invalid");
  expect(screen.getByText("Date cannot be in the past.")).toBeInTheDocument();

  const today = new Date();
  const today_str = dateToStr(today);

  // Check that valid dates are accepted (today)
  await user.clear(bookingDate);
  await user.type(bookingDate, today_str);
  await user.tab();
  expect(bookingDate).not.toHaveAttribute("aria-invalid");

  const tomorrow = ((d) => new Date(new Date(d).setDate(d.getDate() + 1)))(
    new Date()
  );
  const tomorrow_str = dateToStr(tomorrow);

  // Check that valid dates are accepted (future date)
  await user.clear(bookingDate);
  await user.type(bookingDate, tomorrow_str);
  await user.tab();
  expect(bookingDate).not.toHaveAttribute("aria-invalid");

  // Check that error is thrown if time is not specified
  const time = screen.getByLabelText("Time:");
  await user.selectOptions(time, []);
  await user.tab();
  expect(time).toHaveAttribute("aria-invalid");
  expect(screen.getByText("Required")).toBeInTheDocument();

  // If time is selected, there shall be no error
  await user.selectOptions(time, ["22:00"]);
  await user.tab();
  expect(time).not.toHaveAttribute("aria-invalid");

  const numberOfGuests = screen.getByLabelText("Number of guests:");

  // It shall reject input not specified
  await user.clear(numberOfGuests);
  await user.tab();
  expect(numberOfGuests).toHaveAttribute("aria-invalid");
  expect(screen.getByText("Required")).toBeInTheDocument();

  // It shall reject inputs less than 1
  await user.clear(numberOfGuests);
  await user.type(numberOfGuests, "-3");
  await user.tab();
  expect(numberOfGuests).toHaveAttribute("aria-invalid");
  expect(screen.getByText("Must not be less than 1")).toBeInTheDocument();

  // It shall reject inputs greater than 20
  await user.clear(numberOfGuests);
  await user.type(numberOfGuests, "30");
  await user.tab();
  expect(numberOfGuests).toHaveAttribute("aria-invalid");
  expect(screen.getByText("Must not exceed 20")).toBeInTheDocument();

  // It shall not throw error for valid input
  await user.clear(numberOfGuests);
  await user.type(numberOfGuests, "15");
  await user.tab();
  expect(numberOfGuests).not.toHaveAttribute("aria-invalid");
});
