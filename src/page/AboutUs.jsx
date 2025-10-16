
import React from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import WhatsAppButton from "../form/WhatsAppPopup";
import {
  ClockIcon,
  PhoneIcon,
  UserGroupIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const values = [
  {
    title: "Our Mission",
    description:
      "To simplify legal, tax, and compliance processes through technology, expertise, and transparency. We aim to deliver reliable, affordable, and efficient services that help businesses, startups, and individuals meet their statutory obligations with ease.",
  },
  {
    title: "Our Future Focus",
    description:
      "To revolutionize India’s compliance landscape through innovation, technology, and trust—making legal and financial processes truly simple, smart, and accessible to everyone. Auditfiling aims to bridge every city and corner of the nation with seamless digital solutions, empowering businesses to stay compliant and confident in the new era of growth.",
  },
];

const weKnowFor = [
  {
    title: "Easy to Access",
    desc: "Access our services anytime, anywhere in India — online, in-person, or over a call.",
  },
  {
    title: "Experienced Team",
    desc: "A dedicated team with deep experience, guiding you through every filing and compliance task.",
  },
  {
    title: "Timely Alerts",
    desc: "We alert you on time and follow up, so you’re always up to date and never miss a deadline.",
  },
  {
    title: "Quick Issue Resolution",
    desc: "Fast, efficient support to resolve issues quickly — keeping your compliance stress-free.",
  },
];

export default function AboutUsPage() {
  return (
    <div>


      {/* WHO ARE WE SECTION (Two-Column Layout) */}
      <section className="text-black py-5 px-4 mt-30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE */}
          <div className="text-left ">
            <h1 className="text-black font-bold font-serif text-8xl mb-4 ">
              Who 
            </h1>
            <h1 className=" text-black font-bold font-serif text-8xl">Are We? </h1>
            
          </div>

          {/* RIGHT SIDE */}
          <div className="text-gray-800 text-xl p-3 leading-relaxed">
            <p className="mb-2">
              At <span className="font-bold text-blue-600 text-lg">Auditfiling</span>, we believe
              legal and tax compliance shouldn’t be complicated or stressful.
              We’re here to make it simple, reliable, and accessible for
              everyone from small startups to growing enterprises.
            </p>
         
            <p className="mb-2">
              As a proud part of{" "}
              <span className="font-bold text-blue-600 text-lg ">Cloudsat Pvt. Ltd.</span>,
              headquartered in Gurugram, Auditfiling has been helping businesses
              across India for over 7 years. Our expert team blends technology,
              experience, and personal guidance to make services like GST
              registration, ITR filing, company incorporation, and compliance
              management smoother than ever.
            </p>
 
            <p className="mb-2">
              With offices in New Delhi, Bhubaneswar, and Kolkata and upcoming
              locations in Ahmedabad, Hyderabad, Pune, Bengaluru, and Mumbai
              we’re expanding our reach to serve every corner of India.
            </p>

            <p className="mb-2">
              At Auditfiling, we don’t just file your documents  we help your
              business stay compliant, grow confidently, and focus on what
              matters most: <span className="font-semibold">success</span>.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
     <section className="py-10 px-4 bg-white">
  <div className="max-w-6xl mx-auto text-center">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-15 mt-10">
      {values.map((value, idx) => (
        <div
          key={idx}
          className="bg-white shadow-md rounded-2xl p-12 min-h-[400px] border border-gray-100 
                     hover:shadow-lg transition-all duration-300 flex flex-col justify-center"
        >
          <h1 className="text-2xl font-semibold mb-4 font-serif text-blue-600 tracking-wide">
            {value.title}
          </h1>
          <p className="text-gray-700 leading-loose tracking-wide text-lg">
            {value.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* WE KNOW FOR SECTION */}
<section className="py-16 px-4">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h1 className="text-xl font-bold font-serif text-gray-900 mb-4">
        Why Businesses Choose Us
      </h1>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
      {weKnowFor.map((item, index) => (
        <div
          key={index}
          className="group bg-white rounded-2xl shadow-lg border border-gray-100  p-4
                     hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 
                     relative overflow-hidden cursor-pointer min-h-[180px] flex items-center justify-center"
        >
          {/* Background remains white on hover */}
          <div className="absolute inset-0 bg-white opacity-100" />
          
          <div className="relative z-10 w-full text-center">
            {/* Title - Hidden on Hover */}
            <div className="transition-all duration-500 opacity-100 group-hover:opacity-0 group-hover:scale-95">
              <h1 className="text-2xl font-bold text-blue-600">
                {item.title}
              </h1>
            </div>

            {/* Description - Shows on Hover */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-4 transition-all duration-500 opacity-0 group-hover:opacity-100">
              <p className="text-gray-600 text-xl leading-relaxed text-center">
                {item.desc}
              </p>
            </div>
          </div>

          {/* Bottom Border */}
          <div 
            className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 
                       transition-all duration-500 group-hover:w-full"
          />
        </div>
      ))}
    </div>
  </div>
</section>

      <WhatsAppButton />
    
    </div>
  );
}



// import React from 'react';
// import { ShieldCheckIcon, ScaleIcon, LightBulbIcon, BuildingOfficeIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/outline';
// import Header from '../component/Header';
// import Footer from '../component/Footer';

// // Custom Icons
// const VisionIcon = ({ className = '' }) => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
//         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
//         <circle cx="12" cy="12" r="3"/>
//     </svg>
// );

// const MissionIcon = ({ className = '' }) => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
//         <path d="M12 2L13.09 8.26L20 9.27L15 13.14L16.18 20L12 16.77L7.82 20L9 13.14L4 9.27L10.91 8.26L12 2Z"/>
//     </svg>
// );

// const values = [
//     {
//         title: 'VISION & MISSION',
//         description: 'AUDITFILING is already a known name, and with its close alignment with auditfiling.com and auditfilling.com, we are equipped to offer better value to start-up India. We are working round the clock to give unmatched quality and efficient service to businesses of all types and sizes. We wish to be known for our quality.',
//         icon: <VisionIcon className="w-12 h-12 text-blue-600 mx-auto" />,
//         features: ['Start-up India Focus', 'Unmatched Quality', '24/7 Service', 'Nationwide Recognition']
//     },
//     {
//         title: 'Future Trust',
//         description: 'We are a team of qualified Chartered Accountants, Company Secretaries, Advocates & professionals coming together to offer all professional services under one roof. With 1000+ staff, we are better positioned than traditional accounting firms to provide unmatched and quality transactional advisory.',
//         icon: <ShieldCheckIcon className="w-12 h-12 text-green-600 mx-auto" />,
//         features: ['1000+ Professionals', 'Multi-disciplinary Team', 'One Roof Solution', 'Transactional Advisory']
//     },
//     {
//         title: 'Legal Assurance',
//         description: 'Founded in 2006 as ABC3 Consultant, we launched auditfiling.com in 2012 to provide a centralized contact point for all services. We are India\'s most preferred start-up platform for company registration, licensing, accounting, taxation, and legal services.',
//         icon: <ScaleIcon className="w-12 h-12 text-purple-600 mx-auto" />,
//         features: ['Since 2006', 'Hassle-free NOC', 'Preferred Platform', 'All-in-One Services']
//     },
// ];

// const offices = [
//     { city: 'New Delhi', established: '2006' },
//     { city: 'Mumbai', established: '2010' },
//     { city: 'Bengaluru', established: '2012' },
//     { city: 'Bhubaneswar', established: '2014' },
//     { city: 'Chennai', established: '2015' },
//     { city: 'Kolkata', established: '2016' },
// ];

// const upcomingOffices = [
//     { city: 'Ahmedabad', timeline: 'Q1 2019-20' },
//     { city: 'Hyderabad', timeline: 'Q1 2019-20' },
//     { city: 'Pune', timeline: 'Q1 2019-20' },
// ];

// export default function AboutUsPage() {
//     return (
//         <div className="min-h-screen bg-gray-50">
//             <Header />
            
//             {/* Hero Section */}
//             <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20 px-4 mt-20">
//                 <div className="absolute inset-0 bg-black opacity-20"></div>
//                 <div className="max-w-6xl mx-auto relative z-10 text-center">
//                     <div className="max-w-4xl mx-auto">
//                         <p className="text-blue-200 italic text-lg mb-4">About AUDITFILING</p>
//                         <h1 className="text-5xl md:text-6xl font-bold font-serif mb-6 leading-tight">
//                             Our Guiding Principles for 
//                             <span className="text-blue-300 block">Trusted Services</span>
//                         </h1>
//                         <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
//                             Leading India's start-up revolution with comprehensive professional services 
//                             across major cities, serving entrepreneurs nationwide with excellence and integrity.
//                         </p>
//                     </div>
//                 </div>
//             </section>

//             {/* Values Section */}
//             <section className="py-16 px-4">
//                 <div className="max-w-7xl mx-auto">
//                     {/* Section Header */}
//                     <div className="text-center mb-16">
//                         <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
//                             <StarIcon className="w-4 h-4" />
//                             OUR CORE VALUES
//                         </div>
//                         <h2 className="text-4xl font-bold font-serif text-gray-900 mb-6">
//                             Building Trust Through Excellence
//                         </h2>
//                         <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
//                             AUDITFILING is committed to delivering unparalleled quality and efficiency 
//                             to businesses of all sizes across India, backed by a team of experienced professionals.
//                         </p>
//                     </div>

//                     {/* Values Grid */}
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
//                         {values.map((value, idx) => (
//                             <div
//                                 key={idx}
//                                 className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 transform hover:-translate-y-2"
//                             >
//                                 {/* Icon Container */}
//                                 <div className="relative mb-6">
//                                     <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                                     <div className="relative z-10">
//                                         {value.icon}
//                                     </div>
//                                 </div>

//                                 {/* Content */}
//                                 <h3 className="text-2xl font-bold font-serif text-gray-900 mb-4 text-center">
//                                     {value.title}
//                                 </h3>
//                                 <p className="text-gray-600 leading-relaxed mb-6 text-center">
//                                     {value.description}
//                                 </p>

//                                 {/* Features List */}
//                                 <div className="space-y-2">
//                                     {value.features.map((feature, featureIdx) => (
//                                         <div key={featureIdx} className="flex items-center gap-3 text-sm text-gray-700">
//                                             <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                                             <span>{feature}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Offices Section */}
//                     <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 text-white">
//                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                             <div>
//                                 <h3 className="text-3xl font-bold font-serif mb-6 flex items-center gap-3">
//                                     <BuildingOfficeIcon className="w-8 h-8 text-blue-300" />
//                                     Our Nationwide Presence
//                                 </h3>
//                                 <p className="text-blue-100 leading-relaxed mb-6">
//                                     With strategically located offices across India, we serve clients 
//                                     pan-India with local expertise and national capabilities.
//                                 </p>
                                
//                                 <div className="grid grid-cols-2 gap-4">
//                                     {offices.map((office, idx) => (
//                                         <div key={idx} className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
//                                             <MapPinIcon className="w-5 h-5 text-blue-300" />
//                                             <div>
//                                                 <div className="font-semibold">{office.city}</div>
//                                                 <div className="text-blue-200 text-sm">Since {office.established}</div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div>
//                                 <h4 className="text-xl font-semibold mb-4 text-blue-200">Coming Soon</h4>
//                                 <div className="space-y-3">
//                                     {upcomingOffices.map((office, idx) => (
//                                         <div key={idx} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
//                                             <span className="font-medium">{office.city}</span>
//                                             <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
//                                                 {office.timeline}
//                                             </span>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 {/* Stats */}
//                                 <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/20">
//                                     <div className="text-center">
//                                         <div className="text-3xl font-bold text-white">1000+</div>
//                                         <div className="text-blue-200 text-sm">Professionals</div>
//                                     </div>
//                                     <div className="text-center">
//                                         <div className="text-3xl font-bold text-white">15+</div>
//                                         <div className="text-blue-200 text-sm">Years Experience</div>
//                                     </div>
//                                     <div className="text-center">
//                                         <div className="text-3xl font-bold text-white">50K+</div>
//                                         <div className="text-blue-200 text-sm">Clients Served</div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* CTA Section */}
//                     <div className="text-center mt-12">
//                         <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
//                             <h3 className="text-2xl font-bold text-gray-900 mb-4">
//                                 Ready to Start Your Journey With Us?
//                             </h3>
//                             <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
//                                 Join thousands of successful businesses that trust AUDITFILING for their 
//                                 professional service needs across India.
//                             </p>
//                             <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
//                                 Get Started Today
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <Footer />
//         </div>
//     );
// }