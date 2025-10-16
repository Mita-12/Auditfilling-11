import React, { useState, useMemo } from "react";

const paymentHistoryData = [
  {
    requestId: "Offline_hEENg1XMtxFGw4",
    service: "Salaried Individual",
    amount: "₹ 500.00",
    paymentStatus: "Success",
    transactionId: "T2509151238180627620117",
    transactionDate: "15-09-2025 12:00 AM",
    invoiceUrl: "/invoices/invoice1.pdf",
    paymentMethod: "Credit Card",
    servicePeriod: "Sep 2025",
  },
  {
    requestId: "Offline_kFGNh2YNuyGHx5",
    service: "Professional Tax Registration",
    amount: "₹ 1,200.00",
    paymentStatus: "Success",
    transactionId: "T2509121537281627620118",
    transactionDate: "12-09-2025 03:45 PM",
    invoiceUrl: "/invoices/invoice2.pdf",
    paymentMethod: "UPI",
    servicePeriod: "Sep 2025",
  },
  {
    requestId: "Offline_mHHOi3ZOvzHIy6",
    service: "GST Registration",
    amount: "₹ 2,500.00",
    paymentStatus: "Failed",
    transactionId: "T2509101125382627620119",
    transactionDate: "10-09-2025 11:25 AM",
    invoiceUrl: null,
    paymentMethod: "Debit Card",
    servicePeriod: "Sep 2025",
  },
  {
    requestId: "Offline_nIIPj4APwAIJz7",
    service: "Company Incorporation",
    amount: "₹ 15,000.00",
    paymentStatus: "Success",
    transactionId: "T2509080948183627620120",
    transactionDate: "08-09-2025 09:48 AM",
    invoiceUrl: "/invoices/invoice3.pdf",
    paymentMethod: "Net Banking",
    servicePeriod: "Sep 2025",
  },
  {
    requestId: "Offline_pJJQk5BQxBJKz8",
    service: "Trademark Registration",
    amount: "₹ 4,500.00",
    paymentStatus: "Pending",
    transactionId: "T2509051418184627620121",
    transactionDate: "05-09-2025 02:18 PM",
    invoiceUrl: null,
    paymentMethod: "Wallet",
    servicePeriod: "Sep 2025",
  },
];

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

const paymentMethodIcons = {
  "Credit Card": "💳",
  "Debit Card": "💳",
  "UPI": "📱",
  "Net Banking": "🏦",
  "Wallet": "👛",
  "Cash": "💵"
};

export default function PaymentHistory() {
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter and paginate data
  const filteredData = useMemo(() => {
    return paymentHistoryData.filter((item) => {
      const matchesSearch = 
        item.requestId.toLowerCase().includes(search.toLowerCase()) ||
        item.service.toLowerCase().includes(search.toLowerCase()) ||
        item.transactionId.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || item.paymentStatus === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  const handleDownload = (item) => {
    if (!item.invoiceUrl) {
      alert("Invoice not available for download");
      return;
    }
    console.log(`Downloading invoice: ${item.invoiceUrl}`);
    // In real implementation, this would trigger the actual download
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getStatusCounts = () => {
    const counts = { all: paymentHistoryData.length };
    paymentHistoryData.forEach(item => {
      counts[item.paymentStatus] = (counts[item.paymentStatus] || 0) + 1;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  const getTotalAmount = () => {
    return paymentHistoryData
      .filter(item => item.paymentStatus === "Success")
      .reduce((total, item) => total + parseFloat(item.amount.replace(/[₹,]/g, '')), 0);
  };

  const renderPaginationButtons = () => {
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
              <div className="p-3 bg-green-100 rounded-xl">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Paid</p>
                <p className="text-2xl font-bold text-gray-900">₹ {getTotalAmount().toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-xl">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{paymentHistoryData.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-xl">
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
              <div className="p-3 bg-red-100 rounded-xl">
                <span className="text-2xl">❌</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.Failed || 0}</p>
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

              {/* Status Filters */}
              <div className="flex flex-wrap gap-2">
                {Object.keys(statusConfig).map(status => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      statusFilter === status 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status} ({statusCounts[status] || 0})
                  </button>
                ))}
                <button
                  onClick={() => {
                    setStatusFilter("all");
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    statusFilter === "all" 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All ({statusCounts.all})
                </button>
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
                    Transaction Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service & Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <tr key={item.transactionId} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-mono text-blue-600 font-medium">
                            {item.requestId}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {item.transactionId}
                          </div>
                          <div className="text-sm text-gray-900 mt-2">
                            {item.transactionDate}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.service}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {item.servicePeriod}
                        </div>
                        <div className="text-lg font-bold text-gray-900 mt-2">
                          {item.amount}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span className="mr-1">{paymentMethodIcons[item.paymentMethod] || "💳"}</span>
                          {item.paymentMethod}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusConfig[item.paymentStatus]?.color || statusConfig.Pending.color}`}>
                          <span className="mr-2">{statusConfig[item.paymentStatus]?.icon || "⏳"}</span>
                          {item.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-2">
                          {item.invoiceUrl ? (
                            <button
                              onClick={() => handleDownload(item)}
                              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors group-hover:bg-blue-700"
                            >
                              <span className="mr-2">📄</span>
                              Download Invoice
                            </button>
                          ) : (
                            <span className="text-gray-400 text-sm bg-gray-100 px-3 py-2 rounded-lg inline-flex items-center">
                              <span className="mr-2">📄</span>
                              Invoice Not Available
                            </span>
                          )}
                          <button className="text-blue-600 text-sm hover:text-blue-700 hover:underline transition-colors">
                            View Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
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