// import React, { useEffect, useState } from "react";
// import Header from "../../component/Header";
// import WhatsAppPopup from "../../form/WhatsAppPopup";
// import { FaUserTie, FaBriefcase, FaUserEdit, FaUsers } from "react-icons/fa";
// import QuickForm from "../../form/QuickForm";

// export default function Company() {
//   const [serviceData, setServiceData] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [animate, setAnimate] = useState(false);

//  const services = [
//   {
//     title: "One Person Company Registration",
//     description: "Professional guidance for registering a One Person Company (OPC) with complete compliance support.",
//     additional: "We assist with all documentation, approvals, and filing for hassle-free OPC registration.",
//     image: "/img/opc.png",
//   },
//   {
//     title: "LLP Registration",
//     description: "Expert assistance in registering a Limited Liability Partnership (LLP) quickly and efficiently.",
//     additional: "We handle legal documents, filing, and registration approvals for your LLP.",
//     image: "/img/llp.png",
//   },
//   {
//     title: "Private Limited Company Registration",
//     description: "Complete support for Private Limited Company registration including MCA filings and compliance.",
//     additional: "Our team ensures smooth incorporation, documentation, and statutory compliance.",
//     image: "/img/private-limited.png",
//   },
//   {
//     title: "Public Limited Company Registration",
//     description: "Guidance and filing assistance for registering a Public Limited Company.",
//     additional: "We help with legal formalities, documentation, and government approvals.",
//     image: "/img/public-limited.png",
//   },
//   {
//     title: "Name Change Of Company",
//     description: "Assistance in changing your company’s name with proper compliance and filings.",
//     additional: "We handle ROC filings, approvals, and statutory compliance for name change.",
//     image: "/img/name-change.png",
//   },
//   {
//     title: "Registered Office Address Change",
//     description: "Support for changing your company’s registered office address legally and efficiently.",
//     additional: "Our experts file all necessary documents and approvals with the ROC.",
//     image: "/img/office-change.png",
//   },
//   {
//     title: "Change Of Director",
//     description: "Professional assistance in adding or changing directors in your company.",
//     additional: "We manage all legal filings and compliance with MCA for director changes.",
//     image: "/img/change-director.png",
//   },
//   {
//     title: "Removal of Director",
//     description: "Guidance and filing for the removal of directors from your company as per law.",
//     additional: "We ensure smooth ROC filing and legal compliance for director removal.",
//     image: "/img/remove-director.png",
//   },
//   {
//     title: "Project Report (DPR)",
//     description: "Expert preparation of Detailed Project Reports (DPR) for business planning and loans.",
//     additional: "We provide professionally drafted DPRs for banks, investors, and regulatory approvals.",
//     image: "/img/dpr.png",
//   },
//   {
//     title: "PF Return Filing",
//     description: "Assistance in filing Provident Fund returns for your employees on time.",
//     additional: "We handle calculations, documentation, and timely submission of PF returns.",
//     image: "/img/pf.png",
//   },
//   {
//     title: "ESI Return Filing",
//     description: "Support in filing Employee State Insurance (ESI) returns accurately and timely.",
//     additional: "Our team manages calculations, documentation, and submission for compliance.",
//     image: "/img/esi.png",
//   },
//   {
//     title: "Book keeping",
//     description: "Professional bookkeeping services for accurate financial records and compliance.",
//     additional: "We manage day-to-day accounting, ledgers, and reconciliations efficiently.",
//     image: "/img/bookkeeping.png",
//   },
//   {
//     title: "Company ITR Filing",
//     description: "Expert services for filing Income Tax Returns (ITR) for your company.",
//     additional: "We ensure accurate filing, deductions, and compliance with Income Tax laws.",
//     image: "/img/company-itr.png",
//   },
//   {
//     title: "Company Annual Filing",
//     description: "Assistance with your company’s annual filing and compliance requirements.",
//     additional: "We prepare and submit all necessary documents to ROC for annual compliance.",
//     image: "/img/annual-filing.png",
//   },
//   {
//     title: "ROC AGM Filing",
//     description: "Support in filing Annual General Meeting (AGM) records with the ROC.",
//     additional: "We ensure your AGM filings are complete, timely, and compliant with the law.",
//     image: "/img/roc-agm.png",
//   },
//   {
//     title: "TDS Return Filing",
//     description: "Professional assistance for filing Tax Deducted at Source (TDS) returns accurately.",
//     additional: "We handle calculations, documentation, and submission to the government portal.",
//     image: "/img/tds.png",
//   },
// ];


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
//     <div className="min-h-screen ">
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

export default function Company() {
  const [menuData, setMenuData] = useState(null);
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState([]);

  // 1️⃣ Fetch all menus and find "Company" or "MCA" menu
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

        // Find Company/MCA-related menu
        const companyMenu = menusData.find((menu) => {
          const name = (menu.name || menu.menu_name || "").toLowerCase();
          return (
            name.includes("company") ||
            name.includes("mca") ||
            name.includes("roc")
          );
        });

        if (companyMenu) {
          console.log("✅ Found Company/MCA menu:", companyMenu);
          fetchMenuDetail(companyMenu.id);
        } else {
          console.warn("⚠️ No Company/MCA menu found!");
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

      console.log("✅ Company/MCA Menu Data:", data);

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
      console.error("❌ Error fetching Company/MCA data:", err);
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
        Loading Company (MCA) data...
      </div>
    );

  if (!menuData)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg font-semibold">
        Company (MCA) data not found.
      </div>
    );

  // 5️⃣ Render UI
  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto w-full px-4 md:px-8 py-10 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="sticky top-30 ml-6 bg-white rounded-2xl p-5 h-auto md:h-[90vh] overflow-y-auto">
          <h1 className="text-3xl font-serif mt-10 text-left mb-5 text-gray-800">
            {menuData.name || menuData.menu_name || "Company (MCA)"}
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
          <section className="bg-white rounded-2xl p-6">
            <h1 className="text-3xl md:text-4xl font-serif text-center mb-4 text-gray-900">
              {menuData.name || "Company (MCA)"}
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

          <div className="block md:hidden mt-10">
            <QuickForm />
          </div>
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
