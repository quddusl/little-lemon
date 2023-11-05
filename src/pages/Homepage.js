import { CallToAction } from "./CallToAction";
import { Specials } from "./Specials";
import { CustomersSay } from "./CustomersSay";
import { Chicago } from "./Chicago";

export const Homepage = () => {
  return (
    <>
      <CallToAction />
      <Specials />
      <CustomersSay />
      <Chicago />
    </>
  );
};
