import BookingForm from "./BookingForm";
import { useNavigate } from "react-router-dom";
export const BookingPage = ({ availableTimes, setBookingDate, submitForm }) => {
  const bookingProps = { availableTimes, setBookingDate };
  const navigate = useNavigate();
  const onCancel = () => {
    if (
      window.confirm(
        "Are you sure you want to leave the page? Any data that you entered will be lost."
      )
    ) {
      navigate("/");
    }
  };
  return (
    <article className="hero booking container">
      <article className="main-article content">
        <h1 className="sub-title primary-yellow">Reserve Your Table</h1>
        <BookingForm
          {...bookingProps}
          onSubmit={submitForm}
          onCancel={onCancel}
        />
      </article>
    </article>
  );
};
