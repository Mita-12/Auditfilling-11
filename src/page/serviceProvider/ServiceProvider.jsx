
import React, { useState, useEffect } from "react";
import Header from "../../component/Header";
import Footer from "../../component/Footer";


export default function ServiceProviderForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    image: null,
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  // OTP States
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (otpCountdown > 0) {
      const timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpCountdown]);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Contact validation
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    if (!formData.contact) {
      newErrors.contact = "Contact number is required";
    } else if (!phoneRegex.test(formData.contact.replace(/[\s\-)]/g, ""))) {
      newErrors.contact = "Please enter a valid contact number";
    } else if (!isOtpVerified) {
      newErrors.contact = "Please verify your contact number with OTP";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Image validation
    if (formData.image) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!validTypes.includes(formData.image.type)) {
        newErrors.image = "Please select a valid image (JPEG, PNG, GIF)";
      }
      if (formData.image.size > 5 * 1024 * 1024) {
        newErrors.image = "Image size must be less than 5MB";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Send OTP function
  const sendOtp = async () => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    if (!formData.contact || !phoneRegex.test(formData.contact.replace(/[\s\-)]/g, ""))) {
      setErrors({ ...errors, contact: "Please enter a valid contact number first" });
      return;
    }

    setIsOtpSent(true);
    setOtpCountdown(60); // 60 seconds countdown
    
    // Simulate OTP sending
    console.log(`OTP sent to ${formData.contact}`);
    // In real implementation, you would call your backend API here
    // await api.sendOtp(formData.contact);
  };

  // Verify OTP function
  const verifyOtp = () => {
    // Simulate OTP verification (in real app, verify with backend)
    if (otp.length === 6) {
      setIsOtpVerified(true);
      setErrors({ ...errors, contact: "" });
    } else {
      setErrors({ ...errors, otp: "Please enter a valid 6-digit OTP" });
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "image") {
      const file = files[0];
      if (file) {
        setFormData({ ...formData, image: file });
        
        // Create image preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
      
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors({ ...errors, [name]: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Form Data Submitted:", formData);
      
      // Show success message
      alert("Registration successful! Welcome to our program.");
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        image: null,
        password: "",
        confirmPassword: "",
      });
      setImagePreview(null);
      setErrors({});
      setIsOtpSent(false);
      setIsOtpVerified(false);
      setOtp("");
      
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null });
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="flex justify-center items-center py-12 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl border border-gray-200 mt-20"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              ServiceProvider Registration
            </h2>
            <p className="text-gray-600">Join our exclusive ServiceProvider and grow your business</p>
          </div>

          {/* Personal Information Section */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.firstName 
                      ? "border-red-500 focus:ring-red-200" 
                      : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                  }`}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠</span> {errors.firstName}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.email 
                      ? "border-red-500 focus:ring-red-200" 
                      : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠</span> {errors.email}
                  </p>
                )}
              </div>

              {/* Contact Field with OTP */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Contact Number *
                </label>
                <div className="flex gap-3">
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    disabled={isOtpVerified}
                    className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      errors.contact 
                        ? "border-red-500 focus:ring-red-200" 
                        : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                    } ${isOtpVerified ? 'bg-green-50 border-green-500' : ''}`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {!isOtpVerified && (
                    <button
                      type="button"
                      onClick={sendOtp}
                      disabled={otpCountdown > 0}
                      className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                        otpCountdown > 0
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {otpCountdown > 0 ? `${otpCountdown}s` : "Send OTP"}
                    </button>
                  )}
                </div>
                {errors.contact && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠</span> {errors.contact}
                  </p>
                )}
                
                {/* OTP Input Section */}
                {isOtpSent && !isOtpVerified && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Enter OTP *
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="Enter 6-digit OTP"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                        maxLength={6}
                      />
                      <button
                        type="button"
                        onClick={verifyOtp}
                        className="px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                      >
                        Verify OTP
                      </button>
                    </div>
                    {errors.otp && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <span className="mr-1">⚠</span> {errors.otp}
                      </p>
                    )}
                    <p className="text-xs text-gray-600 mt-2">
                      OTP sent to {formData.contact}. Didn't receive?{" "}
                      {otpCountdown === 0 ? (
                        <button
                          type="button"
                          onClick={sendOtp}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Resend OTP
                        </button>
                      ) : (
                        <span className="text-gray-500">Resend in {otpCountdown}s</span>
                      )}
                    </p>
                  </div>
                )}
                
                {/* OTP Verified Success */}
                {isOtpVerified && (
                  <div className="mt-2 flex items-center text-green-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">Contact number verified successfully</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Image Field */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 ">
              Profile Image
            </h3>
            <div className="mb-4">
              {imagePreview ? (
                <div className="flex items-center space-x-4 mb-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                  />
                  <div>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="text-sm text-red-600 hover:text-red-800 font-medium block mb-1"
                    >
                      Remove Image
                    </button>
                    <p className="text-xs text-gray-500">Click to change image</p>
                  </div>
                </div>
              ) : null}
              
              <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors ${imagePreview ? 'hidden' : 'block'}`}>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer block"
                >
                  <div className="text-gray-500 mb-2">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-blue-600 font-medium">Upload profile photo</span>
                  <span className="text-gray-500 text-sm block mt-1">JPEG, PNG, GIF (max 5MB)</span>
                </label>
              </div>
              {errors.image && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="mr-1">⚠</span> {errors.image}
                </p>
              )}
            </div>
          </div>

          {/* Security Section */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Password Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.password 
                      ? "border-red-500 focus:ring-red-200" 
                      : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                  }`}
                  placeholder="At least 6 characters"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠</span> {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.confirmPassword 
                      ? "border-red-500 focus:ring-red-200" 
                      : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                  }`}
                  placeholder="Re-enter your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠</span> {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !isOtpVerified}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
              isSubmitting || !isOtpVerified
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : !isOtpVerified ? (
              "Verify Contact to Continue"
            ) : (
              "Create ServiceProvider Account"
            )}
          </button>

          {/* Terms Notice */}
          <p className="text-center text-gray-500 text-xs mt-6">
            By registering, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
              Privacy Policy
            </a>
          </p>
        </form>
      </div>
      
      <Footer/>
    </div>
  );
}


