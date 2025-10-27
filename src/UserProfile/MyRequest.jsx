import React, { useState, useMemo, useEffect } from "react";

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
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch requests from API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token") || localStorage.getItem("user_name");

        const response = await fetch("https://auditfiling.com/api/v1/user/request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data.success && Array.isArray(data.data)) {
          setRequests(data.data);
        } else if (data.success && Array.isArray(data.requests)) {
          setRequests(data.requests);
        } else {
          setRequests([]);
          console.warn("Unexpected API response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
        setError("Failed to load requests. Please try again.");
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests = useMemo(() => {
    if (!Array.isArray(requests)) return [];

    return requests.filter(request => {
      const serviceName = request.service?.name || request.service_name || request.service || "";
      const requestId = request.request_id || request.order_id || request.id || "";
      const status = request.status || "";

      const matchesSearch = serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        requestId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === "all" || status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [filter, searchTerm, requests]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";

    // Handle different date formats from API
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "-";

      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return "-";
    }
  };

  const handleView = (requestId) => {
    console.log(`Viewing request: ${requestId}`);
    // Add your view logic here - you might want to navigate to a details page
    // or show a modal with request details
  };

  const getStatusCounts = () => {
    const counts = { all: requests.length || 0 };

    if (Array.isArray(requests)) {
      requests.forEach(request => {
        const status = request.status;
        if (status) {
          counts[status] = (counts[status] || 0) + 1;
        }
      });
    }

    return counts;
  };

  const statusCounts = getStatusCounts();

  // Get unique statuses from API data for filter buttons
  const uniqueStatuses = useMemo(() => {
    if (!Array.isArray(requests)) return Object.keys(statusColors);

    const statuses = new Set();
    requests.forEach(request => {
      if (request.status) {
        statuses.add(request.status);
      }
    });

    // Include default statuses that might not be in current data but are valid
    Object.keys(statusColors).forEach(status => statuses.add(status));

    return Array.from(statuses);
  }, [requests]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 mt-30 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your requests...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 mt-30 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Requests</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            {/* <div className="flex flex-wrap gap-2">
              {uniqueStatuses.map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === status
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {status} ({statusCounts[status] || 0})
                </button>
              ))}
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === "all"
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                All ({statusCounts.all})
              </button>
            </div> */}
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
                {filteredRequests.map((request, idx) => {
                  const serviceName = request.service?.name || request.service_name || request.service || "Unknown Service";
                  const requestId = request.request_id || request.order_id || request.id || `req-${idx + 1}`;
                  const status = request.status || "Unknown";
                  const date = request.created_at || request.date || request.order_date;
                  const reason = request.reason || request.failure_reason || "N/A";

                  return (
                    <tr
                      key={requestId}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            #{idx + 1}
                          </div>
                          <div className="text-sm text-blue-600 font-mono">
                            {requestId}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {serviceName}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(date)}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'
                          }`}>
                          <span className="mr-1">{statusIcons[status] || '📝'}</span>
                          {status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {reason}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleView(requestId)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors group-hover:bg-blue-100"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {requests.length === 0 ? "No requests yet" : "No matching requests found"}
              </h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                {requests.length === 0
                  ? "You haven't made any service requests yet. Get started by exploring our services."
                  : "Try adjusting your search or filter to find what you're looking for."
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