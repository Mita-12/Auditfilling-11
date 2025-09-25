import React from "react";
import Header from "../component/Header";
import QuickForm from "../form/QuickForm";
import WhatsAppPopup from "../form/WhatsAppPopup";

function BlogPage() {
  // Static blog data
const blogList = [
//   {
//     id: 1,
//     title: "Blog Post Title 1",
//     description: "Short description of blog post 1...",
//     imageUrl: "https://images.unsplash.com/photo-1612831661645-b9d0e682aa3f?auto=format&fit=crop&w=400&q=80",
//   },
//   {
//     id: 2,
//     title: "Blog Post Title 2",
//     description: "Short description of blog post 2...",
//     imageUrl: "https://images.unsplash.com/photo-1603570411035-0ee2f1c76c41?auto=format&fit=crop&w=400&q=80",
//   },
  {
    id: 3,
    title: "Blog Post Title 3",
    description: "Short description of blog post 3...",
    imageUrl: "https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    title: "Blog Post Title 4",
    description: "Short description of blog post 4...",
    imageUrl: "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d7?auto=format&fit=crop&w=400&q=80",
  },
];



  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Grid */}
      <div className="max-w-7xl mt-15 mx-auto px-2 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar (Static Blog List) */}
        <aside className="lg:col-span-3 space-y-6">
          {blogList.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-32 object-cover"
              /> */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {blog.title}
                </h3>
                {/* <p className="text-sm text-gray-600 line-clamp-3">
                  {blog.description}
                </p> */}
              </div>
            </div>
          ))}
        </aside>

        {/* Middle Content */}
     <main className="lg:col-span-6 bg-white  rounded-xl overflow-hidden">
  <img
    src="/img/professional.png"
    alt="Main Blog"
    className="w-full h-64 object-cover"
  />
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">Main Blog Title Goes Here</h1>
    <p className="text-gray-700 leading-relaxed mb-4">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
      pulvinar nunc sit amet turpis euismod, sit amet fermentum magna
      laoreet. Sed consequat, magna in varius faucibus, lorem erat
      lacinia mauris, vitae vulputate elit odio a justo.
    </p>
    <p className="text-gray-700 leading-relaxed">
      Nulla facilisi. Phasellus egestas, dui nec posuere feugiat, sapien
      sapien vulputate purus, vel dapibus risus purus at felis. Etiam
      sed nisi a ligula sodales facilisis.
    </p>
  </div>
</main>


        {/* Right Sidebar (Form) */}
        <aside className="lg:col-span-3">
          <QuickForm />
        </aside>
      </div>

      {/* WhatsApp Floating Button */}
      <WhatsAppPopup />
    </div>
  );
}

export default BlogPage;
