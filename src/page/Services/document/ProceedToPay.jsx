// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ProceedToPay() {
//   const [selectedService, setSelectedService] = useState("");
//   const navigate = useNavigate();

//   const handleProceed = () => {
//     if (!selectedService) return;

//     // Redirect based on the selected service
//     switch (selectedService) {
//       case "Salary Individual":
//         navigate("/salary-individual");
//         break;
//       case "Professional":
//         navigate("/professional");
//         break;
//       case "Employee":
//         navigate("/employee");
//         break;
//       case "HUF":
//         navigate("/huf");
//         break;
//       default:
//         alert("Invalid service selected!");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center px-3 py-5">
//       <div className="bg-white shadow-lg rounded-2xl p-2 w-full max-w-md border border-gray-100">
//         {/* Heading */}
//         <h2 className="text-xl font-semibold text-gray-800 text-center">
//           Proceed to Payment
//         </h2>
//         <p className="text-gray-500 text-center text-sm mb-4">
//           Choose your service to continue with payment
//         </p>

//         {/* Select Dropdown */}
//         <div className="mb-4">
//           <label
//             htmlFor="service"
//             className="block text-gray-700 font-medium mb-2"
//           >
//             Select Service
//           </label>
//           <select
//             id="service"
//             value={selectedService}
//             onChange={(e) => setSelectedService(e.target.value)}
//             className="w-full border border-gray-300 px-3 py-2 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//           >
//             <option value="">-- Choose a service --</option>
//             <option value="Salary Individual">Salary Individual</option>
//             <option value="Professional">Professional</option>
//             <option value="Employee">Employee</option>
//             <option value="HUF">HUF</option>
//           </select>
//         </div>

//         {/* Proceed Button */}
//         <button
//           onClick={handleProceed}
//           disabled={!selectedService}
//           className={`w-full font-semibold py-2 rounded-lg transition duration-200 ${
//             selectedService
//               ? "bg-blue-600 text-white hover:bg-blue-700"
//               : "bg-gray-300 text-gray-600 cursor-not-allowed"
//           }`}
//         >
//           Proceed
//         </button>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProceedToPay() {
  const [selectedService, setSelectedService] = useState("");
  const navigate = useNavigate();

  const handleProceed = () => {
    if (!selectedService) return;

    const routeMap = {
      "Salary Individual": "salary-individual",
      Professional: "professional",
      Employee: "employee",
      HUF: "huf",
    };

    navigate(`/service/${routeMap[selectedService]}`);
  };

  return (
    <div className="flex justify-center items-center  px-3 py-10">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-100">
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-1">
          Proceed to Payment
        </h2>
        <p className="text-gray-500 text-center text-sm mb-6">
          Choose your service to continue with payment
        </p>

        {/* Select Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="service"
            className="block text-gray-700 font-medium mb-2"
          >
            Select Service
          </label>
          <select
            id="service"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          >
            <option value="">-- Choose a service --</option>
            <option value="Salary Individual">Salary Individual</option>
            <option value="Professional">Professional</option>
            <option value="Employee">Employee</option>
            <option value="HUF">HUF</option>
          </select>
        </div>

        {/* Proceed Button */}
        <button
          onClick={handleProceed}
          disabled={!selectedService}
          className={`w-full font-semibold py-3 rounded-lg transition duration-200 ${
            selectedService
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Proceed
        </button>
      </div>
    </div>
  );
}
