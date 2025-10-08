
// import React, { useState,useEffect} from "react";
// import { useNavigate } from "react-router-dom";
// import { TiMail } from "react-icons/ti"; // example icon
// import { FiLock, FiKey } from "react-icons/fi"; // lock icon,otp icon




// export default function LoginForm({ isOpen, onClose }) {
//     const [user, setUser] = useState(null); // Track logged-in user
  
//   const [user_name, setuser_name] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [loginOption, setLoginOption] = useState("password");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showOtp, setShowOtp] = useState(false);
//   const [user_nameError, setuser_nameError] = useState("");
//   const [passError, setPassError] = useState("");
//   const [otpError, setOtpError] = useState("");
//   const [passMsg, setPassMsg] = useState("");
//   const [otpMsg, setOtpMsg] = useState("");
//   const [loginDisabled, setLoginDisabled] = useState(true);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);

//   const navigate = useNavigate();

//   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//   const mobileRegex = /^[0-9]{10}$/;
//   const serialNumberRegex = /^(?:1234567890|9876543210|0123456789)$/;

//   const validateuser_name = () => {
//     if (!user_name.trim()) {
//       setuser_nameError("Please enter Mobile No/Email ID");
//       setLoginDisabled(true);
//       return false;
//     }
//     if (!(emailRegex.test(user_name) || (mobileRegex.test(user_name) && !serialNumberRegex.test(user_name)))) {
//       setuser_nameError("Please enter a valid Mobile No/Email ID");
//       setLoginDisabled(true);
//       return false;
//     }
//     setuser_nameError("");
//     return true;
//   };

//   // -------------------- OTP SEND --------------------
//   const handleOtpSend = async () => {
//     if (!validateuser_name()) return;

//     try {
//       const response = await fetch("https://auditfiling.com/api/v1/sendOtp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ user_name }),
//       });
//       const data = await response.json();

//       if (data.status === "success") {
//         setOtpMsg(data.message || "OTP sent successfully");
//         setOtpError("");
//         setLoginDisabled(false);
//       } else {
//         setuser_nameError(data.message || "Failed to send OTP");
//         setLoginDisabled(true);
//       }
//     } catch {
//       setuser_nameError("Network Error: Could not send OTP");
//       setLoginDisabled(true);
//     }
//   };

//   // -------------------- OTP VERIFY --------------------
//   const handleVerifyOtp = async () => {
//     if (otp.length !== 6) {
//       setOtpError(otp.length === 0 ? "Please Enter OTP" : "OTP must be 6 Digits");
//       setLoginDisabled(true);
//       return;
//     }

//     try {
//       const response = await fetch("https://auditfiling.com/api/v1/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ user_name, otp }),
//       });
//       const data = await response.json();

//       if (data.status === "success") {
//         setOtpError("");
//         setOtpMsg(data.message || "OTP verified successfully");
//         setLoginDisabled(false);

//         // Optional auto-close after 3 seconds
//         setTimeout(() => {
//           setShowSuccessPopup(false);
//           onClose();
//           navigate("/");
//         }, 3000);
//       } else {
//         setOtpError(data.message || "Invalid OTP");
//         setLoginDisabled(true);
//       }
//     } catch {
//       setOtpError("Network Error: Could not verify OTP");
//       setLoginDisabled(true);
//     }
//   };

//   // -------------------- PASSWORD VERIFY --------------------
//   const handleVerifyPassword = async () => {
//     if (!password) {
//       setPassError("Please Enter Password");
//       setLoginDisabled(true);
//       return;
//     }

//     if (password.length < 8) {
//       setPassError("Password must be minimum 8 characters");
//       setLoginDisabled(true);
//       return;
//     }

//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
//     if (!passwordRegex.test(password)) {
//       setPassError("❌ Weak Password - Use uppercase, lowercase, number, and special character.");
//       setLoginDisabled(true);
//       return;
//     }

//     try {
//       const response = await fetch("https://auditfiling.com/api/v1/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ user_name, password, login_type: "password" }),
//       });
//       const data = await response.json();

//       if (data.status === "success") {
//         setPassError("");
//         setPassMsg(data.message || "Login Successful");
//         setLoginDisabled(false);

//         // Auto-close after popup
//         setTimeout(() => {
//           setShowSuccessPopup(false);
//           onClose();
//           navigate("/");
//         }, 3000);
//       } else {
//         setPassError(data.message || "Invalid Credentials");
//         setLoginDisabled(true);
//       }
//     } catch {
//       setPassError("Network Error: Could not login");
//       setLoginDisabled(true);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     validateuser_name();
//     if (loginOption === "password") {
//       handleVerifyPassword();
//     } else {
//       handleVerifyOtp();
//     }
//   };

//   if (!isOpen) return null;

//    // Check if user is already logged in
//     useEffect(() => {
//       const savedUser = localStorage.getItem("user");
//       if (savedUser) setUser(JSON.parse(savedUser));
//     }, []);
  
//     // Called when login is successful
//     const handleLoginSuccess = (userData) => {
//       setUser(userData);
//       localStorage.setItem("user", JSON.stringify(userData));
//       setShowLogin(false);
//       window.location.href = "/"; // redirect to home page
//     };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center ">
//       <div className="bg-white rounded-2xl- w-full max-w-md shadow-2xl p-6 relative">
//         <div className="flex justify-between items-center border-b  border-gray-400 pb-4 mb-4">
//           <h2 className="text-2xl font-bold font-serif ml-30 text-gray-900 ">User Login</h2>
//           <button onClick={onClose} className="text-gray-600 hover:text-gray-600 text-3xl font-bold">&times;</button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* user_name */}
//           <div className="mb-4">
//             <label className="block font-semibold mb-2 text-gray-900">
//               Mobile No / Email ID
//             </label>
//             <div className="relative">


//               <input
//                 type="text"
//                 className="w-full border border-gray-300 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100  transition"
//                 value={user_name}
//                 onChange={(e) => {
//                   setuser_name(e.target.value);
//                   setuser_nameError("");
//                 }}
//                 onBlur={validateuser_name}
//                 placeholder="Enter mobile or email"
//               />
//               <TiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
//             </div>
//             {user_nameError && (
//               <p className="text-red-600 text-sm mt-1 font-medium">
//                 {user_nameError}
//               </p>
//             )}
//           </div>

//           {/* Login Option */}
//           <div className="flex justify-between">
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="login_option"
//                 className="w-4 h-4 accent-blue-700"
//                 checked={loginOption === "password"}
//                 onChange={() => setLoginOption("password")}
//               />
//               Login with Password
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="login_option"
//                 className="w-4 h-4 accent-blue-700"
//                 checked={loginOption === "otp"}
//                 onChange={() => setLoginOption("otp")}
//               />
//               Login with OTP
//             </label>
//           </div>

//           {/* Password Login */}
//           {loginOption === "password" && (
//             <div className="mb-4">
//               <label className="block font-semibold mb-2 text-gray-800">Your Password</label>
//               <div className="relative flex items-center border border-gray-300 rounded-lg overflow-hidden">
//                 {/* Lock icon */}
//                 <FiLock className="absolute left-3 text-gray-400" size={20} />

//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className="flex-1 pl-10 pr-12 py-2 focus:outline-none" // pl-10 to avoid icon overlap, pr-12 to avoid button overlap
//                   placeholder="Enter Password"
//                   value={password}
//                   onChange={(e) => {
//                     setPassword(e.target.value);
//                     setPassError("");
//                   }}
//                 />

//                 {/* Show/hide password button */}
//                 <button
//                   type="button"
//                   className="absolute right-3 text-gray-500 hover:text-gray-700 transition"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? "🙈" : "👁️"}
//                 </button>
//               </div>

//               {passError && <p className="text-red-600 text-sm mt-1 font-medium">{passError}</p>}
//               {passMsg && <p className="text-green-600 text-sm mt-1 font-medium">{passMsg}</p>}
//             </div>
//           )}

//           {/* OTP Login */}
//           {loginOption === "otp" && (
//             <div className="mb-4">
//               <label className="block font-semibold mb-2 text-gray-700">Your OTP</label>
//               <div className="relative flex items-center border border-gray-300 rounded-lg overflow-hidden">
//                 {/* OTP icon */}
//                 <FiKey className="absolute left-3 text-gray-400" size={20} />

//                 <input
//                   type={showOtp ? "text" : "password"}
//                   className="flex-1 pl-10 pr-12 py-2 focus:outline-none" // pl-10 for icon, pr-12 for button
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={(e) => {
//                     setOtp(e.target.value);
//                     setOtpError("");
//                   }}
//                 />

//                 {/* Show/hide OTP button */}
//                 <button
//                   type="button"
//                   className="absolute right-3 text-gray-500 hover:text-gray-700 transition"
//                   onClick={() => setShowOtp(!showOtp)}
//                 >
//                   {showOtp ? "🙈" : "👁️"}
//                 </button>
//               </div>

//               <button
//                 type="button"
//                 className="mt-2 px-4 py-2 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800 transition"
//                 onClick={handleOtpSend}
//               >
//                 Send OTP
//               </button>

//               {otpError && <p className="text-red-600 text-sm mt-1 font-medium">{otpError}</p>}
//               {otpMsg && <p className="text-green-600 text-sm mt-1 font-medium">{otpMsg}</p>}
//             </div>
//           )}

//           {/* Submit Button */}
//           <div className="text-center">
//             <button
//               type="submit"
//               disabled={
//                 loginOption === "password"
//                   ? !user_name || !password || passError
//                   : !user_name || !otp || otpError
//               }
//               className={`px-6 py-2 rounded-full text-white font-semibold shadow transition ${(loginOption === "password"
//                   ? !user_name || !password || passError
//                   : !user_name || !otp || otpError)
//                   ? "bg-blue-700 cursor-not-allowed"
//                   : "bg-teal-500 hover:bg-teal-600 active:bg-teal-700"
//                 }`}
//             >
//               Login
//             </button>
//           </div>
//         </form>
//  {!user ? (
//             <button
//               onClick={() => setShowLogin(true)}
//               className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1"
//             >
//               <FaUser className="md:hidden w-5 h-5" /> {/* mobile */}
//               <span className="hidden md:inline">Login</span> {/* desktop */}
//             </button>
//           ) : (
//             <div className="flex items-center gap-2">
//               <FaUser className="w-5 h-5" />
//               <span className="hidden md:inline">{user.name}</span>
//             </div>
//           )}
//         {/* Success Popup */}
//         {showSuccessPopup && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
//             <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
//               <h2 className="text-2xl font-bold text-green-600 mb-2">🎉 Login Successful!</h2>
//               <p className="text-gray-700 mb-4">Welcome back to AuditFiling!</p>
//               <button
//                 onClick={() => {
//                   setShowSuccessPopup(false);
//                   onClose();
//                   navigate("/");
//                 }}
//                 className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
//               >
//                 Continue
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TiMail } from "react-icons/ti";
import { FiLock, FiKey } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

export default function LoginForm({ isOpen, onClose }) {
  const [user, setUser] = useState(null); // Track logged-in user
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
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const mobileRegex = /^[0-9]{10}$/;
  const serialNumberRegex = /^(?:1234567890|9876543210|0123456789)$/;

  // -------------------- Validate user_name --------------------
  const validateuser_name = () => {
    if (!user_name.trim()) {
      setuser_nameError("Please enter Mobile No/Email ID");
      setLoginDisabled(true);
      return false;
    }
    if (
      !(emailRegex.test(user_name) ||
        (mobileRegex.test(user_name) && !serialNumberRegex.test(user_name)))
    ) {
      setuser_nameError("Please enter a valid Mobile No/Email ID");
      setLoginDisabled(true);
      return false;
    }
    setuser_nameError("");
    return true;
  };

  // -------------------- OTP SEND --------------------
  const handleOtpSend = async () => {
    if (!validateuser_name()) return;

    try {
      const response = await fetch("https://auditfiling.com/api/v1/sendOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name }),
      });
      const data = await response.json();

      if (data.status === "success") {
        setOtpMsg(data.message || "OTP sent successfully");
        setOtpError("");
        setLoginDisabled(false);
      } else {
        setuser_nameError(data.message || "Failed to send OTP");
        setLoginDisabled(true);
      }
    } catch {
      setuser_nameError("Network Error: Could not send OTP");
      setLoginDisabled(true);
    }
  };

  // -------------------- OTP VERIFY --------------------
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setOtpError(otp.length === 0 ? "Please Enter OTP" : "OTP must be 6 Digits");
      setLoginDisabled(true);
      return;
    }

    try {
      const response = await fetch("https://auditfiling.com/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name, otp }),
      });
      const data = await response.json();

      if (data.status === "success") {
        handleLoginSuccess(data.user || { name: user_name });
        setOtpError("");
        setOtpMsg(data.message || "OTP verified successfully");
      } else {
        setOtpError(data.message || "Invalid OTP");
        setLoginDisabled(true);
      }
    } catch {
      setOtpError("Network Error: Could not verify OTP");
      setLoginDisabled(true);
    }
  };

  // -------------------- PASSWORD VERIFY --------------------
  const handleVerifyPassword = async () => {
    if (!password) {
      setPassError("Please Enter Password");
      setLoginDisabled(true);
      return;
    }

    if (password.length < 8) {
      setPassError("Password must be minimum 8 characters");
      setLoginDisabled(true);
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPassError(
        "❌ Weak Password - Use uppercase, lowercase, number, and special character."
      );
      setLoginDisabled(true);
      return;
    }

    try {
      const response = await fetch("https://auditfiling.com/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name, password, login_type: "password" }),
      });
      const data = await response.json();

      if (data.status === "success") {
        handleLoginSuccess(data.user || { name: user_name });
        setPassError("");
        setPassMsg(data.message || "Login Successful");
      } else {
        setPassError(data.message || "Invalid Credentials");
        setLoginDisabled(true);
      }
    } catch {
      setPassError("Network Error: Could not login");
      setLoginDisabled(true);
    }
  };

  // -------------------- Handle Submit --------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    validateuser_name();
    if (loginOption === "password") {
      handleVerifyPassword();
    } else {
      handleVerifyOtp();
    }
  };

  // -------------------- Handle Login Success --------------------
  const handleLoginSuccess = (userData) => {
    setUser(userData); // update local state
    localStorage.setItem("user", JSON.stringify(userData)); // save to localStorage
    setShowSuccessPopup(true); // show popup
    setLoginDisabled(false);
  };

  // -------------------- Load user from localStorage --------------------
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 relative">
        <div className="flex justify-between items-center border-b border-gray-400 pb-4 mb-4">
          <h2 className="text-2xl font-bold font-serif ml-30 text-gray-900">
            User Login
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-600 text-3xl font-bold"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* User Name */}
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-gray-900">
              Mobile No / Email ID
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                value={user_name}
                onChange={(e) => {
                  setuser_name(e.target.value);
                  setuser_nameError("");
                }}
                onBlur={validateuser_name}
                placeholder="Enter mobile or email"
              />
              <TiMail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
            </div>
            {user_nameError && (
              <p className="text-red-600 text-sm mt-1 font-medium">
                {user_nameError}
              </p>
            )}
          </div>

          {/* Login Option */}
          <div className="flex justify-between">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="login_option"
                className="w-4 h-4 accent-blue-700"
                checked={loginOption === "password"}
                onChange={() => setLoginOption("password")}
              />
              Login with Password
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="login_option"
                className="w-4 h-4 accent-blue-700"
                checked={loginOption === "otp"}
                onChange={() => setLoginOption("otp")}
              />
              Login with OTP
            </label>
          </div>

          {/* Password Login */}
          {loginOption === "password" && (
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-gray-800">
                Your Password
              </label>
              <div className="relative flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <FiLock className="absolute left-3 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  className="flex-1 pl-10 pr-12 py-2 focus:outline-none"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPassError("");
                  }}
                />
                <button
                  type="button"
                  className="absolute right-3 text-gray-500 hover:text-gray-700 transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {passError && (
                <p className="text-red-600 text-sm mt-1 font-medium">{passError}</p>
              )}
              {passMsg && (
                <p className="text-green-600 text-sm mt-1 font-medium">{passMsg}</p>
              )}
            </div>
          )}

          {/* OTP Login */}
          {loginOption === "otp" && (
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-gray-700">Your OTP</label>
              <div className="relative flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <FiKey className="absolute left-3 text-gray-400" size={20} />
                <input
                  type={showOtp ? "text" : "password"}
                  className="flex-1 pl-10 pr-12 py-2 focus:outline-none"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    setOtpError("");
                  }}
                />
                <button
                  type="button"
                  className="absolute right-3 text-gray-500 hover:text-gray-700 transition"
                  onClick={() => setShowOtp(!showOtp)}
                >
                  {showOtp ? "🙈" : "👁️"}
                </button>
              </div>
              <button
                type="button"
                className="mt-2 px-4 py-2 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800 transition"
                onClick={handleOtpSend}
              >
                Send OTP
              </button>
              {otpError && (
                <p className="text-red-600 text-sm mt-1 font-medium">{otpError}</p>
              )}
              {otpMsg && (
                <p className="text-green-600 text-sm mt-1 font-medium">{otpMsg}</p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={
                loginOption === "password"
                  ? !user_name || !password || passError
                  : !user_name || !otp || otpError
              }
              className={`px-6 py-2 rounded-full text-white font-semibold shadow transition ${
                loginOption === "password"
                  ? !user_name || !password || passError
                    ? "bg-blue-700 cursor-not-allowed"
                    : "bg-teal-500 hover:bg-teal-600 active:bg-teal-700"
                  : !user_name || !otp || otpError
                  ? "bg-blue-700 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600 active:bg-teal-700"
              }`}
            >
              Login
            </button>
          </div>
        </form>

        {/* Login Button or User Display */}
        {!user ? (
          <button
            onClick={() => {}}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 mt-4"
          >
            <FaUser className="md:hidden w-5 h-5" />
            <span className="hidden md:inline">Login</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 mt-4">
            <FaUser className="w-5 h-5" />
            <span className="hidden md:inline">{user.name}</span>
          </div>
        )}

        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                🎉 Login Successful!
              </h2>
              <p className="text-gray-700 mb-4">Welcome back to AuditFiling!</p>
              <button
                onClick={() => {
                  setShowSuccessPopup(false);
                  onClose();
                  navigate("/");
                }}
                className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



