import React from "react";
import { motion } from "framer-motion";


// import WhoWeAreImg from "../assets/images/who-we-are.jpg"; // Make sure the path is correct

export default function Herosection() {
  return (
    <>
      {/* Hero Section */}
     <section className="w-full min-h-[70vh] flex flex-col items-center justify-center    text-[#222222] text-center  px-6 md:px-12 py-16 ">
  {/* Hero Heading */}
  <h1 className="text-5xl  font-bold font-serif  mt-15 pt-15 leading-tight " >
    Trusted Legal Services <br />
    <h1>for Your <span className="text-black pt-5">Business & Compliance</span></h1>
    
  </h1>

  {/* Subheading */}
  <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl pt-5 mx-auto leading-relaxed">
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
      href="contact"
      className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
    >
      Get Started
    </a>
    <a
      href="services"
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
 <section className="w-full bg-gray-50 py-12">
      <div className="flex flex-col-reverse md:flex-row items-center gap-10 px-6 sm:px-12 md:px-28">

        {/* Text Content */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 font-serif leading-tight">
            Who Are We?
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
            With experienced attorneys, we can handle a broad range of compliance issues
            for businesses, government entities, organizations, professionals, and individuals
            at the local, regional, and national levels.
            <br /><br />
            Through more than 15 years of expertise,{" "}
            <span className="font-bold text-blue-600">AuditFiling</span>{" "}
            has become a trusted partner for startups, SMEs, and large corporations alike.
          </p>

          <motion.a
            href="/contact"
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center md:justify-end mb-6 md:mb-0"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.img
            src="/img/support.jpg"
            alt="Who Are We"
            loading="lazy"
            className="w-full sm:w-4/5 md:w-full rounded-sm shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          />
        </motion.div>

      </div>
    </section>




    </>
  );
}

// import React from "react";

// export default function Herosection() {
//   return (
//     <>
//       {/* Hero Section */}
//       <section className="relative w-full min-h-screen flex items-center justify-center bg-white overflow-hidden">
//         {/* Background Elements - Subtle & Clean */}
//         <div className="absolute top-20 left-10 w-16 h-16 bg-blue-50 rounded-full opacity-60"></div>
//         <div className="absolute bottom-40 right-16 w-24 h-24 bg-gray-50 rounded-full opacity-40"></div>
//         <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-blue-50 rounded-full opacity-30"></div>
        
//         <div className="relative z-10 text-center px-6 md:px-12 py-20 max-w-6xl mx-auto">
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 bg-gray-50 rounded-full px-6 py-3 border border-gray-100 mb-8">
//             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//             <p className="text-sm md:text-base text-gray-700 font-medium font-sans">
//               Trusted by <span className="text-blue-600 font-semibold">500+ Businesses</span> Worldwide
//             </p>
//           </div>

//           {/* Hero Heading */}
//           <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6 font-serif">
//             Trusted Legal Services
//             <br />
//             for Your{" "}
//             <span className="text-blue-600 font-serif">
//               Business & Compliance
//             </span>
//           </h1>

//           {/* Subheading */}
//           <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8 font-serif">
//             From{" "}
//             <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded font-serif">Company Registration</span>{" "}
//             to{" "}
//             <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded font-serif">GST & Trademarks</span>{" "}
//             — Your all-in-one legal partner
//           </p>

//           {/* Hero Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
//             <a
//               href="contact"
//               className="group relative bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 min-w-[160px] text-center font-serif"
//             >
//               Get Started
//             </a>
//             <a
//               href="services"
//               className="group border-2 border-blue-600 text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105 min-w-[160px] text-center font-serif"
//             >
//               Explore Services
//             </a>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
//             {[
//               { number: "15+", label: "Years Experience" },
//               { number: "500+", label: "Happy Clients" },
//               { number: "24/7", label: "Support" },
//               { number: "99%", label: "Success Rate" }
//             ].map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="text-2xl md:text-3xl font-bold text-gray-900 font-serif">{stat.number}</div>
//                 <div className="text-sm text-gray-600 font-sans mt-1">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
//           <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
//             <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
//           </div>
//         </div>
//       </section>

//       {/* Who We Are Section */}
//       <section className="relative w-full py-24 bg-gray-50 overflow-hidden">
//         <div className="max-w-7xl mx-auto px-6 md:px-12">
//           <div className="flex flex-col lg:flex-row items-center gap-20">
//             {/* Image Section */}
//             <div className="w-full lg:w-1/2 relative">
//               <div className="relative">
//                 {/* Main Image */}
//                 <img
//                   src="/img/support.jpg"
//                   alt="Who Are We"
//                   loading="lazy"
//                   className="w-full rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
//                 />
                
//                 {/* Experience Badge */}
//                 <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white px-6 py-4 rounded-lg shadow-lg">
//                   <div className="text-2xl font-bold font-serif">15+</div>
//                   <div className="text-sm font-sans">Years Experience</div>
//                 </div>
//               </div>
//             </div>

//             {/* Text Content */}
//             <div className="w-full lg:w-1/2">
//               {/* Section Label */}
//               <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6 font-sans">
//                 About Us
//               </div>

//               <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight font-serif">
//                 Who Are <span className="text-blue-600">We?</span>
//               </h2>

//               <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-serif">
//                 <p>
//                   With experienced attorneys, we handle a broad range of compliance issues 
//                   for businesses, government entities, organizations, and professionals 
//                   at local, regional, and national levels.
//                 </p>
                
//                 <p>
//                   Through more than <span className="font-semibold text-blue-600">15 years of expertise</span>, 
//                   <span className="font-bold text-gray-900"> AuditFiling</span> has become a trusted partner 
//                   for startups, SMEs, and large corporations alike.
//                 </p>
//               </div>

//               {/* Features List */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
//                 {[
//                   "Expert Legal Team",
//                   "24/7 Customer Support",
//                   "Fast Processing",
//                   "100% Compliance"
//                 ].map((feature, index) => (
//                   <div key={index} className="flex items-center gap-3">
//                     <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
//                       <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                     </div>
//                     <span className="text-gray-700 font-medium font-serif">{feature}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* CTA Button */}
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <a 
//                   href="/contact" 
//                   className="group bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 text-center font-serif"
//                 >
//                   Get In Touch
//                 </a>
//                 <a 
//                   href="/about" 
//                   className="group border-2 border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300 text-center font-serif"
//                 >
//                   Learn More
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }