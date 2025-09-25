import React from "react";

function Herosection() {
  return (
<section className="w-full min-h-[96vh] flex items-center justify-center bg-white text-gray-900">
  <div className="mx-auto text-center rounded-2xl px-8 md:px-20 py-12 max-w-7xl">
    <h1 className="text-4xl md:text-5xl font-extrabold font-serif leading-tight">
      Trusted Legal Services <br />
      for Your Business & Compliance
    </h1>

    <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
      From <span className="font-bold text-blue-600">Company Registration</span> to 
      <span className="text-blue-600 font-bold"> GST, Trademarks,</span> and 
      <span className="text-blue-600 font-bold"> Compliance</span> – 
      <span className="font-bold text-gray-900"> AuditFiling</span> is your one-stop partner 
      for all legal and financial needs.
    </p>

    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href="#contact"
        className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-md shadow-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
      >
        Get Started
      </a>
      <a
        href="#services"
        className="border border-blue-600 text-blue-600 px-8 py-3 rounded-md hover:bg-blue-50 hover:text-blue-700 hover:scale-105 transition-transform duration-300"
      >
        Explore Services
      </a>
    </div>

    <div className="mt-12 inline-block bg-white/80 backdrop-blur-md rounded-lg px-6 py-3 shadow-lg">
      <p className="text-sm md:text-base text-gray-800 font-medium">
        ✅ Trusted by <span className="text-blue-600 font-semibold">500+ Businesses</span> | ⚖️ Expert Legal Professionals
      </p>
    </div>
  </div>
  
</section>

  );
}


export default Herosection;
