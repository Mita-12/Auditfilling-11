import React from "react";
import Header from "../component/Header";
import { FaImage, FaFileAlt, FaWpforms } from "react-icons/fa";

export default function IncomeTax() {
  const sidebarItems = [
    "Salaried Individual",
    "Professional",
    "Self Employed",
    "Hindu Undivided Family (HUF)",
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <Header />

      <div className="container mx-auto px-6 flex gap-6 mt-25">
        {/* Main Section */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Top 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Image Card */}
            <div
              className="bg-white rounded-lg shadow-md h-65 bg-cover bg-center hover:shadow-sm"
              style={{ backgroundImage: "url('/img/Blog 6.png')" }}
            ></div>

            {/* Document Card */}
            <div className="bg-white rounded-lg shadow-md p-3 hover:shadow-lg h-65 flex flex-col justify-between">
              {/* Icon and Title Inline */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <FaFileAlt className="text-blue-600 text-2xl" />
                <h3 className="text-lg font-semibold">ITR Documents</h3>
              </div>

              {/* List of Documents */}
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-8 flex-1">
                <li>Copy of PAN Card</li>
                <li>Copy of Aadhaar Card</li>
                <li>Previous Year IT Return (if any)</li>
                <li>Price
                  RS: 3000/-</li>
              </ul>

              {/* Button */}
              <button className="mt-3 block mx-auto w-1/3   bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition">
                Proceed
              </button>
            </div>


            {/* Form Card */}
            <div className="bg-white rounded-sm shadow-md p-3 hover:shadow-sm h-65 flex flex-col justify-between">
  {/* Icon and Title Inline */}
  <div className="flex items-center justify-center gap-2 mb-3">
    <FaWpforms className="text-blue-950 text-2xl" />
    <h3 className="text-lg font-semibold">Quick Form</h3>
  </div>

  {/* Form */}
  <form className="space-y-3 flex-1">
    <input
      type="text"
      placeholder="Your Name"
      className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
    />
    <input
      type="email"
      placeholder="Your Email"
      className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
    />
    <textarea
      placeholder="Your Message"
      rows="2"
      className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
    />
    <button
      type="submit"
      className="block mx-auto w-1/3 bg-gray-600 text-white py-1 rounded hover:bg-blue-700 transition"
    >
      Submit
    </button>
  </form>
</div>


          </div>

          {/* Large Card below Top 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-1 h-full">
            <h1 className="text-2xl font-semibold mb-4 text-center">
              What We Offer
            </h1>
            <p className="text-gray-700 mb-4">
              We provide top-notch services tailored to your business needs.
              Explore our offerings below to find the perfect solution for your
              project.
            </p>
            <p className="text-gray-700">
              Our team of experts ensures high-quality work, timely delivery,
              and ongoing support.
            </p>
            {/* <p className="text-gray-700">
              All eligible Indian taxpayers have a financial obligation to file income tax returns. The Income Tax Act of 1961 governs the Indian tax system, which applies to Hindu Undivided Families (HUFs), independent contractors, business owners, and salaried employees. The process is now easier to complete and more accessible due to developments in free income tax filing and government-backed e-filing platforms. Accurate filing is necessary to ensure compliance and optimize your income tax services, regardless of whether you're claiming standard deductions under Sections 80C and 80D, selecting the appropriate ITR form, or understanding the distinctions between the old and new tax regimes. The fundamentals of income tax in India are broken down in this guide, which also defines specific filing services for various taxpayer types.

              At auditfiling.com, we are committed to providing you with accurate, up-to-date information and services to help you navigate the complexities of income tax filing, audits, and compliance.

              What is Income Tax and How It Works in India
              In India, income tax is a direct tax that the government collects on the money that businesses, salaried workers, and individuals earn. Every individual who makes more than a specific amount of money must submit an income tax return each year. The tax system is governed by the Income Tax Act of 1961, which categorizes taxpayers into businesses, corporations, individuals, and Hindu Undivided Families (HUFs). Numerous income tax services, such as the free income tax filing platforms offered by the Income Tax Department of India, have made it simpler and easier to file an online tax return, or e-file a tax return.

              Individuals can claim deductions, exemptions, and rebates under various sections (like 80C and 80D) to reduce their personal income tax liability. Employee tax is typically deducted at the source by employers (TDS), whereas individual income tax for self-employed individuals and professionals must be paid in advance or self-assessed. If someone is unable to file by the due date, they can apply for an income tax extension.

              Income Tax Forms List
              ITR-1: Individuals (residents) having income from salary, one house property, other sources, agricultural income less than Rs 5,000 and with a total income of up to Rs 50 lakh.

              ITR-2: Individuals/HUFs not having any business or profession under any proprietorship, more than one house property.

              ITR-3: Individuals/HUFs having income from a proprietary business or profession, income of a person as a partner in a firm.

              ITR-4: Individuals/HUFs having presumptive income from business or profession, one house property.

              ITR-5: Partnership firms or LLPs.

              ITR-6: Companies.

              ITR-7: Trusts.


            </p> */}

          </div>
        </div>

        {/* Fixed Right Sidebar */}
        <aside className="w-64 flex-shrink-0 bg-white rounded-lg shadow-md p-6 h-screen sticky top-0">
          <h3 className="text-xl font-semibold mb-4 text-center">Services</h3>
          <ul className="space-y-3 text-center">
            {sidebarItems.map((item, index) => (
              <li
                key={index}
                className="p-3 bg-blue-50 rounded hover:bg-blue-100 cursor-pointer transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}



// import React from "react";

// export default function IncomeTax() {
//   const sidebarItems = [
//     "Salaried Individual",
//     "Professional",
//     "Self Employed",
//     "Hindu Undivided Family (HUF)",
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header Section */}
//       <header
//         className="fixed top-0 left-0 w-full h-64 bg-cover bg-center z-10"
//         style={{
//           backgroundImage: "url('/img/IncomeTax2.jpg')",
//           backgroundPosition: "center",
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {/* Optional overlay */}
//         <div className="absolute inset-0 flex items-center justify-center"></div>
//       </header>

//       {/* Main Content */}
//       <div className="container mx-auto px-6 py-10 pt-72 flex gap-8">
//         {/* Left Content */}
//         <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
//           <p className="text-gray-700 mb-4">
//             We provide top-notch services tailored to your business needs.
//             Explore our offerings below to find the perfect solution for your project.
//           </p>
//           <p className="text-gray-700">
//             Our team of experts ensures high-quality work, timely delivery, and ongoing support.
//           </p>
//         </div>

//         {/* Right Sidebar */}
//         <aside className="w-64 flex flex-col gap-6">
//           {/* Services Menu */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold mb-4">Services Menu</h3>
//             <ul className="space-y-3">
//               {sidebarItems.map((item, index) => (
//                 <li
//                   key={index}
//                   className="p-3 bg-blue-50 rounded hover:bg-blue-100 cursor-pointer transition"
//                 >
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Form Card */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
//             <form className="space-y-4">
//               <div>
//                 <label className="block text-gray-700 mb-1" htmlFor="name">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   placeholder="Your Name"
//                   className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 mb-1" htmlFor="email">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   placeholder="Your Email"
//                   className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 mb-1" htmlFor="message">
//                   Message
//                 </label>
//                 <textarea
//                   id="message"
//                   placeholder="Your Message"
//                   className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   rows="4"
//                 ></textarea>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }

