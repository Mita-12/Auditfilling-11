import React, { useState, useEffect } from "react";
import axios from "axios";

export default function QuickForm() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        service: "",
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

                console.log("📦 Full API Response:", response);
                console.log("📊 Response Data:", response.data);
                console.log("🔍 Response Structure:", JSON.stringify(response.data, null, 2));

                if (response.data) {
                    let servicesData = [];

                    // Check if the response has success property
                    const isSuccess = response.data.success === true || response.data.success === "true" || response.data.status === "success";

                    if (isSuccess) {
                        // Handle different possible response structures for successful response
                        if (Array.isArray(response.data.data)) {
                            servicesData = response.data.data;
                            console.log("✅ Data found in response.data.data array");
                        } else if (Array.isArray(response.data.menu)) {
                            servicesData = response.data.menu;
                            console.log("✅ Data found in response.data.menu array");
                        } else if (Array.isArray(response.data.services)) {
                            servicesData = response.data.services;
                            console.log("✅ Data found in response.data.services array");
                        } else if (response.data.data && typeof response.data.data === 'object') {
                            servicesData = Object.values(response.data.data);
                            console.log("✅ Data found as object, converted to array");
                        } else if (Array.isArray(response.data)) {
                            servicesData = response.data;
                            console.log("✅ Data is direct array response");
                        } else {
                            console.warn("⚠️ No array data found in successful response. Available keys:", Object.keys(response.data));
                            // Try to find any array in the response
                            for (let key in response.data) {
                                if (Array.isArray(response.data[key])) {
                                    servicesData = response.data[key];
                                    console.log(`✅ Data found in response.data.${key} array`);
                                    break;
                                }
                            }
                        }
                    } else {
                        // If no success flag, try to extract data directly
                        console.log("ℹ️ No success flag found, trying to extract data directly");
                        if (Array.isArray(response.data)) {
                            servicesData = response.data;
                            console.log("✅ Data is direct array response (no success flag)");
                        } else {
                            // Try to find any array in the response
                            for (let key in response.data) {
                                if (Array.isArray(response.data[key])) {
                                    servicesData = response.data[key];
                                    console.log(`✅ Data found in response.data.${key} array (no success flag)`);
                                    break;
                                }
                            }
                        }
                    }

                    console.log("📋 Raw services data:", servicesData);

                    if (servicesData.length > 0) {
                        // Extract category names from the nested structure
                        const categoryNames = servicesData
                            .map(item => {
                                // Handle different possible property names for the category name
                                const categoryName = item.name || item.menu_name || item.category || item.title || item.label;
                                console.log(`🔍 Processing item:`, item, `-> Extracted name:`, categoryName);
                                return categoryName;
                            })
                            .filter(name => name && typeof name === 'string'); // Filter out null/undefined and ensure it's a string

                        console.log("🎯 Final category names:", categoryNames);

                        if (categoryNames.length > 0) {
                            setServices(categoryNames);
                            console.log(`✅ Loaded ${categoryNames.length} services`);
                        } else {
                            setError("No valid category names found in the response");
                            console.warn("❌ No valid category names found");
                        }
                    } else {
                        setError("No services data found in the response");
                        console.warn("❌ No services data found");
                    }
                } else {
                    setError("Invalid API response");
                    console.warn("❌ Invalid API response - no data");
                }
            } catch (error) {
                console.error("❌ Error fetching services:", error);
                let errorMessage = "Failed to load services";

                if (error.response) {
                    console.error("Response status:", error.response.status);
                    console.error("Response data:", error.response.data);
                    if (error.response.status === 404) {
                        errorMessage = "Services not found (404)";
                    } else if (error.response.status === 500) {
                        errorMessage = "Server error (500)";
                    } else if (error.response.data?.message) {
                        errorMessage = error.response.data.message;
                    }
                } else if (error.request) {
                    console.error("No response received:", error.request);
                    errorMessage = "Network error - no response from server";
                }

                setError(errorMessage);
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
                    message: ""
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

                <form className="space-y-3" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition-colors"
                    />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition-colors"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition-colors"
                    />

                    {/* Services Dropdown */}
                    <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none bg-white transition-colors"
                    >
                        <option value="">Select Service</option>
                        {loading ? (
                            <option disabled>Loading services...</option>
                        ) : error ? (
                            <option disabled>{error}</option>
                        ) : services.length > 0 ? (
                            services.map((serviceName, index) => (
                                <option key={index} value={serviceName}>
                                    {serviceName}
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
                        rows="3"
                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition-colors resize-none"
                    />

                    <button
                        type="submit"
                        className="mt-1 w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Submit"}
                    </button>
                </form>

                {/* Debug Information */}
                {error && !loading && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-800">
                            <strong>Error:</strong> {error}
                        </p>
                        <p className="text-xs text-red-600 mt-1">
                            Check browser console (F12) for detailed information.
                        </p>
                    </div>
                )}
            </div>
        </aside>
    );
}