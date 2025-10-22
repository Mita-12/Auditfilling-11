
// import React from 'react';
// import { FaStar } from 'react-icons/fa';

// const  TestimonialSection = [
//   {
//     id: 1,
//     title: "Seamless & Efficient Audit Management",
//     review:
//       "AuditFilling.com has completely transformed the way we handle our audits. The platform is user-friendly, automated, and ensures compliance with all regulations. It has significantly reduced our audit processing time and improved accuracy. Highly recommended!",
//     name: "Akshay Jain",
//     company: "Embedded Design Solution",
//     rating: 5,
//     avatar: "AJ",
//     color: "bg-blue-500"
//   },
//   {
//     id: 2,
//     title: "Saves Time & Ensures Compliance",
//     review:
//       "Using AuditFilling.com has made our audit filing process smoother and more efficient. The automated workflows and real-time tracking features are a game changer. A must-have tool for financial professionals!",
//     name: "Anurag Mishra",
//     company: "M/S Daba India Generic Pharma",
//     rating: 5,
//     avatar: "AM",
//     color: "bg-green-500"
//   },
//   {
//     id: 3,
//     title: "User-Friendly & Highly Secure",
//     review:
//       "What I love about AuditFilling.com is its intuitive interface and top-notch security. Our audit data is well-organized, easily accessible, and securely stored. The platform has made audits hassle-free and given us peace of mind.",
//     name: "Pitabash Behera",
//     company: "Star Services",
//     rating: 4,
//     avatar: "PB",
//     color: "bg-purple-500"
//   },
//   {
//     id: 4,
//     title: "Best Audit Management Software in the Market",
//     review:
//       "AuditFilling.com has revolutionized our auditing process. The AI-powered insights and automated reporting features have helped us optimize our workflow. Excellent customer support as well!",
//     name: "Partho Ghosh",
//     company: "Satyam Shivam Enterprisers",
//     rating: 5,
//     avatar: "PG",
//     color: "bg-orange-500"
//   }
// ];

// const testimonials = () => {
//   return (
//     <section className="bg-gray-50 py-16 px-4">
//       <div className="max-w-6xl mx-auto text-center mb-12">
//         <h2 className="text-4xl font-bold font-serif text-gray-800">What Our Clients Say</h2>
//         <p className="text-gray-500 mt-2">Trusted by professionals and businesses across industries.</p>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {TestimonialSection.map((testimonial) => (
//           <div
//             key={testimonial.id}
//             className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition w-full"
//           >
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">{testimonial.title}</h3>
//             <p className="text-gray-600 mb-4 text-sm">{testimonial.review}</p>

//             <div className="flex items-center gap-4 mt-auto">
//               <div
//                 className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-semibold ${testimonial.color}`}
//               >
//                 {testimonial.avatar}
//               </div>
//               <div>
//                 <p className="font-semibold text-gray-800">{testimonial.name}</p>
//                 <p className="text-sm text-gray-500">{testimonial.company}</p>
//                 <div className="flex text-yellow-400 mt-1">
//                   {[...Array(5)].map((_, i) => (
//                     <FaStar
//                       key={i}
//                       className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
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
import React from 'react';
import { FaStar } from 'react-icons/fa';

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
    color: "bg-orange-500"
  }
];

const testimonials = () => {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold font-serif text-gray-800">What Our Clients Say</h2>
        <p className="text-gray-500 mt-2">Trusted by professionals and businesses across industries.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {TestimonialSection.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition w-full"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{testimonial.title}</h3>
            <p className="text-gray-600 mb-4 text-sm">{testimonial.review}</p>

            <div className="flex items-center gap-4 mt-auto">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-semibold ${testimonial.color}`}
              >
                {testimonial.avatar}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.company}</p>
                <div className="flex text-yellow-400 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


    </section>
  );
};

export default testimonials;






