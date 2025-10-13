import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserProfile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    aadhaar: "",
    pan: "",
    address1: "",
    address2: "",
    country: "India",
    state: "",
    district: "",
    city: "",
    pincode: "",
    image: null,
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const user_id = localStorage.getItem("user_id"); // assuming user_id is stored after login

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "User Profile - AuditFiling";

    if (!user_id) {
      setMessage("User not logged in.");
      setLoading(false);
      return;
    }

    // Fetch user profile
    axios
      .get(`https://auditfiling.com/api/v1/web/user/profile/${user_id}`)
      .then((res) => {
        const data = res.data;
        setFormData({
          fullName: data.fullName || "",
          email: data.email || "",
          mobile: data.mobile || "",
          dob: data.dob || "",
          gender: data.gender || "",
          aadhaar: data.aadhaar || "",
          pan: data.pan || "",
          address1: data.address1 || "",
          address2: data.address2 || "",
          country: data.country || "India",
          state: data.state || "",
          district: data.district || "",
          city: data.city || "",
          pincode: data.pincode || "",
          image: data.image || null,
          password: "",
          confirmPassword: "",
        });
        console.log("User profile loaded:", data);
        
        if (data.image) setPreview(data.image);
      })
      .catch(() => setMessage("Failed to load profile."))
      .finally(() => setLoading(false));
  }, [user_id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    try {
      const submissionData = new FormData();
      Object.keys(formData).forEach((key) => {
        submissionData.append(key, formData[key]);
      });

      await axios.post(
        `https://auditfiling.com/api/v1/web/user/update/${user_id}`,
        submissionData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage("✅ Profile updated successfully!");
    } catch (err) {
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
    <div className="min-h-screen m-20  flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
          User Profile
        </h2>

        {message && (
          <p
            className={`text-center mb-4 font-semibold ${
              message.includes("✅")
                ? "text-green-600"
                : message.includes("❌")
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Profile image */}
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
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="text-sm text-gray-600"
          />
        </div>

        {/* Grid Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["Full Name", "fullName", "text"],
            ["Email", "email", "email"],
            ["Mobile", "mobile", "tel"],
            ["Date of Birth", "dob", "date"],
            ["Aadhaar No", "aadhaar", "text"],
            ["PAN No", "pan", "text"],
            ["Address 1", "address1", "text"],
            ["Address 2", "address2", "text"],
            ["District", "district", "text"],
            ["City", "city", "text"],
            ["PIN Code", "pincode", "text"],
          ].map(([label, name, type]) => (
            <div key={name}>
              <label className="block text-gray-700 mb-1 font-medium">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={`Enter ${label.toLowerCase()}`}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          {/* Gender */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option>Odisha</option>
              <option>West Bengal</option>
              <option>Bihar</option>
              <option>Jharkhand</option>
              <option>Other</option>
            </select>
          </div>

          {/* Country (readonly) */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}
