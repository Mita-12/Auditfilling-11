import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import WhatsAppPopup from "../../form/WhatsAppPopup";
import { FaUserTie, FaBriefcase, FaUserEdit, FaUsers } from "react-icons/fa";
import QuickForm from "../../form/QuickForm";

export default function Gst() {
  const [serviceData, setServiceData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  const services = [
    {
      title: "Proprietor New Registration",
      description:
        "Comprehensive GST registration services for proprietors, ensuring legal compliance and smooth business operations. Our experts help you complete the registration process quickly and accurately, so you can focus on growing your business.",
      additional:
        "We provide step-by-step guidance, document verification, and online submission support for hassle-free GST registration.",
      image: "/img/Proprietor Registration.png",
    },

    {
      title: "Proprietor GST Filing",
      description:
        "Efficient GST filing services for proprietors, ensuring timely submission and compliance with Indian GST laws. Avoid penalties and maintain smooth financial operations with our expert assistance.",
      additional:
        "We offer guidance on document preparation, filing procedures, and error-free submission of your GST returns.",
      image: "/img/Proprietor Filing.png",
    },

    {
      title: "Company GST Registration",
      description:
        "Complete GST registration services for companies, helping you meet statutory obligations and start your business operations without any compliance issues.",
      additional:
        "We assist with documentation, application filing, and follow-up with GST authorities for a hassle-free registration process.",
      image: "/img/Company Registration.png",
    },

    {
      title: "Company GST Filing",
      description:
        "Professional GST filing services for companies, ensuring timely and accurate submission of returns in compliance with GST regulations.",
      additional:
        "We handle data verification, return preparation, and e-filing to keep your company compliant and avoid penalties.",
      image: "/img/Company Filing.png",
    },

    {
      title: "GST Annual Filing",
      description:
        "Annual GST return filing services to ensure your business stays compliant and avoids unnecessary penalties. Perfect for proprietors, partnerships, and companies.",
      additional:
        "Our team guides you through document collection, reconciliation, and submission of annual GST returns with ease.",
      image: "/img/GST Annual Filing.png",
    },

    {
      title: "GST Notice Compliance",
      description:
        "Expert assistance for GST notice compliance, helping businesses respond accurately and timely to notices from GST authorities.",
      additional:
        "We provide end-to-end support including notice analysis, documentation, response drafting, and follow-up with authorities.",
      image: "/img/GST Notice Compliance.png",
    },


  ];

  useEffect(() => {
    setServiceData(services[0]);
  }, []);

  const handleServiceClick = (index) => {
    setAnimate(true);
    setTimeout(() => {
      setActiveIndex(index);
      setServiceData(services[index]);
      setAnimate(false);
    }, 300);
  };

  return (
    <div className="min-h-screen ">
      <Header />
      <WhatsAppPopup />

      {/* Sidebar */}
      <aside className="w-58 rounded-lg p-6 h-[90vh] fixed top-20 left-6 overflow-y-auto transition-all duration-300 ease-in-out">
  <ul className="space-y-3">
    {services.map((item, index) => {
      const isActive = activeIndex === index;
      return (
        <li
          key={index}
          onClick={() => handleServiceClick(index)}
          className={`
            flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform
            ${isActive ? "bg-blue-100 shadow-inner scale-105" : "bg-white hover:bg-blue-100 hover:scale-105"}
          `}
        >
          {item.icon}
          <span
            className={`font-serif transition-all duration-300 ${
              isActive
                ? " text-sm font-semibold" // active service
                : " text-base"             // inactive services
            }`}
          >
            {item.title}
          </span>
        </li>
      );
    })}
  </ul>
</aside>

      {/* Main Content */}
      <main className="flex-1 ml-59 mr-59 px-5 py-8 mt-20 overflow-y-auto">
        <div
          key={activeIndex} // ensures smooth React re-render
          className={`bg-white p-6 rounded-lg  min-h-[90vh] flex flex-col md:flex-row items-start gap-6 transition-transform duration-300 ease-in-out ${animate ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
            }`}
        >
          {/* Left Side Image */}
          {/* <div className="md:w-1/2 w-full flex justify-center">
      <img
        src={serviceData?.image || "/img/default-service.png"}
        alt={serviceData?.title || "Service Image"}
        className="rounded-lg  object-cover h-80 w-full"
      />
    </div> */}

          {/* Right Side Content */}
          <div className=" w-full ">
            <h1 className="text-3xl  font-serif text-center md:text-4xl font-bold mb-8">
              {serviceData?.title}
            </h1>
            <p className="text-gray-700 mb-4">
              {serviceData?.description}
            </p>
            {serviceData?.additional && (
              <p className="text-gray-700">
                {serviceData.additional}
              </p>
            )}
          </div>
        </div>
      </main>




      {/* Right Form */}
     <QuickForm/>
      <WhatsAppPopup />
    </div>
  );
}
