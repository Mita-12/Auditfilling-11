// import React, { useState } from "react";

// import { FaChevronDown, FaChevronRight, FaBars, FaTimes } from "react-icons/fa";
// import Herosection from "./Herosection";
// import Navbar from "./Navbar";

// function Header() {
//     const [mobileOpen, setMobileOpen] = useState(false);



//     return (

//         <div className="">
//             {/* Topbar */}
//             <Navbar/>
//             {/* Navbar */}
//             <header className=" shadow-md fixed w-full z-50 mb-6 bg-blue-950">
//                 <div className="container mx-auto flex items-center justify-between px-4 py-3">
//                     {/* Logo */}
//                     <div className="flex items-center gap-2">
//                         <a href="/">
//                             <img
//                                 src="public/img/auditfile_logo.png"
//                                 alt="Logo"
//                                 className="w-12 h-auto"  // ✅ controls logo size
//                             />
//                         </a>
//                         <a
//                             href="/"
//                             className=" text-white text-4xl font-medium font-serif tracking-wide no-underline"
//                         >
//                             AuditFiling
//                         </a>
//                     </div>


//                     {/* Desktop Menu */}
//                     <nav className=" flex items-center gap-4 text-white text-sm z-50 ml-7">

//                         {/* Dropdown */}
//                         <div className=" font-serif tracking-wide font-medium">
//                             INCOME TAX

//                         </div>
//                         <div className=" font-serif tracking-wide">
//                             GST

//                         </div>
//                         <div className=" font-serif tracking-wide">
//                             STARTUP REGISTARTION

//                         </div>
//                         <div className=" font-serif tracking-wide">
//                             COMPANY(MCA)

//                         </div>
//                         <div className=" font-serif tracking-wide">
//                             TRADE MARK

//                         </div>
//                         <div className=" font-serif tracking-wide">
//                             BANK EVALUATION

//                         </div>
//                         <div className=" font-serif tracking-wide">
//                             LEGAL

//                         </div>


//                         <a href="#formid">
//                             <button className="bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 ml-5">
//                                 Login
//                             </button>
//                         </a>
//                     </nav>

//                     {/* Mobile Menu Button */}
//                     <button
//                         className="md:hidden text-sm"
//                         onClick={() => setMobileOpen(!mobileOpen)}
//                     >
//                         {mobileOpen ? <FaTimes /> : <FaBars />}
//                     </button>
//                 </div>

//                 {/* Mobile Menu */}
//                 {mobileOpen && (
//                     <div className="md:hidden bg-white shadow-lg px-4 py-3">
//                         <ul className="flex flex-col gap-3">
//                             <li><a href="index.html" className="block">Home</a></li>
//                             <li><a href="service.html" className="block">Services</a></li>
//                             <li><a href="products.html" className="block">Products</a></li>
//                         </ul>
//                     </div>
//                 )}
//             </header>

//         </div>


//     );
// }

// export default Header;

// Navbar.jsx

// import React, { useState } from "react";

// export default function Header() {
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//     const menuItems = [
//         {
//             title: "Income Tax",
//             submenu: [
//                 "Salaried Individual",
//                 "Professional",
//                 "Self Employed",
//                 "Hindu Undivided Family (HUF)",
//                 // etc
//             ],
//         },
//         {
//             title: "GST",
//             submenu: [
//                 "GST Registration",
//                 "GST Return Filing",
//                 "E-Invoicing",
//                 // … etc
//             ],
//         },
//         {
//             title: "Registrations",
//             submenu: [
//                 "Startup",
//                 "Proprietorship",
//                 "Partnership",
//                 "OPC",
//                 "LLP",
//                 "Private Limited Company",
//                 "Section 8 Company",
//                 "Trust Registration",
//                 "Producer Company",
//                 "Indian Subsidiary",
//                 // … add more as needed
//             ],
//         },
//         {
//             title: "MCA",
//             submenu: [
//                 "Company Compliance",
//                 "Name Change",
//                 "Director Change",
//                 // etc
//             ],
//         },
//         {
//             title: "Trademark",
//             submenu: [
//                 "Trademark Registration",
//                 "Trademark Objection",
//                 "Logo Designing",
//                 // … etc
//             ],
//         },


//         {
//             title: "Legal",
//             submenu: [
//                 "Company Compliance",
//                 "Name Change",
//                 "Director Change",
//                 // etc
//             ],
//         },


//         {
//             title: "Bank valuation",
//             submenu: [
//                 "Company Compliance",
//                 "Name Change",
//                 "Director Change",
//                 // etc
//             ],
//         },
//         // add more top level items as needed
//     ];

//     return (
//         <nav className="bg-white shadow fixed w-full ">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
//                 <div className="flex justify-between h-16">
//                     {/* Logo Section */}
//                     {/* <div className="flex-shrink-0 flex items-center">
//             <a href="/" className="flex items-center">
//               <img
//                 className="h-8 w-auto"
//                 src="public/img/auditfile_logo.png"
//                 alt="auditfilelogo"
//               />
//             </a>
//           </div> */}

//                     <div className="flflex-shrink-0 flex items-center gap-2">
//                         <a href="/">
//                             <img
//                                 src="public/img/auditfile_logo.png"
//                                 alt="Logo"
//                                 className="w-7 h-auto"  // ✅ controls logo size
//                             />
//                         </a>
//                         <a
//                             href="/"
//                             className=" text-blue-950 text-4xl font-medium font-serif tracking-wide no-underline"
//                         >
//                             AuditFiling
//                         </a>
//                     </div>

//                     {/* Desktop Menu */}
//                     <div className="hidden md:flex md:items-center space-x-6">
//                         {menuItems.map((menu, idx) => (
//                             <div key={idx} className="relative group">
//                                 <button
//                                     className="text-gray-700 hover:text-gray-900 px-3 py-2 font-medium focus:outline-none"
//                                 >
//                                     {menu.title}
//                                 </button>
//                                 <div className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 group-hover:opacity-70 transform scale-95 group-hover:scale-70 transition ease-out duration-200 pointer-events-none group-hover:pointer-events-auto">
//                                     <ul className="py-1">
//                                         {menu.submenu.map((sub, si) => (
//                                             <li key={si}>
//                                                 <a
//                                                     href={`/${menu.title.toLowerCase()}/${sub
//                                                         .toLowerCase()
//                                                         .replace(/\s+/g, "-")}`}
//                                                     className="block px-4 py-2 text-gray-600 hover:bg-gray-70 hover:text-gray-900"
//                                                 >
//                                                     {sub}
//                                                 </a>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             </div>
//                         ))}

//                         {/* Other links: e.g., Guides, Cities etc */}
//                         {/* <a
//               href="/guides"
//               className="text-gray-700 hover:text-gray-900 px-3 py-2 font-medium"
//             >
//               Guides
//             </a>
//             <a
//               href="/cities"
//               className="text-gray-700 hover:text-gray-900 px-3 py-2 font-medium"
//             >
//               Cities
//             </a> */}
//                     </div>

//                     {/* Auth / Login Signup */}
//                     <div className="hidden md:flex md:items-center space-x-4">
//                         <a
//                             href="/login"
//                             className="text-gray-700 hover:text-gray-900 px-3 py-2"
//                         >
//                             Login
//                         </a>
//                         <a
//                             href="/signup"
//                             className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//                         >
//                             Signup
//                         </a>
//                     </div>

//                     {/* Mobile menu button */}
//                     <div className="flex items-center md:hidden">
//                         <button
//                             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                             className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
//                         >
//                             <span className="sr-only">Open main menu</span>
//                             {mobileMenuOpen ? (
//                                 // Close icon
//                                 <svg
//                                     className="h-6 w-6"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     stroke="currentColor"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth={2}
//                                         d="M6 18L18 6M6 6l12 12"
//                                     />
//                                 </svg>
//                             ) : (
//                                 // Hamburger icon
//                                 <svg
//                                     className="h-6 w-6"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     stroke="currentColor"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth={2}
//                                         d="M4 6h16M4 12h16M4 18h16"
//                                     />
//                                 </svg>
//                             )}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Mobile Menu */}
//             {mobileMenuOpen && (
//                 <div className="md:hidden border-t border-gray-200 bg-white">
//                     <div className="px-2 pt-2 pb-3 space-y-1">
//                         {menuItems.map((menu, idx) => (
//                             <div key={idx}>
//                                 <button
//                                     className="w-full text-left text-gray-700 hover:text-gray-900 px-3 py-2 font-medium focus:outline-none"
//                                     onClick={() =>
//                                         setMobileMenuOpen(prev => {
//                                             // optional: expand submenu toggling logic
//                                             return prev;
//                                         })
//                                     }
//                                 >
//                                     {menu.title}
//                                 </button>
//                                 {/* Could add collapsible submenu items here if you want */}
//                                 <div className="pl-4">
//                                     {menu.submenu.map((sub, si) => (
//                                         <a
//                                             key={si}
//                                             href={`/${menu.title.toLowerCase()}/${sub
//                                                 .toLowerCase()
//                                                 .replace(/\s+/g, "-")}`}
//                                             className="block px-3 py-2 text-gray-600 hover:bg-gray-70 hover:text-gray-900"
//                                         >
//                                             {sub}
//                                         </a>
//                                     ))}
//                                 </div>
//                             </div>
//                         ))}

//                         {/* <a
//               href="/guides"
//               className="block px-3 py-2 text-gray-700 hover:bg-gray-70 hover:text-gray-900"
//             >
//               Guides
//             </a>
//             <a
//               href="/cities"
//               className="block px-3 py-2 text-gray-700 hover:bg-gray-70 hover:text-gray-900"
//             >
//               Cities
//             </a> */}
//                         <a
//                             href="/login"
//                             className="block px-3 py-2 text-gray-700 hover:bg-gray-70 hover:text-gray-900"
//                         >
//                             Login
//                         </a>
//                         <a
//                             href="/signup"
//                             className="block px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                         >
//                             Signup
//                         </a>
//                     </div>
//                 </div>
//             )}
//         </nav>
//     );
// }

import React, { useState } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import Navbar from "./Navbar";
import Herosection from "./Herosection";
import { Link } from "react-router-dom";

function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(null); // controls which menu is open
    const [mobileOpen, setMobileOpen] = useState(false); // controls mobile sidebar

    return (
        <div className="fixed top-0 left-0 w-full z-50">

            {/* Topbar Navbar */}
            <div className="bg-white shadow-sm">
                <Navbar />
            </div>

            {/* Main Header */}
            <header className="shadow-md   bg-white">
                <div className="container mx-auto  flex items-center justify-between px-3">
                    {/* Desktop Menu */}
                    <nav className=" flex items-center gap-8 text-sm z-50 ml-45 px-3 py-3">
                        {/* INCOME TAX */}
                        <div className="relative">
                            <Link to="/income-tax">
                                <button
                                    onClick={() =>
                                        setDropdownOpen(dropdownOpen === "income" ? null : "income")
                                    }
                                    className="font-serif tracking-wide font-thin flex items-center gap-1"
                                >
                                    Income Tax
                                    <FaChevronDown
                                        size={10}
                                        className={`mt-1 transition-transform duration-200 ${dropdownOpen === "income" ? "rotate-180" : "rotate-0"
                                            }`}
                                    />
                                </button>
                            </Link>
                            {dropdownOpen === "income" && (
                                <div className="absolute left-0 mt-2 w-[350px] bg-white text-gray-900 rounded shadow-sm p-4 grid grid-cols-2 gap-2 z-50 text-[14px] font-semibold">
                                    <ul className="space-y-2">
                                        <li><a href="/itr-filing" className="block hover:text-blue-600">Salaried Individual</a></li>
                                        <li><a href="/tax-notice" className="block hover:text-blue-600">Professional</a></li>
                                    </ul>
                                    <ul className="space-y-2">
                                        <li><a href="/form-16" className="block hover:text-blue-600">Self Employed</a></li>
                                        <li><a href="/tax-planning" className="block hover:text-blue-600">Hindu Undivided Family (HUF)</a></li>
                                    </ul>
                                </div>

                            )}
                        </div>

                        {/* GST */}
                        <div className="relative">
                            <Link to="/gst">
                                <button
                                    onClick={() =>
                                        setDropdownOpen(dropdownOpen === "gst" ? null : "gst")
                                    }
                                    className="font-serif tracking-wide font-thin flex items-center gap-1"
                                >
                                    GST
                                    <FaChevronDown
                                        size={10}
                                        className={`mt-1 transition-transform duration-200 ${dropdownOpen === "gst" ? "rotate-180" : "rotate-0"
                                            }`}
                                    />
                                </button>
                            </Link>
                            {dropdownOpen === "gst" && (
                                <div className="absolute left-0 mt-2 w-[350px] bg-white text-gray-900 rounded shadow-sm p-4 grid grid-cols-2 gap-4 z-50 text-[14px] font-semibold">
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
                            )}
                        </div>

                        {/* STARTUP */}
                        <div className="relative">
                            <Link to="/startup">
                                <button
                                    onClick={() =>
                                        setDropdownOpen(dropdownOpen === "startup" ? null : "startup")
                                    }
                                    className="font-serif tracking-wide font-thin flex items-center gap-1"
                                >
                                    Startup Registartion
                                    <FaChevronDown
                                        size={10}
                                        className={`mt-1 transition-transform duration-200 ${dropdownOpen === "startup" ? "rotate-180" : "rotate-0"
                                            }`}
                                    />
                                </button>
                            </Link>
                            {dropdownOpen === "startup" && (
                                <div className="absolute left-0 mt-2 w-[550px] bg-white text-gray-900 rounded shadow-sm p-6 grid grid-cols-3 gap-8 z-50 text-[14px] font-semibold">
                                    <ul className="space-y-2">
                                        <li><a href="/proprietorship" className="block hover:text-blue-600">
                                            Proprietorship Firm Registration</a></li>
                                        <li><a href="/partnership" className="block hover:text-blue-600">Partnership Firm Registration</a></li>
                                        <li><a href="/opc" className="block hover:text-blue-600">Trust Registration (IGR)</a></li>

                                        <li><a href="/proprietorship" className="block hover:text-blue-600">
                                            Startup India Registration</a></li>

                                    </ul>
                                    <ul className="space-y-2">

                                        <li><a href="/pvt-ltd" className="block hover:text-blue-600">                                        <li><a href="/llp" className="block hover:text-blue-600">EPF Registration</a></li>
                                        </a></li>
                                        <li><a href="/ngo" className="block hover:text-blue-600">FSSAI Registration</a></li>
                                        <li><a href="/proprietorship" className="block hover:text-blue-600">
                                            FSSAI Renewal</a></li>
                                        <li><a href="/partnership" className="block hover:text-blue-600">Import Export Code</a></li>
                                        <li><a href="/opc" className="block hover:text-blue-600">ISO Registration</a></li>
                                        <li><a href="/opc" className="block hover:text-blue-600">GEM Registration</a></li>

                                    </ul>
                                    <ul className="space-y-2">
                                        <li><a href="/opc" className="block hover:text-blue-600">MSME Registration</a></li>
                                        <li><a href="/llp" className="block hover:text-blue-600">PF Registration</a></li>
                                        <li><a href="/opc" className="block hover:text-blue-600">Shop And Commercial Registration (Labour License)</a></li>

                                        <li><a href="/partnership" className="block hover:text-blue-600">Trade License</a></li>


                                    </ul>


                                </div>
                            )}
                        </div>

                        {/* MCA */}
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setDropdownOpen(dropdownOpen === "mca" ? null : "mca")
                                }
                                className="font-serif tracking-wide font-small flex items-center gap-1"
                            >
                                company(MCA) <FaChevronDown size={7} className="mt-1" />
                            </button>
                            {dropdownOpen === "mca" && (
                                <div className="absolute left-0 mt-2 w-[600px] bg-white text-gray-900 rounded shadow-sm p-6 grid grid-cols-3 gap-4 z-50 text-[14px] font-semibold">
                                    <ul className="space-y-2">
                                        <li><a href="/proprietorship" className="block hover:text-blue-600">
                                            One Person Company Registration</a></li>
                                        <li><a href="/partnership" className="block hover:text-blue-600">LLP Registration</a></li>
                                        <li><a href="/opc" className="block hover:text-blue-600">Private Limited Company Registration</a></li>

                                        <li><a href="/proprietorship" className="block hover:text-blue-600">
                                            Public Limited Company Registration</a></li>

                                    </ul>
                                    <ul className="space-y-2">

                                        <li><a href="/pvt-ltd" className="block hover:text-blue-600">                                        <li><a href="/llp" className="block hover:text-blue-600">Removal of Director</a></li>
                                        </a></li>
                                        <li><a href="/ngo" className="block hover:text-blue-600">Project Report (DPR)</a></li>
                                        <li><a href="/proprietorship" className="block hover:text-blue-600">
                                            PF Return Filing</a></li>
                                        <li><a href="/partnership" className="block hover:text-blue-600">ESI Return Filing</a></li>
                                        <li><a href="/opc" className="block hover:text-blue-600">Company ITR Filing</a></li>
                                        <li><a href="/partnership" className="block hover:text-blue-600">Name Change Of Company</a></li>


                                    </ul>
                                    <ul className="space-y-2">
                                        <li><a href="/opc" className="block hover:text-blue-600">Registered Office Address Change</a></li>
                                        <li><a href="/llp" className="block hover:text-blue-600">Change Of Director</a></li>
                                        <li><a href="/opc" className="block hover:text-blue-600">Company Annual Filing</a></li>
                                        <li><a href="/opc" className="block hover:text-blue-600">ROC AGM Fililng</a></li>
                                        <li><a href="/opc" className="block hover:text-blue-600">TDS Return Filing</a></li>
                                        <li><a href="/opc" className="block hover:text-blue-600">Book keeping</a></li>

                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* TRADEMARK */}
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setDropdownOpen(dropdownOpen === "trademark" ? null : "trademark")
                                }
                                className="font-serif tracking-wide font-small flex items-center gap-1"
                            >
                                Trademark <FaChevronDown size={7} className="mt-1" />
                            </button>
                            {dropdownOpen === "trademark" && (
                                <div className="absolute left-0 mt-2 w-[400px] bg-white text-gray-900 rounded shadow-sm p-4 grid grid-cols-2 gap-4 z-50 text-[14px] font-semibold">
                                    <ul className="space-y-2">
                                        <li><a href="/gst-registration" className="block hover:text-blue-600">Trademark Registration</a></li>
                                        <li><a href="/gst-return-accountant" className="block hover:text-blue-600">Trademark Objection</a></li>
                                        <li><a href="/gst-nil-return" className="block hover:text-blue-600">Trademark Certificate</a></li>
                                        <li><a href="/gst-nil-return" className="block hover:text-blue-600">Trademark Renewal</a></li>

                                    </ul>
                                    <ul className="space-y-2">
                                        <li><a href="/gst-einvoicing" className="block hover:text-blue-600">Trademark Transfer</a></li>
                                        <li><a href="/gst-lut" className="block hover:text-blue-600">Copyright Registration</a></li>
                                        <li><a href="/gst-annual-return" className="block hover:text-blue-600">Patent Registration</a></li>
                                        <li><a href="/gst-annual-return" className="block hover:text-blue-600">TDS Return Filing</a></li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        {/* Bankvaluation */}
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setDropdownOpen(dropdownOpen === "bankvaluation" ? null : "bankvaluation")
                                }
                                className="font-serif tracking-wide font-small flex items-center gap-1"
                            >
                                Bank Valuation <FaChevronDown size={7} className="mt-1" />                           </button>
                            {dropdownOpen === "bankvaluation" && (
                                <div className="absolute left-0 mt-2 w-[350px] bg-white text-gray-900 rounded shadow-sm p-4 grid grid-cols-2 gap-4 z-50 text-[14px] font-semibold">
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
                            )}
                        </div>
                        {/* LegL */}
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setDropdownOpen(dropdownOpen === "legal" ? null : "legal")
                                }
                                className="font-serif tracking-wide font-small flex items-center gap-1"
                            >
                                Legal<FaChevronDown size={7} className="mt-1" />
                            </button>
                            {dropdownOpen === "legal" && (
                                <div className="absolute left-0 mt-2 w-[350px] bg-white text-gray-900 rounded shadow-sm p-4 grid grid-cols-2 gap-4 z-50 text-[14px] font-semibold">
                                    <ul className="space-y-2">
                                        <li><a href="/itr-filing" className="block hover:text-blue-600">Labour and Employment Law</a></li>
                                        <li><a href="/tax-notice" className="block hover:text-blue-600">Legal Notice</a></li>
                                        <li><a href="/tax-notice" className="block hover:text-blue-600">Land Document Verification</a></li>
                                    </ul>
                                    <ul className="space-y-2">
                                        <li><a href="/form-16" className="block hover:text-blue-600">Online Legal Advice</a></li>
                                        <li><a href="/tax-planning" className="block hover:text-blue-600">Banking and Financial Law</a></li>
                                        <li><a href="/tax-notice" className="block hover:text-blue-600">Property</a></li>
                                    </ul>
                                </div>
                            )}
                        </div>


                        {/* Login Button */}
                        {/* <a href="#formid">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 ml-5">
                                Login
                            </button>
                        </a> */}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="md:hidden bg-white shadow-lg px-4 py-3">
                        <ul className="flex flex-col gap-3">
                            <li><a href="/" className="block">Home</a></li>
                            <li><a href="/services" className="block">Services</a></li>
                            <li><a href="/products" className="block">Products</a></li>
                        </ul>
                    </div>
                )}
            </header>
        </div>
    );
}

export default Header;

