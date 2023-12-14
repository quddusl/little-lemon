import { Nav, HomeLink, BurgerMenu } from "./Nav";
import logo from "../assets/images/Logo.svg";

export const Header = () => {
  return (
    <header className="container page-header">
      <Nav className="content">
        <HomeLink>
          <img
            src={logo}
            alt="Little Lemon Logo"
            aria-label="Logo - Go to Home Page"
          />
        </HomeLink>{" "}
        <BurgerMenu>
          <Nav className="section-category" />
        </BurgerMenu>
      </Nav>
    </header>
  );
};
