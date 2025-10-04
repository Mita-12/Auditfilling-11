import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { HiOutlineBuildingOffice } from "react-icons/hi2";


function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold font-serif mb-4">AuditFiling</h2>
            <p className="text-gray-400 text-lg leading-relaxed font-serif">
              Your trusted partner for tax, compliance, and business solutions.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-blue-600 text-2xl hover:scale-110 transition-transform duration-200" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="text-red-600 text-2xl hover:scale-110 transition-transform duration-200" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-pink-500 text-2xl hover:scale-110 transition-transform duration-200" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-blue-500 text-2xl hover:scale-110 transition-transform duration-200" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold font-serif mb-4">Quick Links</h3>
            <ul className="space-y-3 text-gray-400 text-lg font-serif">
              <li>
                <Link
                  to="/about"
                  className="block hover:text-white px-2 py-2 rounded-md transition-colors"
                >
                  About Us
                </Link>
              </li>
                 <li>
                <Link
                  to="/contact"
                  className="block hover:text-white  px-2 py-2 rounded-md transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              
              <li>
                <Link
                  to="/blog"
                  className="block hover:text-white  px-2 py-2 rounded-md transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="block hover:text-white  px-2 py-2 rounded-md transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="block hover:text-white  px-2 py-2 rounded-md transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/refund"
                  className="block hover:text-white  px-2 py-2 rounded-md transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>


          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold font-serif mb-4">Cloudsat's Entities</h3>
            <ul className="space-y-3 text-gray-400 text-lg font-serif">
              <li>
                <Link
                  to="/"
                  className="block hover:text-white px-2 py-2 rounded-md transition-colors"
                >
                  Audifiling
                </Link>
              </li>
              <li>
                <Link
                  to="/http://localhost:5173/income-tax"
                  className="block hover:text-white  px-2 py-2 rounded-md transition-colors"
                >
                  Tracolab
                </Link>
              </li>
              <li>
                <Link
                  to="/https://coddor.com/"
                  className="block hover:text-white px-2 py-2 rounded-md transition-colors"
                >
                  Coddor
                </Link>
              </li>
              <li>
                <Link
                  to="/https://sociomint.com/"
                  className="block hover:text-white px-2 py-2 rounded-md transition-colors"
                >
                  Sociomint
                </Link>
              </li>
              <li>
                <Link
                  to="/https://www.xpbiz.com/"
                  className="block hover:text-white px-2 py-2 rounded-md transition-colors"
                >
                  XpBIz
                </Link>
              </li>
              <li>
                <Link
                  to="/https://csaap.com/"
                  className="block hover:text-white px-2 py-2 rounded-md transition-colors"
                >
                  CSAAP
                </Link>
              </li>
            </ul>
          </div>


          {/* Contact - Highlighted */}
          <div>
            <h3 className="text-lg font-semibold font-serif mb-4 text-center">Contact</h3>
            <div className="space-y-4 font-serif ">
              {/* Email */}
              <div className="flex items-center gap-3  px-1 py-1 rounded-sm">
                <HiOutlineMail className="text-yellow-400 text-2xl" />
                <a
                  href="mailto:info@auditfiling.com"
                  className="text-white font-medium hover:text-lg"
                >
                  info@auditfiling.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3  px-1 py-1 rounded-sm">
                <HiOutlinePhone className="text-green-400 text-2xl" />
                <a
                  href="tel:+917428600607"
                  className="text-white font-medium hover:text-lg"
                >
                  +91 7428600607
                </a>
              </div>


              {/* Head Office */}
              <div className="flex items-start gap-3  px-1 py-1 rounded-sm">
                <HiOutlineBuildingOffice className="text-red-400 text-6xl mt-1" />
                <div>
                  <h4 className="text-white font-semibold mb-1">Head Office</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    H No-511, Sarahah Tower, Subhash Nagar, Gurugram, India.
                  </p>
                </div>
              </div>

              {/* Branch Office */}
              <div className="flex items-start gap-3  px-1 py-1 rounded-sm">
                <HiOutlineLocationMarker className="text-red-400 text-8xl mt-1" />
                <div>
                  <h4 className="text-white font-semibold mb-1">Branch Office</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Room No-12, 2nd Floor, BMC Panchadeep Market Complex,
                    Bhoumya Nagar, Unit-4, Bhubaneswar, India.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold font-serif mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4 font-serif">
              Subscribe to get updates on our latest services and offers.
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
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-5 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} AuditFiling. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
