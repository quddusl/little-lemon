import { useLocation } from "react-router-dom";

export const ConfirmedBooking = () => {
  const location = useLocation();
  const { values, success } = location.state;
  const firstLine = values && values.name ? <p>Dear {values.name} </p> : null;
  const secondLine = (
    <p>
      Your booking {success ? " has been confirmed!" : " attempt has failed."}{" "}
    </p>
  );
  const bookingDetails = values ? (
    <>
      <h2> Booking Details </h2>
      <p>Name: {values.name}</p>
      <p>Date: {values.date}</p>
      <p>Time: {values.time}</p>
      <p>Number of Guests: {values.numberOfGuests}</p>
      {values.occasion && <p>Occasion: {values.occasion}</p>}
      {values.seatingLocation && (
        <p>Seating Location: {values.seatingLocation}</p>
      )}
      {values.email && <p>Email: {values.email}</p>}
      {values.mobile && <p>Mobile: {values.mobile}</p>}
      {values.comments && <p>Your comments: {values.comments}</p>}
      {values.email ? (
        <p>
          Reminders will be sent to you via email{" "}
          {values.mobile ? `and SMS` : ``}.
        </p>
      ) : values.mobile ? (
        <p>Reminders will be sent to you via SMS.</p>
      ) : null}
    </>
  ) : null;

  return (
    <article className="hero container">
      <article className="main-article booking-confirmed content">
      <h1 className="sub-title primary-yellow">Booking Status</h1>
        {firstLine}
        {secondLine}
        {bookingDetails}
      </article>
    </article>
  );
};
