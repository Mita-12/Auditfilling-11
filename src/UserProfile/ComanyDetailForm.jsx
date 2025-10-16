import React from "react";

export default function CompanyDetailForm() {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-4 mt-30 mb-5 border border-gray-100">
      {/* Header Section */}
      <div className="text-center ">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Add Company</h1>
        <p className="text-gray-600">Fill in the details below to register your company</p>
      </div>

      <form className="space-y-6">
        {/* Basic Information Section */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-1 flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Company Name</label>
              <input
                type="text"
                placeholder="Enter Company Name"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email ID</label>
              <input
                type="email"
                placeholder="Enter Company Email Address"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Mobile No.</label>
              <input
                type="text"
                placeholder="Enter Mobile Number"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white"
              />
            </div>

            {/* Landline */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Landline No.</label>
              <input
                type="text"
                placeholder="Enter Landline Number"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Company Details Section */}
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-1 flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Company Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Registration Number */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Registration Number</label>
              <input
                type="text"
                placeholder="Enter Registration Number"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white"
              />
            </div>

            {/* Company Type */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Company Type</label>
              <select className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white">
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
              <label className="block text-gray-700 font-semibold mb-1">Sector</label>
              <select className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white">
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
              <label className="block text-gray-700 font-semibold mb-1">Establish Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Website</label>
              <input
                type="text"
                placeholder="Enter Website URL"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white"
              />
            </div>

            {/* GST No */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">GST No</label>
              <input
                type="text"
                placeholder="Enter GST Number"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white"
              />
            </div>

            {/* PAN No */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">PAN No</label>
              <input
                type="text"
                placeholder="Enter PAN Number"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-1 flex items-center">
            <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Address Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Address 1 */}
            <div className="">
              <label className="block text-gray-700 font-semibold mb-1">Address 1</label>
              <input
                type="text"
                placeholder="Enter Address..."
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white"
              />
            </div>

            {/* Address 2 */}
            <div className="">
              <label className="block text-gray-700 font-semibold mb-1">Address 2</label>
              <input
                type="text"
                placeholder="Enter Address..."
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Country</label>
              <input
                type="text"
                value="India"
                readOnly
                className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-gray-100 text-gray-600 font-medium"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">State</label>
              <select className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white">
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
              <label className="block text-gray-700 font-semibold mb-1">District</label>
              <select className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white">
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
              <label className="block text-gray-700 font-semibold mb-1">City</label>
              <select className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white">
                <option>Select</option>
                <option>Cuttack</option>
                <option>Pune</option>
                <option>Chennai</option>
                <option>Delhi</option>
              </select>
            </div>

            {/* Pin Code */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Pin Code</label>
              <input
                type="text"
                placeholder="Enter Your Pincode"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
            <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Additional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo Upload */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Logo</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors duration-200 cursor-pointer bg-white">
                <svg className="w-8 h-8 text-gray-400 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span className="text-gray-600 text-sm">Click to upload logo</span>
                <input type="file" className="hidden" />
              </div>
            </div>

            {/* Parent Company */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Parent Company</label>
              <select className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white">
                <option>Select</option>
                <option>Audit Filing Pvt. Ltd.</option>
                <option>CloudSat Solutions</option>
                <option>TaxEase LLP</option>
              </select>
            </div>

            {/* Parent Company Name */}
            <div className="">
              <label className="block text-gray-700 font-semibold mb-1">Parent Company Name</label>
              <input
                type="text"
                placeholder="Enter Your Parent Company Name"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl min-w-40"
          >
            Submit Company Details
          </button>
        </div>
      </form>
    </div>
  );
}