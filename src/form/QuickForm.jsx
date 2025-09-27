import React from "react";

export default function QuickForm() {
  return (
    <aside className="w-65  bg-white rounded-lg p-6 h-[45vh]  lg:sticky top-28  flex flex-col justify-between space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4 text-center">
         Quick Form
        </h3>
        <form className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="w-full border px-1 py-1 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            placeholder="Phone No"
            className="w-full border px-1 py-1 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-1 py-1 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button className="mt-2 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition-all mx-auto block">
            Submit
          </button>
        </form>
      </div>
    </aside>
  );
}
