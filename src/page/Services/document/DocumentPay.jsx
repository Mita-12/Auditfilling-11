import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import {
  BuildingOfficeIcon,
  DocumentTextIcon,
  CurrencyRupeeIcon,
  PlusIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';

const DocumentsPay = () => {
  const [serviceData, setServiceData] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [pricing, setPricing] = useState(null);
  const [error, setError] = useState('');
  const [documents, setDocuments] = useState([]);
  const [serviceIds, setServiceIds] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const { serviceName } = useParams();

  // ✅ Fetch all services and their IDs
  useEffect(() => {
    async function fetchServiceIds() {
      try {
        const res = await fetch("https://auditfiling.com/api/v1/web/menu");
        const data = await res.json();

        const menus = Array.isArray(data) ? data : data.menus || [];

        const allServices = menus.flatMap((menu) =>
          menu.services ? menu.services.map((srv) => srv) : []
        );

        setServiceIds(allServices);
      } catch (err) {
        console.error("Error fetching service IDs:", err);
      }
    }

    fetchServiceIds();
  }, []);

  // ✅ Fetch service details by ID

  const fetchServiceById = async (serviceId) => {
    console.log(serviceId);
    
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await fetch(`https://auditfiling.com/api/v1/service/${serviceId}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        }
      });
      if (response.ok) {
        const serviceDetails = await response.json();

        const apiDocuments = serviceDetails.required_documents?.map(doc => ({
          name: doc.document_name,
          mandatory: doc.status === 1,
          id: doc.id
        })) || [];
        console.log(serviceDetails);

        return {
          serviceDetails,
          documents: apiDocuments
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching service by ID:', error);
      return null;
    }
  };

  // ✅ Initialize page with service details
  useEffect(() => {
    const initializePage = async () => {
      try {
        setLoading(true);

        if (location.state?.serviceData) {
          const service = location.state.serviceData;
          setServiceData(service);
          setPricing({ finalAmount: service.price || 1000 });

          const serviceWithDocs = await fetchServiceById(service.id);
          if (serviceWithDocs && serviceWithDocs.documents.length > 0) {
            setDocuments(serviceWithDocs.documents);
          }
        } else {
          const safeServiceName = serviceName ? serviceName.toLowerCase() : "";

          const foundService = serviceIds.find((srv) => {
            const content = srv?.service_content?.toLowerCase?.() || "";
            const nameSlug = srv?.service_name
              ? srv.service_name.toLowerCase().replace(/\s+/g, "-")
              : "";

            return content === safeServiceName || nameSlug === safeServiceName;
          });


          if (!foundService) {
            setError('Service not found');
            return;
          }

          setServiceData(foundService);
          setPricing({ finalAmount: foundService.service_price || 1000 });

          const serviceWithDocs = await fetchServiceById(foundService.id);
          if (serviceWithDocs && serviceWithDocs.documents.length > 0) {
            setDocuments(serviceWithDocs.documents);
          }
        }

        const currentServiceType = location.state?.serviceType || location.state?.serviceData?.type;
        if (currentServiceType === 'business') {
          setCompanies([]);
        }
      } catch (error) {
        console.error('Error initializing page:', error);
        setError('Failed to load service details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    initializePage();
  }, [location.state, serviceName, serviceIds]);

  // ✅ Helper Functions
  const handleCompanySelect = (companyId) => setSelectedCompany(companyId);

  const handleProceedWithService = () => {
    if (!serviceData) return;

    if (serviceData.type === 'business' && !selectedCompany) {
      setError('Please select a company to proceed');
      return;
    }

    const selectedCompanyData = companies.find(c => c.id === selectedCompany);

    navigate(`/service/${serviceData.service_content}/checkout`, {
      state: {
        serviceData,
        serviceType: serviceData.type,
        company: selectedCompanyData,
        pricing,
        documents
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

  // ✅ UI Rendering
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-600 text-lg">Loading service details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <p className="text-red-500 text-lg mb-3">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-30 ">
      <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <DocumentTextIcon className="w-6 h-6 text-blue-600" />
        {serviceData?.service_name || 'Loading...'}
      </h1>

      <div className="space-y-6">
        {/* Documents */}
        <div className="bg-white rounded-2xl shadow p-5">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <CheckBadgeIcon className="w-5 h-5 text-green-600" />
            Required Documents
          </h2>

          {documents.length > 0 ? (
            <ul className="list-disc pl-6 space-y-2">
              {documents.map((doc) => (
                <li key={doc.id} className="text-gray-700">
                  {doc.name} {doc.mandatory && <span className="text-red-500">*</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No documents listed for this service.</p>
          )}
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-2xl shadow p-5">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <CurrencyRupeeIcon className="w-5 h-5 text-blue-600" />
            Pricing
          </h2>
          <p className="text-xl font-bold text-gray-800">
            ₹{formatPrice(pricing?.finalAmount)} /-
          </p>
        </div>

        {/* Company Selection (if applicable) */}
        {serviceData?.type === 'business' && (
          <div className="bg-white rounded-2xl shadow p-5">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <BuildingOfficeIcon className="w-5 h-5 text-indigo-600" />
              Select Company
            </h2>

            {companies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {companies.map((company) => (
                  <div
                    key={company.id}
                    onClick={() => handleCompanySelect(company.id)}
                    className={`border rounded-xl p-4 cursor-pointer transition ${selectedCompany === company.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-400'
                      }`}
                  >
                    <h3 className="font-medium text-gray-800">{company.name}</h3>
                    <p className="text-sm text-gray-500">{company.type}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mb-3">No companies added yet.</p>
            )}

            <button
              onClick={handleAddCompany}
              className="mt-3 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <PlusIcon className="w-4 h-4" />
              Add New Company
            </button>
          </div>
        )}

        {/* Proceed Button */}
        <div className="text-right">
          <button
            onClick={handleProceedWithService}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPay;
