

// import React, { useState, useEffect } from 'react';
// import { useLocation, useParams, useNavigate } from 'react-router-dom';
// import {
//   BuildingOfficeIcon,
//   DocumentTextIcon,
//   CurrencyRupeeIcon,
//   PlusIcon,
//   CheckBadgeIcon,
//   ChevronRightIcon,
//   ClockIcon
// } from '@heroicons/react/24/outline';

// const ProceedTo = () => {
//   const [serviceData, setServiceData] = useState(null);
//   const [documents, setDocuments] = useState([]);
//   const [pricing, setPricing] = useState(null);
//   const [companies, setCompanies] = useState([]);
//   const [selectedCompany, setSelectedCompany] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const [paymentType, setPaymentType] = useState('full');
//   const [partialPercent, setPartialPercent] = useState(10);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const { serviceName } = useParams();
//   const [allowCustomAmount, setAllowCustomAmount] = useState(false);

//   // Your token and user info
//   const user = JSON.parse(localStorage.getItem('user'));
//   const userId = user?.id;
//   const userToken = user?.token;

//   const fetchServiceDetails = async (serviceId) => {
//     try {
//       setLoading(true);
//       const response = await fetch(`https://auditfiling.com/api/v1/service/${serviceId}`, {
//         headers: {
//           'Authorization': `Bearer ${userToken}`,
//         },
//       });

//       if (!response.ok) throw new Error(`API error: ${response.status}`);

//       const data = await response.json();
//       const service = data.services?.find(s => s.id === parseInt(serviceId)) || data;
//       setServiceData(service);

//       console.log(serviceData);

//       const apiDocuments = data.required_documents?.map(doc => ({
//         name: doc.document_name,
//         mandatory: doc.status === 1,
//         id: doc.id
//       })) || [];
//       setDocuments(apiDocuments);

//       setPricing({ finalAmount: service.service_price || service.price || 1000 });
//       setAllowCustomAmount(!service.service_price || parseFloat(service.service_price) <= 0.01);


//       console.log("Service Price:", service.service_price, "Allow Custom Amount:", !service.service_price || parseFloat(service.service_price) <= 0.01);


//       if (service.type?.toLowerCase() === 'business' || service.type?.toLowerCase() === 'both') {
//         await fetchUserCompanies();
//       }
//     } catch (err) {
//       console.error("Error fetching service:", err);
//       setError("Failed to load service details. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUserCompanies = async () => {
//     try {
//       const res = await fetch(`https://auditfiling.com/public/api/v1/user/all_companies/${userId}`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${userToken}`,
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         }
//       });

//       if (res.ok) {
//         const data = await res.json();
//         let companiesArray = [];

//         if (data.companies && Array.isArray(data.companies)) {
//           companiesArray = data.companies;
//         } else if (data.data && Array.isArray(data.data)) {
//           companiesArray = data.data;
//         } else if (Array.isArray(data)) {
//           companiesArray = data;
//         } else if (data && typeof data === 'object') {
//           companiesArray = [data];
//         }

//         const formattedCompanies = companiesArray.map((company, index) => ({
//           id: company.id || company.company_id || index,
//           company_id: company.company_id || company.id,
//           name: company.name || company.company_name || `Company ${index + 1}`,
//           type: company.type || company.business_type || 'Business'
//         }));

//         setCompanies(formattedCompanies);
//         console.log("Formatted Companies:", formattedCompanies);

//       } else {
//         const errorText = await res.text();
//         console.error("Companies API error response:", errorText);
//         setError("Failed to load companies. Please try again.");
//       }
//     } catch (e) {
//       console.error("Error fetching companies:", e);
//       setError("Network error while loading companies.");
//     }
//   };

//   const testCompaniesAPI = async () => {
//     try {
//       const testRes = await fetch(`https://auditfiling.com/public/api/v1/user/all_companies/${userId}`);
//       const testData = await testRes.json();
//       console.log("Test API response:", testData);
//     } catch (error) {
//       console.error("Test API error:", error);
//     }
//   };

//   useEffect(() => {
//     const init = async () => {
//       const id =
//         location?.state?.serviceData?.id ||
//         new URLSearchParams(location.search).get("serviceId");

//       if (!id) {
//         setError("Service ID not found.");
//         return;
//       }

//       await testCompaniesAPI();
//       await fetchServiceDetails(id);
//     };

//     init();
//   }, [location.state]);

//   const handleProceedWithService = () => {
//     if (!serviceData) return;

//     if (
//       (serviceData.type === 'business' || serviceData.type === 'both') &&
//       !selectedCompany
//     ) {
//       setError('Please select a company to proceed');
//       return;
//     }

//     const selectedCompanyData = companies.find(c => c.id === parseInt(selectedCompany));

//     // ✅ FIX: Ensure valid company_id for backend
//     if (selectedCompanyData && (!selectedCompanyData.id || isNaN(selectedCompanyData.id))) {
//       selectedCompanyData.id = selectedCompanyData.company_id;
//     }

//     const total = pricing?.finalAmount || 0;
//     const payableAmount =
//       paymentType === 'partial' ? (total * partialPercent) / 100 : total;

//     navigate(`/service/${serviceData.service_name}/proceed-to-payment`, {
//       state: {
//         serviceData,
//         serviceType: serviceData.type,
//         company: selectedCompanyData,
//         pricing,
//         documents,
//         paymentType,
//         partialPercent,
//         payableAmount
//       }
//     });
//   };

//   const handleAddCompany = () => {
//     navigate('/company-detailform', {
//       state: {
//         redirectBack: `/documents/${serviceName}`,
//         serviceData
//       }
//     });
//   };

//   const formatPrice = (price) => {
//     if (!price && price !== 0) return '0.00';
//     // FIX: Use Math.round() to enforce precise two-decimal rounding
//     return (Math.round(parseFloat(price) * 100) / 100).toFixed(2);
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col justify-center items-center h-96 space-y-4">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         <p className="text-gray-600 text-lg">Loading service details...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
//         <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
//           <ClockIcon className="w-8 h-8 text-red-600" />
//         </div>
//         <p className="text-red-500 text-lg font-medium">{error}</p>
//         <button
//           onClick={() => navigate('/')}
//           className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
//         >
//           Go Back Home
//         </button>
//       </div>
//     );
//   }

//   const totalAmount = pricing?.finalAmount || 0;
//   //  const parseAmount=totalAmount.parseFloat(service.service_price) 
//   console.log(totalAmount);

//   const baseAmount = pricing?.customAmount || totalAmount;

//   // ✅ Initialize with a default value
//   let payable = 0;

//   if (totalAmount === 0.01) {
//     const amount = baseAmount / totalAmount;
//     console.log("Amount:", amount);

//     const finalPrice = baseAmount - amount;
//     console.log("Final Price:", finalPrice);

//     payable =
//       paymentType === "partial"
//         ? (finalPrice * partialPercent) / 100
//         : finalPrice;
//   } else {
//     payable =
//       paymentType === "partial"
//         ? (totalAmount * partialPercent) / 100
//         : totalAmount;
//   }

//   // ✅ You can keep this for display if needed
//   const payableAmount = payable;



//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8 mt-30">
//       <div className="text-center mb-12">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
//           <div className="p-2 bg-blue-100 rounded-lg">
//             <DocumentTextIcon className="w-8 h-8 text-blue-600" />
//           </div>
//           {serviceData?.service_name || 'Loading...'}
//         </h1>
//         <p className="text-gray-600">Complete your service registration</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Left Column */}
//         <div className="space-y-8">
//           {/* Documents Section */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <CheckBadgeIcon className="w-4 h-4 text-green-600" />
//               </div>
//               <h1 className="text-xl font-semibold text-gray-900">Required Documents</h1>
//             </div>

//             {documents.length > 0 ? (
//               <div className="grid gap-3">
//                 {documents.map((doc) => (
//                   <div key={doc.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors ">
//                     <div className={`w-2 h-2 rounded-lg ${doc.mandatory ? 'bg-red-500' : 'bg-blue-500'}`}></div>
//                     <span className="text-gray-700 flex-1">{doc.name}</span>
//                     {doc.mandatory && (
//                       <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full font-medium">
//                         Required
//                       </span>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <DocumentTextIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                 <p className="text-gray-500 text-lg">No documents listed for this service.</p>
//               </div>
//             )}
//           </div>

//           {/* Company Dropdown */}
//           {(serviceData?.type?.toLowerCase() === 'business' ||
//             serviceData?.type?.toLowerCase() === 'both') && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-200">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="p-2 bg-indigo-100 rounded-lg">
//                     <BuildingOfficeIcon className="w-4 h-4 text-indigo-600" />
//                   </div>
//                   <h1 className="text-xl font-semibold text-gray-900">
//                     Select Company
//                     <span className="text-sm text-gray-500 ml-2">({companies.length} found)</span>
//                   </h1>
//                 </div>

//                 {companies.length > 0 ? (
//                   <div className="space-y-4">
//                     <select
//                       value={selectedCompany}
//                       onChange={(e) => setSelectedCompany(e.target.value)}
//                       className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                     >
//                       <option value="">Select a company</option>
//                       {companies.map((company) => (
//                         <option key={company.id} value={company.id}>
//                           {company.name} ({company.type})
//                         </option>
//                       ))}
//                     </select>
//                     <div className="flex gap-3">
//                       <button
//                         onClick={fetchUserCompanies}
//                         className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
//                       >
//                         Refresh
//                       </button>
//                       <button
//                         onClick={handleAddCompany}
//                         className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
//                       >
//                         <PlusIcon className="w-5 h-5" />
//                         Add New Company
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-center py-6 mb-6 bg-gray-50 rounded-lg">
//                     <BuildingOfficeIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                     <p className="text-gray-500 mb-4">No companies found. Please add a company to proceed.</p>
//                     <button
//                       onClick={testCompaniesAPI}
//                       className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
//                     >
//                       Test API Connection
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//         </div>

//         {/* Right Column */}
//         <div className="space-y-8">
//           {/* Pricing Section */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <CurrencyRupeeIcon className="w-4 h-4 text-blue-600" />
//               </div>
//               <h1 className="text-xl font-semibold text-gray-900">Pricing Details</h1>
//             </div>

//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 mb-4">
//               <div className="text-center">
//                 <p className="text-gray-600 mb-2">Total Service Amount</p>
//                 <p className="text-4xl font-bold text-gray-900">
//                   ₹{formatPrice(totalAmount)}
//                 </p>
//               </div>
//             </div>

//             {allowCustomAmount && (
//               <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Enter Total Amount (₹)
//                 </label>
//                 <input
//                   type="number"
//                   min="1"
//                   name="enteredAmount"
//                   step="0.01"
//                   placeholder="Enter total amount"
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                   value={pricing?.customAmount || ""}
//                   onChange={(e) => {
//                     const enteredAmount = parseFloat(e.target.value) || 0;
//                     setPricing((prev) => ({
//                       ...prev,
//                       customAmount: enteredAmount,
//                       finalAmount: enteredAmount * 0.0001,
//                     }));
//                   }}
//                 />
//               </div>
//             )}


//             {/* Show normal payment options only if amount > 0.01 */}
//             {totalAmount > 0.01 && totalAmount > 1000 && (
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-3">
//                     Payment Option
//                   </label>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                     <button
//                       onClick={() => setPaymentType('full')}
//                       className={`p-2 rounded-lg border-1 transition-all duration-200 ${paymentType === 'full'
//                         ? 'border-blue-500 bg-blue-50 shadow-md'
//                         : 'border-gray-200 bg-white hover:border-blue-300'
//                         }`}
//                     >
//                       <div className="text-left">
//                         <div className="font-semibold text-gray-900">Full Payment</div>
//                       </div>
//                     </button>
//                     <button
//                       onClick={() => setPaymentType('partial')}
//                       className={`p-2 rounded-lg border-1 transition-all duration-200 ${paymentType === 'partial'
//                         ? 'border-blue-500 bg-blue-50 shadow-md'
//                         : 'border-gray-200 bg-white hover:border-blue-300'
//                         }`}
//                     >
//                       <div className="text-left">
//                         <div className="font-semibold text-gray-900">Partial Payment</div>
//                       </div>
//                     </button>
//                   </div>
//                 </div>

//                 {paymentType === 'partial' && (
//                   <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Select Payment Percentage
//                     </label>
//                     <select
//                       value={partialPercent}
//                       onChange={(e) => setPartialPercent(parseInt(e.target.value))}
//                       className="w-full max-w-xs border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                     >
//                       <option value={30}>30% - ₹{formatPrice(totalAmount * 0.3)}</option>
//                       <option value={50}>50% - ₹{formatPrice(totalAmount * 0.5)}</option>
//                       <option value={80}>80% - ₹{formatPrice(totalAmount * 0.8)}</option>
//                     </select>
//                   </div>
//                 )}

//                 <div className="bg-green-50 border border-green-200 rounded-xl p-4">
//                   <div className="flex justify-between items-center">
//                     <span className="text-lg font-semibold text-gray-900">Payable Amount:</span>
//                     <span className="text-2xl font-bold text-green-700">
//                       ₹{formatPrice(totalAmount === 0.01 ? payable : payableAmount)}
//                     </span>
//                   </div>
//                 </div>

//               </div>
//             )}

//             {/* 👇 Show payable for custom amount (when 0.01) */}
//             {totalAmount <= 0.01 && pricing?.customAmount > 0 && (
//               <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
//                 <div className="flex justify-between items-center">
//                   <span className="text-lg font-semibold text-gray-900">Payable Amount:</span>
//                   <span className="text-2xl font-bold text-green-700">
//                     ₹{formatPrice(payableAmount)}                  </span>
//                 </div>
//               </div>
//             )}
//           </div>


//           {/* Proceed Button */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
//             <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//               <div className="text-center sm:text-left">
//                 <p className="text-lg font-semibold text-gray-900">
//                   ₹{formatPrice(payableAmount)}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   {totalAmount <= 1000
//                     ? 'Complete payment'
//                     : paymentType === 'partial'
//                       ? `${partialPercent}% advance payment`
//                       : 'Full payment'}
//                 </p>
//               </div>
//               <button
//                 onClick={handleProceedWithService}
//                 disabled={(serviceData?.type?.toLowerCase() === 'business' ||
//                   serviceData?.type?.toLowerCase() === 'both') &&
//                   !selectedCompany}
//                 className={`flex items-center justify-center gap-2 px-8 py-4 rounded-lg transition-all duration-200 transform font-semibold text-lg shadow-lg ${(serviceData?.type?.toLowerCase() === 'business' ||
//                   serviceData?.type?.toLowerCase() === 'both') &&
//                   !selectedCompany
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105 text-white hover:shadow-xl'
//                   }`}
//               >
//                 Proceed
//                 <ChevronRightIcon className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProceedTo;


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
import axios from 'axios';

const ProceedTo = () => {
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
  const [allowCustomAmount, setAllowCustomAmount] = useState(false);

  // Your token and user info
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;
  const userToken = user?.token;

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

      console.log(serviceData);

      const apiDocuments = data.required_documents?.map(doc => ({
        name: doc.document_name,
        mandatory: doc.status === 1,
        id: doc.id
      })) || [];
      setDocuments(apiDocuments);

      setPricing({ finalAmount: service.service_price || service.price || 1000 });
      setAllowCustomAmount(!service.service_price || parseFloat(service.service_price) <= 0.01);


      console.log("Service Price:", service.service_price, "Allow Custom Amount:", !service.service_price || parseFloat(service.service_price) <= 0.01);


      if (service.type?.toLowerCase() === 'business' || service.type?.toLowerCase() === 'both') {
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
      const res = await fetch(`https://auditfiling.com/public/api/v1/user/all_companies/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (res.ok) {
        const data = await res.json();
        let companiesArray = [];

        if (data.companies && Array.isArray(data.companies)) {
          companiesArray = data.companies;
        } else if (data.data && Array.isArray(data.data)) {
          companiesArray = data.data;
        } else if (Array.isArray(data)) {
          companiesArray = data;
        } else if (data && typeof data === 'object') {
          companiesArray = [data];
        }

        const formattedCompanies = companiesArray.map((company, index) => ({
          id: company.id || company.company_id || index,
          company_id: company.company_id || company.id,
          name: company.name || company.company_name || `Company ${index + 1}`,
          type: company.type || company.business_type || 'Business'
        }));

        setCompanies(formattedCompanies);
        console.log("Formatted Companies:", formattedCompanies);

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

  const testCompaniesAPI = async () => {
    try {
      const testRes = await fetch(`https://auditfiling.com/public/api/v1/user/all_companies/${userId}`);
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

      await testCompaniesAPI();
      await fetchServiceDetails(id);
    };

    init();
  }, [location.state]);

  const handleProceedWithService = () => {
    if (!serviceData) return;

    if (
      (serviceData.type === 'business' || serviceData.type === 'both') &&
      !selectedCompany
    ) {
      setError('Please select a company to proceed');
      return;
    }

    const selectedCompanyData = companies.find(c => c.id === parseInt(selectedCompany));

    // ✅ FIX: Ensure valid company_id for backend
    if (selectedCompanyData && (!selectedCompanyData.id || isNaN(selectedCompanyData.id))) {
      selectedCompanyData.id = selectedCompanyData.company_id;
    }

    const total = pricing?.finalAmount || 0;
    const payableAmount =
      paymentType === 'partial' ? (total * partialPercent) / 100 : total;

    navigate(`/service/${serviceData.service_name}/proceed-to-payment`, {
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
    // FIX: Use Math.round() to enforce precise two-decimal rounding
    return (Math.round(parseFloat(price) * 100) / 100).toFixed(2);
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
  //  const parseAmount=totalAmount.parseFloat(service.service_price) 
  console.log(totalAmount);

  const baseAmount = pricing?.customAmount || totalAmount;

  // ✅ Initialize with a default value
  let payable = 0;

  if (totalAmount === 0.01) {
    const amount = baseAmount / totalAmount;
    console.log("Amount:", amount);

    const finalPrice = baseAmount - amount;
    console.log("Final Price:", finalPrice);

    payable =
      paymentType === "partial"
        ? (finalPrice * partialPercent) / 100
        : finalPrice;
  } else {
    payable =
      paymentType === "partial"
        ? (totalAmount * partialPercent) / 100
        : totalAmount;
  }

  // ✅ You can keep this for display if needed
  const payableAmount = payable;



  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-30">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <DocumentTextIcon className="w-8 h-8 text-blue-600" />
          </div>
          {serviceData?.service_name || 'Loading...'}
        </h1>
        <p className="text-gray-600">Complete your service registration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Documents Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckBadgeIcon className="w-4 h-4 text-green-600" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Required Documents</h1>
            </div>

            {documents.length > 0 ? (
              <div className="grid gap-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors ">
                    <div className={`w-2 h-2 rounded-lg ${doc.mandatory ? 'bg-red-500' : 'bg-blue-500'}`}></div>
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

          {/* Company Dropdown */}
          {(serviceData?.type?.toLowerCase() === 'business' ||
            serviceData?.type?.toLowerCase() === 'both') && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <BuildingOfficeIcon className="w-4 h-4 text-indigo-600" />
                  </div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Select Company
                    <span className="text-sm text-gray-500 ml-2">({companies.length} found)</span>
                  </h1>
                </div>

                {companies.length > 0 ? (
                  <div className="space-y-4">
                    <select
                      value={selectedCompany}
                      onChange={(e) => setSelectedCompany(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="">Select a company</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name} ({company.type})
                        </option>
                      ))}
                    </select>
                    <div className="flex gap-3">
                      <button
                        onClick={fetchUserCompanies}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                      >
                        Refresh
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
                ) : (
                  <div className="text-center py-6 mb-6 bg-gray-50 rounded-lg">
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
              </div>
            )}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Coupon Code Section */}
<div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200">
  <div className="flex items-center gap-3 mb-4">
    <div className="p-2 bg-purple-100 rounded-lg">
      <CheckBadgeIcon className="w-4 h-4 text-purple-600" />
    </div>
    <h1 className="text-xl font-semibold text-gray-900">Apply Coupon Code</h1>
  </div>

  <div className="flex flex-col sm:flex-row gap-3">
    <input
      type="text"
      placeholder="Enter coupon code"
      value={pricing?.couponCode || ''}
      onChange={(e) =>
        setPricing((prev) => ({
          ...prev,
          couponCode: e.target.value.toUpperCase(),
        }))
      }
      className="flex-1 border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
    />
    <button
      onClick={async () => {
        if (!pricing?.couponCode) {
          setError('Please enter a coupon code');
          return;
        }
        setError('');
        setLoading(true);
        try {
          const response = await axios.post(
            `https://auditfiling.com/api/v1/coupons/check`,
             {coupon_code:pricing.couponCode },
            {
              headers: {
                
                Authorization: `Bearer ${userToken}`,


              },
            }
          );
          const data = response.data;
          console.log('Coupon Response:', data);

          if (data.valid || data.success) {
            const discountPercent =
              parseFloat(data.data.discount_percent) || 0;
            const discountedAmount =
              (pricing.finalAmount * (100 - discountPercent)) / 100;

            setPricing((prev) => ({
              ...prev,
              finalAmount: discountedAmount,
              discountPercent,
            }));
            alert(`Coupon applied successfully! ${discountPercent}% off.`);
          } else {
            alert('Invalid or expired coupon code.');
          }
        } catch (err) {
          console.error('Coupon validation error:', err);
          alert('Error validating coupon. Try again.');
        } finally {
          setLoading(false);
        }
      }}
      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
    >
      Apply
    </button>
  </div>

  {pricing?.discountPercent > 0 && (
    <p className="mt-3 text-green-700 text-sm font-medium">
      ✅ Coupon applied: {pricing.discountPercent}% discount
    </p>
  )}
</div>

          {/* Pricing Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CurrencyRupeeIcon className="w-4 h-4 text-blue-600" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Pricing Details</h1>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 mb-4">
              <div className="text-center">
                <p className="text-gray-600 mb-2">Total Service Amount</p>
                <p className="text-4xl font-bold text-gray-900">
                  ₹{formatPrice(totalAmount)}
                </p>
              </div>
            </div>

            {allowCustomAmount && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Total Amount (₹)
                </label>
                <input
                  type="number"
                  min="1"
                  name="enteredAmount"
                  step="0.01"
                  placeholder="Enter total amount"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={pricing?.customAmount || ""}
                  onChange={(e) => {
                    const enteredAmount = parseFloat(e.target.value) || 0;
                    setPricing((prev) => ({
                      ...prev,
                      customAmount: enteredAmount,
                      finalAmount: enteredAmount * 0.0001,
                    }));
                  }}
                />
              </div>
            )}


            {/* Show normal payment options only if amount > 0.01 */}
            {totalAmount > 0.01 && totalAmount > 1000 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Payment Option
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaymentType('full')}
                      className={`p-2 rounded-lg border-1 transition-all duration-200 ${paymentType === 'full'
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                        }`}
                    >
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">Full Payment</div>
                      </div>
                    </button>
                    <button
                      onClick={() => setPaymentType('partial')}
                      className={`p-2 rounded-lg border-1 transition-all duration-200 ${paymentType === 'partial'
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                        }`}
                    >
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">Partial Payment</div>
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
                      <option value={30}>30% - ₹{formatPrice(totalAmount * 0.3)}</option>
                      <option value={50}>50% - ₹{formatPrice(totalAmount * 0.5)}</option>
                      <option value={80}>80% - ₹{formatPrice(totalAmount * 0.8)}</option>
                    </select>
                  </div>
                )}

                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Payable Amount:</span>
                    <span className="text-2xl font-bold text-green-700">
                      ₹{formatPrice(totalAmount === 0.01 ? payable : payableAmount)}
                    </span>
                  </div>
                </div>

              </div>
            )}

            {/* 👇 Show payable for custom amount (when 0.01) */}
            {totalAmount <= 0.01 && pricing?.customAmount > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Payable Amount:</span>
                  <span className="text-2xl font-bold text-green-700">
                    ₹{formatPrice(payableAmount)}                  </span>
                </div>
              </div>
            )}
          </div>


          {/* Proceed Button */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
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
                disabled={(serviceData?.type?.toLowerCase() === 'business' ||
                  serviceData?.type?.toLowerCase() === 'both') &&
                  !selectedCompany}
                className={`flex items-center justify-center gap-2 px-8 py-4 rounded-lg transition-all duration-200 transform font-semibold text-lg shadow-lg ${(serviceData?.type?.toLowerCase() === 'business' ||
                  serviceData?.type?.toLowerCase() === 'both') &&
                  !selectedCompany
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105 text-white hover:shadow-xl'
                  }`}
              >
                Proceed
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProceedTo;
