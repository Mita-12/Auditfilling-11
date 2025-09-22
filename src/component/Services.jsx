import React, { useState } from "react";

function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      title: "Income Tax",
      description: "Get complete income tax details, itr refund status, pan card info, and updates from Income Tax Department on the official income tax portal in...",
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      ),
      color: "blue"
    },
    {
      title: "GST",
      description: "Easily manage GST on AuditFiling: Gst portal access, Gst login, Gst registration, check GST registration status, documents, fees, calculator,...",
      icon: (
        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      ),
      color: "green"
    },
    {
      title: "Startup Registrations",
      description: "Gst complete support for Startup Registration in India, including DPIIT Startup Registration (DIPP) under Startup India, MSME/Udyam...",
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      ),
      color: "purple"
    },
    {
      title: "Company(MCA)",
      description: "AuditFiling offers expert services in ESI return filing, PF & ESI registration, ITR filing, and company compliance in India. From change in director forms...",
      icon: (
        <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-8 0H5m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
      ),
      color: "indigo"
    },
    {
      title: "Trade Mark",
      description: "Need protection for your brand? AuditFiling manages Trademark Registration in India, Responses to Trademark Objections, Trademark...",
      icon: (
        <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      ),
      color: "yellow"
    },
    {
      title: "Bank Valuation",
      description: "From bank valuations to business valuation services, AuditFiling provides reliable financial services, wealth management services,...",
      icon: (
        <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      color: "red"
    },
    {
      title: "Legal",
      description: "With AuditFiling, legal work is simplified through quick Legal Notice Drafting, Reliable Online Legal Advice, and safe Rent Agreement Online...",
      icon: (
        <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
        </svg>
      ),
      color: "teal"
    }
  ];

  const features = [
    {
      title: "Confidential & Safe",
      description: "Enjoy our services that ensure complete safety of documents and the confidentiality of client's data.",
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
      ),
      color: "blue"
    },
    {
      title: "No Hidden Fee",
      description: "We maintain transparency and do not add any kind of hidden charges without the client's knowledge.",
      icon: (
        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      ),
      color: "green"
    },
    {
      title: "Guaranteed Satisfaction",
      description: "The dedicated services from our well experienced experts, guarantee our client's satisfaction.",
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
        </svg>
      ),
      color: "purple"
    },
    {
      title: "Expert CA/CS Assistance",
      description: "Our in house CA and CS experts provide professional assistance/guidance service related to various legal issues.",
      icon: (
        <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      ),
      color: "indigo"
    }
  ];

  const getColorClasses = (color, isHovered) => {
    const colorMap = {
      blue: {
        bg: isHovered ? "bg-blue-100" : "bg-blue-50",
        border: "border-blue-200",
        hover: "hover:bg-blue-100",
        text: "text-blue-600",
        button: "text-blue-600 hover:text-blue-800",
        accent: "from-blue-500 to-blue-600"
      },
      green: {
        bg: isHovered ? "bg-green-100" : "bg-green-50",
        border: "border-green-200",
        hover: "hover:bg-green-100",
        text: "text-green-600",
        button: "text-green-600 hover:text-green-800",
        accent: "from-green-500 to-green-600"
      },
      purple: {
        bg: isHovered ? "bg-purple-100" : "bg-purple-50",
        border: "border-purple-200",
        hover: "hover:bg-purple-100",
        text: "text-purple-600",
        button: "text-purple-600 hover:text-purple-800",
        accent: "from-purple-500 to-purple-600"
      },
      indigo: {
        bg: isHovered ? "bg-indigo-100" : "bg-indigo-50",
        border: "border-indigo-200",
        hover: "hover:bg-indigo-100",
        text: "text-indigo-600",
        button: "text-indigo-600 hover:text-indigo-800",
        accent: "from-indigo-500 to-indigo-600"
      },
      yellow: {
        bg: isHovered ? "bg-yellow-100" : "bg-yellow-50",
        border: "border-yellow-200",
        hover: "hover:bg-yellow-100",
        text: "text-yellow-600",
        button: "text-yellow-600 hover:text-yellow-800",
        accent: "from-yellow-500 to-yellow-600"
      },
      red: {
        bg: isHovered ? "bg-red-100" : "bg-red-50",
        border: "border-red-200",
        hover: "hover:bg-red-100",
        text: "text-red-600",
        button: "text-red-600 hover:text-red-800",
        accent: "from-red-500 to-red-600"
      },
      teal: {
        bg: isHovered ? "bg-teal-100" : "bg-teal-50",
        border: "border-teal-200",
        hover: "hover:bg-teal-100",
        text: "text-teal-600",
        button: "text-teal-600 hover:text-teal-800",
        accent: "from-teal-500 to-teal-600"
      }
    };
    return colorMap[color] || {
      bg: isHovered ? "bg-gray-100" : "bg-gray-50",
      border: "border-gray-200",
      hover: "hover:bg-gray-100",
      text: "text-gray-600",
      button: "text-gray-600 hover:text-gray-800",
      accent: "from-gray-500 to-gray-600"
    };
  };

  return (
    <div className="bg-gray-50">
      {/* Services Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 relative inline-block">
              Services We Provide
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full"></span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
              Comprehensive legal and financial services to meet all your business needs
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const colorClasses = getColorClasses(service.color, hoveredCard === index);
              return (
                <div
                  key={index}
                  className={`rounded-xl border-2 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${colorClasses.bg} ${colorClasses.border} relative overflow-hidden group`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Hover effect element */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colorClasses.accent} transition-all duration-300 ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`}></div>

                  {/* Icon with animation */}
                  <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110 inline-block">
                    {service.icon}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">{service.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors">{service.description}</p>
                  <button className={`font-medium flex items-center transition-all duration-300 ${colorClasses.button} group-hover:underline`}>
                    Learn more
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-inner">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Need help with your legal and financial requirements?</h3>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
              Get Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Auditfiling Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 relative inline-block">
              Why Choose Auditfiling
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full"></span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
              We provide exceptional services with a focus on security, transparency, and customer satisfaction
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const colorClasses = getColorClasses(feature.color, hoveredCard === index + services.length);
              return (
                <div
                  key={index}
                  className={`rounded-xl border-2 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${colorClasses.bg} ${colorClasses.border} relative overflow-hidden group`}
                  onMouseEnter={() => setHoveredCard(index + services.length)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Hover effect element */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colorClasses.accent} transition-all duration-300 ${hoveredCard === index + services.length ? 'opacity-100' : 'opacity-0'}`}></div>

                  {/* Icon with animation */}
                  <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110 inline-block">
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* Additional CTA Section */}
          <div className="text-center mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-10 shadow-xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16 opacity-10"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-16 translate-y-16 opacity-10"></div>

            <h3 className="text-2xl font-semibold text-white mb-6 relative z-10">Ready to experience our premium services?</h3>
            <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 relative z-10">
              Get Started Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicesSection;