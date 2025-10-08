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

export default function GstPage() {
  const [menuData, setMenuData] = useState(null);
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState([]);

  // 1️⃣ Fetch all menus and find GST menu
  useEffect(() => {
    async function fetchMenus() {
      try {
        const res = await fetch("https://auditfiling.com/api/v1/web/menu");
        const data = await res.json();

        const menusData = Array.isArray(data) ? data : data.menus || [];
        setMenus(menusData);

        // Find menu with name containing GST
        const gstMenu = menusData.find(
          (menu) =>
            (menu.name && menu.name.toLowerCase().includes("gst")) ||
            (menu.menu_name && menu.menu_name.toLowerCase().includes("gst"))
        );

        if (gstMenu) {
          console.log("✅ Found GST menu:", gstMenu);
          fetchMenuDetail(gstMenu.id);
        } else {
          console.warn("⚠️ No GST menu found!");
          setLoading(false);
        }
      } catch (err) {
        console.error("❌ Error fetching menus:", err);
        setLoading(false);
      }
    }
    fetchMenus();
  }, []);

  // 2️⃣ Fetch GST menu details
  const fetchMenuDetail = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`https://auditfiling.com/api/v1/menu/${id}`);
      const data = await res.json();

      console.log("✅ GST Menu Data:", data);

      const menu = data.menu || data.data || data.menu_data || data || null;
      if (menu) {
        setMenuData(menu);
        const allServices =
          menu.services ||
          menu.menu_services ||
          menu.items ||
          menu.submenus ||
          [];
        setServices(allServices);
        if (allServices.length > 0) setActiveService(allServices[0]);
      }
    } catch (err) {
      console.error("❌ Error fetching GST data:", err);
    }
    setLoading(false);
  };

  // 3️⃣ Scroll spy logic
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

  // 4️⃣ Loading & error handling
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-700 font-semibold text-lg">
        Loading GST data...
      </div>
    );

  if (!menuData)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg font-semibold">
        GST data not found.
      </div>
    );

  return (
    <div className="min-h-screen">
      <Header />

      <div className="mx-auto w-full px-4 md:px-8 py-10 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="sticky top-30 ml-6 bg-white rounded-2xl p-5 h-auto md:h-[90vh] overflow-y-auto">
          <h1 className="text-3xl font-serif mt-10 text-left mb-5 text-gray-800">
            {menuData.name || "GST"}
          </h1>

          <ul className="space-y-3">
            {services.length > 0 ? (
              services.map((service, idx) => (
                <li key={service.id || idx}>
                  <button
                    onClick={() => handleClick(service)}
                    className={`w-full text-left px-2 py-2 text-lg font-serif rounded-lg transition-all ${
                      activeService?.id === service.id
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
        <main className="flex-1 space-y-12 mt-20">
          {/* GST Overview */}
          <section className="bg-white rounded-2xl p-6">
            <h1 className="text-3xl md:text-4xl font-serif text-center mb-4 text-gray-900">
              {menuData.name || "GST"}
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

          {/* Services */}
          {services.map((service, idx) => (
            <section
              key={service.id || idx}
              id={`service-${service.id || idx}`}
              className="bg-white rounded-2xl p-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-900">
                {service.service_name || service.name}
              </h2>
              <div
                className="prose prose-blue w-full text-gray-700"
                dangerouslySetInnerHTML={{
                  __html:
                    service.service_description ||
                    service.description ||
                    "<p>No details available.</p>",
                }}
              ></div>
            </section>
          ))}

          <div className="block md:hidden mt-10">
            <QuickForm />
          </div>
        </main>

        <div className="hidden lg:block w-64">
          <QuickForm />
        </div>
      </div>

      <WhatsAppPopup />
    </div>
  );
}
