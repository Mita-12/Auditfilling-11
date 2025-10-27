

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FaUser, FaBuilding, FaSuitcase, FaTruck } from "react-icons/fa";
// import { HiOutlineDocumentText, HiOutlineBriefcase } from "react-icons/hi";
// import { MdOutlineSupportAgent } from "react-icons/md";

// export default function Auditfile() {
//   const [activeTab, setActiveTab] = useState("Organization");
//   const [showBar, setShowBar] = useState(false);

//   useEffect(() => {
//     if (activeTab === "Organization") {
//       setShowBar(true);
//     } else {
//       setShowBar(false);
//     }
//   }, [activeTab]);

//   const tabs = [
//     { name: "Organization", icon: <FaSuitcase /> },
//     { name: "Enterprise", icon: <FaBuilding /> },
//     { name: "Startup", icon: <FaTruck /> },
//     { name: "Individuals", icon: <FaUser /> },


//   ];

//   const tabContent = {
//     Enterprise: [
//       {
//         icon: <HiOutlineDocumentText className="text-blue-600 text-xl" />,
//         title: "GST New Registration",
//         desc: "Register your enterprise for GST and compliance online.",
//         link: "/gst",
//       },
//       {
//         icon: <FaBuilding className="text-blue-600 text-xl" />,
//         title: "Trademark Registration",
//         desc: "Protect your business identity through trademark registration.",
//         link: "/trademark",
//       },
//       {
//         icon: <HiOutlineBriefcase className="text-blue-600 text-xl" />,
//         title: "MSME Registration",
//         desc: "Empower your enterprise with official MSME certification today.",
//         link: "/msme",
//       },
//       {
//         icon: <MdOutlineSupportAgent className="text-blue-600 text-xl" />,
//         title: "Trade License",
//         desc: "Get expert help for your business trade license.",
//         link: "/trade",
//       },
//       {
//         icon: <MdOutlineSupportAgent className="text-blue-600 text-xl" />,
//         title: "FSSAI Registration",
//         desc: "Get compliance assistance for food business FSSAI license.",
//         link: "/fssai",
//       },
//       {
//         icon: <MdOutlineSupportAgent className="text-blue-600 text-xl" />,
//         title: "Proprietorship Firm Registration",
//         desc: "Register your proprietorship firm with professional support.",
//         link: "/proprietorship",
//       },
//     ],

//     Individuals: [
//       {
//         icon: <HiOutlineDocumentText className="text-blue-600 text-xl" />,
//         title: "Salaried Individual",
//         desc: "File your income tax return securely with expert help.",
//         link: "/itr-filing-salaried",
//       },
//       {
//         icon: <MdOutlineSupportAgent className="text-blue-600 text-xl" />,
//         title: "Professionals",
//         desc: "Get expert tax and startup assistance for professionals.",
//         link: "/itr-filing-professionals",
//       },
//       {
//         icon: <FaUser className="text-blue-600 text-xl" />,
//         title: "Self Employed",
//         desc: "Manage personal taxes with ease and expert support.",
//         link: "/itr-filing-self-employed",
//       },
//       {
//         icon: <HiOutlineBriefcase className="text-blue-600 text-xl" />,
//         title: "HUF",
//         desc: "Simplify Hindu Undivided Family taxation and legal setup.",
//         link: "/huf-registration",
//       },
//     ],

//     Organization: [
//       {
//         icon: <HiOutlineBriefcase className="text-blue-600 text-xl" />,
//         title: "GST New Registration",
//         desc: "Register your organization under GST for legal compliance.",
//         link: "/gst-registration",
//       },
//       {
//         icon: <HiOutlineDocumentText className="text-blue-600 text-xl" />,
//         title: "New Company Registration",
//         desc: "Incorporate your company easily with complete documentation.",
//         link: "/company-registration",
//       },
//       {
//         icon: <MdOutlineSupportAgent className="text-blue-600 text-xl" />,
//         title: "PF and ESI Registration",
//         desc: "Register employees for PF and ESI with expert guidance.",
//         link: "/pf-esi-registration",
//       },
//       {
//         icon: <MdOutlineSupportAgent className="text-blue-600 text-xl" />,
//         title: "Trust Registration",
//         desc: "Get assistance to register your charitable or private trust.",
//         link: "/trust-registration",
//       },
//       {
//         icon: <MdOutlineSupportAgent className="text-blue-600 text-xl" />,
//         title: "Partnership Firm Registration",
//         desc: "Set up a legal partnership firm easily online today.",
//         link: "/partnership-firm-registration",
//       },
//       {
//         icon: <HiOutlineBriefcase className="text-blue-600 text-xl" />,
//         title: "MSME Registration",
//         desc: "Get MSME certification and unlock small business benefits.",
//         link: "/msme-registration",
//       },
//     ],

//     SMEs: [
//       {
//         icon: <FaBuilding className="text-blue-600 text-xl" />,
//         title: "GST Registration",
//         desc: "Simplify GST registration and compliance for small businesses.",
//         link: "/gst-registration",
//       },
//       {
//         icon: <HiOutlineDocumentText className="text-blue-600 text-xl" />,
//         title: "MSME Registration",
//         desc: "Apply for Udyam MSME registration for growth benefits.",
//         link: "/msme-registration",
//       },
//       {
//         icon: <HiOutlineDocumentText className="text-blue-600 text-xl" />,
//         title: "Trademark Registration",
//         desc: "Protect your SME’s brand identity through trademark registration.",
//         link: "/trademark-registration",
//       },
//       {
//         icon: <MdOutlineSupportAgent className="text-blue-600 text-xl" />,
//         title: "Trade License",
//         desc: "Get quick trade license approval for small enterprises.",
//         link: "/trade-license-registration",
//       },
//       {
//         icon: <MdOutlineSupportAgent className="text-blue-600 text-xl" />,
//         title: "FSSAI Registration",
//         desc: "Obtain FSSAI license for your SME food business easily.",
//         link: "/fssai-registration",
//       },
//       {
//         icon: <HiOutlineBriefcase className="text-blue-600 text-xl" />,
//         title: "GEM Registration",
//         desc: "Register your SME on Government e-Marketplace for sales.",
//         link: "/gem-registration",
//       },
//     ],
//   };



//   return (
//     <section className="bg-white py-14 relative">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Header */}
//         <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
//           <h1
//             id="section-title"
//             className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-gray-900 mb-4 relative inline-block"
//           >
//             Made for everyone
//             {/* Blue underline bar animation */}
//             {showBar && (
//               <span className="block w-24 h-1 bg-blue-600 mx-auto mt-3 transition-all duration-500"></span>
//             )}
//           </h1>
//           <p className="text-lg text-gray-600 pt-5 leading-relaxed">
//             Whether you're just starting out or running a growing business,
//             we're here to make legal work simple and effortless.
//           </p>
//         </div>

//         {/* Tabs */}
//         <div className="flex flex-wrap justify-center border-b  rounded-2xl bg-gray-50 border-gray-200">
//           {tabs.map((tab) => (
//             <button
//               key={tab.name}
//               onClick={() => setActiveTab(tab.name)}
//               className={`flex items-center gap-2 px-6 py-3 font-medium text-xl font-serif transition-colors border-b-2 ${activeTab === tab.name
//                   ? "text-blue-600 border-blue-600"
//                   : "text-gray-900 border-transparent hover:text-blue-600"
//                 }`}
//             >
//               <span className="text-lg">{tab.icon}</span>
//               {tab.name}
//             </button>
//           ))}
//         </div>

//         {/* Content */}


//         <div className="md:col-span-2 grid sm:grid-cols-3 gap-2 mt-10">
//           {tabContent[activeTab].map((item, idx) => (
//             <Link
//               key={idx}
//               to={item.link}
//               className="flex items-start gap-4 p-3 rounded-lg hover:bg-blue-50 transition group"
//             >
//               <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full group-hover:bg-blue-100 transition">
//                 {item.icon}
//               </div>
//               <div>
//                 <h3 className="text-gray-900 font-semibold text-xl group-hover:text-blue-600 transition">
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-500 text-lg mt-1">{item.desc}</p>
//               </div>
//             </Link>
//           ))}
//         </div>


//       </div>
//     </section>
//   );
// }
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaBuilding, FaSuitcase, FaTruck } from "react-icons/fa";
import { HiOutlineDocumentText, HiOutlineBriefcase } from "react-icons/hi";
import { MdOutlineSupportAgent } from "react-icons/md";

export default function Auditfile() {
  const [activeTab, setActiveTab] = useState("Organization");
  const [showBar, setShowBar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (activeTab === "Organization") {
      setShowBar(true);
    } else {
      setShowBar(false);
    }
  }, [activeTab]);

  const tabs = [
    { name: "Organization", icon: <FaSuitcase /> },
    { name: "Enterprise", icon: <FaBuilding /> },
    { name: "Startup", icon: <FaTruck /> },
    { name: "Individuals", icon: <FaUser /> },
  ];

  const tabContent = {
    Enterprise: [
      {
        icon: <HiOutlineDocumentText className="text-blue-600 text-lg sm:text-xl" />,
        title: "GST New Registration",
        desc: "Register your enterprise for GST and compliance online.",
        link: "/gst",
      },
      {
        icon: <FaBuilding className="text-blue-600 text-lg sm:text-xl" />,
        title: "Trademark Registration",
        desc: "Protect your business identity through trademark registration.",
        link: "/trademark",
      },
      {
        icon: <HiOutlineBriefcase className="text-blue-600 text-lg sm:text-xl" />,
        title: "MSME Registration",
        desc: "Empower your enterprise with official MSME certification today.",
        link: "/msme",
      },
      {
        icon: <MdOutlineSupportAgent className="text-blue-600 text-lg sm:text-xl" />,
        title: "Trade License",
        desc: "Get expert help for your business trade license.",
        link: "/trade",
      },
      {
        icon: <MdOutlineSupportAgent className="text-blue-600 text-lg sm:text-xl" />,
        title: "FSSAI Registration",
        desc: "Get compliance assistance for food business FSSAI license.",
        link: "/fssai",
      },
      {
        icon: <MdOutlineSupportAgent className="text-blue-600 text-lg sm:text-xl" />,
        title: "Proprietorship Firm Registration",
        desc: "Register your proprietorship firm with professional support.",
        link: "/proprietorship",
      },
    ],

    Individuals: [
      {
        icon: <HiOutlineDocumentText className="text-blue-600 text-lg sm:text-xl" />,
        title: "Salaried Individual",
        desc: "File your income tax return securely with expert help.",
        link: "/itr-filing-salaried",
      },
      {
        icon: <MdOutlineSupportAgent className="text-blue-600 text-lg sm:text-xl" />,
        title: "Professionals",
        desc: "Get expert tax and startup assistance for professionals.",
        link: "/itr-filing-professionals",
      },
      {
        icon: <FaUser className="text-blue-600 text-lg sm:text-xl" />,
        title: "Self Employed",
        desc: "Manage personal taxes with ease and expert support.",
        link: "/itr-filing-self-employed",
      },
      {
        icon: <HiOutlineBriefcase className="text-blue-600 text-lg sm:text-xl" />,
        title: "HUF",
        desc: "Simplify Hindu Undivided Family taxation and legal setup.",
        link: "/huf-registration",
      },
    ],

    Organization: [
      {
        icon: <HiOutlineBriefcase className="text-blue-600 text-lg sm:text-xl" />,
        title: "GST New Registration",
        desc: "Register your organization under GST for legal compliance.",
        link: "/gst-registration",
      },
      {
        icon: <HiOutlineDocumentText className="text-blue-600 text-lg sm:text-xl" />,
        title: "New Company Registration",
        desc: "Incorporate your company easily with complete documentation.",
        link: "/company-registration",
      },
      {
        icon: <MdOutlineSupportAgent className="text-blue-600 text-lg sm:text-xl" />,
        title: "PF and ESI Registration",
        desc: "Register employees for PF and ESI with expert guidance.",
        link: "/pf-esi-registration",
      },
      {
        icon: <MdOutlineSupportAgent className="text-blue-600 text-lg sm:text-xl" />,
        title: "Trust Registration",
        desc: "Get assistance to register your charitable or private trust.",
        link: "/trust-registration",
      },
      {
        icon: <MdOutlineSupportAgent className="text-blue-600 text-lg sm:text-xl" />,
        title: "Partnership Firm Registration",
        desc: "Set up a legal partnership firm easily online today.",
        link: "/partnership-firm-registration",
      },
      {
        icon: <HiOutlineBriefcase className="text-blue-600 text-lg sm:text-xl" />,
        title: "MSME Registration",
        desc: "Get MSME certification and unlock small business benefits.",
        link: "/msme-registration",
      },
    ],

    SMEs: [
      {
        icon: <FaBuilding className="text-blue-600 text-lg sm:text-xl" />,
        title: "GST Registration",
        desc: "Simplify GST registration and compliance for small businesses.",
        link: "/gst-registration",
      },
      {
        icon: <HiOutlineDocumentText className="text-blue-600 text-lg sm:text-xl" />,
        title: "MSME Registration",
        desc: "Apply for Udyam MSME registration for growth benefits.",
        link: "/msme-registration",
      },
      {
        icon: <HiOutlineDocumentText className="text-blue-600 text-lg sm:text-xl" />,
        title: "Trademark Registration",
        desc: "Protect your SME's brand identity through trademark registration.",
        link: "/trademark-registration",
      },
      {
        icon: <MdOutlineSupportAgent className="text-blue-600 text-lg sm:text-xl" />,
        title: "Trade License",
        desc: "Get quick trade license approval for small enterprises.",
        link: "/trade-license-registration",
      },
      {
        icon: <MdOutlineSupportAgent className="text-blue-600 text-lg sm:text-xl" />,
        title: "FSSAI Registration",
        desc: "Obtain FSSAI license for your SME food business easily.",
        link: "/fssai-registration",
      },
      {
        icon: <HiOutlineBriefcase className="text-blue-600 text-lg sm:text-xl" />,
        title: "GEM Registration",
        desc: "Register your SME on Government e-Marketplace for sales.",
        link: "/gem-registration",
      },
    ],
  };

  return (
    <section className="bg-white py-8 sm:py-12 lg:py-14 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <h1
            id="section-title"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-gray-900 mb-3 sm:mb-4 relative inline-block"
          >
            Made for everyone
            {/* Blue underline bar animation */}
            {showBar && (
              <span className="block w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-blue-600 mx-auto mt-2 sm:mt-3 transition-all duration-500"></span>
            )}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 pt-3 sm:pt-5 leading-relaxed">
            Whether you're just starting out or running a growing business,
            we're here to make legal work simple and effortless.
          </p>
        </div>

        {/* Tabs - Responsive layout */}
        <div className="flex flex-wrap justify-center border-b rounded-xl sm:rounded-2xl bg-gray-50 border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 font-medium text-base sm:text-lg md:text-xl font-serif transition-colors border-b-2 whitespace-nowrap ${activeTab === tab.name
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-900 border-transparent hover:text-blue-600"
                }`}
            >
              <span className="text-sm sm:text-lg">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content Grid - Responsive layout */}
        <div className="mt-6 sm:mt-8 lg:mt-10">
          <div className={`grid grid-cols-1 ${isMobile ? 'sm:grid-cols-1' :
              isTablet ? 'md:grid-cols-2' :
                'lg:grid-cols-3'
            } gap-3 sm:gap-4 md:gap-6`}>
            {tabContent[activeTab].map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-blue-50 transition group border border-transparent hover:border-blue-100"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-100 rounded-full group-hover:bg-blue-100 transition flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 font-semibold text-lg sm:text-xl group-hover:text-blue-600 transition leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

