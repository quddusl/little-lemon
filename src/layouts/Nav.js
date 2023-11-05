import { NavLink } from "react-router-dom";
import { useState } from "react";

export const HomeLink = (props) => {
  console.log("HomeLink className: ", props.className);
  return (
    <NavLink to="/" className={props.className || "section-category"}>
      {props.children || "Home"}
    </NavLink>
  );
};

export const AboutLink = (props) => {
  return (
    <NavLink to="/about" className={props.className || "section-category"}>
      {props.children || "About"}
    </NavLink>
  );
};

export const MenuLink = (props) => {
  return (
    <NavLink to="/menu" className={props.className || "section-category"}>
      {props.children || "Menu"}
    </NavLink>
  );
};

export const ReservationLink = (props) => {
  return (
    <NavLink to="/booking" className={props.className || "section-category"}>
      {props.children || "Reservation"}
    </NavLink>
  );
};

export const OrderOnlineLink = (props) => {
  return (
    <NavLink
      to="/order-online"
      className={props.className || "section-category"}
    >
      {props.children || "Order Online"}
    </NavLink>
  );
};

export const LoginLink = (props) => {
  console.log("props.className: ", props.className);
  return (
    <NavLink to="/login" className={props.className || "section-category"}>
      {props.children || "Login"}
    </NavLink>
  );
};

export const links = [
  HomeLink,
  AboutLink,
  MenuLink,
  ReservationLink,
  OrderOnlineLink,
  LoginLink,
];

export const Nav = (props) => {
  return (
    <nav>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            {link({
              className: props.className || "section-category",
            })}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export const BurgerMenu = ({ children }) => {
  // Adapted from https://codepen.io/KingKabir/pen/QyPwgG
  // Converted from jQuery to React,
  // and made some other customizations
  const toggleOn = "button_container active";
  const toggleOff = "button_container";
  const overlayOpen = "overlay bg-highlight-soft-peach open";
  const overlayClose = "overlay";
  const [overlayOpened, setOverlayOpened] = useState(false);
  const [toggle, setToggle] = useState(toggleOff);
  const [overlay, setOverlay] = useState(overlayClose);

  const handleClickBurgerMenu = (e) => {
    e.preventDefault();
    setOverlayOpened((prev) => !prev);
    setToggle(overlayOpened ? toggleOn : toggleOff);
    setOverlay(overlayOpened ? overlayOpen : overlayClose);
  };

  return (
    <>
      <div className={toggle} id="toggle" onClick={handleClickBurgerMenu}>
        <span className="top bg-primary-green"></span>
        <span className="middle bg-primary-green"></span>
        <span className="bottom bg-primary-green"></span>
      </div>
      <div className={overlay} id="overlay" onClick={handleClickBurgerMenu}>
        {children}
      </div>
    </>
  );
};
