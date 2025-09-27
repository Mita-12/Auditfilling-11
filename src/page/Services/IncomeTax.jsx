import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import WhatsAppPopup from "../../form/WhatsAppPopup";
import QuickForm from "../../form/QuickForm";
import {
  FaUserTie,
  FaBriefcase,
  FaUserEdit,
  FaUsers,
  FaLandmark,
} from "react-icons/fa";
import Footer from "../../component/Footer";

export default function IncomeTax() {
  const [serviceData, setServiceData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  const services = [
    {
      title: "Income Tax",
      description:
        "Tax services and filing assistance for salaried individuals, ensuring compliance and maximized refunds. Professionals in India—including doctors, lawyers, consultants, freelancers, and anyone earning income from their own practice—are taxed as individuals under the same income tax slabs as salaried persons. You have the flexibility to choose between the new tax regime (which is now the default) and the old tax regime (optional), depending on which suits your financial situation better.",
      additional:
        "We provide step-by-step guidance, document verification, and e-filing support for hassle-free tax filing.",
    },
    {
      title: "Salaried Individual",
      description:
        "Tax services and filing assistance for salaried individuals, ensuring compliance and maximized refunds.",
      additional:
        "We provide step-by-step guidance, document verification, and e-filing support for hassle-free tax filing.",
    },
    {
      title: "Professional",
      description:
        "Professional tax services tailored for consultants, freelancers, and small business owners.",
      additional:
        "Our experts handle complex cases, deductions, and compliance requirements to keep you worry-free.",
    },
    {
      title: "Self Employed",
      description:
        "Comprehensive services for self-employed individuals, including GST, income tax, and business filing.",
      additional:
        "We simplify tax filing for self-employed professionals with personalized advice and timely support.",
    },
    {
      title: "Hindu Undivided Family (HUF)",
      description:
        "Specialized tax filing and advisory services for HUFs with complex income structures.",
      additional:
        "Ensure accurate HUF filings, compliance, and optimized tax strategies with our expert guidance.",
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
        <aside className="w-70 rounded-lg p-4 h-[90vh] bg-white  fixed  top-28 left-18 overflow-y-auto">
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
