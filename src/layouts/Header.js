import {Nav} from './Nav';
import logo from '../assets/images/Logo.svg';

export const Header = () => {
    return (
        <header>
            <img src={logo} alt="Little Lemon Logo" aria-label="Logo"/>
            <Nav />
        </header>
    );
}