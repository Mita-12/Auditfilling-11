import React, { useEffect, useState } from "react";
import { FaBell, FaCalendarAlt, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

export default function NotificationUpdates() {
  const [activeTab, setActiveTab] = useState("updates");

  // Optional: Smooth auto-scroll effect for updates
  useEffect(() => {
    if (activeTab !== "updates") return;
    const interval = setInterval(scroll, 50);
    return () => clearInterval(interval);
  }, [activeTab]);

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
      priority: "high",
      category: "TDS"
    },
    { 
      id: 2,
      text: "Professional Tax (PT) on Salaries for April 2025", 
      date: "10-May-2025",
      priority: "medium",
      category: "PT"
    },
    { 
      id: 3,
      text: "GSTR 1 (Monthly) for April 2025", 
      date: "11-May-2025",
      priority: "high",
      category: "GST"
    },
    { 
      id: 4,
      text: "GSTR 1 IFF (Optional) (Apr 2025) for QRMP", 
      date: "13-May-2025",
      priority: "low",
      category: "GST"
    },
    { 
      id: 5,
      text: "Provident Fund (PF) & ESI Returns and Payment for April 2025", 
      date: "15-May-2025",
      priority: "high",
      category: "PF/ESI"
    },
    { 
      id: 6,
      text: "GSTR 3B for April 2025 (Monthly)", 
      date: "20-May-2025",
      priority: "high",
      category: "GST"
    },
    { 
      id: 7,
      text: "TDS Return in Form 24Q, 26Q, and 27Q for Jan-Mar 2025", 
      date: "31-May-2025",
      priority: "medium",
      category: "TDS"
    },
    { 
      id: 8,
      text: "Advance tax Payment for April to June 2025 (1st Installment)", 
      date: "15-Jun-2025",
      priority: "medium",
      category: "Income Tax"
    },
    { 
      id: 9,
      text: "Provident Fund (PF) & ESI Returns and Payment for May 2025", 
      date: "15-Jun-2025",
      priority: "high",
      category: "PF/ESI"
    },
  ];

  
  const getCategoryColor = (category) => {
    const colors = {
      "GST": "bg-purple-100 text-purple-800",
      "MCA": "bg-blue-100 text-blue-800",
      "TDS": "bg-green-100 text-green-800",
      "Income Tax": "bg-red-100 text-red-800",
      "PT": "bg-yellow-100 text-yellow-800",
      "PF/ESI": "bg-indigo-100 text-indigo-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <FaBell className="text-2xl text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
            Notifications & Alerts
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with important compliance deadlines and regulatory changes
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab("updates")}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 font-semibold transition-colors ${
              activeTab === "updates"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <FaInfoCircle />
            Updates & Alerts
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
              {updates.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("dueDates")}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 font-semibold transition-colors ${
              activeTab === "dueDates"
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <FaCalendarAlt />
            Due Dates
            <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
              {dueDates.length}
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden">
          {/* Updates Tab */}
          {activeTab === "updates" && (
            <div
              // ref={scrollRef}
              className="h-96 overflow-y-auto scroll-smooth p-6 space-y-4"
            >
              {updates.map((update) => (
                <div
                  key={update.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start gap-3">
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(update.category)}`}>
                          {update.category}
                        </span>
                        <span className="text-xs text-gray-500">{update.timestamp}</span>
                        {update.type === "urgent" && (
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                            Urgent
                          </span>
                        )}
                      </div>
                      <p className="text-gray-800 leading-relaxed">
                        {update.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Due Dates Tab */}
          {activeTab === "dueDates" && (
            <div className="h-96 overflow-y-auto scroll-smooth p-6 space-y-4">
              {dueDates.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                       
                      </div>
                      <p className="text-gray-800 font-medium mb-2">
                        {item.text}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-semibold text-red-600 mb-1">
                        Due Date
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {item.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

    
      </div>
    </section>
  );
}