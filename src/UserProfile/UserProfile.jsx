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
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserProfile() {
  const API_BASE = "https://auditfiling.com"; // 🔹 change easily
  const user_id = localStorage.getItem("user_id");

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

  const [dropdowns, setDropdowns] = useState({
    states: [],
    districts: [],
    cities: [],
    pincodes: [],
  });

  const [editableEmail, setEditableEmail] = useState(false);
  const [editableMobile, setEditableMobile] = useState(false);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // 📌 Load User Profile
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "User Profile - AuditFiling";

    if (!user_id) {
      console.warn("⚠️ No user_id found in localStorage");
      setMessage("⚠️ User not logged in.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      console.log("📤 Fetching user profile:", `${API_BASE}/api/v1/web/user/profile/${user_id}`);
      try {
        const res = await axios.get(`${API_BASE}/api/v1/web/user/profile/${user_id}`);
        console.log("✅ User profile loaded:", res.data);

        const data = res.data || {};
        setFormData({
          ...formData,
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
        if (data.image) setPreview(data.image);
      } catch (err) {
        console.error("❌ Error loading user profile:", err);
        setMessage("❌ Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    // eslint-disable-next-line
  }, [user_id]);

  // 📌 Fetch all states
  useEffect(() => {
    console.log("📤 Fetching states:", `${API_BASE}/get_states`);
    axios
      .get(`${API_BASE}/get_states`)
      .then((res) => {
        console.log("✅ States loaded:", res.data);
        setDropdowns((d) => ({ ...d, states: res.data || [] }));
      })
      .catch((err) => console.error("❌ Error loading states:", err));
  }, []);

  // 📌 Fetch districts on state change
  useEffect(() => {
    if (!formData.state) return;
    console.log("📤 Fetching districts for state:", formData.state);
    axios
      .post(`${API_BASE}/get_district`, { state: formData.state })
      .then((res) => {
        console.log("✅ Districts loaded:", res.data);
        setDropdowns((d) => ({ ...d, districts: res.data || [] }));
      })
      .catch((err) => console.error("❌ Error loading districts:", err));
  }, [formData.state]);

  // 📌 Fetch cities on district change
  useEffect(() => {
    if (!formData.district) return;
    console.log("📤 Fetching cities for district:", formData.district);
    axios
      .post(`${API_BASE}/get_city`, { district: formData.district })
      .then((res) => {
        console.log("✅ Cities loaded:", res.data);
        setDropdowns((d) => ({ ...d, cities: res.data || [] }));
      })
      .catch((err) => console.error("❌ Error loading cities:", err));
  }, [formData.district]);

  // 📌 Fetch pincodes on city change
  useEffect(() => {
    if (!formData.city) return;
    console.log("📤 Fetching pincodes for city:", formData.city);
    axios
      .post(`${API_BASE}/get_pincode`, { city: formData.city })
      .then((res) => {
        console.log("✅ Pincodes loaded:", res.data);
        setDropdowns((d) => ({ ...d, pincodes: res.data || [] }));
      })
      .catch((err) => console.error("❌ Error loading pincodes:", err));
  }, [formData.city]);

  // 📌 Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      console.log("🖼️ New image selected:", files[0]);
      setFormData({ ...formData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      console.log(`✏️ Updated field [${name}] =`, value);
      setFormData({ ...formData, [name]: value });
    }
  };

  // 📌 Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    console.log("📤 Submitting updated profile:", formData);

    if (formData.password && formData.password !== formData.confirmPassword) {
      console.warn("⚠️ Passwords do not match");
      return setMessage("❌ Passwords do not match!");
    }

    try {
      const submissionData = new FormData();
      Object.entries(formData).forEach(([key, val]) => submissionData.append(key, val));

      console.log("📦 FormData ready to send:", Object.fromEntries(submissionData));

      const res = await axios.post(
        `${API_BASE}/api/v1/user/profile/update/${user_id}`,
        submissionData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("✅ Profile updated successfully:", res.data);
      setMessage("✅ Profile updated successfully!");
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      setMessage("❌ Error updating profile. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-700 text-lg">
        Loading user profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 md:px-10 flex justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 md:p-10 w-full max-w-5xl border border-gray-200"
      >
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          User Profile
        </h1>

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

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={preview || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt="Profile"
            className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-blue-300 object-cover shadow"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="mt-3 text-sm border border-gray-300 rounded-lg p-2 w-full md:w-1/3"
          />
        </div>

        {/* Email & Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <EditableField
            label="Email"
            name="email"
            value={formData.email}
            editable={editableEmail}
            onToggle={() => setEditableEmail(!editableEmail)}
            onChange={handleChange}
          />
          <EditableField
            label="Mobile"
            name="mobile"
            value={formData.mobile}
            editable={editableMobile}
            onToggle={() => setEditableMobile(!editableMobile)}
            onChange={handleChange}
          />
        </div>

        {/* Rest of Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["Full Name", "fullName", "text"],
            ["Date of Birth", "dob", "date"],
            ["Aadhaar No", "aadhaar", "text"],
            ["PAN No", "pan", "text"],
            ["Address 1", "address1", "text"],
            ["Address 2", "address2", "text"],
          ].map(([label, name, type]) => (
            <Field key={name} label={label} name={name} type={type} value={formData[name]} onChange={handleChange} />
          ))}

          {/* Gender */}
          <SelectField label="Gender" name="gender" value={formData.gender} options={["Male", "Female", "Other"]} onChange={handleChange} />

          {/* State → Pincode */}
          <SelectField label="State" name="state" value={formData.state} options={dropdowns.states.map((s) => s.state)} onChange={handleChange} />
          <SelectField label="District" name="district" value={formData.district} options={dropdowns.districts.map((d) => d.district)} onChange={handleChange} />
          <SelectField label="City" name="city" value={formData.city} options={dropdowns.cities.map((c) => c.city)} onChange={handleChange} />
          <SelectField label="Pincode" name="pincode" value={formData.pincode} options={dropdowns.pincodes.map((p) => p.pincode)} onChange={handleChange} />

          <Field label="Country" name="country" value={formData.country} readOnly />
          <Field label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="New password" />
          <Field label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter password" />
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

// 🔹 Reusable Components
const Field = ({ label, ...props }) => (
  <div>
    <label className="block text-gray-700 mb-1 font-medium">{label}</label>
    <input
      {...props}
      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-100 text-sm"
    />
  </div>
);

const SelectField = ({ label, name, value, options, onChange }) => (
  <div>
    <label className="block text-gray-700 mb-1 font-medium">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-lg p-2 text-sm"
    >
      <option value="">Select</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const EditableField = ({ label, name, value, editable, onToggle, onChange }) => (
  <div className="flex flex-col md:flex-row items-center gap-2">
    <label className="text-gray-700 font-medium w-28">{label}:</label>
    <input
      type={name === "email" ? "email" : "tel"}
      name={name}
      value={value}
      disabled={!editable}
      onChange={onChange}
      className={`w-full border rounded-lg p-2 text-sm ${
        editable ? "border-blue-400 bg-white" : "border-gray-200 bg-gray-100"
      }`}
    />
    <button
      type="button"
      onClick={onToggle}
      className="ml-2 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
    >
      {editable ? "Cancel" : "Change"}
    </button>
  </div>
);

