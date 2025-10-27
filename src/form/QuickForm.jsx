

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function QuickForm() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    service_id: "",
    message: "",
  });
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("https://auditfiling.com/api/v1/web/menu");

        // console.log("API Response:", response.data);

        if (response.data) {
          let servicesData = [];

          // Handle different possible response structures
          if (Array.isArray(response.data.data)) {
            servicesData = response.data.data;
          } else if (Array.isArray(response.data.menu)) {
            servicesData = response.data.menu;
          } else if (Array.isArray(response.data.services)) {
            servicesData = response.data.services;
          } else if (response.data.data && typeof response.data.data === 'object') {
            servicesData = Object.values(response.data.data);
          } else if (Array.isArray(response.data)) {
            servicesData = response.data;
          } else {
            // Try to find any array in the response
            for (let key in response.data) {
              if (Array.isArray(response.data[key])) {
                servicesData = response.data[key];
                break;
              }
            }
          }


          // Extract only the main category names with their IDs
          const menuCategories = servicesData.map(item => ({
            id: item.id,
            name: item.name
          }));

          setServices(menuCategories);
        } else {
          setError("Failed to load services");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to load services. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate mobile number
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(formData.mobile)) {
      alert("⚠️ Please enter a valid 10-digit mobile number");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("⚠️ Please enter a valid email address");
      return;
    }

    // Validate service selection
    if (!formData.service_id) {
      alert("⚠️ Please select a service");
      return;
    }

    try {
      const response = await axios.post(
        "https://auditfiling.com/api/v1/user/contact_us/store",
        formData
      );

      if (response.data.success) {
        alert("✅ Your request has been submitted successfully!");
        setFormData({
          name: "",
          mobile: "",
          email: "",
          service_id: "",
          message: ""
        });
      } else {
        const errorMessages = response.data.errors
          ? Object.values(response.data.errors).flat().join(', ')
          : response.data.message || "Something went wrong. Please try again.";
        alert(`❌ ${errorMessages}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response && error.response.data) {
        const errorMessages = error.response.data.errors
          ? Object.values(error.response.data.errors).flat().join(', ')
          : error.response.data.message || "Failed to submit.";
        alert(`❌ ${errorMessages}`);
      } else {
        alert("⚠️ Failed to submit. Please check your network or try again later.");
      }
    }
  };

  return (
    <aside className="w-full max-w-sm bg-white rounded-xl shadow-sm p-2 h-auto lg:sticky top-28 flex flex-col justify-between space-y-4 mx-auto">
      <div>
        <h3 className="text-xl font-serif font-bold mb-2 text-center text-gray-800">
          Get <span className="font-bold text-blue-500">Free</span> Consultation
        </h3>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-1 py-1 rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition-colors"
          />

          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
            maxLength="10"
            className="w-full border border-gray-300 px-1 py-1  rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition-colors"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-1 py-1  rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition-colors"
          />

          {/* Services Dropdown - Showing only main category names */}
          <select
            name="service_id"
            value={formData.service_id}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-1 py-1  rounded-md focus:ring-2 focus:ring-blue-400 outline-none bg-white transition-colors"
          >
            <option value="">Select Service Category</option>
            {loading ? (
              <option disabled>Loading services...</option>
            ) : error ? (
              <option disabled>Failed to load services</option>
            ) : services.length > 0 ? (
              services.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))
            ) : (
              <option disabled>No services available</option>
            )}
          </select>

          <textarea
            name="message"
            placeholder="Your Message (Optional)"
            value={formData.message}
            onChange={handleChange}
            rows="2"
            className="w-full border border-gray-300 px-1 py-1  rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition-colors resize-none"
          />

          <button
            type="submit"
            className="mt-1 w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </aside>
  );
}