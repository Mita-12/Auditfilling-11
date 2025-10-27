import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TiMail } from "react-icons/ti";
import { FiLock, FiKey } from "react-icons/fi";
import axios from "axios";

export default function LoginForm({ isOpen, onClose, onLoginSuccess }) {
  const [user_name, setuser_name] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loginOption, setLoginOption] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const [user_nameError, setuser_nameError] = useState("");
  const [passError, setPassError] = useState("");
  const [otpError, setOtpError] = useState("");

  const [passMsg, setPassMsg] = useState("");
  const [otpMsg, setOtpMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const otpInputRef = useRef(null);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const mobileRegex = /^[0-9]{10}$/;
  const serialNumberRegex = /^(?:1234567890|9876543210|0123456789)$/;

  // -------------------- Validate Username --------------------
  const validateuser_name = () => {
    if (!user_name.trim()) {
      setuser_nameError("Please enter Mobile No/Email ID");
      return false;
    }
    if (!(emailRegex.test(user_name) || (mobileRegex.test(user_name) && !serialNumberRegex.test(user_name)))) {
      setuser_nameError("Please enter a valid Mobile No/Email ID");
      return false;
    }
    setuser_nameError("");
    return true;
  };

  // -------------------- Send OTP --------------------
  const handleOtpSend = async () => {
    if (!validateuser_name()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "https://auditfiling.com/api/v1/sendOtp",
        { user_name },
        { headers: { "Content-Type": "application/json", Accept: "application/json" } }
      );

      if (response.data?.status === "success") {
        setOtpMsg(response.data.message || "OTP sent successfully");
        setOtpError("");
        // Auto-focus OTP input
        setTimeout(() => otpInputRef.current?.focus(), 100);
      } else {
        setuser_nameError(response.data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      setuser_nameError("Network Error: Could not send OTP");
    }
    setLoading(false);
  };

  // -------------------- Verify OTP --------------------
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setOtpError(otp.length === 0 ? "Please Enter OTP" : "OTP must be 6 Digits");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://auditfiling.com/api/v1/login",
        { user_name, otp },
        { headers: { "Content-Type": "application/json", Accept: "application/json" } }
      );

      if (response.data?.status === "success") {
        setOtpError("");
        setOtpMsg(response.data.message || "OTP verified successfully");
        handleLoginSuccess({ id: response.data.user_id, name: response.data.name, token: response.data.access_token });
      } else {
        setOtpError(response.data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setOtpError("Network Error: Could not verify OTP");
    }
    setLoading(false);
  };

  // -------------------- Verify Password --------------------
  const handleVerifyPassword = async () => {
    if (!password) {
      setPassError("Please Enter Password");
      return;
    }

    if (password.length < 8) {
      setPassError("Password must be minimum 8 characters");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPassError("❌ Weak Password - Use uppercase, lowercase, number, and special character.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://auditfiling.com/api/v1/login",
        { user_name, password, login_type: "password" },
        { headers: { "Content-Type": "application/json", Accept: "application/json" } }
      );

      if (response.data?.status === "success") {
        setPassError("");
        setPassMsg(data.message || "Login Successful");
        handleLoginSuccess(data.user);
      } else {
        setPassError(response.data.message || "Invalid Credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setPassError("Network Error: Could not login");
    }
    setLoading(false);
  };

  // -------------------- Submit Handler --------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    validateuser_name();
    loginOption === "password" ? handleVerifyPassword() : handleVerifyOtp();
  };

  // -------------------- Unified Login Success Handler --------------------
  const handleLoginSuccess = (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify({ id: userData.id, name: userData.user_name, }));

    // Store the actual username/email/mobile separately
    localStorage.setItem("user_name", user_name); // <-- This keeps the email/mobile entered

    if (onLoginSuccess) onLoginSuccess({ id: userData.id, name: userData.name });
    window.dispatchEvent(new Event("userUpdated"));
    window.dispatchEvent(new Event("storage"));
    window.location.reload();
    navigate("/");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-2xl font-bold font-serif text-gray-900">User Login</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-3xl font-bold">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block font-semibold mb-2 text-gray-900">Mobile No / Email ID</label>
            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                value={user_name}
                onChange={(e) => { setuser_name(e.target.value); setuser_nameError(""); }}
                onBlur={validateuser_name}
                placeholder="Enter mobile or email"
              />
              <TiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            </div>
            {user_nameError && <p className="text-red-600 text-sm mt-1 font-medium">{user_nameError}</p>}
          </div>

          {/* Login Option */}
          <div className="flex justify-between">
            <label className="flex items-center gap-2">
              <input type="radio" name="login_option" className="w-4 h-4 accent-blue-700"
                checked={loginOption === "password"} onChange={() => setLoginOption("password")} />
              Login with Password
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="login_option" className="w-4 h-4 accent-blue-700"
                checked={loginOption === "otp"} onChange={() => setLoginOption("otp")} />
              Login with OTP
            </label>
          </div>

          {/* Password */}
          {loginOption === "password" && (
            <div>
              <label className="block font-semibold mb-2 text-gray-800">Your Password</label>
              <div className="relative flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <FiLock className="absolute left-3 text-gray-400" size={20} />
                <input type={showPassword ? "text" : "password"}
                  className="flex-1 pl-10 pr-12 py-2 focus:outline-none"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setPassError(""); }}
                />
                <button type="button" className="absolute right-3 text-gray-500 hover:text-gray-700 transition"
                  onClick={() => setShowPassword(!showPassword)}>{showPassword ? "🙈" : "👁️"}</button>
              </div>
              {passError && <p className="text-red-600 text-sm mt-1 font-medium">{passError}</p>}
              {passMsg && <p className="text-green-600 text-sm mt-1 font-medium">{passMsg}</p>}
            </div>
          )}

          {/* OTP */}
          {loginOption === "otp" && (
            <div>
              <label className="block font-semibold mb-2 text-gray-700">Your OTP</label>
              <div className="relative flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <FiKey className="absolute left-3 text-gray-400" size={20} />
                <input type={showOtp ? "text" : "password"}
                  className="flex-1 pl-10 pr-12 py-2 focus:outline-none"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => { setOtp(e.target.value); setOtpError(""); }}
                />
                <button type="button" className="absolute right-3 text-gray-500 hover:text-gray-700 transition"
                  onClick={() => setShowOtp(!showOtp)}>{showOtp ? "🙈" : "👁️"}</button>
              </div>
              <button type="button"
                className="mt-2 px-4 py-2 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800 transition"
                onClick={handleOtpSend}>
                Send OTP
              </button>
              {otpError && <p className="text-red-600 text-sm mt-1 font-medium">{otpError}</p>}
              {otpMsg && <p className="text-green-600 text-sm mt-1 font-medium">{otpMsg}</p>}
            </div>
          )}

          {/* Submit */}
          <div className="text-center">
            <button type="submit"
              className={`px-6 py-2 rounded-full text-white font-semibold shadow transition 
                ${loginOption === "password" ? !user_name || !password ? "bg-blue-400 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-600"
                  : !user_name || !otp ? "bg-blue-400 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-600"}`}>
                ${loginOption === "password" ? !user_name || !password ? "bg-blue-400 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-600"
                  : !user_name || !otp ? "bg-blue-400 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-600"}`}>
              Login
            </button>
          </div>
        </form>



      </div>
    </div>
  );
}
