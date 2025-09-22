import React from "react";

function Herosection() {
  return (
  <section
  className=" bg-black/50 text-white py-28 px-6 mt-10"
  // style={{ backgroundImage: "url('public/img/bgimag.jpg')" }}
>
  {/* Dark overlay */}
  {/* <div className=" bg-black/60"></div> */}

  <div className="relative container mx-auto text-center max-w-4xl">
    {/* Headline */}
    <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight">
      Trusted Legal Services <br />
      for Your Business & Compliance
    </h1>

    {/* Subtext */}
    <p className="mt-6 text-lg md:text-xl text-gray-200">
      From company registration to GST, trademarks, and compliance –  
      <span className="font-semibold"> AuditFiling</span> is your one-stop partner 
      for all legal and financial needs.
    </p>

    {/* CTA Buttons */}
    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href="#contact"
        className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow-lg hover:bg-blue-700 transition"
      >
        Get Started
      </a>
      <a
        href="#services"
        className="border border-white text-white px-6 py-3 rounded-md hover:bg-white/20 transition"
      >
        Explore Services
      </a>
    </div>

    {/* Credibility badge */}
    <div className="mt-12 bg-gray-800 backdrop-blur-md rounded-lg p-6 inline-block shadow-md">
      <p className="text-sm text-gray-100">
        ✅ Trusted by 500+ Businesses | ⚖️ Expert Legal Professionals
      </p>
    </div>
  </div>
</section>

  );
}

export default Herosection;
