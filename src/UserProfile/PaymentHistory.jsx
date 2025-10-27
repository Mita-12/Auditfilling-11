// import React, { useState, useMemo, useEffect, useCallback } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// // Payment service for API calls
// const paymentService = {
//   fetchPaymentHistory: async (identifier, token) => {
//     const response = await axios.post(
//       "https://auditfiling.com/api/v1/user/payment/history",
//       { user_id: identifier },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//       }
//     );
//     return response.data;
//   }
// };

// // Utility functions
// const getUserId = () => {
//   let userId = null;
//   let userEmail = localStorage.getItem("user_name");

//   const userData = localStorage.getItem("user");
//   if (userData) {
//     try {
//       const user = JSON.parse(userData);
//       userId = user?.id || user?.user_id || user?.userId;
//     } catch (e) {
//       console.error("Error parsing user data:", e);
//     }
//   }

//   return userId || userEmail;
// };

// const getToken = () => {
//   return localStorage.getItem("token") || localStorage.getItem("user_name");
// };

// const getStringValue = (value, defaultValue = "N/A") => {
//   if (typeof value === 'string') {
//     if (value.trim().startsWith('{') && value.trim().endsWith('}')) {
//       try {
//         const parsed = JSON.parse(value);
//         if (parsed && typeof parsed === 'object' && parsed.service_name) {
//           return parsed.service_name;
//         }
//         return JSON.stringify(parsed);
//       } catch {
//         return value;
//       }
//     }
//     return value;
//   }
//   if (typeof value === 'number') return value.toString();
//   if (value && typeof value === 'object') {
//     if (value.service_name) return value.service_name;
//     if (value.name) return value.name;
//     if (value.title) return value.title;
//     try {
//       return JSON.stringify(value);
//     } catch {
//       return defaultValue;
//     }
//   }
//   return defaultValue;
// };

// const formatPaymentData = (paymentData) => {
//   return paymentData.map((item, index) => {
//     let amountValue = 0;
//     let amountDisplay = "₹ 0.00";

//     if (item.amount) {
//       const amountNum = typeof item.amount === 'string' ? parseFloat(item.amount.replace(/[^0-9.-]+/g, "")) : item.amount;
//       amountValue = parseFloat(amountNum) || 0;
//       amountDisplay = `₹ ${amountValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
//     } else if (item.price) {
//       const priceNum = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.-]+/g, "")) : item.price;
//       amountValue = parseFloat(priceNum) || 0;
//       amountDisplay = `₹ ${amountValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
//     } else if (item.fee) {
//       const feeNum = typeof item.fee === 'string' ? parseFloat(item.fee.replace(/[^0-9.-]+/g, "")) : item.fee;
//       amountValue = parseFloat(feeNum) || 0;
//       amountDisplay = `₹ ${amountValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
//     }

//     return {
//       id: item.id || item.payment_id || item.order_id || item.request_id || `payment_${index}`,
//       slNo: index + 1,
//       requestId: getStringValue(item.order_id || item.request_id || item.reference_id || item.payment_reference, `REQ_${index + 1}`),
//       service: getStringValue(item.service_name || item.service_type || item.service || item.product_name || item.name, "Unknown Service"),
//       amount: amountDisplay,
//       amountValue: amountValue,
//       paymentStatus: getStringValue(item.payment_status || item.status || item.paymentStatus, "Pending"),
//       transactionId: getStringValue(item.transaction_id || item.txn_id || item.payment_id, "N/A"),
//       transactionDate: getStringValue(item.payment_date || item.created_at || item.transaction_date || item.date, new Date().toISOString().split('T')[0]),
//       invoiceUrl: item.invoice_url || item.invoice_link || item.file_path || item.document_url || item.receipt_url || null,
//       fileName: getStringValue(item.file_name || item.invoice_name, "invoice.pdf")
//     };
//   });
// };

// // Error Boundary Component
// class PaymentHistoryErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, error: null };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true, error };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error("Payment History Error:", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 mt-30 sm:p-6">
//           <div className="max-w-7xl mx-auto">
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
//               <div className="text-red-500 text-6xl mb-4">⚠️</div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h3>
//               <p className="text-gray-500 mb-4">We encountered an error while displaying payment history.</p>
//               <button
//                 onClick={() => this.setState({ hasError: false, error: null })}
//                 className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Try Again
//               </button>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// // Main Component
// function PaymentHistory() {
//   const [search, setSearch] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const [loading, setLoading] = useState(true);
//   const [paymentHistory, setPaymentHistory] = useState([]);
//   const [error, setError] = useState(null);
//   const [retryCount, setRetryCount] = useState(0);

//   const navigate = useNavigate();

//   // Fetch payment history from API
//   useEffect(() => {
//     const fetchPaymentHistory = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const identifier = getUserId();
//         const token = getToken();

//         if (!identifier) {
//           setError("User not authenticated. Please login again.");
//           setLoading(false);
//           return;
//         }

//         const data = await paymentService.fetchPaymentHistory(identifier, token);

//         if (data && data.success) {
//           let paymentData = [];

//           if (Array.isArray(data.data)) {
//             paymentData = data.data;
//           } else if (Array.isArray(data.payments)) {
//             paymentData = data.payments;
//           } else if (Array.isArray(data.history)) {
//             paymentData = data.history;
//           } else if (data.data && typeof data.data === 'object') {
//             paymentData = Object.values(data.data);
//           } else if (Array.isArray(data)) {
//             paymentData = data;
//           } else {
//             for (let key in data) {
//               if (Array.isArray(data[key])) {
//                 paymentData = data[key];
//                 break;
//               }
//             }
//           }

//           const formattedPayments = formatPaymentData(paymentData);
//           setPaymentHistory(formattedPayments);
//         } else {
//           const errorMsg = data?.message || "No payment history data found";
//           setError(errorMsg);
//           setPaymentHistory([]);
//         }

//       } catch (error) {
//         let errorMessage = "Failed to load payment history";

//         if (error.response) {
//           if (error.response.status === 401) {
//             errorMessage = "Authentication failed. Please login again.";
//           } else if (error.response.status === 404) {
//             errorMessage = "No payment history found for this user.";
//           } else if (error.response.status === 500) {
//             errorMessage = "Server error. Please try again later.";
//           } else if (error.response.data?.message) {
//             errorMessage = error.response.data.message;
//           } else if (error.response.data?.error) {
//             errorMessage = error.response.data.error;
//           }
//         } else if (error.request) {
//           errorMessage = "Network error. Please check your internet connection.";
//         } else {
//           errorMessage = error.message;
//         }

//         setError(errorMessage);
//         setPaymentHistory([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPaymentHistory();
//   }, [retryCount]);

//   // Get unique statuses from API data for filter dropdown
//   const uniqueStatuses = useMemo(() => {
//     if (!Array.isArray(paymentHistory)) return [];

//     const statuses = new Set();
//     paymentHistory.forEach(item => {
//       if (item.paymentStatus) {
//         statuses.add(item.paymentStatus);
//       }
//     });

//     return Array.from(statuses);
//   }, [paymentHistory]);

//   // Status configuration based on actual data
//   const getStatusConfig = (status) => {
//     const statusLower = status?.toLowerCase();

//     if (statusLower?.includes('success') || statusLower?.includes('completed')) {
//       return {
//         color: "bg-green-100 text-green-800 border-green-200",
//         icon: "✅"
//       };
//     } else if (statusLower?.includes('fail') || statusLower?.includes('reject')) {
//       return {
//         color: "bg-red-100 text-red-800 border-red-200",
//         icon: "❌"
//       };
//     } else if (statusLower?.includes('pending') || statusLower?.includes('processing')) {
//       return {
//         color: "bg-yellow-100 text-yellow-800 border-yellow-200",
//         icon: "⏳"
//       };
//     } else if (statusLower?.includes('refund')) {
//       return {
//         color: "bg-blue-100 text-blue-800 border-blue-200",
//         icon: "↩️"
//       };
//     } else {
//       return {
//         color: "bg-gray-100 text-gray-800 border-gray-200",
//         icon: "📝"
//       };
//     }
//   };

//   // Handle sorting
//   const handleSort = (key) => {
//     setSortConfig(current => ({
//       key,
//       direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
//     }));
//   };

//   // Filter and sort data
//   const filteredAndSortedData = useMemo(() => {
//     if (!Array.isArray(paymentHistory)) return [];

//     let filtered = paymentHistory.filter((item) => {
//       const matchesSearch =
//         item.requestId.toLowerCase().includes(search.toLowerCase()) ||
//         item.service.toLowerCase().includes(search.toLowerCase()) ||
//         item.transactionId.toLowerCase().includes(search.toLowerCase());

//       const matchesStatus = statusFilter === "all" || item.paymentStatus === statusFilter;

//       const matchesDate = !dateRange.startDate || !dateRange.endDate || 
//         (item.transactionDate >= dateRange.startDate && item.transactionDate <= dateRange.endDate);

//       return matchesSearch && matchesStatus && matchesDate;
//     });

//     // Apply sorting
//     if (sortConfig.key) {
//       filtered.sort((a, b) => {
//         let aVal = a[sortConfig.key];
//         let bVal = b[sortConfig.key];

//         // Handle numeric sorting for amountValue
//         if (sortConfig.key === 'amountValue') {
//           aVal = a.amountValue;
//           bVal = b.amountValue;
//         }

//         // Handle date sorting
//         if (sortConfig.key === 'transactionDate') {
//           aVal = new Date(aVal).getTime();
//           bVal = new Date(bVal).getTime();
//         }

//         if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
//         if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }

//     return filtered;
//   }, [search, statusFilter, paymentHistory, dateRange, sortConfig]);

//   // Calculate pagination
//   const totalPages = Math.ceil(filteredAndSortedData.length / entriesPerPage);
//   const startIndex = (currentPage - 1) * entriesPerPage;
//   const paginatedData = filteredAndSortedData.slice(startIndex, startIndex + entriesPerPage);

//   const handleExportCSV = (item) => {
//     // Export single row as CSV
//     const csvContent = [
//       ['Sl No', 'Request ID', 'Service', 'Amount', 'Status', 'Transaction ID', 'Date'],
//       [
//         item.slNo,
//         `"${item.requestId}"`,
//         `"${item.service}"`,
//         `"${item.amount}"`,
//         `"${item.paymentStatus}"`,
//         `"${item.transactionId}"`,
//         `"${item.transactionDate}"`
//       ]
//     ].map(row => row.join(',')).join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `payment-${item.requestId}-${new Date().toISOString().split('T')[0]}.csv`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     window.URL.revokeObjectURL(url);
//   };



//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleRetry = () => {
//     setRetryCount(prev => prev + 1);
//     setError(null);
//   };


//   const renderPaginationButtons = () => {
//     if (totalPages <= 1) return null;

//     const buttons = [];
//     const maxVisiblePages = 5;

//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     // Previous button
//     buttons.push(
//       <button
//         key="prev"
//         onClick={() => handlePageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
//       >
//         ← Previous
//       </button>
//     );

//     // First page
//     if (startPage > 1) {
//       buttons.push(
//         <button
//           key={1}
//           onClick={() => handlePageChange(1)}
//           className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//         >
//           1
//         </button>
//       );
//       if (startPage > 2) {
//         buttons.push(
//           <span key="ellipsis1" className="px-2 py-2">
//             ...
//           </span>
//         );
//       }
//     }

//     // Page numbers
//     for (let page = startPage; page <= endPage; page++) {
//       buttons.push(
//         <button
//           key={page}
//           onClick={() => handlePageChange(page)}
//           className={`px-4 py-2 border rounded-lg transition-colors ${
//             currentPage === page
//               ? "bg-blue-600 text-white border-blue-600"
//               : "border-gray-300 hover:bg-gray-50"
//           }`}
//         >
//           {page}
//         </button>
//       );
//     }

//     // Last page
//     if (endPage < totalPages) {
//       if (endPage < totalPages - 1) {
//         buttons.push(
//           <span key="ellipsis2" className="px-2 py-2">
//             ...
//           </span>
//         );
//       }
//       buttons.push(
//         <button
//           key={totalPages}
//           onClick={() => handlePageChange(totalPages)}
//           className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//         >
//           {totalPages}
//         </button>
//       );
//     }

//     // Next button
//     buttons.push(
//       <button
//         key="next"
//         onClick={() => handlePageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
//       >
//         Next →
//       </button>
//     );

//     return buttons;
//   };

//   // Format date for display
//   const formatDisplayDate = (dateString) => {
//     if (!dateString || dateString === "N/A") return "N/A";

//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) {
//         return dateString;
//       }
//       return date.toLocaleDateString('en-IN', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch (error) {
//       return dateString;
//     }
//   };

//   // const SortIcon = ({ columnKey }) => {
//   //   if (sortConfig.key !== columnKey) {
//   //     return <span className="ml-1">↕️</span>;
//   //   }
//   //   return sortConfig.direction === 'asc' ? 
//   //     <span className="ml-1">⬆️</span> : 
//   //     <span className="ml-1">⬇️</span>;
//   // };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 mt-30 sm:p-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading payment history...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 mt-30 sm:p-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
//             <div className="text-red-500 text-6xl mb-4">❌</div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Payment History</h3>
//             <p className="text-gray-500 mb-4">{error}</p>
//             <button
//               onClick={handleRetry}
//               className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <PaymentHistoryErrorBoundary>
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 mt-30 sm:p-6">
//         <div className="max-w-7xl mx-auto">
//           {/* Header Section */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-3">Payment History</h1>
//             <p className="text-gray-600">Track and manage all your payment transactions</p>
//           </div>

//           {/* Controls Section - Simplified without buttons */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
//             <div className="grid grid-cols-1  lg:grid-cols-4 gap-10">
//               {/* Search */}
//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Search:
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={search}
//                     onChange={(e) => {
//                       setSearch(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     placeholder="Search by Request ID, Service, or Transaction ID..."
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                   />
//                   <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                     🔍
//                   </div>
//                 </div>
//               </div> */}

//                <div className="flex items-center space-x-2">
//                 <span className="text-sm text-gray-600">Show</span>
//                 <select
//                   value={entriesPerPage}
//                   onChange={(e) => {
//                     setEntriesPerPage(Number(e.target.value));
//                     setCurrentPage(1);
//                   }}
//                   className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 >
//                   <option value={5}>5</option>
//                   <option value={10}>10</option>
//                   <option value={25}>25</option>
//                   <option value={50}>50</option>
//                 </select>
//               </div>
//             </div>

            
//           </div>

//           {/* Table Container */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//             {/* Table */}
//             <div className="overflow-x-auto">
//               <table className="min-w-full">
//                 <thead className="bg-gray-50 border-b border-gray-200">
//                   <tr>
//                     <th 
//                       className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
//                       onClick={() => handleSort('slNo')}
//                     >
//                       <div className="flex items-center">
//                         Sl No.
//                       </div>
//                     </th>
//                     <th 
//                       className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
//                       onClick={() => handleSort('requestId')}
//                     >
//                       <div className="flex items-center">
//                         Request ID
//                       </div>
//                     </th>
//                     <th 
//                       className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
//                       onClick={() => handleSort('service')}
//                     >
//                       <div className="flex items-center">
//                         Name of Service
//                       </div>
//                     </th>
//                     <th 
//                       className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
//                       onClick={() => handleSort('amountValue')}
//                     >
//                       <div className="flex items-center">
//                         Amount
//                       </div>
//                     </th>
//                     <th 
//                       className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
//                       onClick={() => handleSort('paymentStatus')}
//                     >
//                       <div className="flex items-center">
//                         Payment Status
//                       </div>
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Transaction ID
//                     </th>
//                     <th 
//                       className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
//                       onClick={() => handleSort('transactionDate')}
//                     >
//                       <div className="flex items-center">
//                         Transaction Date
//                       </div>
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {paginatedData.length > 0 ? (
//                     paginatedData.map((item, idx) => {
//                       const statusConfig = getStatusConfig(item.paymentStatus);
//                       return (
//                         <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
//                           <td className="px-6 py-4">
//                             <div className="text-sm font-semibold text-gray-700">
//                               {startIndex + idx + 1}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="text-sm font-mono text-blue-600 font-medium">
//                               {String(item.requestId || "N/A")}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="text-sm font-medium text-gray-900">
//                               {String(item.service || "N/A")}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="text-lg font-bold text-gray-900">
//                               {String(item.amount || "₹ 0.00")}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusConfig.color}`}>
//                               <span className="mr-2">{statusConfig.icon}</span>
//                               {String(item.paymentStatus || "Pending")}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="text-sm font-mono text-gray-700">
//                               {String(item.transactionId || "N/A")}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="text-sm text-gray-900">
//                               {formatDisplayDate(item.transactionDate)}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <button
//                               onClick={() => handleExportCSV(item)}
//                               className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
//                               title="Export this transaction as CSV"
//                             >
//                               <span className="mr-2">📥</span>
//                               Export CSV
//                             </button>
//                           </td>
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       <td colSpan="8" className="px-6 py-12 text-center">
//                         <div className="text-gray-400 text-6xl mb-4">💳</div>
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">
//                           {paymentHistory.length === 0 ? "No payment history found" : "No matching transactions found"}
//                         </h3>
//                         <p className="text-gray-500">
//                           {search || statusFilter !== "all" || dateRange.startDate || dateRange.endDate
//                             ? "Try adjusting your search or filter criteria"
//                             : "You haven't made any payments yet"
//                           }
//                         </p>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {filteredAndSortedData.length > 0 && (
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 border-t border-gray-200 gap-4">
//                 <div className="text-sm text-gray-600">
//                   Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredAndSortedData.length)} of{" "}
//                   {filteredAndSortedData.length} entries
//                   {sortConfig.key && (
//                     <span className="ml-2 text-blue-600">
//                       (Sorted by {sortConfig.key} {sortConfig.direction})
//                     </span>
//                   )}
//                 </div>
//                 <div className="flex flex-wrap gap-2 justify-center">
//                   {renderPaginationButtons()}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </PaymentHistoryErrorBoundary>
//   );
// }

// export default PaymentHistory;

import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";

// Payment service for API calls
const paymentService = {
  fetchPaymentHistory: async (identifier, token) => {
    const response = await axios.post(
      "https://auditfiling.com/api/v1/user/payment/history",
      { user_id: identifier },
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
      }
    );
    return response.data;
  }
};

// Utility functions
const getUserId = () => {
  let userId = null;
  let userEmail = localStorage.getItem("user_name");

  const userData = localStorage.getItem("user");
  if (userData) {
    try {
      const user = JSON.parse(userData);
      userId = user?.id || user?.user_id || user?.userId;
    } catch (e) {
      console.error("Error parsing user data:", e);
    }
  }

  return userId || userEmail;
};

const getToken = () => {
  return localStorage.getItem("token") || localStorage.getItem("user_name");
};

const getStringValue = (value, defaultValue = "N/A") => {
  if (typeof value === 'string') {
    if (value.trim().startsWith('{') && value.trim().endsWith('}')) {
      try {
        const parsed = JSON.parse(value);
        if (parsed && typeof parsed === 'object' && parsed.service_name) {
          return parsed.service_name;
        }
        return JSON.stringify(parsed);
      } catch {
        return value;
      }
    }
    return value;
  }
  if (typeof value === 'number') return value.toString();
  if (value && typeof value === 'object') {
    if (value.service_name) return value.service_name;
    if (value.name) return value.name;
    if (value.title) return value.title;
    try {
      return JSON.stringify(value);
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
};

const formatPaymentData = (paymentData) => {
  return paymentData.map((item, index) => {
    let amountValue = 0;
    let amountDisplay = "₹ 0.00";

    if (item.amount) {
      const amountNum = typeof item.amount === 'string' ? parseFloat(item.amount.replace(/[^0-9.-]+/g, "")) : item.amount;
      amountValue = parseFloat(amountNum) || 0;
      amountDisplay = `₹ ${amountValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else if (item.price) {
      const priceNum = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.-]+/g, "")) : item.price;
      amountValue = parseFloat(priceNum) || 0;
      amountDisplay = `₹ ${amountValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else if (item.fee) {
      const feeNum = typeof item.fee === 'string' ? parseFloat(item.fee.replace(/[^0-9.-]+/g, "")) : item.fee;
      amountValue = parseFloat(feeNum) || 0;
      amountDisplay = `₹ ${amountValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    return {
      id: item.id || item.payment_id || item.order_id || item.request_id || `payment_${index}`,
      slNo: index + 1,
      requestId: getStringValue(item.order_id || item.request_id || item.reference_id || item.payment_reference, `REQ_${index + 1}`),
      service: getStringValue(item.service_name || item.service_type || item.service || item.product_name || item.name, "Unknown Service"),
      amount: amountDisplay,
      amountValue: amountValue,
      paymentStatus: getStringValue(item.payment_status || item.status || item.paymentStatus, "Pending"),
      transactionId: getStringValue(item.transaction_id || item.txn_id || item.payment_id, "N/A"),
      transactionDate: getStringValue(item.payment_date || item.created_at || item.transaction_date || item.date, new Date().toISOString().split('T')[0]),
    };
  });
};

// Main Component
function PaymentHistory() {
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [loading, setLoading] = useState(true);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Fetch payment history from API
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        const identifier = getUserId();
        const token = getToken();

        if (!identifier) {
          setError("User not authenticated. Please login again.");
          setLoading(false);
          return;
        }

        const data = await paymentService.fetchPaymentHistory(identifier, token);

        if (data && data.success) {
          let paymentData = [];

          if (Array.isArray(data.data)) {
            paymentData = data.data;
          } else if (Array.isArray(data.payments)) {
            paymentData = data.payments;
          } else if (Array.isArray(data.history)) {
            paymentData = data.history;
          } else if (data.data && typeof data.data === 'object') {
            paymentData = Object.values(data.data);
          } else if (Array.isArray(data)) {
            paymentData = data;
          } else {
            for (let key in data) {
              if (Array.isArray(data[key])) {
                paymentData = data[key];
                break;
              }
            }
          }

          const formattedPayments = formatPaymentData(paymentData);
          setPaymentHistory(formattedPayments);
        } else {
          const errorMsg = data?.message || "No payment history data found";
          setError(errorMsg);
          setPaymentHistory([]);
        }

      } catch (error) {
        let errorMessage = "Failed to load payment history";

        if (error.response) {
          if (error.response.status === 401) {
            errorMessage = "Authentication failed. Please login again.";
          } else if (error.response.status === 404) {
            errorMessage = "No payment history found for this user.";
          } else if (error.response.status === 500) {
            errorMessage = "Server error. Please try again later.";
          } else if (error.response.data?.message) {
            errorMessage = error.response.data.message;
          }
        } else if (error.request) {
          errorMessage = "Network error. Please check your internet connection.";
        } else {
          errorMessage = error.message;
        }

        setError(errorMessage);
        setPaymentHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [retryCount]);

  // Status configuration based on actual data
  const getStatusConfig = (status) => {
    const statusLower = status?.toLowerCase();

    if (statusLower?.includes('success') || statusLower?.includes('completed')) {
      return {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: "✅"
      };
    } else if (statusLower?.includes('fail') || statusLower?.includes('reject')) {
      return {
        color: "bg-red-100 text-red-800 border-red-200",
        icon: "❌"
      };
    } else if (statusLower?.includes('pending') || statusLower?.includes('processing')) {
      return {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: "⏳"
      };
    } else if (statusLower?.includes('refund')) {
      return {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: "↩️"
      };
    } else {
      return {
        color: "bg-gray-100 text-gray-800 border-gray-200",
        icon: "📝"
      };
    }
  };

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    if (!Array.isArray(paymentHistory)) return [];

    let filtered = paymentHistory.filter((item) => {
      const matchesSearch =
        item.requestId.toLowerCase().includes(search.toLowerCase()) ||
        item.service.toLowerCase().includes(search.toLowerCase()) ||
        item.transactionId.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "all" || item.paymentStatus === statusFilter;

      const matchesDate = !dateRange.startDate || !dateRange.endDate || 
        (item.transactionDate >= dateRange.startDate && item.transactionDate <= dateRange.endDate);

      return matchesSearch && matchesStatus && matchesDate;
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        // Handle numeric sorting for amountValue
        if (sortConfig.key === 'amountValue') {
          aVal = a.amountValue;
          bVal = b.amountValue;
        }

        // Handle date sorting
        if (sortConfig.key === 'transactionDate') {
          aVal = new Date(aVal).getTime();
          bVal = new Date(bVal).getTime();
        }

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [search, statusFilter, paymentHistory, dateRange, sortConfig]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedData = filteredAndSortedData.slice(startIndex, startIndex + entriesPerPage);

  const handleExportCSV = (item) => {
    // Export single row as CSV
    const csvContent = [
      ['Sl No', 'Request ID', 'Service', 'Amount', 'Status', 'Transaction ID', 'Date'],
      [
        item.slNo,
        `"${item.requestId}"`,
        `"${item.service}"`,
        `"${item.amount}"`,
        `"${item.paymentStatus}"`,
        `"${item.transactionId}"`,
        `"${item.transactionDate}"`
      ]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payment-${item.requestId}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setError(null);
  };

  const renderPaginationButtons = () => {
    if (totalPages <= 1) return null;

    const buttons = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
      >
        ← Previous
      </button>
    );

    // First page
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="px-2 py-2">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 border rounded-lg transition-colors ${
            currentPage === page
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-300 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="px-2 py-2">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
      >
        Next →
      </button>
    );

    return buttons;
  };

  // Format date for display
  const formatDisplayDate = (dateString) => {
    if (!dateString || dateString === "N/A") return "N/A";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 mt-30 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading payment history...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 mt-30 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-red-500 text-6xl mb-4">❌</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Payment History</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 mt-30 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Payment History</h1>
          <p className="text-gray-600">Track and manage all your payment transactions</p>
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('slNo')}
                  >
                    <div className="flex items-center">
                      Sl No.
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('requestId')}
                  >
                    <div className="flex items-center">
                      Request ID
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('service')}
                  >
                    <div className="flex items-center">
                      Name of Service
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('amountValue')}
                  >
                    <div className="flex items-center">
                      Amount
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('paymentStatus')}
                  >
                    <div className="flex items-center">
                      Payment Status
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('transactionDate')}
                  >
                    <div className="flex items-center">
                      Transaction Date
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, idx) => {
                    const statusConfig = getStatusConfig(item.paymentStatus);
                    return (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-700">
                            {startIndex + idx + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-mono text-blue-600 font-medium">
                            {String(item.requestId || "N/A")}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {String(item.service || "N/A")}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-lg font-bold text-gray-900">
                            {String(item.amount || "₹ 0.00")}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusConfig.color}`}>
                            <span className="mr-2">{statusConfig.icon}</span>
                            {String(item.paymentStatus || "Pending")}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-mono text-gray-700">
                            {String(item.transactionId || "N/A")}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {formatDisplayDate(item.transactionDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleExportCSV(item)}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            title="Export this transaction as CSV"
                          >
                            <span className="mr-2">📥</span>
                            Export CSV
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <div className="text-gray-400 text-6xl mb-4">💳</div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {paymentHistory.length === 0 ? "No payment history found" : "No matching transactions found"}
                      </h3>
                      <p className="text-gray-500">
                        {search || statusFilter !== "all" || dateRange.startDate || dateRange.endDate
                          ? "Try adjusting your search or filter criteria"
                          : "You haven't made any payments yet"
                        }
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredAndSortedData.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 border-t border-gray-200 gap-4">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredAndSortedData.length)} of{" "}
                {filteredAndSortedData.length} entries
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {renderPaginationButtons()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentHistory;