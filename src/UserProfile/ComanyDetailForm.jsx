import React from "react";

export default function ComanyDetailForm() {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 mt-30 mb-10">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Add Company
      </h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Company Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Company Name</label>
          <input
            type="text"
            placeholder="Enter Company Name"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email ID</label>
          <input
            type="email"
            placeholder="Enter Company Email Address"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Mobile No.</label>
          <input
            type="text"
            placeholder="Enter Mobile Number"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Landline */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Landline No.</label>
          <input
            type="text"
            placeholder="Enter Landline Number"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Registration Number */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Registration Number</label>
          <input
            type="text"
            placeholder="Enter Registration Number"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Company Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Company Type</label>
          <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none bg-white">
            <option value="">Select</option>
            <option>Pvt. Ltd.</option>
            <option>LLP</option>
            <option>OPC</option>
            <option>Partnership</option>
            <option>Proprietorship</option>
          </select>
        </div>

        {/* Sector */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Sector</label>
          <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none bg-white">
            <option value="">Select</option>
            <option>IT & Software</option>
            <option>Finance</option>
            <option>Manufacturing</option>
            <option>Education</option>
            <option>Healthcare</option>
          </select>
        </div>

        {/* Establish Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Establish Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Website</label>
          <input
            type="text"
            placeholder="Enter Website URL"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* GST No */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">GST No</label>
          <input
            type="text"
            placeholder="Enter GST Number"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* PAN No */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">PAN No</label>
          <input
            type="text"
            placeholder="Enter PAN Number"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Address 1 */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Address 1</label>
          <input
            type="text"
            placeholder="Enter Address..."
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Address 2 */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Address 2</label>
          <input
            type="text"
            placeholder="Enter Address..."
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Country</label>
          <input
            type="text"
            value="India"
            readOnly
            className="w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100 text-gray-600"
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">State</label>
          <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none bg-white">
            <option>Select</option>
            <option>Odisha</option>
            <option>Maharashtra</option>
            <option>Delhi</option>
            <option>Karnataka</option>
            <option>Tamil Nadu</option>
          </select>
        </div>

        {/* District */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">District</label>
          <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none bg-white">
            <option>Select</option>
            <option>Bhubaneswar</option>
            <option>Mumbai</option>
            <option>Bangalore</option>
            <option>Chennai</option>
            <option>Delhi</option>
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">City</label>
          <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none bg-white">
            <option>Select</option>
            <option>Cuttack</option>
            <option>Pune</option>
            <option>Chennai</option>
            <option>Delhi</option>
          </select>
        </div>

        {/* Pin Code */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Pin Code</label>
          <input
            type="text"
            placeholder="Enter Your Pincode"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Logo</label>
          <input type="file" className="w-full text-sm text-gray-700" />
        </div>

        {/* Parent Company */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Parent Company</label>
          <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none bg-white">
            <option>Select</option>
            <option>Audit Filing Pvt. Ltd.</option>
            <option>CloudSat Solutions</option>
            <option>TaxEase LLP</option>
          </select>
        </div>

        {/* Parent Company Name */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Parent Company Name</label>
          <input
            type="text"
            placeholder="Enter Your Parent Company Name"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition-all"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
