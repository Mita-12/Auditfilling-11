import React, { useState } from "react";

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Profile Data:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6">User Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email ID
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Mobile No.
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* DOB */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              DOB
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Aadhaar */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Aadhaar No
            </label>
            <input
              type="text"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
              placeholder="Enter Aadhaar Number"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* PAN */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              PAN No
            </label>
            <input
              type="text"
              name="pan"
              value={formData.pan}
              onChange={handleChange}
              placeholder="Enter PAN Number"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Address 1 */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Address 1
            </label>
            <input
              type="text"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              placeholder="Enter Address..."
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Address 2 */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Address 2
            </label>
            <input
              type="text"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              placeholder="Enter Address..."
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              readOnly
              className="w-full border rounded-lg p-2 bg-gray-100"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              State
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="">Select</option>
              <option value="Odisha">Odisha</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Bihar">Bihar</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              District
            </label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              placeholder="Enter District"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter City"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Pin Code */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Pin Code
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter Your Pincode"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Profile Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Set Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Enter Confirm Password"
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}
