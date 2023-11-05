import { Hero } from "./Hero";
import { Specials } from "./Specials";
import { Testimonials } from "./Testimonials";
import { History } from "./History";

export const Home = () => {
  return (
    <main>
      <Hero />
      <Specials />
      <Testimonials />
      <History />
    </main>
  );
};
