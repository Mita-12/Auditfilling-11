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
    avatar: "AJ",
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Saves Time & Ensures Compliance",
    review:
      "Using AuditFilling.com has made our audit filing process smoother and more efficient. The automated workflows and real-time tracking features are a game changer. A must-have tool for financial professionals!",
    name: "Anurag Mishra",
    company: "M/S Daba India Generic Pharma",
    rating: 5,
    avatar: "AM",
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "User-Friendly & Highly Secure",
    review:
      "What I love about AuditFilling.com is its intuitive interface and top-notch security. Our audit data is well-organized, easily accessible, and securely stored. The platform has made audits hassle-free and given us peace of mind.",
    name: "Pitabash Behera",
    company: "Star Services",
    rating: 4,
    avatar: "PB",
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "Best Audit Management Software in the Market",
    review:
      "AuditFilling.com has revolutionized our auditing process. The AI-powered insights and automated reporting features have helped us optimize our workflow. Excellent customer support as well!",
    name: "Partho Ghosh",
    company: "Satyam Shivam Enterprisers",
    rating: 5,
    avatar: "PG",
    color: "bg-orange-500"
  },
];

export default function TestimonialGrid() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            Testimonials
          </div> */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What <span className="text-blue-600">Our Users</span> Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover why thousands of businesses trust AuditFiling for their compliance needs
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative"
            >
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50/50 rounded-2xl shadow-lg transform group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 border border-blue-100/50" />
              
              {/* Main Card Content */}
              <div className="relative p-6 md:p-8 h-full flex flex-col">
                {/* Rating & Quote */}
                <div className="mb-6">
                  <div className="flex justify-center mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`text-lg ${
                          i < testimonial.rating 
                            ? "text-yellow-400 fill-current" 
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  
                  <div className="relative">
                    <FaQuoteLeft className="absolute -top-2 -left-2 text-blue-200 text-xl" />
                    <h3 className="font-semibold text-gray-900 text-lg mb-3 px-4">
                      {testimonial.title}
                    </h3>
                    <FaQuoteRight className="absolute -bottom-2 -right-2 text-blue-200 text-xl" />
                  </div>
                </div>

                {/* Review Text */}
                <div className="flex-1 mb-6">
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {testimonial.review}
                  </p>
                </div>

                {/* User Info */}
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                  <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-semibold`}>
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.company}</p>
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        {/* <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">4.9/5</div>
              <div className="text-gray-600 text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600 text-sm">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">99%</div>
              <div className="text-gray-600 text-sm">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600 text-sm">Support Available</div>
            </div>
          </div>
        </div> */}

        {/* CTA Section */}
        {/* <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Ready to join our satisfied customers?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
              Start Free Trial
            </button>
            <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
              View More Reviews
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
}





