import { useState } from "react";
import { useNavigate } from "react-router-dom";

import React from "react";
import { FaBalanceScale, FaFileInvoiceDollar, FaRegBuilding, FaTrademark, FaUniversity, FaGavel, FaRocket } from "react-icons/fa";
import { FaLock, FaMoneyBillWave, FaCheckCircle, FaUserGraduate, FaBuilding, FaReceipt, FaUserFriends, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";

function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const services = [
    {
      title: "Income Tax",
      description: "Get complete income tax details, ITR refund, PAN card info, and updates from the Income Tax Department.",
      icon: <FaFileInvoiceDollar className="text-blue-600 text-4xl" />,
      link: "/income-tax",
    },
    {
      title: "GST",
      description: "Easily manage GST on AuditFiling: GST portal access, login, registration, status check, calculator, and more.",
      icon: <FaBalanceScale className="text-green-600 text-4xl" />,
      link: "/gst",
    },
    {
      title: "Startup Registrations",
      description: "Complete support for Startup India, DPIIT Startup Registration, MSME/Udyam, and related services.",
      icon: <FaRocket className="text-purple-600 text-4xl" />,
      link: "/startup",
    },
    {
      title: "Company (MCA)",
      description: "Expert services in ESI return filing, PF & ESI registration, ITR filing, and company compliance in India.",
      icon: <FaRegBuilding className="text-indigo-600 text-4xl" />,
      link: "/company",
    },
    {
      title: "Trademark",
      description: "We manage Trademark Registration, responses to objections, and brand protection services in India.",
      icon: <FaTrademark className="text-yellow-600 text-4xl" />,
      link: "/trademark",
    },
    {
      title: "Bank Valuation",
      description: "Reliable bank and business valuation services, wealth management, and financial advisory solutions.",
      icon: <FaUniversity className="text-red-600 text-4xl" />,
      link: "/bankvaluation",
    },
    {
      title: "Legal",
      description: "Simplify legal work with online Legal Notices, Rent Agreements, and expert Legal Advice.",
      icon: <FaGavel className="text-teal-600 text-4xl" />,
      link: "/legal",
    },
  ];



  return (
    <div className=" ">
      {/* Services Section */}

      <section className="py-5">
        <div className="container mx-auto px-12">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold font-serif text-gray-900 mb-4 relative inline-block">
              Services We Provide
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full"></span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive legal and financial services to meet all your
              business needs
            </p>
          </div>

          {/* Grid for all except last 3 */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {services.slice(0, services.length - 3).map((service, index) => (
              <motion.div
                onClick={() => navigate(service.link)}

                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer"
                whileHover={{ scale: 1.05, y: -8, boxShadow: "0px 10px 25px rgba(0,0,0,0.1)" }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-gray-100">{service.icon}</div>
                  <h3 className="font-semibold font-serif text-gray-900 text-lg">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <motion.button
                  onClick={() => navigate(service.link)}
                  whileHover={{ x: 4 }}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-all duration-300 hover:underline"
                >
                  Learn more
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {/* Last 3 Centered */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mt-12"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {services.slice(-3).map((service, index) => (
              <motion.div
                onClick={() => navigate(service.link)}

                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer w-full sm:w-80"
                whileHover={{ scale: 1.05, y: -8, boxShadow: "0px 10px 25px rgba(0,0,0,0.1)" }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-gray-100">{service.icon}</div>
                  <h3 className="font-semibold font-serif text-gray-900 text-lg">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <motion.button
                  onClick={() => navigate(service.link)}
                  whileHover={{ x: 4 }}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-all duration-300 hover:underline"
                >
                  Learn more
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <section className="w-full bg-white 
       ">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-14 md:gap-30 max-w-7xl mx-auto px-6 sm:px-10 md:px-12">

          {/* Image */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center md:justify-end"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.img
              src="/img/support.jpg"
              alt="Who Are We"
              loading="lazy"
              className="w-full sm:w-4/5 md:w-full rounded-2xl  object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 font-serif leading-tight text-gray-900">
              Who Are We?
            </h1>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
              With experienced attorneys, we handle a broad range of compliance issues
              for businesses, government entities, organizations, professionals, and individuals
              at the local, regional, and national levels.
              <br /><br />
              Through more than 15 years of expertise,{" "}
              <span className="font-bold text-blue-600">AuditFiling</span> has become a trusted
              partner for startups, SMEs, and large corporations alike.
            </p>

            <motion.a
              href="/contact"
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 shadow-md transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

export default ServicesSection;
