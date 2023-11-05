import { Nav, HomeLink } from "./Nav";
import logo from "../assets/images/Logo.svg";
import facebook from "../assets/images/facebook.svg";
import twitter from "../assets/images/twitter.svg";
import instagram from "../assets/images/instagram.svg";
import youtube from "../assets/images/youtube.svg";
export const Footer = () => {
  return (
    <footer>
      <div>
        <HomeLink>
          <img src={logo} alt="Little Lemon Logo" aria-label="Logo" />
        </HomeLink>
        <div className="footer-col">
          <h2 className="sub-sub-title">Doormat Navigation</h2>
          <Nav />
        </div>

        <div className="footer-col">
          <h2 className="sub-sub-title">Address</h2>
          <address className="section-category">
            Address comes here. <br />
            <a
              href="mailto:adrian@example.com"
              className="section-category"
              aria-label="Email"
            >
              adrian@example.com
            </a>
            <br />
            <a
              href="tel:+12345678901"
              className="section-category"
              aria-label="Telephone"
            >
              (234) 567-8901
            </a>
          </address>
        </div>

        <section aria-label="Social Media Links" className="footer-col">
          <h2 className="sub-sub-title">Social Media Links</h2>
          <ul>
            <li>
              <a href="https://www.facebook.com/ className='section-category'">
                <img
                  className="footer-social-icon"
                  src={facebook}
                  alt="Facebook Icon"
                />
                &nbsp;Facebook
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com/" className="section-category">
                <img
                  className="footer-social-icon"
                  src={twitter}
                  alt="Twitter Icon"
                />
                &nbsp;Twitter
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/" className="section-category">
                <img
                  className="footer-social-icon"
                  src={instagram}
                  alt="Instagram Icon"
                />
                &nbsp;Instagram
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/" className="section-category">
                <img
                  className="footer-social-icon"
                  src={youtube}
                  alt="YouTube Icon"
                />
                &nbsp;YouTube
              </a>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  );
};
