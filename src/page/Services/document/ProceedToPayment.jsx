// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ProceedToPayment() {
//   const [isPaying, setIsPaying] = useState(false);
//   const [paid, setPaid] = useState(false);
//   const navigate = useNavigate();

//   // Example document data
//   const document = {
//     name: "Income Tax Filing",
//     description: "Prepare and file your Income Tax documents securely.",
//     price: 499,
//   };

//   const handlePayment = () => {
//     setIsPaying(true);

//     // Mock Payment Simulation
//     setTimeout(() => {
//       setIsPaying(false);
//       setPaid(true);

//       // Redirect to Document page after successful payment
//       navigate("/document");
//     }, 2000);
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4 py-10">
//       <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-100">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
//           Proceed to Payment
//         </h2>

//         <div className="border rounded-xl p-4 mb-6 bg-gray-50">
//           <h3 className="text-lg font-semibold text-gray-700">
//             {document.name}
//           </h3>
//           <p className="text-gray-500 text-sm mt-1">{document.description}</p>

//           <div className="mt-4 flex justify-between items-center">
//             <span className="text-gray-700 font-medium">Document Price:</span>
//             <span className="text-xl font-bold text-green-600">
//               ₹{document.price}
//             </span>
//           </div>
//         </div>

//         {!paid ? (
//           <button
//             onClick={handlePayment}
//             disabled={isPaying}
//             className={`w-full py-3 rounded-xl text-white font-semibold transition ${
//               isPaying
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {isPaying ? "Processing..." : "Proceed to Payment"}
//           </button>
//         ) : (
//           <p className="text-center text-green-600 font-medium mt-4">
//             Payment Successful! Redirecting...
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
