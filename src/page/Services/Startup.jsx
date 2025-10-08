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

export default function StartUp() {
  const [menuData, setMenuData] = useState(null);
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState([]);

  // 1️⃣ Fetch all menus and find Startup menu
  useEffect(() => {
    async function fetchMenus() {
      try {
        const res = await fetch("https://auditfiling.com/api/v1/web/menu");
        const data = await res.json();

        const menusData =
          Array.isArray(data)
            ? data
            : data.menus || data.data || data.menu || [];

        setMenus(menusData);

        console.log("✅ All Menus:", menusData.map(m => ({
          id: m.id,
          name: m.name || m.menu_name
        })));

        // Find Startup-related menu
        const startupMenu = menusData.find((menu) => {
          const name = (menu.name || menu.menu_name || "").toLowerCase();
          return (
            name.includes("startup") ||
            name.includes("start-up") ||
            name.includes("start up")
          );
        });

        if (startupMenu) {
          console.log("✅ Found startup menu:", startupMenu);
          fetchMenuDetail(startupMenu.id);
        } else {
          console.warn("⚠️ No startup menu found!");
          setLoading(false);
        }
      } catch (err) {
        console.error("❌ Error fetching menus:", err);
        setLoading(false);
      }
    }

    fetchMenus();
  }, []);

  // 2️⃣ Fetch menu details by ID
  const fetchMenuDetail = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`https://auditfiling.com/api/v1/menu/${id}`);
      const data = await res.json();

      console.log("✅ Startup Menu Data:", data);

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
      console.error("❌ Error fetching Startup data:", err);
    }
    setLoading(false);
  };

  // 3️⃣ Scroll spy
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
        Loading Startup data...
      </div>
    );

  if (!menuData)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg font-semibold">
        Startup data not found.
      </div>
    );

  // 5️⃣ Render UI
  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto w-full px-4 md:px-8 py-10 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="sticky top-30 ml-6 bg-white rounded-xl p-5 h-auto md:h-[90vh] overflow-y-auto">
          <h1 className="text-3xl font-serif mt-10 text-left mb-5 text-gray-800">
            {menuData.name || menuData.menu_name || "Startup"}
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
        <main className="flex-1 space-y-10 mt-20">
          <section className="bg-white rounded-xl p-6">
            <h1 className="text-3xl md:text-4xl font-serif text-center mb-4 text-gray-900">
              {menuData.name || "Startup"}
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

          
        </main>

        <div className="hidden lg:block w-64">
          <QuickForm />
        </div>
      </div>

      <WhatsAppPopup />
      <Footer />
    </div>
  );
}
