

import React, { useState, useEffect } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { h2 } from "framer-motion/client";
import { h1 } from "framer-motion/m";

function Header() {
  const [menus, setMenus] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();




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
    switch (key) {
      case "Income Tax":
        return "/income-tax";

      case "GST":
        return "/gst";

      case "Startup Registrations":
        return "/startup";

      case "Company(MCA) ":
        return "/company";

      case "Legal":
        return "/legal";

      case "Bank Valuation":
        return "/bankvaluation";

      case "Trade Mark":
        return "/trademark";

      default:
        return "/"; // fallback route (optional)
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
        <div className="container flex ml-60 items-center px-10 py-4">
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 text-lg z-50">
            {menus.map((menu) => {
              // console.log(menu.name, "this is menu part");
              return (
                <div key={menu.id} className="relative">
                  {/* Header Button */}
                  <button
                    onMouseEnter={() => setDropdownOpen(menu.id)}
                    onClick={() =>
                      setDropdownOpen(dropdownOpen === menu.id ? null : menu.id)
                    }
                    className="font-serif tracking-wide  text-lg flex items-center gap-1 cursor-pointer"
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
                      className={`absolute left-0 mt-4 w-[400px] bg-white text-gray-900 rounded shadow-sm font-semibold  p-6 grid grid-cols-2 gap-3 z-50 text-[15px]  transform transition-all duration-300 ${dropdownOpen === menu.id
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none"
                        }`}
                    >
                      {menu.services.map((service) => {
                        // console.log("service", service);
                        return (
                          <button
                            key={service.id}
                            // onClick={() => navigate(`/${service}`)}
                            className="block text-left hover:text-blue-600"
                          >
                            <Link to={redirectTo(menu.name)}>{service.service_name}</Link>
                            {/* {service.service_name} */}
                          </button>
                        )
                      }

                      )}
                    </div>
                  )}
                </div>
              )
            }

            )}
          </nav>


          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-900"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>


        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white shadow-lg px-4 py-3 transition-all duration-300">
            <ul className="flex flex-col gap-3">
              {menus.map((menu) => (
                <li key={menu.id}>
                  <button
                    onClick={() =>
                      setMobileSubmenu(
                        mobileSubmenu === menu.id ? null : menu.id
                      )
                    }
                    className="flex justify-between w-full font-semibold"
                  >
                    {menu.name}
                    {menu.services?.length > 0 && (
                      <FaChevronDown
                        className={`transition-transform duration-200 ${mobileSubmenu === menu.id ? "rotate-180" : ""
                          }`}
                      />
                    )}
                  </button>


                  {mobileSubmenu === menu.id &&
                    menu.services?.length > 0 && (
                      <ul className="pl-4 mt-2 flex flex-col gap-2 text-sm">
                        {menu.services.map((service) => (
                          <li key={service.id}>
                            <Link
                              to={service.slug || "#"}
                              className="block hover:text-blue-600"
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



