// import React, { useEffect, useState } from "react";
// import Header from "../../component/Header";
// import QuickForm from "../../form/QuickForm";
// import WhatsAppPopup from "../../form/WhatsAppPopup";
// import { useNavigate } from "react-router-dom";



// export default function GstPage() {
//   const [menuData, setMenuData] = useState(null);
//   const [services, setServices] = useState([]);
//   const [activeService, setActiveService] = useState(null);
//   const [selectedService, setSelectedService] = useState(""); // Added missing state
//   const [gstServices, setGstServices] = useState([]); // Added missing state
//   const [loading, setLoading] = useState(true);
//   const [menus, setMenus] = useState([]);
//   const [faqs, setFaqs] = useState([]);
//   const [activeSection, setActiveSection] = useState("");
//  const navigate = useNavigate();
//   // 1️⃣ Fetch all menus and find GST menu
//   useEffect(() => {
//     async function fetchMenus() {
//       try {
//         const res = await fetch("https://auditfiling.com/api/v1/web/menu");
//         const data = await res.json();

//         const menusData = Array.isArray(data) ? data : data.menus || [];
//         setMenus(menusData);

//         // Find menu with name containing GST
//         const gstMenu = menusData.find(
//           (menu) =>
//             (menu.name && menu.name.toLowerCase().includes("gst")) ||
//             (menu.menu_name && menu.menu_name.toLowerCase().includes("gst"))
//         );

//         if (gstMenu) {
//           console.log("✅ Found GST menu:", gstMenu);
//           fetchMenuDetail(gstMenu.id);
//         } else {
//           console.warn("⚠️ No GST menu found!");
//           setLoading(false);
//         }
//       } catch (err) {
//         console.error("❌ Error fetching menus:", err);
//         setLoading(false);
//       }
//     }
//     fetchMenus();
//   }, []);

//   // 2️⃣ Fetch GST menu details
//   const fetchMenuDetail = async (id) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`https://auditfiling.com/api/v1/menu/${id}`);
//       const data = await res.json();

//       console.log("✅ GST Menu Data:", data);

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
//         // Set GST services from the fetched services
//         setGstServices(allServices);
//         if (allServices.length > 0) {
//           setActiveService(allServices[0]);
//           setSelectedService(allServices[0].id || allServices[0].service_id || "");
//         }
//       }
//     } catch (err) {
//       console.error("❌ Error fetching GST data:", err);
//     }
//     setLoading(false);
//   };
// const handleProceed = async () => {
//   if (!selectedService) return;

//   try {
//     const serviceId = parseInt(selectedService);
//     const serviceObj = services.find((s) => s.id === serviceId);

//     if (!serviceObj) {
//       console.error('Service not found in local data');
//       return;
//     }

//     // Use the current menuData ID dynamically
//     const currentMenuId = menuData?.id;

//     if (!currentMenuId) {
//       throw new Error('No menu ID available');
//     }

//     const response = await fetch(`https://auditfiling.com/api/v1/menu/${currentMenuId}`);

//     if (!response.ok) {
//       throw new Error(`API error: ${response.status}`);
//     }

//     const menuDataResponse = await response.json();
//     console.log('API Response:', menuDataResponse);

//     // Find the specific service in the services array that matches our selected service ID
//     const selectedServiceData = menuDataResponse.services?.find(service => 
//       service.id === serviceId
//     );

//     if (selectedServiceData) {
//       // Use the service_content directly from API (already URL-friendly)
//       const routeName = selectedServiceData.service_content;

//       console.log(`Service type: ${selectedServiceData.type}`);
//       console.log(`Navigating to: /documents/${routeName}`);

//       navigate(`/documents/${routeName}`);
//     } else {
//       // Fallback if service not found in API response
//       throw new Error('Service not found in API response');
//     }

//   } catch (error) {
//     console.error('Error in handleProceed:', error);

//     // Fallback: proceed without API using local service data
//     const serviceObj = services.find((s) => s.id === parseInt(selectedService));
//     if (serviceObj) {
//       console.warn('API failed, proceeding with fallback navigation');
//       const routeName = serviceObj.service_name
//         .toLowerCase()
//         .replace(/\s+/g, "-")
//         .replace(/[()]/g, "");
//       navigate(`/documents/${routeName}`);
//     } else {
//       alert('Unable to proceed. Please try again.');
//     }
//   }
// };
//   // Fetch FAQ dynamically
// useEffect(() => {
//   const fetchFaqs = async () => {
//     if (!menuData?.id) return; // Wait until menu data is available

//     try {
//       const res = await fetch(`https://auditfiling.com/api/v1/faq/${menuData.id}`);
//       const data = await res.json();
//       setFaqs(Array.isArray(data) ? data : data.faqs || []);
//     } catch (error) {
//       console.error("Error fetching FAQs:", error);
//     }
//   };

//   fetchFaqs();
// }, [menuData?.id]);

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
//     const id = `service-${service.id || service.service_id}`;
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

//   // Fetch FAQ dynamically
//   // useEffect(() => {
//   //   const fetchFaqs = async () => {
//   //     try {
//   //       const res = await fetch("https://auditfiling.com/api/v1/faq/6");
//   //       const data = await res.json();
//   //       console.log("FAQ API response:", data);
//   //       setFaqs(Array.isArray(data) ? data : data.faqs || []);
//   //     } catch (error) {
//   //       console.error("Error fetching FAQs:", error);
//   //     }
//   //   };
//   //   fetchFaqs();
//   // }, []);

//   // 4️⃣ Loading & error handling
//   if (loading)
//     return (
//       <div className="flex items-center justify-center h-screen text-gray-700 font-semibold text-lg">
//         Loading GST data...
//       </div>
//     );

//   if (!menuData)
//     return (
//       <div className="flex items-center justify-center h-screen text-red-500 text-lg font-semibold">
//         GST data not found.
//       </div>
//     );

//   return (
//     <div className="min-h-screen ">
//       {/* <Header /> */}

//       <div className="mx-auto w-full px-4 mt-25 md:px-8 py-10 flex flex-col md:flex-row gap-8">
//         {/* Sidebar Navigation - Updated to match PrivacyPolicy style */}
//         <nav className="lg:sticky lg:top-30 ml-10 lg:self-start  rounded-2xl  p-5 h-auto md:h-[90vh] overflow-y-auto">
//           <h1 className="text-3xl font-serif mb-5 text-gray-800">
//             {menuData.name || "GST"}
//           </h1>

//           <ul className="space-y-3">
//             {/* Overview Link */}
//             <li>
//               <a
//                 href="#menu-overview"
//                 onClick={() => handleSectionClick("menu-overview")}
//                 className={`flex items-start py-2 px-3 rounded-lg transition-all duration-200 ${
//                   activeSection === "menu-overview"
//                     ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 "
//                     : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
//                 }`}
//               >
//                 <span className="text-sm  text-gray-400 w-6 flex-shrink-0">1.</span>
//                 <span className="text-lg leading-tight">Overview</span>
//               </a>
//             </li>

//             {/* Services Links */}
//             {services.length > 0 ? (
//               services.map((service, idx) => (
//                 <li key={service.id || service.service_id || idx}>
//                   <a
//                     href={`#service-${service.id || service.service_id || idx}`}
//                     onClick={() => handleClick(service)}
//                     className={`flex items-start py-2 px-2 rounded-lg text-sm transition-all duration-200 ${
//                       activeSection === `service-${service.id || service.service_id || idx}`
//                         ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 "
//                         : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
//                     }`}
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
//                 className={`flex items-start py-2 px-3 rounded-lg transition-all duration-200 ${
//                   activeSection === "faq-section"
//                     ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-medium"
//                     : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
//                 }`}
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
//         <main className="flex-1 space-y-12 mr-80 ">
//           {/* GST Overview */}
//           <section id="menu-overview" className="bg-white rounded-2xl shadow-sm p-6 scroll-mt-37">
//             <h1 className="text-3xl md:text-4xl font-serif text-center mb-4 text-gray-900">
//               {menuData.name || "GST"}
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

//           {/* Services */}
//           {services.map((service, idx) => (
//             <section
//               key={service.id || service.service_id || idx}
//               id={`service-${service.id || service.service_id || idx}`}
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
//                     key={faq.id || faq.faq_id || idx}
//                     question={faq.question}
//                     answer={faq.answer}
//                   />
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-500 text-center">No FAQs available.</p>
//             )}
//           </section>

//           <div className="block md:hidden ">
//             <QuickForm />
//           </div>
//         </main>

//         {/* Payment Sidebar */}
//         <div className="fixed mt-1 right-20 w-64 space-y-1">
//           <QuickForm />
//           <div className="bg-white shadow-sm rounded-2xl p-2 w-full border border-gray-100">
//             <h2 className="text-2xl font-semibold text-gray-800 text-center mb-1">
//               Proceed to Payment
//             </h2>
//             <p className="text-gray-500 text-center text-sm mb-2">
//               Choose your GST service to continue with payment
//             </p>
// <div className="mb-6">
//                   <label htmlFor="service" className="block text-gray-700 font-medium mb-1">
//                     Select Service
//                   </label>
//                   <select
//                     id="service"
//                     value={selectedService}
//                     onChange={(e) => setSelectedService(e.target.value)}
//                     className="w-full border border-gray-300 px-1 py-1 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                   >
//                     <option value="">-- Choose a service --</option>
//                     {services.map((service) => (
//                       <option key={service.id || service.service_id} value={service.id || service.service_id}>
//                         {service.service_name || service.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//             <button
//               onClick={handleProceed}
//               disabled={!selectedService}
//               className={`w-full font-semibold py-1 rounded-lg transition duration-200 ${
//                 selectedService
//                   ? "bg-blue-600 text-white hover:bg-blue-700"
//                   : "bg-gray-300 text-gray-600 cursor-not-allowed"
//               }`}
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
//     <li className="border-gray-200 rounded-xl p-2 shadow-sm">
//       <button
//         onClick={() => setOpen(!open)}
//         className="w-full text-left font-bold text-[16px] text-blue-800 flex justify-between items-center"
//       >
//         <span
//           dangerouslySetInnerHTML={{ __html: question || "Untitled Question" }}
//         ></span>
//         <span>{open ? "−" : "+"}</span>
//       </button>

//       {open && (
//         <div
//           className="mt-2 text-gray-700"
//           dangerouslySetInnerHTML={{
//             __html: answer || "No answer available.",
//           }}
//         ></div>
//       )}
//     </li>
//   );
// }
import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import QuickForm from "../../form/QuickForm";
import WhatsAppPopup from "../../form/WhatsAppPopup";
import { useNavigate } from "react-router-dom";

export default function GstPage() {
  const [menuData, setMenuData] = useState(null);
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [gstServices, setGstServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [activeSection, setActiveSection] = useState("");
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
          // console.log("✅ Found GST menu:", gstMenu);
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

      // console.log("✅ GST Menu Data:", data);

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
        // Set GST services from the fetched services
        setGstServices(allServices);
        if (allServices.length > 0) {
          setActiveService(allServices[0]);
          setSelectedService(allServices[0].id || allServices[0].service_id || "");
        }
      }
    } catch (err) {
      console.error("❌ Error fetching GST data:", err);
    }
    setLoading(false);
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

        navigate(`/documents/${routeName}`, {
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
      if (!menuData?.id) return; // Wait until menu data is available

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
    const id = `service-${service.id || service.service_id}`;
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
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}

      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 mt-20 sm:mt-25 py-6 sm:py-10 flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
        {/* Sidebar Navigation - Hidden on mobile */}
        {!isMobile && (
          <nav className={`flex-none ${isTablet ? 'lg:w-64' : 'xl:w-80'} sticky top-24 self-start bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 h-auto overflow-y-auto shadow-sm`}>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif mb-4 sm:mb-5 text-gray-800">
              {menuData.name || "GST"}
            </h1>

            <ul className="space-y-2  list-none sm:space-y-3">
              {/* Overview Link */}
              <li>
                <a
                  href="#menu-overview"
                  onClick={() => handleSectionClick("menu-overview")}
                  className={`flex items-start py-2 px-3 rounded-lg transition-all duration-200 ${activeSection === "menu-overview"
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                >
                  <span className="text-sm sm:text-lg leading-tight">Overview</span>
                </a>
              </li>

              {/* Services Links */}
              {services.length > 0 ? (
                services.map((service, idx) => (
                  <li key={service.id || service.service_id || idx}>
                    <a
                      href={`#service-${service.id || service.service_id || idx}`}
                      onClick={() => handleClick(service)}
                      className={`flex items-start py-2 px-2 rounded-lg transition-all duration-200 ${activeSection === `service-${service.id || service.service_id || idx}`
                        ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
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
        <main className={`flex-1 space-y-6 sm:space-y-8 lg:space-y-12 ${!isMobile ? 'lg:mr-4 xl:mr-8' : ''}`}>
          {/* GST Overview */}
          <section id="menu-overview" className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 scroll-mt-24 sm:scroll-mt-37">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-center mb-4 text-gray-900">
              {menuData.name || "GST"}
            </h1>

            <div
              className="prose prose-sm sm:prose-base max-w-none text-gray-700"
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
              key={service.id || service.service_id || idx}
              id={`service-${service.id || service.service_id || idx}`}
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

          {/* Mobile Payment Section */}
          {isMobile && (
            <div className="bg-white shadow-sm rounded-xl p-4 w-full border border-gray-100 mt-6">
              <h2 className="text-xl font-semibold text-gray-800 text-center mb-3">
                Proceed to Payment
              </h2>
              <p className="text-gray-500 text-center text-sm mb-4">
                Choose your GST service to continue with payment
              </p>

              <div className="mb-4">
                <label htmlFor="mobile-service" className="block text-gray-700 font-medium mb-2">
                  Select Service
                </label>
                <select
                  id="service"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                >
                  <option value="">-- Choose a service --</option>
                  {services.map((service) => (
                    <option key={service.id || service.service_id} value={service.id || service.service_id}>
                      {service.service_name || service.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleProceed}
                disabled={!selectedService}
                className={`w-full font-semibold py-2 sm:py-3 rounded-lg transition duration-200 text-sm sm:text-base ${selectedService
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
              >
                Proceed to Pay
              </button>
            </div>
          )}

          {/* Mobile QuickForm */}
          {isMobile && (
            <div className="mt-6">
              <QuickForm />
            </div>
          )}
        </main>

        {/* Desktop & Tablet Sidebar - QuickForm & Payment */}
        {!isMobile && (
          <div className={`flex-none ${isTablet ? 'lg:w-60' : 'xl:w-72'} space-y-4 lg:space-y-6`}>
            <div className="sticky top-24 space-y-4 lg:space-y-6">
              <QuickForm />

              {/* Payment Sidebar */}
              <div className="bg-white shadow-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 w-full border border-gray-100">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-2 sm:mb-3">
                  Proceed to Payment
                </h2>
                <p className="text-gray-500 text-center text-xs sm:text-sm mb-3 sm:mb-4">
                  Choose your GST service to continue with payment
                </p>

                <div className="mb-4 sm:mb-6">
                  <label htmlFor="desktop-service" className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                    Select Service
                  </label>
                  <select
                    id="desktop-service"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm sm:text-base"
                  >
                    <option value="">-- Choose a service --</option>
                    {services.map((service) => (
                      <option key={service.id || service.service_id} value={service.id || service.service_id}>
                        {service.service_name || service.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleProceed}
                  disabled={!selectedService}
                  className={`w-full font-semibold py-2 sm:py-3 rounded-lg transition duration-200 text-sm sm:text-base ${selectedService
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

      {/* <WhatsAppPopup /> */}
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