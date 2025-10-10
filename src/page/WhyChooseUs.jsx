import React from "react";
import { FaMoneyCheckAlt, FaShieldAlt, FaUserTie, FaLock, FaChartLine, FaBolt } from "react-icons/fa";

export default function WhyChooseUs() {
  const cards = [
    { 
      title: "Transparent Pricing", 
      desc: "No hidden fees or surprises. Clear, upfront pricing for all our services.", 
      icon: <FaMoneyCheckAlt className="text-blue-500" />,
      color: "blue"
    },
    { 
      title: "Accurate & Reliable", 
      desc: "We ensure precision in every process with guaranteed accuracy.", 
      icon: <FaShieldAlt className="text-green-500" />,
      color: "green"
    },
    { 
      title: "Expert Support", 
      desc: "Our professionals are here to help you 24/7 with dedicated assistance.", 
      icon: <FaUserTie className="text-purple-500" />,
      color: "purple"
    },
    { 
      title: "100% Data Privacy", 
      desc: "Your information stays completely secure with enterprise-grade security.", 
      icon: <FaLock className="text-red-500" />,
      color: "red"
    },
    { 
      title: "Max Tax Saving", 
      desc: "Smart strategies and expert guidance to help you save more on taxes.", 
      icon: <FaChartLine className="text-orange-500" />,
      color: "orange"
    },
    { 
      title: "Fast & Efficient", 
      desc: "Quick turnaround times without compromising on quality or accuracy.", 
      icon: <FaBolt className="text-yellow-500" />,
      color: "yellow"
    },
  ];

  const colorMap = {
    blue: "from-blue-50 to-blue-100 border-blue-200",
    green: "from-green-50 to-green-100 border-green-200",
    purple: "from-purple-50 to-purple-100 border-purple-200",
    red: "from-red-50 to-red-100 border-red-200",
    orange: "from-orange-50 to-orange-100 border-orange-200",
    yellow: "from-yellow-50 to-yellow-100 border-yellow-200"
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Section */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Why Choose <span className="text-blue-600">AuditFiling</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Experience the difference with our professional approach and comprehensive legal solutions. 
              Our expertise covers end-to-end solutions to simplify your business and legal processes 
              with unmatched precision and care.
            </p>
            
            {/* Stats Section */}
           <div className="flex justify-center gap-3 pt-6 text-center">
  <div>
    <div className="text-3xl font-bold text-blue-600">99%</div>
    <div className="text-sm text-gray-500 mt-1">Client Satisfaction</div>
  </div>
  <div>
    <div className="text-3xl font-bold text-blue-600">500+</div>
    <div className="text-sm text-gray-500 mt-1">Businesses Served</div>
  </div>
</div>
          </div>

          {/* Right Section - Staggered Layout */}
          <div className="space-y-6">
            {/* First Row - 3 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {cards.slice(0, 3).map((card, index) => (
                <Card key={index} card={card} colorMap={colorMap} />
              ))}
            </div>

            {/* Second Row - 2 Cards (Offset) */}
            <div className="flex justify-center sm:justify-start">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md sm:max-w-full sm:ml-12 mr-10">
                {cards.slice(3, 5).map((card, index) => (
                  <Card key={index + 3} card={card} colorMap={colorMap} />
                ))}
              </div>
            </div>

            {/* Third Row - 1 Card (Centered) */}
            <div className="flex justify-center">
              <div className="w-1/2">
                {cards.slice(5, 6).map((card, index) => (
                  <Card key={index + 5} card={card} colorMap={colorMap} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Reusable Card Component
function Card({ card, colorMap }) {
  return (
    <div
      className={`group p-5 rounded-2xl bg-gradient-to-br ${colorMap[card.color]} border-transparent hover:border-current transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="flex-shrink-0 p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
          <div className="text-xl">
            {card.icon}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2 text-sm">
            {card.title}
          </h3>
          <p className="text-gray-600 text-xs leading-relaxed">
            {card.desc}
          </p>
        </div>
      </div>
    </div>
  );
}