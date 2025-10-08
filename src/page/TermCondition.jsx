import React, { useEffect, useState, useRef } from "react";
import { 
  CheckCircle, 
  AlertCircle, 
  Shield, 
  Lock, 
  FileText, 
  Mail, 
  Calendar,
  ArrowUp,
  UserCheck,
  RefreshCw,
  Scale
} from 'lucide-react';
import Header from "../component/Header";
import Footer from "../component/Footer";

const sections = [
  { id: "accepting-terms", title: "Accepting the Terms", icon: UserCheck },
  { id: "provision-services", title: "Provision of Services", icon: RefreshCw },
  { id: "use-services", title: "Use of Services", icon: FileText },
  { id: "account-security", title: "Account Security", icon: Lock },
  { id: "privacy", title: "Privacy", icon: Shield },
  { id: "accuracy-tax-returns", title: "Accuracy of Tax Returns", icon: Scale },
  { id: "disclaimer-warranties", title: "Disclaimer of Warranties", icon: AlertCircle },
  { id: "limitation-liability", title: "Limitation of Liability", icon: AlertCircle },
  { id: "refunds-cancellations", title: "Refunds & Cancellations", icon: CheckCircle },
];

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [readSections, setReadSections] = useState(new Set());
  const sectionRefs = useRef({});

  // Scroll and section tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      setShowScrollTop(window.scrollY > 400);

      // Track read sections
      sections.forEach(sec => {
        const section = sectionRefs.current[sec.id];
        if (section && section.offsetTop <= scrollPosition + 200) {
          setReadSections(prev => new Set(prev).add(sec.id));
        }
      });

      // Active section detection
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sectionRefs.current[sections[i].id];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionClick = (id) => {
    const element = sectionRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, null, `#${id}`);
    }
  };

  const progress = Math.round((readSections.size / sections.length) * 100);

  return (
    <div className="min-h-screen ">
      {/* Header */}
<Header/>

      {/* Hero Section */}
      <div className="relative  py-20 lg:py-30">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto font-serif px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6">
            <Calendar className="h-4 w-4 text-black" />
            <span className="text-black text-sm">Last Updated: {new Date().toLocaleDateString('en-IN')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-boldtext-black mb-4 leading-tight">
            Terms & Conditions
          </h1>
          <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
            Please read these terms carefully before using Auditfiling.com services
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <nav className="lg:w-80 lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white rounded-2xl  border border-gray-200/60 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">Table of Contents</h3>
              </div>
              
              <div className="space-y-2">
                {sections.map((sec, index) => {
                  const Icon = sec.icon;
                  const isRead = readSections.has(sec.id);
                  const isActive = activeSection === sec.id;
                  
                  return (
                    <button
                      key={sec.id}
                      onClick={() => handleSectionClick(sec.id)}
                      className={`w-full flex items-center space-x-3 py-3 px-4 rounded-xl transition-all duration-200 group ${
                        isActive 
                          ? 'bg-blue-50 border border-blue-200 text-blue-700 ' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                        isActive ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-gray-200'
                      }`}>
                        <Icon className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className={`font-medium text-sm ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                            {sec.title}
                          </span>
                          {isRead && (
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-400">Section {index + 1}</span>
                          {isActive && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

           
            </div>
          </nav>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Introduction Card */}
            <div className="bg-white rounded-2xl  border border-gray-200/60 p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-indigo-600/5 rounded-full -translate-y-16 translate-x-16" />
              <div className="relative">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Auditfiling.com</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Welcome to <strong className="text-blue-600">Auditfiling.com</strong>, a product of{' '}
                  <strong className="text-blue-600">Cloudsat Pvt. Ltd.</strong> These Terms and Conditions 
                  govern your use of our services. By accessing or using our platform, you agree to be bound by these terms.
                </p>
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-amber-800 text-sm">
                      <strong>Important:</strong> These terms contain important information about your rights and obligations. 
                      Please read them carefully.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms Sections */}
            <Section 
              ref={el => sectionRefs.current["accepting-terms"] = el}
              id="accepting-terms" 
              title="1. Accepting the Terms" 
              icon={UserCheck}
              status={readSections.has("accepting-terms") ? "read" : "unread"}
            >
              <p>
                Auditfiling.com is a product of Cloudsat Pvt. Ltd. (referred to as "Auditfiling.com" from here onwards). 
                By creating an account and using any Auditfiling.com services, you agree to these terms. 
              </p>
              <ImportantNote icon={UserCheck}>
                You must be of legal age and a resident of India to use the services.
              </ImportantNote>
            </Section>

            <Section 
              ref={el => sectionRefs.current["provision-services"] = el}
              id="provision-services" 
              title="2. Provision of Services" 
              icon={RefreshCw}
              status={readSections.has("provision-services") ? "read" : "unread"}
            >
              <ul className="space-y-3">
                <ListItem>
                  Auditfiling.com may change or stop services at any time without notice.
                </ListItem>
                <ListItem>
                  By using the service, you agree to be added as a client on Income Tax Department web services.
                </ListItem>
                <ListItem>
                  Limits may be imposed on transmissions or storage space at our discretion.
                </ListItem>
              </ul>
            </Section>

            <Section 
              ref={el => sectionRefs.current["use-services"] = el}
              id="use-services" 
              title="3. Use of Services" 
              icon={FileText}
              status={readSections.has("use-services") ? "read" : "unread"}
            >
              <p className="mb-4">When using our services, you agree to:</p>
              <ul className="space-y-3">
                <ListItem>Provide accurate and current tax information</ListItem>
                <ListItem>Use the services only for legal purposes</ListItem>
                <ListItem>Not engage in unauthorized access, automation, reproduction, or interference with services</ListItem>
              </ul>
              <ImportantNote icon={AlertCircle}>
                If filing for another person, you must have their explicit consent and authorization.
              </ImportantNote>
            </Section>

            <Section 
              ref={el => sectionRefs.current["account-security"] = el}
              id="account-security" 
              title="4. Account Security" 
              icon={Lock}
              status={readSections.has("account-security") ? "read" : "unread"}
            >
              <p className="mb-4">You are responsible for:</p>
              <ul className="space-y-3">
                <ListItem>Maintaining the security of your account credentials</ListItem>
                <ListItem>All activities that occur under your account</ListItem>
                <ListItem>Keeping your passwords confidential and secure</ListItem>
              </ul>
              <WarningNote icon={Lock}>
                Notify Auditfiling.com immediately if you suspect any unauthorized access to your account.
              </WarningNote>
            </Section>

            <Section 
              ref={el => sectionRefs.current["privacy"] = el}
              id="privacy" 
              title="5. Privacy" 
              icon={Shield}
              status={readSections.has("privacy") ? "read" : "unread"}
            >
              <p>
                Your privacy is important to us. Please refer to our Privacy Policy to understand 
                how we collect, use, and protect your personal information.
              </p>
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-blue-800">
                    <strong>Important:</strong> Use of our service implies your consent to our privacy policy 
                    and data handling practices as described therein.
                  </p>
                </div>
              </div>
            </Section>

            <Section 
              ref={el => sectionRefs.current["accuracy-tax-returns"] = el}
              id="accuracy-tax-returns" 
              title="6. Accuracy of Tax Returns" 
              icon={Scale}
              status={readSections.has("accuracy-tax-returns") ? "read" : "unread"}
            >
              <p>
                While Auditfiling.com strives for accuracy in tax preparation and filing services, 
                the ultimate responsibility for verifying your tax return lies with you.
              </p>
              <WarningNote icon={Scale}>
                We provide no warranties regarding the correctness, completeness, or timeliness of 
                tax returns prepared through our service. You are responsible for reviewing and 
                approving all information before submission.
              </WarningNote>
            </Section>

            <Section 
              ref={el => sectionRefs.current["disclaimer-warranties"] = el}
              id="disclaimer-warranties" 
              title="7. Disclaimer of Warranties" 
              icon={AlertCircle}
              status={readSections.has("disclaimer-warranties") ? "read" : "unread"}
            >
              <p className="mb-4">Services are provided on an "as is" basis:</p>
              <ul className="space-y-3">
                <ListItem>We do not guarantee uninterrupted service</ListItem>
                <ListItem>We do not guarantee error-free operation</ListItem>
                <ListItem>No oral or written information will create any warranty not stated in these terms</ListItem>
              </ul>
            </Section>

            <Section 
              ref={el => sectionRefs.current["limitation-liability"] = el}
              id="limitation-liability" 
              title="8. Limitation of Liability" 
              icon={AlertCircle}
              status={readSections.has("limitation-liability") ? "read" : "unread"}
            >
              <p className="mb-4">
                Auditfiling.com is not liable for any indirect, incidental, special, or consequential damages, including but not limited to:
              </p>
              <ul className="space-y-3">
                <ListItem>Loss of profits or revenue</ListItem>
                <ListItem>Loss of data or information</ListItem>
                <ListItem>Damage to reputation or business</ListItem>
                <ListItem>Any other commercial damages or losses</ListItem>
              </ul>
              <WarningNote icon={AlertCircle}>
                These limitations apply even if we have been advised of the potential for such losses.
              </WarningNote>
            </Section>

            <Section 
              ref={el => sectionRefs.current["refunds-cancellations"] = el}
              id="refunds-cancellations" 
              title="9. Refunds & Cancellations" 
              icon={CheckCircle}
              status={readSections.has("refunds-cancellations") ? "read" : "unread"}
            >
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5" />
                      <span>Self e-Filing Plans</span>
                    </h4>
                    <p className="text-green-800">
                      Refunds are only available before the service has been used.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5" />
                      <span>Assisted Plans</span>
                    </h4>
                    <p className="text-blue-800">
                      Refunds are possible before an expert starts working on your case.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center space-x-2">
                    <Mail className="h-5 w-5" />
                    <span>Contact for Refund Inquiries</span>
                  </h4>
                  <ContactInfo 
                    label="Email:" 
                    value="payments@auditfiling.com" 
                    href="mailto:payments@auditfiling.com" 
                  />
                </div>

                <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl">
                  <p className="text-gray-700 text-center font-medium">
                    By using Auditfiling.com, you acknowledge that you have read, understood, 
                    and agree to be bound by these Terms and Conditions.
                  </p>
                </div>
              </div>
            </Section>

            {/* Acceptance Footer */}
            <div className="bg-white rounded-2xl  border-2 mb-15 border-blue-200 p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Acceptance of Terms</h3>
              <p className="text-gray-700 mb-4 max-w-2xl mx-auto">
                Your continued use of Auditfiling.com services constitutes acceptance of these Terms and Conditions.
              </p>
              <div className="bg-blue-50 px-4 py-2 rounded-lg inline-block">
                <p className="text-blue-800 font-semibold">
                  Effective Date: {new Date().toLocaleDateString('en-IN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
       <Footer/>
    </div>
   
  );
}

// Enhanced Reusable Components
const Section = React.forwardRef(({ id, title, icon, status, children }, ref) => {
  const Icon = icon;
  
  return (
    <section 
      ref={ref}
      id={id} 
      className="bg-white rounded-2xl  border border-gray-200/60 p-8 lg:p-10 relative overflow-hidden group  transition-all duration-300"
    >
      {/* Status Indicator */}
      {status === "read" && (
        <div className="absolute top-4 right-4 flex items-center space-x-1">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="text-xs text-green-600 font-medium">Read</span>
        </div>
      )}
      
      <div className="flex items-center space-x-4 mb-6">
        <div className="bg-blue-100 p-3 rounded-xl">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{title}</h2>
      </div>
      
      <div className="text-gray-700 leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  );
});

function ListItem({ children }) {
  return (
    <li className="flex items-start">
      <span className="text-blue-500 mr-3 mt-1.5 flex-shrink-0">•</span>
      <span>{children}</span>
    </li>
  );
}

function ImportantNote({ icon, children }) {
  const Icon = icon;
  return (
    <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
      <div className="flex items-start space-x-3">
        <Icon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <p className="text-blue-800 font-medium">{children}</p>
      </div>
    </div>
  );
}

function WarningNote({ icon, children }) {
  const Icon = icon;
  return (
    <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
      <div className="flex items-start space-x-3">
        <Icon className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
        <p className="text-red-800 font-medium">{children}</p>
      </div>
    </div>
  );
}

function ContactInfo({ label, value, href }) {
  return (
    <div className="flex items-center space-x-3">
      <span className="font-medium text-gray-600">{label}</span>
      {href ? (
        <a 
          href={href} 
          className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors flex items-center space-x-1"
        >
          <Mail className="h-4 w-4" />
          <span>{value}</span>
        </a>
      ) : (
        <span className="font-medium">{value}</span>
      )}
    </div>
  );
}