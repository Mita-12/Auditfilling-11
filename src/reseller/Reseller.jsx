import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import{ useNavigate} from "react-router-dom";  

export default function ResellerRegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    mailid: "",
    mobile: "",
    image: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const navigate = useNavigate();

  // OTP countdown timer
  useEffect(() => {
    if (otpCountdown > 0) {
      const timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpCountdown]);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";

    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.mailid) newErrors.mailid = "Email is required";
    else if (!mailRegex.test(formData.mailid)) newErrors.mailid = "Please enter a valid email";

    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    else if (!phoneRegex.test(formData.mobile.replace(/[\s\-)]/g, ""))) newErrors.mobile = "Please enter a valid mobile number";
    else if (!isOtpVerified) newErrors.mobile = "Please verify your mobile number with OTP";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (!formData.password_confirmation) newErrors.password_confirmation = "Please confirm your password";
    else if (formData.password !== formData.password_confirmation) newErrors.password_confirmation = "Passwords do not match";

    if (formData.image) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!validTypes.includes(formData.image.type)) newErrors.image = "Please select a valid image (JPEG, PNG, GIF)";
      if (formData.image.size > 5 * 1024 * 1024) newErrors.image = "Image size must be less than 5MB";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Send OTP API
  const sendOtp = async () => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    if (!formData.mobile || !phoneRegex.test(formData.mobile.replace(/[\s\-)]/g, ""))) {
      setErrors({ ...errors, mobile: "Please enter a valid mobile number first" });
      return;
    }

    try {
      const response = await fetch("https://auditfiling.com/api/v1/reseller/custom_otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: formData.mobile }),
      });
      const data = await response.json();

      if (response.ok) {
        setIsOtpSent(true);
        setOtpCountdown(60);
        alert(data.message || "OTP sent successfully");
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  // Verify OTP API
  const verifyOtp = async () => {
    if (otp.length !== 6) {
      setErrors({ ...errors, otp: "Please enter a valid 6-digit OTP" });
      return;
    }

    try {
      const response = await fetch("https://auditfiling.com/api/v1/reseller/custom_otp/store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: formData.mobile, custom_otp: otp }),
      });

      const data = await response.json();
      console.log(data);


      if (response.ok) {
        setIsOtpVerified(true);
        setErrors({ ...errors, otp: "", mobile: "" });
        alert(data.message || "OTP verified successfully");
      } else {
        setIsOtpVerified(false);
        setOtp("");
        setErrors({ ...errors, otp: data.message || "OTP verification failed" });
        alert(data.message || "OTP verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
      setIsOtpVerified(false);
      setOtp("");
      alert("OTP verification failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        setFormData({ ...formData, image: file });
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
      if (errors[name]) setErrors({ ...errors, [name]: "" });
    }
  };

  // Registration API
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const submissionData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "image" && formData.image) submissionData.append(key, formData.image);
        else submissionData.append(key, formData[key]);
      });
        console.log(submissionData);
       console.log(formData);
       
      const response = await fetch("https://auditfiling.com/api/v1/reseller/registration", {
        method: "POST",
        body: submissionData,
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert(data.message || "Registration successful!");
        // Reset form
        setFormData({
          name: "",
          mailid: "",
          mobile: "",
          image: null,
          password: "",
          password_confirmation: "",
        });
        setImagePreview(null);
        setErrors({});
        setIsOtpSent(false);
        setIsOtpVerified(false);
        setOtp("");
        
        
      } else {
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
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
              Reseller Registration
            </h2>
            <p className="text-gray-600">Join our exclusive reseller program and grow your business</p>
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
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.name
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                    }`}
                  placeholder="Enter full name"

                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠</span> {errors.name}
                  </p>
                )}
              </div>

              {/* mailid Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="mailid"
                  value={formData.mailid}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.mailid
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                    }`}
                  placeholder="your@email.com"

                />
                {errors.mailid && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠</span> {errors.mailid}
                  </p>
                )}
              </div>

              {/* mobile Field with OTP */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  mobile Number *
                </label>
                <div className="flex gap-3">
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    required
                    disabled={isOtpVerified}
                    className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.mobile
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                      } ${isOtpVerified ? 'bg-green-50 border-green-500' : ''}`}
                    placeholder="+91 123-456-7890"
                  />
                  {!isOtpVerified && (
                    <button
                      type="button"
                      onClick={sendOtp}
                      disabled={otpCountdown > 0}
                      className={`px-4 py-3 rounded-lg font-medium transition-colors ${otpCountdown > 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                    >
                      {otpCountdown > 0 ? `${otpCountdown}s` : "Send OTP"}
                    </button>
                  )}
                </div>
                {errors.mobile && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠</span> {errors.mobile}
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
                        type="number"
                        name="custom_otp"
                        value={formData.otp}
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
                      OTP sent to {formData.mobile}. Didn't receive?{" "}
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
                    <span className="text-sm font-medium">mobile number verified successfully</span>
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
              {/*password Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.password
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

              {/*password_confirmation Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  password_confirmation *
                </label>
                <input
                  type="password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.password_confirmation
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                    }`}
                  placeholder="Re-enter your password"
                />
                {errors.password_confirmation && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠</span> {errors.password_confirmation}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !isOtpVerified}
            onClick={handleSubmit}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${isSubmitting || !isOtpVerified
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
              "Verify mobile to Continue"
            ) : (
              "Create Reseller Account"
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

      <Footer />
    </div>
  );
}


