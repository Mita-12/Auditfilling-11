// import React, { useState } from "react";
// import { FaWhatsapp, FaTimes } from "react-icons/fa";

// export default function WhatsAppPopup() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div>
//       {/* Floating Rectangle Button */}
//       {!open && (
//         <button
//           onClick={() => setOpen(true)}
//           className="fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg hover:bg-green-600 transition flex items-center gap-2 font-medium"
//         >
//           <FaWhatsapp className="text-2xl" />
//           Live Chat with Experts
//         </button>
//       )}

//       {/* Popup Chat Box */}
//       {open && (
//         <div className="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-2xl border">
//           {/* Header */}
//           <div className="bg-green-500 text-white flex justify-between items-center px-4 py-2 rounded-t-lg">
//             <h3 className="font-semibold flex items-center gap-2">
//               <FaWhatsapp /> Live Chat with Experts
//             </h3>
//             <button onClick={() => setOpen(false)} className="hover:text-gray-200">
//               <FaTimes />
//             </button>
//           </div>

//           {/* Body */}
//           <div className="p-4">
//             <p className="text-gray-600 text-sm mb-3">
//               Consult our team about{" "}
//               <span className="text-blue-600 font-medium cursor-pointer">
//                 Registrations & License
//               </span>{" "}
//               service on live chat.
//             </p>

//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 const name = e.target.name.value;
//                 const email = e.target.email.value;
//                 const phone = e.target.phone.value;
//                 window.open(
//                   `https://wa.me/919876543210?text=Hello,%20my%20name%20is%20${name},%20email:%20${email},%20phone:%20${phone}`,
//                   "_blank"
//                 );
//               }}
//               className="space-y-2"
//             >
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-400"
//                 required
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-400"
//                 required
//               />
//               <div className="flex">
//                 <span className="px-2 py-2 border border-r-0 border-gray-300 bg-gray-100 text-sm rounded-l">
//                   +91
//                 </span>
//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="Phone"
//                   className="w-full border border-gray-300 rounded-r px-3 py-2 text-sm focus:ring-2 focus:ring-green-400"
//                   required
//                 />
//               </div>

//               {/* Toggle */}
//               <div className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   defaultChecked
//                   className="h-4 w-4 text-green-500"
//                 />
//                 <span className="text-sm text-gray-600">
//                   Chat using WhatsApp
//                 </span>
//               </div>

//               {/* Button */}
//               <button
//                 type="submit"
//                 className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
//               >
//                 START LIVE CHAT
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function WhatsAppPopup() {
  return (
    <div>
      {/* Floating WhatsApp Square Button */}
     <Link to="https://wa.me/7428600607">
      <button
         className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition flex items-center gap-2 font-medium"         >
         <FaWhatsapp className="text-2xl" />           Live Chat with Experts
        </button></Link>
    </div>
  );
}
