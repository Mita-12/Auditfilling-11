// import React from "react";

// // Single-file React component styled with Tailwind CSS
// // Replace placeholder images/links with real assets when integrating.

// export default function Auditfile() {
//   const products = [
//     { id: 1, title: "Self ITR Filing", desc: "File tax returns in under 3 minutes", cta: "Know more" },
//     { id: 2, title: "Expert Filing", desc: "ITR filed by India's top Tax Experts", cta: "Know more" },
//     { id: 3, title: "Taxcloud", desc: "ITR filing software for Tax Experts", cta: "Know more" },
//     { id: 4, title: "GST software", desc: "G1-G9 filings made 3x faster", cta: "Know more" },
//   ];

//   const stats = [
//     { id: 1, value: "250M+", label: "invoices uploaded" },
//     { id: 2, value: "6M+", label: "Businesses visible" },
//     { id: 3, value: "6M+", label: "tax returns filed" },
//     { id: 4, value: "35,000+", label: "retail investors" },
//   ];

//   return (
//     <div className="bg-white text-gray-900">
//       {/* Hero */}
//       <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//           <div>
//             <p className="inline-block text-sm font-semibold uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded">Plug and Play</p>
//             <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
//               An exhaustive portfolio of cloud products you can use from day one
//             </h1>
//             <p className="mt-4 text-gray-600 max-w-xl">
//               Plug into an integrated stack for personal and business compliance — from ITR filing to GST and e-invoicing. Built by experts, trusted by millions.
//             </p>

//             <div className="mt-6 flex flex-wrap gap-3">
//               <a href="#" className="inline-flex items-center justify-center rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700">Get Started</a>
//               <a href="#" className="inline-flex items-center justify-center rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">See all services</a>
//             </div>

//             <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
//               {stats.map(s => (
//                 <div key={s.id} className="text-center">
//                   <div className="text-2xl font-bold">{s.value}</div>
//                   <div className="text-xs text-gray-500">{s.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="order-first lg:order-last">
//             {/* Placeholder for hero image / video */}
//             <div className="w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-r from-blue-50 to-white rounded-xl flex items-center justify-center border border-gray-100">
//               <svg width="220" height="140" viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
//                 <rect width="220" height="140" rx="12" fill="#EFF6FF" />
//                 <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#0B5FFF" fontSize="14">Hero image / demo</text>
//               </svg>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Products grid */}
//       <section className="bg-gray-50 py-10">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-xl font-semibold">Products for everyone</h2>
//           <p className="mt-2 text-gray-600">Built for scale, made by experts and secure by design.</p>

//           <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {products.map(p => (
//               <article key={p.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
//                 <div className="w-12 h-12 rounded-md bg-blue-50 flex items-center justify-center">
//                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
//                     <path d="M12 2L19 8v8l-7 6-7-6V8l7-6z" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
//                   </svg>
//                 </div>
//                 <h3 className="mt-4 font-semibold text-lg">{p.title}</h3>
//                 <p className="mt-2 text-sm text-gray-600">{p.desc}</p>
//                 <a href="#" className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline">{p.cta} →</a>
//               </article>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Trust logos & testimonials */}
//       <section className="max-w-7xl mx-auto px-6 py-10">
//         <h4 className="text-sm text-gray-500 uppercase">Trusted by</h4>
//         <div className="mt-4 flex items-center gap-6 overflow-x-auto py-4">
//           {/* Replace these with company logos */}
//           {Array.from({ length: 6 }).map((_, i) => (
//             <div key={i} className="flex-shrink-0 w-32 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">Logo</div>
//           ))}
//         </div>

//         <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//           <blockquote className="p-6 bg-white rounded-lg shadow-sm">
//             <p className="text-gray-700">"File ITRs yourself or seek expert assistance — effective and least time consuming."</p>
//             <footer className="mt-4 text-sm text-gray-500">— Mr. Manmohan, Tax Payer, Kochi</footer>
//           </blockquote>

//           <blockquote className="p-6 bg-white rounded-lg shadow-sm">
//             <p className="text-gray-700">"ClearTax has made core GST returns simple and easy for us."</p>
//             <footer className="mt-4 text-sm text-gray-500">— Titan, Group Manager</footer>
//           </blockquote>

//           <div className="p-6 bg-white rounded-lg shadow-sm flex items-center justify-center">
//             <div>
//               <div className="text-3xl font-bold">★ 4.9 / 5</div>
//               <div className="text-sm text-gray-500">45k+ Reviews</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer CTA */}
//       <section className="bg-blue-600 text-white py-10">
//         <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div>
//             <h3 className="text-lg font-semibold">Start saving time on compliance</h3>
//             <p className="mt-1 text-sm opacity-90">Explore ClearTax products and get set up in minutes.</p>
//           </div>
//           <div className="flex gap-3">
//             <a href="#" className="inline-flex items-center justify-center rounded-md bg-white text-blue-600 px-4 py-2 text-sm font-medium">Get Started</a>
//             <a href="#" className="inline-flex items-center justify-center rounded-md border border-white px-4 py-2 text-sm font-medium">Contact Sales</a>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { FaUser, FaBuilding, FaSuitcase, FaTruck } from "react-icons/fa";
import { HiOutlineDocumentText, HiOutlineBriefcase } from "react-icons/hi";
import { MdOutlineSupportAgent } from "react-icons/md";

export default function Auditfile() {
  const [activeTab, setActiveTab] = useState("Individuals");
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    if (activeTab === "Individuals") {
      setShowBar(true);
    } else {
      setShowBar(false);
    }
  }, [activeTab]);

  const tabs = [
    { name: "Individuals", icon: <FaUser /> },
    { name: "Enterprise", icon: <FaBuilding /> },
    { name: "Organization", icon: <FaSuitcase /> },
    { name: "SMEs", icon: <FaTruck /> },
  ];

  const tabContent = {
    Individuals: [
      {
        icon: <HiOutlineDocumentText className="text-blue-600 text-xl" />,
        title: "Self ITR Filing",
        desc: "File tax returns in under 3 minutes",
      },
      {
        icon: <MdOutlineSupportAgent className="text-blue-600 text-xl" />,
        title: "Assisted filing",
        desc: "Get experts for filing taxes and starting up",
      },
      {
        icon: <FaUser className="text-blue-600 text-xl" />,
        title: "Luxury Tax Support",
        desc: "Get a personal tax expert for tailored tax strategy",
      },
      {
        icon: <HiOutlineBriefcase className="text-blue-600 text-xl" />,
        title: (
          <>
            Black{" "}
           
          </>
        ),
        desc: "More money in your pocket with Black app",
      },
    ],
    Enterprise: [
      {
        icon: <HiOutlineDocumentText className="text-blue-600 text-xl" />,
        title: "Clear e-Invoicing",
        desc: "Automate invoice compliance at scale",
      },
      {
        icon: <FaBuilding className="text-blue-600 text-xl" />,
        title: "ClearGST",
        desc: "Simplify all GST returns for your business",
      },
      {
        icon: <HiOutlineBriefcase className="text-blue-600 text-xl" />,
        title: "ClearPro",
        desc: "Advanced software for accounting professionals",
      },
      {
        icon: <MdOutlineSupportAgent className="text-blue-600 text-xl" />,
        title: "Expert Assistance",
        desc: "On-demand compliance support for enterprises",
      },
    ],
    Organization: [
      {
        icon: <HiOutlineBriefcase className="text-blue-600 text-xl" />,
        title: "TaxCloud",
        desc: "Smart ITR software for tax professionals",
      },
      {
        icon: <HiOutlineDocumentText className="text-blue-600 text-xl" />,
        title: "ClearGST Pro",
        desc: "Faster GST filing for your clients",
      },
      {
        icon: <MdOutlineSupportAgent className="text-blue-600 text-xl" />,
        title: "Client Management",
        desc: "Collaborate efficiently with clients in one dashboard",
      },
    ],
    SMEs: [
      {
        icon: <FaBuilding className="text-blue-600 text-xl" />,
        title: "Clear e-Invoicing",
        desc: "Simplify invoice generation and tracking",
      },
      {
        icon: <HiOutlineDocumentText className="text-blue-600 text-xl" />,
        title: "ClearGST",
        desc: "Manage all your GST filings easily",
      },
      {
        icon: <MdOutlineSupportAgent className="text-blue-600 text-xl" />,
        title: "Assisted Filing",
        desc: "Let experts handle compliance while you grow",
      },
    ],
  };

  return (
    <section className="bg-white py-14 relative">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h1
            id="section-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-gray-900 mb-4 relative inline-block"
          >
            Made for everyone
            {/* Blue underline bar animation */}
            {showBar && (
              <span className="block w-24 h-1 bg-blue-600 mx-auto mt-3 transition-all duration-500"></span>
            )}
          </h1>
          <p className="text-lg text-gray-600 pt-5 leading-relaxed">
            Whether you're just starting out or running a growing business,
            we're here to make legal work simple and effortless.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center border-b  rounded-2xl bg-gray-50 border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-6 py-3 font-medium text-xl font-serif transition-colors border-b-2 ${
                activeTab === tab.name
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-900 border-transparent hover:text-blue-600"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="md:col-span-2 grid sm:grid-cols-2 gap-2 mt-10">
          {tabContent[activeTab].map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-blue-50 transition"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
                {item.icon}
              </div>
              <div>
                <h3 className="text-gray-900 font-semibold text-xl">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-lg mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
}


