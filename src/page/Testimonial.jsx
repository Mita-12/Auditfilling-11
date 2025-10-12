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
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const testimonialsData = [
  {
    id: 1,
    title: "Seamless & Efficient Audit Management",
    review:
      "AuditFilling.com has completely transformed the way we handle our audits. The platform is user-friendly, automated, and ensures compliance with all regulations.",
    name: "Akshay Jain",
    company: "Embedded Design Solution",
    rating: 5,
    avatar: "AJ",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Saves Time & Ensures Compliance",
    review:
      "Using AuditFilling.com has made our audit filing process smoother and more efficient. A must-have tool for financial professionals!",
    name: "Anurag Mishra",
    company: "M/S Daba India Generic Pharma",
    rating: 5,
    avatar: "AM",
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "User-Friendly & Highly Secure",
    review:
      "What I love about AuditFilling.com is its intuitive interface and top-notch security. Our audit data is well-organized and securely stored.",
    name: "Pitabash Behera",
    company: "Star Services",
    rating: 4,
    avatar: "PB",
    color: "bg-purple-500",
  },
  {
    id: 4,
    title: "Best Audit Management Software in the Market",
    review:
      "AuditFilling.com has revolutionized our auditing process with AI-powered insights and excellent customer support!",
    name: "Partho Ghosh",
    company: "Satyam Shivam Enterprisers",
    rating: 5,
    avatar: "PG",
    color: "bg-orange-500",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        (prevIndex + 1) % testimonialsData.length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Get visible 3 cards based on current index
  const visibleTestimonials = [
    testimonialsData[currentIndex],
    testimonialsData[(currentIndex + 1) % testimonialsData.length],
    testimonialsData[(currentIndex + 2) % testimonialsData.length],
  ];

  return (
    <section className="bg-gray-50 py-16 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold font-serif text-gray-800">
          What Our Clients Say
        </h2>
        <span className="block w-24 h-1 bg-blue-600 mx-auto mt-3 transition-all duration-500"></span>
        <p className="text-gray-500 mt-2">
          Trusted by professionals and businesses across industries.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / 3)}%)`,
          }}
        >
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="min-w-[33.33%] px-3"
            >
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition h-full flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {testimonial.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm flex-grow">
                  {testimonial.review}
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-semibold ${testimonial.color}`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.company}
                    </p>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < testimonial.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-blue-600" : "bg-gray-300"
                } transition`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}







