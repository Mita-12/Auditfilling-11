import React from "react";
import { motion } from "framer-motion";

// import WhoWeAreImg from "../assets/images/who-we-are.jpg"; // Make sure the path is correct


export default function Herosection() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full min-h-[70vh] flex flex-col items-center justify-center bg-white text-[#222222] text-center px-6 md:px-12">
        {/* Hero Heading */}
        <h1 className="text-5xl font-bold font-serif  mt-25 pt-20 leading-tight">
          Trusted Legal Services 


          
          <br />
          for Your <span className="text-black ">Business & Compliance</span>
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
        <div className="mt-10 inline-flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-lg px-6 py-3 shadow-lg border">
          <span className="text-lg">✅</span>
          <p className="text-sm md:text-base text-gray-800 font-medium">
            Trusted by <span className="text-blue-600 font-semibold">500+ Businesses</span> | ⚖️ Expert Legal Professionals
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="w-full bg-white">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-14 md:gap-30 max-w-7xl mx-auto px-6">

          {/* Image */}
          <motion.div
            className="w-full md:w-2/3 flex justify-center"
            // initial={{ opacity: 0, x: 80 }}
            // whileInView={{ opacity: 1, x: 0 }}
            // transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            // viewport={{ once: true }}
          >
            <motion.img
              src="/img/support.jpg"
              alt="Who Are We"
              
              className="w-full rounded-2xl object-cover"
              // whileHover={{ scale: 1.05 }}
              // transition={{ type: "spring", stiffness: 200, damping: 12 }}
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-6 font-serif leading-tight text-gray-900">
              Who Are We?
            </h1>
            <div className="text-justify p-0">
              <p className="text-base sm:text-lg text-gray-700 leading-loose tracking-wide">
                At Auditfiling, we believe legal and tax compliance shouldn't be complicated or stressful. We're here to make it simple, reliable, and accessible for everyone from small startups to growing enterprises.
                <br /><br />
                As a proud part of{" "}
                <span className="font-bold text-blue-600">Cloudsat Pvt. Ltd.</span>, headquartered in Gurugram, Auditfiling has been helping businesses across India for over 7 years.
              </p>
            </div>
            <motion.a
              href="/about"
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 shadow-md transition-colors mt-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
