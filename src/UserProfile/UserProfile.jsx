// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function UserProfile() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     mobile: "",
//     dob: "",
//     gender: "",
//     aadhaar: "",
//     pan: "",
//     address1: "",
//     address2: "",
//     country: "India",
//     state: "",
//     district: "",
//     city: "",
//     pincode: "",
//     image: null,
//     password: "",
//     confirmPassword: "",
//   });

//   const [editableEmail, setEditableEmail] = useState(false);
//   const [editableMobile, setEditableMobile] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [preview, setPreview] = useState(null);
//   const [message, setMessage] = useState("");

//   const user_id = localStorage.getItem("user_id");

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     document.title = "User Profile - AuditFiling";

//     if (!user_id) {
//       setMessage("User not logged in.");
//       setLoading(false);
//       return;
//     }

//     axios
//       .get(`https://auditfiling.com/api/v1/web/user/profile/${user_id}`)
//       .then((res) => {
//         const data = res.data;
//         setFormData({
//           fullName: data.fullName || "",
//           email: data.email || "",
//           mobile: data.mobile || "",
//           dob: data.dob || "",
//           gender: data.gender || "",
//           aadhaar: data.aadhaar || "",
//           pan: data.pan || "",
//           address1: data.address1 || "",
//           address2: data.address2 || "",
//           country: data.country || "India",
//           state: data.state || "",
//           district: data.district || "",
//           city: data.city || "",
//           pincode: data.pincode || "",
//           image: data.image || null,
//           password: "",
//           confirmPassword: "",
//         });
//         if (data.image) setPreview(data.image);
//       })
//       .catch(() => setMessage("Failed to load profile."))
//       .finally(() => setLoading(false));
//   }, [user_id]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files && files[0]) {
//       setFormData({ ...formData, image: files[0] });
//       setPreview(URL.createObjectURL(files[0]));
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (formData.password !== formData.confirmPassword) {
//       setMessage("❌ Passwords do not match");
//       return;
//     }

//     try {
//       const submissionData = new FormData();
//       Object.keys(formData).forEach((key) => {
//         submissionData.append(key, formData[key]);
//       });

//       await axios.post(
//         `https://auditfiling.com/api/v1/web/user/update/${user_id}`,
//         submissionData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       setMessage("✅ Profile updated successfully!");
//     } catch (err) {
//       setMessage("❌ Error updating profile. Please try again.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-lg text-gray-700">
//         Loading user profile...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen m-20 flex items-center justify-center py-8 px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-5xl border border-gray-200"
//       >
//         <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
//           User Profile
//         </h1>

//         {message && (
//           <p
//             className={`text-center mb-4 font-semibold ${
//               message.includes("✅")
//                 ? "text-green-600"
//                 : message.includes("❌")
//                 ? "text-red-600"
//                 : "text-gray-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}



//         {/* Profile Image */}
//         <div className="flex flex-col items-center mb-6">
//           <div className="relative w-32 h-32 mb-4">
//             <img
//               src={
//                 preview ||
//                 "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//               }
//               alt="Profile"
//               className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 shadow-md"
//             />
//           </div>
//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             onChange={handleChange}
//             className="w-1/3 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm"
//           />
//         </div>
//     {/* Email & Mobile Section */}
//         <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
//           <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-1/2">
//             <label className="text-gray-700 font-medium w-28">Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               disabled={!editableEmail}
//               onChange={handleChange}
//               className={`w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm${
//                 editableEmail
//                   ? "border-blue-400 bg-white"
//                   : "border-gray-200 bg-gray-100"
//               }`}
//             />
//             <button
//               type="button"
//               onClick={() => setEditableEmail(!editableEmail)}
//               className="ml-2 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
//             >
//               {editableEmail ? "Save" : "Change"}
//             </button>
//           </div>

//           <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-1/2">
//             <label className="text-gray-700 font-medium w-28">Mobile:</label>
//             <input
//               type="tel"
//               name="mobile"
//               value={formData.mobile}
//               disabled={!editableMobile}
//               onChange={handleChange}
//               className={`w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm ${
//                 editableMobile
//                   ? "border-blue-400 bg-white"
//                   : "border-gray-200 bg-gray-100"
//               }`}
//             />
//             <button
//               type="button"
//               onClick={() => setEditableMobile(!editableMobile)}
//               className="ml-2 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
//             >
//               {editableMobile ? "Cancel" : "Change"}
//             </button>
//           </div>
//         </div>
//         {/* Other Editable Fields */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {[
//             ["Full Name", "fullName", "text"],
//             ["Date of Birth", "dob", "date"],
//             ["Aadhaar No", "aadhaar", "text"],
//             ["PAN No", "pan", "text"],
//             ["Address 1", "address1", "text"],
//             ["Address 2", "address2", "text"],
//             ["District", "district", "text"],
//             ["City", "city", "text"],
//             ["PIN Code", "pincode", "text"],
//           ].map(([label, name, type]) => (
//             <div key={name}>
//               <label className="block text-gray-700 mb-1 font-medium">
//                 {label}
//               </label>
//               <input
//                 type={type}
//                 name={name}
//                 value={formData[name]}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm"
//               />
//             </div>
//           ))}

//           {/* Gender */}
//           <div>
//             <label className="block text-gray-700 mb-1 font-medium">
//               Gender
//             </label>
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm"
//             >
//               <option value="">Select</option>
//               <option>Male</option>
//               <option>Female</option>
//               <option>Other</option>
//             </select>
//           </div>

//           {/* State */}
//           <div>
//             <label className="block text-gray-700 mb-1 font-medium">State</label>
//             <select
//               name="state"
//               value={formData.state}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm"
//             >
//               <option value="">Select</option>
//               <option>Odisha</option>
//               <option>West Bengal</option>
//               <option>Bihar</option>
//               <option>Jharkhand</option>
//               <option>Other</option>
//             </select>
//           </div>

//           {/* Country */}
//           <div>
//             <label className="block text-gray-700 mb-1 font-medium">
//               Country
//             </label>
//             <input
//               type="text"
//               name="country"
//               value={formData.country}
//               readOnly
//               className="w-full border border-gray-300 bg-gray-100 rounded-lg p-2"
//             />
//           </div>

//           {/* Passwords */}
//           <div>
//             <label className="block text-gray-700 mb-1 font-medium">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter new password"
//               className="w-full border border-gray-300 rounded-lg p-2"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1 font-medium">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="Re-enter password"
//               className="w-full border border-gray-300 rounded-lg p-2"
//             />
//           </div>
//         </div>

//         <div className="mt-8 flex justify-center">
//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
//           >
//             Save Profile
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

// API Configuration
const API_BASE = "https://auditfiling.com/api/v1";
const API_ENDPOINTS = {
  PROFILE: (id) => `${API_BASE}/web/user/profile/${id}`,
  UPDATE_PROFILE: (id) => `${API_BASE}/web/user/update/${id}`,
  STATES: `${API_BASE}/get_states`,
  DISTRICTS: `${API_BASE}/get_district`,
  CITIES: `${API_BASE}/get_city`,
  PINCODE: `${API_BASE}/get_pincode`
};

// Validation schema
const profileSchema = yup.object({
  fullName: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  mobile: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number")
    .required("Mobile number is required"),
  dob: yup.string().nullable(),
  gender: yup.string(),
  aadhaar: yup
    .string()
    .matches(/^\d{12}$/, "Aadhaar must be 12 digits")
    .nullable(),
  pan: yup
    .string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Please enter a valid PAN number")
    .nullable(),
  address1: yup.string(),
  address2: yup.string(),
  country: yup.string().default("India"),
  state: yup.string(),
  district: yup.string(),
  city: yup.string(),
  pincode: yup
    .string()
    .matches(/^\d{6}$/, "PIN code must be 6 digits")
    .nullable(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .when('password', {
      is: (val) => val && val.length > 0,
      then: (schema) => schema.required("Please confirm your password"),
    }),
  image: yup.mixed().nullable(),
});

// Custom hook for location data
const useLocationData = () => {
  const [locationData, setLocationData] = useState({
    states: [],
    districts: [],
    cities: [],
    cityPincodeMap: {}
  });
  const [loading, setLoading] = useState({
    states: false,
    districts: false,
    cities: false
  });

  const fetchStates = useCallback(async () => {
    setLoading(prev => ({ ...prev, states: true }));
    try {
      const response = await fetch(API_ENDPOINTS.STATES);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      if (data.status === "success" && Array.isArray(data.states)) {
        setLocationData(prev => ({ ...prev, states: data.states }));
      } else {
        console.error("Unexpected states data structure:", data);
        setLocationData(prev => ({ ...prev, states: [] }));
      }
    } catch (error) {
      console.error("Error fetching states:", error);
      setLocationData(prev => ({ ...prev, states: [] }));
    } finally {
      setLoading(prev => ({ ...prev, states: false }));
    }
  }, []);

  const fetchDistricts = useCallback(async (state) => {
    if (!state) {
      setLocationData(prev => ({ ...prev, districts: [], cities: [], cityPincodeMap: {} }));
      return;
    }

    setLoading(prev => ({ ...prev, districts: true }));
    try {
      const response = await fetch(`${API_ENDPOINTS.DISTRICTS}?state=${encodeURIComponent(state)}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      if (data.status === "success" && data.districts && typeof data.districts === 'object') {
        const districtNames = Object.keys(data.districts);
        setLocationData(prev => ({ ...prev, districts: districtNames, cities: [], cityPincodeMap: {} }));
      } else {
        console.error("Unexpected districts data structure:", data);
        setLocationData(prev => ({ ...prev, districts: [], cities: [], cityPincodeMap: {} }));
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
      setLocationData(prev => ({ ...prev, districts: [], cities: [], cityPincodeMap: {} }));
    } finally {
      setLoading(prev => ({ ...prev, districts: false }));
    }
  }, []);

  const fetchCities = useCallback(async (state, district) => {
    if (!district || !state) {
      setLocationData(prev => ({ ...prev, cities: [], cityPincodeMap: {} }));
      return;
    }

    setLoading(prev => ({ ...prev, cities: true }));
    try {
      const response = await fetch(
        `${API_ENDPOINTS.CITIES}?district=${encodeURIComponent(district)}&state=${encodeURIComponent(state)}`
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      let citiesArray = [];
      let pincodeMap = {};

      if (data.status === "success" && data.cities && typeof data.cities === 'object') {
        citiesArray = Object.keys(data.cities);
        pincodeMap = data.cities;
      } else {
        console.warn("Unexpected cities format:", data);
        citiesArray = [];
      }

      setLocationData(prev => ({ ...prev, cities: citiesArray, cityPincodeMap: pincodeMap }));
    } catch (error) {
      console.error("Error fetching cities:", error);
      setLocationData(prev => ({ ...prev, cities: [], cityPincodeMap: {} }));
    } finally {
      setLoading(prev => ({ ...prev, cities: false }));
    }
  }, []);

  return {
    locationData,
    loading,
    fetchStates,
    fetchDistricts,
    fetchCities
  };
};

// Reusable Form Input Component
const FormInput = ({ 
  label, 
  name, 
  type = "text", 
  register, 
  errors, 
  onChange, 
  disabled = false,
  className = "",
  ...props 
}) => (
  <div>
    <label className="block text-gray-700 mb-1 font-medium">{label}</label>
    <input
      type={type}
      {...register(name)}
      onChange={onChange}
      disabled={disabled}
      className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm ${
        errors[name] ? "border-red-500" : "border-gray-300"
      } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""} ${className}`}
      {...props}
    />
    {errors[name] && (
      <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
    )}
  </div>
);

// Loading Spinner Component
const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="flex items-center justify-center h-screen text-lg text-gray-700">
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    {message}
  </div>
);

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [saveStatus, setSaveStatus] = useState({
    loading: false,
    success: false,
    error: null
  });
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [editableEmail, setEditableEmail] = useState(false);
  const [editableMobile, setEditableMobile] = useState(false);
  const [tempEmail, setTempEmail] = useState("");
  const [tempMobile, setTempMobile] = useState("");

  const {
    locationData,
    loading: locationLoading,
    fetchStates,
    fetchDistricts,
    fetchCities
  } = useLocationData();

  const user_id = localStorage.getItem("user_id");

  const defaultValues = useMemo(() => ({
    country: "India",
  }), []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    trigger,
    reset,
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues,
    mode: "onBlur",
  });

  // Watch for state and district changes to trigger API calls
  const watchState = watch("state");
  const watchDistrict = watch("district");
  const watchCity = watch("city");
  const watchPinCode = watch("pincode");

  // Error handling utility
  const handleApiError = useCallback((error, defaultMessage) => {
    console.error(error);
    const message = error.response?.data?.message || 
                   error.response?.status === 404 ? "Resource not found" : 
                   defaultMessage;
    setMessage(`❌ ${message}`);
    setTimeout(() => setMessage(""), 5000);
  }, []);

  // Fetch user profile data
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "User Profile - AuditFiling";

    const fetchProfile = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setMessage("User not logged in.");
        return;
      }

      let userId = "";
      try {
        const parsedUser = JSON.parse(storedUser);
        userId = parsedUser?.id || parsedUser;
      } catch {
        userId = storedUser;
      }

      if (!userId) {
        setMessage("Invalid user data.");
        return;
      }

      try {
        const res = await axios.get(API_ENDPOINTS.PROFILE(userId));
        const user = res.data?.data || res.data?.user || res.data?.profile || res.data;
        setUserData(user);

        const formData = {
          fullName: user.fullName || user.name || user.full_name || "",
          email: user.email || "",
          mobile: user.mobile || user.phone || "",
          dob: user.dob || user.dateOfBirth || "",
          gender: user.gender || "",
          aadhaar: user.aadhaar || "",
          pan: user.pan || "",
          address1: user.address1 || user.address || "",
          address2: user.address2 || "",
          country: user.country || "India",
          state: user.state || "",
          district: user.district || "",
          city: user.city || "",
          pincode: user.pincode || user.zipCode || "",
          image: user.image || null,
          password: "",
          confirmPassword: "",
        };

        reset(formData);
        if (formData.image) setPreview(formData.image);
      } catch (err) {
        handleApiError(err, "Failed to load profile");
      }
    };

    fetchProfile();
    fetchStates();
  }, [reset, fetchStates, handleApiError]);

  // Fetch districts when state changes
  useEffect(() => {
    if (watchState) {
      fetchDistricts(watchState);
      setValue("district", "");
      setValue("city", "");
      setValue("pincode", "");
    }
  }, [watchState, fetchDistricts, setValue]);

  // Fetch cities when district changes
  useEffect(() => {
    if (watchDistrict && watchState) {
      fetchCities(watchState, watchDistrict);
      setValue("city", "");
      setValue("pincode", "");
    }
  }, [watchDistrict, watchState, fetchCities, setValue]);

  // Auto-fill PIN code when city is selected
  useEffect(() => {
    if (watchCity && locationData.cityPincodeMap[watchCity]) {
      const pincode = locationData.cityPincodeMap[watchCity];
      setValue("pincode", pincode);
      trigger("pincode");
      
      setMessage(`📍 PIN code for ${watchCity}: ${pincode}`);
      setTimeout(() => setMessage(""), 3000);
    }
  }, [watchCity, locationData.cityPincodeMap, setValue, trigger]);

  // Auto-fill address when PIN code is entered (with debouncing)
  useEffect(() => {
    const fetchAddressByPinCode = async (pincode) => {
      try {
        const response = await fetch(`${API_ENDPOINTS.PINCODE}?pincode=${pincode}`);
        if (response.ok) {
          const addressData = await response.json();
          if (addressData) {
            const state = addressData.state || addressData.State || addressData.STATE;
            const district = addressData.district || addressData.District || addressData.DISTRICT;
            const city = addressData.city || addressData.City || addressData.CITY || addressData.division;

            if (state) setValue("state", state);
            if (district) setValue("district", district);
            if (city) setValue("city", city);
          }
        }
      } catch (error) {
        console.error("Error fetching address by PIN code:", error);
      }
    };

    const timeoutId = setTimeout(() => {
      if (watchPinCode?.length === 6) {
        fetchAddressByPinCode(watchPinCode);
      }
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [watchPinCode, setValue]);

  // Event Handlers
  const handleEmailChange = () => {
    if (!editableEmail) {
      setTempEmail(watch("email"));
      setEditableEmail(true);
    } else {
      setEditableEmail(false);
      if (watch("email") !== tempEmail) {
        setMessage("✅ Email will be updated when you save the profile");
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  const handleMobileChange = () => {
    if (!editableMobile) {
      setTempMobile(watch("mobile"));
      setEditableMobile(true);
    } else {
      setEditableMobile(false);
      if (watch("mobile") !== tempMobile) {
        setMessage("✅ Mobile will be updated when you save the profile");
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  const handleMobileInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setValue("mobile", value);
    trigger("mobile");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", e.target.files);
      setPreview(URL.createObjectURL(file));
      trigger("image");
    }
  };

  const handleAadhaarChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 12);
    setValue("aadhaar", value);
    trigger("aadhaar");
  };

  const handlePanChange = (e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
    setValue("pan", value);
    trigger("pan");
  };

  const handlePinCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setValue("pincode", value);
    trigger("pincode");
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setValue("city", selectedCity);
    trigger("city");
  };

  const onSubmit = async (data) => {
    setSaveStatus({ loading: true, success: false, error: null });
    setMessage("");

    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "image" && data[key]?.[0]) {
          formData.append(key, data[key][0]);
        } else if (data[key] !== null && data[key] !== undefined && data[key] !== "") {
          formData.append(key, data[key]);
        }
      });

      await axios.post(API_ENDPOINTS.UPDATE_PROFILE(user_id), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSaveStatus({ loading: false, success: true, error: null });
      setMessage("✅ Profile updated successfully!");
      setEditableEmail(false);
      setEditableMobile(false);
      
      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      setSaveStatus({ loading: false, success: false, error: error.message });
      handleApiError(error, "Error updating profile. Please try again.");
    }
  };

  if (saveStatus.loading && !userData) {
    return <LoadingSpinner message="Loading user profile..." />;
  }

  return (
    <div className="min-h-screen m-20 flex items-center justify-center py-8 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-5xl border border-gray-200"
      >
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          User Profile
        </h1>

        {message && (
          <p
            className={`text-center mb-4 font-semibold ${
              message.includes("✅") ? "text-green-600" :
              message.includes("❌") ? "text-red-600" :
              message.includes("⚠️") ? "text-yellow-600" :
              message.includes("📍") ? "text-blue-600" :
              "text-gray-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-4">
            <img
              src={
                preview ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 shadow-md"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-1/3 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm"
          />
        </div>

        {/* Email & Mobile Section */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          {/* Email Field */}
          <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-1/2">
            <label className="text-gray-700 font-medium w-28">Email:</label>
            <input
              type="email"
              {...register("email")}
              disabled={!editableEmail}
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm ${
                errors.email ? "border-red-500" : "border-gray-300"
              } ${
                editableEmail
                  ? "border-blue-400 bg-white"
                  : "border-gray-200 bg-gray-100"
              }`}
            />
            <button
              type="button"
              onClick={handleEmailChange}
              className="ml-2 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              {editableEmail ? "Save" : "Change"}
            </button>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 w-full">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Mobile Field */}
          <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-1/2">
            <label className="text-gray-700 font-medium w-28">Mobile:</label>
            <input
              type="tel"
              {...register("mobile")}
              disabled={!editableMobile}
              onChange={handleMobileInputChange}
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm ${
                errors.mobile ? "border-red-500" : "border-gray-300"
              } ${
                editableMobile
                  ? "border-blue-400 bg-white"
                  : "border-gray-200 bg-gray-100"
              }`}
            />
            <button
              type="button"
              onClick={handleMobileChange}
              className="ml-2 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              {editableMobile ? "Save" : "Change"}
            </button>
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1 w-full">
                {errors.mobile.message}
              </p>
            )}
          </div>
        </div>

        {/* Other Editable Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FormInput
            label="Full Name"
            name="fullName"
            type="text"
            register={register}
            errors={errors}
          />

          <FormInput
            label="Date of Birth"
            name="dob"
            type="date"
            register={register}
            errors={errors}
          />

          <FormInput
            label="Aadhaar No"
            name="aadhaar"
            type="text"
            register={register}
            errors={errors}
            onChange={handleAadhaarChange}
          />

          <FormInput
            label="PAN No"
            name="pan"
            type="text"
            register={register}
            errors={errors}
            onChange={handlePanChange}
          />

          <FormInput
            label="Address 1"
            name="address1"
            type="text"
            register={register}
            errors={errors}
          />

          <FormInput
            label="Address 2"
            name="address2"
            type="text"
            register={register}
            errors={errors}
          />

          {/* Gender */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Gender</label>
            <select
              {...register("gender")}
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm ${
                errors.gender ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">State</label>
            <select
              {...register("state")}
              disabled={locationLoading.states}
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm ${
                errors.state ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select State</option>
              {locationData.states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {locationLoading.states && (
              <p className="text-blue-500 text-sm mt-1">Loading states...</p>
            )}
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
            )}
          </div>

          {/* District */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">District</label>
            <select
              {...register("district")}
              disabled={!watchState || locationLoading.districts}
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm ${
                errors.district ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select District</option>
              {locationData.districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">City</label>
            <select
              {...register("city")}
              onChange={handleCityChange}
              disabled={!watchDistrict || locationLoading.cities}
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select City</option>
              {locationData.cities.length > 0 ? (
                locationData.cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  {locationLoading.cities ? "Loading cities..." : "Select a district first"}
                </option>
              )}
            </select>
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          {/* PIN Code */}
          <FormInput
            label="PIN Code"
            name="pincode"
            type="text"
            register={register}
            errors={errors}
            onChange={handlePinCodeChange}
            placeholder="Auto-filled when city is selected"
          />

          {/* Country */}
          <FormInput
            label="Country"
            name="country"
            type="text"
            register={register}
            errors={errors}
            className="bg-gray-100 cursor-not-allowed"
            readOnly
          />

          {/* Passwords */}
          <FormInput
            label="Password"
            name="password"
            type="password"
            register={register}
            errors={errors}
            placeholder="Enter new password"
          />

          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            register={register}
            errors={errors}
            placeholder="Re-enter password"
          />
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting || saveStatus.loading}
            className={`px-8 py-3 rounded-lg font-semibold text-white transition-all shadow-md hover:shadow-lg ${
              isSubmitting || saveStatus.loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting || saveStatus.loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </span>
            ) : (
              "Save Profile"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}