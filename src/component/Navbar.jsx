// import React, { useState } from "react";
// import { TiMail } from "react-icons/ti";
// import { MdAddIcCall } from "react-icons/md";
// import { FaUser } from "react-icons/fa"; // optional user icon for mobile

// import LoginForm from "../form/LoginForm";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);

//   return (
//     <header className="top-0 w-full bg-blue-100 shadow-sm py-3 z-50 relative">
//       <div className="container mx-auto px-2 flex flex-col md:flex-row justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <a href="/">
//             <img src="/img/auditfile_logo.png" alt="Logo" className="w-8 h-auto " />
//           </a>
//           <a
//             href="/"
//             className="text-blue-950 text-2xl md:text-3xl font-medium font-serif "
//           >
//             AuditFiling
//           </a>
//         </div>

//         {/* Menu + Contact */}
//         <div
//           className={`${menuOpen ? "flex" : "flex"
//             } flex-col md:flex-row md:items-center gap-4 md:gap-6 w-full md:w-auto mt-4 md:mt-0`}
//         >
//           {/* Contact Email */}
//           {/* <a
//             href="mailto:info@auditfiling.com"
//             className="flex items-center gap-1 font-serif hover:text-blue-600 text-sm md:text-base"
//           >
//             <TiMail className="text-lg" /> info@auditfiling.com
//           </a> */}

//           {/* Phone */}
//           {/* <a
//             href="tel:+917428600607"
//             className="flex items-center gap-1 hover:text-blue-600 text-sm md:text-base"
//           >
//             <MdAddIcCall className="text-lg" /> +91 7428600607
//           </a> */}

//           {/* Social Icons */}
//           <div className="hidden md:flex flex-wrap items-center gap-2 mt-2 md:mt-0">
//             {/* Facebook */}
//             <a
//               href="https://www.facebook.com/profile.php?id=100075888295123"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Facebook"
//               className="p-2 rounded-full bg-gray-100 text-blue-600 hover:bg-blue-100 hover:scale-110 transition-transform"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
//                 <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 4.99 3.66 9.13 8.44 9.88v-6.99H8.06v-2.89h2.24V9.62c0-2.21 1.32-3.43 3.34-3.43.97 0 1.98.17 1.98.17v2.18h-1.12c-1.1 0-1.44.68-1.44 1.38v1.66h2.45l-.39 2.89h-2.06V22c4.78-.75 8.44-4.89 8.44-9.93z" />
//               </svg>
//             </a>
//             {/* Instagram */}
//             <a
//               href="https://www.instagram.com/audit.filling/"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Instagram"
//               className="p-2 rounded-full bg-gray-100 text-pink-500 hover:bg-pink-100 hover:scale-110 transition-transform"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
//                 <path d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5c0 3.3-2.45 5.75-5.75 5.75h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zm0 1.5C5.68 3.5 4 5.18 4 7.25v8.5C4 18.32 5.68 20 7.75 20h8.5c2.07 0 3.75-1.68 3.75-3.75v-8.5C20 5.68 18.32 4 16.25 4h-8.5zm8.75 2a1 1 0 110 2 1 1 0 010-2zm-4.25 1.25a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 1.5a4 4 0 100 8 4 4 0 000-8z" />
//               </svg>
//             </a>
//             {/* LinkedIn */}
//             <a
//               href="https://www.linkedin.com/in/audit-filing-3a394a194/"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="LinkedIn"
//               className="p-2 rounded-full bg-gray-100 text-blue-700 hover:bg-blue-200 hover:scale-110 transition-transform"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
//                 <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 17V10.67H5.67V17H8.34M7 9.5A1.34 1.34 0 1 0 7 6.83 1.34 1.34 0 0 0 7 9.5M18.33 17V13.33C18.33 11.1 16.87 9.83 15 9.83C13.9 9.83 13.1 10.4 12.76 11H12.67V10.67H10V17H12.67V13.67C12.67 12.8 13.33 12.17 14.17 12.17C15 12.17 15.67 12.83 15.67 13.67V17H18.33Z" />
//               </svg>
//             </a>
//             {/* YouTube */}
//             <a
//               href="https://youtube.com/@auditfilling?si=GUxfX6wapvqnNkRr	"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="YouTube"
//               className="p-2 rounded-full bg-gray-100 text-red-600 hover:bg-red-100 hover:scale-110 transition-transform"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
//                 <path d="M23.5 6.2a3 3 0 0 0-2.12-2.12C19.77 3.5 12 3.5 12 3.5s-7.77 0-9.38.58A3 3 0 0 0 .5 6.2 31.9 31.9 0 0 0 0 12a31.9 31.9 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.12C4.23 20.5 12 20.5 12 20.5s7.77 0 9.38-.58a3 3 0 0 0 2.12-2.12A31.9 31.9 0 0 0 24 12a31.9 31.9 0 0 0-.5-5.8zM9.8 15.5V8.5L16.2 12l-6.4 3.5z" />
//               </svg>
//             </a>
//           </div>

//           {/* Login Button */}
//           <button
//           onClick={() => setShowLogin(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1"
//         >
//           <FaUser className="md:hidden w-5 h-5" /> {/* Icon only on mobile */}
//           <span className="hidden md:inline">Login</span> {/* Text only on desktop */}
//         </button>
//         </div>
//       </div>

//       {/* Login Popup */}
//       {showLogin && (
//         <LoginForm
//           isOpen={showLogin}
//           onClose={() => setShowLogin(false)}
//         />
//       )}
//     </header>
//   );
// }




// import React, { useState, useEffect } from "react"; // ✅ Added useEffect
// import { Link } from "react-router-dom";           // ✅ Needed for Link
// import { TiMail } from "react-icons/ti";
// import { MdAddIcCall } from "react-icons/md";
// import { FaUser } from "react-icons/fa";
// import LoginForm from "../form/LoginForm"

// export default function Navbar() {
//   const [, setMenuOpen] = useState(false);
//    const [showLogin, setShowLogin] = useState(false);

//   const [user, setUser] = useState(null);

//   // Load user from localStorage safely
//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem("user");
//       if (savedUser) setUser(JSON.parse(savedUser));
//     } catch (err) {
//       console.error("Failed to parse user from localStorage", err);
//       setUser(null);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     window.location.reload(); // optional
//   };

//   return (
//     <header className="top-0 w-full bg-blue-100 shadow-sm py-3 z-50 relative">
//       <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <Link to="/">
//             <img src="/img/auditfile_logo.png" alt="Logo" className="w-8 h-auto " />
//           </Link>
//           <Link
//             to="/"
//             className="text-blue-950 text-2xl md:text-3xl font-medium font-serif "
//           >
//             AuditFiling
//           </Link>
//         </div>

//         {/* Menu + Login/User */}
//         <div className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-6 w-full md:w-auto mt-4 md:mt-0`}>


//           {/* Login Button or User Info */}
//           {!user ? (
//             <button
//              onClick={() => setShowLogin(true)}
//               className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
//             >
//               <FaUser className="w-5 h-5" />
//               Login
//             </button>
//           ) : (
//             <div className="flex items-center gap-2 relative">
//               <FaUser className="w-6 h-6 text-gray-700" />
//               <span className="hidden md:inline">{user?.name || "User"}</span>
//               <button
//                 onClick={handleLogout}
//                 className="ml-2 px-2 py-1 text-sm text-red-600 hover:text-red-800"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//         {/* Login Form Modal */}
//         <LoginForm
//           isOpen={showLogin}
//           onClose={() => setShowLogin(false)}
//         />
//       </div>
//     </header>
//   );
// import React, { useState, useEffect } from "react";
// import { TiMail } from "react-icons/ti";
// import { MdAddIcCall } from "react-icons/md";
// import { FaUser } from "react-icons/fa";
// import LoginForm from "../form/LoginForm";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

// const MySwal = withReactContent(Swal);

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   const DropdownItem = ({ label, onClick }) => (
//     <button
//       onClick={onClick}
//       className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//     >
//       {label}
//     </button>
//   );

//   // ---------------- Load user safely ----------------
//   useEffect(() => {
//     const loadUser = () => {
//       // Check both possible storage keys
//       const savedUser = localStorage.getItem("user") || localStorage.getItem("user_name");
//       if (savedUser) {
//         try {
//           const userData = JSON.parse(savedUser);
//           setUser(userData);
//         } catch {
//           // If it's just a string, create user object
//           setUser({ user_name: savedUser });
//         }
//       }
//     };

//     loadUser();
//   }, []);

//   // ---------------- Listen for user updates ----------------
//   useEffect(() => {
//     const handleUserUpdate = () => {
//       const savedUser = localStorage.getItem("user") || localStorage.getItem("user_name");
//       if (savedUser) {
//         try {
//           setUser(JSON.parse(savedUser));
//         } catch {
//           setUser({ user_name: savedUser });
//         }
//       } else {
//         setUser(null);
//       }
//     };

//     window.addEventListener("storage", handleUserUpdate);
//     window.addEventListener("userUpdated", handleUserUpdate);

//     return () => {
//       window.removeEventListener("storage", handleUserUpdate);
//       window.removeEventListener("userUpdated", handleUserUpdate);
//     };
//   }, []);

//   // ---------------- Logout with SweetAlert2 ----------------
//   const handleLogout = () => {
//     MySwal.fire({
//       title: "Are you sure?",
//       text: "You will be logged out!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, logout",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Remove from both possible storage keys
//         localStorage.removeItem("user");
//         localStorage.removeItem("user_name");
//         setUser(null);

//         window.dispatchEvent(new Event("storage"));
//         window.dispatchEvent(new Event("userUpdated"));

//         navigate("/");

//         MySwal.fire({
//           title: "Logged Out!",
//           text: "You have been successfully logged out.",
//           icon: "success",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//       }
//     });
//   };

//   // ---------------- Fixed Login handler ----------------
//   const handleLogin = (userData) => {
//     // Update state first
//     setUser(userData);

//     // Then dispatch events
//     window.dispatchEvent(new Event("storage"));
//     window.dispatchEvent(new Event("userUpdated"));

//     setShowLogin(false);

//     MySwal.fire({
//       title: `Welcome, ${userData.user_name || userData.email}!`,
//       icon: "success",
//       timer: 1500,
//       showConfirmButton: false,
//     });
//   };

//   return (
//     <header className="top-0 w-full bg-blue-100 shadow-sm py-3 z-50 relative">
//       <div className="container mx-auto px-2 flex flex-col md:flex-row justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <a href="/">
//             <img src="/img/auditfile_logo.png" alt="Logo" className="w-8 h-auto " />
//           </a>
//           <a href="/" className="text-blue-950 text-2xl md:text-3xl font-medium font-serif">
//             AuditFiling
//           </a>
//         </div>

//         {/* Menu + Contact */}
//         <div
//           className={`${menuOpen ? "flex" : "flex"
//             } flex-col md:flex-row md:items-center gap-4 md:gap-6 w-full md:w-auto mt-4 md:mt-0`}
//         >
//           {/* Social Icons */}
//           <div className="hidden md:flex flex-wrap items-center gap-2 mt-2 md:mt-0">
//             {/* Facebook */}
//             <a
//               href="https://www.facebook.com/profile.php?id=100075888295123"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Facebook"
//               className="p-2 rounded-full bg-gray-100 text-blue-600 hover:bg-blue-100 hover:scale-110 transition-transform"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className="w-5 h-5"
//               >
//                 <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 4.99 3.66 9.13 8.44 9.88v-6.99H8.06v-2.89h2.24V9.62c0-2.21 1.32-3.43 3.34-3.43.97 0 1.98.17 1.98.17v2.18h-1.12c-1.1 0-1.44.68-1.44 1.38v1.66h2.45l-.39 2.89h-2.06V22c4.78-.75 8.44-4.89 8.44-9.93z" />
//               </svg>
//             </a>
//             {/* Instagram */}
//             <a
//               href="https://www.instagram.com/audit.filling/"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Instagram"
//               className="p-2 rounded-full bg-gray-100 text-pink-500 hover:bg-pink-100 hover:scale-110 transition-transform"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className="w-5 h-5"
//               >
//                 <path d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5c0 3.3-2.45 5.75-5.75 5.75h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zm0 1.5C5.68 3.5 4 5.18 4 7.25v8.5C4 18.32 5.68 20 7.75 20h8.5c2.07 0 3.75-1.68 3.75-3.75v-8.5C20 5.68 18.32 4 16.25 4h-8.5zm8.75 2a1 1 0 110 2 1 1 0 010-2zm-4.25 1.25a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 1.5a4 4 0 100 8 4 4 0 000-8z" />
//               </svg>
//             </a>
//             {/* LinkedIn */}
//             <a
//               href="https://www.linkedin.com/in/audit-filing-3a394a194/"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="LinkedIn"
//               className="p-2 rounded-full bg-gray-100 text-blue-700 hover:bg-blue-200 hover:scale-110 transition-transform"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className="w-5 h-5"
//               >
//                 <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 17V10.67H5.67V17H8.34M7 9.5A1.34 1.34 0 1 0 7 6.83A1.34 1.34 0 0 0 7 9.5M18.33 17V13.33C18.33 11.1 16.87 9.83 15 9.83C13.9 9.83 13.1 10.4 12.76 11H12.67V10.67H10V17H12.67V13.67C12.67 12.8 13.33 12.17 14.17 12.17C15 12.17 15.67 12.83 15.67 13.67V17H18.33Z" />
//               </svg>
//             </a>
//             {/* YouTube */}
//             <a
//               href="https://youtube.com/@auditfilling?si=GUxfX6wapvqnNkRr"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="YouTube"
//               className="p-2 rounded-full bg-gray-100 text-red-600 hover:bg-red-100 hover:scale-110 transition-transform"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//                 className="w-5 h-5"
//               >
//                 <path d="M23.5 6.2a3 3 0 0 0-2.12-2.12C19.77 3.5 12 3.5 12 3.5s-7.77 0-9.38.58A3 3 0 0 0 .5 6.2 31.9 31.9 0 0 0 0 12a31.9 31.9 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.12C4.23 20.5 12 20.5 12 20.5s7.77 0 9.38-.58a3 3 0 0 0 2.12-2.12A31.9 31.9 0 0 0 24 12a31.9 31.9 0 0 0-.5-5.8zM9.8 15.5V8.5L16.2 12l-6.4 3.5z" />
//               </svg>
//             </a>
//           </div>

//           {/* User Profile Dropdown or Login Button */}
//           {user ? (
//             <div className="relative group">
//               <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700 transition-colors">
//                 <FaUser className="w-4 h-4" />
//                 <span className="hidden md:inline">
//                   {user.user_name || user.email || "User"}
//                 </span>
//                 <svg
//                   className="w-4 h-4 ml-1 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>

//               <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
//                 <DropdownItem label="👤 Profile" onClick={() => navigate("/profile")} />
//                 <DropdownItem label="🏢 Company Details" onClick={() => navigate("/company-details")} />
//                 <DropdownItem label="📋 My Request" onClick={() => navigate("/myrequests")} />
//                 <DropdownItem label="✅ Completed Service" onClick={() => navigate("/completed-services")} />
//                 <DropdownItem label="💳 Payment History" onClick={() => navigate("/payment-history")} />
//                 <DropdownItem label="🏦 Bank Details" onClick={() => navigate("/bank-details")} />
//                 <DropdownItem label="💬 Feedback" onClick={() => navigate("/feedback")} />
//                 <div className="border-t border-gray-200 my-1"></div>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
//                 >
//                   🚪 Logout
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <button
//               onClick={() => setShowLogin(true)}
//               className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 hover:bg-blue-700 transition-colors"
//             >
//               <FaUser className="md:hidden w-5 h-5" />
//               <span className="hidden md:inline">Sign In</span>
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Login Popup */}
//       {showLogin && (
//         <LoginForm
//           isOpen={showLogin}
//           onClose={() => setShowLogin(false)}
//           onLoginSuccess={handleLogin}
//         />
//       )}
//     </header>
//   );
// }

import React, { useState, useEffect } from "react";
import { TiMail } from "react-icons/ti";
import { MdAddIcCall } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import LoginForm from "../form/LoginForm";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const DropdownItem = ({ label, onClick }) => (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      {label}
    </button>
  );

  // ---------------- Load user safely ----------------
  useEffect(() => {
    const loadUser = () => {
      const savedUser = localStorage.getItem("user_name");
      // console.log("Loaded user from storage:", savedUser);

      if (savedUser) {
        const isJSON = savedUser.startsWith("{") || savedUser.startsWith("[");
        const userData = isJSON ? JSON.parse(savedUser) : { user_name: savedUser };
        setUser(userData);
      }
    };

    loadUser();
  }, []);


  // ---------------- Listen for user updates ----------------
  useEffect(() => {
    const handleUserUpdate = () => {
      const savedUser = localStorage.getItem("user") || localStorage.getItem("user_name");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          setUser({ user_name: savedUser });
        }
      } else {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleUserUpdate);
    window.addEventListener("userUpdated", handleUserUpdate);

    return () => {
      window.removeEventListener("storage", handleUserUpdate);
      window.removeEventListener("userUpdated", handleUserUpdate);
    };
  }, []);

  // ---------------- Logout with SweetAlert2 ----------------
  const handleLogout = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove from both possible storage keys
        localStorage.removeItem("user");
        localStorage.removeItem("user_name");
        setUser(null);

        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("userUpdated"));

        navigate("/");

        MySwal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // ---------------- Fixed Login handler ----------------
  const handleLogin = (userData) => {
    // Update state first
    setUser(userData);

    // Then dispatch events
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("userUpdated"));
    // window.reload();
    setShowLogin(false);

    MySwal.fire({
      title: `Welcome, ${userData.user_name}!`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <header className="top-0 w-full bg-blue-100 shadow-sm py-3 z-50 relative">
      <div className="container mx-auto px-2 flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a href="/">
            <img src="/img/auditfile_logo.png" alt="Logo" className="w-8 h-auto " />
          </a>
          <a href="/" className="text-blue-950 text-2xl md:text-3xl font-medium font-serif">
            AuditFiling
          </a>
        </div>

        {/* Menu + Contact */}
        <div
          className={`${menuOpen ? "flex" : "flex"
            } flex-col md:flex-row md:items-center gap-4 md:gap-6 w-full md:w-auto mt-4 md:mt-0`}
        >
          {/* Social Icons */}
          <div className="hidden md:flex flex-wrap items-center gap-2 mt-2 md:mt-0">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=100075888295123"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2 rounded-full bg-gray-100 text-blue-600 hover:bg-blue-100 hover:scale-110 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 4.99 3.66 9.13 8.44 9.88v-6.99H8.06v-2.89h2.24V9.62c0-2.21 1.32-3.43 3.34-3.43.97 0 1.98.17 1.98.17v2.18h-1.12c-1.1 0-1.44.68-1.44 1.38v1.66h2.45l-.39 2.89h-2.06V22c4.78-.75 8.44-4.89 8.44-9.93z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/audit.filling/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 rounded-full bg-gray-100 text-pink-500 hover:bg-pink-100 hover:scale-110 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5c0 3.3-2.45 5.75-5.75 5.75h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zm0 1.5C5.68 3.5 4 5.18 4 7.25v8.5C4 18.32 5.68 20 7.75 20h8.5c2.07 0 3.75-1.68 3.75-3.75v-8.5C20 5.68 18.32 4 16.25 4h-8.5zm8.75 2a1 1 0 110 2 1 1 0 010-2zm-4.25 1.25a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 1.5a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/audit-filing-3a394a194/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-full bg-gray-100 text-blue-700 hover:bg-blue-200 hover:scale-110 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 17V10.67H5.67V17H8.34M7 9.5A1.34 1.34 0 1 0 7 6.83A1.34 1.34 0 0 0 7 9.5M18.33 17V13.33C18.33 11.1 16.87 9.83 15 9.83C13.9 9.83 13.1 10.4 12.76 11H12.67V10.67H10V17H12.67V13.67C12.67 12.8 13.33 12.17 14.17 12.17C15 12.17 15.67 12.83 15.67 13.67V17H18.33Z" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="https://youtube.com/@auditfilling?si=GUxfX6wapvqnNkRr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="p-2 rounded-full bg-gray-100 text-red-600 hover:bg-red-100 hover:scale-110 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M23.5 6.2a3 3 0 0 0-2.12-2.12C19.77 3.5 12 3.5 12 3.5s-7.77 0-9.38.58A3 3 0 0 0 .5 6.2 31.9 31.9 0 0 0 0 12a31.9 31.9 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.12C4.23 20.5 12 20.5 12 20.5s7.77 0 9.38-.58a3 3 0 0 0 2.12-2.12A31.9 31.9 0 0 0 24 12a31.9 31.9 0 0 0-.5-5.8zM9.8 15.5V8.5L16.2 12l-6.4 3.5z" />
              </svg>
            </a>
          </div>

          {/* User Profile Dropdown or Login Button */}
          {user ? (
            <div className="relative group">
              <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700 transition-colors">
                <FaUser className="w-4 h-4" />
                <span className="hidden md:inline">
                  {(() => {
                    // Handle different user data formats
                    const email =
                      typeof user === "string"
                        ? user
                        : user?.email || user?.user_name || "";

                    if (!email) return "User";

                    // If email has '@', just take first 5 letters of the username part
                    if (email.includes("@")) {
                      const namePart = email.split("@")[0];
                      return namePart.slice(0, 5);
                    }

                    // Otherwise, just show first 5 characters of the username
                    return email.slice(0, 5);
                  })()}
                </span>

              </button>

              <div className="absolute -right-1/2 mt-3 w-50 bg-white rounded-xl shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
                <DropdownItem label="👤 Profile" onClick={() => navigate("/profile")} />
                <DropdownItem label="🏢 Company Details" onClick={() => navigate("/company-details")} />
                <DropdownItem label="📋 My Request" onClick={() => navigate("/myrequests")} />
                <DropdownItem label="✅ Completed Service" onClick={() => navigate("/completed-services")} />
                <DropdownItem label="💳 Payment History" onClick={() => navigate("/payment-history")} />
                <DropdownItem label="🏦 Bank Details" onClick={() => navigate("/bank-details")} />
                <DropdownItem label="💬 Feedback" onClick={() => navigate("/feedback")} />
                <div className="border-t border-gray-200 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 hover:bg-blue-700 transition-colors"
            >
              <FaUser className="md:hidden w-5 h-5" />
              <span className="hidden md:inline">Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* Login Popup */}
      {showLogin && (
        <LoginForm
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLogin}
        />
      )}
    </header>
  );
}

