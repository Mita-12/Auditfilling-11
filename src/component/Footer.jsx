import React from "react";
import { FaFacebook, FaYoutube, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";


function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}

                    <div className="lg:col-span-1">
                        <h2 className="text-2xl font-bold mb-4 font-serif">AuditFiling</h2>
                        <p className="text-gray-400 mb-4">
                            Find the code you want at the best price
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4 mt-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook className="text-blue-600 text-2xl hover:scale-110 transition-transform duration-200" />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                <FaYoutube className="text-red-600 text-2xl hover:scale-110 transition-transform duration-200" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="text-pink-500 text-2xl hover:scale-110 transition-transform duration-200" />
                            </a>
                        </div>
                    </div>


                    {/* Quick Links Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Term and Condition
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Refund Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}


                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <div className="space-y-2">
                            {/* Email Row */}
                            <div className="flex items-center gap-2 text-gray-400">
                                <FaEnvelope className="text-blue-500 text-lg" />
                                <a href="mailto:info@auditfiling.com" className="hover:underline">
                                    info@auditfiling.com
                                </a>
                            </div>

                            {/* Phone Row */}
                            <div className="flex items-center gap-2 text-gray-400">
                                <FaPhone className="text-green-500 text-lg" />
                                <a href="tel:+911234567890" className="hover:underline">
                                    +91 7428600607
                                </a>
                            </div>

                            {/* Subtext */}
                            <p className="text-gray-400">Send us Your Issues</p>
                        </div>
                    </div>


                    {/* Newsletter Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                        <p className="text-gray-400 mb-4">
                            Subscribe to get updates on new products and offers
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

                {/* Copyright Section */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400">
                        © 2025 Auditfiling,All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;