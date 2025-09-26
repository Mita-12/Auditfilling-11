
import React, { useState, useEffect } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(null); // controls which menu is open
  const [mobileOpen, setMobileOpen] = useState(false); // controls mobile sidebar
  const [isScrolled, setIsScrolled] = useState(false); // for scroll shadow effect

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile submenu toggle
  const [mobileSubmenu, setMobileSubmenu] = useState(null);

  // Desktop dropdown helper
  const handleHover = (menu) => setDropdownOpen(menu);
  const handleLeave = () => setDropdownOpen(null);

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-shadow duration-300 ${isScrolled ? "shadow-lg" : ""}`}>

      {/* Topbar Navbar */}
      <div className="bg-white shadow-sm">
        <Navbar />
      </div>

      {/* Main Header */}
      <header className="shadow-md bg-white transition-all duration-300">
        <div className="container mx-auto flex items-center justify-between px-15">

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 text-sm z-50 ml-45 px-4 py-4">

            {/* ================= Income Tax ================= */}
            <div
              className="relative"
              onMouseEnter={() => handleHover("income")}
              onMouseLeave={handleLeave}
            >
              <Link to="/income-tax">
                <button
                  onClick={() =>
                    setDropdownOpen(dropdownOpen === "income" ? null : "income")
                  }
                  className="font-serif tracking-wide text-lg flex items-center gap-1"
                >
                  Income Tax
                  <FaChevronDown
                    size={10}
                    className={`mt-1 transition-transform duration-200 ${dropdownOpen === "income" ? "rotate-180" : "rotate-0"}`}
                  />
                </button>
              </Link>
              <div
                className={`absolute left-0 mt-4 w-[350px] bg-white text-gray-900 rounded shadow-sm p-4 grid grid-cols-2 gap-2 z-50 text-[14px] font-semibold transform transition-all duration-300 ${dropdownOpen === "income" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  }`}
              >
                <ul className="space-y-2">
                  <li><a href="/itr-filing" className="block hover:text-blue-600">Salaried Individual</a></li>
                  <li><a href="/tax-notice" className="block hover:text-blue-600">Professional</a></li>
                </ul>
                <ul className="space-y-2">
                  <li><a href="/form-16" className="block hover:text-blue-600">Self Employed</a></li>
                  <li><a href="/tax-planning" className="block hover:text-blue-600">Hindu Undivided Family (HUF)</a></li>
                </ul>
              </div>
            </div>

            {/* ================= GST ================= */}
            <div
              className="relative"
              onMouseEnter={() => handleHover("gst")}
              onMouseLeave={handleLeave}
            >
              <Link to="/gst">
                <button
                  onClick={() =>
                    setDropdownOpen(dropdownOpen === "gst" ? null : "gst")
                  }
                  className="font-serif tracking-wide text-lg flex items-center gap-1"
                >
                  GST
                  <FaChevronDown
                    size={10}
                    className={`mt-1 transition-transform duration-200 ${dropdownOpen === "gst" ? "rotate-180" : "rotate-0"}`}
                  />
                </button>
              </Link>
              <div
                className={`absolute left-0 mt-4 w-[350px] bg-white text-gray-900 rounded shadow-sm p-4 grid grid-cols-2 gap-4 z-50 text-[14px] font-semibold transform transition-all duration-300 ${dropdownOpen === "gst" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  }`}
              >
                <ul className="space-y-2">
                  <li><a href="/gst-reg" className="block hover:text-blue-600">Proprietor New Registration</a></li>
                  <li><a href="/gst-return-accountant" className="block hover:text-blue-600">Proprietor GST Filing</a></li>
                  <li><a href="/gst-nil-return" className="block hover:text-blue-600">Company GST Registration</a></li>
                </ul>
                <ul className="space-y-2">
                  <li><a href="/gst-einvoicing" className="block hover:text-blue-600">Company GST Filing</a></li>
                  <li><a href="/gst-lut" className="block hover:text-blue-600">GST Annual Filing</a></li>
                  <li><a href="/gst-annual-return" className="block hover:text-blue-600">GST Notice Compliance</a></li>
                </ul>
              </div>
            </div>

            {/* ================= Startup ================= */}
            <div
              className="relative"
              onMouseEnter={() => handleHover("startup")}
              onMouseLeave={handleLeave}
            >
              <Link to="/startup">
                <button
                  onClick={() =>
                    setDropdownOpen(dropdownOpen === "startup" ? null : "startup")
                  }
                  className="font-serif tracking-wide text-lg flex items-center gap-1"
                >
                  Startup Registration
                  <FaChevronDown
                    size={10}
                    className={`mt-1 transition-transform duration-200 ${dropdownOpen === "startup" ? "rotate-180" : "rotate-0"}`}
                  />
                </button>
              </Link>
              <div
                className={`absolute left-0 mt-4 w-[550px] bg-white text-gray-900 rounded shadow-sm p-6 grid grid-cols-3 gap-8 z-50 text-[14px] font-semibold transform transition-all duration-300 ${dropdownOpen === "startup" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  }`}
              >
                <ul className="space-y-2">
                  <li><a href="/proprietorship" className="block hover:text-blue-600">Proprietorship Firm Registration</a></li>
                  <li><a href="/partnership" className="block hover:text-blue-600">Partnership Firm Registration</a></li>
                  <li><a href="/opc" className="block hover:text-blue-600">Trust Registration (IGR)</a></li>
                  <li><a href="/proprietorship" className="block hover:text-blue-600">Startup India Registration</a></li>
                </ul>
                <ul className="space-y-2">
                  <li><a href="/llp" className="block hover:text-blue-600">EPF Registration</a></li>
                  <li><a href="/ngo" className="block hover:text-blue-600">FSSAI Registration</a></li>
                  <li><a href="/proprietorship" className="block hover:text-blue-600">FSSAI Renewal</a></li>
                  <li><a href="/partnership" className="block hover:text-blue-600">Import Export Code</a></li>
                  <li><a href="/opc" className="block hover:text-blue-600">ISO Registration</a></li>
                  <li><a href="/opc" className="block hover:text-blue-600">GEM Registration</a></li>
                </ul>
                <ul className="space-y-2">
                  <li><a href="/opc" className="block hover:text-blue-600">MSME Registration</a></li>
                  <li><a href="/llp" className="block hover:text-blue-600">PF Registration</a></li>
                  <li><a href="/opc" className="block hover:text-blue-600">Shop And Commercial Registration</a></li>
                  <li><a href="/partnership" className="block hover:text-blue-600">Trade License</a></li>
                </ul>
              </div>
            </div>

            {/* ================= MCA ================= */}
            <div
              className="relative"
              onMouseEnter={() => handleHover("mca")}
              onMouseLeave={handleLeave}
            >
              <Link to="/company">
                <button
                  onClick={() =>
                    setDropdownOpen(dropdownOpen === "company" ? null : "company")
                  }
                  className="font-serif tracking-wide text-lg flex items-center gap-1"
                >
                  Company(MCA)
                  <FaChevronDown
                    size={10}
                    className={`mt-1 transition-transform duration-200 ${dropdownOpen === "company" ? "rotate-180" : "rotate-0"}`}
                  />
                </button>
              </Link>
              <div
                className={`absolute left-0 mt-4 w-[600px] bg-white text-gray-900 rounded shadow-sm p-6 grid grid-cols-3 gap-4 z-50 text-[14px] font-semibold transform transition-all duration-300 ${dropdownOpen === "mca" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  }`}
              >
                <ul className="space-y-2">
                  <li><a href="/proprietorship" className="block hover:text-blue-600">One Person Company Registration</a></li>
                  <li><a href="/partnership" className="block hover:text-blue-600">LLP Registration</a></li>
                  <li><a href="/opc" className="block hover:text-blue-600">Private Limited Company Registration</a></li>
                  <li><a href="/proprietorship" className="block hover:text-blue-600">Public Limited Company Registration</a></li>
                </ul>
                <ul className="space-y-2">
                  <li><a href="/llp" className="block hover:text-blue-600">Removal of Director</a></li>
                  <li><a href="/ngo" className="block hover:text-blue-600">Project Report (DPR)</a></li>
                  <li><a href="/proprietorship" className="block hover:text-blue-600">PF Return Filing</a></li>
                  <li><a href="/partnership" className="block hover:text-blue-600">ESI Return Filing</a></li>
                  <li><a href="/opc" className="block hover:text-blue-600">Company ITR Filing</a></li>
                  <li><a href="/partnership" className="block hover:text-blue-600">Name Change Of Company</a></li>
                </ul>
                <ul className="space-y-2">
                  <li><a href="/opc" className="block hover:text-blue-600">Registered Office Address Change</a></li>
                  <li><a href="/llp" className="block hover:text-blue-600">Change Of Director</a></li>
                  <li><a href="/opc" className="block hover:text-blue-600">Company Annual Filing</a></li>
                  <li><a href="/opc" className="block hover:text-blue-600">ROC AGM Filing</a></li>
                  <li><a href="/opc" className="block hover:text-blue-600">TDS Return Filing</a></li>
                  <li><a href="/opc" className="block hover:text-blue-600">Book Keeping</a></li>
                </ul>
              </div>
            </div>

            {/* ================= trademark ================= */}
            <div
              className="relative"
              onMouseEnter={() => handleHover("trademark")}
              onMouseLeave={handleLeave}
            >
              <Link to="/trademark">
                <button
                  onClick={() =>
                    setDropdownOpen(dropdownOpen === "trademark" ? null : "trademark")
                  }
                  className="font-serif tracking-wide text-lg flex items-center gap-1"
                >
                  Trade Mark
                  <FaChevronDown
                    size={10}
                    className={`mt-1 transition-transform duration-200 ${dropdownOpen === "trademark" ? "rotate-180" : "rotate-0"}`}
                  />
                </button>
              </Link>
              <div
                className={`absolute left-0 mt-4 w-[400px] bg-white text-gray-900 rounded shadow-sm p-4 grid grid-cols-2 gap-4 z-50 text-[14px] font-semibold transform transition-all duration-300 ${dropdownOpen === "trademark" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  }`}
              >
                <ul className="space-y-2">
                  <li><a href="/gst-registration" className="block hover:text-blue-600">trademark Registration</a></li>
                  <li><a href="/gst-return-accountant" className="block hover:text-blue-600">trademark Objection</a></li>
                  <li><a href="/gst-nil-return" className="block hover:text-blue-600">trademark Certificate</a></li>
                  <li><a href="/gst-nil-return" className="block hover:text-blue-600">trademark Renewal</a></li>
                </ul>
                <ul className="space-y-2">
                  <li><a href="/gst-einvoicing" className="block hover:text-blue-600">trademark Transfer</a></li>
                  <li><a href="/gst-lut" className="block hover:text-blue-600">Copyright Registration</a></li>
                  <li><a href="/gst-annual-return" className="block hover:text-blue-600">Patent Registration</a></li>
                  <li><a href="/gst-annual-return" className="block hover:text-blue-600">TDS Return Filing</a></li>
                </ul>
              </div>
            </div>

            {/* ================= Bank Valuation ================= */}
            <div
              className="relative"
              onMouseEnter={() => handleHover("bankvaluation")}
              onMouseLeave={handleLeave}
            >
              <Link to="/bankvaluation">
                <button
                  onClick={() =>
                    setDropdownOpen(dropdownOpen === "bankvaluation" ? null : "bankvaluation")
                  }
                  className="font-serif tracking-wide text-lg flex items-center gap-1"
                >
                  Bank Valuation
                  <FaChevronDown
                    size={10}
                    className={`mt-1 transition-transform duration-200 ${dropdownOpen === "bankvaluation" ? "rotate-180" : "rotate-0"}`}
                  />
                </button>
              </Link>
              <div
                className={`absolute left-0 mt-4 w-[350px] bg-white text-gray-900 rounded shadow-sm p-4 grid grid-cols-2 gap-4 z-50 text-[14px] font-semibold transform transition-all duration-300 ${dropdownOpen === "bankvaluation" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  }`}
              >
                <ul className="space-y-2">
                  <li><a href="/itr-filing" className="block hover:text-blue-600">Property Valuation Report</a></li>
                  <li><a href="/tax-notice" className="block hover:text-blue-600">Market Valuation</a></li>
                  <li><a href="/tax-planning" className="block hover:text-blue-600">Risk-Based Valuation</a></li>
                  <li><a href="/tax-planning" className="block hover:text-blue-600">Strategic Valuation</a></li>
                </ul>
                <ul className="space-y-2">
                  <li><a href="/form-16" className="block hover:text-blue-600">Asset-Based Valuation</a></li>
                  <li><a href="/tax-planning" className="block hover:text-blue-600">Income-Based Valuation</a></li>
                  <li><a href="/tax-planning" className="block hover:text-blue-600">Operational Valuation</a></li>
                </ul>
              </div>
            </div>

            {/* ================= Legal ================= */}
            <div
              className="relative"
              onMouseEnter={() => handleHover("legal")}
              onMouseLeave={handleLeave}
            >
              <Link to="/legal">
                <button
                  onClick={() =>
                    setDropdownOpen(dropdownOpen === "legal" ? null : "legal")
                  }
                  className="font-serif tracking-wide text-lg flex items-center gap-1"
                >
                  Legal
                  <FaChevronDown
                    size={10}
                    className={`mt-1 transition-transform duration-200 ${dropdownOpen === "legal" ? "rotate-180" : "rotate-0"}`}
                  />
                </button>
              </Link>
              <div
                className={`absolute left-0 mt-4 w-[350px] bg-white text-gray-900 rounded shadow-sm p-4
    grid grid-cols-2 gap-4 z-50 text-[14px] font-semibold transform transition-all duration-300
    ${dropdownOpen === "legal"
                    ? "opacity-100 scale-100 visible pointer-events-auto"
                    : "opacity-0 scale-95 invisible pointer-events-none"}`}
              >
                <ul className="space-y-2">
                  <li><a href="/itr-filing" className="block hover:text-blue-600">Labour and Employment Law</a></li>
                  <li><a href="/tax-notice" className="block hover:text-blue-600">trademark Notice</a></li>
                  <li><a href="/tax-notice" className="block hover:text-blue-600">Land Document Verification</a></li>
                </ul>
                <ul className="space-y-2">
                  <li><a href="/form-16" className="block hover:text-blue-600">Online trademark Advice</a></li>
                  <li><a href="/tax-planning" className="block hover:text-blue-600">Banking and Financial Law</a></li>
                  <li><a href="/tax-notice" className="block hover:text-blue-600">Property</a></li>
                </ul>
              </div>





            </div>
            {/* Blog */}
            <div
              className="relative"
              onMouseEnter={() => handleHover("blog")}
              onMouseLeave={handleLeave}
            >
              <Link to="/blog">
                <button
                  onClick={() =>
                    setDropdownOpen(dropdownOpen === "blog" ? null : "blog")
                  }
                  className="font-serif tracking-wide text-lg flex items-center gap-1"
                >
                  Blog
                  <FaChevronDown
                    size={10}
                    className={`mt-1 transition-transform duration-200 ${dropdownOpen === "blog" ? "rotate-180" : "rotate-0"}`}
                  />
                </button>
              </Link>
              <div
                className={`absolute left-0 mt-4 w-[350px] bg-white text-gray-900 rounded shadow-sm p-4
    grid grid-cols-2 gap-4 z-50 text-[14px] font-semibold transform transition-all duration-300
    ${dropdownOpen === "blog"
                    ? "opacity-100 scale-100 visible pointer-events-auto"
                    : "opacity-0 scale-95 invisible pointer-events-none"}`}
              >
                <ul className="space-y-2">
                  <li><a href="/itr-filing" className="block hover:text-blue-600">Income Tax</a></li>
                  <li><a href="/tax-notice" className="block hover:text-blue-600">GST</a></li>
                  <li><a href="/tax-notice" className="block hover:text-blue-600">Startup Registration</a></li>
                </ul>
                <ul className="space-y-2">
                  <li><a href="/form-16" className="block hover:text-blue-600">Company(MCA)</a></li>
                  <li><a href="/tax-planning" className="block hover:text-blue-600">Trade Mark</a></li>
                  <li><a href="/tax-notice" className="block hover:text-blue-600">BankValuation</a></li>
                  <li><a href="/form-16" className="block hover:text-blue-600">Legal</a></li>

                </ul>

              </div>


            </div>
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

              {/* Income Tax Mobile */}
              <li>
                <button
                  onClick={() => setMobileSubmenu(mobileSubmenu === "income" ? null : "income")}
                  className="flex justify-between w-full font-semibold"
                >
                  Income Tax <FaChevronDown className={`transition-transform duration-200 ${mobileSubmenu === "income" ? "rotate-180" : ""}`} />
                </button>
                {mobileSubmenu === "income" && (
                  <ul className="pl-4 mt-2 flex flex-col gap-2 text-sm">
                    <li><a href="/itr-filing" className="block hover:text-blue-600">Salaried Individual</a></li>
                    <li><a href="/tax-notice" className="block hover:text-blue-600">Professional</a></li>
                    <li><a href="/form-16" className="block hover:text-blue-600">Self Employed</a></li>
                    <li><a href="/tax-planning" className="block hover:text-blue-600">HUF</a></li>
                  </ul>
                )}
              </li>

              {/* GST Mobile */}
              <li>
                <button
                  onClick={() => setMobileSubmenu(mobileSubmenu === "gst" ? null : "gst")}
                  className="flex justify-between w-full font-semibold"
                >
                  GST <FaChevronDown className={`transition-transform duration-200 ${mobileSubmenu === "gst" ? "rotate-180" : ""}`} />
                </button>
                {mobileSubmenu === "gst" && (
                  <ul className="pl-4 mt-2 flex flex-col gap-2 text-sm">
                    <li><a href="/gst-reg" className="block hover:text-blue-600">Proprietor New Registration</a></li>
                    <li><a href="/gst-return-accountant" className="block hover:text-blue-600">Proprietor GST Filing</a></li>
                    <li><a href="/gst-nil-return" className="block hover:text-blue-600">Company GST Registration</a></li>
                    <li><a href="/gst-einvoicing" className="block hover:text-blue-600">Company GST Filing</a></li>
                    <li><a href="/gst-lut" className="block hover:text-blue-600">GST Annual Filing</a></li>
                    <li><a href="/gst-annual-return" className="block hover:text-blue-600">GST Notice Compliance</a></li>
                  </ul>
                )}
              </li>

              {/* Repeat similar mobile structure for Startup, MCA, trademark, Bank Valuation, trademark */}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;


