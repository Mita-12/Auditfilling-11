import React from "react";
// import WhoWeAreImg from "../assets/images/who-we-are.jpg"; // Make sure the path is correct

export default function Herosection() {
  return (
    <>
      {/* Hero Section */}
     <section className="w-full min-h-[70vh] flex flex-col items-center justify-center  text-gray-900 text-center  px-6 md:px-12 py-16 ">
  {/* Hero Heading */}
  <h1 className="text-4xl md:text-6xl font-bold font-serif mt-25 leading-tight ">
    Trusted Legal Services <br />
    for Your <span className="text-black">Business & Compliance</span>
  </h1>

  {/* Subheading */}
  <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
    From{" "}
    <span className="font-semibold text-blue-600">Company Registration</span>{" "}
    to{" "}
    <span className="text-blue-600 font-semibold">GST, Trademarks</span>, and{" "}
    <span className="text-blue-600 font-semibold">Compliance</span> —{" "}
    <span className="font-bold text-gray-900">AuditFiling</span> is your trusted
    one-stop partner for all legal and financial needs.
  </p>

  {/* Hero Buttons */}
  <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
    <a
      href="#contact"
      className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
    >
      Get Started
    </a>
    <a
      href="#services"
      className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 hover:scale-105 transition-transform duration-300"
    >
      Explore Services
    </a>
  </div>

  {/* Trust Badge */}
  <div className="mt-12 inline-flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-lg px-6 py-3 shadow-lg border">
    <span className="text-lg">✅</span>
    <p className="text-sm md:text-base text-gray-800 font-medium">
      Trusted by <span className="text-blue-600 font-semibold">500+ Businesses</span> | ⚖️ Expert Legal Professionals
    </p>
  </div>
</section>

{/* Hero-style Section (ThemeForest Layout) with your content */}
<section className="w-full ">
  <div className="flex flex-col-reverse md:flex-row items-center gap-10 px-6 md:px-25 ">

    {/* Text Content */}
    <div className="w-full md:w-1/2 text-center md:text-left">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 font-serif leading-tight">
        Who Are We?
      </h2>
      <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
        With experienced attorneys, we can handle a broad range of compliance issues 
        for businesses, government entities, organizations, professionals, and individuals 
        at the local, regional, and national levels.
        <br /><br />
        Through more than 15 years of expertise, <span className="font-bold text-blue-600">AuditFiling</span> 
        has become a trusted partner for startups, SMEs, and large corporations alike.
      </p>

      {/* Call-to-Action Button */}
      <a 
        href="/contact" 
        className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Get In Touch
      </a>
    </div>

    {/* Image */}
    <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-6 md:mb-0">
      <img
        src="/img/support.jpg"
        alt="Who Are We"
        className="w-full sm:w-4/5 md:w-full rounded-sm hover:scale-105 transition-transform duration-300"
      />
    </div>

  </div>
</section>




    </>
  );
}
