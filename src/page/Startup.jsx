import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import WhatsAppPopup from "../form/WhatsAppPopup";
import { FaUserTie, FaBriefcase, FaUserEdit, FaUsers } from "react-icons/fa";

export default function StartUp() {
  const [serviceData, setServiceData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  const services = [
    {
      title: "Proprietorship Firm Registration",
      description:
        "Complete registration services for proprietorship firms, ensuring compliance with Indian business laws and smooth business operations from day one.",
      additional:
        "We provide step-by-step guidance, document verification, and online filing support for hassle-free proprietorship registration.",
      image: "/img/Proprietorship Registration.png",
    },

    {
      title: "Partnership Firm Registration",
      description:
        "Professional registration services for partnership firms, ensuring legal compliance and a smooth start to your partnership business.",
      additional:
        "We guide you through partnership deed preparation, document verification, and online filing for seamless registration.",
      image: "/img/Partnership Registration.png",
    },

    {
      title: "Trust Registration (IGR)",
      description:
        "Efficient registration services for trusts under the Indian Registration Act, ensuring proper legal formalities and compliance.",
      additional:
        "We assist with trust deed drafting, document submission, and registration with the relevant authorities.",
      image: "/img/Trust Registration.png",
    },

    {
      title: "Startup India Registration",
      description:
        "Complete Startup India registration services to help your business avail benefits and recognition under the government startup program.",
      additional:
        "We provide step-by-step guidance for application, document verification, and government portal submission.",
      image: "/img/Startup India Registration.png",
    },

    {
      title: "EPF Registration",
      description:
        "Professional assistance for Employees’ Provident Fund (EPF) registration to ensure compliance with labor laws and smooth employee management.",
      additional:
        "We guide you through document collection, online application, and approval from the EPF authority.",
      image: "/img/EPF Registration.png",
    },

    {
      title: "FSSAI Registration",
      description:
        "Comprehensive Food Safety and Standards Authority of India (FSSAI) registration services to legally operate your food business in India.",
      additional:
        "We help with documentation, license application, and verification for hassle-free FSSAI registration.",
      image: "/img/FSSAI Registration.png",
    },

    {
      title: "FSSAI Renewal",
      description:
        "Seamless FSSAI license renewal services to ensure continued compliance for your food business without penalties or disruption.",
      additional:
        "We handle document verification, application filing, and follow-up for timely renewal of your FSSAI license.",
      image: "/img/FSSAI Renewal.png",
    },

    {
      title: "Import Export Code",
      description:
        "Expert guidance for obtaining Import Export Code (IEC) registration, enabling smooth import and export operations for your business.",
      additional:
        "We provide document verification, application filing, and government portal assistance for hassle-free IEC registration.",
      image: "/img/Import Export Code.png",
    },

    {
      title: "ISO Registration",
      description:
        "Professional ISO certification registration services to enhance your business credibility and compliance with international standards.",
      additional:
        "We assist with documentation, process auditing, and filing for seamless ISO certification.",
      image: "/img/ISO Registration.png",
    },

    {
      title: "GEM Registration",
      description:
        "Guidance for Government e-Marketplace (GEM) registration to enable your business to sell products and services to government departments.",
      additional:
        "We handle portal registration, documentation, and verification for smooth onboarding to GEM.",
      image: "/img/GEM Registration.png",
    },

    {
      title: "MSME Registration",
      description:
        "Complete Micro, Small & Medium Enterprises (MSME) registration services to avail government benefits and schemes for your business.",
      additional:
        "We provide step-by-step guidance, documentation, and online filing support for hassle-free MSME registration.",
      image: "/img/MSME Registration.png",
    },

    {
      title: "PF Registration",
      description:
        "Professional assistance for Provident Fund (PF) registration to ensure employee welfare compliance under labor laws.",
      additional:
        "We guide you through online application, document verification, and approval for smooth PF registration.",
      image: "/img/PF Registration.png",
    },

    {
      title: "Shop And Commercial Registration (Labour License)",
      description:
        "Complete shop and establishment registration services to comply with labor laws and operate your commercial establishment legally.",
      additional:
        "We provide guidance on document preparation, license application, and follow-up for hassle-free registration.",
      image: "/img/Shop Commercial Registration.png",
    },

    {
      title: "Trade License",
      description:
        "Expert trade license registration services to legally operate your business in your city or municipality without facing penalties.",
      additional:
        "We handle documentation, application submission, and approvals for smooth trade license registration.",
      image: "/img/Trade License.png",
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
    <aside className="w-58 rounded-lg p-6 h-[90vh] fixed top-24 left-6 overflow-y-auto transition-all duration-300 ease-in-out">
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
                ? "text-blue-950 text-lg font-semibold" // active service
                : "text-gray-500 text-base"             // inactive services
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
          className={`bg-white p-6 rounded-lg shadow-md min-h-[90vh] flex flex-col md:flex-row items-start gap-6 transition-transform duration-300 ease-in-out ${animate ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
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
      <aside className="w-60  rounded-lg  p-6 h-[45vh] fixed top-24 right-4 flex flex-col justify-between space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-center">Contact Form</h3>
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Name"
              className="w-full border px-2 py-1 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type=""
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
      </aside>
      <WhatsAppPopup />
    </div>
  );
}
