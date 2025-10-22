import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Header from "../component/Header";

const sections = [
  { id: "accepting-terms", title: "Accepting the Terms" },
  { id: "provision-services", title: "Provision of Services" },
  { id: "use-services", title: "Use of Services" },
  { id: "account-security", title: "Account Security" },
  { id: "privacy", title: "Privacy" },
  { id: "accuracy-tax", title: "Accuracy of Tax Returns" },
  { id: "disclaimer-warranties", title: "Disclaimer of Warranties" },
  { id: "limitation-liability", title: "Limitation of Liability" },
  { id: "refunds-cancellations", title: "Refunds & Cancellations" },
];

export default function TermsAndConditions() {
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
    <section className="min-h-screen text-gray-800">
      <Header/>
      {/* Hero Section */}
      <div className="relative mt-20 py-20 lg:py-24">
        <div className="absolute inset-0"></div>
        <div className="relative font-serif max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl text-black md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Terms and Conditions
            <span className="block w-24 h-1 bg-blue-600 mx-auto mt-3 transition-all duration-500"></span>
          </h1>
          <p className="text-xl md:text-2xl text-black max-w-3xl mx-auto leading-relaxed">
            Please read these terms carefully before using Auditfiling.com services
          </p>
        </div>
      </div>

      {/* Introduction Card */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 lg:-mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-orange-100">
          <p className="text-lg lg:text-xl leading-relaxed text-gray-700 text-center">
            <span className="font-semibold text-black">Auditfiling.com</span> is a product of{" "}
            <span className="font-semibold text-black">Cloudsat Pvt. Ltd.</span>. 
            By creating an account and using our services, you agree to be bound by these Terms and Conditions.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-4 lg:py-4 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <nav className="lg:w-75 lg:sticky lg:top-24 lg:self-start bg-white rounded-xl p-6">
          <h3 className="font-semibold text-center text-gray-900 mb-4 text-3xl">Contents</h3>
          <ul className="space-y-3">
            {sections.map((sec, index) => (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  onClick={() => handleSectionClick(sec.id)}
                  className={`flex items-start py-2 px-3 rounded-lg transition-all duration-200 ${
                    activeSection === sec.id
                      ? "bg-orange-50 text-red-600 border-l-4 border-red-600 font-medium"
                      : "text-gray-600 hover:text-red-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-sm font-medium text-gray-400 w-6 flex-shrink-0">
                    {index + 1}.
                  </span>
                  <span className="text-xl lg:text-xl leading-tight">{sec.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <div className="flex-1 space-y-2">
          <Section id="accepting-terms" title="1. Accepting the Terms">
            <ul className="space-y-1">
              <ListItem>
                <strong>Auditfiling.com</strong> is a product of <strong>Cloudsat Pvt. Ltd.</strong> (called Auditfiling.com from here onwards).
              </ListItem>
              <ListItem>
                By creating an account and using any Auditfiling.com services, you agree to these terms.
              </ListItem>
              <ListItem>
                You must be of legal age and a resident of India to use the services.
              </ListItem>
              <ListItem>
                If you are using our services on behalf of an organization, you represent that you have the authority to bind that organization.
              </ListItem>
            </ul>
          </Section>

          <Section id="provision-services" title="2. Provision of Services">
            <ul className="space-y-1">
              <ListItem>
                Auditfiling.com may change or stop services at any time without notice.
              </ListItem>
              <ListItem>
                By using the service, you agree to be added as a client on Income Tax Department web services.
              </ListItem>
              <ListItem>
                Limits may be imposed on transmissions or storage space at our discretion.
              </ListItem>
              <ListItem>
                We reserve the right to modify, suspend, or discontinue any service with or without notice.
              </ListItem>
            </ul>
          </Section>

          <Section id="use-services" title="3. Use of Services">
            <ul className="space-y-1">
              <ListItem>
                You must provide accurate and current tax information and only use the services legally.
              </ListItem>
              <ListItem>
                Unauthorized access, automation, reproduction, or interference with services is strictly prohibited.
              </ListItem>
              <ListItem>
                If filing for another person, you must have their explicit consent and authority.
              </ListItem>
              <ListItem>
                You agree not to use the service for any unlawful purpose or to violate any laws.
              </ListItem>
              <ListItem>
                Any attempt to compromise the security or functionality of our services may result in termination of your account.
              </ListItem>
            </ul>
          </Section>

          <Section id="account-security" title="4. Account Security">
            <ul className="space-y-1">
              <ListItem>
                You are solely responsible for maintaining the confidentiality of your account and passwords.
              </ListItem>
              <ListItem>
                Notify Auditfiling.com immediately if you suspect any unauthorized access to your account.
              </ListItem>
              <ListItem>
                You are responsible for all activities that occur under your account.
              </ListItem>
              <ListItem>
                We reserve the right to disable your account if we believe there has been any security breach.
              </ListItem>
            </ul>
          </Section>

          <Section id="privacy" title="5. Privacy">
            <ul className="space-y-1">
              <ListItem>
                Refer to our Privacy Policy to understand how your data is handled.
              </ListItem>
              <ListItem>
                Use of the service implies consent to our privacy policy.
              </ListItem>
              <ListItem>
                We collect and process personal information in accordance with our Privacy Policy and applicable laws.
              </ListItem>
              <ListItem>
                You acknowledge that we may use your contact information to send service-related communications.
              </ListItem>
            </ul>
          </Section>

          <Section id="accuracy-tax" title="6. Accuracy of Tax Returns">
            <ul className="space-y-1">
              <ListItem>
                Auditfiling.com strives for accuracy in tax preparation and filing services.
              </ListItem>
              <ListItem>
                However, the ultimate responsibility lies with you to verify your return before submission.
              </ListItem>
              <ListItem>
                We provide no warranties regarding the correctness or completeness of the tax returns.
              </ListItem>
              <ListItem>
                You are responsible for reviewing all information and ensuring its accuracy before filing.
              </ListItem>
              <ListItem>
                We recommend consulting with a qualified tax professional for complex tax situations.
              </ListItem>
            </ul>
          </Section>

          <Section id="disclaimer-warranties" title="7. Disclaimer of Warranties">
            <ul className="space-y-1">
              <ListItem>
                Services are provided "as is" without any warranties, express or implied.
              </ListItem>
              <ListItem>
                We do not guarantee uninterrupted or error-free service.
              </ListItem>
              <ListItem>
                No oral or written information will create any warranty not stated in these terms.
              </ListItem>
              <ListItem>
                We disclaim all warranties including merchantability, fitness for a particular purpose, and non-infringement.
              </ListItem>
              <ListItem>
                We do not warrant that the services will meet your requirements or be available on an uninterrupted basis.
              </ListItem>
            </ul>
          </Section>

          <Section id="limitation-liability" title="8. Limitation of Liability">
            <ul className="space-y-1">
              <ListItem>
                Auditfiling.com is not liable for any indirect, incidental, special, or consequential damages.
              </ListItem>
              <ListItem>
                This includes but is not limited to loss of profits, data, reputation, or business opportunities.
              </ListItem>
              <ListItem>
                The limitations apply even if we have been advised of potential losses.
              </ListItem>
              <ListItem>
                Our total liability to you for any claims shall not exceed the amount you paid for the services.
              </ListItem>
              <ListItem>
                We are not liable for any delays or failures in performance due to circumstances beyond our reasonable control.
              </ListItem>
            </ul>
            <ImportantNote>
              These limitations of liability are fundamental elements of the basis of the bargain between you and Auditfiling.com.
            </ImportantNote>
          </Section>

          <Section id="refunds-cancellations" title="9. Refunds & Cancellations">
            <SubSection title="Refund Policy:">
              <ul className="space-y-2">
                <ListItem>
                  <strong>For self e-Filing plans:</strong> Refunds are only available before the service has been used.
                </ListItem>
                <ListItem>
                  <strong>For assisted plans:</strong> Refunds are possible before an expert starts working on your file.
                </ListItem>
                <ListItem>
                  Once an expert has begun work on your assisted filing, refunds cannot be processed.
                </ListItem>
              </ul>
            </SubSection>

            <SubSection title="Cancellation Policy:">
              <ul className="space-y-2">
                <ListItem>
                  You may cancel your account at any time by contacting our support team.
                </ListItem>
                <ListItem>
                  Cancellation of service does not automatically entitle you to a refund.
                </ListItem>
                <ListItem>
                  We reserve the right to suspend or terminate your account for violation of these terms.
                </ListItem>
              </ul>
            </SubSection>

            <SubSection title="Contact for Refunds:">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-lg font-semibold mb-2">Refund Inquiries:</p>
                <ContactInfo 
                  label="Email:" 
                  value="payments@auditfiling.com" 
                  href="mailto:payments@auditfiling.com" 
                />
                <p className="text-sm text-gray-600 mt-2">
                  Please include your account details and reason for refund request.
                </p>
              </div>
            </SubSection>

            <ImportantNote>
              By using Auditfiling.com, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </ImportantNote>
          </Section>

          {/* Last Updated Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Last Updated</h3>
            <p className="text-gray-700">
              These Terms and Conditions were last updated on {new Date().toLocaleDateString('en-IN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              We recommend reviewing these terms periodically for any changes.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </section>
  );
}

// Reusable Components (same as Privacy Policy)
function Section({ id, title, children }) {
  return (
    <div 
      id={id} 
      className="bg-white p-4 transition-all duration-300"
    >
      <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
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
    <div className="mb-1">
      <h3 className="font-semibold text-gray-900 mb-1 text-lg">{title}</h3>
      <div className="ml-4">{children}</div>
    </div>
  );
}

function ListItem({ children }) {
  return (
    <li className="flex items-start">
      <span className="text-red-600 mr-3 mt-1">•</span>
      <span>{children}</span>
    </li>
  );
}

function ImportantNote({ children }) {
  return (
    <div className="p-2 bg-orange-50 border-l-2 border-red-600 rounded-r-sm">
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
          className="text-red-600 hover:text-red-700 hover:underline font-medium transition-colors"
        >
          {value}
        </a>
      ) : (
        <span className="font-medium">{value}</span>
      )}
    </p>
  );
}