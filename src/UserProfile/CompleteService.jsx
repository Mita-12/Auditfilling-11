import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";

export default function CompletedService() {
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [completedServices, setCompletedServices] = useState([]);
  const [error, setError] = useState(null);

  // ✅ Fetch completed services from API
  useEffect(() => {
    const fetchCompletedServices = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get user identifier from localStorage
        let userId = null;
        const userData = localStorage.getItem("user");
        if (userData) {
          try {
            const user = JSON.parse(userData);
            userId = user?.id || user?.user_id || user?.userId;
          } catch (e) {
            console.error("Error parsing user data:", e);
          }
        }

        const identifier = userId || localStorage.getItem("user_name");
        if (!identifier) {
          setError("User not authenticated. Please login again.");
          setLoading(false);
          return;
        }

        const token = localStorage.getItem("token") || localStorage.getItem("user_name");

        const response = await axios.post(
          "https://auditfiling.com/api/v1/user/completed_services",
          { user_id: identifier },
          {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization": `Bearer ${token}`
            },
          }
        );

        // Handle API response
        if (response.data && response.data.success) {
          let servicesData = [];

          // Check different possible response structures
          if (Array.isArray(response.data.data)) {
            servicesData = response.data.data;
          } else if (Array.isArray(response.data.services)) {
            servicesData = response.data.services;
          } else if (Array.isArray(response.data.completed_services)) {
            servicesData = response.data.completed_services;
          } else if (response.data.data && typeof response.data.data === 'object') {
            servicesData = Object.values(response.data.data);
          } else if (Array.isArray(response.data)) {
            servicesData = response.data;
          } else {
            // Try to find any array in the response
            for (let key in response.data) {
              if (Array.isArray(response.data[key])) {
                servicesData = response.data[key];
                break;
              }
            }
          }

          // Map API data to your specific field structure
          const formattedServices = servicesData.map((item, index) => ({
            id: item.id || item.request_id || item.order_id || item.service_id || `item_${index}`,
            requestId: item.order_id || item.request_id || item.transaction_id || item.reference_id || `REQ_${index + 1}`,
            service: item.service_name || item.service_type || item.service || item.product_name || item.name || "Unknown Service",
            date: item.payment_date || item.completed_date || item.created_at || item.date || item.order_date || new Date().toISOString().split('T')[0],
            status: item.status || "Completed",
            fileUrl: item.file_path || item.document_url || item.file_url || item.download_link || item.attachment || null,
            fileName: item.file_name || item.document_name || "document.pdf",
          }));

          setCompletedServices(formattedServices);
        } else {
          const errorMsg = response.data?.message || "No completed services data found";
          setError(errorMsg);
        }

      } catch (error) {
        let errorMessage = "Failed to load completed services";

        if (error.response) {
          if (error.response.status === 401) {
            errorMessage = "Authentication failed. Please login again.";
          } else if (error.response.status === 404) {
            errorMessage = "No completed services found for this user.";
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
        setCompletedServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedServices();
  }, []);

  // Filter and paginate data
  const filteredData = useMemo(() => {
    if (!Array.isArray(completedServices)) return [];

    return completedServices.filter(
      (item) =>
        item.requestId.toLowerCase().includes(search.toLowerCase()) ||
        item.service.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, completedServices]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + entriesPerPage);

const handleDownload = async (item) => {
  if (!item.fileUrl) {
    alert("No file available for download");
    return;
  }

  try {
    console.log("Downloading file:", item.fileUrl);

    const token = localStorage.getItem("token") || localStorage.getItem("user_name");

    const response = await fetch(item.fileUrl, {
      headers: token ? { "Authorization": `Bearer ${token}` } : {}
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const text = await response.text();
      console.error("Download failed response:", text);
      throw new Error(`Download failed (${response.status})`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = item.fileName || `${item.requestId}_document.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading file:", error);
    alert(`Failed to download file: ${error.message}`);
  }
};


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString || dateString === "N/A") return "N/A";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 mt-30 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading completed services...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 mt-30 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Services</h3>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 mt-30 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Completed Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            View and download all your successfully completed service documents
          </p>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-6 border-b border-gray-200 gap-4">
            <div className="flex items-center space-x-4">
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
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-600">entries</span>
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
                  placeholder="Search by Request ID or Service..."
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
                    Request ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
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
                        <div className="text-sm text-gray-900">
                          {formatDisplayDate(item.date)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ✅ {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {item.fileUrl ? (
                          <button
                            onClick={() => handleDownload(item)}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <span className="mr-2">📥</span>
                            Download
                          </button>
                        ) : (
                          <span className="text-gray-400 text-sm">No file</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="text-gray-400 text-6xl mb-4">📭</div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {completedServices.length === 0 ? "No completed services found" : "No matching services found"}
                      </h3>
                      <p className="text-gray-500">
                        {search ? "Try adjusting your search terms" : "You haven't completed any services yet"}
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
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  ← Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-1 border rounded-lg transition-colors ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}