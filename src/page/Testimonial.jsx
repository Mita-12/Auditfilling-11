import React, { useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "S.Anandan",
    role: "Owner, Tamil Nadu",
    content:
      "Relationship Manager for my property closely followed up with potential buyers",
    image: "https://via.placeholder.com/40",
  },
  {
    id: 2,
    name: "Infinite Foundations & Realty Services",
    role: "",
    content:
      "Enables us to reach far more diverse audience compared to traditional adv media",
    image: "https://via.placeholder.com/40",
  },
  {
    id: 3,
    name: "Color Home",
    role: "",
    content:
      "Suggestions and trends shared are useful for us to set our targets",
    image: "https://via.placeholder.com/40",
  },
];

export default function Testimonials() {
  const scrollRef = useRef(null);

  // Manual scroll
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  // Auto-scroll every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: 320,
          behavior: "smooth",
        });

        // If reached end → reset to start
        if (
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
          scrollRef.current.scrollWidth
        ) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gray-50 py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <p className="uppercase text-sm text-gray-500 font-semibold mb-2">
          Testimonials
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          What our customers are saying about{" "}
          <span className="text-blue-600">AuditFiling</span>
        </h2>
        <p className="text-gray-600 mb-8">
          Hear from our satisfied buyers, tenants, owners and dealers
        </p>

        {/* Slider */}
        <div className="relative">
          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-3 rounded-full z-10 hover:bg-gray-100"
          >
            <FaChevronLeft className="text-gray-700" />
          </button>

          {/* Testimonials List */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth"
          >
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="min-w-[320px] max-w-sm bg-white rounded-xl shadow-sm border p-6 flex flex-col hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{t.name}</h4>
                    {t.role && (
                      <p className="text-sm text-gray-500">{t.role}</p>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t.content}
                </p>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-3 rounded-full z-10 hover:bg-gray-100"
          >
            <FaChevronRight className="text-gray-700" />
          </button>
        </div>

        
      </div>
    </section>
  );
}
