// import React, { useState } from "react";

// const bankDetailsData = [
//   {
//     customer: "John Doe",
//     bank: "HDFC Bank",
//     accountNumber: "1234567890",
//     ifsc: "HDFC0001234",
//     actionUrl: "/bank-docs/doc1.pdf"
//   },
//   {
//     customer: "Jane Smith",
//     bank: "State Bank of India",
//     accountNumber: "9876543210",
//     ifsc: "SBIN0001234",
//     actionUrl: "/bank-docs/doc2.pdf"
//   },
//   {
//     customer: "Robert Brown",
//     bank: "ICICI Bank",
//     accountNumber: "4567890123",
//     ifsc: "ICIC0001234",
//     actionUrl: null
//   },
//   {
//     customer: "Alice Johnson",
//     bank: "Axis Bank",
//     accountNumber: "7890123456",
//     ifsc: "UTIB0001234",
//     actionUrl: "/bank-docs/doc3.pdf"
//   }
// ];

// export default function BankDetails() {
//   const [search, setSearch] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   const filteredData = bankDetailsData.filter(
//     (item) =>
//       item.customer?.toLowerCase().includes(search.toLowerCase()) ||
//       item.bank?.toLowerCase().includes(search.toLowerCase()) ||
//       item.accountNumber?.includes(search) ||
//       item.ifsc?.toLowerCase().includes(search.toLowerCase())
//   );

//   // Calculate pagination
//   const totalPages = Math.ceil(filteredData.length / entriesPerPage);
//   const startIndex = (currentPage - 1) * entriesPerPage;
//   const endIndex = Math.min(startIndex + entriesPerPage, filteredData.length);
//   const currentData = filteredData.slice(startIndex, endIndex);

//   const handlePrevious = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const maskAccountNumber = (accountNumber) => {
//     if (!accountNumber) return "";
//     const visibleDigits = 4;
//     const maskedLength = accountNumber.length - visibleDigits;
//     return "•".repeat(maskedLength) + accountNumber.slice(-visibleDigits);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 mt-30">
//       <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
//         {/* Header */}
//         <div className="bg-white p-6">
//           <h2 className="text-2xl font-bold text-black">Bank Details</h2>
//           <p className="text-gray-600 mt-1">Manage and view all bank account information</p>
//         </div>

//         {/* Controls */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between px-6 py-4 gap-4 bg-gray-50 border-b border-gray-200">
//           <div className="flex items-center space-x-2">
//             <span className="text-sm text-gray-700 font-medium">Show</span>
//             <select 
//               className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//               value={entriesPerPage}
//               onChange={(e) => {
//                 setEntriesPerPage(Number(e.target.value));
//                 setCurrentPage(1);
//               }}
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={25}>25</option>
//               <option value={50}>50</option>
//             </select>
//             <span className="text-sm text-gray-700 font-medium">entries</span>
//           </div>
          
//           <div className="flex items-center space-x-2">
//             <span className="text-sm text-gray-700 font-medium">Search:</span>
//             <div className="relative">
//               <input
//                 type="text"
//                 className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors w-64"
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 placeholder="Search customers, banks, accounts..."
//               />
//               <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead className="bg-gray-100 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Sl No.
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Customer
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Bank
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Account Number
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   IFSC Code
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {currentData.length > 0 ? (
//                 currentData.map((item, idx) => (
//                   <tr
//                     key={idx}
//                     className="hover:bg-blue-50 transition-colors duration-200 group"
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="text-sm font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">
//                         {startIndex + idx + 1}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
//                           <span className="text-blue-600 text-sm font-semibold">
//                             {item.customer.split(' ').map(n => n[0]).join('')}
//                           </span>
//                         </div>
//                         <div className="text-sm font-medium text-gray-900">
//                           {item.customer}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center mr-2">
//                           <span className="text-green-600 text-xs">🏦</span>
//                         </div>
//                         <span className="text-sm text-gray-900">{item.bank}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <code className="text-sm font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
//                         {maskAccountNumber(item.accountNumber)}
//                       </code>
//                     </td>
//                     <td className="px-6 py-4">
//                       <code className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">
//                         {item.ifsc}
//                       </code>
//                     </td>
//                     <td className="px-6 py-4">
//                       {item.actionUrl ? (
//                         <a
//                           href={item.actionUrl}
//                           download
//                           className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 group-hover:bg-blue-700"
//                         >
//                           <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                           </svg>
//                           Download
//                         </a>
//                       ) : (
//                         <span className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm">
//                           <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                           </svg>
//                           N/A
//                         </span>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-12 text-center">
//                     <div className="flex flex-col items-center justify-center">
//                       <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                         <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                         </svg>
//                       </div>
//                       <h3 className="text-lg font-semibold text-gray-900 mb-2">No bank details found</h3>
//                       <p className="text-gray-500 max-w-sm">
//                         {search ? "No results match your search criteria. Try different keywords." : "No bank account details have been added yet."}
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
//           <div className="text-sm text-gray-700 mb-4 sm:mb-0">
//             Showing {filteredData.length === 0 ? 0 : startIndex + 1} to {endIndex} of {filteredData.length} entries
//             {search && (
//               <span className="text-blue-600 ml-2">
//                 (filtered from {bankDetailsData.length} total entries)
//               </span>
//             )}
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={handlePrevious}
//               disabled={currentPage === 1}
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
//             >
//               Previous
//             </button>
//             <span className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg">
//               Page {currentPage} of {totalPages || 1}
//             </span>
//             <button
//               onClick={handleNext}
//               disabled={currentPage === totalPages || totalPages === 0}
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";

export default function BankDetailsForm() {
  const [formData, setFormData] = useState({
    customer: "",
    bank: "",
    accountNumber: "",
    ifsc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Bank details submitted successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Title */}
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-8">
          Bank Details Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Customer Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Customer Name
            </label>
            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              placeholder="Enter customer name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Bank Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bank Name
            </label>
            <input
              type="text"
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              placeholder="Enter bank name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Account Number
            </label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="Enter account number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* IFSC Code */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              IFSC Code
            </label>
            <input
              type="text"
              name="ifsc"
              value={formData.ifsc}
              onChange={handleChange}
              placeholder="Enter IFSC code"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
