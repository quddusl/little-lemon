import BookingForm from "./BookingForm";
export const BookingPage = ({
  availableTimes,
  setBookingDate,
  submitForm,
}) => {
  const bookingProps = { availableTimes, setBookingDate };
  return (
    <article className="hero container">
      <article className="main-article booking content">
        <h1 className="sub-title primary-yellow">Reserve Your Table</h1>
        <BookingForm {...bookingProps} onSubmit={submitForm} />
      </article>
    </article>
  );
};
