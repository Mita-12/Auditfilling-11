

import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import QuickForm from "../../form/QuickForm";
import WhatsAppButton from "../../form/WhatsAppPopup";
import { useNavigate } from "react-router-dom";


export default function IncomeTax({ menuId }) {
  const [menuData, setMenuData] = useState(null);
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState([]);
  const [menuIds, setMenuIds] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch all menus
  useEffect(() => {
    async function fetchMenus() {
      try {
        const res = await fetch("https://auditfiling.com/api/v1/web/menu");
        const data = await res.json();
        const menusData = Array.isArray(data) ? data : data.menus || [];
        setMenus(menusData);

        const ids = menusData.map((m) => m.id);
        setMenuIds(ids);

        // Select first menu by default if no menuId provided
        if (!menuId && ids.length > 0) {
          setActiveService(null);
          fetchMenuDetail(ids[0]);
        }
      } catch (err) {
        console.error("Error fetching menus:", err);
      }
    }
    fetchMenus();
  }, [menuId]);

  // Fetch menu detail dynamically
  const fetchMenuDetail = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`https://auditfiling.com/api/v1/menu/${id}`);
      const data = await res.json();
      const menu = data.menu || data.data || data.menu_data || data || null;

      if (menu) {
        setMenuData(menu);
        const allServices = menu.services || menu.menu_services || menu.items || menu.submenus || [];
        setServices(allServices);
        if (allServices.length > 0) {
          setActiveService(allServices[0]);
          setSelectedService(allServices[0].id || "");
        }

        // Scroll to top whenever menu changes
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      console.error("Error fetching menu detail:", err);
    }
    setLoading(false);
  };

  // Update menu whenever menuId prop changes
  useEffect(() => {
    if (menuId) fetchMenuDetail(menuId);
  }, [menuId]);

  // Handle scroll behavior and active section highlighting
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const el = document.getElementById(hash.substring(1));
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      // Find which section is currently in view
      const sections = [
        { id: "menu-overview", title: "Overview" },
        ...services.map((service, idx) => ({
          id: `service-${service.id || idx}`,
          title: service.service_name || service.name,
        })),
        { id: "faq-section", title: "FAQ" },
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
  }, [services]);

  const handleSectionClick = (id) => {
    setActiveSection(id);
    window.history.pushState(null, null, `#${id}`);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll to section on service click
  const handleServiceClick = (service) => {
    setActiveService(service);
    const id = `service-${service.id || service.service_id}`;
    setActiveSection(id);
    window.history.pushState(null, null, `#${id}`);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Smooth scroll to FAQ section
  const handleFaqClick = () => {
    setActiveSection("faq-section");
    window.history.pushState(null, null, `#faq-section`);
    const el = document.getElementById("faq-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Handle proceed to payment
const handleProceed = async () => {
  var service_id = document.getElementById('service').value;
  console.log(service_id);
  
  if (!selectedService) return;

  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('user'));

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

  // User is logged in, proceed with API call
  try {
    const serviceId = parseInt(selectedService);
    // console.log(serviceId);
    
    const serviceObj = services.find((s) => s.id === serviceId);

    if (!serviceObj) {
      console.error('Service not found in local data');
      return;
    }

    // const currentMenuId = menuData?.id;
    // if (!currentMenuId) {
    //   throw new Error('No menu ID available');
    // }

    const response = await fetch(`https://auditfiling.com/api/v1/service/${serviceId}`, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'User-ID': user.id
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const menuDataResponse = await response.json();
    console.log('API Response:', menuDataResponse);

    const selectedServiceData = menuDataResponse.services?.find(service => 
      service.id === serviceId
    );

    if (selectedServiceData) {
      const routeName = selectedServiceData.service_content;
      const serviceType = selectedServiceData.type?.toLowerCase();

      console.log(`Service type: ${serviceType}`);
      console.log(`User ${user.id} processing service: ${routeName}`);

      // Handle different service types
      let redirectPath = '';
      let navigateState = { 
        serviceData: selectedServiceData,
        serviceType: serviceType
      };

      // Create query parameter with service ID
      const queryParams = new URLSearchParams({
        serviceId: selectedService
      }).toString();

      switch(serviceType) {
        case 'individual':
          // Show documents and price for individual
          redirectPath = `/documents/${routeName}?${queryParams}`;
          navigateState.serviceType = 'individual';
          break;

        case 'business':
          // Check if user has companies
          const userCompanies = await checkUserCompanies(user.id);
          if (userCompanies && userCompanies.length > 0) {
            // Show company list to select from
            redirectPath = `/service/${routeName}/select-company?${queryParams}`;
            navigateState.companies = userCompanies;
          } else {
            // Redirect to add company
            redirectPath = `/company/add?${queryParams}`;
            navigateState.message = 'Please add a company to proceed with this service';
          }
          break;

        case 'both':
          // Show type selection (individual vs business)
          redirectPath = `/service/${routeName}/select-type?${queryParams}`;
          break;

        default:
          // Default to individual behavior
          redirectPath = `/documents/${routeName}?${queryParams}`;
      }

      console.log(`Navigating to: ${redirectPath}`);
      navigate(redirectPath, { state: navigateState });

    } else {
      throw new Error('Service not found in API response');
    }

  } catch (error) {
    console.error('Error in handleProceed:', error);

    // Fallback: proceed without API using local service data
    const serviceObj = services.find((s) => s.id === parseInt(selectedService));
    if (serviceObj) {
      console.warn('API failed, proceeding with fallback navigation');

      const serviceType = serviceObj.type?.toLowerCase() || 'individual';
      const routeName = serviceObj.service_name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[()]/g, "");

      let redirectPath = '';
      let navigateState = { 
        serviceData: serviceObj,
        serviceType: serviceType
      };

      // Create query parameter with service ID for fallback
      const queryParams = new URLSearchParams({
        serviceId: selectedService
      }).toString();

      switch(serviceType) {
        case 'individual':
          redirectPath = `/documents/${routeName}?${queryParams}`;
          break;

        case 'business':
          redirectPath = `/company/add?${queryParams}`;
          navigateState.message = 'Please add a company to proceed with this service';
          break;

        case 'both':
          redirectPath = `/service/${routeName}/select-type?${queryParams}`;
          break;

        default:
          redirectPath = `/documents/${routeName}?${queryParams}`;
      }

      navigate(redirectPath, { state: navigateState });
    } else {
      alert('Unable to proceed. Please try again.');
    }
  }
};

// Helper function to check user companies
const checkUserCompanies = async (userId) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await fetch(`https://auditfiling.com/api/v1/users/${userId}/companies`, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    });

    if (response.ok) {
      const companies = await response.json();
      return companies;
    }
    return [];
  } catch (error) {
    console.error('Error checking user companies:', error);
    return [];
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
}, [menuData?.id]); // Re-fetch when menu ID changes 


  // Loading & error handling
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!menuData) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Failed to load data
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Outer container */}
      <div className="mx-auto w-full px-4 md:px-4 mt-25 py-10 pb-32">
        {/* Main layout container */}
        <div className="w-full flex flex-col md:flex-row gap-8 " style={{ height: "calc(100vh - 6rem)" }}>

          {/* Sidebar Navigation */}
          <nav className="flex-none lg:sticky lg:top-24 ml-0 md:ml-15 lg:self-start  bg-white rounded-2xl p-5 h-auto md:h-full overflow-auto shadow-sm">
            <h1 className="text-3xl font-serif pl-5 mb-5 text-gray-800">
              {menuData.name || "Income Tax"}
            </h1>

            <ul className=" list-none space-y-3">
              {/* Overview Link */}
              <li>
                <a
                  href="#menu-overview"
                  onClick={() => handleSectionClick("menu-overview")}
                  className={`flex items-start py-2 px-3 rounded-lg transition-all duration-200 ${
                    activeSection === "menu-overview"
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-medium"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg leading-tight">Overview</span>
                </a>
              </li>

              {/* Services Links */}
              {services.length > 0 ? (
                services.map((service, idx) => (
                  <li key={service.id || service.service_id || idx}>
                    <a
                      href={`#service-${service.id || service.service_id || idx}`}
                      onClick={() => handleServiceClick(service)}
                      className={`flex items-start py-2 px-3 rounded-lg transition-all duration-200  ${
                        activeSection === `service-${service.id || service.service_id || idx}`
                          ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-medium"
                          : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      {/* <span className="text-sm font-medium text-gray-400 w-6 flex-shrink-0">
                        {idx + 2}.
                      </span> */}
                      <span className="text-lg leading-tight">
                        {service.service_name || service.name}
                      </span>
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
                  className={`flex items-start py-2 px-3 rounded-lg transition-all duration-200 ${
                    activeSection === "faq-section"
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-medium"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                
                  <span className="text-lg leading-tight">Frequently Asked Questions</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Main Content (scrollable) */}
          <main className="flex-1 space-y-12 overflow-y-auto pr-4">
            {/* Menu Overview */}
            <section
              id="menu-overview"
              className="bg-white rounded-2xl shadow-sm p-6 scroll-mt-40"
            >
              <h1 className="text-3xl md:text-4xl font-serif text-center mb-4 text-gray-900">
                {menuData.name || "Income Tax"}
              </h1>
              <div
                className="prose prose-blue w-full text-justify text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: menuData.menu_description || menuData.description || "<p>No description available.</p>",
                }}
              />
            </section>

            {/* Service List */}
            {services.map((service, idx) => (
              <section
                key={service.id || service.service_id || idx}
                id={`service-${service.id || service.service_id || idx}`}
                className="bg-white rounded-2xl p-6 shadow-sm scroll-mt-35"
              >
                <h1 className="text-2xl md:text-3xl font-bold font-serif text-center mb-5 text-gray-900">
                  {service.service_name || service.name}
                </h1>

                <div className="flex flex-col md:flex-row items-start">
                  <div
                    className="prose prose-blue w-full text-justify font-sans text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: service.service_description || service.description || "<p>No details available.</p>",
                    }}
                  />
                </div>
              </section>
            ))}

            {/* FAQ Section */}
            <section id="faq-section" className="bg-white rounded-2xl p-6 scroll-mt-24">
              <h1 className="text-2xl md:text-3xl font-bold mt-20 font-serif text-center mb-6 text-gray-900">
                Frequently Asked Questions
              </h1>

              {faqs.length > 0 ? (
                <ul className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <FAQItem
                      key={faq.id || faq.faq_id || idx}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center">No FAQs available.</p>
              )}
            </section>

            {/* Mobile QuickForm */}
            <div className="block md:hidden mt-10 space-y-4">
              <QuickForm />

            </div>
          </main>

          {/* Desktop Sidebar - QuickForm & Payment */}
          <div className="hidden md:block lg:w-60 mr-15 flex-none">
            <div className="sticky top-24 space-y-4">
              <QuickForm />

              {/* Payment Section */}
              <div className="bg-white shadow-sm rounded-2xl p-1 w-full border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-1">
                  Proceed to Payment
                </h2>
                <p className="text-gray-500 text-center text-sm mb-4">
                  Choose your Income Tax service to continue with payment
                </p>

                <div className="mb-6">
                  <label htmlFor="service" className="block text-gray-700 font-medium mb-1">
                    Select Service
                  </label>
                  <select
                    id="service"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full border border-gray-300 px-1 py-1 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  >
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
                  className={`w-full font-semibold py-2 rounded-lg transition duration-200 ${
                    selectedService
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
              {/* <WhatsAppButton/> */}

    </div>
  );
}

// FAQ Accordion Item Component
function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <li className="border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left font-bold text-[16px] text-blue-800 flex justify-between items-center hover:text-blue-900 transition-colors duration-200"
      >
        <span
          className="text-left"
          dangerouslySetInnerHTML={{ __html: question || "Untitled Question" }}
        />
        <span className="text-xl font-light ml-4 flex-shrink-0">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div
          className="mt-3 text-gray-700 leading-relaxed border-t border-gray-100 pt-3"
          dangerouslySetInnerHTML={{
            __html: answer || "No answer available.",
          }}
        />
      )}
    </li>
  );
}


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import QuickForm from "../../form/QuickForm";
// import WhatsAppButton from "../../form/WhatsAppPopup";
// import { useNavigate } from "react-router-dom";

// export default function IncomeTax({ menuId }) {
//   const [menuData, setMenuData] = useState(null);
//   const [services, setServices] = useState([]);
//   const [activeService, setActiveService] = useState(null);
//   const [selectedService, setSelectedService] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [menus, setMenus] = useState([]);
//   const [menuIds, setMenuIds] = useState([]);
//   const [faqs, setFaqs] = useState([]);
//   const [activeSection, setActiveSection] = useState("");
//   const [isMobile, setIsMobile] = useState(false);
//   const [isTablet, setIsTablet] = useState(false);
//   const navigate = useNavigate();

//   // Check screen size on mount and resize
//   useEffect(() => {
//     const checkScreenSize = () => {
//       const width = window.innerWidth;
//       setIsMobile(width < 768);
//       setIsTablet(width >= 768 && width < 1024);
//     };

//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);

//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   // Scroll to top on page load
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   // Fetch all menus
//   useEffect(() => {
//     async function fetchMenus() {
//       try {
//         const res = await fetch("https://auditfiling.com/api/v1/web/menu");
//         const data = await res.json();
//         const menusData = Array.isArray(data) ? data : data.menus || [];
//         setMenus(menusData);

//         const ids = menusData.map((m) => m.id);
//         setMenuIds(ids);

//         // Select first menu by default if no menuId provided
//         if (!menuId && ids.length > 0) {
//           setActiveService(null);
//           fetchMenuDetail(ids[0]);
//         }
//       } catch (err) {
//         console.error("Error fetching menus:", err);
//       }
//     }
//     fetchMenus();
//   }, [menuId]);

//   // Fetch menu detail dynamically
//   const fetchMenuDetail = async (id) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`https://auditfiling.com/api/v1/menu/${id}`);
//       const data = await res.json();
//       const menu = data.menu || data.data || data.menu_data || data || null;

//       if (menu) {
//         setMenuData(menu);
//         const allServices = menu.services || menu.menu_services || menu.items || menu.submenus || [];
//         setServices(allServices);
//         if (allServices.length > 0) {
//           setActiveService(allServices[0]);
//           setSelectedService(allServices[0].id || "");
//         }

//         // Scroll to top whenever menu changes
//         window.scrollTo({ top: 0, behavior: "smooth" });
//       }
//     } catch (err) {
//       console.error("Error fetching menu detail:", err);
//     }
//     setLoading(false);
//   };

//   // Update menu whenever menuId prop changes
//   useEffect(() => {
//     if (menuId) fetchMenuDetail(menuId);
//   }, [menuId]);

//   // Handle scroll behavior and active section highlighting
//   useEffect(() => {
//     const handleHash = () => {
//       const hash = window.location.hash;
//       if (hash) {
//         const el = document.getElementById(hash.substring(1));
//         if (el) {
//           const offset = isMobile ? 80 : 100;
//           const elementPosition = el.offsetTop - offset;
//           window.scrollTo({ top: elementPosition, behavior: "smooth" });
//         }
//       }
//     };

//     const handleScroll = () => {
//       const offset = isMobile ? 80 : 100;
//       const scrollPosition = window.scrollY + offset;

//       // Find which section is currently in view
//       const sections = [
//         { id: "menu-overview", title: "Overview" },
//         ...services.map((service, idx) => ({
//           id: `service-${service.id || idx}`,
//           title: service.service_name || service.name,
//         })),
//         { id: "faq-section", title: "FAQ" },
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
//   }, [services, isMobile]);

//   const handleSectionClick = (id) => {
//     setActiveSection(id);
//     window.history.pushState(null, null, `#${id}`);
//     const element = document.getElementById(id);
//     if (element) {
//       const offset = isMobile ? 80 : 100;
//       const elementPosition = element.offsetTop - offset;
//       window.scrollTo({ top: elementPosition, behavior: "smooth" });
//     }
//   };

//   // Scroll to section on service click
//   const handleServiceClick = (service) => {
//     setActiveService(service);
//     const id = `service-${service.id || service.service_id}`;
//     setActiveSection(id);
//     window.history.pushState(null, null, `#${id}`);
//     const el = document.getElementById(id);
//     if (el) {
//       const offset = isMobile ? 80 : 100;
//       const elementPosition = el.offsetTop - offset;
//       window.scrollTo({ top: elementPosition, behavior: "smooth" });
//     }
//   };

//   // Smooth scroll to FAQ section
//   const handleFaqClick = () => {
//     setActiveSection("faq-section");
//     window.history.pushState(null, null, `#faq-section`);
//     const el = document.getElementById("faq-section");
//     if (el) {
//       const offset = isMobile ? 80 : 100;
//       const elementPosition = el.offsetTop - offset;
//       window.scrollTo({ top: elementPosition, behavior: "smooth" });
//     }
//   };

//   // Handle proceed to payment
//   const handleProceed = async () => {
//     if (!selectedService) return;

//     // Check if user is logged in
//     const user = JSON.parse(localStorage.getItem('user'));

//     if (!user || !user.id) {
//       const serviceObj = services.find((s) => s.id === parseInt(selectedService));
//       navigate('/', {
//         state: {
//           redirectTo: '/documents',
//           selectedService: selectedService,
//           serviceData: serviceObj,
//           message: 'Please login to access documents'
//         }
//       });
//       return;
//     }

//     // User is logged in, proceed with API call
//     try {
//       const serviceId = parseInt(selectedService);
//       const serviceObj = services.find((s) => s.id === serviceId);

//       if (!serviceObj) {
//         console.error('Service not found in local data');
//         return;
//       }

//       const currentMenuId = menuData?.id;
//       if (!currentMenuId) {
//         throw new Error('No menu ID available');
//       }

//       const response = await fetch(`https://auditfiling.com/api/v1/menu/${currentMenuId}`, {
//         headers: {
//           'Authorization': `Bearer ${user.token}`,
//           'User-ID': user.id
//         }
//       });

//       if (!response.ok) {
//         throw new Error(`API error: ${response.status}`);
//       }

//       const menuDataResponse = await response.json();
//       console.log('API Response:', menuDataResponse);

//       const selectedServiceData = menuDataResponse.services?.find(service =>
//         service.id === serviceId
//       );

//       if (selectedServiceData) {
//         const routeName = selectedServiceData.service_content;
//         const serviceType = selectedServiceData.type?.toLowerCase();

//         console.log(`Service type: ${serviceType}`);
//         console.log(`User ${user.id} processing service: ${routeName}`);

//         // Handle different service types
//         let redirectPath = '';
//         let navigateState = {
//           serviceData: selectedServiceData,
//           serviceType: serviceType
//         };

//         switch (serviceType) {
//           case 'individual':
//             // Show documents and price for individual
//             redirectPath = `/documents/${routeName}`;
//             navigateState.serviceType = 'individual';
//             break;

//           case 'business':
//             // Check if user has companies
//             const userCompanies = await checkUserCompanies(user.id);
//             if (userCompanies && userCompanies.length > 0) {
//               // Show company list to select from
//               redirectPath = `/service/${routeName}/select-company`;
//               navigateState.companies = userCompanies;
//             } else {
//               // Redirect to add company
//               redirectPath = '/company/add';
//               navigateState.message = 'Please add a company to proceed with this service';
//             }
//             break;

//           case 'both':
//             // Show type selection (individual vs business)
//             redirectPath = `/service/${routeName}/select-type`;
//             break;

//           default:
//             // Default to individual behavior
//             redirectPath = `/documents/${routeName}`;
//         }

//         console.log(`Navigating to: ${redirectPath}`);
//         navigate(redirectPath, { state: navigateState });

//       } else {
//         throw new Error('Service not found in API response');
//       }

//     } catch (error) {
//       console.error('Error in handleProceed:', error);

//       // Fallback: proceed without API using local service data
//       const serviceObj = services.find((s) => s.id === parseInt(selectedService));
//       if (serviceObj) {
//         console.warn('API failed, proceeding with fallback navigation');

//         const serviceType = serviceObj.type?.toLowerCase() || 'individual';
//         const routeName = serviceObj.service_name
//           .toLowerCase()
//           .replace(/\s+/g, "-")
//           .replace(/[()]/g, "");

//         let redirectPath = '';
//         let navigateState = {
//           serviceData: serviceObj,
//           serviceType: serviceType
//         };

//         switch (serviceType) {
//           case 'individual':
//             redirectPath = `/documents/${routeName}`;
//             break;

//           case 'business':
//             // In fallback, assume user needs to add company
//             redirectPath = '/company/add';
//             navigateState.message = 'Please add a company to proceed with this service';
//             break;

//           case 'both':
//             redirectPath = `/service/${routeName}/select-type`;
//             break;

//           default:
//             redirectPath = `/documents/${routeName}`;
//         }

//         navigate(redirectPath, { state: navigateState });
//       } else {
//         alert('Unable to proceed. Please try again.');
//       }
//     }
//   };

//   // Helper function to check user companies
//   const checkUserCompanies = async (userId) => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       const response = await fetch(`https://auditfiling.com/api/v1/users/${userId}/companies`, {
//         headers: {
//           'Authorization': `Bearer ${user.token}`,
//         }
//       });

//       if (response.ok) {
//         const companies = await response.json();
//         return companies;
//       }
//       return [];
//     } catch (error) {
//       console.error('Error checking user companies:', error);
//       return [];
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

//   // Loading & error handling
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-xl text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   if (!menuData) {
//     return (
//       <div className="flex items-center justify-center h-screen text-red-500">
//         Failed to load data
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Outer container */}
//       <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 mt-20 sm:mt-25 py-6 sm:py-10 pb-20 sm:pb-32">
//         {/* Main layout container */}
//         <div className={`w-full flex flex-col ${isTablet ? 'lg:flex-row' : 'xl:flex-row'} gap-4 sm:gap-6 lg:gap-8 min-h-screen`}>

//           {/* Sidebar Navigation - Hidden on mobile, visible on tablet and desktop */}
//           {!isMobile && (
//             <nav className={`flex-none ${isTablet ? 'lg:w-64' : 'xl:w-80'} sticky top-24 self-start bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 h-auto overflow-auto shadow-sm`}>
//               <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif mb-4 sm:mb-5 text-gray-800">
//                 {menuData.name || "Income Tax"}
//               </h1>

//               <ul className="space-y-2 sm:space-y-3">
//                 {/* Overview Link */}
//                 <li>
//                   <a
//                     href="#menu-overview"
//                     onClick={() => handleSectionClick("menu-overview")}
//                     className={`flex items-start py-2 px-3 rounded-lg transition-all duration-200 ${activeSection === "menu-overview"
//                       ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-medium"
//                       : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
//                       }`}
//                   >
//                     <span className="text-xs sm:text-sm font-medium text-gray-400 w-4 sm:w-6 flex-shrink-0">1.</span>
//                     <span className="text-sm sm:text-lg leading-tight">Overview</span>
//                   </a>
//                 </li>

//                 {/* Services Links */}
//                 {services.length > 0 ? (
//                   services.map((service, idx) => (
//                     <li key={service.id || service.service_id || idx}>
//                       <a
//                         href={`#service-${service.id || service.service_id || idx}`}
//                         onClick={() => handleServiceClick(service)}
//                         className={`flex items-start py-2 px-3 rounded-lg transition-all duration-200 ${activeSection === `service-${service.id || service.service_id || idx}`
//                           ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-medium"
//                           : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
//                           }`}
//                       >
//                         <span className="text-xs sm:text-sm font-medium text-gray-400 w-4 sm:w-6 flex-shrink-0">
//                           {idx + 2}.
//                         </span>
//                         <span className="text-sm sm:text-lg leading-tight">
//                           {service.service_name || service.name}
//                         </span>
//                       </a>
//                     </li>
//                   ))
//                 ) : (
//                   <li className="text-gray-500 text-center py-2">No services found</li>
//                 )}

//                 {/* FAQ link */}
//                 <li>
//                   <a
//                     href="#faq-section"
//                     onClick={handleFaqClick}
//                     className={`flex items-start py-2 px-3 rounded-lg transition-all duration-200 ${activeSection === "faq-section"
//                       ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-medium"
//                       : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
//                       }`}
//                   >
//                     <span className="text-xs sm:text-sm font-medium text-gray-400 w-4 sm:w-6 flex-shrink-0">
//                       {services.length + 2}.
//                     </span>
//                     <span className="text-sm sm:text-lg leading-tight">Frequently Asked Questions</span>
//                   </a>
//                 </li>
//               </ul>
//             </nav>
//           )}

//           {/* Main Content (scrollable) */}
//           <main className={`flex-1 space-y-6 sm:space-y-8 lg:space-y-12 overflow-y-auto ${isMobile ? 'pr-0' : 'pr-2 lg:pr-4'}`}>
//             {/* Menu Overview */}
//             <section
//               id="menu-overview"
//               className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 scroll-mt-24 sm:scroll-mt-30"
//             >
//               <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-center mb-4 text-gray-900">
//                 {menuData.name || "Income Tax"}
//               </h1>
//               <div
//                 className="prose prose-sm sm:prose-base max-w-none text-justify text-gray-700"
//                 dangerouslySetInnerHTML={{
//                   __html: menuData.menu_description || menuData.description || "<p>No description available.</p>",
//                 }}
//               />
//             </section>

//             {/* Service List */}
//             {services.map((service, idx) => (
//               <section
//                 key={service.id || service.service_id || idx}
//                 id={`service-${service.id || service.service_id || idx}`}
//                 className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm scroll-mt-24 sm:scroll-mt-35"
//               >
//                 <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-center mb-4 sm:mb-5 text-gray-900">
//                   {service.service_name || service.name}
//                 </h1>

//                 <div className="flex flex-col">
//                   <div
//                     className="prose prose-sm sm:prose-base max-w-none text-justify font-sans text-gray-700"
//                     dangerouslySetInnerHTML={{
//                       __html: service.service_description || service.description || "<p>No details available.</p>",
//                     }}
//                   />
//                 </div>
//               </section>
//             ))}

//             {/* FAQ Section */}
//             <section id="faq-section" className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 scroll-mt-24">
//               <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-center mb-4 sm:mb-6 text-gray-900">
//                 Frequently Asked Questions
//               </h1>

//               {faqs.length > 0 ? (
//                 <ul className="space-y-3 sm:space-y-4">
//                   {faqs.map((faq, idx) => (
//                     <FAQItem
//                       key={faq.id || faq.faq_id || idx}
//                       question={faq.question}
//                       answer={faq.answer}
//                       isMobile={isMobile}
//                     />
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-500 text-center">No FAQs available.</p>
//               )}
//             </section>

//             {/* Mobile Payment Section - Only show on mobile */}
//             {isMobile && (
//               <div className="bg-white shadow-sm rounded-xl p-4 w-full border border-gray-100 mt-6">
//                 <h2 className="text-xl font-semibold text-gray-800 text-center mb-3">
//                   Proceed to Payment
//                 </h2>
//                 <p className="text-gray-500 text-center text-sm mb-4">
//                   Choose your Income Tax service to continue with payment
//                 </p>

//                 <div className="mb-4">
//                   <label htmlFor="mobile-service" className="block text-gray-700 font-medium mb-2">
//                     Select Service
//                   </label>
//                   <select
//                     id="mobile-service"
//                     value={selectedService}
//                     onChange={(e) => setSelectedService(e.target.value)}
//                     className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                   >
//                     {services.map((service) => (
//                       <option key={service.id || service.service_id} value={service.id || service.service_id}>
//                         {service.service_name || service.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <button
//                   onClick={handleProceed}
//                   disabled={!selectedService}
//                   className={`w-full font-semibold py-3 rounded-lg transition duration-200 ${selectedService
//                     ? "bg-blue-600 text-white hover:bg-blue-700"
//                     : "bg-gray-300 text-gray-600 cursor-not-allowed"
//                     }`}
//                 >
//                   Proceed
//                 </button>
//               </div>
//             )}

//             {/* Mobile QuickForm */}
//             {isMobile && (
//               <div className="mt-6 space-y-4">
//                 <QuickForm />
//               </div>
//             )}
//           </main>

//           {/* Desktop & Tablet Sidebar - QuickForm & Payment */}
//           {!isMobile && (
//             <div className={`flex-none ${isTablet ? 'lg:w-60' : 'xl:w-72'} space-y-4 lg:space-y-6`}>
//               <div className="sticky top-24 space-y-4 lg:space-y-6">
//                 <QuickForm />

//                 {/* Payment Section */}
//                 <div className="bg-white shadow-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 w-full border border-gray-100">
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-2 sm:mb-3">
//                     Proceed to Payment
//                   </h2>
//                   <p className="text-gray-500 text-center text-xs sm:text-sm mb-3 sm:mb-4">
//                     Choose your Income Tax service to continue with payment
//                   </p>

//                   <div className="mb-4 sm:mb-6">
//                     <label htmlFor="desktop-service" className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
//                       Select Service
//                     </label>
//                     <select
//                       id="desktop-service"
//                       value={selectedService}
//                       onChange={(e) => setSelectedService(e.target.value)}
//                       className="w-full border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm sm:text-base"
//                     >
//                       {services.map((service) => (
//                         <option key={service.id || service.service_id} value={service.id || service.service_id}>
//                           {service.service_name || service.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <button
//                     onClick={handleProceed}
//                     disabled={!selectedService}
//                     className={`w-full font-semibold py-2 sm:py-3 rounded-lg transition duration-200 text-sm sm:text-base ${selectedService
//                       ? "bg-blue-600 text-white hover:bg-blue-700"
//                       : "bg-gray-300 text-gray-600 cursor-not-allowed"
//                       }`}
//                   >
//                     Proceed
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       {/* <WhatsAppButton/> */}
//     </div>
//   );
// }

// // FAQ Accordion Item Component
// function FAQItem({ question, answer, isMobile }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <li className="border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
//       <button
//         onClick={() => setOpen(!open)}
//         className="w-full text-left font-semibold sm:font-bold text-sm sm:text-[16px] text-blue-800 flex justify-between items-start hover:text-blue-900 transition-colors duration-200"
//       >
//         <span
//           className="text-left flex-1 pr-2"
//           dangerouslySetInnerHTML={{ __html: question || "Untitled Question" }}
//         />
//         <span className="text-lg sm:text-xl font-light flex-shrink-0 mt-1">
//           {open ? "−" : "+"}
//         </span>
//       </button>

//       {open && (
//         <div
//           className="mt-2 sm:mt-3 text-gray-700 leading-relaxed border-t border-gray-100 pt-2 sm:pt-3 text-sm sm:text-base"
//           dangerouslySetInnerHTML={{
//             __html: answer || "No answer available.",
//           }}
//         />
//       )}
//     </li>
//   );
// }