

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
    const [faqs, setFaqs] = useState([]);
  

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

    // ✅ Smooth scroll to FAQ section
  const handleFaqClick = () => {
    const el = document.getElementById("faq-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Fetch FAQ dynamically
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
          const res = await fetch("https://auditfiling.com/api/v1/faq/6");
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
    <div className="min-h-screen ">
      {/* <Header /> */}

      <div className="mx-auto w-full px-4 mt-25 md:px-8 py-10 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="sticky top-30  ml-6 bg-white rounded-2xl shadow-sm p-5 h-auto md:h-[90vh] overflow-y-auto">
          <h1 className="text-3xl  font-serif   mb-5 text-gray-800">
            {menuData.name || "GST"}
          </h1>

          <ul className="space-y-3">
            {services.length > 0 ? (
              services.map((service, idx) => (
                <li key={service.id || idx}>
                  <button
                    onClick={() => handleClick(service)}
                    className={`w-full text-left px-2 py-1 text-[15px]  rounded-lg transition-all ${
                      activeService?.id === service.id
                        ? "bg-blue-100 border-l-4 border-blue-600 text-blue-600 font-bold"
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
              {/* FAQ link */}
            <li>
              <button
                onClick={handleFaqClick}
                className="w-full text-left px-2 py-2 text-[15px] rounded-lg transition-all hover:bg-gray-100 text-gray-700"
              >
                📘 Frequently Asked Questions
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-12 ">
          {/* GST Overview */}
          <section className="bg-white rounded-2xl shadow-sm p-6">
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
              className="bg-white rounded-2xl  shadow-sm p-6"
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
          <section id="faq-section" className="bg-white rounded-2xl p-6">
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-center mb-6 text-gray-900">
              Frequently Asked Questions
            </h2>

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

          <div className="block md:hidden ">
            <QuickForm />
          </div>
        </main>

        <div className=" w-64  ">
          <QuickForm />
        </div>
      </div>

      <WhatsAppPopup />
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