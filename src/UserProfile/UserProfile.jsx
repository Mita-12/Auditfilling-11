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
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  pinCode: yup
    .string()
    .matches(/^\d{6}$/, "PIN code must be 6 digits")
    .nullable(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  image: yup.mixed().nullable(),
});

export default function UserProfile() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoadingStates, setIsLoadingStates] = useState(false);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      country: "India",
    },
    mode: "onBlur",
  });

  // Watch for state and district changes to trigger API calls
  const watchState = watch("state");
  const watchDistrict = watch("district");
  const watchPinCode = watch("pinCode");

  // Fetch states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      setIsLoadingStates(true);
      try {
        const response = await fetch("https://auditfiling.com/get_states");
        console.log("States response:", response);
        if (response.ok) {
          const statesData = await response.json();
          setStates(statesData);
        } else {
          console.error("Failed to fetch states");
        }
      } catch (error) {
        console.error("Error fetching states:", error);
      } finally {
        setIsLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

  // Fetch districts when state changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!watchState) return;

      setIsLoadingDistricts(true);
      setDistricts([]);
      setCities([]);
      setValue("district", "");
      setValue("city", "");
      setValue("pinCode", "");

      try {
        const response = await fetch(
          `https://auditfiling.com/get_district?state_id=${watchState}`
        );
        console.log("Districts response:", response);
        if (response.ok) {
          const districtsData = await response.json();
          setDistricts(districtsData);
        } else {
          console.error("Failed to fetch districts");
        }
      } catch (error) {
        console.error("Error fetching districts:", error);
      } finally {
        setIsLoadingDistricts(false);
      }
    };

    fetchDistricts();
  }, [watchState, setValue]);

  // Fetch cities when district changes
  useEffect(() => {
    const fetchCities = async () => {
      if (!watchDistrict) return;

      setIsLoadingCities(true);
      setCities([]);
      setValue("city", "");
      setValue("pinCode", "");

      try {
        const response = await fetch(
          `https://auditfiling.com/get_city?district_id=${watchDistrict}`
        );
        if (response.ok) {
          const citiesData = await response.json();
          setCities(citiesData);
        } else {
          console.error("Failed to fetch cities");
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setIsLoadingCities(false);
      }
    };

    fetchCities();
  }, [watchDistrict, setValue]);

  // Auto-fill address when PIN code is entered
  useEffect(() => {
    const fetchAddressByPinCode = async () => {
      if (!watchPinCode || watchPinCode.length !== 6) return;

      try {
        const response = await fetch(
          `https://auditfiling.com/get_pincode?pincode=${watchPinCode}`
        );
        if (response.ok) {
          const addressData = await response.json();
          // Assuming the API returns state, district, city
          if (addressData.state) setValue("state", addressData.state);
          if (addressData.district) setValue("district", addressData.district);
          if (addressData.city) setValue("city", addressData.city);
        }
      } catch (error) {
        console.error("Error fetching address by PIN code:", error);
      }
    };

    fetchAddressByPinCode();
  }, [watchPinCode, setValue]);

  const onSubmit = async (data) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();

      // Append all form fields
      Object.keys(data).forEach((key) => {
        if (key === "image" && data[key]?.[0]) {
          formData.append(key, data[key][0]);
        } else if (data[key]) {
          formData.append(key, data[key]);
        }
      });

      const response = await fetch(
        "https://auditfiling.com/api/v1/user/profile/update",
        {
          method: "POST",
          body: formData,
          // Don't set Content-Type header for FormData - browser will set it with boundary
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Profile updated successfully:", result);
        alert("Profile saved successfully!");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", e.target.files);
    }
  };

  const handleAadhaarChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 12);
    setValue("aadhaar", value);
  };

  const handlePanChange = (e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
    setValue("pan", value);
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setValue("mobile", value);
  };

  const handlePinCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setValue("pinCode", value);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 mb-10 border border-gray-200">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">User Profile</h1>
        <p className="text-gray-600">Complete your profile information</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information Section */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email ID *
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile No. *
              </label>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.mobile ? "border-red-500" : "border-gray-300"
                  }`}
                onChange={handleMobileChange}
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobile.message}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("dob")}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("gender")}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>
        </section>

        {/* Government IDs Section */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
            Government Identification
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Aadhaar Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Aadhaar Number
              </label>
              <input
                type="text"
                placeholder="12-digit Aadhaar number"
                className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.aadhaar ? "border-red-500" : "border-gray-300"
                  }`}
                onChange={handleAadhaarChange}
              />
              {errors.aadhaar && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.aadhaar.message}
                </p>
              )}
            </div>

            {/* PAN Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PAN Number
              </label>
              <input
                type="text"
                placeholder="ABCDE1234F"
                className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.pan ? "border-red-500" : "border-gray-300"
                  }`}
                onChange={handlePanChange}
              />
              {errors.pan && (
                <p className="text-red-500 text-sm mt-1">{errors.pan.message}</p>
              )}
            </div>
          </div>
        </section>

        {/* Address Section */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
            Address Information
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {/* Address Line 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 1
              </label>
              <input
                type="text"
                placeholder="Street address, P.O. Box, etc."
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("address1")}
              />
            </div>

            {/* Address Line 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 2
              </label>
              <input
                type="text"
                placeholder="Apartment, suite, unit, building, floor, etc."
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("address2")}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <select
                  className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  {...register("state")}
                  disabled={isLoadingStates}
                >
                  <option value="">Select State</option>
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>

                {isLoadingStates && (
                  <p className="text-blue-500 text-sm mt-1">Loading states...</p>
                )}
              </div>


              {/* District */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  District
                </label>
                <select
                  className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  {...register("district")}
                  disabled={!watchState || isLoadingDistricts}
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
                {isLoadingDistricts && (
                  <p className="text-blue-500 text-sm mt-1">Loading districts...</p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <select
                  className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  {...register("city")}
                  disabled={!watchDistrict || isLoadingCities}
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {isLoadingCities && (
                  <p className="text-blue-500 text-sm mt-1">Loading cities...</p>
                )}
              </div>

              {/* PIN Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PIN Code
                </label>
                <input
                  type="text"
                  placeholder="6-digit PIN"
                  className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.pinCode ? "border-red-500" : "border-gray-300"
                    }`}
                  onChange={handlePinCodeChange}
                />
                {errors.pinCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pinCode.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
            Security
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Set Password *
              </label>
              <input
                type="password"
                placeholder="Minimum 6 characters"
                className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password *
              </label>
              <input
                type="password"
                placeholder="Re-enter your password"
                className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-lg font-semibold text-white transition-all ${isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 transform hover:scale-105"
              }`}
          >
            {isSubmitting ? (
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

