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
import React from "react";

export default function QuickForm() {
  return (
    <aside className="w-full max-w-sm bg-white rounded-xl shadow-md p-6 h-auto lg:sticky top-28 flex flex-col justify-between space-y-6 mx-auto">
      <div>
        <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">
          Get <span className="font-bold text-blue-500">Free</span> Consultancy
        </h3>

        <form className="space-y-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Phone */}
          <input
            type="text"
            placeholder="Phone No."
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email ID"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Services Dropdown */}
          <select
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none bg-white"
            defaultValue=""
          >
            <option value="" disabled>
              Select Service
            </option>
            <option value="gst">GST Services</option>
            <option value="income-tax">Income Tax</option>
            <option value="startup">Startup Registration</option>
            <option value="mca">MCA Compliance</option>
            <option value="legal">Legal </option>
            <option value="tds">Trade Mark</option>
            <option value="others">Other Services</option>
          </select>

          {/* Message */}
          <textarea
            placeholder="Your Message..."
            rows="3"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none resize-none"
          ></textarea>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </aside>
  );
}
