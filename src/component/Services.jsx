import { useState } from "react";
import React from "react";
import { FaBalanceScale, FaFileInvoiceDollar, FaRegBuilding, FaTrademark, FaUniversity, FaGavel, FaRocket } from "react-icons/fa";
import { FaLock, FaMoneyBillWave, FaCheckCircle, FaUserGraduate, FaBuilding, FaReceipt, FaUserFriends, FaHome } from "react-icons/fa";

function ServicesSection() {
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
      link: "/startup-registrations",
    },
    {
      title: "Company (MCA)",
      description: "Expert services in ESI return filing, PF & ESI registration, ITR filing, and company compliance in India.",
      icon: <FaRegBuilding className="text-indigo-600 text-4xl" />,
      link: "/company-mca",
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
      link: "/bank-valuation",
    },
    {
      title: "Legal",
      description: "Simplify legal work with online Legal Notices, Rent Agreements, and expert Legal Advice.",
      icon: <FaGavel className="text-teal-600 text-4xl" />,
      link: "/legal",
    },
  ];

  const whyChooseUsFeatures = [
    { icon: <FaLock className="text-white text-2xl" />, title: "Confidential & Safe", description: "Complete safety of documents and client data.", bg: "bg-gradient-to-r from-blue-600 to-indigo-700" },
    { icon: <FaMoneyBillWave className="text-white text-2xl" />, title: "No Hidden Fee", description: "We maintain transparency without hidden charges.", bg: "bg-gradient-to-r from-emerald-500 to-teal-600" },
    { icon: <FaCheckCircle className="text-white text-2xl" />, title: "Guaranteed Satisfaction", description: "Dedicated services guarantee client satisfaction.", bg: "bg-gradient-to-r from-amber-500 to-orange-600" },
    { icon: <FaUserGraduate className="text-white text-2xl" />, title: "Expert CA/CS Assistance", description: "Professional assistance from in-house CA/CS experts.", bg: "bg-gradient-to-r from-purple-600 to-pink-700" },
  ];

  const expertiseFeatures = [
    { icon: <FaBuilding className="text-white text-2xl" />, title: "Company Incorporation & Compliance", description: "End-to-end company registration, ROC filing, and compliance.", bg: "bg-slate-800" },
    { icon: <FaReceipt className="text-white text-2xl" />, title: "GST Registration & Filing", description: "Complete GST solutions including registration and audit support.", bg: "bg-blue-700" },
    { icon: <FaUserFriends className="text-white text-2xl" />, title: "Employee Compliance (PF/ESI/Labour)", description: "Comprehensive HR compliance management.", bg: "bg-emerald-600" },
    { icon: <FaHome className="text-white text-2xl" />, title: "Property Documentation & Disputes", description: "Expert assistance with property registration and legal dispute resolution.", bg: "bg-amber-600" },
  ];

  return (
    <div className="bg-gray-50 mt-10">
      {/* Services Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 font-serif">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 relative inline-block">
              Services We Provide
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full"></span>
            </h2>
            <p className="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive legal and financial services to meet all your business needs
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group rounded-2xl p-5 sm:p-6 shadow-lg transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-full bg-gray-100 p-3 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg font-serif group-hover:text-blue-700">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3 group-hover:text-gray-900">
                  {service.description}
                </p>
                <a
                  href={service.link}
                  className="font-medium flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-transform"
                >
                  Learn more
                  <svg
                    className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
          
        </div>

      </section>

      {/* WHY CHOOSE US + Expertise */}
      <section className="bg-white py-12 px-4">
        <div className="container mx-auto lg:px-0">
          <div className="text-center mb-12 font-serif">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-600">AuditFiling</span>
            </h2>
            <p className="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">
              Experience the difference with our professional approach and comprehensive legal solutions.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              {whyChooseUsFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-lg mb-1 font-serif">{feature.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              {expertiseFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-lg mb-1 font-serif">{feature.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicesSection;
