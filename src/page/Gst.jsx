import React from "react";
import Header from "../component/Header";
import { FaFileAlt, FaWpforms } from "react-icons/fa";
import WhatsAppPopup from "../component/WhatsAppPopup";

export default function Gst() {
  const sidebarItems = [
    "Proprietor New Registration",
"Proprietor GST Filing",
"Company GST Registration",
"Company GST Filing",
"GST Annual Filing",
"GST Notice Compliance",
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <Header />

      {/* Sidebar */}
      <aside className="w-64 bg-white rounded-lg shadow-md p-6 h-screen ml-5 fixed top-0 left-0 mt-28">
        {/* add mt-16 so sidebar doesn’t overlap Header */}
        <h3 className="text-xl font-semibold mb-4 text-center">Services</h3>
        <ul className="space-y-3 text-center">
          {sidebarItems.map((item, index) => (
            <li
              key={index}
              className="p-3 bg-blue-50 rounded hover:bg-blue-100 cursor-pointer transition"
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content (pushed right) */}
      <main className="ml-70 px-6 py-8 mt-20">
        {/* Top 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Image Card */}
          <div
            className="bg-white rounded-lg shadow-md h-75 bg-cover bg-center hover:shadow-lg transition"
            style={{ backgroundImage: "url('/img/Blog 6.png')" }}
          ></div>

          {/* Document Card */}
          <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <FaFileAlt className="text-blue-600 text-xl" />
              <h3 className="text-lg font-semibold">ITR Documents</h3>
            </div>

            {/* Content */}
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li>Copy of PAN Card</li>
              <li>Copy of Aadhaar Card</li>
              <li>Previous Year IT Return (if any)</li>
              <li>
                Price <b className="text-blue-700">₹ 3000/-</b>
              </li>
            </ul>

            {/* Button */}
            <button className="mt-auto block mx-auto w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Proceed
            </button>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-md p-3 hover:shadow-lg flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <FaWpforms className="text-blue-900 text-xl" />
              <h3 className="text-lg font-semibold">Quick Form</h3>
            </div>

            {/* Form */}
            <form className="space-y-3 flex flex-col flex-1">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                placeholder="Your Message"
                rows="3"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="mt-auto block mx-auto w-1/2 bg-gray-700 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>
          </div>

        </div>

        {/* Large Card */}
        <div className="bg-white rounded-lg shadow-md p-6 h-full">
          <h1 className="text-2xl font-semibold mb-4 text-center">
            What We Offer
          </h1>
          <p className="text-gray-700 mb-4">
            We provide top-notch services tailored to your business needs.
            Explore our offerings below to find the perfect solution for your
            project.
          </p>
          <p className="text-gray-700">
            Our team of experts ensures high-quality work, timely delivery,
            and ongoing support.
          </p>
        </div>
      </main>

      {/* WhatsApp Popup */}
      <WhatsAppPopup />
    </div>
  );
}