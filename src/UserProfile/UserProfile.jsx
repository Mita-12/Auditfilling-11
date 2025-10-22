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
import axios from "axios";

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
    .oneOf([yup.ref("password")], "Passwords must match")
    .when('password', (password, schema) => {
      return password ? schema.required("Please confirm your password") : schema;
    }),
  image: yup.mixed().nullable(),
});

export default function UserProfile() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [cityPincodeMap, setCityPincodeMap] = useState({}); // Store city to pincode mapping
  const [isLoadingStates, setIsLoadingStates] = useState(false);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [editableEmail, setEditableEmail] = useState(false);
  const [editableMobile, setEditableMobile] = useState(false);
  const [tempEmail, setTempEmail] = useState("");
  const [tempMobile, setTempMobile] = useState("");

  // Handle email change toggle
  const handleEmailChange = () => {
    if (!editableEmail) {
      // Entering edit mode - store current email
      setTempEmail(watch("email"));
      setEditableEmail(true);
    } else {
      // Saving - exit edit mode
      setEditableEmail(false);
      // Show message if email was changed
      if (watch("email") !== tempEmail) {
        setMessage("✅ Email will be updated when you save the profile");
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  // Handle mobile change toggle
  const handleMobileChange = () => {
    if (!editableMobile) {
      // Entering edit mode - store current mobile
      setTempMobile(watch("mobile"));
      setEditableMobile(true);
    } else {
      // Saving - exit edit mode
      setEditableMobile(false);
      // Show message if mobile was changed
      if (watch("mobile") !== tempMobile) {
        setMessage("✅ Mobile will be updated when you save the profile");
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  // Handle mobile input formatting
  const handleMobileInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setValue("mobile", value);
    trigger("mobile");
  };




  const user_id = localStorage.getItem("user_id");

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
    defaultValues: {
      country: "India",
    },
    mode: "onBlur",
  });

  // Watch for state and district changes to trigger API calls
  const watchState = watch("state");
  const watchDistrict = watch("district");
  const watchCity = watch("city");
  const watchPinCode = watch("pincode");

  // Fetch user profile data
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "User Profile - AuditFiling";

    if (!user_id) {
      setMessage("User not logged in.");
      setLoading(false);
      return;
    }

    axios
      .get(`https://auditfiling.com/api/v1/web/user/profile/${user_id}`)
      .then((res) => {
        const data = res.data;

        // DEBUG: Detailed logging
        console.log("🎯 PROFILE API RAW RESPONSE:", data);
        console.log("📋 Available fields in response:", Object.keys(data));

        // Check nested structures
        if (data.data) {
          console.log("📦 Data field contents:", data.data);
          console.log("📦 Data field keys:", Object.keys(data.data));
        }

        // Extract user data - handle different response structures
        let userData = data;

        // If data is nested under 'data' property
        if (data.data && typeof data.data === 'object') {
          userData = data.data;
        }
        // If data is nested under 'user' property
        else if (data.user && typeof data.user === 'object') {
          userData = data.user;
        }
        // If data is nested under 'profile' property
        else if (data.profile && typeof data.profile === 'object') {
          userData = data.profile;
        }

        console.log("👤 Extracted user data:", userData);
        console.log("👤 User data keys:", Object.keys(userData));

        // Create form data with proper fallbacks
        const formData = {
          fullName: userData.fullName || userData.name || userData.full_name || "",
          email: userData.email || "",
          mobile: userData.mobile || userData.phone || userData.phoneNumber || userData.mobileNumber || "",
          dob: userData.dob || userData.dateOfBirth || userData.birthDate || "",
          gender: userData.gender || "",
          aadhaar: userData.aadhaar || userData.aadhar || "",
          pan: userData.pan || "",
          address1: userData.address1 || userData.address || userData.street || "",
          address2: userData.address2 || "",
          country: userData.country || "India",
          state: userData.state || "",
          district: userData.district || "",
          city: userData.city || "",
          pincode: userData.pincode || userData.zipCode || userData.postalCode || "",
          image: userData.image || userData.profileImage || userData.avatar || null,
          password: "",
          confirmPassword: "",
        };

        // DEBUG: Log which fields actually have values
        const fieldsWithValues = Object.keys(formData).filter(key => formData[key] && formData[key] !== "");
        console.log("✅ Fields with values:", fieldsWithValues);
        console.log("❌ Empty fields:", Object.keys(formData).filter(key => !formData[key] || formData[key] === ""));

        reset(formData);

        if (formData.image) {
          setPreview(formData.image);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error loading profile:", error);
        setMessage("Failed to load profile.");
        setLoading(false);
      });
  }, [user_id, reset]);

  // Fetch states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      setIsLoadingStates(true);
      try {
        const response = await fetch("https://auditfiling.com/api/v1/get_states");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "success" && Array.isArray(data.states)) {
          setStates(data.states);
        } else {
          console.error("Unexpected states data structure:", data);
          setStates([]);
        }
      } catch (error) {
        console.error("Error fetching states:", error);
        setStates([]);
      } finally {
        setIsLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

  // Fetch districts when state changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!watchState) {
        setDistricts([]);
        setCities([]);
        setCityPincodeMap({});
        return;
      }

      setIsLoadingDistricts(true);
      setDistricts([]);
      setCities([]);
      setCityPincodeMap({});
      setValue("district", "");
      setValue("city", "");
      setValue("pincode", "");

      try {
        const response = await fetch(
          `https://auditfiling.com/api/v1/get_district?state=${encodeURIComponent(watchState)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Districts API Response:", data);

        if (data.status === "success" && data.districts && typeof data.districts === 'object') {
          const districtNames = Object.keys(data.districts);
          setDistricts(districtNames);
        } else {
          console.error("Unexpected districts data structure:", data);
          setDistricts([]);
        }
      } catch (error) {
        console.error("Error fetching districts:", error);
        setDistricts([]);
      } finally {
        setIsLoadingDistricts(false);
      }
    };

    fetchDistricts();
  }, [watchState, setValue]);

  // Fetch cities when district changes - UPDATED TO STORE PINCODE MAPPING
  // Fetch cities when district changes - UPDATED TO STORE PINCODE MAPPING
  useEffect(() => {
    const fetchCities = async () => {
      if (!watchDistrict || !watchState) {
        setCities([]);
        setCityPincodeMap({});
        return;
      }

      console.log("🔄 Fetching cities for district:", watchDistrict);
      setIsLoadingCities(true);
      setCities([]);
      setCityPincodeMap({});
      setValue("city", "");
      setValue("pincode", "");

      try {
        const response = await fetch(
          `https://auditfiling.com/api/v1/get_city?district=${encodeURIComponent(watchDistrict)}&state=${encodeURIComponent(watchState)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("📡 Cities API Raw Data:", data);

        let citiesArray = [];
        let pincodeMap = {};

        // Your API structure: {status: 'success', cities: {CityName: 'PINCode', ...}}
        if (data.status === "success" && data.cities && typeof data.cities === 'object') {
          citiesArray = Object.keys(data.cities);
          pincodeMap = data.cities; // Store the complete mapping
          console.log("✅ Extracted Cities:", citiesArray);
          console.log("📍 City-PIN Code Mapping:", pincodeMap);
        } else {
          console.warn("⚠️ Unexpected cities format:", data);
          citiesArray = [];
        }

        setCities(citiesArray);
        setCityPincodeMap(pincodeMap);
      } catch (error) {
        console.error("❌ Error fetching cities:", error);
        setCities([]);
        setCityPincodeMap({});
      } finally {
        setIsLoadingCities(false);
      }
    };

    fetchCities();
  }, [watchDistrict, watchState, setValue]);

  // Auto-fill PIN code when city is selected
  useEffect(() => {
    if (watchCity && cityPincodeMap[watchCity]) {
      const pincode = cityPincodeMap[watchCity];
      console.log(`📍 Auto-filling PIN code for ${watchCity}: ${pincode}`);
      setValue("pincode", pincode);
      trigger("pincode");

      // Show success message
      setMessage(`📍 PIN code for ${watchCity}: ${pincode}`);
      setTimeout(() => setMessage(""), 3000);
    }
  }, [watchCity, cityPincodeMap, setValue, trigger]);

  // Handle city change manually
  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setValue("city", selectedCity);

    // Auto-fill PIN code if available
    if (selectedCity && cityPincodeMap[selectedCity]) {
      const pincode = cityPincodeMap[selectedCity];
      setValue("pincode", pincode);
    }

    trigger("city");
  };

  // Auto-fill PIN code when city is selected
  useEffect(() => {
    if (watchCity && cityPincodeMap[watchCity]) {
      const pincode = cityPincodeMap[watchCity];
      console.log(`📍 Auto-filling PIN code for ${watchCity}: ${pincode}`);
      setValue("pincode", pincode);
      trigger("pincode");
    }
  }, [watchCity, cityPincodeMap, setValue, trigger]);

  // Auto-fill address when PIN code is entered (optional - keep this if you want both ways)
  useEffect(() => {
    const fetchAddressByPinCode = async () => {
      if (!watchPinCode || watchPinCode.length !== 6) return;

      try {
        const response = await fetch(
          `https://auditfiling.com/api/v1/get_pincode?pincode=${watchPinCode}`
        );

        if (response.ok) {
          const addressData = await response.json();
          console.log("PIN Code API Response:", addressData);

          if (addressData) {
            const state = addressData.state || addressData.State || addressData.STATE;
            const district = addressData.district || addressData.District || addressData.DISTRICT;
            const city = addressData.city || addressData.City || addressData.CITY || addressData.division;

            if (state) {
              setValue("state", state);
              await trigger("state");
            }
            if (district) {
              setValue("district", district);
              await trigger("district");
            }
            if (city) {
              setValue("city", city);
              await trigger("city");
            }
          }
        } else {
          console.warn("PIN code API returned non-OK response");
        }
      } catch (error) {
        console.error("Error fetching address by PIN code:", error);
        setMessage("⚠️ Could not auto-fill address from PIN code");
        setTimeout(() => setMessage(""), 3000);
      }
    };

    const timeoutId = setTimeout(fetchAddressByPinCode, 1000);
    return () => clearTimeout(timeoutId);
  }, [watchPinCode, setValue, trigger]);

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

  // const handleMobileChange = (e) => {
  //   const value = e.target.value.replace(/\D/g, "").slice(0, 10);
  //   setValue("mobile", value);
  //   trigger("mobile");
  // };

  const handlePinCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setValue("pincode", value);
    trigger("pincode");
  };

  // Handle city change manually to show PIN code immediately
  // const handleCityChange = (e) => {
  //   const selectedCity = e.target.value;
  //   setValue("city", selectedCity);

  //   // Auto-fill PIN code if available
  //   if (selectedCity && cityPincodeMap[selectedCity]) {
  //     const pincode = cityPincodeMap[selectedCity];
  //     setValue("pincode", pincode);
  //     setMessage(`📍 PIN code for ${selectedCity}: ${pincode}`);
  //     setTimeout(() => setMessage(""), 3000);
  //   }

  //   trigger("city");
  // };

  const onSubmit = async (data) => {
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

      await axios.post(
        `https://auditfiling.com/api/v1/web/user/update/${user_id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage("✅ Profile updated successfully!");
      setEditableEmail(false);
      setEditableMobile(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage("❌ Error updating profile. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-700">
        Loading user profile...
      </div>
    );
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
            className={`text-center mb-4 font-semibold ${message.includes("✅")
              ? "text-green-600"
              : message.includes("❌")
                ? "text-red-600"
                : message.includes("⚠️")
                  ? "text-yellow-600"
                  : message.includes("📍")
                    ? "text-blue-600"
                    : "text-gray-600"
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
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm ${errors.email ? "border-red-500" : "border-gray-300"
                } ${editableEmail
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
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm ${errors.mobile ? "border-red-500" : "border-gray-300"
                } ${editableMobile
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
          {[
            ["Full Name", "fullName", "text"],
            ["Date of Birth", "dob", "date"],
            ["Aadhaar No", "aadhaar", "text"],
            ["PAN No", "pan", "text"],
            ["Address 1", "address1", "text"],
            ["Address 2", "address2", "text"],
          ].map(([label, name, type]) => (
            <div key={name}>
              <label className="block text-gray-700 mb-1 font-medium">
                {label}
              </label>
              <input
                type={type}
                {...register(name)}
                onChange={
                  name === "aadhaar" ? handleAadhaarChange :
                    name === "pan" ? handlePanChange : undefined
                }
                className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm ${errors[name] ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[name].message}
                </p>
              )}
            </div>
          ))}

          {/* Gender */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Gender
            </label>
            <select
              {...register("gender")}
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm ${errors.gender ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">State</label>
            <select
              {...register("state")}
              disabled={isLoadingStates}
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm ${errors.state ? "border-red-500" : "border-gray-300"
                }`}
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
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.state.message}
              </p>
            )}
          </div>

          {/* District */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">District</label>
            <select
              {...register("district")}
              disabled={!watchState || isLoadingDistricts}
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm ${errors.district ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value="">Select District</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
            {/* {isLoadingDistricts && (
              <p className="text-blue-500 text-sm mt-1">Loading districts...</p>
            )} */}
            {errors.district && (
              <p className="text-red-500 text-sm mt-1">
                {errors.district.message}
              </p>
            )}
          </div>

          {/* City - UPDATED WITH AUTO PINCODE */}
          {/* City - Shows only city names, but auto-fills PIN code */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">City</label>
            <select
              {...register("city")}
              onChange={handleCityChange}
              disabled={!watchDistrict || isLoadingCities}
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm ${errors.city ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value="">Select City</option>
              {cities.length > 0 ? (
                cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city} {/* Only show city name, no PIN code */}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  {isLoadingCities ? "Loading cities..." : "Select a district first"}
                </option>
              )}
            </select>
            {/* {isLoadingCities && (
    <p className="text-blue-500 text-sm mt-1">Loading cities for {watchDistrict}...</p>
  )} */}
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">
                {errors.city.message}
              </p>
            )}
          </div>

          {/* PIN Code - Auto-filled when city is selected */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">PIN Code</label>
            <input
              type="text"
              {...register("pincode")}
              onChange={handlePinCodeChange}
              placeholder="Auto-filled when city is selected"
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm ${errors.pincode ? "border-red-500" : "border-gray-300"
                }`}
            />
            {/* {watchCity && cityPincodeMap[watchCity] && (
    <p className="text-green-500 text-sm mt-1">
      ✅ PIN code auto-filled for {watchCity}
    </p>
  )} */}
            {errors.pincode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.pincode.message}
              </p>
            )}
          </div>

          {/* Country */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Country
            </label>
            <input
              type="text"
              {...register("country")}
              readOnly
              className="w-full border border-gray-300 bg-gray-100 rounded-lg p-2"
            />
          </div>

          {/* Passwords */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter new password"
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm ${errors.password ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Re-enter password"
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-100 text-sm ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-lg font-semibold text-white transition-all shadow-md hover:shadow-lg ${isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
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