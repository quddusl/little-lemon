import { Nav, HomeLink, BurgerMenu } from "./Nav";
import logo from "../assets/images/Logo.svg";

export const Header = () => {
  return (
    <header>
      <div>
        <HomeLink>
          <img src={logo} alt="Little Lemon Logo" aria-label="Logo" />
        </HomeLink>
        <Nav />
        <BurgerMenu>
          <Nav className="section-category" />
        </BurgerMenu>
      </div>
    </header>
  );
};
