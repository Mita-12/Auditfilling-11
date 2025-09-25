// import React, { useEffect, useState, useRef } from "react";

// // TypesOfTaxesIndia.jsx
// // Single-file React component styled with Tailwind CSS
// // Behavior implemented: sticky TOC, smooth scroll, scroll-spy active state,
// // accordions for FAQs, and responsive layout (desktop aside + mobile TOC)

// export default function Cleartax () {
//   const sections = [
//     { id: "overview", title: "Overview" },
//     { id: "direct-taxes", title: "Direct Taxes" },
//     { id: "income-tax", title: "Income Tax" },
//     { id: "corporate-tax", title: "Corporate Tax" },
//     { id: "capital-gains", title: "Capital Gains Tax" },
//     { id: "securities-transaction-tax", title: "Securities Transaction Tax (STT)" },
//     { id: "indirect-taxes", title: "Indirect Taxes" },
//     { id: "goods-and-services-tax", title: "Goods & Services Tax (GST)" },
//     { id: "customs-duty", title: "Customs Duty" },
//     { id: "excise-duty", title: "Excise Duty" },
//     { id: "difference", title: "Direct vs Indirect: Quick Comparison" },
//     { id: "faqs", title: "FAQs" }
//   ];

//   const [activeId, setActiveId] = useState(sections[0].id);
//   const [openFaq, setOpenFaq] = useState(null);
//   const contentRef = useRef(null);

//   useEffect(() => {
//     const observerOptions = {
//       root: null,
//       rootMargin: "-20% 0px -50% 0px",
//       threshold: 0
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) setActiveId(entry.target.id);
//       });
//     }, observerOptions);

//     const nodes = Array.from(document.querySelectorAll("[data-article-section]"));
//     nodes.forEach((n) => observer.observe(n));

//     return () => observer.disconnect();
//   }, []);

//   function scrollToId(id) {
//     const el = document.getElementById(id);
//     if (!el) return;
//     window.history.replaceState(null, "", `#${id}`);
//     el.scrollIntoView({ behavior: "smooth", block: "start" });
//   }

//   function copyLink(id) {
//     const url = `${window.location.origin}${window.location.pathname}#${id}`;
//     navigator.clipboard
//       .writeText(url)
//       .then(() => alert("Link copied to clipboard"))
//       .catch(() => alert("Could not copy link"));
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header / Hero */}
//       <header className="bg-white border-b">
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <h1 className="text-3xl md:text-4xl font-bold">Types of Taxes in India — Direct & Indirect</h1>
//           <p className="mt-2 text-gray-600">A clear, structured guide to the major taxes in India and how they differ.</p>
//         </div>
//       </header>

//       <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
//         {/* Sidebar / TOC */}
//         <aside className="hidden lg:block sticky top-24 h-[70vh] overflow-auto">
//           <div className="bg-white border rounded-lg p-4 shadow-sm">
//             <h3 className="font-semibold mb-3">On this page</h3>
//             <nav className="space-y-2">
//               {sections.map((s) => (
//                 <button
//                   key={s.id}
//                   onClick={() => scrollToId(s.id)}
//                   className={`w-full text-left text-sm px-2 py-1 rounded-md transition-colors hover:bg-gray-100 ${
//                     activeId === s.id ? "bg-indigo-50 font-medium text-indigo-700" : "text-gray-700"
//                   }`}
//                 >
//                   {s.title}
//                 </button>
//               ))}
//             </nav>

//             <div className="mt-4 pt-4 border-t text-sm text-gray-500">
//               <p>Last updated: <span className="font-medium text-gray-700">{new Date().toLocaleDateString()}</span></p>
//             </div>
//           </div>
//         </aside>

//         {/* Content */}
//         <article ref={contentRef} className="prose prose-lg max-w-none"> 
//           {/* Overview */}
//           <section id="overview" data-article-section className="mb-8">
//             <div className="flex items-start justify-between">
//               <h2 className="text-2xl font-semibold">Overview</h2>
//               <div className="flex gap-2">
//                 <button onClick={() => window.print()} className="text-sm px-3 py-1 border rounded-md">Print</button>
//               </div>
//             </div>
//             <p>
//               Taxes in India broadly fall into two categories: <strong>Direct taxes</strong> — levied directly on people and
//               organisations (like income tax and corporate tax), and <strong>Indirect taxes</strong> — levied on goods and
//               services (like GST, customs duty). This page summarises the common types and differences.
//             </p>
//           </section>

//           {/* Direct Taxes Section */}
//           <section id="direct-taxes" data-article-section className="mb-8">
//             <h2 className="text-2xl font-semibold">Direct Taxes</h2>
//             <p className="mt-2">Direct taxes are paid directly to the government by the taxpayer. They cannot be shifted to another person.</p>

//             <div className="mt-4 grid md:grid-cols-2 gap-4">
//               <div className="bg-white border rounded-lg p-4 shadow-sm">
//                 <h3 className="font-semibold">Income Tax</h3>
//                 <p className="text-sm text-gray-600 mt-2">Tax on an individual or entity's income. Includes tax on salaries, profits, house property, etc.</p>
//                 <div className="mt-3 text-sm">
//                   <button onClick={() => scrollToId('income-tax')} className="underline">Read more →</button>
//                 </div>
//               </div>

//               <div className="bg-white border rounded-lg p-4 shadow-sm">
//                 <h3 className="font-semibold">Corporate Tax</h3>
//                 <p className="text-sm text-gray-600 mt-2">Tax levied on the income or profits of companies incorporated in India and under certain conditions, those outside India as well.</p>
//                 <div className="mt-3 text-sm">
//                   <button onClick={() => scrollToId('corporate-tax')} className="underline">Read more →</button>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Income Tax Details */}
//           <section id="income-tax" data-article-section className="mb-8">
//             <h3 className="text-xl font-semibold">Income Tax</h3>
//             <p className="mt-2">Income tax applies to individuals, HUFs, companies, firms and other entities. India follows progressive tax slabs for individuals.</p>
//             <ul className="list-disc ml-6 mt-3 text-sm">
//               <li>Scope: Salary, house property, business/profession, capital gains, other sources.</li>
//               <li>Deductions: Section 80C, 80D, and other exemptions reduce taxable income.</li>
//               <li>Filing: Annual returns (ITR) are filed electronically with the Income Tax Department.</li>
//             </ul>
//           </section>

//           {/* Corporate Tax Details */}
//           <section id="corporate-tax" data-article-section className="mb-8">
//             <h3 className="text-xl font-semibold">Corporate Tax</h3>
//             <p className="mt-2">Corporate tax rates depend on the type and turnover of the company and chosen regimes (existing vs concessional rates with conditions).</p>
//             <ul className="list-disc ml-6 mt-3 text-sm">
//               <li>Includes Minimum Alternate Tax (MAT) in certain cases.</li>
//               <li>Companies must file returns and pay advance tax if applicable.</li>
//             </ul>
//           </section>

//           {/* Capital Gains */}
//           <section id="capital-gains" data-article-section className="mb-8">
//             <h3 className="text-xl font-semibold">Capital Gains Tax</h3>
//             <p className="mt-2">Taxes on profits arising from the sale of capital assets such as property or shares. Classified as short-term or long-term based on holding period.</p>
//           </section>

//           {/* STT */}
//           <section id="securities-transaction-tax" data-article-section className="mb-8">
//             <h3 className="text-xl font-semibold">Securities Transaction Tax (STT)</h3>
//             <p className="mt-2">STT is levied on transactions in securities traded on recognised stock exchanges in India. It is collected by the exchange and paid to the government.</p>
//           </section>

//           {/* Indirect Taxes Section */}
//           <section id="indirect-taxes" data-article-section className="mb-8">
//             <h2 className="text-2xl font-semibold">Indirect Taxes</h2>
//             <p className="mt-2">Indirect taxes are levied on transactions and can be passed on to the final consumer. Major indirect taxes include GST, customs duty, and (historically) excise & service tax.</p>

//             <div className="mt-4 grid md:grid-cols-2 gap-4">
//               <div className="bg-white border rounded-lg p-4 shadow-sm">
//                 <h3 className="font-semibold">Goods & Services Tax (GST)</h3>
//                 <p className="text-sm text-gray-600 mt-2">A destination-based tax that subsumed many central and state indirect taxes. It has CGST, SGST (intra-state) and IGST (inter-state) components.</p>
//                 <div className="mt-3 text-sm">
//                   <button onClick={() => scrollToId('goods-and-services-tax')} className="underline">Read more →</button>
//                 </div>
//               </div>

//               <div className="bg-white border rounded-lg p-4 shadow-sm">
//                 <h3 className="font-semibold">Customs Duty</h3>
//                 <p className="text-sm text-gray-600 mt-2">Levied on imports (and some exports) of goods. Rates depend on tariff classification and trade policy.</p>
//                 <div className="mt-3 text-sm">
//                   <button onClick={() => scrollToId('customs-duty')} className="underline">Read more →</button>
//                 </div>
//               </div>
//             </div>
//           </section>

//           <section id="goods-and-services-tax" data-article-section className="mb-8">
//             <h3 className="text-xl font-semibold">Goods & Services Tax (GST)</h3>
//             <p className="mt-2">GST replaced multiple taxes like central excise duty, service tax, VAT, etc., and brought a unified tax structure for the supply of goods and services.</p>
//             <ul className="list-disc ml-6 mt-3 text-sm">
//               <li>Composition scheme for small taxpayers.</li>
//               <li>Input Tax Credit mechanism to avoid tax-on-tax.</li>
//               <li>Return filing: GSTR-1, GSTR-3B and other forms as applicable.</li>
//             </ul>
//           </section>

//           <section id="customs-duty" data-article-section className="mb-8">
//             <h3 className="text-xl font-semibold">Customs Duty</h3>
//             <p className="mt-2">Customs duty applies on import (and certain export) of goods. It is a key tool for trade policy and revenue collection.</p>
//           </section>

//           <section id="excise-duty" data-article-section className="mb-8">
//             <h3 className="text-xl font-semibold">Excise Duty</h3>
//             <p className="mt-2">Historically applied on manufacture of goods in India; many of its functions have been subsumed by GST but certain specific excise levies still exist (e.g., on petroleum products before they were brought under GST).</p>
//           </section>

//           {/* Comparison Table */}
//           <section id="difference" data-article-section className="mb-8">
//             <h2 className="text-2xl font-semibold">Direct vs Indirect: Quick Comparison</h2>
//             <div className="mt-4 overflow-auto">
//               <table className="w-full text-sm border-collapse">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="p-3 text-left">Feature</th>
//                     <th className="p-3 text-left">Direct Tax</th>
//                     <th className="p-3 text-left">Indirect Tax</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr className="border-t">
//                     <td className="p-3">Who pays</td>
//                     <td className="p-3">Directly by the taxpayer</td>
//                     <td className="p-3">Collected from buyer by seller</td>
//                   </tr>
//                   <tr className="border-t bg-white">
//                     <td className="p-3">Transferability</td>
//                     <td className="p-3">Non-transferable</td>
//                     <td className="p-3">Transferable (passed to consumer)</td>
//                   </tr>
//                   <tr className="border-t bg-gray-50">
//                     <td className="p-3">Examples</td>
//                     <td className="p-3">Income tax, corporate tax</td>
//                     <td className="p-3">GST, customs duty</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </section>

//           {/* FAQs with accordion */}
//           <section id="faqs" data-article-section className="mb-12">
//             <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
//             <div className="mt-4 space-y-3">
//               {[
//                 {
//                   q: "What is the main difference between direct and indirect tax?",
//                   a: "Direct tax is paid directly to the government by the taxpayer (e.g., income tax). Indirect tax is collected by an intermediary from the consumer (e.g., GST)."
//                 },
//                 {
//                   q: "Does GST replace all indirect taxes?",
//                   a: "GST consolidated most, but not all, indirect taxes. Certain cesses and tariffs (e.g., customs) remain outside GST's scope."
//                 },
//                 {
//                   q: "Who is responsible for filing taxes?",
//                   a: "Individuals and businesses must file their own returns. Businesses collect indirect taxes from customers and remit them to the government."
//                 }
//               ].map((item, idx) => (
//                 <div key={idx} className="bg-white border rounded-lg overflow-hidden">
//                   <button
//                     onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
//                     className="w-full text-left px-4 py-3 flex items-center justify-between"
//                   >
//                     <span className="font-medium">{item.q}</span>
//                     <span className="text-sm text-gray-500">{openFaq === idx ? "−" : "+"}</span>
//                   </button>

//                   {openFaq === idx && (
//                     <div className="px-4 pb-4 text-sm text-gray-700">{item.a}</div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </section>

//           <footer className="py-8 text-sm text-gray-600">
//             <p>Last reviewed on <strong>{new Date().toLocaleDateString()}</strong>. This page is for informational purposes and does not constitute tax advice.</p>
//           </footer>
//         </article>

//         {/* Mobile TOC (bottom) */}
//         <div className="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-3xl">
//           <div className="bg-white border rounded-lg p-3 shadow-md flex items-center justify-between">
//             <div className="text-sm font-medium">On this page</div>
//             <div className="flex gap-2">
//               <button onClick={() => scrollToId('overview')} className="text-sm px-3 py-1 border rounded">Overview</button>
//               <button onClick={() => scrollToId('direct-taxes')} className="text-sm px-3 py-1 border rounded">Direct</button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
