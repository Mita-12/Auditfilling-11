import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header.jsx";
import Herosection from "./component/Herosection.jsx";
import Footer from "./component/Footer.jsx";
import ServicesSection from "./component/Services.jsx";
import IncomeTax from "./page/IncomeTax.jsx";
import Gst from "./page/Gst.jsx";
import WhatsAppPopup from "./form/WhatsAppPopup.jsx";
import StartUp from "./page/Startup.jsx";
// import Cleartax from "./page/Cleartax.jsx";

function App() {
  return (
    <Router> {/* <-- Router wraps everything */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Herosection />
              <ServicesSection />
              <Footer />
              <WhatsAppPopup />

            </>
          }
        />
        <Route path="/income-tax" element={<IncomeTax />} />
        <Route path="/gst" element={<Gst />} />
        <Route path="/startup" element={<StartUp />} />
        {/* <Route path="/cleartax" element={<Cleartax />} /> */}


      </Routes>
    </Router>
  );
}

export default App;
