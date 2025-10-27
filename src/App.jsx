

// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import Home from "./page/Home.jsx";
import About from "./page/AboutUs.jsx";
import IncomeTax from "./page/Services/IncomeTax.jsx";
import Gst from "./page/Services/Gst.jsx";
import StartUp from "./page/Services/Startup.jsx";
import Company from "./page/Services/Company.jsx";
import Trademark from "./page/Services/TradeMark.jsx";

import Bankvaluation from "./page/Services/BankValuation.jsx";
import Legal from "./page/Services/Legal.jsx";

import Contact from "./page/ContactPage.jsx";
import PrivacyPolicy from "./page/PrivecyPolicy.jsx";

import TermsAndConditions from "./page/TermCondition.jsx";
import ResellerRegistrationForm from "./reseller/Reseller.jsx";

import ServiceProviderForm from "./page/ServiceProvider/ServiceProvider.jsx";
// import ProceedToPay from "./page/Services/document/ProceedToPay.jsx";
import DocumentPay from "./page/Services/document/DocumentPay.jsx";
import LoginForm from "./form/LoginForm.jsx";
import UserProfile from "./UserProfile/UserProfile.jsx";
import CompanyDetail from "./UserProfile/CompanyDatail.jsx";
import CompanyDetailForm from "./UserProfile/ComanyDetailForm.jsx";
import MyRequests from "./UserProfile/MyRequest.jsx";
import CompletedService from "./UserProfile/CompleteService.jsx";
import PaymentHistory from "./UserProfile/PaymentHistory.jsx";
import Feedback from "./UserProfile/Feedback.jsx";
import BlogDetailPage from "./page/Blog/BlogDetails.jsx";
import BlogPage from "./page/Blog/Blog.jsx";
import PreviewInvoice from "./UserProfile/Invoice.jsx";
import Checkout from "./page/Services/document/Checkout.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* Add other nested routes here */}
          <Route path="/about" element={<About />} />
          <Route path="/income-tax" element={<IncomeTax />} />

          <Route path="/gst" element={<Gst />} />
          <Route path="/startup" element={<StartUp />} />
          <Route path="/company" element={<Company />} />
          <Route path="/trademark" element={<Trademark />} />
          <Route path="/bankvaluation" element={<Bankvaluation />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/reseller" element={<ResellerRegistrationForm />} />
          <Route path="/service-provider" element={<ServiceProviderForm />} />
          {/* <Route path="/proceed-to-pay" element={<ProceedToPay />} /> */}
          <Route path="/service/:service" element={<DocumentPay />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/company-details" element={<CompanyDetail />} />
          <Route path="/company-detailform" element={<CompanyDetailForm />} />
          <Route path="/myrequests" element={<MyRequests />} />
          <Route path="/completed-services" element={<CompletedService />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/blog-detail" element={<BlogDetailPage />} />
          <Route path="/invoice" element={<  PreviewInvoice />} />
          <Route path="/documents/:service" element={<  DocumentPay />} />
          {/* <Route path="/proceed-to-pay/:category" element={<ProceedToPay />} /> */}

          <Route
            path="/service/:serviceName/checkout"
            element={<Checkout />}
          />




        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
// Note: Ensure Header and Footer components are imported at the top
// import Header from "./component/Header.jsx";
// import Footer from "./component/Footer.jsx"; 