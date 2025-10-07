// import React, { useEffect, useState } from "react";
// import Header from "../../component/Header";
// import WhatsAppPopup from "../../form/WhatsAppPopup";
// import { FaUserTie, FaBriefcase, FaUserEdit, FaUsers } from "react-icons/fa";
// import QuickForm from "../../form/QuickForm";

// export default function Gst() {
//   const [serviceData, setServiceData] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [animate, setAnimate] = useState(false);

//   const services = [
//     {
//       title: "Proprietor New Registration",
//       description:
//         "Comprehensive GST registration services for proprietors, ensuring legal compliance and smooth business operations. Our experts help you complete the registration process quickly and accurately, so you can focus on growing your business.",
//       additional:
//         "We provide step-by-step guidance, document verification, and online submission support for hassle-free GST registration.",
//       image: "/img/Proprietor Registration.png",
//     },

//     {
//       title: "Proprietor GST Filing",
//       description:
//         "Efficient GST filing services for proprietors, ensuring timely submission and compliance with Indian GST laws. Avoid penalties and maintain smooth financial operations with our expert assistance.",
//       additional:
//         "We offer guidance on document preparation, filing procedures, and error-free submission of your GST returns.",
//       image: "/img/Proprietor Filing.png",
//     },

//     {
//       title: "Company GST Registration",
//       description:
//         "Complete GST registration services for companies, helping you meet statutory obligations and start your business operations without any compliance issues.",
//       additional:
//         "We assist with documentation, application filing, and follow-up with GST authorities for a hassle-free registration process.",
//       image: "/img/Company Registration.png",
//     },

//     {
//       title: "Company GST Filing",
//       description:
//         "Professional GST filing services for companies, ensuring timely and accurate submission of returns in compliance with GST regulations.",
//       additional:
//         "We handle data verification, return preparation, and e-filing to keep your company compliant and avoid penalties.",
//       image: "/img/Company Filing.png",
//     },

//     {
//       title: "GST Annual Filing",
//       description:
//         "Annual GST return filing services to ensure your business stays compliant and avoids unnecessary penalties. Perfect for proprietors, partnerships, and companies.",
//       additional:
//         "Our team guides you through document collection, reconciliation, and submission of annual GST returns with ease.",
//       image: "/img/GST Annual Filing.png",
//     },

//     {
//       title: "GST Notice Compliance",
//       description:
//         "Expert assistance for GST notice compliance, helping businesses respond accurately and timely to notices from GST authorities.",
//       additional:
//         "We provide end-to-end support including notice analysis, documentation, response drafting, and follow-up with authorities.",
//       image: "/img/GST Notice Compliance.png",
//     },


//   ];

//   useEffect(() => {
//     setServiceData(services[0]);
//   }, []);

//   const handleServiceClick = (index) => {
//     setAnimate(true);
//     setTimeout(() => {
//       setActiveIndex(index);
//       setServiceData(services[index]);
//       setAnimate(false);
//     }, 300);
//   };

//   return (
//      <div className="min-h-screen ">
//       {/* Header */}
//       <Header />

//       <div className="flex">
//         {/* Sidebar */}
//         <aside className="w-70 rounded-lg p-4 h-[90vh] bg-white  sticky top-28 left-18 overflow-y-auto">
//           <ul className="space-y-4">
//             {services.map((item, index) => {
//               const isActive = activeIndex === index;
//               return (
//                 <li
//                   key={index}
//                   onClick={() => handleServiceClick(index)}
//                   className={`flex items-center gap-4 p-4 mt-5 rounded-lg cursor-pointer transition-all duration-300 ${
//                     isActive
//                       ? "bg-grey-50 shadow-inner scale-105"
//                       : "bg-white hover:bg-blue-50 hover:scale-105"
//                   }`}
//                 >
//                   {item.icon}
//                   <span
//                     className={`font-serif ${
//                       isActive ? "text-2xl text-blue-950 font-semibold " : "text-xl"
//                     }`}
//                   >
//                     {item.title}
//                   </span>
//                 </li>
//               );
//             })}
//           </ul>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 ml-20 px-6  py-10  ">
//           <div
//             key={activeIndex}
//             className={`bg-white p-8  mt-20  min-h-[90vh] transition-all duration-500 ease-in-out ${
//               animate
//                 ? "translate-x-6 opacity-0"
//                 : "translate-x-0 opacity-100"
//             }`}
//           >
//             <h1 className="text-3xl md:text-4xl font-serif text-center font-bold mb-6 text-gray-900">
//               {serviceData?.title}
//             </h1>
//             <p className="text-gray-700 mb-4 leading-relaxed">
//               {serviceData?.description}
//             </p>
//             {serviceData?.additional && (
//               <p className="text-gray-700 leading-relaxed">
//                 {serviceData.additional}
//               </p>
//             )}
//           </div>
//         </main>

//         {/* Right Form */}
//         <div className="hidden lg:block w-80 pr-6 mr-5">
//           <QuickForm />
//         </div>
//       </div>

//       <WhatsAppPopup />
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import QuickForm from "../../form/QuickForm";
import WhatsAppPopup from "../../form/WhatsAppPopup";
import Footer from "../../component/Footer";

export default function Gst() {
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    fetch("https://auditfiling.com/api/v1/menus")
      .then((res) => res.json())
      .then((data) => {
        const gstMenu = data.menus.find(
          (menu) => menu.name.toLowerCase() === "gst"
        );
        if (gstMenu ?.services?.length) {
          setServices(gstMenu .services);
          setActiveService(gstMenu .services[0]);
        }
      })
      .catch(console.error);
  }, []);

  // Scroll spy for sidebar highlighting
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      for (let i = services.length - 1; i >= 0; i--) {
        const el = document.getElementById(`service-${services[i].id}`);
        if (el && el.offsetTop <= scrollPos) {
          setActiveService(services[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [services]);

  const handleClick = (service) => {
    setActiveService(service);
    const el = document.getElementById(`service-${service.id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div className="w-full mx-auto px-4 md:px-20  py-10 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="sticky top-30 bg-white rounded-xl p-4 md:p-6 md:w-72 h-auto md:h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-center mb-4 md:mb-6">Services</h3>
          <ul className="space-y-2 md:space-y-3">
            {services.map((service, idx) => (
              <li key={service.id}>
                <button
                  onClick={() => handleClick(service)}
                  className={`w-full text-left p-2 md:p-3 rounded-lg transition-all   ${activeService?.id === service.id
                    ? "bg-blue-50 border-l-4 border-blue-500 text-black font-bold text-xl"
                    : "hover:bg-gray-50 text-gray-700"
                    }`}
                >
                  {idx + 1}. {service.service_name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-8 mt-20 md:space-y-10">
          {services.map((service) => (
            <section
              key={service.id}
              id={`service-${service.id}`}
              className="bg-white p-4 md:p-6 rounded-xl  transition-all"
            >
              <h2 className="text-2xl md:text-3xl text-center font-bold text-gray-900 mb-4">
                {service.service_name}
              </h2>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start">
                <div className="flex justify-center md:justify-end w-full md:w-1/2">
                  <img
                    src={service.service_image || "/default-IncomeTax2.jpg"}
                    alt={service.service_name}
                    className="rounded-2xl shadow-lg w-full max-w-md object-contain"
                  />
                     {/* <img
                    src={
                      service.service_image
                        ? `https://auditfiling.com/service_images/${service.service_image}`
                        : "/default-IncomeTax2.jpg"
                    }
                    alt={service.service_name}
                    className="rounded-2xl shadow-lg w-full max-w-md object-contain"
                  /> */}

                </div>
                <div
                  className="text-gray-700 leading-relaxed w-full md:w-1/2"
                  dangerouslySetInnerHTML={{ __html: service.service_description }}
                ></div>
              </div>
            </section>
          ))}

          {/* QuickForm for mobile */}
          <div className="block md:hidden mt-6">
            <QuickForm />
          </div>
        </main>

        {/* QuickForm for desktop */}
        <div className="hidden lg:block w-80">
          <QuickForm />
        </div>
      </div>

      <WhatsAppPopup />
      <Footer />
    </div>
  );
}