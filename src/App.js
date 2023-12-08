import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { UnderConstruction } from "./pages/UnderConstruction";
import { Template } from "./layouts/Template";
import { BookingPage } from "./pages/BookingPage";
import { ConfirmedBooking } from "./pages/ConfirmedBooking";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Template>
                <Homepage />
              </Template>
            }
          />
          <Route
            path="/booking"
            element={
              <Template>
                <BookingPage />
              </Template>
            }
          />
          <Route
            path="/confirmation"
            element={
              <Template>
                <ConfirmedBooking />
              </Template>
            }
          />
          <Route
            path="/about"
            element={
              <Template>
                <UnderConstruction pageName="About" />
              </Template>
            }
          />
          <Route
            path="/menu"
            element={
              <Template>
                <UnderConstruction pageName="Menu" />
              </Template>
            }
          />
          <Route
            path="/order-online"
            element={
              <Template>
                <UnderConstruction pageName="Order Online" />
              </Template>
            }
          />
          <Route
            path="/login"
            element={
              <Template>
                <UnderConstruction pageName="Login" />
              </Template>
            }
          />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
