import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";

export default function CompletedService() {
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [completedServices, setCompletedServices] = useState([]);

  // ✅ Fetch completed services from API
  useEffect(() => {
    const fetchCompletedServices = async () => {
      try {
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

        console.log("📤 Fetching completed services for:", identifier);

        const formData = new FormData();
        formData.append("user_id", identifier);

        const response = await axios.post(
          "https://auditfiling.com/api/v1/user/completed_service",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Accept": "application/json"
            },
          }
        );

        console.log("📦 Completed  services API response:", response.data);

        if (response.data.success && Array.isArray(response.data.data)) {
          const formattedServices = response.data.data.map((item, index) => ({
            id: item.id || index,
            requestId: item.order_id || `REQ_${index + 1}`,
            service: item.service_name || "N/A",
            date: item.payment_date || new Date().toLocaleDateString('en-IN'),
            status: item.status || "Completed",
            fileUrl: item.file_path || null,
            fileSize: item. file_name || "N/A",

          }));
          setCompletedServices(formattedServices);
          console.log(`✅ Loaded ${formattedServices.length} completed services`);
        } else {
          console.warn("⚠️ No completed services data found in response");
          setCompletedServices([]);
        }

      } catch (error) {
        console.error("❌ Error fetching completed services:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
        setCompletedServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedServices();
  }, []);

  // Filter and paginate data
  const filteredData = useMemo(() => {
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
      console.log(`Downloading: ${item.fileUrl}`);

      // For actual file download
      const response = await fetch(item.fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      // Extract filename from URL or use request ID
      const filename = item.fileUrl.split('/').pop() || `${item.requestId}_document.pdf`;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log(`✅ Downloaded: ${filename}`);
    } catch (error) {
      console.error("❌ Error downloading file:", error);
      alert("Failed to download file. Please try again.");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
        className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
          className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="px-2 py-1">
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
          className={`px-3 py-1 border rounded-lg transition-colors ${currentPage === page
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
          <span key="ellipsis2" className="px-2 py-1">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
        className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
      // Handle different date formats from API
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        // If direct parsing fails, try handling Indian format (DD/MM/YYYY)
        const parts = dateString.split('/');
        if (parts.length === 3) {
          const formattedDate = new Date(parts[2], parts[1] - 1, parts[0]);
          return formattedDate.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          });
        }
        return dateString;
      }
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      console.error("Error formatting date:", error);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 mt-30 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Completed Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            View and download all your successfully completed service documents and certificates
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">📋</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedServices.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">⏱️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Files Available</p>
                <p className="text-2xl font-bold text-gray-900">
                  {completedServices.filter(item => item.fileUrl).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {completedServices.filter(item => item.status === 'Completed').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-2xl">📅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {completedServices.filter(item => {
                    try {
                      const itemDate = new Date(item.date);
                      const now = new Date();
                      return itemDate.getMonth() === now.getMonth() &&
                        itemDate.getFullYear() === now.getFullYear();
                    } catch {
                      return false;
                    }
                  }).length}
                </p>
              </div>
            </div>
          </div>
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
                  <option value={5}>5</option>
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
                  paginatedData.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="text-sm font-mono text-blue-600 font-medium">
                          {item.requestId}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          ID #{startIndex + idx + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.service}
                        </div>
                        {item.completionTime && item.completionTime !== "N/A" && (
                          <div className="text-xs text-gray-500 mt-1">
                            Completed in {item.completionTime}
                          </div>
                        )}
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
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleDownload(item)}
                              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors group-hover:bg-blue-700"
                            >
                              <span className="mr-2">📥</span>
                              Download
                            </button>
                            {item.fileSize && item.fileSize !== "N/A" && (
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {item.fileSize}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="text-gray-400 text-sm">
                            <span className="bg-gray-100 px-3 py-2 rounded-lg inline-flex items-center">
                              <span className="mr-2">📄</span>
                              No file available
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="text-gray-400 text-6xl mb-4">📭</div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No completed services found</h3>
                      <p className="text-gray-500">
                        {search ? "Try adjusting your search terms" : "No services have been completed yet"}
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