// Home.jsx
import React from "react";
import Header from "../component/Header";
import ServicesSection from "../component/Services";
import Testimonials from "./Testimonial";
import Footer from "../component/Footer";
import WhatsAppPopup from "../form/WhatsAppPopup";
import Herosection from "../component/Herosection";
;

function Home() {
  return (
    <>
      <Header />
      <Herosection />
      <ServicesSection />
      <Testimonials />
       <WhatsAppPopup />
      <Footer />
     
    </>
  );
}

export default Home;
