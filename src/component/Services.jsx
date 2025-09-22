import React, { useState } from "react";
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

function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      title: "Income Tax",
      description:
        "Get complete income tax details, ITR refund, PAN card info, and updates from the Income Tax Department.",
      icon: <FaFileInvoiceDollar className="text-blue-600 text-4xl" />,
    },
    {
      title: "GST",
      description:
        "Easily manage GST on AuditFiling: GST portal access, login, registration, status check, calculator, and more.",
      icon: <FaBalanceScale className="text-green-600 text-4xl" />,
    },
    {
      title: "Startup Registrations",
      description:
        "Complete support for Startup India, DPIIT Startup Registration, MSME/Udyam, and related services.",
      icon: <FaRocket className="text-purple-600 text-4xl" />,
    },
    {
      title: "Company (MCA)",
      description:
        "Expert services in ESI return filing, PF & ESI registration, ITR filing, and company compliance in India.",
      icon: <FaRegBuilding className="text-indigo-600 text-4xl" />,
    },
    {
      title: "Trademark",
      description:
        "We manage Trademark Registration, responses to objections, and brand protection services in India.",
      icon: <FaTrademark className="text-yellow-600 text-4xl" />,
    },
    {
      title: "Bank Valuation",
      description:
        "Reliable bank and business valuation services, wealth management, and financial advisory solutions.",
      icon: <FaUniversity className="text-red-600 text-4xl" />,
    },
    {
      title: "Legal",
      description:
        "Simplify legal work with online Legal Notices, Rent Agreements, and expert Legal Advice.",
      icon: <FaGavel className="text-teal-600 text-4xl" />,
    },
  ];
   const whyChooseUsFeatures = [
    {
      icon: <FaGem className="text-white text-xl" />,
      title: "Quality Service",
      description: "We provide top-notch service for all your business needs.",
      bg: "bg-purple-500",
    },
    {
      icon: <FaStopwatch className="text-white text-xl" />,
      title: "Fast Delivery",
      description: "Quick and reliable services that save your time.",
      bg: "bg-blue-500",
    },
    {
      icon: <FaHandPointer className="text-white text-xl" />,
      title: "User Friendly",
      description: "We focus on simplicity and usability in every project.",
      bg: "bg-cyan-500",
    },
    {
      icon: <FaHeart className="text-white text-xl" />,
      title: "Customer Support",
      description: "Always here to help and support our customers.",
      bg: "bg-gray-500",
    },
  ];

  const expertiseFeatures = [
    {
      icon: <FaGem className="text-white text-xl" />,
      title: "Web Development",
      description: "Custom websites and web apps built with modern tech.",
      bg: "bg-purple-500",
    },
    {
      icon: <FaStopwatch className="text-white text-xl" />,
      title: "App Development",
      description: "Mobile apps optimized for performance and usability.",
      bg: "bg-blue-500",
    },
    {
      icon: <FaHandPointer className="text-white text-xl" />,
      title: "UI/UX Design",
      description: "Designs that are both attractive and user-friendly.",
      bg: "bg-cyan-500",
    },
    {
      icon: <FaHeart className="text-white text-xl" />,
      title: "Digital Marketing",
      description: "Strategies that help your business grow online.",
      bg: "bg-gray-500",
    },
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
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 relative inline-block">
              Services We Provide
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full"></span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive legal and financial services to meet all your
              business needs
            </p>
          </div>

          {/* Grid for all except last 3 */}
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.slice(0, services.length - 3).map((service, index) => (
              <div
                key={index}
                className="bg-blue-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-center gap-3 mb-4 ">
                  <div className=" rounded-full bg-gray-100">{service.icon}</div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-900 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <button className=" hover:text-blue-800 font-medium flex items-center gap-2 transition-all duration-300 ">
                  Learn more
                  <svg
                    className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
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
                </button>
              </div>
            ))}
          </div>

          {/* Last 3 Centered */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {services.slice(-3).map((service, index) => (
              <div
                key={index}
                className="bg-blue-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 w-full sm:w-80"
                onMouseEnter={() => setHoveredCard(index)}

                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className=" rounded-full bg-gray-100">{service.icon}</div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-900 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <button className=" hover:text-blue-800 font-medium flex items-center gap-2 transition-all duration-300 hover:underline">
                  Learn more
                  <svg
                    className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
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
                </button>
              </div>
            ))}
          </div>
        </div>
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
