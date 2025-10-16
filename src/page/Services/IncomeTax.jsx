import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import QuickForm from "../../form/QuickForm";
import WhatsAppPopup from "../../form/WhatsAppPopup";
import Footer from "../../component/Footer";
import {Link} from "react-router-dom";
import ProceedToPay from "./document/ProceedToPay";

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

  // ✅ Smooth scroll to FAQ section
  const handleFaqClick = () => {
    const el = document.getElementById("faq-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Fetch FAQ dynamically
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch("https://auditfiling.com/api/v1/faq/1");
        const data = await res.json();
        // console.log("FAQ API response:", data); // optional for debugging
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
      {/* <Header /> */}

      <div className="mx-auto w-full px-4 md:px-8 mt-25 py-10 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="sticky top-24 ml-6 bg-white rounded-2xl p-5  h-auto md:h-[90vh] overflow-x-auto">
          <h1 className="text-3xl font-serif  pl-5 mb-5 text-gray-800">
            {menuData.name || "Income Tax"}
          </h1>

          <ul className="space-y-3">
            {services.length > 0 ? (
              services.map((service, idx) => (
                <li key={service.id || idx}>
                  <button
                    onClick={() => handleClick(service)}
                    className={`w-full text-left px-2 py-1 text-[15px] rounded-lg transition-all ${activeService?.id === service.id
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
        <main className="flex-1 space-y-10">
          {/* Menu Overview */}
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h1 className="text-3xl md:text-4xl font-serif text-center  text-gray-900">
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
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h1 className="text-2xl md:text-3xl mt-30 font-bold font-serif text-center mb-4 text-gray-900">
                {service.service_name || service.name}
              </h1>

              <div className="flex flex-col md:flex-row items-start">
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
          <section id="faq-section" className="bg-white rounded-2xl p-6">
            <h1 className="text-2xl md:text-3xl  font-bold mt-20 font-serif text-center mb-6 text-gray-900">
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
          <div className="block md:hidden ">
            <QuickForm />
                      <Link to="/proceed-to-pay">Proceed to Pay</Link>

          </div>
        </main>

        {/* Desktop QuickForm */}
        <div className="w-64 ">
          <QuickForm />
          {/* Proceed to Pay Component */}
          {/* <Link to="/proceed-to-pay">Proceed to Pay</Link> */}
          <ProceedToPay />
        </div>

      </div>

      <WhatsAppPopup />
      {/* <Footer /> */}
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
