// import React, { useEffect, useState } from "react";
// import { FaUserTie, FaBriefcase, FaUserEdit, FaUsers } from "react-icons/fa";
// import Header from "../../component/Header";
// import WhatsAppPopup from "../../form/WhatsAppPopup";
// import QuickForm from "../../form/QuickForm";

// export default function StartUp() {
//   const [serviceData, setServiceData] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [animate, setAnimate] = useState(false);

//   const services = [
//     {
//       title: "Proprietorship Firm Registration",
//       description:
//         "Complete registration services for proprietorship firms, ensuring compliance with Indian business laws and smooth business operations from day one.",
//       additional:
//         "We provide step-by-step guidance, document verification, and online filing support for hassle-free proprietorship registration.",
//       image: "/img/Proprietorship Registration.png",
//     },

//     {
//       title: "Partnership Firm Registration",
//       description:
//         "Professional registration services for partnership firms, ensuring legal compliance and a smooth start to your partnership business.",
//       additional:
//         "We guide you through partnership deed preparation, document verification, and online filing for seamless registration.",
//       image: "/img/Partnership Registration.png",
//     },

//     {
//       title: "Trust Registration (IGR)",
//       description:
//         "Efficient registration services for trusts under the Indian Registration Act, ensuring proper legal formalities and compliance.",
//       additional:
//         "We assist with trust deed drafting, document submission, and registration with the relevant authorities.",
//       image: "/img/Trust Registration.png",
//     },

//     {
//       title: "Startup India Registration",
//       description:
//         "Complete Startup India registration services to help your business avail benefits and recognition under the government startup program.",
//       additional:
//         "We provide step-by-step guidance for application, document verification, and government portal submission.",
//       image: "/img/Startup India Registration.png",
//     },

//     {
//       title: "EPF Registration",
//       description:
//         "Professional assistance for Employees’ Provident Fund (EPF) registration to ensure compliance with labor laws and smooth employee management.",
//       additional:
//         "We guide you through document collection, online application, and approval from the EPF authority.",
//       image: "/img/EPF Registration.png",
//     },

//     {
//       title: "FSSAI Registration",
//       description:
//         "Comprehensive Food Safety and Standards Authority of India (FSSAI) registration services to legally operate your food business in India.",
//       additional:
//         "We help with documentation, license application, and verification for hassle-free FSSAI registration.",
//       image: "/img/FSSAI Registration.png",
//     },

//     {
//       title: "FSSAI Renewal",
//       description:
//         "Seamless FSSAI license renewal services to ensure continued compliance for your food business without penalties or disruption.",
//       additional:
//         "We handle document verification, application filing, and follow-up for timely renewal of your FSSAI license.",
//       image: "/img/FSSAI Renewal.png",
//     },

//     {
//       title: "Import Export Code",
//       description:
//         "Expert guidance for obtaining Import Export Code (IEC) registration, enabling smooth import and export operations for your business.",
//       additional:
//         "We provide document verification, application filing, and government portal assistance for hassle-free IEC registration.",
//       image: "/img/Import Export Code.png",
//     },

//     {
//       title: "ISO Registration",
//       description:
//         "Professional ISO certification registration services to enhance your business credibility and compliance with international standards.",
//       additional:
//         "We assist with documentation, process auditing, and filing for seamless ISO certification.",
//       image: "/img/ISO Registration.png",
//     },

//     {
//       title: "GEM Registration",
//       description:
//         "Guidance for Government e-Marketplace (GEM) registration to enable your business to sell products and services to government departments.",
//       additional:
//         "We handle portal registration, documentation, and verification for smooth onboarding to GEM.",
//       image: "/img/GEM Registration.png",
//     },

//     {
//       title: "MSME Registration",
//       description:
//         "Complete Micro, Small & Medium Enterprises (MSME) registration services to avail government benefits and schemes for your business.",
//       additional:
//         "We provide step-by-step guidance, documentation, and online filing support for hassle-free MSME registration.",
//       image: "/img/MSME Registration.png",
//     },

//     {
//       title: "PF Registration",
//       description:
//         "Professional assistance for Provident Fund (PF) registration to ensure employee welfare compliance under labor laws.",
//       additional:
//         "We guide you through online application, document verification, and approval for smooth PF registration.",
//       image: "/img/PF Registration.png",
//     },

//     {
//       title: "Shop And Commercial Registration (Labour License)",
//       description:
//         "Complete shop and establishment registration services to comply with labor laws and operate your commercial establishment legally.",
//       additional:
//         "We provide guidance on document preparation, license application, and follow-up for hassle-free registration.",
//       image: "/img/Shop Commercial Registration.png",
//     },

//     {
//       title: "Trade License",
//       description:
//         "Expert trade license registration services to legally operate your business in your city or municipality without facing penalties.",
//       additional:
//         "We handle documentation, application submission, and approvals for smooth trade license registration.",
//       image: "/img/Trade License.png",
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
//    <div className="min-h-screen ">
//       {/* Header */}
//       <Header />

//       <div className="flex">
//         {/* Sidebar */}
//         <aside className="w-70 rounded-lg p-4 h-[90vh] bg-white  fixed top-28 left-18 overflow-y-auto">
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
//         <main className="flex-1 ml-82 px-6  py-10  ">
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
//           <QuickForm/>
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
         const startupMenu = data.menus.find(
           (menu) => menu.name.toLowerCase() === "startup"
         );
         if (startupMenu ?.services?.length) {
           setServices(startupMenu .services);
           setActiveService(startupMenu .services[0]);
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