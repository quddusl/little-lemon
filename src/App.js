import {Route, Routes} from 'react-router-dom';
import {Home} from './pages/Home';
import { UnderConstruction } from './pages/UnderConstruction';
import {Template} from './layouts/Template';
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Template><Home /></Template>}/>
                <Route path="/about" element={<Template><UnderConstruction pageName="About" /></Template>}/>
                <Route path="/menu" element={<Template><UnderConstruction pageName="Menu" /></Template>}/>
                <Route path="/reservation" element={<Template><UnderConstruction pageName="Reservation" /></Template>}/>
                <Route path="/order-online" element={<Template><UnderConstruction pageName="Order Online" /></Template>}/>
                <Route path="/login" element={<Template><UnderConstruction pageName="Login" /></Template>}/>
            </Routes>
        </>
    );
}

export default App;
