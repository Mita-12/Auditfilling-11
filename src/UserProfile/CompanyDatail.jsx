import React from "react";

export default function CompanyTable() {
  // Example company data
  const companies = [
    {
      id: 1,
      name: "Audit Filing Pvt. Ltd.",
      regNo: "U12345DL2021PTC12345",
      estDate: "2021-05-14",
    },
    {
      id: 2,
      name: "TaxEase Consultancy LLP",
      regNo: "AAX1234",
      estDate: "2019-09-25",
    },
    {
      id: 3,
      name: "CloudSat Solutions",
      regNo: "U45678OR2022PTC56789",
      estDate: "2022-12-03",
    },
  ];

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-xl mt-6 p-4">
      <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
        Company Details
      </h2>

      <table className="min-w-full border border-gray-200 text-sm text-left text-gray-600">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-2 border-r text-center">Sl. No.</th>
            <th className="px-4 py-2 border-r">Company Name</th>
            <th className="px-4 py-2 border-r">Registration Number</th>
            <th className="px-4 py-2 border-r">Establish Date</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((company, index) => (
            <tr
              key={company.id}
              className="hover:bg-gray-100 transition-all border-b"
            >
              <td className="px-4 py-2 text-center">{index + 1}</td>
              <td className="px-4 py-2 font-medium text-gray-800">
                {company.name}
              </td>
              <td className="px-4 py-2">{company.regNo}</td>
              <td className="px-4 py-2">{company.estDate}</td>
              <td className="px-4 py-2 text-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-md transition-all">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
