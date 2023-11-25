import { Nav, HomeLink } from "./Nav";
import logo from "../assets/images/Logo.svg";
import { socialMedia } from "./SocialMedia";

const iconFileExtension = ".svg";

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
            {socialMedia.map((sm) => (
              <li key={sm.name}>
                <a href={sm.url} className="section-category">
                  <img
                    className="footer-social-icon"
                    src={`${process.env.PUBLIC_URL}/images/${sm.icon}${iconFileExtension}`}
                    alt={`${sm.name} Icon`}
                  />
                  &nbsp;{sm.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </footer>
  );
};
