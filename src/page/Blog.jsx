// import React, { useState } from "react";
// import Header from "../component/Header";
// import QuickForm from "../form/QuickForm";
// import WhatsAppPopup from "../form/WhatsAppPopup";
// import Footer from "../component/Footer";

// function BlogPage() {
//   // Blog data
//   const blogList = [
//     {
//       id: 1,
//       title: "Blog Post Title 1",
//       image: "/img/professional.png",
//       content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
//       pulvinar nunc sit amet turpis euismod, sit amet fermentum magna
//       laoreet. Sed consequat, magna in varius faucibus, lorem erat
//       lacinia mauris, vitae vulputate elit odio a justo.`,
//     },
//     {
//       id: 2,
//       title: "Blog Post Title 2",
//       image: "/img/professional.png",
//       content: `Second blog content goes here. Nulla facilisi. Phasellus egestas,
//       dui nec posuere feugiat, sapien sapien vulputate purus, vel dapibus risus.`,
//     },
//     {
//       id: 3,
//       title: "Blog Post Title 3",
//       image: "/img/professional.png",
//       content: `Third blog content. Etiam sed nisi a ligula sodales facilisis.
//       Sed vitae dui eget justo ultricies dictum.`,
//     },
//     {
//       id: 4,
//       title: "Blog Post Title 4",
//       image: "/img/professional.png",
//       content: `Fourth blog content. Integer sit amet purus eget risus tristique
//       vehicula nec sit amet lorem.`,
//     },
//   ];

//   // State for selected blog
//   const [selectedBlog, setSelectedBlog] = useState(blogList[0]);

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Header */}
//       <Header />

//       {/* Main Content */}
//       <div className="flex-1 container mx-auto  m-25 px-4 lg:px-8 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

//           {/* Left Sidebar */}
//           <aside className="lg:col-span-3 space-y-4">
//             <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
//               Recent Blogs
//             </h2>
//             {blogList.map((blog) => (
//               <div
//                 key={blog.id}
//                 className={`bg-white shadow-sm rounded-lg p-4 cursor-pointer hover:shadow-md transition duration-300 ${
//                   selectedBlog.id === blog.id ? "border-l-4 border-blue-600" : ""
//                 }`}
//                 onClick={() => setSelectedBlog(blog)}
//               >
//                 <h3 className="text-base font-semibold text-gray-900 text-center">
//                   {blog.title}
//                 </h3>
//               </div>
//             ))}
//           </aside>

//           {/* Middle Content */}
//           <main className="lg:col-span-6 bg-white shadow rounded-xl overflow-hidden">
//             <img
//               src={selectedBlog.image}
//               alt={selectedBlog.title}
//               className="w-full h-64 object-cover"
//             />
//             <div className="p-6">
//               <h1 className="text-3xl font-bold mb-4 text-gray-900">
//                 {selectedBlog.title}
//               </h1>
//               <p className="text-gray-700 leading-relaxed">
//                 {selectedBlog.content}
//               </p>
//             </div>
//           </main>

//           {/* Right Sidebar */}
//           <aside className="lg:col-span-3">
             
//               <QuickForm />
//           </aside>

//         </div>
//       </div>

//       {/* Footer */}
//       <Footer />

//       {/* WhatsApp Button */}
//       <WhatsAppPopup />
//     </div>
//   );
// }

// export default BlogPage;

import React, { useState, useMemo } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import WhatsAppPopup from "../form/WhatsAppPopup";

function BlogPage() {
  // Blog categories
  const categories = [
    "All",
    "Income Tax",
    "GST",
    "Startup Registration",
    "MCA",
    "Trademark",
    "Bank Valuation",
    "Legal"
  ];

  // Blog data with categories
 const blogList = [
  {
    id: 1,
    title: "Understanding Income Tax Slabs for FY 2024-25",
    image: "https://images.unsplash.com/photo-1603570411035-0ee2f1c76c41?auto=format&fit=crop&w=800&q=80",
    excerpt: "Learn about the latest income tax slabs and how to optimize your tax savings for the financial year 2024-25.",
    content: `Comprehensive guide on income tax slabs, deductions, and tax planning strategies for individuals and businesses...`,
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Income Tax",
    author: "Tax Expert"
  },
  {
    id: 2,
    title: "GST Registration Process Simplified",
    image: "https://images.unsplash.com/photo-1581090700227-0e2f96748c30?auto=format&fit=crop&w=800&q=80",
    excerpt: "Step-by-step guide to GST registration for new businesses with common pitfalls to avoid.",
    content: `Complete walkthrough of GST registration process, documentation required, and post-registration compliance...`,
    date: "2024-01-12",
    readTime: "6 min read",
    category: "GST",
    author: "GST Consultant"
  },
  {
    id: 3,
    title: "Startup India Registration Benefits",
    image: "https://images.unsplash.com/photo-1612831661645-b9d0e682aa3f?auto=format&fit=crop&w=800&q=80",
    excerpt: "Discover the benefits and process of registering your startup under Startup India scheme.",
    content: `Detailed analysis of tax benefits, funding opportunities, and compliance relaxations for registered startups...`,
    date: "2024-01-10",
    readTime: "7 min read",
    category: "Startup Registration",
    author: "Startup Advisor"
  },
  {
    id: 4,
    title: "MCA Compliance Calendar 2024",
    image: "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=800&q=80",
    excerpt: "Important MCA filing deadlines and compliance requirements for companies in 2024.",
    content: `Monthly compliance calendar for companies registered under Ministry of Corporate Affairs...`,
    date: "2024-01-08",
    readTime: "5 min read",
    category: "MCA",
    author: "Company Secretary"
  },
  {
    id: 5,
    title: "Trademark Registration Process in India",
    image: "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d7?auto=format&fit=crop&w=800&q=80",
    excerpt: "Complete guide to trademark registration, search, and protection in India.",
    content: `Step-by-step process for trademark registration, objection handling, and renewal procedures...`,
    date: "2024-01-05",
    readTime: "9 min read",
    category: "Trademark",
    author: "IP Attorney"
  },
  {
    id: 6,
    title: "Bank Valuation Methods for Businesses",
    image: "https://images.unsplash.com/photo-1611162617211-96de5aa0e96e?auto=format&fit=crop&w=800&q=80",
    excerpt: "Understanding different valuation methods used by banks for business loans.",
    content: `Comparative analysis of asset-based, income-based, and market-based valuation approaches...`,
    date: "2024-01-03",
    readTime: "6 min read",
    category: "Bank Valuation",
    author: "Valuation Expert"
  },
  {
    id: 7,
    title: "Legal Compliance for Small Businesses",
    image: "https://images.unsplash.com/photo-1596079898418-0d3a37c77f2b?auto=format&fit=crop&w=800&q=80",
    excerpt: "Essential legal compliance requirements every small business should know.",
    content: `Comprehensive guide to labor laws, contract requirements, and regulatory compliance for SMEs...`,
    date: "2024-01-01",
    readTime: "10 min read",
    category: "Legal",
    author: "Legal Advisor"
  },
  {
    id: 8,
    title: "GST Return Filing Checklist",
    image: "https://images.unsplash.com/photo-1581090700227-0e2f96748c30?auto=format&fit=crop&w=800&q=80",
    excerpt: "Monthly GST return filing checklist to avoid penalties and interest.",
    content: `Detailed checklist for GSTR-1, GSTR-3B, and annual return filing with common mistakes to avoid...`,
    date: "2023-12-28",
    readTime: "5 min read",
    category: "GST",
    author: "GST Practitioner"
  },
  {
    id: 9,
    title: "Income Tax Deductions Under Section 80C",
    image: "https://images.unsplash.com/photo-1603570411035-0ee2f1c76c41?auto=format&fit=crop&w=800&q=80",
    excerpt: "Maximize your tax savings with these Section 80C deduction options.",
    content: `Complete list of investments and expenses eligible for deduction under Section 80C...`,
    date: "2023-12-25",
    readTime: "7 min read",
    category: "Income Tax",
    author: "Tax Planner"
  }
];


  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter blogs based on selected category and search term
  const filteredBlogs = useMemo(() => {
    return blogList.filter(blog => {
      const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.content.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Function to handle blog card click (could be used for navigation)
  const handleBlogClick = (blogId) => {
    // Here you can navigate to individual blog page
    console.log(`Navigating to blog ${blogId}`);
    // Example: navigate(`/blog/${blogId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4  m-25 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Professional Blogs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights on taxation, compliance, legal matters, and business advisory
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
            <div className="absolute right-3 top-3">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar - Categories */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">Categories</h2>
              
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
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          selectedCategory === category 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {blogList.filter(blog => blog.category === category).length}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Newsletter Subscription */}
              <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">Stay Updated</h3>
                <p className="text-sm text-gray-600 mb-3">Get latest blogs directly in your inbox</p>
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

          {/* Right Side - Blog Cards */}
          <main className="lg:col-span-3">
            {/* Category Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === "All" ? "All Blogs" : selectedCategory}
              </h2>
              <p className="text-gray-600">
                {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'} found
              </p>
            </div>

            {/* Blog Cards Grid */}
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBlogs.map((blog) => (
                  <article 
                    key={blog.id}
                    onClick={() => handleBlogClick(blog.id)}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group"
                  >
                    {/* Blog Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = "/img/blog-placeholder.jpg";
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    {/* Blog Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-500">{blog.date}</span>
                        <span className="text-sm text-gray-500">{blog.readTime}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                        {blog.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{blog.author}</span>
                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                          Read More
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* No Blogs Found */
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
                <p className="text-gray-600 mb-4">Try changing your search or filter criteria</p>
                <button 
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchTerm("");
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Load More Button (for pagination) */}
            {filteredBlogs.length > 0 && (
              <div className="text-center mt-8">
                <button className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition duration-200 font-medium">
                  Load More Articles
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppPopup />
    </div>
  );
}

export default BlogPage;