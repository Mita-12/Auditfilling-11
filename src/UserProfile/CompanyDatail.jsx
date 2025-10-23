// import React, { useState } from "react";
// import { 
//   Eye, 
//   Edit2, 
//   Trash2, 
//   Plus, 
//   Search, 
//   Filter,
//   Building,
//   Calendar,
//   Hash
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// export default function CompanyDetail() {
//   const [companies, setCompanies] = useState([
//     {
//       id: 1,
//       name: "Audit Filing Pvt. Ltd.",
//       regNo: "U12345DL2021PTC12345",
//       estDate: "2021-05-14",
//       status: "Active",
//       type: "Private Limited",
//       address: "New Delhi, India"
//     },
//     {
//       id: 2,
//       name: "TaxEase Consultancy LLP",
//       regNo: "AAX1234",
//       estDate: "2019-09-25",
//       status: "Active",
//       type: "LLP",
//       address: "Mumbai, India"
//     },
//     {
//       id: 3,
//       name: "CloudSat Solutions",
//       regNo: "U45678OR2022PTC56789",
//       estDate: "2022-12-03",
//       status: "Inactive",
//       type: "Private Limited",
//       address: "Bhubaneswar, India"
//     },
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [typeFilter, setTypeFilter] = useState("All");
//   const navigate = useNavigate();

//   // Filter companies based on search and filters
//   const filteredCompanies = companies.filter(company => {
//     const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          company.regNo.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === "All" || company.status === statusFilter;
//     const matchesType = typeFilter === "All" || company.type === typeFilter;
    
//     return matchesSearch && matchesStatus && matchesType;
//   });

//   const handleDelete = (id, name) => {
//     if (window.confirm(`Are you sure you want to delete ${name}?`)) {
//       setCompanies(companies.filter(company => company.id !== id));
//     }
//   };

//   const handleView = (company) => {
//     // In a real app, this would navigate to company details page
//     alert(`Viewing details for: ${company.name}\nRegistration: ${company.regNo}\nEstablished: ${company.estDate}`);
//   };

//   const handleEdit = (company) => {
//     // In a real app, this would open an edit modal/form
//     alert(`Editing company: ${company.name}`);
//   };

//   const handleAddCompany = () => {
//     navigate("/company-detailform");

//     // In a real app, this would open an add company form
//     alert("Add new company functionality would open here");
//   };


//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   const getCompanyTypeColor = (type) => {
//     switch (type) {
//       case "Private Limited":
//         return "text-purple-600 bg-purple-50";
//       case "LLP":
//         return "text-blue-600 bg-blue-50";
//       case "Public Limited":
//         return "text-orange-600 bg-orange-50";
//       default:
//         return "text-gray-600 bg-gray-50";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 mt-30 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center mb-3">
//             <Building className="w-8 h-8 text-blue-600 mr-3" />
//             <h1 className="text-3xl font-bold text-gray-800">Company Details</h1>
//           </div>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Manage and view all your registered companies in one place. Track status, registration details, and take necessary actions.
//           </p>
//         </div>

//         {/* Controls Section */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
//           <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
//             <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
//               {/* Search */}
//               <div className="relative flex-1 sm:flex-none">
//                 <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search companies..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 w-full sm:w-64"
//                 />
//               </div>


//               {/* Type Filter */}
//               <select
//                 value={typeFilter}
//                 onChange={(e) => setTypeFilter(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100"
//               >
//                 <option value="All">All Types</option>
//                 <option value="Private Limited">Private Limited</option>
//                 <option value="LLP">LLP</option>
//                 <option value="Public Limited">Public Limited</option>
//               </select>
//             </div>

//             {/* Add Company Button */}
//             <button
//               onClick={handleAddCompany}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Add Company
//             </button>
//           </div>
//         </div>

//         {/* Table Section */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//           {/* Responsive Table Container */}
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
//                 <tr>
//                   <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
//                     Company
//                   </th>
//                   <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
//                     Registration
//                   </th>
//                   <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
//                     Type
//                   </th>
//                   <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
//                     Established
//                   </th>
                 
//                   <th className="px-6 py-4 text-right font-semibold text-sm uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredCompanies.length > 0 ? (
//                   filteredCompanies.map((company) => (
//                     <tr 
//                       key={company.id}
//                       className="hover:bg-blue-50 transition-colors duration-150"
//                     >
//                       <td className="px-6 py-4">
//                         <div>
//                           <div className="font-semibold text-gray-900 text-lg">
//                             {company.name}
//                           </div>
//                           <div className="text-sm text-gray-500 mt-1">
//                             {company.address}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm font-mono text-gray-700 bg-gray-50 px-2 py-1 rounded border">
//                           {company.regNo}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCompanyTypeColor(company.type)}`}>
//                           {company.type}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center text-sm text-gray-700">
//                           <Calendar className="w-4 h-4 mr-2 text-gray-400" />
//                           {formatDate(company.estDate)}
//                         </div>
//                       </td>
                     
//                       <td className="px-6 py-4">
//                         <div className="flex justify-end space-x-2">
//                           <button
//                             onClick={() => handleView(company)}
//                             className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200 tooltip"
//                             title="View Details"
//                           >
//                             <Eye className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={() => handleEdit(company)}
//                             className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200 tooltip"
//                             title="Edit Company"
//                           >
//                             <Edit2 className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(company.id, company.name)}
//                             className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200 tooltip"
//                             title="Delete Company"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="px-6 py-12 text-center">
//                       <div className="flex flex-col items-center justify-center text-gray-500">
//                         <Building className="w-12 h-12 mb-3 text-gray-300" />
//                         <p className="text-lg font-medium mb-1">No companies found</p>
//                         <p className="text-sm">
//                           {searchTerm || statusFilter !== "All" || typeFilter !== "All" 
//                             ? "Try adjusting your search or filters" 
//                             : "Get started by adding your first company"}
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Table Footer */}
//           <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
//             <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
//               <div className="mb-2 sm:mb-0">
//                 Showing <span className="font-semibold">{filteredCompanies.length}</span> of{" "}
//                 <span className="font-semibold">{companies.length}</span> companies
//               </div>
//               <div className="flex items-center space-x-4">
//                 <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
//                   Previous
//                 </button>
//                 <span className="text-sm">Page 1 of 1</span>
//                 <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Eye,
  Edit2,
  Trash2,
  Plus,
  Search,
  Building,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CompanyDetail() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const navigate = useNavigate();

  // ✅ Get user identifier
  const getUserIdentifier = () => {
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

  // ✅ Fetch companies from API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const identifier = getUserIdentifier();
        
        if (!identifier) {
          console.error("❌ No user identifier found");
          setLoading(false);
          return;
        }

        console.log("📤 Using identifier:", identifier);

        const response = await axios.get(
          `https://auditfiling.com/public/api/v1/user/all_companies/${identifier}`
        );

        console.log("📦 Full API Response:", response.data);

        if (response.data && Array.isArray(response.data.data)) {
          const formattedCompanies = response.data.data.map((item, index) => ({
            id: item.id,
            slNo: index + 1,
            name: item.company_name || "N/A",
            regNo: item.registration_no || "N/A",
            estDate: item.established_date || "N/A",
            status: item.status || "Active",
            type: item.company_type || "N/A",
            address: item.address || "Not Provided",
          }));
          setCompanies(formattedCompanies);
          console.log(`✅ Loaded ${formattedCompanies.length} companies`);
        } else {
          console.warn("⚠️ No companies data found in response");
          setCompanies([]);
        }

      } catch (error) {
        console.error("❌ Error fetching companies:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // ✅ Delete Company
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) {
      return;
    }

    setActionLoading(`delete-${id}`);
    
    try {
      const identifier = getUserIdentifier();
      
      const formData = new FormData();
      formData.append("user_id", identifier);
      formData.append("company_id", id);

      const response = await axios.post(
        "https://auditfiling.com/api/v1/user/companies/destroy",
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data",
            "Accept": "application/json"
          },
        }
      );

      console.log("🗑️ Delete response:", response.data);

      if (response.data.success) {
        // Remove company from local state
        setCompanies(companies.filter((company) => company.id !== id));
        alert(`Company ${name} deleted successfully!`);
      } else {
        alert(`Failed to delete company: ${response.data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("❌ Error deleting company:", error);
      let errorMessage = "Failed to delete company";
      
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
        console.error("Response data:", error.response.data);
      }
      
      alert(errorMessage);
    } finally {
      setActionLoading(null);
    }
  };

  // ✅ View Company Details
  const handleView = async (company) => {
    setActionLoading(`view-${company.id}`);
    
    try {
      const identifier = getUserIdentifier();
      
      const formData = new FormData();
      formData.append("user_id", identifier);
      formData.append("company_id", company.id);

      const response = await axios.post(
        "https://auditfiling.com/api/v1/user/companies/show",
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data",
            "Accept": "application/json"
          },
        }
      );

      console.log("👁️ View response:", response.data);

      if (response.data.success) {
        const companyData = response.data.data;
        // Display company details in a formatted way
        alert(
          `Company Details:\n\n` +
          `Name: ${companyData.company_name || company.name}\n` +
          `Registration: ${companyData.registration_no || company.regNo}\n` +
          `Established: ${formatDate(companyData.established_date) || formatDate(company.estDate)}\n` +
          `Address: ${companyData.address || company.address}\n` +
          `Type: ${companyData.company_type || company.type}\n` +
          `Status: ${companyData.status || company.status}`
        );
      } else {
        alert(`Failed to fetch company details: ${response.data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("❌ Error viewing company:", error);
      let errorMessage = "Failed to fetch company details";
      
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      }
      
      alert(errorMessage);
    } finally {
      setActionLoading(null);
    }
  };

  // ✅ Edit Company
  const handleEdit = async (company) => {
    setActionLoading(`edit-${company.id}`);
    
    try {
      const identifier = getUserIdentifier();
      
      const formData = new FormData();
      formData.append("user_id", identifier);
      formData.append("company_id", company.id);

      const response = await axios.post(
        "https://auditfiling.com/api/v1/user/companies/show",
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data",
            "Accept": "application/json"
          },
        }
      );

      console.log("✏️ Edit response:", response.data);

      if (response.data.success) {
        const companyData = response.data.data;
        
        // Navigate to edit form with company data
        navigate("/company-detailform", { 
          state: { 
            company: companyData,
            isEditing: true 
          } 
        });
      } else {
        alert(`Failed to fetch company data for editing: ${response.data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("❌ Error fetching company for edit:", error);
      let errorMessage = "Failed to fetch company data for editing";
      
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      }
      
      alert(errorMessage);
    } finally {
      setActionLoading(null);
    }
  };

  const handleAddCompany = () => {
    navigate("/company-detailform", { 
      state: { 
        isEditing: false 
      } 
    });
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === "N/A") return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ✅ Filter companies
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.regNo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 mt-30 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-3">
            <Building className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Company Details</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage and view all your registered companies in one place.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:flex-none">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-100 w-full sm:w-64"
                />
              </div>
            </div>

            {/* Add Button */}
            <button
              onClick={handleAddCompany}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Company
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">
              Loading companies...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                      SL No
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                      Company Name
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                      Registration No
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                      Establish Date
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-sm uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCompanies.length > 0 ? (
                    filteredCompanies.map((company) => (
                      <tr
                        key={company.id}
                        className="hover:bg-blue-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-700">
                            {company.slNo}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-semibold text-gray-900 text-lg">
                              {company.name}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {company.address}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-mono text-gray-700 bg-gray-50 px-2 py-1 rounded border">
                            {company.regNo}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-gray-700">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {formatDate(company.estDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => handleView(company)}
                              disabled={actionLoading === `view-${company.id}`}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="View"
                            >
                              {actionLoading === `view-${company.id}` ? (
                                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() => handleEdit(company)}
                              disabled={actionLoading === `edit-${company.id}`}
                              className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Edit"
                            >
                              {actionLoading === `edit-${company.id}` ? (
                                <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Edit2 className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() => handleDelete(company.id, company.name)}
                              disabled={actionLoading === `delete-${company.id}`}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Delete"
                            >
                              {actionLoading === `delete-${company.id}` ? (
                                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <div className="text-gray-500">
                          No companies found.
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

