// import React from "react";

// export default function QuickForm() {
//   return (
//     <aside className="w-65  bg-white rounded-lg p-6 h-[45vh]  lg:sticky top-28  flex flex-col justify-between space-y-6">
//       <div>
//         <h3 className="text-xl mb-4 text-center">
//         Get <span className="font-bold text-blue-500">Free</span> Consultance 
//         </h3>
//         <form className="space-y-3">
//           <input
//             type="text"
//             placeholder="Name"
//             className="w-full border px-1 py-1 rounded focus:ring-2 focus:ring-blue-400 outline-none"
//           />
//           <input
//             type="text"
//             placeholder="Phone No"
//             className="w-full border px-1 py-1 rounded focus:ring-2 focus:ring-blue-400 outline-none"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full border px-1 py-1 rounded focus:ring-2 focus:ring-blue-400 outline-none"
//           />
//           <button className="mt-2 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition-all mx-auto block">
//             Submit
//           </button>
//         </form>
//       </div>
//     </aside>
//   );
// }
import React, { useState } from "react";
import axios from "axios";

export default function QuickForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message:"",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://auditfiling.com/api/v1/user/contact_us/store",
        formData
      );

      if (response.status === 200) {
        alert("✅ Your request has been submitted successfully!");
        setFormData({
          name: "",
          phone: "",
          email: "",
          service: "",
          message:""

        });
      } else {
        alert("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("⚠️ Failed to submit. Please check your network or try again later.");
    }
  };

  return (
    <aside className="w-full max-w-sm bg-white rounded-xl shadow-sm p-2 h-auto lg:sticky top-28 flex flex-col justify-between space-y-4 mx-auto">
      <div>
        <h3 className="text-xl font-serif font-bold mb-2 text-center text-gray-800">
          Get <span className="font-bold text-blue-500">Free</span> Consultation
        </h3>

        {/* ✅ Only logic changed — JSX remains the same */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-1 py-1 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="text"
            name="phone"
            placeholder="phone no"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 px-1 py-1 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="email id"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-1 py-1 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <select
            name="service"
            value={formData.service_id}
            onChange={handleChange}
            className="w-full border border-gray-300 px-1 py-1 rounded-md focus:ring-2 focus:ring-blue-400 outline-none bg-white"
            defaultValue=""
          >
            {/* <option value="" disabled>
              Select Service
            </option>
            <option value="gst">GST Services</option>
            <option value="income-tax">Income Tax</option>
            <option value="startup">Startup Registration</option>
            <option value="mca">MCA Compliance</option>
            <option value="legal">Legal</option>
            <option value="tds">Trade Mark</option>
            <option value="others">Other Services</option> */}
          </select>

          <button
            type="submit"
            className="mt-1 w-full bg-blue-600 text-white py-1 rounded-md font-medium hover:bg-blue-700 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </aside>
  );
}

