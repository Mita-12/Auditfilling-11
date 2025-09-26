import React, { useState } from "react";
import { TiMail } from "react-icons/ti";
import { MdAddIcCall } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="top-0 w-full bg-blue-100 shadow-sm py-3 z-50">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a href="/">
            <img src="/img/auditfile_logo.png" alt="Logo" className="w-8 h-auto" />
          </a>
          <a
            href="/"
            className="text-blue-950 text-2xl md:text-3xl font-medium font-serif tracking-wide"
          >
            AuditFiling
          </a>
        </div>

        {/* Hamburger for mobile */}
        <div className="md:hidden mt-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-blue-950 text-xl"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Menu: Contact + Social + Login */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } flex-col md:flex-row md:flex md:items-center gap-4 md:gap-6 w-full md:w-auto mt-4 md:mt-0`}
        >
          {/* Contact Email */}
          <a
            href="mailto:info@auditfiling.com"
            className="flex items-center gap-1 font-serif hover:text-blue-600 text-sm md:text-base"
          >
            <TiMail className="text-lg" /> info@auditfiling.com
          </a>

          {/* Phone */}
          <a
            href="tel:+917428600607"
            className="flex items-center gap-1 hover:text-blue-600 text-sm md:text-base"
          >
            <MdAddIcCall className="text-lg" /> +91 7428600607
          </a>

          {/* Social Icons */}
          <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
            {/* Facebook */}
            <a
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2 rounded-full bg-gray-100 text-blue-600 hover:bg-blue-100 hover:scale-110 transition-transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 4.99 3.66 9.13 8.44 9.88v-6.99H8.06v-2.89h2.24V9.62c0-2.21 1.32-3.43 3.34-3.43.97 0 1.98.17 1.98.17v2.18h-1.12c-1.1 0-1.44.68-1.44 1.38v1.66h2.45l-.39 2.89h-2.06V22c4.78-.75 8.44-4.89 8.44-9.93z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 rounded-full bg-gray-100 text-pink-500 hover:bg-pink-100 hover:scale-110 transition-transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5c0 3.3-2.45 5.75-5.75 5.75h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zm0 1.5C5.68 3.5 4 5.18 4 7.25v8.5C4 18.32 5.68 20 7.75 20h8.5c2.07 0 3.75-1.68 3.75-3.75v-8.5C20 5.68 18.32 4 16.25 4h-8.5zm8.75 2a1 1 0 110 2 1 1 0 010-2zm-4.25 1.25a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 1.5a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-full bg-gray-100 text-blue-700 hover:bg-blue-200 hover:scale-110 transition-transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 17V10.67H5.67V17H8.34M7 9.5A1.34 1.34 0 1 0 7 6.83 1.34 1.34 0 0 0 7 9.5M18.33 17V13.33C18.33 11.1 16.87 9.83 15 9.83C13.9 9.83 13.1 10.4 12.76 11H12.67V10.67H10V17H12.67V13.67C12.67 12.8 13.33 12.17 14.17 12.17C15 12.17 15.67 12.83 15.67 13.67V17H18.33Z" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="https://youtube.com/yourchannel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="p-2 rounded-full bg-gray-100 text-red-600 hover:bg-red-100 hover:scale-110 transition-transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M23.5 6.2a3 3 0 0 0-2.12-2.12C19.77 3.5 12 3.5 12 3.5s-7.77 0-9.38.58A3 3 0 0 0 .5 6.2 31.9 31.9 0 0 0 0 12a31.9 31.9 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.12C4.23 20.5 12 20.5 12 20.5s7.77 0 9.38-.58a3 3 0 0 0 2.12-2.12A31.9 31.9 0 0 0 24 12a31.9 31.9 0 0 0-.5-5.8zM9.8 15.5V8.5L16.2 12l-6.4 3.5z" />
              </svg>
            </a>
          </div>

          {/* Login Button */}
          <a href="#formid" className="mt-2 md:mt-0">
            <button className="bg-blue-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-blue-700">
              Login
            </button>
          </a>
        </div>
      </div>
    </header>
  );
}
