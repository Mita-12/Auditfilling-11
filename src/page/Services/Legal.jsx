import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import WhatsAppPopup from "../../form/WhatsAppPopup";
import { FaUserTie, FaBriefcase, FaUserEdit, FaUsers } from "react-icons/fa";
import QuickForm from "../../form/QuickForm";

export default function Legal() {
  const [serviceData, setServiceData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
const services = [
  {
    title: "Online Legal Advice",
    description:
      "Tax services and filing assistance for salaried individuals, ensuring compliance and maximized refunds. Professionals in India—including doctors, lawyers, consultants, freelancers, and anyone earning income from their own practice—are taxed as individuals under the same income tax slabs as salaried persons. You have the flexibility to choose between the new tax regime (which is now the default) and the old tax regime (optional), depending on which suits your financial situation better.",
    additional:
      "We provide step-by-step guidance, document verification, and e-filing support for hassle-free tax filing.",
    image: "/img/Blog 6.png",
  },
  {
    title: "Legal Notice",
    description:
      "Tax services and filing assistance for salaried individuals, ensuring compliance and maximized refunds.",
    additional:
      "We provide step-by-step guidance, document verification, and e-filing support for hassle-free tax filing.",
    image: "/img/Blog 6.png",
  },
  {
    title: "Labour and Employment Law",
    description:
      "Professional tax services tailored for consultants, freelancers, and small business owners.",
    additional:
      "Our experts handle complex cases, deductions, and compliance requirements to keep you worry-free.",
    image: "/img/professional.png",
  },
  {
    title: "Banking and Financial Law",
    description:
      "Comprehensive services for self-employed individuals, including GST, income tax, and business filing.",
    additional:
      "We simplify tax filing for self-employed professionals with personalized advice and timely support.",
    image: "/img/self-employed.png",
  },
  {
    title: "Land Document Verification",
    description:
      "Specialized tax filing and advisory services for HUFs with complex income structures.",
    additional:
      "Ensure accurate HUF filings, compliance, and optimized tax strategies with our expert guidance.",
    image: "/img/huf.png",
  },
  {
    title: "Property Registration",
    description:
      "Specialized tax filing and advisory services for HUFs with complex income structures.",
    additional:
      "Ensure accurate HUF filings, compliance, and optimized tax strategies with our expert guidance.",
    image: "/img/huf.png",
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
    <div className="top-30 ">
      {/* Header */}
      <Header />

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
<main className="flex-1 ml-59 mr-59 px-5 py-8 mt-15 overflow-y-auto">
  <div
    key={activeIndex} // ensures smooth React re-render
    className={`bg-white p-6 rounded-lg  min-h-[90vh] flex flex-col md:flex-row items-start gap-6 transition-transform duration-300 ease-in-out ${
      animate ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
    }`}
  >


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
