import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import WhatsAppPopup from "../../form/WhatsAppPopup";
import { FaUserTie, FaBriefcase, FaUserEdit, FaUsers } from "react-icons/fa";
import QuickForm from "../../form/QuickForm";

export default function Bankvaluation() {
  const [serviceData, setServiceData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
const services = [
  {
    title: "Property Valuation Report",
    description: "Professional guidance for registering a One Person Company (OPC) with complete compliance support.",
    additional: "We assist with all documentation, approvals, and filing for hassle-free OPC registration.",
    image: "/img/opc.png",
  },
  {
    title: "Market Valuation",
    description: "Expert assistance in registering a Limited Liability Partnership (LLP) quickly and efficiently.",
    additional: "We handle legal documents, filing, and registration approvals for your LLP.",
    image: "/img/llp.png",
  },
  {
    title: "Asset-Based Valuation",
    description: "Complete support for Private Limited Company registration including MCA filings and compliance.",
    additional: "Our team ensures smooth incorporation, documentation, and statutory compliance.",
    image: "/img/private-limited.png",
  },
  {
    title: "Income-Based Valuation",
    description: "Guidance and filing assistance for registering a Public Limited Company.",
    additional: "We help with legal formalities, documentation, and government approvals.",
    image: "/img/public-limited.png",
  },
  {
    title: "Risk-Based Valuation",
    description: "Assistance in changing your company’s name with proper compliance and filings.",
    additional: "We handle ROC filings, approvals, and statutory compliance for name change.",
    image: "/img/name-change.png",
  },
  {
    title: "Operational Valuation",
    description: "Support for changing your company’s registered office address legally and efficiently.",
    additional: "Our experts file all necessary documents and approvals with the ROC.",
    image: "/img/office-change.png",
  },
  {
    title: "Strategic Valuation",
    description: "Professional assistance in adding or changing directors in your company.",
    additional: "We manage all legal filings and compliance with MCA for director changes.",
    image: "/img/change-director.png",
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
      {/* Header */}
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-70 rounded-lg p-4 h-[90vh] bg-white  fixed top-28 left-18 overflow-y-auto">
          <ul className="space-y-4">
            {services.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <li
                  key={index}
                  onClick={() => handleServiceClick(index)}
                  className={`flex items-center gap-4 p-4 mt-5 rounded-lg cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-grey-50 shadow-inner scale-105"
                      : "bg-white hover:bg-blue-50 hover:scale-105"
                  }`}
                >
                  {item.icon}
                  <span
                    className={`font-serif ${
                      isActive ? "text-2xl text-blue-950 font-semibold " : "text-xl"
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
        <main className="flex-1 ml-82 px-6  py-10  ">
          <div
            key={activeIndex}
            className={`bg-white p-8  mt-20  min-h-[90vh] transition-all duration-500 ease-in-out ${
              animate
                ? "translate-x-6 opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            <h1 className="text-3xl md:text-4xl font-serif text-center font-bold mb-6 text-gray-900">
              {serviceData?.title}
            </h1>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {serviceData?.description}
            </p>
            {serviceData?.additional && (
              <p className="text-gray-700 leading-relaxed">
                {serviceData.additional}
              </p>
            )}
          </div>
        </main>

        {/* Right Form */}
        <div className="hidden lg:block w-80 pr-6 mr-5">
          <QuickForm />
        </div>
      </div>

      <WhatsAppPopup />
    </div>
  );
}
