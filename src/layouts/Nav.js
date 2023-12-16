import { NavLink } from "react-router-dom";
import React, { useReducer, useRef, useEffect } from "react";

export const HomeLink = (props) => {
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
      className={props.className || "order-link section-category"}
    >
      {props.children || "Order Online"}
    </NavLink>
  );
};

export const LoginLink = (props) => {
  return (
    <NavLink to="/login" className={props.className || "section-category"}>
      {props.children || "Login"}
    </NavLink>
  );
};

export const BookingConfirmationLink = (props) => {
  return (
    <NavLink
      to="/confirmation"
      className={props.className || "section-category"}
    >
      {props.children || "Confirmation"}
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
    <nav className={props.className || "nav"}>
      {props.children && props.children[0]}
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            {link({
              className: props.anchorClassName || "section-category",
            })}
          </li>
        ))}
      </ul>
      {props.children &&
        props.children.length > 1 &&
        props.children.map((child, i) => (i === 0 ? null : child))}
    </nav>
  );
};

export const BurgerMenu = ({ children }) => {
  // Adapted from https://codepen.io/KingKabir/pen/QyPwgG
  // Converted from jQuery to React,
  // and made some other customizations

  const burgerMenuOverlayRef = useRef(null);
  const burgerMenuButtonRef = useRef(null);

  const closeBM = {
    isMenuOpen: false,
    buttonStyle: "button_container",
    overlayStyle: "overlay",
  };

  const openBM = {
    isMenuOpen: true,
    buttonStyle: "button_container active",
    overlayStyle: "overlay bg-highlight-soft-peach open",
  };

  const toggleBurgerMenuReducer = (state, action) => {
    if (action.type === "BM_OPEN") {
      return { ...openBM };
    } else if (action.type === "BM_CLOSE") {
      return { ...closeBM };
    } else if (action.type === "BM_TOGGLE") {
      return state.isMenuOpen ? { ...closeBM } : { ...openBM };
    } else {
      throw new Error("Invalid action for toggleBurgerMenuReducer.");
    }
  };

  const [burgerMenuState, toggleBurgerMenu] = useReducer(
    toggleBurgerMenuReducer,
    { ...closeBM }
  );

  const buttonClickHandler = (e) => {
    toggleBurgerMenu({ type: "BM_TOGGLE" });
  };

  const overlayBlurHandler = (e) => {
    if (e.relatedTarget !== burgerMenuButtonRef.current) {
      toggleBurgerMenu({ type: "BM_CLOSE" });
    }
  };

  useEffect(() => {
    if (burgerMenuState.isMenuOpen) {
      burgerMenuOverlayRef.current.focus();
    }
  }, [burgerMenuState.isMenuOpen]);

  return (
    <>
      <div
        className={burgerMenuState.buttonStyle}
        id="toggle"
        ref={burgerMenuButtonRef}
        tabIndex={-1} // Make it focusable
        onClick={buttonClickHandler}
        aria-label="menu"
      >
        <span className="top bg-primary-green"></span>
        <span className="middle bg-primary-green"></span>
        <span className="bottom bg-primary-green"></span>
      </div>
      <div
        className={burgerMenuState.overlayStyle}
        id="overlay"
        ref={burgerMenuOverlayRef}
        tabIndex={-2} // Make it focusable
        // To avoid onClick being blocked by onBlur, give some delay
        // Can also use onMouseDown instead of onClick as it has higher priority
        onBlur={(e) => setTimeout(() => overlayBlurHandler(e), 100)}
      >
        {children}
      </div>
    </>
  );
};
