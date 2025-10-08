import React from "react";
import { 
  FaLock, FaMoneyBillWave, FaCheckCircle, FaUserGraduate,
  FaBuilding, FaReceipt, FaUserFriends, FaHome
} from "react-icons/fa";

// Data
const whyChooseUsFeatures = [
  { icon: <FaLock className="text-white text-2xl" />, title: "Confidential & Safe", description: "Complete safety of documents and client data.", bg: "bg-gradient-to-r from-blue-600 to-indigo-700" },
  { icon: <FaMoneyBillWave className="text-white text-2xl" />, title: "No Hidden Fee", description: "We maintain transparency without hidden charges.", bg: "bg-gradient-to-r from-emerald-500 to-teal-600" },
  { icon: <FaCheckCircle className="text-white text-2xl" />, title: "Guaranteed Satisfaction", description: "Dedicated services guarantee client satisfaction.", bg: "bg-gradient-to-r from-amber-500 to-orange-600" },
  { icon: <FaUserGraduate className="text-white text-2xl" />, title: "Expert CA/CS Assistance", description: "Professional assistance from in-house CA/CS experts.", bg: "bg-gradient-to-r from-purple-600 to-pink-700" },
  { icon: <FaBuilding className="text-white text-2xl" />, title: "Company Incorporation & Compliance", description: "End-to-end company registration, ROC filing, and compliance.", bg: "bg-slate-800" },
  { icon: <FaReceipt className="text-white text-2xl" />, title: "GST Registration & Filing", description: "Complete GST solutions including registration and audit support.", bg: "bg-blue-700" },
  { icon: <FaUserFriends className="text-white text-2xl" />, title: "Employee Compliance (PF/ESI/Labour)", description: "Comprehensive HR compliance management.", bg: "bg-emerald-600" },
  { icon: <FaHome className="text-white text-2xl" />, title: "Property Documentation & Disputes", description: "Expert assistance with property registration and legal dispute resolution.", bg: "bg-amber-600" },
];


  


// Reusable FeatureGrid Component
function FeatureGrid({ title, features }) {
  return (
    <section className="py-12 px-4 mt-20">
      <div className="text-center mb-12 font-serif">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
          {title}
        </h2>
        <p className="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">
          {title === "Why Choose AuditFiling"
            ? "Experience the difference with our professional approach and comprehensive legal solutions."
            : "Our expertise covers end-to-end solutions to simplify your business and legal processes."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-transform duration-300 hover:scale-105"
          >
            <div
              className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center flex-shrink-0 shadow-md`}
            >
              {feature.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-lg mb-1 font-serif">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Main Component
export default function WhyChoose() {
  return (
    <div className="bg-white">
      <FeatureGrid title="Why Choose AuditFiling" features={whyChooseUsFeatures} />
    </div>
  );
}
