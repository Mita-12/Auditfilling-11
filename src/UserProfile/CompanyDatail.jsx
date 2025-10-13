import React, { useState } from "react";
import { 
  Eye, 
  Edit2, 
  Trash2, 
  Plus, 
  Search, 
  Filter,
  Building,
  Calendar,
  Hash
} from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function CompanyDetail() {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Audit Filing Pvt. Ltd.",
      regNo: "U12345DL2021PTC12345",
      estDate: "2021-05-14",
      status: "Active",
      type: "Private Limited",
      address: "New Delhi, India"
    },
    {
      id: 2,
      name: "TaxEase Consultancy LLP",
      regNo: "AAX1234",
      estDate: "2019-09-25",
      status: "Active",
      type: "LLP",
      address: "Mumbai, India"
    },
    {
      id: 3,
      name: "CloudSat Solutions",
      regNo: "U45678OR2022PTC56789",
      estDate: "2022-12-03",
      status: "Inactive",
      type: "Private Limited",
      address: "Bhubaneswar, India"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const navigate = useNavigate();

  // Filter companies based on search and filters
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.regNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || company.status === statusFilter;
    const matchesType = typeFilter === "All" || company.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      setCompanies(companies.filter(company => company.id !== id));
    }
  };

  const handleView = (company) => {
    // In a real app, this would navigate to company details page
    alert(`Viewing details for: ${company.name}\nRegistration: ${company.regNo}\nEstablished: ${company.estDate}`);
  };

  const handleEdit = (company) => {
    // In a real app, this would open an edit modal/form
    alert(`Editing company: ${company.name}`);
  };

  const handleAddCompany = () => {
    navigate("/company-detailform");

    // In a real app, this would open an add company form
    alert("Add new company functionality would open here");
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "Active":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "Inactive":
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getCompanyTypeColor = (type) => {
    switch (type) {
      case "Private Limited":
        return "text-purple-600 bg-purple-50";
      case "LLP":
        return "text-blue-600 bg-blue-50";
      case "Public Limited":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 mt-30 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-3">
            <Building className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Company Details</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage and view all your registered companies in one place. Track status, registration details, and take necessary actions.
          </p>
        </div>

        {/* Stats Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Building className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{companies.length}</p>
                <p className="text-sm text-gray-600">Total Companies</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <div className="w-5 h-5 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {companies.filter(c => c.status === "Active").length}
                </p>
                <p className="text-sm text-gray-600">Active</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <Hash className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{companies.filter(c => c.type === "Private Limited").length}</p>
                <p className="text-sm text-gray-600">Private Ltd.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg mr-3">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {new Date().getFullYear()}
                </p>
                <p className="text-sm text-gray-600">This Year</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Controls Section */}
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
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              {/* Type Filter */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Types</option>
                <option value="Private Limited">Private Limited</option>
                <option value="LLP">LLP</option>
                <option value="Public Limited">Public Limited</option>
              </select>
            </div>

            {/* Add Company Button */}
            <button
              onClick={handleAddCompany}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Company
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Responsive Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                    Registration
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                    Established
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right font-semibold text-sm uppercase tracking-wider">
                    Actions
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
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCompanyTypeColor(company.type)}`}>
                          {company.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-700">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {formatDate(company.estDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={getStatusBadge(company.status)}>
                          {company.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleView(company)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200 tooltip"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(company)}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200 tooltip"
                            title="Edit Company"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(company.id, company.name)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200 tooltip"
                            title="Delete Company"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <Building className="w-12 h-12 mb-3 text-gray-300" />
                        <p className="text-lg font-medium mb-1">No companies found</p>
                        <p className="text-sm">
                          {searchTerm || statusFilter !== "All" || typeFilter !== "All" 
                            ? "Try adjusting your search or filters" 
                            : "Get started by adding your first company"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
              <div className="mb-2 sm:mb-0">
                Showing <span className="font-semibold">{filteredCompanies.length}</span> of{" "}
                <span className="font-semibold">{companies.length}</span> companies
              </div>
              <div className="flex items-center space-x-4">
                <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                  Previous
                </button>
                <span className="text-sm">Page 1 of 1</span>
                <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}