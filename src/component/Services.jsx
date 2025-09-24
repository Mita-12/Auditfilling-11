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

  const renderColumn = (titleLines, features, circleBg) => (
    <div className="flex flex-col md:flex-row items-center gap-8">
      {/* Circle */}
      <div className="relative flex-shrink-0">
        <div className={`w-48 h-48 rounded-full ${circleBg} flex flex-col justify-center items-center text-center shadow-lg`}>
          {titleLines.map((line, idx) => (
            <h3 key={idx} className="text-white text-lg font-bold">{line}</h3>
          ))}
        </div>
      </div>

      {/* Middle Faded Circle */}
      <div className="absolute md:hidden left-1/2 transform -translate-x-1/2 w-80 h-80 bg-gray-200 rounded-full opacity-50 -z-10"></div>

      {/* Features */}
      <div className="flex flex-col gap-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-5">
            <div className={`w-12 h-12 rounded-full ${feature.bg} flex items-center justify-center shadow-md`}>
              {feature.icon}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{feature.title}</h4>
              <p className="text-gray-600 text-sm max-w-xs">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="bg-gray-50">
      {/* Services */}
   <section className="py-12 bg-white">
  <div className="container mx-auto px-6">
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {services.slice(0, services.length - 3).map((service, index) => (
        <div
          key={index}
          className="group rounded-2xl p-6 shadow-lg transition-all duration-700 ease-out hover:-translate-y-3 hover:shadow-xl"
          style={{ animation: `fadeInUp 0.6s ease ${index * 0.15}s both` }}
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

      {/* WHY CHOOSEUS */}
     <section className="py-16 bg-gray-50">
      <div className="container mx-auto grid md:grid-cols-2 gap-16">
        {/* Left Column: Why Choose Us */}
        {renderColumn(["WHY", "CHOOSE", "US"], whyChooseUsFeatures, "bg-gradient-to-br from-purple-500 to-indigo-500")}

        {/* Right Column: Our Area Of Expertise */}
        {renderColumn(["OUR", "AREA OF", "EXPERTISE"], expertiseFeatures, "bg-gradient-to-br from-green-500 to-teal-500")}
      </div>
    </section>


    </div>
  );
}

export default ServicesSection;
