import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function WhatsAppPopup() {
  return (
    <div>
      <Link
        to="https://wa.me/7428600607"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="fixed bottom-6 right-6">
          <div className="relative flex items-center justify-center">
            {/* Curved "Let's Chat" on top */}
            <svg
              viewBox="0 0 100 50"
              className="absolute w-24 h-12 -top-6 animate-bounce-slow"
            >
              <defs>
                {/* Tighter top arc */}
                <path
                  id="topCurve"
                  d="M 25,40 A25,25 0 0,1 75,40"
                  fill="none"
                />
              </defs>
              <text fill="red"  font="bold" fontSize="16" fontWeight="700" letterSpacing="1">
                <textPath
                  href="#topCurve"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  Let’s Chat
                </textPath>
              </text>
            </svg>

            {/* WhatsApp Button */}
            <button className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-110">
              <FaWhatsapp className="text-2xl" />
            </button>
          </div>
        </div>
      </Link>

      {/* Custom animation */}
      <style>
        {`
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 2s infinite;
          }
        `}
      </style>
    </div>
  );
}
