import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import QuickForm from "../../form/QuickForm";
import WhatsAppPopup from "../../form/WhatsAppPopup";
import Footer from "../../component/Footer";

export default function Trademark() {
  const [menuData, setMenuData] = useState(null);
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState([]);
  const [activeSection, setActiveSection] = useState("");

  // 1️⃣ Fetch all menus and find Trademark menu
  useEffect(() => {
    async function fetchMenus() {
      try {
        const res = await fetch("https://auditfiling.com/api/v1/web/menu");
        const data = await res.json();

        const menusData =
          Array.isArray(data)
            ? data
            : data.menus || data.data || data.menu || [];

        // Find Trademark-related menu
        const tradeMarkMenu = menusData.find((menu) => {
          const name = (menu.name || menu.menu_name || "").toLowerCase();
          return (
            name.includes("trademark") ||
            name.includes("trade mark") ||
            name.includes("trade-mark")
          );
        });

        if (tradeMarkMenu) {
          fetchMenuDetail(tradeMarkMenu.id);
        } else {
          console.warn("⚠️ No Trademark menu found!");
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
      console.error("❌ Error fetching Trademark data:", err);
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
  const handleClick = (service) => {
    setActiveService(service);
    const id = `service-${service.id}`;
    setActiveSection(id);
    window.history.pushState(null, null, `#${id}`);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ✅ Smooth scroll to FAQ section
  const handleFaqClick = () => {
    setActiveSection("faq-section");
    window.history.pushState(null, null, `#faq-section`);
    const el = document.getElementById("faq-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Fetch FAQ dynamically
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch("https://auditfiling.com/api/v1/faq/8");
        const data = await res.json();
        setFaqs(Array.isArray(data) ? data : data.faqs || []);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };
    fetchFaqs();
  }, []);

  // 4️⃣ Loading & error handling
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-700 font-semibold text-lg">
        Loading Trademark data...
      </div>
    );

  if (!menuData)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg font-semibold">
        Trademark data not found.
      </div>
    );

  // 5️⃣ Render UI
  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full px-4 md:px-8 mt-25 py-10 flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation - Updated to match IncomeTax style */}
        <nav className="lg:sticky lg:top-24 ml-10 lg:self-start bg-white rounded-2xl p-5 h-auto md:h-[90vh] overflow-x-auto">
          <h1 className="text-3xl font-serif pl-5 mb-5 text-gray-800">
            {menuData.name || menuData.menu_name || "Trademark"}
          </h1>

          <ul className="space-y-3">
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
                <span className="text-sm font-medium text-gray-400 w-6 flex-shrink-0">1.</span>
                <span className="text-lg leading-tight">Overview</span>
              </a>
            </li>

            {/* Services Links */}
            {services.length > 0 ? (
              services.map((service, idx) => (
                <li key={service.id || idx}>
                  <a
                    href={`#service-${service.id || idx}`}
                    onClick={() => handleClick(service)}
                    className={`flex items-start py-2 px-3 rounded-lg transition-all duration-200 ${
                      activeSection === `service-${service.id || idx}`
                        ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-medium"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-sm font-medium text-gray-400 w-6 flex-shrink-0">
                      {idx + 2}.
                    </span>
                    <span className="text-lg leading-tight">{service.service_name || service.name}</span>
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
                <span className="text-sm font-medium text-gray-400 w-6 flex-shrink-0">
                  {services.length + 2}.
                </span>
                <span className="text-lg leading-tight">Frequently Asked Questions</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 space-y-12">
          {/* Menu Overview */}
          <section id="menu-overview" className="bg-white rounded-2xl shadow-sm p-6 scroll-mt-24">
            <h1 className="text-3xl md:text-4xl font-serif text-center mb-4 text-gray-900">
              {menuData.name || "Trademark"}
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

          {/* Services Sections */}
          {services.map((service, idx) => (
            <section
              key={service.id || idx}
              id={`service-${service.id || idx}`}
              className="bg-white rounded-2xl shadow-sm p-6 scroll-mt-24"
            >
              <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-900">
                {service.service_name || service.name}
              </h1>
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

          {/* FAQ Section */}
          <section id="faq-section" className="bg-white rounded-2xl p-6 scroll-mt-24">
            <h1 className="text-2xl md:text-3xl font-bold font-serif text-center mb-6 text-gray-900">
              Frequently Asked Questions
            </h1>

            {faqs.length > 0 ? (
              <ul className="space-y-4">
                {faqs.map((faq, idx) => (
                  <FAQItem
                    key={faq.menu_id || idx}
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
          <div className="block md:hidden">
            <QuickForm />
          </div>
        </main>

        {/* Desktop QuickForm */}
        <div className="w-64">
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
    <li className="border-gray-200 rounded-xl p-2 shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left font-bold text-[16px] text-blue-800 flex justify-between items-center"
      >
        <span
          dangerouslySetInnerHTML={{ __html: question || "Untitled Question" }}
        ></span>
        <span>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div
          className="mt-2 text-gray-700"
          dangerouslySetInnerHTML={{
            __html: answer || "No answer available.",
          }}
        ></div>
      )}
    </li>
  );
}