// import React, { useEffect, useState } from "react";
// import QuickForm from "../../form/QuickForm";
// import WhatsAppPopup from "../../form/WhatsAppPopup";
// import { useNavigate } from "react-router-dom";

// export default function Legal() {
//   const [menuData, setMenuData] = useState(null);
//   const [services, setServices] = useState([]);
//   const [activeService, setActiveService] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [menus, setMenus] = useState([]);
//   const [faqs, setFaqs] = useState([]);
//   const [activeSection, setActiveSection] = useState("");
//   const [selectedService, setSelectedService] = useState(""); // Added missing state
//   const navigate = useNavigate();

//   // 1️⃣ Fetch all menus and find Legal menu
//   useEffect(() => {
//     async function fetchMenus() {
//       try {
//         const res = await fetch("https://auditfiling.com/api/v1/web/menu");
//         const data = await res.json();

//         const menusData =
//           Array.isArray(data)
//             ? data
//             : data.menus || data.data || data.menu || [];

//         setMenus(menusData);

//         console.log("✅ All Menus:", menusData.map(m => ({
//           id: m.id,
//           name: m.name || m.menu_name
//         })));

//         // Find legal-related menu - Fixed duplicate conditions
//         const legalMenu = menusData.find((menu) => {
//           const name = (menu.name || menu.menu_name || "").toLowerCase();
//           return (
//             name.includes("legal") ||
//             name.includes("law") || // Added different terms
//             name.includes("compliance") ||
//             name.includes("legal services")
//           );
//         });

//         if (legalMenu) {
//           console.log("✅ Found Legal menu:", legalMenu);
//           fetchMenuDetail(legalMenu.id);
//         } else {
//           console.warn("⚠️ No Legal menu found!");
//           setLoading(false);
//         }
//       } catch (err) {
//         console.error("❌ Error fetching menus:", err);
//         setLoading(false);
//       }
//     }

//     fetchMenus();
//   }, []);

//   // 2️⃣ Fetch menu details by ID
//   const fetchMenuDetail = async (id) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`https://auditfiling.com/api/v1/menu/${id}`);
//       const data = await res.json();

//       console.log("✅ Legal Menu Data:", data);

//       const menu = data.menu || data.data || data.menu_data || data || null;
//       if (menu) {
//         setMenuData(menu);
//         const allServices =
//           menu.services ||
//           menu.menu_services ||
//           menu.items ||
//           menu.submenus ||
//           [];
//         setServices(allServices);
//         if (allServices.length > 0) {
//           setActiveService(allServices[0]);
//           // Set initial selected service for payment
//           setSelectedService(allServices[0].id || allServices[0].service_id || "");
//         }
//       }
//     } catch (err) {
//       console.error("❌ Error fetching Legal data:", err);
//     }
//     setLoading(false);
//   };

//   // Handle scroll behavior and active section highlighting
//   useEffect(() => {
//     const handleHash = () => {
//       const hash = window.location.hash;
//       if (hash) {
//         const el = document.getElementById(hash.substring(1));
//         if (el) {
//           el.scrollIntoView({ behavior: "smooth", block: "start" });
//         }
//       }
//     };

//     const handleScroll = () => {
//       const scrollPosition = window.scrollY + 100;

//       // Find which section is currently in view
//       const sections = [
//         { id: "menu-overview", title: "Overview" },
//         ...services.map((service, idx) => ({
//           id: `service-${service.id || idx}`,
//           title: service.service_name || service.name
//         })),
//         { id: "faq-section", title: "FAQ" }
//       ];

//       for (let i = sections.length - 1; i >= 0; i--) {
//         const section = document.getElementById(sections[i].id);
//         if (section && section.offsetTop <= scrollPosition) {
//           setActiveSection(sections[i].id);
//           break;
//         }
//       }
//     };

//     handleHash();
//     window.addEventListener("scroll", handleScroll, { passive: true });

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [services]);

//   const handleSectionClick = (id) => {
//     setActiveSection(id);
//     window.history.pushState(null, null, `#${id}`);
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   };

//   // Scroll to section on service click
//   const handleClick = (service) => {
//     setActiveService(service);
//     const id = `service-${service.id || services.indexOf(service)}`; // Fixed ID generation
//     setActiveSection(id);
//     window.history.pushState(null, null, `#${id}`);
//     const el = document.getElementById(id);
//     if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   // ✅ Smooth scroll to FAQ section
//   const handleFaqClick = () => {
//     setActiveSection("faq-section");
//     window.history.pushState(null, null, `#faq-section`);
//     const el = document.getElementById("faq-section");
//     if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   const handleProceed = async () => {
//     if (!selectedService) return;

//     try {
//       const serviceId = parseInt(selectedService);
//       const serviceObj = services.find((s) => s.id === serviceId);

//       if (!serviceObj) {
//         console.error('Service not found in local data');
//         return;
//       }

//       // Use the current menuData ID dynamically
//       const currentMenuId = menuData?.id;

//       if (!currentMenuId) {
//         throw new Error('No menu ID available');
//       }

//       const response = await fetch(`https://auditfiling.com/api/v1/menu/${currentMenuId}`);

//       if (!response.ok) {
//         throw new Error(`API error: ${response.status}`);
//       }

//       const menuDataResponse = await response.json();
//       console.log('API Response:', menuDataResponse);

//       // Find the specific service in the services array that matches our selected service ID
//       const selectedServiceData = menuDataResponse.services?.find(service =>
//         service.id === serviceId
//       );

//       if (selectedServiceData) {
//         // Use the service_content directly from API (already URL-friendly)
//         const routeName = selectedServiceData.service_content;

//         console.log(`Service type: ${selectedServiceData.type}`);
//         console.log(`Navigating to: /documents/${routeName}`);

//         navigate(`/documents/${routeName}`);
//       } else {
//         // Fallback if service not found in API response
//         throw new Error('Service not found in API response');
//       }

//     } catch (error) {
//       console.error('Error in handleProceed:', error);

//       // Fallback: proceed without API using local service data
//       const serviceObj = services.find((s) => s.id === parseInt(selectedService));
//       if (serviceObj) {
//         console.warn('API failed, proceeding with fallback navigation');
//         const routeName = serviceObj.service_name
//           .toLowerCase()
//           .replace(/\s+/g, "-")
//           .replace(/[()]/g, "");
//         navigate(`/documents/${routeName}`);
//       } else {
//         alert('Unable to proceed. Please try again.');
//       }
//     }
//   };
//   // Fetch FAQ dynamically
//   useEffect(() => {
//     const fetchFaqs = async () => {
//       if (!menuData?.id) return; // Wait until menu data is available

//       try {
//         const res = await fetch(`https://auditfiling.com/api/v1/faq/${menuData.id}`);
//         const data = await res.json();
//         setFaqs(Array.isArray(data) ? data : data.faqs || []);
//       } catch (error) {
//         console.error("Error fetching FAQs:", error);
//       }
//     };

//     fetchFaqs();
//   }, [menuData?.id]); // Re-fetch when menu ID changes


//   // 4️⃣ Loading & error handling
//   if (loading)
//     return (
//       <div className="flex items-center justify-center h-screen text-gray-700 font-semibold text-lg">
//         Loading Legal data...
//       </div>
//     );

//   if (!menuData)
//     return (
//       <div className="flex items-center justify-center h-screen text-red-500 text-lg font-semibold">
//         Legal data not found.
//       </div>
//     );

//   // 5️⃣ Render UI
//   return (
//     <div className="min-h-screen">
//       <div className="mx-auto w-full px-4 md:px-8 mt-25 py-10 flex flex-col md:flex-row gap-8">
//         {/* Sidebar Navigation */}
//         <nav className="lg:sticky lg:top-24 ml-10 lg:self-start bg-white rounded-2xl p-5 h-auto md:h-[90vh] overflow-y-auto">
//           <h1 className="text-3xl font-serif pl-5 mb-5 text-gray-800">
//             {menuData.name || menuData.menu_name || "Legal"}
//           </h1>

//           <ul className="space-y-3">
//             {/* Overview Link */}
//             <li>
//               <a
//                 href="#menu-overview"
//                 onClick={() => handleSectionClick("menu-overview")}
//                 className={`flex items-start py-2 px-3 rounded-lg transition-all duration-200 ${activeSection === "menu-overview"
//                     ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-medium"
//                     : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
//                   }`}
//               >
//                 <span className="text-sm font-medium text-gray-400 w-6 flex-shrink-0">1.</span>
//                 <span className="text-lg leading-tight">Overview</span>
//               </a>
//             </li>

//             {/* Services Links */}
//             {services.length > 0 ? (
//               services.map((service, idx) => (
//                 <li key={service.id || idx}>
//                   <a
//                     href={`#service-${service.id || idx}`}
//                     onClick={() => handleClick(service)}
//                     className={`flex items-start py-2 px-3 rounded-lg transition-all duration-200 ${activeSection === `service-${service.id || idx}`
//                         ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-medium"
//                         : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
//                       }`}
//                   >
//                     <span className="text-sm font-medium text-gray-400 w-6 flex-shrink-0">
//                       {idx + 2}.
//                     </span>
//                     <span className="text-lg leading-tight">{service.service_name || service.name}</span>
//                   </a>
//                 </li>
//               ))
//             ) : (
//               <li className="text-gray-500 text-center py-2">No services found</li>
//             )}

//             {/* FAQ link */}
//             <li>
//               <a
//                 href="#faq-section"
//                 onClick={handleFaqClick}
//                 className={`flex items-start py-2 px-3 rounded-lg transition-all duration-200 ${activeSection === "faq-section"
//                     ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-medium"
//                     : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
//                   }`}
//               >
//                 <span className="text-sm font-medium text-gray-400 w-6 flex-shrink-0">
//                   {services.length + 2}.
//                 </span>
//                 <span className="text-lg leading-tight">Frequently Asked Questions</span>
//               </a>
//             </li>
//           </ul>
//         </nav>

//         {/* Main Content */}
//         <main className="flex-1 space-y-12 mr-80">
//           {/* Menu Overview */}
//           <section id="menu-overview" className="bg-white rounded-2xl shadow-sm p-6 scroll-mt-30">
//             <h1 className="text-3xl md:text-4xl font-serif text-center mb-4 text-gray-900">
//               {menuData.name || "Legal"}
//             </h1>
//             <div
//               className="prose prose-blue w-full text-gray-700"
//               dangerouslySetInnerHTML={{
//                 __html:
//                   menuData.menu_description ||
//                   menuData.description ||
//                   "<p>No description available.</p>",
//               }}
//             ></div>
//           </section>

//           {/* Services Sections */}
//           {services.map((service, idx) => (
//             <section
//               key={service.id || idx}
//               id={`service-${service.id || idx}`}
//               className="bg-white rounded-2xl shadow-sm p-6 scroll-mt-30"
//             >
//               <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-900">
//                 {service.service_name || service.name}
//               </h1>
//               <div
//                 className="prose prose-blue w-full text-gray-700"
//                 dangerouslySetInnerHTML={{
//                   __html:
//                     service.service_description ||
//                     service.description ||
//                     "<p>No details available.</p>",
//                 }}
//               ></div>
//             </section>
//           ))}

//           {/* FAQ Section */}
//           <section id="faq-section" className="bg-white rounded-2xl p-6 scroll-mt-30">
//             <h1 className="text-2xl md:text-3xl font-bold font-serif text-center mb-6 text-gray-900">
//               Frequently Asked Questions
//             </h1>

//             {faqs.length > 0 ? (
//               <ul className="space-y-4">
//                 {faqs.map((faq, idx) => (
//                   <FAQItem
//                     key={faq.id || faq.faq_id || idx} // Fixed key prop
//                     question={faq.question}
//                     answer={faq.answer}
//                   />
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-500 text-center">No FAQs available.</p>
//             )}
//           </section>

//           {/* Mobile QuickForm and Payment - Only show on mobile */}
//           <div className="block lg:hidden space-y-4">
//             <QuickForm />
//             <div className="bg-white shadow-sm rounded-2xl p-2 w-full border border-gray-100">
//               <h2 className="text-xl font-semibold text-gray-800 text-center mb-1">
//                 Proceed to Payment
//               </h2>
//               <p className="text-gray-500 text-center text-sm mb-2">
//                 Choose your Legal service to continue with payment
//               </p>

//               <div className="mb-4">
//                 <label htmlFor="service-mobile" className="block text-gray-700 font-medium mb-1">
//                   Select Service
//                 </label>
//                 <select
//                   id="service-mobile"
//                   value={selectedService}
//                   onChange={(e) => setSelectedService(e.target.value)}
//                   className="w-full border border-gray-300 px-1 py-1 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                 >
//                   <option value="">-- Choose a service --</option>
//                   {services.map((service) => (
//                     <option
//                       key={service.id || service.service_id}
//                       value={service.id || service.service_id}
//                     >
//                       {service.service_name || service.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <button
//                 onClick={handleProceed}
//                 disabled={!selectedService}
//                 className={`w-full font-semibold py-1 rounded-lg transition duration-200 ${selectedService
//                     ? "bg-blue-600 text-white hover:bg-blue-700"
//                     : "bg-gray-300 text-gray-600 cursor-not-allowed"
//                   }`}
//               >
//                 Proceed to Pay
//               </button>
//             </div>
//           </div>
//         </main>

//         {/* Desktop QuickForm and Payment - Only show on desktop */}
//         <div className="hidden lg:block fixed mt-1 right-20 w-64 space-y-4">
//           <QuickForm />
//           <div className="bg-white shadow-sm rounded-2xl p-4 w-full border border-gray-100">
//             <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
//               Proceed to Payment
//             </h2>
//             <p className="text-gray-500 text-center text-sm mb-4">
//               Choose your Legal service to continue with payment
//             </p>

//             <div className="mb-4">
//               <label htmlFor="service-desktop" className="block text-gray-700 font-medium mb-2">
//                 Select Service
//               </label>
//               <select
//                 id="service-desktop"
//                 value={selectedService}
//                 onChange={(e) => setSelectedService(e.target.value)}
//                 className="w-full border border-gray-300 px-3 py-2 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//               >
//                 <option value="">-- Choose a service --</option>
//                 {services.map((service) => (
//                   <option
//                     key={service.id || service.service_id}
//                     value={service.id || service.service_id}
//                   >
//                     {service.service_name || service.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <button
//               onClick={handleProceed}
//               disabled={!selectedService}
//               className={`w-full font-semibold py-2 rounded-lg transition duration-200 ${selectedService
//                   ? "bg-blue-600 text-white hover:bg-blue-700"
//                   : "bg-gray-300 text-gray-600 cursor-not-allowed"
//                 }`}
//             >
//               Proceed to Pay
//             </button>
//           </div>
//         </div>
//       </div>

//       <WhatsAppPopup />
//     </div>
//   );
// }

// // ✅ FAQ Accordion Item
// function FAQItem({ question, answer }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <li className="border border-gray-200 rounded-xl p-4 shadow-sm">
//       <button
//         onClick={() => setOpen(!open)}
//         className="w-full text-left font-bold text-[16px] text-blue-800 flex justify-between items-center"
//       >
//         <span
//           dangerouslySetInnerHTML={{ __html: question || "Untitled Question" }}
//         ></span>
//         <span className="text-lg font-bold">{open ? "−" : "+"}</span>
//       </button>

//       {open && (
//         <div
//           className="mt-3 text-gray-700"
//           dangerouslySetInnerHTML={{
//             __html: answer || "No answer available.",
//           }}
//         ></div>
//       )}
//     </li>
//   );
// }

import React, { useEffect, useState } from "react";
import QuickForm from "../../form/QuickForm";
import WhatsAppPopup from "../../form/WhatsAppPopup";
import { useNavigate } from "react-router-dom";

export default function Legal() {
  const [menuData, setMenuData] = useState(null);
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [activeSection, setActiveSection] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const navigate = useNavigate();

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // 1️⃣ Fetch all menus and find Legal menu
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

        // Find legal-related menu
        const legalMenu = menusData.find((menu) => {
          const name = (menu.name || menu.menu_name || "").toLowerCase();
          return (
            name.includes("legal") ||
            name.includes("law") ||
            name.includes("compliance") ||
            name.includes("legal services")
          );
        });

        if (legalMenu) {
          console.log("✅ Found Legal menu:", legalMenu);
          fetchMenuDetail(legalMenu.id);
        } else {
          console.warn("⚠️ No Legal menu found!");
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

      console.log("✅ Legal Menu Data:", data);

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
        if (allServices.length > 0) {
          setActiveService(allServices[0]);
          setSelectedService(allServices[0].id || allServices[0].service_id || "");
        }
      }
    } catch (err) {
      console.error("❌ Error fetching Legal data:", err);
    }
    setLoading(false);
  };

  // Handle scroll behavior and active section highlighting
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const el = document.getElementById(hash.substring(1));
        if (el) {
          const offset = isMobile ? 80 : 100;
          const elementPosition = el.offsetTop - offset;
          window.scrollTo({ top: elementPosition, behavior: "smooth" });
        }
      }
    };

    const handleScroll = () => {
      const offset = isMobile ? 80 : 100;
      const scrollPosition = window.scrollY + offset;

      // Find which section is currently in view
      const sections = [
        { id: "menu-overview", title: "Overview" },
        ...services.map((service, idx) => ({
          id: `service-${service.id || idx}`,
          title: service.service_name || service.name
        })),
        { id: "faq-section", title: "FAQ" }
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    handleHash();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [services, isMobile]);

  const handleSectionClick = (id) => {
    setActiveSection(id);
    window.history.pushState(null, null, `#${id}`);
    const element = document.getElementById(id);
    if (element) {
      const offset = isMobile ? 80 : 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  // Scroll to section on service click
  const handleClick = (service) => {
    setActiveService(service);
    const id = `service-${service.id || services.indexOf(service)}`;
    setActiveSection(id);
    window.history.pushState(null, null, `#${id}`);
    const el = document.getElementById(id);
    if (el) {
      const offset = isMobile ? 80 : 100;
      const elementPosition = el.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  // ✅ Smooth scroll to FAQ section
  const handleFaqClick = () => {
    setActiveSection("faq-section");
    window.history.pushState(null, null, `#faq-section`);
    const el = document.getElementById("faq-section");
    if (el) {
      const offset = isMobile ? 80 : 100;
      const elementPosition = el.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  const handleProceed = async () => {
    if (!selectedService) {
      console.warn("No service selected.");
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));

    // 🔒 Check login
    if (!user || !user.id) {
      const serviceObj = services.find((s) => s.id === parseInt(selectedService));
      navigate('/', {
        state: {
          redirectTo: '/documents',
          selectedService: selectedService,
          serviceData: serviceObj,
          message: 'Please login to access documents'
        }
      });
      return;
    }

    try {
      const serviceId = parseInt(selectedService);

      // 🔗 Fetch from API
      const response = await fetch(`https://auditfiling.com/api/v1/service/${serviceId}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'User-ID': user.id
        }
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      console.log("API Response:", data);

      // ✅ Handle both object and array response formats
      const selectedServiceData = Array.isArray(data.services)
        ? data.services.find((s) => s.id === serviceId)
        : data.id === serviceId
          ? data
          : null;

      if (selectedServiceData) {
        const routeName = selectedServiceData.service_name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[()]/g, '');

        navigate(`/proceed/${routeName}`, {
          state: { serviceData: selectedServiceData }
        });
      } else {
        console.warn("Service not found in API response — using fallback");
        throw new Error("Service not found");
      }

    } catch (error) {
      console.error("Error in handleProceed:", error);

      // 🔁 Fallback — use local service data
      const serviceObj = services.find((s) => s.id === parseInt(selectedService));
      if (serviceObj) {
        const routeName = serviceObj.service_name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[()]/g, '');
        const queryParams = new URLSearchParams({ serviceId: selectedService }).toString();
        const redirectPath = `/documents/${routeName}?${queryParams}`;

        console.warn("API failed, proceeding with fallback navigation");
        navigate(redirectPath, { state: { serviceData: serviceObj } });
      } else {
        alert('Unable to proceed. Please try again.');
      }
    }
  };

  // Fetch FAQ dynamically
  useEffect(() => {
    const fetchFaqs = async () => {
      if (!menuData?.id) return;

      try {
        const res = await fetch(`https://auditfiling.com/api/v1/faq/${menuData.id}`);
        const data = await res.json();
        setFaqs(Array.isArray(data) ? data : data.faqs || []);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFaqs();
  }, [menuData?.id]);

  // 4️⃣ Loading & error handling
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-700 font-semibold text-lg">
        Loading Legal data...
      </div>
    );

  if (!menuData)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg font-semibold">
        Legal data not found.
      </div>
    );

  // 5️⃣ Render UI
  return (
    <div className="min-h-screen ">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 mt-20 sm:mt-25 py-6 sm:py-10 flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
        {/* Sidebar Navigation - Hidden on mobile */}
        {!isMobile && (
          <nav className={`flex-none ${isTablet ? 'lg:w-64' : 'xl:w-80'} sticky top-24 ml-18 self-start bg-white  p-4 sm:p-6 h-auto overflow-y-auto  scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full hover:scrollbar-thumb-blue-400 transition-colors`}>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif mb-4 sm:mb-5 text-gray-800">
              {menuData.name || menuData.menu_name || "Legal"}
            </h1>

            <ul className="space-y-2 list-none sm:space-y-3">
              {/* Overview Link */}
              <li>
                <a
                  href="#menu-overview"
                  onClick={() => handleSectionClick("menu-overview")}
                  className={`flex items-start py-2 px-3 rounded-lg transition-all duration-200 ${activeSection === "menu-overview"
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-medium"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                >
                  <span className="text-sm sm:text-lg leading-tight">Overview</span>
                </a>
              </li>

              {/* Services Links */}
              {services.length > 0 ? (
                services.map((service, idx) => (
                  <li key={service.id || idx}>
                    <a
                      href={`#service-${service.id || idx}`}
                      onClick={() => handleClick(service)}
                      className={`flex items-start py-1 px-2 rounded-lg transition-all duration-200 ${activeSection === `service-${service.id || idx}`
                        ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-medium"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                        }`}
                    >

                      <span className="text-sm sm:text-lg leading-tight">{service.service_name || service.name}</span>
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-center py-2">No services found</li>
              )}

              {/* FAQ link */}
              <li>
                <a
                  href="#faq-section"
                  onClick={handleFaqClick}
                  className={`flex items-start py-2 px-3 rounded-lg transition-all duration-200 ${activeSection === "faq-section"
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-medium"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                >

                  <span className="text-sm sm:text-lg leading-tight">Frequently Asked Questions</span>
                </a>
              </li>
            </ul>
          </nav>
        )}

        {/* Main Content */}
        <main className={`flex-1 space-y-6 sm:space-y-8 lg:space-y-12 ${!isMobile ? 'lg:mr-2' : ''}`}>
          {/* Menu Overview */}
          <section id="menu-overview" className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 scroll-mt-24 sm:scroll-mt-30">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-center mb-4 text-gray-900">
              {menuData.name || "Legal"}
            </h1>
            <div
              className="prose prose-sm sm:prose-base text-justify max-w-none text-gray-700"
              dangerouslySetInnerHTML={{
                __html:
                  menuData.menu_description ||
                  menuData.description ||
                  "<p>No description available.</p>",
              }}
            ></div>
          </section>

          {/* Services Sections */}
          {services.map((service, idx) => (
            <section
              key={service.id || idx}
              id={`service-${service.id || idx}`}
              className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 scroll-mt-24 sm:scroll-mt-30"
            >
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 text-gray-900">
                {service.service_name || service.name}
              </h1>
              <div
                className="prose prose-sm sm:prose-base text-justify max-w-none text-gray-700"
                dangerouslySetInnerHTML={{
                  __html:
                    service.service_description ||
                    service.description ||
                    "<p>No details available.</p>",
                }}
              ></div>
            </section>
          ))}

          {/* FAQ Section */}
          <section id="faq-section" className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 scroll-mt-24 sm:scroll-mt-30">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-center mb-4 sm:mb-6 text-gray-900">
              Frequently Asked Questions
            </h1>

            {faqs.length > 0 ? (
              <ul className="space-y-3 sm:space-y-4">
                {faqs.map((faq, idx) => (
                  <FAQItem
                    key={faq.id || faq.faq_id || idx}
                    question={faq.question}
                    answer={faq.answer}
                    isMobile={isMobile}
                  />
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center">No FAQs available.</p>
            )}
          </section>

          {/* Mobile QuickForm and Payment */}
          {isMobile && (
            <div className="space-y-4 mt-6">
              <QuickForm />
              <div className="bg-white shadow-sm rounded-xl p-4 w-full border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 text-center mb-3">
                  Proceed to Payment
                </h2>
                <p className="text-gray-500 text-center text-sm mb-4">
                  Choose your Legal service to continue with payment
                </p>

                <div className="mb-4">
                  <label htmlFor="service-mobile" className="block text-gray-700 font-medium mb-2">
                    Select Service
                  </label>
                  <select
                    id="service-mobile"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  >
                    <option value="">-- Choose a service --</option>
                    {services.map((service) => (
                      <option
                        key={service.id || service.service_id}
                        value={service.id || service.service_id}
                      >
                        {service.service_name || service.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleProceed}
                  disabled={!selectedService}
                  className={`w-full font-semibold py-3 rounded-lg transition duration-200 ${selectedService
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Desktop & Tablet QuickForm and Payment */}
        {!isMobile && (
          <div className={`flex-none ${isTablet ? 'lg:w-60' : 'xl:w-72'} space-y-4 `}>
            <div className="sticky top-24 space-y-4 mr-15">
              <QuickForm />
              <div className="bg-white shadow-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 w-full border border-gray-100">
                <h1 className="text-lg font-semibold text-gray-800 text-center mb-2 ">
                  Proceed to Payment
                </h1>
                <p className="text-gray-500 text-center text-base mb-1 ">
                  Choose your Legal service to continue with payment
                </p>

                <div className="mb-2">
                  <label htmlFor="service-desktop" className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                    Select Service
                  </label>
                  <select
                    id="service-desktop"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm sm:text-base"
                  >
                    <option value="">-- Choose a service --</option>
                    {services.map((service) => (
                      <option
                        key={service.id || service.service_id}
                        value={service.id || service.service_id}
                      >
                        {service.service_name || service.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleProceed}
                  disabled={!selectedService}
                  className={`w-full font-semibold py-1 sm:py-2 rounded-lg transition duration-200 text-sm sm:text-base ${selectedService
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <WhatsAppPopup />
    </div>
  );
}

// ✅ FAQ Accordion Item
function FAQItem({ question, answer, isMobile }) {
  const [open, setOpen] = useState(false);

  return (
    <li className="border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left font-semibold sm:font-bold text-sm sm:text-[16px] text-blue-800 flex justify-between items-start hover:text-blue-900 transition-colors duration-200"
      >
        <span
          className="text-left flex-1 pr-2"
          dangerouslySetInnerHTML={{ __html: question || "Untitled Question" }}
        ></span>
        <span className="text-lg sm:text-xl font-light flex-shrink-0 mt-1">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div
          className="mt-2 sm:mt-3 text-gray-700 leading-relaxed border-t border-gray-100 pt-2 sm:pt-3 text-sm sm:text-base"
          dangerouslySetInnerHTML={{
            __html: answer || "No answer available.",
          }}
        ></div>
      )}
    </li>
  );
}