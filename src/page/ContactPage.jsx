import React from "react";
import Header from "../component/Header";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import Footer from "../component/Footer";

const Contact = () => {
  return (
    <>
      <Header />
      <section className="py-16 px-6 md:px-12 ">
        <div className="max-w-screen-xl mt-25 mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
              Connect With Auditifiling For Fast Legal Assistance
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              You can easily reach us through phone or email for any  legal inquiries.
              Our dedicated team is always ready to provide quick and reliable assistance whenever you need it.
            </p>
          </div>

          {/* Contact Info + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Head Office</h3>
                <p className="text-gray-600">H No-511, Sarahah Tower, Subhash Nagar, Gurugram, India</p>
              </div>

              <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Branch Office</h3>
                <p className="text-gray-600">
                  Room No-12, 2nd Floor, BMC Panchadeep Market Complex, Bhoumya Nagar, Unit-4, Bhubaneswar, India
                </p>
              </div>

              <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Let’s Talk</h3>
                <p className="text-gray-600">Phone: +91 7428600607</p>
                <p className="text-gray-600">Fax: +91 11223 44556</p>
              </div>

              <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Support</h3>
                <p className="text-gray-600">support@primenotary.in</p>
                <p className="text-gray-600">info@auditfiling.com</p>
              </div>
            </div>

            {/* Map */}
            {/* Map */} <div className="rounded-lg overflow-hidden shadow-lg h-96">
               <iframe title="PrimeNotary Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.281204176034!2d77.04275631508068!3d28.64727998241021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19b3e8f2c3b9%3A0x6aef8e65d4b7b6e6!2sSubhash%20Nagar%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1695723456789" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" ></iframe> 
               </div> </div>
          {/* Action Buttons */} <div className="text-center mt-12"> <button className="bg-red-400 text-white px-6 py-2 rounded-lg mr-4 hover:bg-red-700 transition"> Live Chat </button> <button className="bg-transparent text-orange-500 border-2 border-red-600 px-6 py-2 rounded-lg hover:bg-red-600 hover:text-white transition"> Discover More </button> </div>

          {/* Social Media */}
          <div className="text-center mt-10">
            <p className="text-gray-600">Follow Our Social Media:</p>
            <div className="flex justify-center space-x-6 mt-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-950 hover:text-red-700 text-2xl transition"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
