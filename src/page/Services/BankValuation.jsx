
import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import QuickForm from "../../form/QuickForm";
import WhatsAppPopup from "../../form/WhatsAppPopup";
import Footer from "../../component/Footer";

export default function BankValuation() {
  const [menuData, setMenuData] = useState(null);
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState([]);

  // 1️⃣ Fetch all menus and find "Bank Valuation"
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

        console.log(
          "✅ All Menus:",
          menusData.map((m) => ({
            id: m.id,
            name: m.name || m.menu_name,
          }))
        );

        // Find Bank Valuation related menu
        const bankMenu = menusData.find((menu) => {
          const name = (menu.name || menu.menu_name || "").toLowerCase();
          return (
            name.includes("bank valuation") ||
            name.includes("valuation") ||
            name.includes("bank")
          );
        });

        if (bankMenu) {
          console.log("✅ Found Bank Valuation menu:", bankMenu);
          fetchMenuDetail(bankMenu.id);
        } else {
          console.warn("⚠️ No Bank Valuation menu found!");
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

      console.log("✅ Bank Valuation Menu Data:", data);

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
      console.error("❌ Error fetching Bank Valuation data:", err);
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
        Loading Bank Valuation data...
      </div>
    );

  if (!menuData)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg font-semibold">
        Bank Valuation data not found.
      </div>
    );

  // 5️⃣ Render UI
  return (
    <div className="min-h-screen">
      
      <div className="mx-auto w-full mt-25 px-4 md:px-8 py-10 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="sticky top-24 ml-15 bg-white rounded-xl  p-5 h-auto md:h-[90vh] overflow-y-auto">
          <h1 className="text-3xl font-serif  text-left mb-5 text-gray-800">
            {menuData.name || menuData.menu_name || "Bank Valuation"}
          </h1>

          <ul className="space-y-3">
            {services.length > 0 ? (
              services.map((service, idx) => (
                <li key={service.id || idx}>
                  <button
                    onClick={() => handleClick(service)}
                    className={`w-full text-left px-2 py-1 text-[15px] rounded-lg transition-all ${
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
        <main className="flex-1 space-y-12 ">
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h1 className="text-3xl md:text-4xl font-serif text-center mb-4 text-gray-900">
              {menuData.name || "Bank Valuation"}
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
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-4 text-gray-900">
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

          <div className="block md:hidden ">
            <QuickForm />
          </div>
        </main>

        <div className="  w-64">
          <QuickForm />
        </div>
      </div>

      <WhatsAppPopup />
   
    </div>
  );
}
