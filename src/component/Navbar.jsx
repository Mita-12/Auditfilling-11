import React from "react";
import { TiMail } from "react-icons/ti";
import { MdAddIcCall } from "react-icons/md";

function Navbar() {
    return (

        <div className=" top-0  w-full bg-black/5 shadow-sm py-2 z-50">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-10">
                <div className="flex items-center gap-2">
                    <a href="/">
                        <img
                            src="public/img/auditfile_logo.png"
                            alt="Logo"
                            className="w-12 h-auto"  // ✅ controls logo size
                        />
                    </a>
                    <a
                        href="/"
                        className=" text-blue-950 text-4xl font-medium font-serif tracking-wide no-underline"
                    >
                        AuditFiling
                    </a>
                </div>
                {/* Left: Contact Info */}
                <div className="flex items-center text-lg text-blue-900 gap-6">
                    <a
                        href="mailto:info@auditfiling.com"
                        className="flex items-center gap-2 hover:text-blue-600"
                    >
                        <TiMail className="text-lg" />
                        info@auditfiling.com
                    </a>
                    <span className="flex items-center gap-2 hover:text-blue-600">
                        <MdAddIcCall className="text-lg" />
                        +91 7428600607
                    </span>
                </div>

                {/* Right: Social Links */}
                <div className="hidden md:flex items-center gap-4 mt-2 md:mt-0 text-gray-600 text-lg">
                    {/* Facebook */}
                    <a
                        href="https://facebook.com/yourpage"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="p-2 rounded-full bg-gray-100 text-blue-600 hover:bg-blue-100 hover:scale-110 transition-transform"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 4.99 3.66 9.13 8.44 9.88v-6.99H8.06v-2.89h2.24V9.62c0-2.21 1.32-3.43 3.34-3.43.97 0 1.98.17 1.98.17v2.18h-1.12c-1.1 0-1.44.68-1.44 1.38v1.66h2.45l-.39 2.89h-2.06V22c4.78-.75 8.44-4.89 8.44-9.93z" />
                        </svg>
                    </a>

                    {/* Instagram */}
                    <a
                        href="https://instagram.com/yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="p-2 rounded-full bg-gray-100 text-pink-500 hover:bg-pink-100 hover:scale-110 transition-transform"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.1a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8zm6.4-3.1a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM12 9.8a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4z" />
                        </svg>
                    </a>

                    {/* YouTube */}
                    <a
                        href="https://youtube.com/yourchannel"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube"
                        className="p-2 rounded-full bg-gray-100 text-red-600 hover:bg-red-100 hover:scale-110 transition-transform"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <path d="M23.5 6.2a3 3 0 0 0-2.12-2.12C19.77 3.5 12 3.5 12 3.5s-7.77 0-9.38.58A3 3 0 0 0 .5 6.2 31.9 31.9 0 0 0 0 12a31.9 31.9 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.12C4.23 20.5 12 20.5 12 20.5s7.77 0 9.38-.58a3 3 0 0 0 2.12-2.12A31.9 31.9 0 0 0 24 12a31.9 31.9 0 0 0-.5-5.8zM9.8 15.5V8.5L16.2 12l-6.4 3.5z" />
                        </svg>
                    </a>

                      {/* Login Button */}
                        <a href="#formid">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 ml-5">
                                Login
                            </button>
                        </a>
                </div>

            </div>
        </div>

    )
}
export default Navbar;
// Navbar.jsx

// import React, { useState } from "react";

// export default function Navbar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const menuItems = [
//     {
//       title: "Registrations",
//       submenu: [
//         "Startup",
//         "Proprietorship",
//         "Partnership",
//         "OPC",
//         "LLP",
//         "Private Limited Company",
//         "Section 8 Company",
//         "Trust Registration",
//         "Producer Company",
//         "Indian Subsidiary",
//         // … add more as needed
//       ],
//     },
//     {
//       title: "Trademark",
//       submenu: [
//         "Trademark Registration",
//         "Trademark Objection",
//         "Logo Designing",
//         // … etc
//       ],
//     },
//     {
//       title: "GST",
//       submenu: [
//         "GST Registration",
//         "GST Return Filing",
//         "E-Invoicing",
//         // … etc
//       ],
//     },
//     {
//       title: "Income Tax",
//       submenu: [
//         "ITR-1",
//         "ITR-2",
//         "Business Tax Filing",
//         // etc
//       ],
//     },
//     {
//       title: "MCA",
//       submenu: [
//         "Company Compliance",
//         "Name Change",
//         "Director Change",
//         // etc
//       ],
//     },
//     // add more top level items as needed
//   ];

//   return (
//     <nav className="bg-white shadow">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           {/* Logo Section */}
//           <div className="flex-shrink-0 flex items-center">
//             <a href="/" className="flex items-center">
//               <img
//                 className="h-8 w-auto"
//                 src="/path/to/logo.png"
//                 alt="IndiaFilings Logo"
//               />
//             </a>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex md:items-center space-x-6">
//             {menuItems.map((menu, idx) => (
//               <div key={idx} className="relative group">
//                 <button
//                   className="text-gray-700 hover:text-gray-900 px-3 py-2 font-medium focus:outline-none"
//                 >
//                   {menu.title}
//                 </button>
//                 <div className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition ease-out duration-200 pointer-events-none group-hover:pointer-events-auto">
//                   <ul className="py-1">
//                     {menu.submenu.map((sub, si) => (
//                       <li key={si}>
//                         <a
//                           href={`/${menu.title.toLowerCase()}/${sub
//                             .toLowerCase()
//                             .replace(/\s+/g, "-")}`}
//                           className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//                         >
//                           {sub}
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             ))}

//             {/* Other links: e.g., Guides, Cities etc */}
//             <a
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
//             </a>
//           </div>

//           {/* Auth / Login Signup */}
//           <div className="hidden md:flex md:items-center space-x-4">
//             <a
//               href="/login"
//               className="text-gray-700 hover:text-gray-900 px-3 py-2"
//             >
//               Login
//             </a>
//             <a
//               href="/signup"
//               className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//             >
//               Signup
//             </a>
//           </div>

//           {/* Mobile menu button */}
//           <div className="flex items-center md:hidden">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
//             >
//               <span className="sr-only">Open main menu</span>
//               {mobileMenuOpen ? (
//                 // Close icon
//                 <svg
//                   className="h-6 w-6"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               ) : (
//                 // Hamburger icon
//                 <svg
//                   className="h-6 w-6"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden border-t border-gray-200 bg-white">
//           <div className="px-2 pt-2 pb-3 space-y-1">
//             {menuItems.map((menu, idx) => (
//               <div key={idx}>
//                 <button
//                   className="w-full text-left text-gray-700 hover:text-gray-900 px-3 py-2 font-medium focus:outline-none"
//                   onClick={() =>
//                     setMobileMenuOpen(prev => {
//                       // optional: expand submenu toggling logic
//                       return prev;
//                     })
//                   }
//                 >
//                   {menu.title}
//                 </button>
//                 {/* Could add collapsible submenu items here if you want */}
//                 <div className="pl-4">
//                   {menu.submenu.map((sub, si) => (
//                     <a
//                       key={si}
//                       href={`/${menu.title.toLowerCase()}/${sub
//                         .toLowerCase()
//                         .replace(/\s+/g, "-")}`}
//                       className="block px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//                     >
//                       {sub}
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             ))}

//             <a
//               href="/guides"
//               className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//             >
//               Guides
//             </a>
//             <a
//               href="/cities"
//               className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//             >
//               Cities
//             </a>
//             <a
//               href="/login"
//               className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//             >
//               Login
//             </a>
//             <a
//               href="/signup"
//               className="block px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//               Signup
//             </a>
//           </div>
//         </div>
//       )}
//     </nav>
// );
// }
