import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import {
  BuildingOfficeIcon,
  DocumentTextIcon,
  CurrencyRupeeIcon,
  PlusIcon,
  CheckBadgeIcon,
  ChevronRightIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const DocumentsPay = () => {
  const [serviceData, setServiceData] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [pricing, setPricing] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [paymentType, setPaymentType] = useState('full');
  const [partialPercent, setPartialPercent] = useState(10);

  const location = useLocation();
  const navigate = useNavigate();
  const { serviceName } = useParams();

  // Your token and user info
  const userToken = "308|RJVM1XClvnWr0Enjb3OjTCYgJLm0Q56m07pVZVWK8aca4fd5";
  const userId = 105;

  const fetchServiceDetails = async (serviceId) => {
    try {
      setLoading(true);
      const response = await fetch(`https://auditfiling.com/api/v1/service/${serviceId}`, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      const service = data.services?.find(s => s.id === parseInt(serviceId)) || data;
      setServiceData(service);

      const apiDocuments = data.required_documents?.map(doc => ({
        name: doc.document_name,
        mandatory: doc.status === 1,
        id: doc.id
      })) || [];
      setDocuments(apiDocuments);

      setPricing({ finalAmount: service.service_price || service.price || 1000 });

      if (service.type?.toLowerCase() === 'business') {
        await fetchUserCompanies();
      }
    } catch (err) {
      console.error("Error fetching service:", err);
      setError("Failed to load service details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserCompanies = async () => {
    try {
      console.log("Fetching companies for user ID:", userId);
      console.log("Using token:", userToken);

      const res = await fetch(`https://auditfiling.com/public/api/v1/user/all_companies/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log("Companies API response status:", res.status);

      if (res.ok) {
        const data = await res.json();
        console.log("Companies API response data:", data);

        // Handle different response formats
        let companiesArray = [];

        if (data.companies && Array.isArray(data.companies)) {
          companiesArray = data.companies;
        } else if (data.data && Array.isArray(data.data)) {
          companiesArray = data.data;
        } else if (Array.isArray(data)) {
          companiesArray = data;
        } else if (data && typeof data === 'object') {
          // If it's a single company object, wrap it in an array
          companiesArray = [data];
        }

        console.log("Extracted companies array:", companiesArray);

        // Transform companies to ensure consistent structure
        const formattedCompanies = companiesArray.map((company, index) => ({
          id: company.id || company.company_id || index,
          name: company.name || company.company_name || `Company ${index + 1}`,
          type: company.type || company.business_type || 'Business'
        }));

        setCompanies(formattedCompanies);

      } else {
        const errorText = await res.text();
        console.error("Companies API error response:", errorText);
        setError("Failed to load companies. Please try again.");
      }
    } catch (e) {
      console.error("Error fetching companies:", e);
      setError("Network error while loading companies.");
    }
  };

  // Test API call without authentication to check the endpoint
  const testCompaniesAPI = async () => {
    try {
      console.log("Testing companies API endpoint...");
      const testRes = await fetch(`https://auditfiling.com/public/api/v1/user/all_companies/${userId}`);
      console.log("Test API status:", testRes.status);
      const testData = await testRes.json();
      console.log("Test API response:", testData);
    } catch (error) {
      console.error("Test API error:", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      const id =
        location?.state?.serviceData?.id ||
        new URLSearchParams(location.search).get("serviceId");

      if (!id) {
        setError("Service ID not found.");
        return;
      }

      // Test the companies API first
      await testCompaniesAPI();

      await fetchServiceDetails(id);
    };

    init();
  }, [location.state]);

  const handleProceedWithService = () => {
    if (!serviceData) return;

    if (serviceData.type === 'business' && !selectedCompany) {
      setError('Please select a company to proceed');
      return;
    }

    const selectedCompanyData = companies.find(c => c.id === selectedCompany);
    const total = pricing?.finalAmount || 0;
    const payableAmount =
      paymentType === 'partial' ? (total * partialPercent) / 100 : total;

    navigate(`/service/${serviceData.service_content}/checkout`, {
      state: {
        serviceData,
        serviceType: serviceData.type,
        company: selectedCompanyData,
        pricing,
        documents,
        paymentType,
        partialPercent,
        payableAmount
      }
    });
  };

  const handleAddCompany = () => {
    navigate('/company-detailform', {
      state: {
        redirectBack: `/documents/${serviceName}`,
        serviceData
      }
    });
  };

  const formatPrice = (price) => {
    if (!price && price !== 0) return '0.00';
    return typeof price === 'number' ? price.toFixed(2) : parseFloat(price).toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-gray-600 text-lg">Loading service details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <ClockIcon className="w-8 h-8 text-red-600" />
        </div>
        <p className="text-red-500 text-lg font-medium">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  const totalAmount = pricing?.finalAmount || 0;
  const payableAmount =
    paymentType === 'partial' ? (totalAmount * partialPercent) / 100 : totalAmount;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <DocumentTextIcon className="w-8 h-8 text-blue-600" />
          </div>
          {serviceData?.service_name || 'Loading...'}
        </h1>
        <p className="text-gray-600">Complete your service registration</p>

        {/* Debug Info - Remove in production */}
        <div className="mt-4 p-2 bg-yellow-100 rounded text-xs">
          <p>User ID: {userId} | Companies loaded: {companies.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Documents Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckBadgeIcon className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Required Documents</h2>
            </div>

            {documents.length > 0 ? (
              <div className="grid gap-3">
                {documents.map((doc, index) => (
                  <div key={doc.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150">
                    <div className={`w-2 h-2 rounded-full ${doc.mandatory ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                    <span className="text-gray-700 flex-1">{doc.name}</span>
                    {doc.mandatory && (
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full font-medium">
                        Required
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <DocumentTextIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-lg">No documents listed for this service.</p>
              </div>
            )}
          </div>

          {/* Company Selection */}
          {serviceData?.type?.toLowerCase() === 'business' && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <BuildingOfficeIcon className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Select Company
                  <span className="text-sm text-gray-500 ml-2">({companies.length} found)</span>
                </h2>
              </div>

              {companies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {companies.map((company) => (
                    <div
                      key={company.id}
                      onClick={() => setSelectedCompany(company.id)}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${selectedCompany === company.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                        }`}
                    >
                      <h3 className="font-semibold text-gray-900 mb-1">{company.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{company.type}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 mb-6 bg-gray-50 rounded-xl">
                  <BuildingOfficeIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-4">No companies found. Please add a company to proceed.</p>
                  <button
                    onClick={testCompaniesAPI}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
                  >
                    Test API Connection
                  </button>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={fetchUserCompanies}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                >
                  Refresh Companies
                </button>
                <button
                  onClick={handleAddCompany}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
                >
                  <PlusIcon className="w-5 h-5" />
                  Add New Company
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Pricing Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CurrencyRupeeIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Pricing Details</h2>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
              <div className="text-center">
                <p className="text-gray-600 mb-2">Total Service Amount</p>
                <p className="text-4xl font-bold text-gray-900">
                  ₹{formatPrice(totalAmount)}
                </p>
              </div>
            </div>

            {totalAmount > 1000 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Payment Option</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaymentType('full')}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${paymentType === 'full'
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                        }`}
                    >
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">Full Payment</div>
                        <div className="text-sm text-gray-600 mt-1">Pay the complete amount</div>
                      </div>
                    </button>
                    <button
                      onClick={() => setPaymentType('partial')}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${paymentType === 'partial'
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                        }`}
                    >
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">Partial Payment</div>
                        <div className="text-sm text-gray-600 mt-1">Pay a percentage now</div>
                      </div>
                    </button>
                  </div>
                </div>

                {paymentType === 'partial' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Payment Percentage
                    </label>
                    <select
                      value={partialPercent}
                      onChange={(e) => setPartialPercent(parseInt(e.target.value))}
                      className="w-full max-w-xs border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value={10}>10% - ₹{formatPrice(totalAmount * 0.1)}</option>
                      <option value={30}>30% - ₹{formatPrice(totalAmount * 0.3)}</option>
                      <option value={80}>80% - ₹{formatPrice(totalAmount * 0.8)}</option>
                    </select>
                  </div>
                )}

                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Payable Amount:</span>
                    <span className="text-2xl font-bold text-green-700">
                      ₹{formatPrice(payableAmount)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Proceed Button */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                <p className="text-lg font-semibold text-gray-900">
                  ₹{formatPrice(payableAmount)}
                </p>
                <p className="text-sm text-gray-600">
                  {totalAmount <= 1000
                    ? 'Complete payment'
                    : paymentType === 'partial'
                      ? `${partialPercent}% advance payment`
                      : 'Full payment'}
                </p>
              </div>
              <button
                onClick={handleProceedWithService}
                disabled={serviceData?.type?.toLowerCase() === 'business' && !selectedCompany}
                className={`flex items-center justify-center gap-2 px-8 py-4 rounded-lg transition-all duration-200 transform font-semibold text-lg shadow-lg ${serviceData?.type?.toLowerCase() === 'business' && !selectedCompany
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105 text-white hover:shadow-xl'
                  }`}
              >
                Proceed to Checkout
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 text-center font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentsPay;