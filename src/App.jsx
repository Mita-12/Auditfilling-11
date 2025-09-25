import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header.jsx";
import Herosection from "./component/Herosection.jsx";
import Footer from "./component/Footer.jsx";
import ServicesSection from "./component/Services.jsx";
import IncomeTax from "./page/Services/IncomeTax.jsx";
import Gst from "./page/Services/Gst.jsx";
import WhatsAppPopup from "./form/WhatsAppPopup.jsx";
import StartUp from "./page/Startup.jsx";
import BlogPage from "./page/Blog.jsx";
import Company from "./page/Services/Company.jsx";
import Trademark from "./page/Services/TradeMark.jsx";
import Legal from "./page/Services/Legal.jsx";
import Bankvaluation from "./page/Services/BankValuation.jsx";
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
                <Route path="/company" element={<Company />} />
                <Route path="/trademark" element={<Trademark />} />
                                                <Route path="/bankvaluation" element={<Bankvaluation />} />

                                <Route path="/legal" element={<Legal />} />




        <Route path="/blog" element={<BlogPage />} />



      </Routes>
    </Router>
  );
}

export default App;
