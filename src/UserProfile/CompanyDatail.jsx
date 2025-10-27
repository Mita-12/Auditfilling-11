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
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // ✅ Date formatting function
  const formatDate = (dateString) => {
    if (
      !dateString ||
      dateString === "N/A" ||
      dateString === "0000-00-00" ||
      dateString === "0000-00-00 00:00:00"
    ) {
      return "N/A";
    }

    try {
      let dateToFormat = dateString;
      if (dateString.includes(" ")) {
        dateToFormat = dateString.split(" ")[0];
      }

      if (dateToFormat.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const [year, month, day] = dateToFormat.split("-");
        const date = new Date(year, month - 1, day);

        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        }
      }

      const date = new Date(dateToFormat);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      }

      return "Invalid Date";
    } catch (error) {
      console.error("❌ Error formatting date:", dateString, error);
      return "Invalid Date";
    }
  };

  // ✅ Fetch companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const identifier = getUserIdentifier();
        if (!identifier) {
          console.error("❌ No user identifier found");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://auditfiling.com/public/api/v1/user/all_companies/${identifier}`
        );

        let companiesData = [];
        if (Array.isArray(response.data)) {
          companiesData = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          companiesData = response.data.data;
        } else if (response.data && Array.isArray(response.data.companies)) {
          companiesData = response.data.companies;
        } else if (response.data && typeof response.data === "object") {
          const arrayKeys = Object.keys(response.data).filter((key) =>
            Array.isArray(response.data[key])
          );
          if (arrayKeys.length > 0) {
            companiesData = response.data[arrayKeys[0]];
          }
        }

        if (companiesData && companiesData.length > 0) {
          const formattedCompanies = companiesData.map((item, index) => ({
            id: item.id || item.company_id || index,
            slNo: index + 1,
            name: item.company_name || item.name || item.companyName || "N/A",
            regNo:
              item.registration_no ||
              item.registration_number ||
              item.regNo ||
              "N/A",
            estDate:
              item.establish_date ||
              item.establishment_date ||
              item.estDate ||
              item.date_established ||
              "N/A",
            status: item.status || "Active",
            type: item.company_type || item.type || "N/A",
            address:
              item.address ||
              item.company_address ||
              item.registered_address ||
              "Not Provided",
            email: item.email || "info@company.com",
            mobile: item.mobile || "N/A",
            sector: item.sector || "Information Technology & Services",
            website: item.website || "https://www.example.com",
            gstNo: item.gst_no || "N/A",
            panNo: item.pan_no || "N/A",
            address1: item.address_line1 || "N/A",
            address2: item.address_line2 || "N/A",
            city: item.city || "N/A",
            state: item.state || "N/A",
            country: item.country || "India",
            pinCode: item.pin_code || "N/A",
            parentCompany: item.parent_company || "N/A",
          }));

          setCompanies(formattedCompanies);
        } else {
          setCompanies([]);
        }
      } catch (error) {
        console.error("❌ Error fetching companies:", error);
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // ✅ Delete Company
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;

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
            Accept: "application/json",
          },
        }
      );

      if (response.data.success) {
        setCompanies(companies.filter((c) => c.id !== id));
        alert(`Company ${name} deleted successfully!`);
      } else {
        alert(`Failed: ${response.data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("❌ Error deleting company:", error);
      alert("Failed to delete company");
    } finally {
      setActionLoading(null);
    }
  };

  // ✅ View Company Details (open modal)
  const handleView = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  // ✅ Edit Company
  const handleEdit = (company) => {
    setActionLoading(`edit-${company.id}`);
    try {
      navigate("/company-detailform", {
        state: {
          company: {
            id: company.id,
            company_name: company.name,
            registration_no: company.regNo,
            established_date: company.estDate,
            address: company.address,
            company_type: company.type,
            status: company.status,
          },
          isEditing: true,
        },
      });
    } catch (error) {
      console.error("❌ Error navigating to edit:", error);
      alert("Failed to open edit form");
    } finally {
      setActionLoading(null);
    }
  };

  const handleAddCompany = () => {
    navigate("/company-detailform", { state: { isEditing: false } });
  };

  // ✅ Filter companies
  const filteredCompanies = companies.filter((c) => {
    const search = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(search) ||
      c.regNo.toLowerCase().includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 mt-30 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-3">
            <Building className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">
              Company Details
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage and view all your registered companies in one place.
          </p>
        </div>

        {/* Search + Add */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64 transition-colors duration-200"
              />
            </div>

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
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
              <div className="text-gray-500">Loading companies...</div>
            </div>
          ) : filteredCompanies.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">SL No</th>
                    <th className="px-6 py-4 text-left">Company Name</th>
                    <th className="px-6 py-4 text-left">Registration No</th>
                    <th className="px-6 py-4 text-left">Establish Date</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCompanies.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-blue-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">{c.slNo}</td>
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {c.name}
                      </td>
                      <td className="px-6 py-4">{c.regNo}</td>
                      <td className="px-6 py-4">{formatDate(c.estDate)}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleView(c)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(c)}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(c.id, c.name)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500">
              No companies found.
            </div>
          )}
        </div>
      </div>

      {/* ✅ Modal for Company Details */}
      {isModalOpen && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">
              Company Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              {[
                ["Name", selectedCompany.name],
                ["Email ID", selectedCompany.email],
                ["Mobile No.", selectedCompany.mobile],
                ["Registration No", selectedCompany.regNo],
                ["Company Type", selectedCompany.type],
                ["Sector", selectedCompany.sector],
                ["Establish Date", formatDate(selectedCompany.estDate)],
                ["Website", selectedCompany.website],
                ["GST No", selectedCompany.gstNo],
                ["PAN No", selectedCompany.panNo],
                ["Address 1", selectedCompany.address1],
                ["Address 2", selectedCompany.address2],
                ["City", selectedCompany.city],
                ["State", selectedCompany.state],
                ["Country", selectedCompany.country],
                ["Pin Code", selectedCompany.pinCode],
                ["Parent Company Name", selectedCompany.parentCompany],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="font-semibold text-gray-600">{label}</p>
                  <p>{value || "N/A"}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


