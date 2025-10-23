import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";

const statusConfig = {
  Success: {
    color: "bg-green-100 text-green-800 border-green-200",
    icon: "✅",
    badge: "bg-green-500"
  },
  Failed: {
    color: "bg-red-100 text-red-800 border-red-200",
    icon: "❌",
    badge: "bg-red-500"
  },
  Pending: {
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: "⏳",
    badge: "bg-yellow-500"
  },
  Refunded: {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: "↩️",
    badge: "bg-blue-500"
  }
};

export default function PaymentHistory() {
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [error, setError] = useState(null);

  // ✅ Fetch payment history from API
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get user identifier from localStorage
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

        const identifier = userId || userEmail;
        
        if (!identifier) {
          console.error("❌ No user identifier found");
          setLoading(false);
          return;
        }

        console.log("📤 Fetching payment history for:", identifier);

        const formData = new FormData();
        formData.append("user_id", identifier);

        const response = await axios.post(
          "https://auditfiling.com/api/v1/user/payment/history",
          formData,
          {
            headers: { 
              "Content-Type": "multipart/form-data",
              "Accept": "application/json"
            },
          }
        );

        console.log("📦 Payment history API response:", response.data);

        if (response.data.success && Array.isArray(response.data.data)) {
          const formattedPayments = response.data.data.map((item, index) => ({
            id: item.id || index,
            slNo: index + 1,
            requestId: item.order_id || item.request_id || `REQ_${index + 1}`,
            service: item.service_name || item.service || "N/A",
            amount: item.amount ? `₹ ${parseFloat(item.amount).toLocaleString('en-IN')}` : "₹ 0.00",
            paymentStatus: item.payment_status || item.status || "Pending",
            transactionId: item.transaction_id || "N/A",
            transactionDate: item.payment_date || item.created_at || new Date().toLocaleDateString('en-IN'),
            invoiceUrl: item.invoice_url || item.file_path || null,
          }));
          setPaymentHistory(formattedPayments);
          console.log(`✅ Loaded ${formattedPayments.length} payment records`);
        } else {
          console.warn("⚠️ No payment history data found in response");
          setPaymentHistory([]);
          setError("No payment history found for your account.");
        }

      } catch (error) {
        console.error("❌ Error fetching payment history:", error);
        let errorMessage = "Failed to load payment history. Please try again.";
        
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
        } else if (error.request) {
          console.error("No response received:", error.request);
          errorMessage = "No response from server. Please check your internet connection.";
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
  }, []);

  // Filter and paginate data
  const filteredData = useMemo(() => {
    return paymentHistory.filter((item) => {
      const matchesSearch = 
        item.requestId.toLowerCase().includes(search.toLowerCase()) ||
        item.service.toLowerCase().includes(search.toLowerCase()) ||
        item.transactionId.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || item.paymentStatus === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter, paymentHistory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  const handleDownload = async (item) => {
    if (!item.invoiceUrl) {
      alert("Invoice not available for download");
      return;
    }

    try {
      console.log(`Downloading invoice: ${item.invoiceUrl}`);
      
      // Show loading for download
      const downloadBtn = document.querySelector(`button[data-invoice="${item.requestId}"]`);
      if (downloadBtn) {
        downloadBtn.disabled = true;
        downloadBtn.innerHTML = '<span class="mr-2">⏳</span>Downloading...';
      }

      // For actual file download
      const response = await fetch(item.invoiceUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Extract filename from URL or use request ID
      const filename = item.invoiceUrl.split('/').pop() || `${item.requestId}_invoice.pdf`;
      link.download = filename;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      console.log(`✅ Downloaded: ${filename}`);
      
      // Reset button
      if (downloadBtn) {
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = '<span class="mr-2">📄</span>Download Invoice';
      }
    } catch (error) {
      console.error("❌ Error downloading invoice:", error);
      alert("Failed to download invoice. Please try again.");
      
      // Reset button on error
      const downloadBtn = document.querySelector(`button[data-invoice="${item.requestId}"]`);
      if (downloadBtn) {
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = '<span class="mr-2">📄</span>Download Invoice';
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getStatusCounts = () => {
    const counts = { all: paymentHistory.length };
    paymentHistory.forEach(item => {
      counts[item.paymentStatus] = (counts[item.paymentStatus] || 0) + 1;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  const getTotalAmount = () => {
    return paymentHistory
      .filter(item => item.paymentStatus === "Success")
      .reduce((total, item) => {
        const amountValue = parseFloat(item.amount.replace(/[₹,]/g, '')) || 0;
        return total + amountValue;
      }, 0);
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
      console.error("Error formatting date:", error);
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
              onClick={() => window.location.reload()}
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{paymentHistory.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Successful</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.Success || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <span className="text-2xl">❌</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.Failed || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">₹</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">₹ {getTotalAmount().toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-6 border-b border-gray-200 gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
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
                <span className="text-sm text-gray-600">entries</span>
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="all">All Status</option>
                  <option value="Success">Success</option>
                  <option value="Failed">Failed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search by Request ID, Service, or Transaction ID..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sl No.
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name of Service
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-700">
                          {startIndex + idx + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-mono text-blue-600 font-medium">
                          {item.requestId}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.service}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-lg font-bold text-gray-900">
                          {item.amount}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusConfig[item.paymentStatus]?.color || statusConfig.Pending.color}`}>
                          <span className="mr-2">{statusConfig[item.paymentStatus]?.icon || "⏳"}</span>
                          {item.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-mono text-gray-700">
                          {item.transactionId}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {formatDisplayDate(item.transactionDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {item.invoiceUrl ? (
                          <button
                            data-invoice={item.requestId}
                            onClick={() => handleDownload(item)}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                          >
                            <span className="mr-2">📄</span>
                            Download Invoice
                          </button>
                        ) : (
                          <span className="text-gray-400 text-sm bg-gray-100 px-3 py-2 rounded-lg inline-flex items-center">
                            <span className="mr-2">📄</span>
                            No Invoice
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <div className="text-gray-400 text-6xl mb-4">💳</div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                      <p className="text-gray-500">
                        {search || statusFilter !== "all" 
                          ? "Try adjusting your search or filter criteria" 
                          : "No payment transactions available"
                        }
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredData.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 border-t border-gray-200 gap-4">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredData.length)} of{" "}
                {filteredData.length} entries
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