import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DocumentTextIcon,
  BuildingOfficeIcon,
  CurrencyRupeeIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const serviceData = state?.serviceData;
  const documents = state?.documents || [];
  const pricing = state?.pricing;
  const company = state?.company;
  const serviceType = state?.serviceType;

  // Redirect if accessed directly
  if (!serviceData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50">
        <h1 className="text-2xl font-semibold text-gray-800 mb-3">
          Missing Service Details
        </h1>
        <p className="text-gray-500 mb-6">
          It seems you accessed this page directly. Please go back and select a
          service first.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  const handlePayment = async () => {
    try {
      setProcessing(true);
      setError("");

      // TODO: Integrate real payment gateway API here
      await new Promise((resolve) => setTimeout(resolve, 2000));

      navigate("/payment-success", {
        state: {
          serviceData,
          pricing,
          company,
        },
      });
    } catch (err) {
      setError("Something went wrong during payment. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const formatPrice = (price) => {
    if (!price && price !== 0) return "0.00";
    return typeof price === "number"
      ? price.toFixed(2)
      : parseFloat(price).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Checkout - {serviceData.service_name}
            </h1>
            <p className="text-gray-600">
              Review your service details before making payment
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Details */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <DocumentTextIcon className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Service Details
                </h2>
              </div>
              <p className="text-gray-700">
                <strong>Service:</strong> {serviceData.service_name}
              </p>
              {serviceType && (
                <p className="text-gray-700">
                  <strong>Type:</strong> {serviceType}
                </p>
              )}
              {serviceData.description && (
                <p className="text-gray-600 mt-2">
                  {serviceData.description}
                </p>
              )}
            </div>

            {/* Company Info (for business type) */}
            {serviceType === "business" && company && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <BuildingOfficeIcon className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Company Details
                  </h2>
                </div>
                <p className="text-gray-700">
                  <strong>Name:</strong> {company.name}
                </p>
                <p className="text-gray-700">
                  <strong>Business Type:</strong> {company.business_type}
                </p>
                <p className="text-gray-700">
                  <strong>Registration:</strong> {company.registration_number}
                </p>
              </div>
            )}

            {/* Required Documents */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <DocumentTextIcon className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Required Documents
                </h2>
              </div>
              {documents.length > 0 ? (
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {documents.map((doc, index) => (
                    <li key={index}>
                      {doc.name}{" "}
                      {doc.mandatory && (
                        <span className="text-red-500 text-sm">(Required)</span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No documents required.</p>
              )}
            </div>
          </div>

          {/* Right: Pricing & Payment */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-32">
              <div className="flex items-center gap-3 mb-6">
                <CurrencyRupeeIcon className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Payment Summary
                </h2>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Service Charge</span>
                  <span>₹{formatPrice(pricing?.finalAmount)}</span>
                </div>
                <div className="flex justify-between text-gray-700 font-semibold border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span className="text-blue-600">
                    ₹{formatPrice(pricing?.finalAmount)}
                  </span>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
              )}

              <button
                onClick={handlePayment}
                disabled={processing}
                className={`w-full mt-6 py-4 px-6 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                  processing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
                }`}
              >
                {processing ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="w-5 h-5" />
                    Confirm & Pay ₹{formatPrice(pricing?.finalAmount)}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
