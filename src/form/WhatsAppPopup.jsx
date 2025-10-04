
// import React from "react";
// import { FaWhatsapp } from "react-icons/fa";

// export default function WhatsAppPopup() {
//   return (
//     <div className="fixed bottom-6 right-6 z-50">
//       <a
//         href="https://wa.me/7428600607"
//         target="_blank"
//         rel="noopener noreferrer"
//         aria-label="Chat on WhatsApp"
//       >
//         <div className="relative flex flex-col items-center">
//           {/* Curved Animated Text */}
//           <svg
//             viewBox="0 0 100 50"
//             className="absolute w-28 h-14 -top-8 pointer-events-none animate-bounce-slow"
//           >
//             <defs>
//               <path
//                 id="chatCurve"
//                 d="M 20,40 A30,30 0 0,1 80,40"
//                 fill="none"
//               />
//             </defs>
//             <text
//               fill="#ff0000"
//               fontSize="14"
//               fontWeight="700"
//               letterSpacing="1"
//             >
//               <textPath
//                 href="#chatCurve"
//                 startOffset="50%"
//                 textAnchor="middle"
//               >
//                 Let’s Chat
//               </textPath>
//             </text>
//           </svg>

//           {/* WhatsApp Floating Button */}
//           <button className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
//             <FaWhatsapp className="text-3xl" />
//           </button>
//         </div>
//       </a>

//       {/* Animation Styles */}
//       <style>
//         {`
//           @keyframes bounce-slow {
//             0%, 100% { transform: translateY(0); }
//             50% { transform: translateY(-5px); }
//           }
//           .animate-bounce-slow {
//             animation: bounce-slow 2.5s infinite;
//           }
//         `}
//       </style>
//     </div>
//   );
// }
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/7428600607
" // Replace with your WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg shadow-lg transition-all duration-300 animate-bounce"
    >
      <FaWhatsapp className="text-2xl animate-pulse" />
      <span className="whitespace-nowrap">Live Chat with Experts</span>
    </a>
  );
}

