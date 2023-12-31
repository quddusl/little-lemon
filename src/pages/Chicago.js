import marioAndAdrian from "../assets/images/Mario and Adrian b.jpg";
export const Chicago = () => {
  return (
    <section className="container history">
      <div className="content">
        <div className="history-text">
          <h1 className="sub-title">Little Lemon</h1>
          <p className="sub-sub-title">Chicago</p>
          <p className="paragraph">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet. Amet minim mollit non deserunt
            ullamco est sit aliqua dolor do amet sint. Velit officia consequat
            duis enim velit mollit.{" "}
          </p>
        </div>
        <span>&nbsp;</span>
        <img src={marioAndAdrian} alt="Mario and Adrian" className="card" />
      </div>
    </section>
  );
};
