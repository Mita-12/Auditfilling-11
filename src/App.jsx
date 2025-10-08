import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./page/Home.jsx"; // <-- Use Home component here
import Header from "./component/Header.jsx"; // Optional: may be redundant now

import ServicesSection from "./component/Services.jsx";
import IncomeTax from "./page/Services/IncomeTax.jsx";
import Gst from "./page/Services/Gst.jsx";
import WhatsAppPopup from "./form/WhatsAppPopup.jsx";
import StartUp from "./page/Services/Startup.jsx";
import BlogPage from "./page/Blog.jsx";
import Company from "./page/Services/Company.jsx";
import Trademark from "./page/Services/TradeMark.jsx";
import Legal from "./page/Services/Legal.jsx";
import Bankvaluation from "./page/Services/BankValuation.jsx";
import AboutUsPage from "./page/AboutUs.jsx";
import Contact from "./page/ContactPage.jsx";
import PrivacyPolicy from "./page/PrivecyPolicy.jsx";
import TermsAndConditions from "./page/TermCondition.jsx";
import Testimonials from "./page/Testimonial.jsx";
import LoginForm from "./form/LoginForm.jsx";
import Footer from "./component/Footer.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/income-tax"
          element={
            <><IncomeTax />
            </>} />

        <Route path="/gst"
          element={
            <><Gst />
            </>} />

        <Route path="/startup" element={<StartUp />} />
        <Route path="/company" element={<Company />} />
        <Route path="/trademark" element={<Trademark />} />
        <Route path="/bankvaluation" element={<Bankvaluation />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
      </Routes>
    </Router>
  );
}

export default App;
