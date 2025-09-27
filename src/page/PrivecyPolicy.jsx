// import React, { useEffect } from "react";

// const sections = [
//   { id: "info-collect", title: "Information We Collect" },
//   { id: "how-use", title: "How We Use Your Information" },
//   { id: "data-sharing", title: "Data Sharing" },
//   { id: "data-security", title: "Data Security" },
//   { id: "data-retention", title: "Data Retention" },
//   { id: "user-rights", title: "User Rights" },
//   { id: "eri-services", title: "Use of ERI Services" },
//   { id: "children-privacy", title: "Children’s Privacy" },
//   { id: "policy-updates", title: "Policy Updates" },
//   { id: "file-permissions", title: "File & Media Permissions" },
//   { id: "grievance", title: "Grievance Officer Contact" },
// ];

// export default function PrivacyPolicy() {
//   // Optional: scroll into view behavior (smooth)
//   useEffect(() => {
//     const handleHash = () => {
//       const hash = window.location.hash;
//       if (hash) {
//         const el = document.getElementById(hash.substring(1));
//         if (el) {
//           el.scrollIntoView({ behavior: "smooth", block: "start" });
//         }
//       }
//     };
//     handleHash();
//   }, []);

//   return (
//     <section className="bg-gray-50 text-gray-800">
//       {/* Hero / Banner */}
//       <div className="relative w-full h-60 bg-gradient-to-r from-orange-500 to-yellow-400 flex items-center justify-center">
//         <div className="text-center text-white px-6">
//           <h1 className="text-4xl md:text-5xl font-bold mb-2">
//             Privacy Policy
//           </h1>
//           <p className="max-w-2xl mx-auto text-lg opacity-90">
//             How Auditfiling / Cloudsat Pvt. Ltd. collects, uses & protects your
//             information
//           </p>
//         </div>
        
//       </div>
//        <div className="bg-white shadow rounded-2xl p-8">
//             <p className="leading-relaxed text-gray-700">
//               Auditfiling.com ("we", "our", or "us") is a product of{" "}
//               <span className="font-semibold">Cloudsat Pvt. Ltd.</span>. This
//               Privacy Policy explains how we collect, use, and protect your
//               personal information when you use our website or mobile
//               application.
//             </p>
//           </div>

//       <div className="max-w-6xl mx-auto px-6 lg:px-0 flex mt-12">
//         {/* Sidebar / TOC */}
//         <nav className="hidden lg:block w-48 mr-10 sticky top-24 self-start">
//           <ul className="space-y-3">
//             {sections.map((sec) => (
//               <li key={sec.id}>
//                 <a
//                   href={`#${sec.id}`}
//                   className="text-gray-600 hover:text-orange-500"
//                 >
//                   {sec.title}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Main Content */}
//         <div className="flex-1 space-y-10">
//           {/* Intro / Description */}
//           {/* <div className="bg-white shadow rounded-2xl p-8">
//             <p className="leading-relaxed text-gray-700">
//               Auditfiling.com ("we", "our", or "us") is a product of{" "}
//               <span className="font-semibold">Cloudsat Pvt. Ltd.</span>. This
//               Privacy Policy explains how we collect, use, and protect your
//               personal information when you use our website or mobile
//               application.
//             </p>
//           </div> */}

//           {/* Render each section */}
//           <Section id="info-collect" title="1. Information We Collect">
//             <ul className="list-disc pl-6 space-y-2">
//               <li>
//                 <span className="font-medium">Personal Information:</span> Name,
//                 email address, phone number, address, PAN, etc.
//               </li>
//               <li>
//                 <span className="font-medium">Login Information:</span> User ID,
//                 password, email for access/verification.
//               </li>
//               <li>
//                 <span className="font-medium">Tax Information:</span> Income,
//                 deductions, dependents, etc.
//               </li>
//               <li>
//                 <span className="font-medium">Device & Usage Data:</span> IP
//                 address, device type, OS, browser, usage behavior, referral
//                 source.
//               </li>
//             </ul>
//           </Section>

//           <Section id="how-use" title="2. How We Use Your Information">
//             <ul className="list-disc pl-6 space-y-2">
//               <li>Provide and improve our services</li>
//               <li>Facilitate tax preparation and filing</li>
//               <li>Contact you with confirmations, updates, and support</li>
//               <li>Improve app performance & user experience</li>
//               <li>Ensure legal & regulatory compliance</li>
//               <li>Process payments (if applicable)</li>
//             </ul>
//             <div className="mt-6 p-4 bg-orange-50 border-l-4 border-orange-400 rounded">
//               <p className="text-gray-700 font-medium">
//                 We <span className="font-semibold">do not</span> sell, rent, or
//                 share your personal or tax info with third parties for
//                 marketing purposes.
//               </p>
//             </div>
//           </Section>

//           <Section id="data-sharing" title="3. Data Sharing">
//             <p>Your data may be shared only with:</p>
//             <ul className="list-disc pl-6 space-y-2 mt-2">
//               <li>Authorized government portals for tax filing</li>
//               <li>Operational service providers (payment gateways, analytics)</li>
//               <li>
//                 Law enforcement or legal authorities when required by law
//               </li>
//             </ul>
//           </Section>

//           <Section id="data-security" title="4. Data Security">
//             <ul className="list-disc pl-6 space-y-2">
//               <li>Encrypted data transmission (SSL)</li>
//               <li>Access-controlled secure storage</li>
//               <li>Regular security audits</li>
//               <li>Personnel bound by confidentiality agreements</li>
//             </ul>
//           </Section>

//           <Section id="data-retention" title="5. Data Retention">
//             <p>
//               We retain your data only as long as necessary for service delivery
//               or regulatory compliance. You may request deletion at any time.
//             </p>
//           </Section>

//           <Section id="user-rights" title="6. User Rights">
//             <ul className="list-disc pl-6 space-y-2">
//               <li>Access and correct your data</li>
//               <li>Request deletion</li>
//               <li>Withdraw consent</li>
//               <li>Contact our Grievance Officer to exercise rights</li>
//             </ul>
//           </Section>

//           <Section id="eri-services" title="7. Use of ERI Services">
//             <ul className="list-disc pl-6 space-y-2">
//               <li>ITR retrieval services</li>
//               <li>Filing submission services</li>
//               <li>Other authorized APIs by Income Tax Dept</li>
//             </ul>
//           </Section>

//           <Section id="children-privacy" title="8. Children’s Privacy">
//             <p>
//               Our services are not intended for individuals under 18. We do not
//               knowingly collect data from minors.
//             </p>
//           </Section>

//           <Section id="policy-updates" title="9. Policy Updates">
//             <p>
//               We may update this Privacy Policy. Changes will be posted here,
//               and major updates may be notified via app or email.
//             </p>
//           </Section>

//           <Section id="file-permissions" title="10. File & Media Permissions">
//             <p className="font-medium">a. Why We Request Access:</p>
//             <ul className="list-disc pl-6 space-y-1">
//               <li>Upload documents & media</li>
//               <li>Download & save generated files</li>
//               <li>Preview documents</li>
//             </ul>
//             <p className="mt-3 font-medium">b. Types of Files:</p>
//             <ul className="list-disc pl-6 space-y-1">
//               <li>Images/media for profile / documents</li>
//               <li>PDFs for conversion/viewing</li>
//               <li>Generated reports</li>
//             </ul>
//             <p className="mt-3 font-medium">c. Permission Types:</p>
//             <ul className="list-disc pl-6 space-y-1">
//               <li>READ/WRITE_EXTERNAL_STORAGE (Android ≤ 10)</li>
//               <li>READ_MEDIA_* (Android 13+)</li>
//               <li>Scoped Storage (Android 11+)</li>
//             </ul>
//             <p className="mt-3 font-medium">d. How We Handle Data:</p>
//             <p className="pl-6">
//               Files accessed only locally; never uploaded or stored without your
//               explicit consent.
//             </p>
//           </Section>

//           <Section id="grievance" title="11. Grievance Officer Contact">
//             <p>
//               <span className="font-semibold">Mr. Aswini Kumar Padhi</span> <br />
//               Grievance Officer – Cloudsat Pvt. Ltd. <br />
//               Website:{" "}
//               <a
//                 href="https://www.auditfiling.com"
//                 className="text-blue-600 hover:underline"
//               >
//                 www.auditfiling.com
//               </a>{" "}
//               <br />
//               Email: info@cloudsat.in / auditfilling@gmail.com
//             </p>
//           </Section>
//         </div>
//       </div>
//     </section>
//   );
// }

// // Section component
// function Section({ id, title, children }) {
//   return (
//     <div id={id} className="bg-white shadow-md rounded-2xl p-8 hover:shadow-lg transition">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-900">{title}</h2>
//       <div className="text-gray-700 leading-relaxed">{children}</div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Header from "../component/Header";

const sections = [
  { id: "info-collect", title: "Information We Collect" },
  { id: "how-use", title: "How We Use Your Information" },
  { id: "data-sharing", title: "Data Sharing" },
  { id: "data-security", title: "Data Security" },
  { id: "data-retention", title: "Data Retention" },
  { id: "user-rights", title: "User Rights" },
  { id: "eri-services", title: "Use of ERI Services" },
  { id: "children-privacy", title: "Children's Privacy" },
  { id: "policy-updates", title: "Policy Updates" },
  { id: "file-permissions", title: "File & Media Permissions" },
  { id: "grievance", title: "Grievance Officer Contact" },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("");

  // Handle scroll behavior and active section highlighting
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const el = document.getElementById(hash.substring(1));
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Find which section is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    handleHash();
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionClick = (id) => {
    setActiveSection(id);
    window.history.pushState(null, null, `#${id}`);
  };

  return (
    <section className="min-h-screen  text-gray-800">
        <Header/>
      {/* Hero Section */}
      <div className="relative  mt-20 py-20 lg:py-24">
        <div className="absolute inset-0 "></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl text-black md:text-5xl font-serif  lg:text-6xl font-bold  mb-4 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl text-black max-w-3xl mx-auto leading-relaxed">
            How Auditfiling / Cloudsat Pvt. Ltd. collects, uses & protects your information
          </p>
        </div>
      </div>

      {/* Introduction Card */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 lg:-mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-orange-100">
          <p className="text-lg lg:text-xl leading-relaxed text-gray-700 text-center">
                     <span className="font-semibold text-black">Auditfiling.com</span> ("we", "our", or "us") is a product of{" "}
            <span className="font-semibold text-black">Cloudsat Pvt. Ltd.</span>. 
            This Privacy Policy explains how we collect, use, and protect your
            personal information when you use our website or mobile application.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-4 lg:py-4 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <nav className="lg:w-75 lg:sticky lg:top-24 lg:self-start bg-white rounded-xl  p-6 ">
          <h3 className="font-semibold  text-center text-gray-900 mb-4 text-3xl">Contents</h3>
          <ul className="space-y-3">
            {sections.map((sec, index) => (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  onClick={() => handleSectionClick(sec.id)}
                  className={`flex items-start py-2 px-3 rounded-lg transition-all duration-200 ${
                    activeSection === sec.id
                      ? "bg-orange-50 text-red-600 border-l-4 border-red-600  font-medium"
                      : "text-gray-600 hover:text-red-600  hover:bg-gray-50"
                  }`}
                >
                  <span className="text-sm font-medium text-gray-400 w-6 flex-shrink-0">
                    {index + 1}.
                  </span>
                  <span className="text-xl lg:text-xl  leading-tight">{sec.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <div className="flex-1 space-y-2 ">
          <Section id="info-collect" title="1. Information We Collect">
            <ul className="space-y-1">
              <ListItem>
                <strong>Personal Information:</strong> Name, email address, 
                phone number, address, PAN, etc.
              </ListItem>
              <ListItem>
                <strong>Login Information:</strong> User ID, password, email 
                for access/verification.
              </ListItem>
              <ListItem>
                <strong>Tax Information:</strong> Income, deductions, 
                dependents, etc.
              </ListItem>
              <ListItem>
                <strong>Device & Usage Data:</strong> IP address, device type, 
                OS, browser, usage behavior, referral source.
              </ListItem>
            </ul>
          </Section>

          <Section id="how-use" title="2. How We Use Your Information">
            <ul className="space-y-1">
              <ListItem>Provide and improve our services</ListItem>
              <ListItem>Facilitate tax preparation and filing</ListItem>
              <ListItem>Contact you with confirmations, updates, and support</ListItem>
              <ListItem>Improve app performance & user experience</ListItem>
              <ListItem>Ensure legal & regulatory compliance</ListItem>
              <ListItem>Process payments (if applicable)</ListItem>
            </ul>
            <ImportantNote>
              We <strong>do not</strong> sell, rent, or share your personal or 
              tax info with third parties for marketing purposes.
            </ImportantNote>
          </Section>

          <Section id="data-sharing" title="3. Data Sharing">
            <p className="">Your data may be shared only with:</p>
            <ul className="space-y-1">
              <ListItem>Authorized government portals for tax filing</ListItem>
              <ListItem>Operational service providers (payment gateways, analytics)</ListItem>
              <ListItem>Law enforcement or legal authorities when required by law</ListItem>
            </ul>
          </Section>

          <Section id="data-security" title="4. Data Security">
            <ul className="space-y-1">
              <ListItem>Encrypted data transmission (SSL)</ListItem>
              <ListItem>Access-controlled secure storage</ListItem>
              <ListItem>Regular security audits</ListItem>
              <ListItem>Personnel bound by confidentiality agreements</ListItem>
            </ul>
          </Section>

          <Section id="data-retention" title="5. Data Retention">
            <p>
              We retain your data only as long as necessary for service delivery
              or regulatory compliance. You may request deletion at any time.
            </p>
          </Section>

          <Section id="user-rights" title="6. User Rights">
            <ul className="space-y-1">
              <ListItem>Access and correct your data</ListItem>
              <ListItem>Request deletion</ListItem>
              <ListItem>Withdraw consent</ListItem>
              <ListItem>Contact our Grievance Officer to exercise rights</ListItem>
            </ul>
          </Section>

          <Section id="eri-services" title="7. Use of ERI Services">
            <ul className="space-y-1">
              <ListItem>ITR retrieval services</ListItem>
              <ListItem>Filing submission services</ListItem>
              <ListItem>Other authorized APIs by Income Tax Dept</ListItem>
            </ul>
          </Section>

          <Section id="children-privacy" title="8. Children's Privacy">
            <p>
              Our services are not intended for individuals under 18. We do not
              knowingly collect data from minors.
            </p>
          </Section>

          <Section id="policy-updates" title="9. Policy Updates">
            <p>
              We may update this Privacy Policy. Changes will be posted here,
              and major updates may be notified via app or email.
            </p>
          </Section>

          <Section id="file-permissions" title="10. File & Media Permissions">
            <SubSection title="a. Why We Request Access:">
              <ul className="space-y-2">
                <ListItem>Upload documents & media</ListItem>
                <ListItem>Download & save generated files</ListItem>
                <ListItem>Preview documents</ListItem>
              </ul>
            </SubSection>

            <SubSection title="b. Types of Files:">
              <ul className="space-y-2">
                <ListItem>Images/media for profile / documents</ListItem>
                <ListItem>PDFs for conversion/viewing</ListItem>
                <ListItem>Generated reports</ListItem>
              </ul>
            </SubSection>

            <SubSection title="c. Permission Types:">
              <ul className="space-y-2">
                <ListItem>READ/WRITE_EXTERNAL_STORAGE (Android ≤ 10)</ListItem>
                <ListItem>READ_MEDIA_* (Android 13+)</ListItem>
                <ListItem>Scoped Storage (Android 11+)</ListItem>
              </ul>
            </SubSection>

            <SubSection title="d. How We Handle Data:">
              <p>Files accessed only locally; never uploaded or stored without your explicit consent.</p>
            </SubSection>
          </Section>

          <Section id="grievance" title="11. Grievance Officer Contact">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-lg">
                <strong>Mr. Aswini Kumar Padhi</strong> <br />
                <span className="text-gray-600">Grievance Officer – Cloudsat Pvt. Ltd.</span>
              </p>
              <div className="mt-4 space-y-2">
                <ContactInfo label="Website:" value="www.auditfiling.com" href="https://www.auditfiling.com" />
                <ContactInfo label="Email:" value="info@cloudsat.in" href="mailto:info@cloudsat.in" />
                <ContactInfo label="Email:" value="auditfilling@gmail.com" href="mailto:auditfilling@gmail.com" />
              </div>
            </div>
          </Section>
        </div>
      </div>
      <Footer/>
    </section>
  );
}

// Reusable Components
function Section({ id, title, children }) {
  return (
    <div 
      id={id} 
      className="bg-white p-4  transition-all duration-300"
    >
      <h2 className="text-2xl  font-bold text-gray-900 border-b border-gray-200 pb-2">
        {title}
      </h2>
      <div className="text-gray-700 leading-relaxed text-lg space-y-6">
        {children}
      </div>
    </div>
  );
}

function SubSection({ title, children }) {
  return (
    <div className="mb-1 ">
      <h3 className="font-semibold text-gray-900 mb-1 text-lg">{title}</h3>
      <div className="ml-4">{children}</div>
    </div>
  );
}

function ListItem({ children }) {
  return (
    <li className="flex items-start">
      <span className="text-red-600  mr-3 mt-1">•</span>
      <span>{children}</span>
    </li>
  );
}

function ImportantNote({ children }) {
  return (
    <div className=" p-2 bg-orange-50 border-l-2 border-red-600 rounded-r-sm">
      <p className="text-gray-800 font-medium text-lg">{children}</p>
    </div>
  );
}

function ContactInfo({ label, value, href }) {
  return (
    <p className="flex flex-col sm:flex-row sm:items-center">
      <span className="font-medium text-gray-600 sm:w-24 sm:flex-shrink-0">{label}</span>
      {href ? (
        <a 
          href={href} 
          className="text-red-600  hover:text-red-600 00 hover:underline font-medium transition-colors"
        >
          {value}
        </a>
      ) : (
        <span className="font-medium">{value}</span>
      )}
    </p>
  );
}