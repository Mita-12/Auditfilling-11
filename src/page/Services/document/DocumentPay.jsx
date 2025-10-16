// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";

// export default function DocumentPay() {
//   const { service } = useParams();

//   // ✅ Service configuration (name + price)
//   const serviceData = {
//     "salary-individual": {
//       name: "Salary Individual",
//       price: 499,
//     },
//     professional: {
//       name: "Professional",
//       price: 799,
//     },
//     employee: {
//       name: "Employee",
//       price: 599,
//     },
//     huf: {
//       name: "HUF",
//       price: 699,
//     },
//   };

//   const currentService = serviceData[service];

//   if (!currentService) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-red-500 text-lg font-semibold">
//           Invalid service selected.
//         </p>
//       </div>
//     );
//   }

//   // ✅ Razorpay Payment Handler
//   const handlePayment = async () => {
//     const options = {
//       key: "rzp_test_YourRazorpayKeyHere", // 👉 Replace with your Razorpay key
//       amount: currentService.price * 100,
//       currency: "INR",
//       name: "AuditFiling Services",
//       description: `Payment for ${currentService.name}`,
//       image: "https://auditfiling.com/logo.png", // optional
//       handler: function (response) {
//         alert(`✅ Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);
//       },
//       prefill: {
//         name: "John Doe",
//         email: "john@example.com",
//         contact: "9999999999",
//       },
//       theme: {
//         color: "#2563eb",
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   // ✅ Load Razorpay script if not already loaded
//   useEffect(() => {
//     window.scrollTo(0, 0);
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4 py-10">
//       <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-100">
//         {/* Heading */}
//         <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
//           {currentService.name}
//         </h2>
//         <p className="text-gray-500 text-center mb-6">
//           Please upload or keep ready the following documents:
//         </p>

//         {/* Document List */}
//         <ul className="space-y-3 mb-6">
//           {[
//             "Copy of PAN Card",
//             "Copy of Aadhaar Card",
//             "Previous Year IT Return (if any)",
//           ].map((doc, index) => (
//             <li
//               key={index}
//               className="flex items-center gap-2 text-gray-700 font-medium"
//             >
//               <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
//               {doc}
//             </li>
//           ))}
//         </ul>

//         {/* Price Section */}
//         <div className="flex justify-between items-center mb-6">
//           <span className="text-lg font-semibold text-gray-700">Price</span>
//           <span className="text-xl font-bold text-blue-600">
//             ₹{currentService.price}
//           </span>
//         </div>

//         {/* Proceed to Pay Button */}
//         <button
//           onClick={handlePayment}
//           className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
//         >
//           Proceed to Pay
//         </button>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function DocumentPay() {
  const { service } = useParams();

  const [userType, setUserType] = useState(""); // Individual | Business | Both
  const [companyRegistered, setCompanyRegistered] = useState(false);
  const [companyName, setCompanyName] = useState("");

  const serviceData = {
    "salary-individual": { name: "Salary Individual", price: 1000 },
    professional: { name: "Professional", price: 1000 },
    employee: { name: "Employee", price: 1000 },
    huf: { name: "HUF", price: 1000 },
  };

  const currentService = serviceData[service];

  if (!currentService) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg font-semibold">
          Invalid service selected.
        </p>
      </div>
    );
  }

  // ✅ Razorpay Payment Handler
  const handlePayment = async () => {
    const options = {
      key: "rzp_test_YourRazorpayKeyHere",
      amount: currentService.price * 100,
      currency: "INR",
      name: "AuditFiling Services",
      description: `Payment for ${currentService.name}`,
      image: "https://auditfiling.com/logo.png",
      handler: function (response) {
        alert(
          `✅ Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`
        );
      },
      prefill: { name: "John Doe", email: "john@example.com", contact: "9999999999" },
      theme: { color: "#2563eb" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ✅ Load Razorpay script
  useEffect(() => {
    window.scrollTo(0, 0);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className=" bg-gray-50 mt-30 px-4 py-10 flex justify-center items-start">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-5xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT SIDE - Documents & Form */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {currentService.name}
          </h2>

          <p className="text-gray-500 mb-4">
            Please upload or keep ready the following documents:
          </p>

          <ul className="space-y-3 mb-6">
            {[
              "Copy of PAN Card",
              "Copy of Aadhaar Card",
              "Previous Year IT Return (if any)",
            ].map((doc, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-gray-700 font-medium"
              >
                <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                {doc}
              </li>
            ))}
          </ul>

          
          {/* Price Section */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold text-gray-700">Price</span>
            <span className="text-xl font-bold text-blue-600">
              ₹{currentService.price}
            </span>
          </div>

          {/* User Type Dropdown */}
          <div className="mb-6">
            <label
              htmlFor="userType"
              className="block text-gray-700 font-medium mb-2"
            >
              Select Type
            </label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option value="">-- Choose Service --</option>
              <option value="Individual">Individual</option>
              <option value="Business">Business</option>
              <option value="Both">Both</option>
            </select>
          </div>


          {/* Proceed Button (only if Individual) */}
          {userType === "Individual" && (
            <button
              onClick={handlePayment}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Proceed to Pay
            </button>
          )}
        </div>

        {/* RIGHT SIDE - Company Section */}
        {userType === "Business" || userType === "Both" ? (
          <div className="border-l border-gray-200 pl-6">
            {companyRegistered ? (
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-700">
                  Registered Company
                </h3>
                <p className="text-gray-700 mt-2">
                  Company Name: <span className="font-semibold">{companyName}</span>
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (companyName.trim()) setCompanyRegistered(true);
                }}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Register Your Company
                </h3>

                <div className="mb-4">
                  <label
                    htmlFor="companyName"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter your company name"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Save Company
                </button>
              </form>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
