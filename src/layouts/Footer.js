import {Nav} from './Nav';
import logo from '../assets/images/Logo.svg';
import facebook from '../assets/images/facebook.svg';
import twitter from '../assets/images/twitter.svg';
import instagram from '../assets/images/instagram.svg';
import youtube from '../assets/images/youtube.svg';
export const Footer = () => {
    return (
        <footer>
            <img src={logo} alt="Little Lemon Logo" aria-label="Logo"/>
            <h2>Doormat Navigation</h2>
            <Nav />

            <h2>Address</h2>
            <address>
                {/* TODO: Address comes here */}
                Address comes here. <br />
                Email: <a href="mailto:adrian@example.com" aria-label="Email">adrian@example.com</a><br />
                Telephone: <a href="tel:+12345678901" aria-label="Telephone">(234) 567-8901</a>
            </address>

            <section aria-label="Social Media Links">
                <h2>Follow and Share Little Lemon</h2>
                <ul>
                    <li>
                        <img className="footer-social-icon" src={facebook} alt="Facebook Icon"/>
                        <a href="https://www.facebook.com/"> Facebook </a>
                    </li>
                    <li>
                        <img className="footer-social-icon" src={twitter} alt="Twitter Icon"/>
                        <a href="https://www.twitter.com/"> Twitter </a>
                    </li>
                    <li>
                        <img className="footer-social-icon" src={instagram} alt="Instagram Icon"/>
                        <a href="https://www.facebook.com/"> Instagram </a>
                    </li>
                    <li>
                        <img className="footer-social-icon" src={youtube} alt="YouTube Icon"/>
                        <a href="https://www.youtube.com/"> YouTube </a>
                    </li>
                </ul>
            </section>
        </footer>
    );
}