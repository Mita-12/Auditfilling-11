
// import React, { useState, useEffect, useMemo } from "react";
// import axios from "axios";

// import WhatsAppPopup from "../../form/WhatsAppPopup";
// import { useNavigate } from "react-router-dom";

// function BlogPage() {
//   // Blog categories
//   const categories = [
//     "All",
//     "Income Tax",
//     "GST",
//     "Startup Registration",
//     "MCA",
//     "Trademark",
//     "Bank Valuation",
//     "Legal"
//   ];

//   // State for blogs
//   const [blogList, setBlogList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // State for selected category and search term
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");

//   // State for modal
//   const [selectedBlog, setSelectedBlog] = useState(null);
//   const navigate = useNavigate();

//   // Fetch blogs from API
//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await axios.get("https://auditfiling.com/api/v1/our_stories");
//         setBlogList(response.data || []);
//       } catch (error) {
//         console.error("Error fetching blogs:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   // Filter blogs based on category and search
//   const filteredBlogs = useMemo(() => {
//     return blogList.filter(blog => {
//       const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
//       const matchesSearch =
//         blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (blog.excerpt && blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (blog.content && blog.content.toLowerCase().includes(searchTerm.toLowerCase()));
//       return matchesCategory && matchesSearch;
//     });
//   }, [blogList, selectedCategory, searchTerm]);

//   // Handle category selection
//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//   };

//   // Handle "Read More" click
// const handleReadMore = (blog) => {
//   navigate("/blog-detail", { state: { blog } });
// };

//   return (
//     <div className="flex flex-col min-h-screen">
 

//       {/* Main Content */}
//       <div className="flex-1 container mt-25 mx-auto px-4 lg:px-8 py-8">
//         {/* Page Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
//             Professional Blogs
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Expert insights on taxation, compliance, legal matters, and business advisory
//           </p>
//         </div>

//         {/* Search Bar */}
//         <div className="mb-8 max-w-2xl mx-auto">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search blogs..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
//             />
//             <div className="absolute right-3 top-3">
//               <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
//           {/* Left Sidebar - Categories */}
//           <aside className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
//               <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">Categories</h2>
//               <div className="space-y-2">
//                 {categories.map((category) => (
//                   <button
//                     key={category}
//                     onClick={() => handleCategorySelect(category)}
//                     className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
//                       selectedCategory === category
//                         ? "bg-blue-50 text-blue-700 font-semibold border border-blue-200"
//                         : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//                     }`}
//                   >
//                     <div className="flex items-center justify-between">
//                       <span>{category}</span>
//                       {category !== "All" && (
//                         <span className={`text-xs px-2 py-1 rounded-full ${
//                           selectedCategory === category
//                             ? "bg-blue-100 text-blue-800"
//                             : "bg-gray-100 text-gray-600"
//                         }`}>
//                           {blogList.filter(blog => blog.category === category).length}
//                         </span>
//                       )}
//                     </div>
//                   </button>
//                 ))}
//               </div>

//               {/* Newsletter Subscription */}
//               <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
//                 <h3 className="font-semibold text-gray-900 mb-2">Stay Updated</h3>
//                 <p className="text-sm text-gray-600 mb-3">Get latest blogs directly in your inbox</p>
//                 <div className="space-y-2">
//                   <input
//                     type="email"
//                     placeholder="Email address"
//                     className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
//                   />
//                   <button className="w-full bg-blue-600 text-white py-2 text-sm rounded-lg hover:bg-blue-700 transition duration-200">
//                     Subscribe
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </aside>

//           {/* Right Side - Blog Cards */}
//           <main className="lg:col-span-3">
//             {/* Category Header */}
//             <div className="mb-6">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 {selectedCategory === "All" ? "All Blogs" : selectedCategory}
//               </h2>
//               <p className="text-gray-600">
//                 {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'} found
//               </p>
//             </div>

//             {/* Blog Cards Grid */}
//             {loading ? (
//               <div className="text-center py-12">
//                 <p className="text-gray-600 text-lg">Loading blogs...</p>
//               </div>
//             ) : filteredBlogs.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {filteredBlogs.map((blog) => (
//                   <article
//                     key={blog.id}
//                     className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group"
//                   >
//                     {/* Blog Image */}
//                     <div className="relative overflow-hidden">
//                       <img
//                         src={blog.image || "/img/blog-placeholder.jpg"}
//                         alt={blog.title}
//                         className="w-full h-48 object-contain bg-gray-100 rounded-lg group-hover:scale-105 transition-transform duration-300"
//                       />
//                     </div>

//                     {/* Blog Content */}
//                     <div className="p-6">
//                       <div className="flex items-center justify-between mb-1">
//                                                 <span className="text-sm font-medium text-gray-700">{blog.author || "Admin"}</span>

//                         <span className="text-sm text-gray-500">{blog.date}</span>
//                         <span className="text-sm text-gray-500">{blog.readTime || "5 min read"}</span>
//                       </div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
//                         {blog.title}
//                       </h3>
//                       <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
//                       <div className="flex items-center justify-between">
//                         {/* <span className="text-sm font-medium text-gray-700">{blog.author || "Admin"}</span> */}
//                         <button
//                           onClick={() => handleReadMore(blog)}
//                           className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
//                         >
//                           Read More
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 30">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                           </svg>
//                         </button>
//                       </div>
//                     </div>
//                   </article>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
//                 <p className="text-gray-600 mb-4">Try changing your search or filter criteria</p>
//                 <button
//                   onClick={() => {
//                     setSelectedCategory("All");
//                     setSearchTerm("");
//                   }}
//                   className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
//                 >
//                   Reset Filters
//                 </button>
//               </div>
//             )}

//             {/* Load More Button */}
//             {filteredBlogs.length > 0 && (
//               <div className="text-center mt-8">
//                 <button className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition duration-200 font-medium">
//                   Load More Articles
//                 </button>
//               </div>
//             )}
//           </main>
//         </div>
//       </div>

//       {/* Modal for full blog content */}
//       {selectedBlog && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 rounded-2xl overflow-auto max-h-[90vh] p-6 relative">
//             <button
//               onClick={() => setSelectedBlog(null)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
//             >
//               &times;
//             </button>
//             <h2 className="text-2xl font-bold mb-4">{selectedBlog.title}</h2>
//             <p className="text-sm text-gray-500 mb-2">{selectedBlog.date} • {selectedBlog.readTime || "5 min read"}</p>
//             <p className="text-gray-700 whitespace-pre-line">{selectedBlog.content}</p>
//           </div>
//         </div>
//       )}

//       {/* WhatsApp Button */}
//       <WhatsAppPopup />

    
//     </div>
//   );
// }

// export default BlogPage;


import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import WhatsAppPopup from "../../form/WhatsAppPopup";
import { useNavigate } from "react-router-dom";

function BlogPage() {
  // Blog categories (you can extend)
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

  // State for blogs
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & UI state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  // Modal state (kept for compatibility)
  const [selectedBlog, setSelectedBlog] = useState(null);
  const navigate = useNavigate();

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("https://auditfiling.com/api/v1/our_stories");
        // Ensure it's an array
        const data = Array.isArray(response.data) ? response.data : (response.data?.data || []);
        // Optionally, sort by date descending if date exists
        const sorted = data.slice().sort((a, b) => {
          const da = a.date ? new Date(a.date) : new Date(0);
          const db = b.date ? new Date(b.date) : new Date(0);
          return db - da;
        });
        setBlogList(sorted);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Filtering logic (category + search)
  const filteredBlogs = useMemo(() => {
    return blogList.filter(blog => {
      const matchesCategory = selectedCategory === "All" || (blog.category === selectedCategory);
      const lcSearch = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !lcSearch ||
        (blog.title && blog.title.toLowerCase().includes(lcSearch)) ||
        (blog.excerpt && blog.excerpt.toLowerCase().includes(lcSearch)) ||
        (blog.content && blog.content.toLowerCase().includes(lcSearch));
      return matchesCategory && matchesSearch;
    });
  }, [blogList, selectedCategory, searchTerm]);

  // Latest and Top Reads selection
  const latest = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const topReads = filteredBlogs.slice(1, 4); // next 3 entries

  // Pagination for grid (skip the hero/top reads items)
  const gridBlogs = filteredBlogs.slice(4); // remaining after latest + top reads
  const totalPages = Math.max(1, Math.ceil(gridBlogs.length / perPage));
  const currentPageItems = gridBlogs.slice((page - 1) * perPage, page * perPage);

  // Handlers
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleReadMore = (blog) => {
    // Keep existing nav to blog-detail state
    navigate("/blog-detail", { state: { blog } });
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchTerm("");
    setPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen mt-30  ">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Page header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3">Professional Blogs</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Expert insights on taxation, compliance, legal matters, and business advisory.
          </p>
        </div>

        {/* Search + categories row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                className="w-full px-5 py-3 border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`text-sm px-4 py-2 rounded-full transition ${selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-200 hover:shadow-sm"
                    }`}
                >
                  {cat}
                </button>
              ))}
              <button
                onClick={resetFilters}
                className="text-sm px-4 py-2 rounded-full bg-white text-gray-600 border border-gray-200 ml-2 hover:bg-gray-100"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Main 2-column layout: Left (large area) and Right (top reads) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left: Latest hero + grid content */}
          <div className="lg:col-span-3 space-y-8">
            {/* The Latest hero */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {loading ? (
                <div className="p-12 text-center text-gray-600">Loading latest...</div>
              ) : latest ? (
                <div className="lg:flex">
                  <div className="lg:w-2/3 relative">
                    <img
                      src={latest.image || "/img/blog-placeholder.jpg"}
                      alt={latest.title}
                      className="w-full h-80 object-cover lg:rounded-l-2xl"
                    />
                  </div>
                  <div className="p-6 lg:w-1/3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                        <span>{latest.author || "Admin"}</span>
                        <span>•</span>
                        <span>{latest.date || ""}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">{latest.title}</h2>
                      <p className="text-gray-600 line-clamp-4">{latest.excerpt}</p>
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      <button
                        onClick={() => handleReadMore(latest)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Read Full Article
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-gray-600">No latest article found</div>
              )}
            </div>

            {/* Browse by categories header */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                Browse by categories
              </h3>
              <p className="text-sm text-gray-600">
                {filteredBlogs.length} {filteredBlogs.length === 1 ? "article" : "articles"}
              </p>
            </div>

            {/* Grid of articles (paginated) */}
            {loading ? (
              <div className="p-12 text-center text-gray-600">Loading articles...</div>
            ) : currentPageItems.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentPageItems.map(blog => (
                    <article key={blog.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer">
                      <div className="relative">
                        <img
                          src={blog.image || "/img/blog-placeholder.jpg"}
                          alt={blog.title}
                          className="w-full h-40 object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-gray-500 mb-2">{blog.category || "General"} • {blog.date}</div>
                        <h1 className="font-semibold text-gray-900 mb-2 line-clamp-2">{blog.title}</h1>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => handleReadMore(blog)}
                            className="text-blue-600 text-sm font-medium hover:underline"
                          >
                            Read More →
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1 rounded-md border bg-white text-gray-700 disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <div className="text-sm text-gray-700">
                    Page <span className="font-medium">{page}</span> of {totalPages}
                  </div>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1 rounded-md border bg-white text-gray-700 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center p-8 text-gray-600">
                <h4 className="font-semibold mb-2">No articles found</h4>
                <p className="mb-4">Try adjusting your search or category filters.</p>
                <button onClick={resetFilters} className="px-4 py-2 bg-white border rounded-md">Reset filters</button>
              </div>
            )}
          </div>

          {/* Right: Top Reads & Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Top Reads card */}
            <div className="bg-white rounded-2xl border  border-gray-200 shadow-sm p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Top Reads</h4>
              <div className="space-y-3 ">
                {topReads.length > 0 ? (
                  topReads.map((b, idx) => (
                    <div key={b.id || idx} className="flex items-start gap-3">
                      <img
                        src={b.image || "/img/blog-placeholder.jpg"}
                        alt={b.title}
                        className="w-24 h-16 object-cover rounded-lg shadow-sm hover:scale-105 transition-transform duration-300"
                      />                      <div className="flex-1">
                        <h5 className="text-sm font-semibold text-gray-900 line-clamp-2">{b.title}</h5>
                        <div className="text-xs text-gray-500 mt-1">{b.date} </div>
                        <button onClick={() => handleReadMore(b)} className="text-blue-600 text-sm mt-1">Read</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">No top reads available</div>
                )}
              </div>
            </div>

            {/* Newsletter / CTA */}
            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-100 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Subscribe</h4>
              <p className="text-sm text-gray-600 mb-4">Get the latest posts delivered right to your inbox.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none" />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Subscribe</button>
              </div>
            </div>

            {/* Optional small recent list */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 text-sm text-gray-600">
              <h6 className="font-medium text-gray-900 mb-2">Quick Links</h6>
              <ul className="space-y-2">
                <li className="hover:underline cursor-pointer" onClick={() => navigate("/blog")}>All Articles</li>
                <li className="hover:underline cursor-pointer" onClick={() => navigate("/blog?filter=popular")}>Popular</li>
                <li className="hover:underline cursor-pointer" onClick={() => navigate("/contact")}>Contact Us</li>
              </ul>
            </div>
          </aside>
        </div>

      </div>

      {/* Modal (kept same as your original structure) */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 rounded-2xl overflow-auto max-h-[90vh] p-6 relative">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedBlog.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{selectedBlog.date} • {selectedBlog.readTime || "5 min read"}</p>
            <p className="text-gray-700 whitespace-pre-line">{selectedBlog.content}</p>
          </div>
        </div>
      )}

      {/* WhatsApp button */}
      <WhatsAppPopup />
    </div>
  );
}

export default BlogPage;