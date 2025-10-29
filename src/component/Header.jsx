import React, { useState, useEffect } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Header() {
  const [menus, setMenus] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Fetch menus from API
  useEffect(() => {
    async function fetchMenus() {
      try {
        const response = await fetch("https://auditfiling.com/api/v1/web/menu");
        const data = await response.json();
        const menusData = Array.isArray(data) ? data : data.menus;
        setMenus(menusData);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    }
    fetchMenus();
  }, []);

  // Shadow on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const redirectTo = (key) => {
    const normalized = (key || "").toString().trim().toLowerCase();
    switch (normalized) {
      case "income tax":
        return "/income-tax";
      case "gst":
        return "/gst";
      case "startup registrations":
      case "startup":
        return "/startup";
      case "company(mca)":
        return "/company";
      case "legal":
        return "/legal";
      case "bank valuation":
        return "/bankvaluation";
      case "trade mark":
      case "trademark":
        return "/trademark";
      default:
        return "/";
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-shadow duration-300 ${isScrolled ? "shadow-sm" : ""
        }`}
    >
      {/* Topbar */}
      <div className="bg-white shadow-sm">
        <Navbar />
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md transition-all duration-300">
        {/* CHANGED: Removed ml-65 and added justify-center */}
        <div className="container flex justify-center items-center px-10 py-4">

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 ml-15 text-lg z-50">
            {menus.map((menu) => {
              return (
                <div key={menu.id} className="relative">
                  {/* Header Button */}
                  <button
                    onMouseEnter={() => setDropdownOpen(menu.id)}
                    onClick={() =>
                      setDropdownOpen(dropdownOpen === menu.id ? null : menu.id)
                    }
                    className="font-serif tracking-wide text-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Link to={redirectTo(menu.name || "#")}>{menu.name}</Link>
                    {menu.services?.length > 0 && (
                      <FaChevronDown
                        size={10}
                        className={`mt-1 transition-transform duration-200 ${dropdownOpen === menu.id ? "rotate-180" : "rotate-0"
                          }`}
                      />
                    )}
                  </button>

                  {/* Dropdown */}
                  {menu.services?.length > 0 && (
                    <div
                      onMouseLeave={() => setDropdownOpen(null)}
                      className={`absolute left-0 mt-4 w-[400px] bg-white text-gray-900 rounded shadow-sm font-semibold p-6 grid grid-cols-2 gap-3 z-50 text-[15px] transform transition-all duration-300 ${dropdownOpen === menu.id
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95 pointer-events-none"
                        }`}
                    >
                      {menu.services.map((service) => {
                        return (
                          <button
                            key={service.id}
                            className="block text-left hover:text-blue-600"
                          >
                            <Link to={redirectTo(menu.name)}>
                              {service.service_name}
                            </Link>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden  text-gray-900"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white shadow-lg px-4 py-3 transition-all duration-300">
            <ul className="flex flex-col gap-3 text-left"> {/* Added text-left here */}
              {menus.map((menu) => (
                <li key={menu.id}>
                  <button
                    onClick={() =>
                      setMobileSubmenu(
                        mobileSubmenu === menu.id ? null : menu.id
                      )
                    }
                    className="flex items-start justify-between w-full font-serif text-left"
                  >
                    <span className="text-left">{menu.name}</span> {/* Wrapped in span with text-left */}
                    {menu.services?.length > 0 && (
                      <FaChevronDown
                        className={`transition-transform duration-200 ${mobileSubmenu === menu.id ? "rotate-180" : ""
                          }`}
                      />
                    )}
                  </button>

                  {mobileSubmenu === menu.id && menu.services?.length > 0 && (
                    <ul className="pl-4 mt-2 flex flex-col gap-2 text-sm text-left"> {/* Added text-left here */}
                      {menu.services.map((service) => (
                        <li key={service.id}>
                          <Link
                            to={service.slug || "#"}
                            className="block hover:text-blue-600 text-left"
                          >
                            {service.service_name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;