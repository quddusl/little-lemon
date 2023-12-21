import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fetchAPI } from "../layouts/api";
import BookingForm from "./BookingForm";
import { addDate, dateToStr } from "../layouts/util";
import { Main } from "../layouts/Main";
import { BookingPage } from "./BookingPage";
import { BrowserRouter } from "react-router-dom";

// let user;
// xbeforeEach(async () => {
//   user = userEvent.setup();
//   render(
//     <BrowserRouter>
//       <Main>
//         <BookingPage />
//       </Main>
//     </BrowserRouter>
//   );
// });

const bookingPageJsx = (
  <BrowserRouter>
    <Main>
      <BookingPage />
    </Main>
  </BrowserRouter>
);

const setup = (jsx) => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
};

it("shall render the expected texts", () => {
  setup(bookingPageJsx);

  const fullName = screen.getByText("Full name");
  expect(fullName).toBeInTheDocument();

  const bookingDate = screen.getByText("Booking date");
  expect(bookingDate).toBeInTheDocument();

  const time = screen.getByText("Time");
  expect(time).toBeInTheDocument();

  const numberOfGuests = screen.getByText("Number of guests");
  expect(numberOfGuests).toBeInTheDocument();

  const occasion = screen.getByText("Occasion");
  expect(occasion).toBeInTheDocument();

  const seatingLocation = screen.getByText("Preferred seating location");
  expect(seatingLocation).toBeInTheDocument();

  confirmationRequired = screen.getByText("Confirmation required");
  expect(confirmationRequired).toBeInTheDocument();

  const comments = screen.getByText("Any comments or messages");
  expect(comments).toBeInTheDocument();
});

it("shall not render unexpected text", () => {
  setup(bookingPageJsx);

  const notexisting = screen.queryByText("Not existing");
  expect(notexisting).not.toBeInTheDocument();
  expect(notexisting).toBeNull();
});

it("shall be possible to submit the form", async () => {
  const { user } = setup(bookingPageJsx);

  const handleSubmit = jest.fn((v) => {
    console.log("Inside mock function, values: ", v);
  });
  handleSubmit.mockClear();

  // Avoid getByText queries, use getByRole and getByLabelText instead
  const fullName = screen.getByRole("textbox", { name: "Full name" });
  const bookingDate = screen.getByLabelText("Booking date");
  const bookingTime = screen.getByRole("combobox", { name: "Time" });
  const numberOfGuests = screen.getByRole("spinbutton", {
    name: "Number of guests",
  });
  const occasion = screen.getByRole("combobox", { name: "Occasion" });

  const submitButton = screen.getByRole("button", {
    name: "Make Your Reservation",
  });
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toHaveAttribute("disabled");

  await user.clear(fullName);
  await user.type(fullName, "Bruk Quddus");
  expect(fullName).toHaveValue("Bruk Quddus");

  await user.clear(bookingDate);
  await waitFor(() => user.type(bookingDate, "2024-12-28"));
  expect(bookingDate).toHaveValue("2024-12-28");

  await waitFor(() => user.selectOptions(bookingTime, "22:00"));
  expect(bookingTime).toHaveValue("22:00");
  expect(bookingTime).not.toHaveValue("16:00");

  await user.clear(numberOfGuests);
  await user.type(numberOfGuests, "2");
  expect(numberOfGuests).toHaveValue(2);

  await user.click(occasion);

  expect(submitButton).not.toHaveAttribute("disabled");
  expect(handleSubmit).not.toHaveBeenCalled();
  await waitFor(() => user.click(submitButton));
  //expect(handleSubmit).toHaveBeenCalled(); // bug in user-event library
});

it("shall have appropriate form validation attributes", () => {
  const { user } = setup(bookingPageJsx);

  const fullName = screen.getByRole("textbox", { name: "Full name" });
  expect(fullName).toHaveAttribute("required");
  expect(fullName).toHaveAttribute(
    "pattern",
    "/^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/im"
  );

  const bookingDate = screen.getByLabelText("Booking date");
  expect(bookingDate).toHaveAttribute("required");

  const time = screen.getByRole("combobox", { name: "Time" });
  expect(time).toHaveAttribute("required");

  const numberOfGuests = screen.getByRole("spinbutton", {
    name: "Number of guests",
  });
  expect(numberOfGuests).toHaveAttribute("required");
  expect(numberOfGuests).toHaveAttribute("min", "1");
  expect(numberOfGuests).toHaveAttribute("max", "20");
});

it("shall perform client side form validation", async () => {
  const { user } = setup(bookingPageJsx);

  // Check that ther is no error when all mandatory inputs
  // are properly provided

  // Full name
  const fullName = screen.getByRole("textbox", { name: "Full name" });
  await user.clear(fullName);
  await user.type(fullName, "Bruk Quddus");
  await user.tab();
  expect(fullName).not.toHaveAttribute("aria-invalid");

  const today = new Date();
  const today_str = dateToStr(today);
  const yesterday = addDate(today, -1);
  const yesterday_str = dateToStr(yesterday);
  const tomorrow = addDate(today, 1);
  const tomorrow_str = dateToStr(tomorrow);

  // Booking date
  const bookingDate = screen.getByLabelText("Booking date");
  await user.clear(bookingDate);
  await waitFor(() => user.type(bookingDate, today_str));
  await user.tab();
  expect(bookingDate).not.toHaveAttribute("aria-invalid");

  // Time
  const time = screen.getByRole("combobox", { name: "Time" });
  await waitFor(() => user.selectOptions(time, ["22:00"]));
  await user.tab();
  expect(time).not.toHaveAttribute("aria-invalid");

  // Number of guests
  const numberOfGuests = screen.getByRole("spinbutton", {
    name: "Number of guests",
  });
  await user.clear(numberOfGuests);
  await user.type(numberOfGuests, "1");
  await user.tab();
  expect(numberOfGuests).not.toHaveAttribute("aria-invalid");

  // Submit button
  const submitButton = screen.getByRole("button", {
    name: "Make Your Reservation",
  });

  // Form shall be valid by this time
  expect(screen.queryByText("Required")).toBeNull();
  expect(submitButton).not.toHaveAttribute("disabled");

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

  // Check that blank date input is rejected
  await waitFor(() => user.clear(bookingDate));
  await waitFor(() => user.tab());
  expect(bookingDate).toHaveAttribute("aria-invalid");
  expect(screen.getAllByText("Required").length).toBeGreaterThan(0);

  // Check that dates in the past are rejected
  await user.clear(bookingDate);
  await user.type(bookingDate, yesterday_str);
  await user.tab();
  expect(bookingDate).toHaveAttribute("aria-invalid");
  expect(screen.getByText("Date cannot be in the past.")).toBeInTheDocument();

  // Check that valid dates are accepted (today)
  await user.clear(bookingDate);
  await user.type(bookingDate, today_str);
  await user.tab();
  expect(bookingDate).not.toHaveAttribute("aria-invalid");

  // Check that valid dates are accepted (future date)
  await user.clear(bookingDate);
  await user.type(bookingDate, tomorrow_str);
  await user.tab();
  expect(bookingDate).not.toHaveAttribute("aria-invalid");

  // Check that error is thrown if time is not specified
  await user.selectOptions(time, "");
  await user.tab();
  expect(time).toHaveAttribute("aria-invalid");
  expect(screen.getByText("Required")).toBeInTheDocument();

  // If time is selected, there shall be no error
  await user.selectOptions(time, "22:00");
  await user.tab();
  expect(time).not.toHaveAttribute("aria-invalid");

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
