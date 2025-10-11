import React from "react";


import { FaBell, FaCalendarAlt, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";



export default function NotificationUpdates() {
  // Updates with categories
  const updates = [
    {
      id: 1,
      text: "Opted for GST composition scheme? File GSTR-4 on or before 30.04.25 to be compliant!",
      category: "GST",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      text: "GSTR-3B Due Date is Approaching! File returns on or before 20.04.2025 & be compliant.",
      category: "GST",
      timestamp: "5 hours ago"
    },
    {
      id: 3,
      text: "Attention GST Composition Taxpayers! Form CMP-08 for Q4 is due on 18.04.2025 - Act now!",
      category: "GST",
      timestamp: "1 day ago"
    },
    {
      id: 4,
      text: "From April 2025, all GST taxpayers must report HSN codes in Table 12 of GSTR-1/1A!",
      category: "GST",
      timestamp: "2 days ago"
    },
    {
      id: 5,
      text: "MCA imposes ₹7 lakh penalty on company for failing to maintain its registered office!",
      category: "MCA",
      timestamp: "3 days ago"
    },
    {
      id: 6,
      text: "National Savings Scheme account holders can now withdraw funds without TDS!",
      category: "Income Tax",
      timestamp: "4 days ago"
    },
    {
      id: 7,
      text: "MCA issues show cause notice to companies for cost audit non-compliance - Act now!",
      category: "MCA",
      timestamp: "5 days ago"
    },
  ];

  // Due Dates with priority
  const dueDates = [
    { 
      id: 1,
      text: "TDS Payment for March 2025", 
      date: "30-Apr-2025",
      category: "TDS"
    },
    { 
      id: 2,
      text: "Professional Tax (PT) on Salaries for April 2025", 
      date: "10-May-2025",
      category: "PT"
    },
    { 
      id: 3,
      text: "GSTR 1 (Monthly) for April 2025", 
      date: "11-May-2025",
      category: "GST"
    },
    { 
      id: 4,
      text: "GSTR 1 IFF (Optional) (Apr 2025) for QRMP", 
      date: "13-May-2025",
      category: "GST"
    },
    { 
      id: 5,
      text: "Provident Fund (PF) & ESI Returns and Payment for April 2025", 
      date: "15-May-2025",
      category: "PF/ESI"
    },
    { 
      id: 6,
      text: "GSTR 3B for April 2025 (Monthly)", 
      date: "20-May-2025",
      category: "GST"
    },
    { 
      id: 7,
      text: "TDS Return in Form 24Q, 26Q, and 27Q for Jan-Mar 2025", 
      date: "31-May-2025",
      category: "TDS"
    },
    { 
      id: 8,
      text: "Advance tax Payment for April to June 2025 (1st Installment)", 
      date: "15-Jun-2025",
      category: "Income Tax"
    },
    { 
      id: 9,
      text: "Provident Fund (PF) & ESI Returns and Payment for May 2025", 
      date: "15-Jun-2025",
      category: "PF/ESI"
    },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      "GST": "bg-purple-100 text-purple-800 border-purple-200",
      "MCA": "bg-blue-100 text-blue-800 border-blue-200",
      "TDS": "bg-green-100 text-green-800 border-green-200",
      "Income Tax": "bg-red-100 text-red-800 border-red-200",
      "PT": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "PF/ESI": "bg-indigo-100 text-indigo-800 border-indigo-200"
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

 

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <FaBell className="text-2xl text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
            Notifications & Alerts
                          <span className="block w-24 h-1 bg-blue-600 mx-auto mt-3 transition-all duration-500"></span>

          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with important compliance deadlines and regulatory changes
          </p>
        </div>

        {/* Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          
          {/* Left Column - Updates */}
          <div className=" rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className=" p-6">
              <div className="flex items-center gap-3 ">
                <FaBell className="text-xl" />
                <h3 className="text-xl font-bold font-serif">Latest Updates</h3>
              </div>
              <p className="text-blue-800 text-sm mt-1">
                Recent regulatory changes and announcements
              </p>
            </div>
            
            <div className="h-96 overflow-y-auto scroll-smooth p-6 space-y-4">
              {updates.map((update) => (
                <div
                  key={update.id}
                  className="bg-white rounded-xl p-2 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 "
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getCategoryColor(update.category)}`}>
                          {update.category}
                        </span>
                        <span className="text-xs text-gray-500">{update.timestamp}</span>
                      </div>
                      <p className="text-gray-800 leading-relaxed text-sm">
                        {update.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Due Dates */}
          <div className=" rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className=" p-6">
              <div className="flex items-center gap-3 ">
                <FaCalendarAlt className="text-xl" />
                <h3 className="text-xl font-bold font-serif">Due Dates</h3>
              </div>
              <p className="text-blue-800 text-sm mt-1">
                Upcoming compliance deadlines and filings
              </p>
            </div>
            
            <div className="h-96 overflow-y-auto scroll-smooth p-6 space-y-4">
              {dueDates.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl p-3 shadow-sm border hover:shadow-md transition-all duration-200 ${
                    item.priority === "high" 
                      ? "border-red-200 hover:border-red-300" 
                      : item.priority === "medium"
                      ? "border-yellow-200 hover:border-yellow-300"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                        <div className="flex items-center gap-1">
                         
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            item.priority === "high" 
                              ? "bg-red-100 text-red-700 border border-red-200"
                              : item.priority === "medium"
                              ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                              : "bg-gray-100 text-gray-700 border border-gray-200"
                          }`}>
                            {item.priority}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-800 font-medium mb-2 text-sm">
                        {item.text}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 min-w-24">
                      <div className="text-xs font-semibold text-red-600 mb-1 uppercase tracking-wide">
                        Due Date
                      </div>
                      <div className="text-base font-bold text-gray-900">
                        {item.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Last updated: {new Date().toLocaleDateString('en-IN', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
// import React, { useEffect, useRef } from "react";
// import { FaBell, FaExclamationTriangle, FaCalendarAlt } from "react-icons/fa";

// const NotificationUpdates = () => {
//   const updates = [
//     "Opted for GST composition scheme? File GSTR-4 on or before 30.04.25 to be compliant!",
//     "GSTR-3B Due Date is Approaching! File returns on or before 20.04.2025 & be compliant.",
//     "Attention GST Composition Taxpayers! Form CMP-08 for Q4 is due on 18.04.2025- Act now!",
//     "From April 2025, all GST taxpayers must report HSN codes in Table 12 of GSTR-1/1A!",
//     "MCA imposes ₹7 lakh penalty on company for failing to maintain its registered office!",
//     "National Savings Scheme account holders can now withdraw funds without TDS!",
//     "MCA issues show cause notice to companies for cost audit non-compliance - Act now!"
//   ];

//   const dueDates = [
//     { text: "TDS Payment for March 2025", date: "30-Apr-2025" },
//     { text: "Professional Tax (PT) on Salaries for April 2025", date: "10-May-2025" },
//     { text: "GSTR 1 (Monthly) for April 2025", date: "11-May-2025" },
//     { text: "GSTR 1 IFF (Optional) (Apr 2025) for QRMP", date: "13-May-2025" },
//     { text: "Provident Fund (PF) & ESI Returns and Payment for April 2025", date: "15-May-2025" },
//     { text: "GSTR 3B for April 2025 (Monthly)", date: "20-May-2025" },
//     { text: "TDS Return in Form 24Q, 26Q, and 27Q for Jan-Mar 2025", date: "31-May-2025" },
//     { text: "Advance tax Payment for April to June 2025 (1st Installment)", date: "15-Jun-2025" },
//     { text: "Provident Fund (PF) & ESI Returns and Payment for May 2025", date: "15-Jun-2025" }
//   ];

//   const createScroller = (ref) => {
//     const scroller = ref.current;
//     if (!scroller) return;

//     const content = scroller.querySelector(".scroller-content");
//     const clone = content.cloneNode(true);
//     scroller.appendChild(clone);

//     let scrollPosition = 0;

//     const scroll = () => {
//       scrollPosition += 0.3; // adjust speed (lower = slower, higher = faster)
//       if (scrollPosition >= content.scrollHeight) {
//         scrollPosition = 0;
//       }
//       scroller.scrollTop = scrollPosition;
//       requestAnimationFrame(scroll);
//     };

//     requestAnimationFrame(scroll);
//   };

//   const scrollerRef1 = useRef(null);
//   const scrollerRef2 = useRef(null);

//   useEffect(() => {
//     createScroller(scrollerRef1);
//     createScroller(scrollerRef2);
//   }, []);

//   return (
//     <div className="px-4 py-12">
//       {/* Header */}
//       <div className="text-center mb-12">
//         <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
//           <FaBell className="text-2xl text-blue-600" />
//         </div>
//         <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
//           Notifications & Alerts
//         </h2>
//         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//           Stay updated with important compliance deadlines and regulatory changes
//         </p>
//       </div>

//       <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Left Column - Updates & Alerts */}
//           <div className="bg-white rounded-lg">
//             <div className="flex items-center justify-center mb-6">
//               <div className="inline-flex items-center space-x-3">
//                 <FaExclamationTriangle className="text-2xl text-orange-500" />
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   Updates & Alerts
//                 </h2>
//               </div>
//             </div>
//             <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 overflow-hidden">
//               <div ref={scrollerRef1} className="scroller h-64 overflow-hidden">
//                 <div className="scroller-content space-y-4">
//                   {updates.map((update, index) => (
//                     <div key={index} className="flex items-start">
//                       <div className="flex-shrink-0 w-6 h-6 text-black tex-xl  flex items-center justify-center  font-bold mr-3 mt-0.5">
//                         {index + 1}
//                       </div>
//                       <p className="text-gray-700 leading-relaxed flex-1">
//                         {update}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Due Dates */}
//           <div className="bg-white rounded-lg">
//             <div className="flex items-center justify-center mb-6">
//               <div className="inline-flex items-center space-x-3">
//                 <FaCalendarAlt className="text-2xl text-blue-500" />
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   Due Dates
//                 </h2>
//               </div>
//             </div>
//             <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 overflow-hidden">
//               <div ref={scrollerRef2} className="scroller h-64 overflow-hidden">
//                 <div className="scroller-content space-y-4">
//                   {dueDates.map((dueDate, index) => (
//                     <div key={index} className="flex items-start">
//                       <div className="flex-shrink-0 w-6 h-6  text-black tex-xl rounded-full flex items-center justify-center  font-bold mr-3 mt-0.5">
//                         {index + 1}
//                       </div>
//                       <p className="text-gray-700 leading-relaxed flex-1">
//                         {dueDate.text}.{" "}
//                         <span className="text-red-500 font-semibold">
//                           Due Date: {dueDate.date}
//                         </span>
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotificationUpdates;