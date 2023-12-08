import BookingForm from "./BookingForm";
export const BookingPage = ({
  availableTimes,
  setAvailableTimes,
  submitForm,
}) => {
  const bookingProps = { availableTimes, setAvailableTimes };
  return (
    <article className="hero">
      <article className="main-article booking">
        <h1 className="sub-title primary-yellow">Reserve Your Table</h1>
        <BookingForm {...bookingProps} onSubmit={submitForm} />
      </article>
    </article>
  );
};
