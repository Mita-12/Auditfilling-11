import React, { useState, useMemo } from "react";

const requests = [
  { id: 1, requestId: "order_RTIzZda4gC6nhE", service: "Salaried Individual", date: "2024-01-15", status: "Payment Started", reason: "N/A" },
  { id: 2, requestId: "order_RSrs29A9O1npc1", service: "Professional", date: "2024-01-14", status: "Completed", reason: "N/A" },
  { id: 3, requestId: "order_RQxZEJblep1c87", service: "Hindu Undivided Family (HUF)", date: "2024-01-13", status: "In Progress", reason: "N/A" },
  { id: 4, requestId: "order_RQxZ5BeBRaovMp", service: "Self Employed", date: "2024-01-12", status: "Payment Failed", reason: "Insufficient funds" },
  { id: 5, requestId: "order_RQxYuiyQcB0f94", service: "Professional", date: "2024-01-11", status: "Payment Started", reason: "N/A" },
  { id: 6, requestId: "order_RQxYiLupaOlpSK", service: "Salaried Individual", date: "2024-01-10", status: "Completed", reason: "N/A" },
  { id: 7, requestId: "order_RQuCD5YxKfACIl", service: "ROC AGM Filing", date: "2024-01-09", status: "Rejected", reason: "Document missing" },
  { id: 8, requestId: "order_RQuBZYNRRYvcjd", service: "Shop And Commercial Registration", date: "2024-01-08", status: "Payment Started", reason: "N/A" },
  { id: 9, requestId: "order_RQtpea3w6PccuO", service: "Hindu Undivided Family (HUF)", date: "2024-01-07", status: "In Progress", reason: "N/A" },
  { id: 10, requestId: "order_RQtfYiDVDNLwbT", service: "Salaried Individual", date: "2024-01-06", status: "Completed", reason: "N/A" },
];

const statusColors = {
  "Payment Started": "bg-blue-100 text-blue-800",
  "Completed": "bg-green-100 text-green-800",
  "In Progress": "bg-yellow-100 text-yellow-800",
  "Payment Failed": "bg-red-100 text-red-800",
  "Rejected": "bg-red-100 text-red-800",
};

const statusIcons = {
  "Payment Started": "🔄",
  "Completed": "✅",
  "In Progress": "⏳",
  "Payment Failed": "❌",
  "Rejected": "🚫",
};

export default function MyRequests() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRequests = useMemo(() => {
    return requests.filter(request => {
      const matchesSearch = request.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.requestId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === "all" || request.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [filter, searchTerm]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleView = (requestId) => {
    console.log(`Viewing request: ${requestId}`);
    // Add your view logic here
  };

  const getStatusCounts = () => {
    const counts = { all: requests.length };
    requests.forEach(request => {
      counts[request.status] = (counts[request.status] || 0) + 1;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gray-50 mt-30 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Requests</h1>
          <p className="text-gray-600 mt-2">Track and manage your service requests</p>
        </div>

        {/* Stats and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by service or request ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  🔍
                </div>
              </div>
            </div>

            {/* Status Filters */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(statusColors).map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    filter === status 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status} ({statusCounts[status] || 0})
                </button>
              ))}
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filter === "all" 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({statusCounts.all})
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRequests.map((request, idx) => (
                  <tr 
                    key={request.requestId}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          #{idx + 1}
                        </div>
                        <div className="text-sm text-blue-600 font-mono">
                          {request.requestId}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {request.service}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(request.date)}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[request.status] || 'bg-gray-100 text-gray-800'
                      }`}>
                        <span className="mr-1">{statusIcons[request.status] || '📝'}</span>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {request.reason}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleView(request.requestId)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors group-hover:bg-blue-100"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                {searchTerm || filter !== "all" 
                  ? "Try adjusting your search or filter to find what you're looking for."
                  : "You haven't made any requests yet."
                }
              </p>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-4 text-sm text-gray-500">
          Showing {filteredRequests.length} of {requests.length} requests
        </div>
      </div>
    </div>
  );
}