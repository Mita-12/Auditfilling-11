import React from "react";
import { FaFacebook, FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineOfficeBuilding, // ✅ replaced
  HiOutlineLocationMarker,
} from "react-icons/hi";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Section */}
          <div>
            <div className="relative inline-block group mb-6">
              <h1 className="text-2xl font-bold font-serif">AuditFiling</h1>
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-[2px] bg-white rounded-full transition-all duration-500 group-hover:w-full"></span>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed ">
              Your trusted partner for tax, compliance, and business solutions
            </p>

          </div>

          {/* Quick Links */}
          <div>
            <div className="relative inline-block group mb-6">
              <h1 className="text-lg font-semibold font-serif">Quick Links</h1>
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-[2px] bg-white rounded-full transition-all duration-500 group-hover:w-full"></span>
            </div>

            <ul className="space-y-1 list-none text-gray-300 text-lg leading-relaxed ">
              {[
                { path: "/about", label: "About Us" },
                { path: "/contact", label: "Contact Us" },
                { path: "/blogs", label: "Blog" },
                { path: "/terms", label: "Terms & Conditions" },
                { path: "/privacy", label: "Privacy Policy" },
                { path: "/reseller", label: "Become a Reseller" },
                { path: "/service-provider", label: "Become a Service Provider" },
                { path: "https://auditfiling.com/login", label: "Login" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="block hover:text-white px-2 py-2 rounded-md transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <div className="relative inline-block group mb-6">
              <h1 className="text-lg font-semibold font-serif">Cloudsat's Entities</h1>
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-[2px] bg-white rounded-full transition-all duration-500 group-hover:w-full"></span>
            </div>

            <ul className="space-y-3 list-none text-gray-300 text-lg  leading-relaxed">
              {[
                { path: "/", label: "AuditFiling" },
                { path: "http://localhost:5173/income-tax", label: "Tracolab" },
                { path: "https://coddor.com/", label: "Coddor" },
                { path: "https://sociomint.com/", label: "Sociomint" },
                { path: "https://www.xpbiz.com/", label: "XpBiz" },
                { path: "https://csaap.com/", label: "CSAAP" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-white px-2 py-2 rounded-md transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <div className="relative inline-block group mb-6">
              <h1 className="text-lg font-semibold font-serif">Contact</h1>
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-[2px] bg-white rounded-full transition-all duration-500 group-hover:w-full"></span>
            </div>

            <div className="space-y-4 ">
              <div className="flex items-center gap-3 px-1 py-1 rounded-sm">
                <HiOutlineMail className="text-yellow-400 text-2xl" />
                <a
                  href="mailto:info@auditfiling.com"
                  className="text-white font-medium hover:text-lg transition-all"
                >
                  info@auditfiling.com
                </a>
              </div>

              <div className="flex items-center gap-3 px-1 py-1 rounded-sm">
                <HiOutlinePhone className="text-green-400 text-2xl" />
                <a
                  href="tel:+917428600607"
                  className="text-white font-medium hover:text-lg transition-all"
                >
                  +91 7428600607
                </a>
              </div>

              <div className="flex items-start gap-3 px-1 py-1 rounded-sm">
                <HiOutlineOfficeBuilding className="text-red-400 text-4xl mt-1" />
                <div>
                  <h4 className="text-white font-semibold mb-1">Head Office</h4>
                  <p className="text-gray-400 text-sm">
                    <a
                      href="https://www.google.com/maps?q=H+No-511,+Sarahah+Tower,+Subhash+Nagar,+Gurugram,+122006,+India"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400  transition-colors duration-200"
                    >
                      H No-511, Sarahah Tower, Subhash Nagar, Gurugram, India, 122006
                    </a>
                  </p>
                </div>

              </div>

              <div className="flex items-start gap-3 px-1 py-1 rounded-sm">
                <HiOutlineLocationMarker className="text-red-400 text-6xl mt-1" />
                <div>
                  <h4 className="text-white font-semibold mb-1">Branch Office</h4>
                  <p className="text-gray-400 text-lg">
                    <a
                      href="https://www.google.com/maps?q=Room+No-12,+2nd+Floor,+BMC+Panchadeep+Market+Complex,+Bhoumya+Nagar,+Unit-4,+Bhubaneswar,+751001,+India"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400  transition-colors duration-200"
                    >
                      Room No-12, 2nd Floor, BMC Panchadeep Market Complex, Bhoumya Nagar,
                      Unit-4,  Bhubaneswar, India, 751001
                    </a>
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <div className="relative inline-block group mb-6">
              <h1 className="text-lg font-semibold font-serif">Newsletter</h1>
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-[2px] bg-white rounded-full transition-all duration-500 group-hover:w-full"></span>
            </div>

            <p className="text-gray-300 text-sm mb-4 ">
              Subscribe to get updates on our latest services and offers
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Subscribe
              </button>
            </form>
                    <div className="mt-5 flex   justify-center items-center gap-4 flex-wrap text-center">
  {/* Google Play */}
  <a
    href="https://play.google.com/store/apps/details?id=com.auditfiling.user"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
      alt="Get it on Google Play"
      className="w-44 h-auto"
    />
  </a>

  {/* App Store */}
  <a
    href="#"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="https://auditfiling.com/images/images.png"
      alt="Download on the App Store"
      className="w-44 h-auto"
    />
  </a>
</div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-5 pt-6 text-center">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} AuditFiling. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
