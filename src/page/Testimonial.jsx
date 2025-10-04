// import React, { useEffect, useRef } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// const testimonials = [
//   {
//     id: 1,
//     name: "S.Anandan",
//     role: "Owner, Tamil Nadu",
//     content:
//       "Relationship Manager for my property closely followed up with potential buyers",
//     image: "https://via.placeholder.com/40",
//   },
//   {
//     id: 2,
//     name: "Infinite Foundations & Realty Services",
//     role: "",
//     content:
//       "Enables us to reach far more diverse audience compared to traditional adv media",
//     image: "https://via.placeholder.com/40",
//   },
//   {
//     id: 3,
//     name: "Color Home",
//     role: "",
//     content:
//       "Suggestions and trends shared are useful for us to set our targets",
//     image: "https://via.placeholder.com/40",
//   },
// ];

// export default function Testimonials() {
//   const scrollRef = useRef(null);

//   // Manual scroll
//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({
//         left: direction === "left" ? -320 : 320,
//         behavior: "smooth",
//       });
//     }
//   };

//   // Auto-scroll every 4s
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (scrollRef.current) {
//         scrollRef.current.scrollBy({
//           left: 320,
//           behavior: "smooth",
//         });

//         // If reached end → reset to start
//         if (
//           scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
//           scrollRef.current.scrollWidth
//         ) {
//           scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
//         }
//       }
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="bg-gray-50 py-12 px-6">
//       <div className="container mx-auto max-w-6xl">
//         {/* Header */}
//         <p className="uppercase text-sm text-gray-500 font-semibold mb-2">
//           Testimonials
//         </p>
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
//           What our customers are saying about{" "}
//           <span className="text-blue-600">AuditFiling</span>
//         </h2>
//         <p className="text-gray-600 mb-8">
//           Hear from our satisfied buyers, tenants, owners and dealers
//         </p>

//         {/* Slider */}
//         <div className="relative">
//           {/* Left Button */}
//           <button
//             onClick={() => scroll("left")}
//             className="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-3 rounded-full z-10 hover:bg-gray-100"
//           >
//             <FaChevronLeft className="text-gray-700" />
//           </button>

//           {/* Testimonials List */}
//           <div
//             ref={scrollRef}
//             className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth"
//           >
//             {testimonials.map((t) => (
//               <div
//                 key={t.id}
//                 className="min-w-[320px] max-w-sm bg-white rounded-xl shadow-sm border p-6 flex flex-col hover:shadow-lg transition-all duration-300"
//               >
//                 <div className="flex items-center gap-3 mb-4">
//                   <img
//                     src={t.image}
//                     alt={t.name}
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                   <div>
//                     <h4 className="font-semibold text-gray-900">{t.name}</h4>
//                     {t.role && (
//                       <p className="text-sm text-gray-500">{t.role}</p>
//                     )}
//                   </div>
//                 </div>
//                 <p className="text-gray-600 text-sm leading-relaxed">
//                   {t.content}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* Right Button */}
//           <button
//             onClick={() => scroll("right")}
//             className="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-3 rounded-full z-10 hover:bg-gray-100"
//           >
//             <FaChevronRight className="text-gray-700" />
//           </button>
//         </div>

        
//       </div>
//     </section>
//   );
// }
import React from "react";
import { FaStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    title: "Seamless & Efficient Audit Management",
    review:
      "AuditFilling.com has completely transformed the way we handle our audits. The platform is user-friendly, automated, and ensures compliance with all regulations. It has significantly reduced our audit processing time and improved accuracy. Highly recommended!",
    name: "Akshay Jain",
    company: "Embedded Design Solution",
    rating: 5,
  },
  {
    id: 2,
    title: "Saves Time & Ensures Compliance",
    review:
      "Using AuditFilling.com has made our audit filing process smoother and more efficient. The automated workflows and real-time tracking features are a game changer. A must-have tool for financial professionals!",
    name: "Anurag Mishra",
    company: "M/S Daba India Generic Pharma",
    rating: 5,
  },
  {
    id: 3,
    title: "User-Friendly & Highly Secure",
    review:
      "What I love about AuditFilling.com is its intuitive interface and top-notch security. Our audit data is well-organized, easily accessible, and securely stored. The platform has made audits hassle-free and given us peace of mind.",
    name: "Pitabash Behera",
    company: "Star Services",
    rating: 4,
  },
  {
    id: 4,
    title: "Best Audit Management Software in the Market",
    review:
      "AuditFilling.com has revolutionized our auditing process. The AI-powered insights and automated reporting features have helped us optimize our workflow. Excellent customer support as well!",
    name: "Partho Ghosh",
    company: "Satyam Shivam Enterprisers",
    rating: 5,
  },
];

export default function TestimonialGrid() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          What <span className="text-blue-600">Our Users</span> Say About AuditFilling
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex justify-center text-yellow-400 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <p className="text-gray-600 italic mb-4">
                <FaQuoteLeft className="inline mr-2 text-blue-500" />
                {t.review}
                <FaQuoteRight className="inline ml-2 text-blue-500" />
              </p>

              <h3 className="font-semibold text-gray-800">{t.name}</h3>
              <p className="text-gray-500 text-sm">{t.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}





