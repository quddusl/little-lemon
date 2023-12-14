import { OrderOnlineLink } from "../layouts/Nav";
import { dishes } from "./Dishes";
import bicycle from "../assets/images/bicycle.svg";

export const Specials = () => {
  const dishCards = (
    <div className="dish-cards">
      {dishes.slice(0, 3).map((dish) => (
        <article key={dish.id} className="card bg-peach-puff dish-card">
          <img
            src={`${process.env.PUBLIC_URL}/images/${dish.imgFile}`}
            alt={dish.name}
            className="dish-picture"
          />
          <div className="grid-stretched-row">
            <span className="dish-name highlight-bg">{dish.name}</span>
            <span className="dish-price highlight-bg">${dish.price}</span>
          </div>
          <p className="dish-description paragraph">{dish.description}</p>
          <OrderOnlineLink>
            Order a delivery
            <img
              src={bicycle}
              alt="Bicycle delivery icon"
              className="bicycle-icon"
            />
          </OrderOnlineLink>
        </article>
      ))}
    </div>
  );
  return (
    <section className="container cta-order main-article">
      <div className="content">
        <div className="grid-stretched-row">
          <h1 className="sub-title">This week's specials!</h1>
          <OrderOnlineLink className="button button-primary">
            Online Menu
          </OrderOnlineLink>
        </div>
        {dishCards}
      </div>
    </section>
  );
};
