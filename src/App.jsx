// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "./page/Home.jsx"; // <-- Use Home component here
// import Header from "./component/Header.jsx"; // Optional: may be redundant now

// import ServicesSection from "./component/Services.jsx";
// import IncomeTax from "./page/Services/IncomeTax.jsx";
// import Gst from "./page/Services/Gst.jsx";
// import WhatsAppPopup from "./form/WhatsAppPopup.jsx";
// import StartUp from "./page/Services/Startup.jsx";
// import BlogPage from "./page/Blog.jsx";
// import Company from "./page/Services/Company.jsx";
// import Trademark from "./page/Services/TradeMark.jsx";
// import Legal from "./page/Services/Legal.jsx";
// import Bankvaluation from "./page/Services/BankValuation.jsx";
// import AboutUsPage from "./page/AboutUs.jsx";
// import Contact from "./page/ContactPage.jsx";
// import PrivacyPolicy from "./page/PrivecyPolicy.jsx";
// import TermsAndConditions from "./page/TermCondition.jsx";
// import Testimonials from "./page/Testimonial.jsx";
// import LoginForm from "./form/LoginForm.jsx";
// import Footer from "./component/Footer.jsx";
// import ResellerRegistrationForm from "./reseller/Reseller.jsx";
// import ServiceProviderForm from "./page/ServiceProvider/ServiceProvider.jsx";
// import UserProfile from "./UserProfile/UserProfile.jsx";
// import { User } from "lucide-react";
// import CompanyDetail from "./UserProfile/CompanyDatail.jsx";
// import CompanyDetailForm from "./UserProfile/ComanyDetailForm.jsx";
// import ProceedToPay from "./page/Services/document/ProceedToPay.jsx";
// import DocumentPay from "./page/Services/document/DocumentPay.jsx";
// import MyRequests from "./UserProfile/MyRequest.jsx";
// import CompletedService from "./UserProfile/CompleteService.jsx";
// import PaymentHistory from "./UserProfile/PaymentHistory.jsx";
// import BankDetails from "./UserProfile/BankDetails.jsx";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/income-tax"
//           element={
//             <>
//               <Header />
//               <IncomeTax />
//               <Footer />
//             </>
//           } />

//         <Route path="/gst"
//           element={
//             <>
//               <Header />
//               <Gst />
//               <Footer />
//             </>} />

//         <Route path="/startup" element={
//           <>   <Header />
//             <StartUp />
//             <Footer />
//           </>
//         } />

//         <Route path="/company" element={
//           <>   <Header />
//             <Company />
//             <Footer />
//           </>
//         } />
//         <Route path="/trademark" element={
//           <>   <Header />
//             <Trademark />
//             <Footer />
//           </>
//         } />
//         <Route path="/bankvaluation" element={
//           <>
//             <Header />
//             <Bankvaluation />
//             <Footer />
//           </>
//         } />
//         <Route path="/legal" element={
//           <>
//             <Header />
//             <Legal />
//             <Footer />
//           </>
//         } />
//         <Route path="/blog" element={
//           <>
//             <Header />
//             <BlogPage />
//             <Footer />
//           </>
//         } />
//         <Route path="/contact" element={
//           <>
//             <Header />
//             <Contact />
//             <Footer />
//           </>
//         } />
//         <Route path="/about" element={
//           <>
//             <Header />
//             <AboutUsPage />
//             <Footer />
//           </>
//         } />
//         <Route path="/privacy" element={
//           <>
//             <Header />
//             <PrivacyPolicy />
//             <Footer />
//           </>
//         } />
//         <Route path="/terms" element={<TermsAndConditions />} />
//         <Route path="/reseller" element={<ResellerRegistrationForm />} />
//         <Route path="/service-provider" element={<ServiceProviderForm />} />
//         <Route path="/proceed-to-pay" element={
//           <>
//             <Header />
//             <ProceedToPay />
//             <Footer />
//           </>} />
//         <Route path="/service/:service" element={
//           <>
//             <Header />
//             <DocumentPay />
//             <Footer />
//           </>} />

//         {/* <Route path="/profile" element={<UserProfile />} /> */}
//         <Route path="/profile"
//           element={
//             <>
//               <Header />
//               <UserProfile />
//               <Footer />
//             </>} />
//         <Route path="/company-details"
//           element={
//             <>
//               <Header />
//               <CompanyDetail />
//               <Footer />
//             </>} />
//         <Route path="/company-detailform"
//           element={
//             <>
//               <Header />
//               <CompanyDetailForm />
//               <Footer />
//             </>} />
//         <Route path="/myrequests"
//           element={
//             <>  <Header />
//               <MyRequests />
//               <Footer />
//             </>
//           } />
//         <Route path="/completed-services"
//           element={
//             <>  <Header />
//               <CompletedService />
//               <Footer />  
//             </>
//           } />
//           <Route path="/payment-history" element={
//             <>  <Header />
//               <PaymentHistory />
//               <Footer />
//             </>
//           } />
//           <Route path="/bank-details" element={
//             <>  <Header />
//               <BankDetails />
//               <Footer />
//             </>
//           } />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

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

import BlogPage from "./page/Blog.jsx";
import Contact from "./page/ContactPage.jsx";
import PrivacyPolicy from "./page/PrivecyPolicy.jsx";

import TermsAndConditions from "./page/TermCondition.jsx";
import ResellerRegistrationForm from "./reseller/Reseller.jsx";

import ServiceProviderForm from "./page/ServiceProvider/ServiceProvider.jsx";
import ProceedToPay from "./page/Services/document/ProceedToPay.jsx";
import DocumentPay from "./page/Services/document/DocumentPay.jsx";
import LoginForm from "./form/LoginForm.jsx";
import UserProfile from "./UserProfile/UserProfile.jsx";
import CompanyDetail from "./UserProfile/CompanyDatail.jsx";
import CompanyDetailForm from "./UserProfile/ComanyDetailForm.jsx";
import MyRequests from "./UserProfile/MyRequest.jsx";
import CompletedService from "./UserProfile/CompleteService.jsx";
import PaymentHistory from "./UserProfile/PaymentHistory.jsx";
import BankDetails from "./UserProfile/BankDetails.jsx";
  

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* Add other nested routes here */}
          <Route path="about" element={<About />} />
          <Route path="/income-tax" element={<IncomeTax />} />
          <Route path="/gst" element={<Gst />} />
          <Route path="/startup" element={<StartUp />} />  
          <Route path="/company" element={<Company />} />
          <Route path="/trademark" element={<Trademark />} />
          <Route path="/bankvaluation" element={<Bankvaluation />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/reseller" element={<ResellerRegistrationForm />} />
          <Route path="/service-provider" element={<ServiceProviderForm />} />
          <Route path="/proceed-to-pay" element={<ProceedToPay />} />
          <Route path="/service/:service" element={<DocumentPay />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/company-details" element={<CompanyDetail />} />
          <Route path="/company-detailform" element={<CompanyDetailForm />} />
          <Route path="/myrequests" element={<MyRequests />} />
          <Route path="/completed-services" element={<CompletedService />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/bank-details" element={<BankDetails />} />

        </Route>
      </Routes>
    </BrowserRouter>    
  );
}

export default App;
// Note: Ensure Header and Footer components are imported at the top
// import Header from "./component/Header.jsx";
// import Footer from "./component/Footer.jsx"; 