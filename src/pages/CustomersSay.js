import { reviews } from "./Reviews";
export const CustomersSay = () => {
  const reviewCards = reviews.map((review) => (
    <article className="card review-card" key={review.id}>
      <img
        src={`${process.env.PUBLIC_URL}/images/${review.rating}-star.svg`}
        alt={`${review.rating} star rating`}
      />
      <div className="review-photo-name">
        <img
          src={`${process.env.PUBLIC_URL}/images/${review.picture}`}
          alt={`${review.name}`}
        />
        <span className="highlight-bg">{review.name}</span>
      </div>
      <p className="paragraph">{review.review}</p>
    </article>
  ));
  return (
    <section className="container testimonials">
      <article className="content">
        <h1 className="sub-title">Testimonials</h1>
        <div className="review-cards">{reviewCards}</div>
      </article>
    </section>
  );
};
