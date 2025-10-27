import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProceedToPay() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("https://auditfiling.com/api/v1/web/menu");
        if (!response.ok) throw new Error("Failed to fetch services");

        const data = await response.json();
      

        // Find Income Tax category and set its services
        const incomeTaxCategory = data.find((cat) => cat.name === "Income Tax" && "Gst" &&"Legal" );
        if (incomeTaxCategory && incomeTaxCategory.services) {
          setServices(incomeTaxCategory.services);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleProceed = () => {
  if (!selectedService) return;

  // Find selected service object
  const serviceObj = services.find((s) => s.id === parseInt(selectedService));
  if (serviceObj) {
    // Convert service name to URL-friendly format
    const routeName = serviceObj.service_name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[()]/g, ""); // e.g., "Salaried Individual" -> "salaried-individual"

    // Redirect to document upload page
    navigate(`/documents/${routeName}`);
  }
};


  return (
    <div className="flex justify-center items-center px-3 py-5">
      <div className="bg-white shadow-sm rounded-2xl p-4 w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-1">
          Proceed to Payment
        </h2>
        <p className="text-gray-500 text-center text-sm mb-6">
          Choose your Income Tax service to continue with payment
        </p>

        <div className="mb-6">
          <label htmlFor="service" className="block text-gray-700 font-medium mb-2">
            Select Service
          </label>
          <select
            id="service"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          >
            <option value="">-- Choose a service --</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.service_name}
              </option>
            ))}
          </select>
        </div>

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
