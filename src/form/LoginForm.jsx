// src/components/LoginForm.jsx
import React, { useState } from "react";

export default function LoginForm() {
  const [loginOption, setLoginOption] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("https://auditfiling.com/login_auth_page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": "220djcZdAF8cyQic2BC473KQ54v1wDGBJeFSLJbZ",
        },
        body: JSON.stringify({
          user_name: userName,
          password: loginOption === "password" ? password : undefined,
          otp: loginOption === "otp" ? otp : undefined,
          login_option: loginOption,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data);
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6"
    >
      {/* Mobile/Email */}
      <div className="mb-5">
        <label className="block text-gray-700 font-medium mb-2">
          Mobile No/Email ID
        </label>
        <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-teal-400">
          <span className="px-3 text-gray-500">
            <i className="fa fa-envelope"></i>
          </span>
          <input
            type="text"
            placeholder="Enter Mobile No/Email ID"
            required
            className="w-full p-2 outline-none"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>

      {/* Login Option */}
      <div className="mb-5 flex justify-between">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            className="form-radio text-teal-500"
            checked={loginOption === "password"}
            onChange={() => setLoginOption("password")}
          />
          <span>Login with Password</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            className="form-radio text-teal-500"
            checked={loginOption === "otp"}
            onChange={() => setLoginOption("otp")}
          />
          <span>Login with OTP</span>
        </label>
      </div>

      {/* Password Field */}
      {loginOption === "password" && (
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Your Password</label>
          <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-teal-400">
            <span className="px-3 text-gray-500">
              <i className="fa fa-lock"></i>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full p-2 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="px-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="fa fa-eye-slash text-gray-400"></i>
              ) : (
                <i className="fa fa-eye text-gray-400"></i>
              )}
            </button>
          </div>
        </div>
      )}

      {/* OTP Field */}
      {loginOption === "otp" && (
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Your OTP</label>
          <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-teal-400">
            <span className="px-3 text-gray-500">
              <i className="fa fa-lock"></i>
            </span>
            <input
              type={showOtp ? "text" : "password"}
              placeholder="Enter OTP"
              className="w-full p-2 outline-none"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              type="button"
              className="px-3"
              onClick={() => setShowOtp(!showOtp)}
            >
              {showOtp ? (
                <i className="fa fa-eye-slash text-gray-400"></i>
              ) : (
                <i className="fa fa-eye text-gray-400"></i>
              )}
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-teal-500 text-white font-semibold py-2 px-8 rounded-xl hover:bg-teal-600 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
}
