import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold font-serif mb-4">AuditFiling</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
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
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/refund" className="hover:text-white">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold font-serif mb-4">Cloudsat's Entities</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/income-tax" className="hover:text-white">Audifiling</Link></li>
              <li><Link to="/gst" className="hover:text-white">GST</Link></li>
              <li><Link to="/startup-registration" className="hover:text-white">Tracolab</Link></li>
              <li><Link to="/company" className="hover:text-white">Coddor</Link></li>
              <li><Link to="/trademark" className="hover:text-white">Sociomint</Link></li>
              <li><Link to="/bank-valuation" className="hover:text-white">Xbiz</Link></li>
              <li><Link to="/legal" className="hover:text-white">Legal</Link></li>
            </ul>
          </div>

          {/* Contact - Highlighted */}
          <div>
            <h3 className="text-lg font-semibold font-serif mb-4">Contact</h3>
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center gap-3 bg-gray-800 px-4 py-3 rounded-lg">
                <HiOutlineMail className="text-yellow-400 text-2xl" />
                <a
                  href="mailto:info@auditfiling.com"
                  className="text-white font-medium hover:text-lg"
                >
                  info@auditfiling.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 bg-gray-800 px-4 py-3 rounded-lg">
                <HiOutlinePhone className="text-green-400 text-2xl" />
                <a
                  href="tel:+917428600607"
                  className="text-white font-medium hover:text-lg"
                >
                  +91 7428600607
                </a>
              </div>
              <p className="text-gray-400 text-sm">Send us your queries anytime!</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold font-serif mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
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
        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} AuditFiling. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
