import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import WhatsAppPopup from "../form/WhatsAppPopup";
import { FaUserTie, FaBriefcase, FaUserEdit, FaUsers } from "react-icons/fa";
import QuickForm from "../form/QuickForm";

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
      image: "/img/Blog 6.png",
    },
    {
      title: "Salaried Individual",
      description:
        "Tax services and filing assistance for salaried individuals, ensuring compliance and maximized refunds.",
      additional:
        "We provide step-by-step guidance, document verification, and e-filing support for hassle-free tax filing.",
      image: "/img/Blog 6.png",
    },
    {
      title: "Professional",
      description:
        "Professional tax services tailored for consultants, freelancers, and small business owners.",
      additional:
        "Our experts handle complex cases, deductions, and compliance requirements to keep you worry-free.",
      image: "/img/professional.png",
    },
    {
      title: "Self Employed",
      description:
        "Comprehensive services for self-employed individuals, including GST, income tax, and business filing.",
      additional:
        "We simplify tax filing for self-employed professionals with personalized advice and timely support.",
      image: "/img/self-employed.png",
    },
    {
      title: "Hindu Undivided Family (HUF)",
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
    <div className="min-h-screen ">
      {/* Header */}
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-62 rounded-lg  p-6 h-[90vh] fixed top-28 left-6 overflow-y-auto transition-all duration-300 ease-in-out hover:scale-[1.02] bg-white">
          <ul className="space-y-3">
            {services.map((item, index) => (
              <li
                key={index}
                onClick={() => handleServiceClick(index)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform
                  ${activeIndex === index
                    ? "bg-blue-100 shadow-inner scale-105"
                    : "bg-white hover:bg-blue-100 hover:scale-105"
                  }`}
              >
                {item.icon}
                <span className="font-serif text-[15px] hover:text-blue-950">
                  <h1 className="transition-colors duration-300">
                    {item.title}
                  </h1>
                </span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 mr-68 px-5 py-8 mt-20 overflow-y-auto">
          <div
            key={activeIndex}
            className={`bg-white p-6 rounded-lg min-h-[90vh] flex flex-col items-start gap-6 transition-transform duration-300 ease-in-out ${animate
                ? "translate-x-full opacity-0"
                : "translate-x-0 opacity-100"
              }`}
          >
            <div className="w-full">
              <h1 className="text-3xl md:text-4xl font-serif text-center font-bold mb-8">
                {serviceData?.title}
              </h1>
              <p className="text-gray-700 mb-4">{serviceData?.description}</p>
              {serviceData?.additional && (
                <p className="text-gray-700">{serviceData.additional}</p>
              )}
            </div>
          </div>
        </main>

        {/* Right Contact Form */}
        {/* <aside className="w-70 rounded-lg p-6 h-[45vh] fixed top-24 right-6 bg-white shadow-md flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center">
              Contact Form
            </h3>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                className="w-full border px-2 py-1 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="text"
                placeholder="Phone No"
                className="w-full border px-2 py-1 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border px-2 py-1 rounded focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <button className="mt-2 w-1/2 bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition-all mx-auto block">
                Submit
              </button>
            </form>
          </div>
        </aside> */}
        <QuickForm/>
      </div>

      {/* WhatsApp floating popup */}
      <WhatsAppPopup />
    </div>
  );
}
