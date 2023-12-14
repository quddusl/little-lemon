import { ReservationLink } from "../layouts/Nav";
import servingDishesPicture from "../assets/images/servingDishes.jpeg";
export const CallToAction = () => {
  return (
    <section className="container home hero">
      <div className="content">
        <div className="cta-reserve">
          <h1 className="sub-title primary-yellow">Little Lemon</h1>
          <h3 className="sub-sub-title highlight-soft-peach city">Chicago</h3>
          <p className="paragraph highlight-soft-peach">
            We are a family owned Mediterranean restaurant, focused on
            traditional recipies served with a modern twist.
          </p>
          <ReservationLink className="button button-primary">
            Reserve a Table
          </ReservationLink>
        </div>
        <img
          className="card hero"
          src={servingDishesPicture}
          alt="Waiter carrying delicious dishes."
        />
      </div>
    </section>
  );
};
