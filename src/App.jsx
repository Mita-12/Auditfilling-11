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
import ResellerRegistrationForm from "./reseller/Reseller.jsx";
import ServiceProviderForm from "./page/ServiceProvider/ServiceProvider.jsx";
import UserProfile from "./UserProfile/UserProfile.jsx";
import { User } from "lucide-react";
import CompanyDetail from "./UserProfile/CompanyDatail.jsx";
import CompanyDetailForm from "./UserProfile/ComanyDetailForm.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/income-tax"
          element={
            <>
              <Header />
              <IncomeTax />
              <Footer />
            </>
          } />

        <Route path="/gst"
          element={
            <>
              <Header />
              <Gst />
              <Footer />
            </>} />

        <Route path="/startup" element={
          <>   <Header />
            <StartUp />
            <Footer />
          </>
        } />

        <Route path="/company" element={
          <>   <Header />
          <Company />
          <Footer />
          </>
        } />
        <Route path="/trademark" element={
          <>   <Header />
          <Trademark />
          <Footer />
          </>
        } />
        <Route path="/bankvaluation" element={
          <>   
          <Header />
          <Bankvaluation />
          <Footer />
          </>
        } />
        <Route path="/legal" element={
          <>
            <Header />
            <Legal />
            <Footer />
          </>
        } />
        <Route path="/blog" element={
          <>
            <Header />
            <BlogPage />
            <Footer />
          </>
        } />
        <Route path="/contact" element={
          <>
            <Header />
            <Contact />
            <Footer />
          </>
        } />
        <Route path="/about" element={
          <>
            <Header />
            <AboutUsPage />
            <Footer />
          </>
        } />
        <Route path="/privacy" element={
          <>
            <Header />
            <PrivacyPolicy />
            <Footer />
          </>
        } />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/reseller" element={<ResellerRegistrationForm />} />
        <Route path="/service-provider" element={<ServiceProviderForm />} />
        {/* <Route path="/profile" element={<UserProfile />} /> */}
        <Route path="/profile"
          element={
            <>
              <Header />
              <UserProfile />
              <Footer />
            </>} />
        <Route path="/company-details"
          element={
            <>
              <Header />
              <CompanyDetail />
              <Footer />
            </>} />
        <Route path="/company-detailform"
          element={
            <>
              <Header />
              <CompanyDetailForm />
              <Footer />
            </>} />
      </Routes>
    </Router>
  );
}

export default App;
