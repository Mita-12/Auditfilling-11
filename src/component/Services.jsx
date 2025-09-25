import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBalanceScale,
  FaFileInvoiceDollar,
  FaRegBuilding,
  FaTrademark,
  FaUniversity,
  FaGavel,
  FaRocket,
} from "react-icons/fa";
import { FaGem, FaStopwatch, FaHandPointer, FaHeart } from "react-icons/fa";
import { FaLock, FaMoneyBillWave, FaCheckCircle, FaUserGraduate, FaBuilding, FaReceipt, FaUserFriends, FaHome } from "react-icons/fa";
function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      title: "Income Tax",
      description:
        "Get complete income tax details, ITR refund, PAN card info, and updates from the Income Tax Department.",
      icon: <FaFileInvoiceDollar className="text-blue-600 text-4xl" />,
      link: "/income-tax",
    },
    {
      title: "GST",
      description:
        "Easily manage GST on AuditFiling: GST portal access, login, registration, status check, calculator, and more.",
      icon: <FaBalanceScale className="text-green-600 text-4xl" />,
      link: "/gst"
    },
    {
      title: "Startup Registrations",
      description:
        "Complete support for Startup India, DPIIT Startup Registration, MSME/Udyam, and related services.",
      icon: <FaRocket className="text-purple-600 text-4xl" />,
      link: "/startup-registrations"
    },
    {
      title: "Company (MCA)",
      description:
        "Expert services in ESI return filing, PF & ESI registration, ITR filing, and company compliance in India.",
      icon: <FaRegBuilding className="text-indigo-600 text-4xl" />,
      link: "/company-mca"
    },
    {
      title: "Trademark",
      description:
        "We manage Trademark Registration, responses to objections, and brand protection services in India.",
      icon: <FaTrademark className="text-yellow-600 text-4xl" />,
      link: "/trademark"
    },
    {
      title: "Bank Valuation",
      description:
        "Reliable bank and business valuation services, wealth management, and financial advisory solutions.",
      icon: <FaUniversity className="text-red-600 text-4xl" />,
      link: "/bank-valuation"
    },
    {
      title: "Legal",
      description:
        "Simplify legal work with online Legal Notices, Rent Agreements, and expert Legal Advice.",
      icon: <FaGavel className="text-teal-600 text-4xl" />,
      link: "/legal"
    },
  ];

  const whyChooseUsFeatures = [
    {
      icon: <FaLock className="text-white text-2xl" />,
      title: "Confidential & Safe",
      description: "Enjoy our services that ensure complete safety of documents and the confidentiality of client's data.",
      bg: "bg-gradient-to-r from-blue-600 to-indigo-700",
    },
    {
      icon: <FaMoneyBillWave className="text-white text-2xl" />,
      title: "No Hidden Fee",
      description: "We maintain transparency and do not add any kind of hidden charges without the client's knowledge.",
      bg: "bg-gradient-to-r from-emerald-500 to-teal-600",
    },
    {
      icon: <FaCheckCircle className="text-white text-2xl" />,
      title: "Guaranteed Satisfaction",
      description: "The dedicated services from our well experienced experts guarantee our client's satisfaction.",
      bg: "bg-gradient-to-r from-amber-500 to-orange-600",
    },
    {
      icon: <FaUserGraduate className="text-white text-2xl" />,
      title: "Expert CA/CS Assistance",
      description: "Our in house CA and CS experts provide professional assistance/guidance service related to various legal issues.",
      bg: "bg-gradient-to-r from-purple-600 to-pink-700",
    },
  ];

  const expertiseFeatures = [
    {
      icon: <FaBuilding className="text-white text-2xl" />,
      title: "Company Incorporation & Compliance",
      description: "End-to-end company registration, ROC filing, and ongoing compliance management.",
      bg: "bg-slate-800",
    },
    {
      icon: <FaReceipt className="text-white text-2xl" />,
      title: "GST Registration & Filing",
      description: "Complete GST solutions including registration, returns, and audit support.",
      bg: "bg-blue-700",
    },
    {
      icon: <FaUserFriends className="text-white text-2xl" />,
      title: "Employee Compliance (PF/ESI/Labour)",
      description: "Comprehensive HR compliance management for provident fund and labor laws.",
      bg: "bg-emerald-600",
    },
    {
      icon: <FaHome className="text-white text-2xl" />,
      title: "Property Documentation & Disputes",
      description: "Expert assistance with property registration and legal dispute resolution.",
      bg: "bg-amber-600",
    }
  ];

 
  return (
    <div className="bg-gray-50 mt-10">
      {/* Services */}
      <section className=" bg-white">
        <div className="container mx-auto px-11">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 relative inline-block">
              Services We Provide
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full"></span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive legal and financial services to meet all your business needs
            </p>
          </div>

          {/* Grid for all except last 3 */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
              {services.slice(0, services.length - 3).map((service, index) => (
                <div
                  key={index}
                  className="group rounded-2xl p-6 shadow-lg transition-all duration-700 ease-out hover:-translate-y-3 hover:shadow-xl "
                  style={{ animation: `fadeInUp 0.6s ease ${index * 0.15}s both` }}
                >
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-full bg-gray-100 p-3 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ">
                      {service.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg transition-colors duration-300 group-hover:text-blue-700 ">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 transition-colors duration-300 group-hover:text-gray-900">
                    {service.description}
                  </p>

                  {/* Learn More Link */}
                  <a
                    href={service.link}
                    className="font-medium flex items-center gap-2 transition-all duration-300 text-blue-600 hover:text-blue-800"
                  >
                    Learn more
                    <svg
                      className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>


          {/* Last 3 Centered */}
          <div className="flex flex-wrap justify-center gap-8 mt-16">
            {services.slice(-3).map((service, index) => (
              <div
                key={index}
                className="group  rounded-2xl p-6 shadow-lg transition-all duration-700 ease-out hover:-translate-y-3 hover:shadow-xl w-full sm:w-80"
                style={{ animation: `fadeInUp 0.6s ease ${(index + services.length - 3) * 0.15}s both` }}
              >
                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full bg-gray-100 p-3 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg transition-colors duration-300 group-hover:text-blue-700">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4 transition-colors duration-300 group-hover:text-gray-900">
                  {service.description}
                </p>

                {/* Learn More Link */}
                <a
                  href={service.link}
                  className="font-medium flex items-center gap-2 transition-all duration-300 text-blue-600 hover:text-blue-800"
                >
                  Learn more
                  <svg
                    className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Animations */}
        <style jsx>{`
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}</style>
      </section>

      {/* WHY CHOOSE US Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-600">AuditFiling</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference with our professional approach and comprehensive legal solutions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">

            {/* Left Column: Why Choose Us */}
            <div className="relative">
              {/* Background Decorative Element */}
              <div className="absolute -top-6 -left-6 w-24 h-24  rounded-full opacity-60 blur-xl"></div>

              <div className=" rounded-2xl p-8 relative z-10 border border-gray-100">
                {/* Header with Icon */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <FaLock className="text-white text-xl" />   </div>
                  <h3 className="text-2xl font-bold text-gray-900">Why Choose Us</h3>
                </div>

                {/* Features Grid */}
                <div className="grid gap-6">
                  {whyChooseUsFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
                      <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center flex-shrink-0 shadow-md`}>
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg mb-1">{feature.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Our Area Of Expertise */}
            <div className="relative">
              {/* Background Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-green-100 rounded-full opacity-60 blur-xl"></div>

              <div className=" rounded-2xl  p-8 relative z-10 border border-gray-100">
                {/* Header with Icon */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <FaBuilding className="text-white text-xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Our Area Of Expertise</h3>
                </div>

                {/* Features Grid */}
                <div className="grid gap-6">
                  {expertiseFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-300">
                      <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center flex-shrink-0 shadow-md`}>
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg mb-1">{feature.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


    </div>
  );
}

export default ServicesSection;
