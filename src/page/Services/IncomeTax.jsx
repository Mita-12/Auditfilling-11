

import React, { useEffect, useState } from "react";
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
    const service_id = document.getElementById('service').value;
    // console.log("Selected service ID:", service_id);

    if (!service_id) return;

    const user = JSON.parse(localStorage.getItem('user'));

    // If user not logged in, redirect to home/login
    if (!user || !user.id) {
      const serviceObj = services.find((s) => s.id === parseInt(service_id));
      navigate('/', {
        state: {
          redirectTo: '/documents',
          selectedService: service_id,
          serviceData: serviceObj,
          message: 'Please login to access documents'
        }
      });
      return;
    }

    try {
      const serviceId = parseInt(service_id);
      const response = await fetch(`https://auditfiling.com/api/v1/service/${serviceId}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'User-ID': user.id
        }
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const serviceData = await response.json();
      console.log('API Response:', serviceData);

      // Find the exact service
      const selectedServiceData = serviceData.services?.find(s => s.id === serviceId);
      if (!selectedServiceData) throw new Error('Service not found in API response');

      // Get route name and redirect directly
      const routeName = selectedServiceData.service_content;
      const queryParams = new URLSearchParams({ serviceId }).toString();
      const redirectPath = `/documents/${routeName}?${queryParams}`;

      console.log(`Navigating to: ${redirectPath}`);
      navigate(redirectPath, { state: { serviceData: selectedServiceData } });

    } catch (error) {
      console.error('Error in handleProceed:', error);

      // Fallback if API fails
      const serviceObj = services.find((s) => s.id === parseInt(service_id));
      if (serviceObj) {
        const routeName = serviceObj.service_name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[()]/g, "");
        const queryParams = new URLSearchParams({ serviceId: service_id }).toString();
        const redirectPath = `/proceed/${routeName}?${queryParams}`;

        console.warn('API failed, proceeding with fallback navigation');
        navigate(redirectPath, { state: { serviceData: serviceObj } });
      } else {
        alert('Unable to proceed. Please try again.');
      }
    }
  };


  // Helper function to check user companies

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
          <nav className="flex-none lg:sticky lg:top-24 ml-0 md:ml-15 lg:self-start  bg-white rounded-2xl p-5 h-auto md:h-full overflow-auto ">
            <h1 className="text-3xl font-serif pl-5 mb-5 text-gray-800">
              {menuData.name || "Income Tax"}
            </h1>

            <ul className=" list-none space-y-3">
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
                      className={`flex items-start py-2 px-3 rounded-lg transition-all duration-200  ${activeSection === `service-${service.id || service.service_id || idx}`
                        ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-medium"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                        }`}
                    >
                      {/* <span className="text-sm font-medium text-gray-400 w-6 flex-shrink-0">
                        {idx + 2}.
                      </span> */}
                      <span className="text-[15] leading-tight">
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
                  className={`flex items-start py-2 px-3 rounded-lg transition-all duration-200 ${activeSection === "faq-section"
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-medium"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                >

                  <span className="text-[15] leading-tight">Frequently Asked Questions</span>
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
                  className={`w-full font-semibold py-2 rounded-lg transition duration-200 ${selectedService
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


