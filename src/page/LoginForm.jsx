// // src/components/LoginForm.jsx
// import React, { useState } from "react";

// export default function LoginForm() {
//   const [loginOption, setLoginOption] = useState("password");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showOtp, setShowOtp] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const response = await fetch("https://auditfiling.com/login_auth_page", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRF-TOKEN": "220djcZdAF8cyQic2BC473KQ54v1wDGBJeFSLJbZ",
//         },
//         body: JSON.stringify({
//           user_name: userName,
//           password: loginOption === "password" ? password : undefined,
//           otp: loginOption === "otp" ? otp : undefined,
//           login_option: loginOption,
//         }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         console.log("Login successful:", data);
//       } else {
//         setError(data.message || "Login failed. Please try again.");
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   return (
//     <form
//       onSubmit={handleLogin}
//       className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6"
//     >
//       {/* Mobile/Email */}
//       <div className="mb-5">
//         <label className="block text-gray-700 font-medium mb-2">
//           Mobile No/Email ID
//         </label>
//         <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-teal-400">
//           <span className="px-3 text-gray-500">
//             <i className="fa fa-envelope"></i>
//           </span>
//           <input
//             type="text"
//             placeholder="Enter Mobile No/Email ID"
//             required
//             className="w-full p-2 outline-none"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Login Option */}
//       <div className="mb-5 flex justify-between">
//         <label className="flex items-center space-x-2">
//           <input
//             type="radio"
//             className="form-radio text-teal-500"
//             checked={loginOption === "password"}
//             onChange={() => setLoginOption("password")}
//           />
//           <span>Login with Password</span>
//         </label>
//         <label className="flex items-center space-x-2">
//           <input
//             type="radio"
//             className="form-radio text-teal-500"
//             checked={loginOption === "otp"}
//             onChange={() => setLoginOption("otp")}
//           />
//           <span>Login with OTP</span>
//         </label>
//       </div>

//       {/* Password Field */}
//       {loginOption === "password" && (
//         <div className="mb-5">
//           <label className="block text-gray-700 font-medium mb-2">Your Password</label>
//           <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-teal-400">
//             <span className="px-3 text-gray-500">
//               <i className="fa fa-lock"></i>
//             </span>
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter Password"
//               className="w-full p-2 outline-none"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button
//               type="button"
//               className="px-3"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? (
//                 <i className="fa fa-eye-slash text-gray-400"></i>
//               ) : (
//                 <i className="fa fa-eye text-gray-400"></i>
//               )}
//             </button>
//           </div>
//         </div>
//       )}

//       {/* OTP Field */}
//       {loginOption === "otp" && (
//         <div className="mb-5">
//           <label className="block text-gray-700 font-medium mb-2">Your OTP</label>
//           <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-teal-400">
//             <span className="px-3 text-gray-500">
//               <i className="fa fa-lock"></i>
//             </span>
//             <input
//               type={showOtp ? "text" : "password"}
//               placeholder="Enter OTP"
//               className="w-full p-2 outline-none"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />
//             <button
//               type="button"
//               className="px-3"
//               onClick={() => setShowOtp(!showOtp)}
//             >
//               {showOtp ? (
//                 <i className="fa fa-eye-slash text-gray-400"></i>
//               ) : (
//                 <i className="fa fa-eye text-gray-400"></i>
//               )}
//             </button>
//           </div>
//         </div>
//       )}

//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       {/* Submit Button */}
//       <div className="text-center">
//         <button
//           type="submit"
//           className="bg-teal-500 text-white font-semibold py-2 px-8 rounded-xl hover:bg-teal-600 transition-colors disabled:opacity-50"
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </div>
//     </form>
//   );
// }

import React, { useState } from "react";

export default function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loginOption, setLoginOption] = useState("password"); // 'password' or 'otp'
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [passMsg, setPassMsg] = useState("");
  const [otpMsg, setOtpMsg] = useState("");
  const [userNameMsg, setUserNameMsg] = useState("");
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLoginOptionChange = (option) => {
    setLoginOption(option);
    setPassMsg("");
    setOtpMsg("");
    setUserNameMsg("");
    setPassword("");
    setOtp("");
    setIsLoginDisabled(false);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

    if (value.length === 0) {
      setPassMsg("Please Enter Password");
      setIsLoginDisabled(true);
    } else if (value.length < 8) {
      setPassMsg("Password must be minimum 8 characters");
      setIsLoginDisabled(true);
    } else if (!passwordRegex.test(value)) {
      setPassMsg(
        "❌ Weak Password - Use uppercase, lowercase, number, and special character."
      );
      setIsLoginDisabled(true);
    } else {
      setPassMsg("");
      setIsLoginDisabled(false);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    setOtp(value);

    if (value.length === 0) {
      setOtpMsg("Please Enter OTP");
      setIsLoginDisabled(true);
    } else if (value.length < 6) {
      setOtpMsg("OTP must be 6 Digits");
      setIsLoginDisabled(true);
    } else {
      setOtpMsg("");
      setIsLoginDisabled(false);
    }
  };

  const sendOtp = async () => {
    if (!userName) {
      setUserNameMsg("Please enter Mobile No / Email ID");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://auditfiling.com/api/v1/sendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_name: userName }),
      });

      const data = await res.json();
      if (data.status === "success") {
        setOtpMsg(data.message);
        setIsLoginDisabled(false);
      } else {
        setUserNameMsg(data.message || "Failed to send OTP");
        setIsLoginDisabled(true);
      }
    } catch (err) {
      setUserNameMsg("Error sending OTP");
      setIsLoginDisabled(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName) {
      setUserNameMsg("Please enter Mobile No / Email ID");
      return;
    }

    setLoading(true);

    try {
      let payload = { user_name: userName };
      if (loginOption === "password") {
        payload.password = password;
      } else {
        payload.otp = otp;
      }

      const res = await fetch("https://auditfiling.com/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.status === "success") {
        alert("Login successful!");
        // Handle success (redirect, save token, etc.)
      } else {
        if (loginOption === "password") {
          setPassMsg(data.message || "Invalid credentials");
        } else {
          setOtpMsg(data.message || "Invalid OTP");
        }
      }
    } catch (err) {
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">User Login</h2>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => console.log("Close modal")}
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* User Name */}
          <div className="mb-4">
            <label className="block mb-1">Mobile No / Email ID</label>
            <div className="flex">
              <input
                type="text"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  setUserNameMsg("");
                }}
                className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Enter Mobile No/Email ID"
                required
              />
              {loginOption === "otp" && (
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={loading}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 rounded-r"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              )}
            </div>
            {userNameMsg && <p className="text-red-500 text-sm mt-1">{userNameMsg}</p>}
          </div>

          {/* Login Options */}
          <div className="flex justify-between mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={loginOption === "password"}
                onChange={() => handleLoginOptionChange("password")}
              />
              <span>Login with Password</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={loginOption === "otp"}
                onChange={() => handleLoginOptionChange("otp")}
              />
              <span>Login with OTP</span>
            </label>
          </div>

          {/* Password Field */}
          {loginOption === "password" && (
            <div className="mb-4 relative">
              <label className="block mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Enter Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-9 text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
              {passMsg && <p className="text-red-500 text-sm mt-1">{passMsg}</p>}
            </div>
          )}

          {/* OTP Field */}
          {loginOption === "otp" && (
            <div className="mb-4 relative">
              <label className="block mb-1">OTP</label>
              <input
                type={showOtp ? "text" : "password"}
                value={otp}
                onChange={handleOtpChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Enter OTP"
              />
              <button
                type="button"
                onClick={() => setShowOtp(!showOtp)}
                className="absolute right-2 top-9 text-gray-500"
              >
                {showOtp ? "🙈" : "👁️"}
              </button>
              {otpMsg && <p className="text-red-500 text-sm mt-1">{otpMsg}</p>}
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoginDisabled || loading}
              className={`px-6 py-2 rounded-lg text-white font-semibold ${
                isLoginDisabled || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600"
              }`}
            >
              {loading ? "Processing..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

