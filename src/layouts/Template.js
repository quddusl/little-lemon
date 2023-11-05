import { Header } from "../layouts/Header";
import { Footer } from "../layouts/Footer";
import { Main } from "../layouts/Main";

export const Template = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};
