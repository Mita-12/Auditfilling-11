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

export default function IncomeTax({ menuId }) {
  const [menuData, setMenuData] = useState(null);
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState([]);
  const [menuIds, setMenuIds] = useState([]);
  const [faqs, setFaqs] = useState([]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 1️⃣ Fetch all menus
  useEffect(() => {
    async function fetchMenus() {
      try {
        const res = await fetch("https://auditfiling.com/api/v1/web/menu");
        const data = await res.json();
        const menusData = Array.isArray(data) ? data : data.menus || [];
        setMenus(menusData);

        const ids = menusData.map((m) => m.id);
        setMenuIds(ids);

        // Optional: select first menu by default
        if (!menuId && ids.length > 0) {
          setActiveService(null);
          fetchMenuDetail(ids[0]);
        }
      } catch (err) {
        console.error("Error fetching menus:", err);
      }
    }
    fetchMenus();
  }, []);

  // 2️⃣ Fetch menu detail dynamically
  const fetchMenuDetail = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`https://auditfiling.com/api/v1/menu/${id}`);
      const data = await res.json();
      const menu = data.menu || data.data || data.menu_data || data || null;

      if (menu) {
        setMenuData(menu);
        const allServices =
          menu.services || menu.menu_services || menu.items || menu.submenus || [];
        setServices(allServices);
        if (allServices.length > 0) setActiveService(allServices[0]);

        // Scroll to top whenever menu changes
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      console.error("Error fetching menu detail:", err);
    }
    setLoading(false);
  };

  // 3️⃣ Update menu whenever menuId prop changes
  useEffect(() => {
    if (menuId) fetchMenuDetail(menuId);
  }, [menuId]);

  // Scroll spy to update active service while scrolling
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

  // Scroll to section on service click
  const handleClick = (service) => {
    setActiveService(service);
    const el = document.getElementById(`service-${service.id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Fetch FAQ dynamically
  // Fetch FAQ dynamically
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch("https://auditfiling.com/api/v1/faq/1");
        const data = await res.json();
        console.log("FAQ API response:", data); // optional for debugging
        // ✅ API returns array directly
        setFaqs(Array.isArray(data) ? data : data.faqs || []);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };
    fetchFaqs();
  }, []);


  // ✅ Loading & error handling
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">Loading...</div>
    );
  if (!menuData)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Failed to load data
      </div>
    );

  return (
    <div className="min-h-screen">
      <Header />

      <div className="mx-auto w-full px-4 md:px-8 py-10 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="sticky top-24 ml-6 bg-white rounded-2xl p-5 h-auto md:h-[90vh] overflow-y-auto">
          <h1 className="text-3xl font-serif mt-10 pl-5  mb-5 text-gray-800">
            {menuData.name || "Income Tax"}
          </h1>

          <ul className="space-y-3">
            {services.length > 0 ? (
              services.map((service, idx) => (
                <li key={service.id || idx}>
                  <button
                    onClick={() => handleClick(service)}
                    className={`w-full text-left px-2 py-2 text-lg font-serif rounded-lg transition-all ${activeService?.id === service.id
                        ? "bg-blue-100 border-l-4 border-blue-600 text-blue-700 font-bold"
                        : "hover:bg-gray-100 text-gray-700"
                      }`}
                  >
                    {idx + 1}. {service.service_name || service.name}
                  </button>
                </li>
              ))
            ) : (
              <li className="text-gray-500 text-center">No services found</li>
            )}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-10 ">
          {/* Menu Overview */}
          <section className="bg-white rounded-2xl p-6">
            <h1 className="text-3xl md:text-4xl font-serif text-center mb-2 text-gray-900">
              {menuData.name || "Income Tax"}
            </h1>

            <div
              className="prose prose-blue w-full text-gray-700"
              dangerouslySetInnerHTML={{
                __html:
                  menuData.menu_description ||
                  menuData.description ||
                  "<p>No description available.</p>",
              }}
            ></div>
          </section>

          {/* Service List */}
          {services.map((service, idx) => (
            <section
              key={service.id || idx}
              id={`service-${service.id || idx}`}
              className="bg-white rounded-2xl p-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-center mb-4 text-gray-900">
                {service.service_name || service.name}
              </h2>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div
                  className="prose prose-blue w-full font-sans text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html:
                      service.service_description ||
                      service.description ||
                      "<p>No details available.</p>",
                  }}
                ></div>
              </div>
            </section>
          ))}

          {/* FAQ Section */}
          <section className="bg-white rounded-2xl p-6">
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-center mb-6 text-gray-900">
              Frequently Asked Questions
            </h2>

            {faqs.length > 0 ? (
              <ul className="space-y-4 ">
                {faqs.map((faq, idx) => (
                  <FAQItem key={faq.menu_id || idx} question={faq.question} answer={faq.answer} />
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center">No FAQs available.</p>
            )}
          </section>

          {/* Mobile QuickForm */}
          <div className="block md:hidden mt-20">
            <QuickForm />
          </div>
        </main>

        {/* Desktop QuickForm */}
        <div className="w-64 mt-24">
          <QuickForm />
        </div>
      </div>

      <WhatsAppPopup />
      <Footer />
    </div>
  );
}

// ✅ FAQ Accordion Item
function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <li className=" border-gray-200 rounded-xl p-4 shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left font-semibold text-lg text-gray-800 flex justify-between items-center"
      >
        <span
          dangerouslySetInnerHTML={{ __html: question || "Untitled Question" }}
        ></span>
        <span>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div
          className="mt-2 text-gray-700"
          dangerouslySetInnerHTML={{ __html: answer || "No answer available." }}
        ></div>
      )}
    </li>
  );
}


