// // Home.jsx
// import React from "react";
// import Header from "../component/Header";
// import ServicesSection from "../component/Services";
// import Testimonials from "./Testimonial";
// import Footer from "../component/Footer";
// import WhatsAppPopup from "../form/WhatsAppPopup";
// import Herosection from "../component/Herosection";
// import NotificationUpdates from "./Notification";
// import WhyChooseUs from "./WhyChooseUs"
// ;
// import Auditfile from "./Auditfile";

// function Home() {
//   return (
//     <>
//       <Header />
//       <Herosection />
//       <ServicesSection />
//       <Auditfile/>
//       <NotificationUpdates/>
//       <WhyChooseUs/>
//       <Testimonials />
//        <WhatsAppPopup />
//       <Footer />

//     </>
//   );
// }

// export default Home;
// Home.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Herosection from "../component/Herosection";
import ServicesSection from "../component/Services";
import Testimonials from "./Testimonial";
import WhatsAppPopup from "../form/WhatsAppPopup";
import Auditfile from "./Auditfile";
import NotificationUpdates from "./Notification";
import WhyChooseUs from "./WhyChooseUs";



function Home() {
  return (
    <>
<WhatsAppPopup />
      <Herosection />
      <ServicesSection />
      <Auditfile />
      <NotificationUpdates />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}

export default Home;
