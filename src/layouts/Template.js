import {Header} from '../layouts/Header';
// import {Main} from '../layouts/Main';
import {Footer} from '../layouts/Footer';

export const Template = ({children}) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}