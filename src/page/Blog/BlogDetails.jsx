
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BlogDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state?.blog;

  // Redirect safely if no blog data
  useEffect(() => {
    if (!blog) {
      navigate("/blogs");
    }
  }, [blog, navigate]);

  // Sidebar state
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Dummy blog list (optional: replace with API data or context)
  const blogList = [
    { id: 1, title: "GST Registration Guide", category: "GST" },
    { id: 2, title: "Trademark Application Process", category: "Trademark" },
    { id: 3, title: "Income Tax Return Tips", category: "Income Tax" },
  ];

  const categories = [
    "All",
    "Income Tax",
    "GST",
    "Startup Registration",
    "MCA",
    "Trademark",
    "Bank Valuation",
    "Legal",
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  if (!blog) return null;

  return (
    <div className="flex flex-col mt-24 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* LEFT SIDEBAR */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">
                Categories
              </h2>

              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      selectedCategory === category
                        ? "bg-blue-50 text-blue-700 font-semibold border border-blue-200"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category}</span>
                      {category !== "All" && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            selectedCategory === category
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {blogList.filter(
                            (b) => b.category === category
                          ).length}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Newsletter Subscription */}
              <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Stay Updated
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Get the latest blogs directly in your inbox
                </p>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
                  />
                  <button className="w-full bg-blue-600 text-white py-2 text-sm rounded-lg hover:bg-blue-700 transition duration-200">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">{blog.title}</h1>
            
            <img
              src={blog.image || "/img/blog-placeholder.jpg"}
              alt={blog.title}
              className="w-full h-[28rem] object-cover rounded-2xl mb-8 shadow-sm"
            />

            <div
              className="prose max-w-none text-gray-700  "
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>

            <button
              onClick={() => navigate("/blogs")}
              className="mt-10 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              ← Back to Blogs
            </button>
          </main>
        </div>
      </div>
    </div>
  );
}

export default BlogDetailPage;

