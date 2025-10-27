import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

// API Configuration
const API_BASE = "https://auditfiling.com";
const API_ENDPOINTS = {
  PROFILE: `${API_BASE}/api/v1/web/user/profile`,
  UPDATE_PROFILE: `${API_BASE}/user/update`,
  STATES: `${API_BASE}/api/v1/get_states`,
  DISTRICTS: `${API_BASE}/api/v1/get_district`,
  CITIES: `${API_BASE}/api/v1/get_city`
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
    .min(6, "Password must be at least 6 characters")
    .nullable(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .nullable()
});

// Custom hook for location data
const useLocationData = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [cityPincodeMap, setCityPincodeMap] = useState({});
  const [loading, setLoading] = useState({
    states: false,
    districts: false,
    cities: false
  });

  const fetchStates = useCallback(async () => {
    setLoading(prev => ({ ...prev, states: true }));
    try {
      const response = await fetch(API_ENDPOINTS.STATES);
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
      setLoading(prev => ({ ...prev, states: false }));
    }
  }, []);

  const fetchDistricts = useCallback(async (state) => {
    if (!state) {
      setDistricts([]);
      return;
    }
    setLoading(prev => ({ ...prev, districts: true }));
    try {
      const response = await fetch(
        `${API_ENDPOINTS.DISTRICTS}?state=${encodeURIComponent(state)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
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
      setLoading(prev => ({ ...prev, districts: false }));
    }
  }, []);

  const fetchCities = useCallback(async (state, district) => {
    if (!state || !district) {
      setCities([]);
      setCityPincodeMap({});
      return;
    }
    setLoading(prev => ({ ...prev, cities: true }));
    try {
      const response = await fetch(
        `${API_ENDPOINTS.CITIES}?district=${encodeURIComponent(district)}&state=${encodeURIComponent(state)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
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
      setCities(citiesArray);
      setCityPincodeMap(pincodeMap);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]);
      setCityPincodeMap({});
    } finally {
      setLoading(prev => ({ ...prev, cities: false }));
    }
  }, []);

  return {
    locationData: { states, districts, cities, cityPincodeMap },
    loading,
    fetchStates,
    fetchDistricts,
    fetchCities
  };
};

// Fixed Form Input Component - removed value prop
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
      className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm ${
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

  const {
    locationData,
    loading: locationLoading,
    fetchStates,
    fetchDistricts,
    fetchCities
  } = useLocationData();

  const defaultValues = useMemo(() => ({
    country: "India",
    password: "",
    confirmPassword: "",
    aadhaar: "",
    pan: "",
    address1: "",
    address2: "",
    gender: "",
    state: "",
    district: "",
    city: "",
    pincode: "",
    fullName: "",
    email: "",
    mobile: "",
    dob: ""
  }), []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    trigger,
    reset,
    getValues
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

  // Get user ID from localStorage
  const getUserId = useCallback(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        return user?.id || user;
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
    return null;
  }, []);

  // Error handling utility
  const handleApiError = useCallback((error, defaultMessage) => {
    console.error("API Error:", error);
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
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          setMessage("❌ User not logged in.");
          return;
        }

        const userData = JSON.parse(storedUser);
        const userId = userData?.id || userData?.user_id || userData?.userId;
        const token = userData?.token || userData?.accessToken || "";

        if (!userId) {
          setMessage("❌ User ID not found in localStorage");
          return;
        }

        const response = await axios.post(
          API_ENDPOINTS.PROFILE,
          { user_id: userId },
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // console.log("🎯 FULL Profile API Response:", response.data);

        // Extract user data from different possible response structures
        let user = null;

        if (response.data?.data) {
          user = response.data.data;
        } else if (response.data?.user) {
          user = response.data.user;
        } else if (response.data?.profile) {
          user = response.data.profile;
        } else {
          user = response.data;
        }

        if (user) {
          setUserData(user);

          // Map API data to form fields
          const formData = {
            // Personal Info
            fullName: user.fullName || user.name || user.full_name || user.username || "",
            email: user.email || user.email_id || "",
            mobile: user.mobile || user.phone || user.mobile_number || user.contact_number || "",
            dob: user.dob || user.dateOfBirth || user.date_of_birth || user.birth_date || "",
            gender: user.gender || "",
            pan: user.pan_no || "",
            state: user.state || "",
            district: user.district || "",
            aadhaar: user.aadhaar_no || user.aadhar || "",
            address1: user.address_line_1|| user.address ||  "",
            address2: user.address_line_2 || user.address_line2 || "",
            city: user.city || user.city_name || "",
            pincode: user.pincode || user.zipCode || user.pin_code || "",
            country: user.country || "India",
            password: "",
            confirmPassword: "",
          };

          console.log("📝 FINAL Form Data After Mapping:", formData);

          // Reset form with the mapped data
          reset(formData);

          // Set profile image if available
          if (user.image || user.profile_picture || user.avatar) {
            setPreview(user.image || user.profile_picture || user.avatar);
          }

          // If state is available, fetch districts
            if (formData.state) {
              console.log("🔄 Fetching districts for state:", formData.state);
              fetchDistricts(formData.state);
            }

            // If district is available, fetch cities
            if (formData.state && formData.district) {
              console.log("🔄 Fetching cities for district:", formData.district);
              fetchCities(formData.state, formData.district);
            }
        } else {
          setMessage("❌ No user data found in response");
        }
      } catch (error) {
        console.error("❌ Profile fetch error:", error);
        setMessage("⚠️ Failed to load profile. Please check console for details.");
      }
    };

    fetchProfile();
    fetchStates();
  }, [reset, fetchStates, fetchDistricts, fetchCities]);

  // Fetch districts when state changes
  useEffect(() => {
    if (watchState) {
      console.log("🔄 State changed, fetching districts for:", watchState);
      fetchDistricts(watchState);
    }
  }, [watchState, fetchDistricts]);

  // Fetch cities when district changes
  useEffect(() => {
    if (watchDistrict && watchState) {
      console.log("🔄 District changed, fetching cities for:", watchDistrict);
      fetchCities(watchState, watchDistrict);
    }
  }, [watchDistrict, watchState, fetchCities]);

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

  // Event Handlers
  const handleEmailChange = () => {
    setEditableEmail(!editableEmail);
  };

  const handleMobileChange = () => {
    setEditableMobile(!editableMobile);
  };

  const handleMobileInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setValue("mobile", value);
    trigger("mobile");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", file);
      setPreview(URL.createObjectURL(file));
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
      const userId = getUserId();
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const formData = new FormData();

      // Append all form data
      Object.keys(data).forEach((key) => {
        if (key === "image" && data[key]) {
          formData.append("image", data[key]);
        } else if (data[key] !== null && data[key] !== undefined && data[key] !== "") {
          formData.append(key, data[key]);
        }
      });

      formData.append("user_id", userId);

      const token = localStorage.getItem("token") || localStorage.getItem("user_name");
      const response = await axios.post(API_ENDPOINTS.UPDATE_PROFILE, formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      });

      console.log("Update response:", response.data);

      if (response.data.success) {
        setSaveStatus({ loading: false, success: true, error: null });
        setMessage("✅ Profile updated successfully!");
        setEditableEmail(false);
        setEditableMobile(false);

        setTimeout(() => setMessage(""), 5000);
      } else {
        throw new Error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      setSaveStatus({ loading: false, success: false, error: error.message });
      handleApiError(error, "Error updating profile. Please try again.");
    }
  };

  // Get current form values for display
  const formValues = watch();

  if (!userData && saveStatus.loading) {
    return <LoadingSpinner message="Loading user profile..." />;
  }

  return (
    <div className="min-h-screen mt-30 flex items-center justify-center py-8 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl border border-gray-200"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          User Profile
        </h1>

        {message && (
          <div className={`text-center mb-6 p-3 rounded-lg ${
            message.includes("✅") ? "bg-green-100 text-green-800 border border-green-200" :
            message.includes("❌") ? "bg-red-100 text-red-800 border border-red-200" :
            message.includes("📍") ? "bg-blue-100 text-blue-800 border border-blue-200" :
            "bg-gray-100 text-gray-800 border border-gray-200"
          }`}>
            {message}
          </div>
        )}

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-8">
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
            className="w-full max-w-xs border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
          />
        </div>

        {/* Email & Mobile Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Email</label>
            <div className="flex gap-2">
              <input
                type="email"
                {...register("email")}
                disabled={!editableEmail}
                className={`flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } ${editableEmail ? "bg-white" : "bg-gray-100"}`}
              />
              <button
                type="button"
                onClick={handleEmailChange}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {editableEmail ? "Save" : "Edit"}
              </button>
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Mobile Field */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Mobile</label>
            <div className="flex gap-2">
              <input
                type="tel"
                {...register("mobile")}
                disabled={!editableMobile}
                onChange={handleMobileInputChange}
                className={`flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm ${
                  errors.mobile ? "border-red-500" : "border-gray-300"
                } ${editableMobile ? "bg-white" : "bg-gray-100"}`}
              />
              <button
                type="button"
                onClick={handleMobileChange}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {editableMobile ? "Save" : "Edit"}
              </button>
            </div>
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile.message}</p>
            )}
          </div>
        </div>

        {/* Other Fields - REMOVED value props */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
            placeholder="12-digit Aadhaar number"
          />

          <FormInput
            label="PAN No"
            name="pan"
            type="text"
            register={register}
            errors={errors}
            onChange={handlePanChange}
            placeholder="e.g., ABCDE1234F"
          />

          <FormInput
            label="Address 1"
            name="address1"
            type="text"
            register={register}
            errors={errors}
            placeholder="Street address"
          />

          <FormInput
            label="Address 2"
            name="address2"
            type="text"
            register={register}
            errors={errors}
            placeholder="Apartment, suite, etc."
          />

          {/* Gender */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Gender</label>
            <select
              {...register("gender")}
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm ${
                errors.gender ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Gender</option>
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
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm ${
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
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm ${
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
              className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select City</option>
              {locationData.cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
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
            placeholder="6-digit PIN code"
          />

          <FormInput
            label="Country"
            name="country"
            type="text"
            register={register}
            errors={errors}
            disabled
            className="bg-gray-100"
          />

          <FormInput
            label="New Password"
            name="password"
            type="password"
            register={register}
            errors={errors}
            placeholder="Leave blank to keep current"
          />

          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            register={register}
            errors={errors}
            placeholder="Confirm new password"
          />
        </div>

      

        {/* Submit Button */}
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