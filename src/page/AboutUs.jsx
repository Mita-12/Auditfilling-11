
import React from 'react';
import { ShieldCheckIcon, ScaleIcon } from '@heroicons/react/24/outline';
import { div } from 'motion/react-client';
import Header from '../component/Header';
import Footer from '../component/Footer';

// Custom Gavel / Hammer SVG to mimic the icon in your image
const HammerIcon = ({ className = '' }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M14.7 9.3l.707-.707a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414l-.707.707-2.293-2.293z" />
        <path d="M5 19l9-9" />
        <path d="M15 5l4 4" />
        <path d="M6 18h8v2H6z" />
    </svg>
);

const values = [
    {
        // title: 'Trusted Commitment',
        title: 'VISION & MISSION',
        description:
            'AUDITFILING is already a known name, and with its close alignment with auditfiling.com and auditfilling.com, we are equipped to offer better value to start-up India.We are working round the clock to give unmatched quality and efficient service to the business of all type and size. We wish to be known for our quality.',

    },
    {
        title: 'Future Trust',
        description:
            'We are a team of qualified Chartered Accountants, Company Secretaries, Advocates & professionals coming together to offer all professional services under one roof.With 1000+ staffs we are better positioned in comparison to traditional accounting firms to provide unmatched and quality transactional advisory.',
    },
    {
        title: 'Legal Assurance',
        description:
            'We started 2006 as ABC3 Consultant, and in the year 2012 founded the website auditfiling.com to provide a contact point for all services offered by us.We are India s most preferred start-up platform to offer company registration, licensing, accounting & taxation and legal services.Our most trusted services gives our clients hassle free No objection certificate immediately to change the auditors and advisers as and when require.',

    },
];

export default function AboutUsPage() {
    return (
        <div>
            <Header />
            <section className=" text-black  py-16 px-4 mt-20">
                <div className="max-w-6xl mx-auto text-center">
                    <div className=" max-w-3xl mx-auto  mb-5">
                        <p className="text-black italic text-5xl mb-5">Our Value</p>
                        <h2 className="text-4xl font-bold font-serif mb-9">
                            Our Guiding Principles for Trusted AUDITFILING Services
                        </h2>
                        <p className="text-gray-700 text-center text-lg leading-relaxed">
                            AUDITFILING offices in New Delhi, Mumbai, Bengaluru, Bhubaneswar, Chennai & Kolkata. We are going to open our offices in Ahmedabad, Hyderabad, and Pune in the first quarter of the FY 2019-20. However, we are serving all over India with a host of products useful for aspiring entrepreneurs and Start-up India.
                        </p>
                    </div>



                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-10">
                        {values.map((value, idx) => (
                            <div
                                key={idx}
                                className={`
                relative overflow-hidden rounded-lg shadow-lg
                px-10 py-8 transition-transform duration-300
                ${value.highlight
                                        ? ' text-black'
                                        : 'bg-white text-gray-800'}
                
              `}
                            >
                                <div className="flex justify-center mb-5">
                                    {value.icon}
                                </div>
                                <h3 className="text-2xl font-semibold mb-3 text-center  font-serif">
                                    {value.title}
                                </h3>
                                <p className={`text-lg text-gray-700 text-center   leading-relaxed ${value.highlight ? 'text-gray-800' : 'text-gray-600'}`}>
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
