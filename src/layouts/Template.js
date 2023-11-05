import { Header } from "../layouts/Header";
import { Footer } from "../layouts/Footer";

export const Template = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
