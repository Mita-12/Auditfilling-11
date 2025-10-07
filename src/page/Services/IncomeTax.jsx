// import React, { useEffect, useState } from "react";
// import Header from "../../component/Header";
// import WhatsAppPopup from "../../form/WhatsAppPopup";
// import QuickForm from "../../form/QuickForm";
// import Footer from "../../component/Footer";

// export default function IncomeTax() {
//   const [services, setServices] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [serviceData, setServiceData] = useState(null);
//   const [animate, setAnimate] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("https://auditfiling.com/api/v1/menus")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("API Response:", data);
//         const incomeTaxMenu = data.menus.find(
//           (menu) => menu.name.toLowerCase() === "income tax"
//         );

//         if (incomeTaxMenu && Array.isArray(incomeTaxMenu.services)) {
//           setServices(incomeTaxMenu.services);
//           setServiceData(incomeTaxMenu.services[0]);
//         }

//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("API fetch error:", err);
//         setLoading(false);
//       });
//   }, []);

//   const handleServiceClick = (index) => {
//     setAnimate(true);
//     setTimeout(() => {
//       setActiveIndex(index);
//       setServiceData(services[index]);
//       setAnimate(false);
//     }, 300);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-700 text-xl">Loading services...</p>
//       </div>
//     );
//   }

//   if (!Array.isArray(services) || services.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-700 text-xl">No services available.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen">
//       <Header />

//       <div className="flex">
//         {/* Sidebar */}
//         <aside className="w-70 rounded-lg p-4 h-[90vh] bg-white sticky ml-25 top-28 overflow-y-auto">
//           <ul className="space-y-4">
//             {services.map((item, index) => {
//               const isActive = activeIndex === index;
//               return (
//                 <li
//                   key={item.id}
//                   onClick={() => handleServiceClick(index)}
//                   className={`flex items-center gap-4 p-4 mt-5 rounded-lg cursor-pointer transition-all duration-300 ${isActive
//                       ? "bg-gray-100 shadow-inner scale-105"
//                       : "bg-white hover:bg-blue-50 hover:scale-105"
//                     }`}
//                 >
//                   <span
//                     className={`font-serif ${isActive
//                         ? "text-2xl text-blue-950 font-semibold"
//                         : "text-xl"
//                       }`}
//                   >
//                     {item.service_name}
//                   </span>
//                 </li>
//               );
//             })}
//           </ul>
//         </aside>


//         {/* Main Content */}
//         <main className="flex-1 ml-20 px-6 py-10">
//           <div
//             key={activeIndex}
//             className={`bg-white p-8 mt-20 min-h-[90vh] transition-all duration-500 ease-in-out ${animate ? "translate-x-6 opacity-0" : "translate-x-0 opacity-100"
//               }`}
//           >
//             <h1 className="text-3xl md:text-4xl font-serif text-center font-bold mb-10 text-gray-900">
//               {serviceData?.service_name}
//             </h1>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
//               {/* Left Side - Image */}
//               <div className="flex justify-center md:justify-end">
//                 <div className="w-full md:w-auto max-w-[450px]">
//                   <img
//                     src={serviceData?.service_image || "/default-IncomeTax2.jpg"}
//                     alt={serviceData?.service_image}
//                     className="rounded-2xl shadow-lg w-full h-auto object-contain"
//                   />
//                 </div>
//               </div>


//               {/* Right Side - Description */}
//               <div className="text-gray-700 leading-relaxed">
//                 {/* Render HTML description */}
//                 <div
//                   dangerouslySetInnerHTML={{
//                     __html: serviceData?.service_description || "",
//                   }}
//                 ></div>
//               </div>
//             </div>
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





// import React, { useEffect, useState } from "react";
// import Header from "../../component/Header";
// import WhatsAppPopup from "../../form/WhatsAppPopup";
// import QuickForm from "../../form/QuickForm";
// import Footer from "../../component/Footer";

// export default function IncomeTax() {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch all services from API
// useEffect(() => {
//   fetch("https://auditfiling.com/api/v1/service/1")
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("Full API Response:", data); // <- important!
//       setLoading(false);
//     })
//     .catch((err) => {
//       console.error("Service API error:", err);
//       setLoading(false);
//     });
// }, []);




//   return (
//     <div className="min-h-screen">
//       <Header />

//       <div className="flex">
//         {/* Left Sidebar */}
//         <aside className="w-70 rounded-lg p-4 h-[90vh] bg-white sticky top-28 left-30 overflow-y-auto hidden md:block">
//           <ul className="space-y-4">
//             {services.map((item, index) => (
//               <li
//                 key={index}
//                 className="flex items-center gap-4 p-4 mt-5 rounded-lg cursor-pointer transition-all duration-300 bg-white hover:bg-blue-50 hover:scale-105"
//               >
//                 <span className="font-serif text-xl">{item.name}</span>
//               </li>
//             ))}
//           </ul>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 ml-0 md:ml-20 px-6 py-10">
//           {loading ? (
//             <div className="flex justify-center items-center min-h-[70vh]">
//               <p className="text-gray-500 text-lg">Loading services...</p>
//             </div>
//           ) : services.length === 0 ? (
//             <div className="flex justify-center items-center min-h-[70vh]">
//               <p className="text-gray-500 text-lg">No services found.</p>
//             </div>
//           ) : (
//             <div className="space-y-20 mt-20">
//               {services.map((service, index) => (
//                 <div
//                   key={index}
//                   className="bg-white p-8 rounded-2xl shadow-md transition-all duration-500"
//                 >
//                   {/* Title */}
//                   <h2 className="text-3xl md:text-4xl font-serif text-center font-bold mb-10 text-gray-900">
//                     {service.name}
//                   </h2>

//                   {/* Grid Layout */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//                     {/* Left - Image */}
//                     <div className="flex justify-center md:justify-end">
//                       <img
//                         src={service?.image || "/default-IncomeTax2.jpg"}
//                         alt={service?.name}
//                         className="rounded-2xl shadow-lg max-w-full md:max-w-[450px] object-cover"
//                       />
//                     </div>

//                     {/* Right - Description */}
//                     <div>
//                       <p className="text-gray-700 mb-4 leading-relaxed">
//                         {service?.description || "No description available."}
//                       </p>

//                       {service?.additional && (
//                         <div className="mt-4">
//                           <p className="text-gray-700 leading-relaxed whitespace-pre-line">
//                             {service.additional}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </main>

//         {/* Right Form */}
//         <div className="hidden lg:block w-80 pr-6 mr-5">
//           <QuickForm />
//         </div>
//       </div>

//       <WhatsAppPopup />
//       <Footer />
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import QuickForm from "../../form/QuickForm";
import WhatsAppPopup from "../../form/WhatsAppPopup";
import Footer from "../../component/Footer";

export default function IncomeTax() {
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    fetch("https://auditfiling.com/api/v1/menus")
      .then((res) => res.json())
      .then((data) => {
        const incomeTaxMenu = data.menus.find(
          (menu) => menu.name.toLowerCase() === "income tax"
        );
        if (incomeTaxMenu?.services?.length) {
          setServices(incomeTaxMenu.services);
          setActiveService(incomeTaxMenu.services[0]);
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

      <div className="w-full mx-auto px-4 md:px-15  py-10 flex flex-col md:flex-row gap-6">
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
        <main className="flex-1 space-y-8 mt-20 md:space-y-8">
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
                {/* <div className="flex justify-center md:justify-end w-full md:w-1/2">
                  <img
                    src={service.service_image || "/default-IncomeTax2.jpg"}
                    alt={service.service_name}
                    className="rounded-2xl shadow-lg w-full max-w-md object-contain"
                  />
                

                </div> */}
                <div
                  className="text-black  w-full "
                  dangerouslySetInnerHTML={{ __html: service.service_description }}
                ></div>
              </div>
            </section>
          ))}

          {/* QuickForm for mobile */}
          <div className="block md:hidden mt-10">
            <QuickForm />
          </div>
        </main>

        {/* QuickForm for desktop */}
        <div className="hidden lg:block w-60">
          <QuickForm />
        </div>
      </div>

      <WhatsAppPopup />
    </div>
  );
}
