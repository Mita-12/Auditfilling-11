// import React, { useEffect, useState } from "react";

// export default function DocumentUpload({ serviceId }) {
//   const [documents, setDocuments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const apiUrl = `https://auditfiling.com/api/v1/service/${serviceId}`;

//   function getAuthToken() {
//     try {
//       const raw = localStorage.getItem("user");
//       if (!raw) return localStorage.getItem("token") || null;
//       const user = JSON.parse(raw);
//       return user?.token || user?.access_token || null;
//     } catch (e) {
//       return localStorage.getItem("token") || null;
//     }
//   }

//   useEffect(() => {
//     const fetchDocuments = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const token = getAuthToken();

//         const response = await fetch(apiUrl, {
//           headers: {
//             Authorization: token ? `Bearer ${token}` : "",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }

//         const data = await response.json();

//         const docs = data?.data?.documents || data?.documents || [];
//         setDocuments(docs);
//       } catch (err) {
//         setError(err.message || "Failed to load documents.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (serviceId) fetchDocuments();
//   }, [serviceId]);

//   return (
//     <div className="max-w-4xl mx-auto bg-white mt-20 rounded-2xl shadow-sm p-6">
//       <h2 className="text-xl font-semibold mb-3">Uploaded Documents</h2>

//       {loading && <p className="text-gray-600">Loading documents...</p>}
//       {error && <p className="text-red-600">{error}</p>}

//       {!loading && !error && documents.length === 0 && (
//         <p className="text-gray-600">No documents uploaded yet.</p>
//       )}

//       {!loading && documents.length > 0 && (
//         <ul className="divide-y divide-gray-200">
//           {documents.map((doc, index) => (
//             <li key={index} className="py-3 flex justify-between items-center">
//               <div>
//                 <p className="font-medium text-gray-900">{doc.name || doc.document_name}</p>
//                 <p className="text-xs text-gray-500">
//                   Uploaded on:{" "}
//                   {doc.created_at
//                     ? new Date(doc.created_at).toLocaleString()
//                     : "N/A"}
//                 </p>
//               </div>
//               {doc.file_url ? (
//                 <a
//                   href={doc.file_url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-sm text-blue-600 hover:underline"
//                 >
//                   View / Download
//                 </a>
//               ) : (
//                 <span className="text-sm text-gray-400">No file link</span>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";

/**
 Props:
  - userId (number)
  - serviceId (number)
*/
export default function DocumentUpload({ userId, serviceId }) {
  const [requiredDocs, setRequiredDocs] = useState([]);
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [loadingRequired, setLoadingRequired] = useState(false);
  const [loadingUploaded, setLoadingUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [textInputs, setTextInputs] = useState({});
  const [fileInputs, setFileInputs] = useState({});

  const BASE = "https://auditfiling.com/api/v1";

  // ✅ Helper to get user token from localStorage
  function getAuthToken() {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return localStorage.getItem("token") || null;
      const user = JSON.parse(raw);
      return user?.token || user?.access_token || null;
    } catch (e) {
      return localStorage.getItem("token") || null;
    }
  }

  // ✅ Fetch Required Documents
  useEffect(() => {
    if (!userId || !serviceId) return;
    const fetchRequired = async () => {
      setLoadingRequired(true);
      setError(null);
      try {
        const token = getAuthToken();
        const res = await fetch(`${BASE}/user/services/document/upload`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({
            user_id: userId,
            service_id: serviceId,
          }),
        });

        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`Required docs fetch failed: ${res.status} ${txt}`);
        }

        const json = await res.json();
        console.log("required docs response:", json);

        // ✅ Try multiple possible response shapes
        const docs =
          json?.data?.documents ||
          json?.data?.required_documents ||
          json?.documents ||
          json?.data ||
          [];

        console.log("Resolved required docs:", docs);
        setRequiredDocs(Array.isArray(docs) ? docs : []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch required documents.");
      } finally {
        setLoadingRequired(false);
      }
    };

    fetchRequired();
  }, [userId, serviceId]);

  // ✅ Fetch Uploaded Documents
  useEffect(() => {
    if (!serviceId) return;
    const fetchUploaded = async () => {
      setLoadingUploaded(true);
      setError(null);
      try {
        const token = getAuthToken();
        const res = await fetch(`${BASE}/service/${serviceId}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`Uploaded docs fetch failed: ${res.status} ${txt}`);
        }

        const json = await res.json();
        console.log("uploaded docs response:", json);

        const docs =
          json?.data?.documents ||
          json?.documents ||
          json?.data ||
          [];
        setUploadedDocs(Array.isArray(docs) ? docs : []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch uploaded documents.");
      } finally {
        setLoadingUploaded(false);
      }
    };

    fetchUploaded();
  }, [serviceId]);

  // ✅ Input handlers
  const handleTextChange = (docId, value) =>
    setTextInputs((p) => ({ ...p, [docId]: value }));

  const handleFileChange = (docId, file) =>
    setFileInputs((p) => ({ ...p, [docId]: file }));

  // ✅ Upload Handler
  const handleUpload = async (doc) => {
    if (!userId || !serviceId) {
      alert("Missing userId or serviceId");
      return;
    }

    const docType =
      doc.document_type ||
      doc.type ||
      doc.field_type ||
      (doc.is_text ? "Text" : "Document");

    // Validation
    if (docType.toLowerCase() === "text" && !textInputs[doc.id]) {
      alert("Please enter text for this document.");
      return;
    }

    if (docType.toLowerCase() !== "text" && !fileInputs[doc.id]) {
      alert("Please choose a file to upload.");
      return;
    }

    setUploading(true);
    setError(null);
    try {
      const token = getAuthToken();
      const form = new FormData();
      form.append("user_id", userId);
      form.append("service_id", serviceId);
      form.append("document_id", doc.id ?? doc.document_id);
      form.append("document_type", docType);

      if (docType.toLowerCase() === "text") {
        form.append("text", textInputs[doc.id] || "");
      } else {
        form.append("file", fileInputs[doc.id]);
      }

      const res = await fetch(`${BASE}/user/services/document/upload/store`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: form,
      });

      const text = await res.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch {
        json = { raw: text };
      }

      if (!res.ok) {
        console.error("upload error response:", json);
        throw new Error(`Upload failed: ${res.status} ${JSON.stringify(json)}`);
      }

      console.log("Upload success:", json);

      // Clear input
      setTextInputs((p) => ({ ...p, [doc.id]: "" }));
      setFileInputs((p) => ({ ...p, [doc.id]: null }));

      // Refresh uploaded list
      try {
        const token2 = getAuthToken();
        const res2 = await fetch(`${BASE}/service/${serviceId}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: token2 ? `Bearer ${token2}` : "",
          },
        });
        const j2 = await res2.json();
        const docs =
          j2?.data?.documents || j2?.documents || j2?.data || [];
        setUploadedDocs(Array.isArray(docs) ? docs : []);
      } catch (e) {
        console.warn("Could not refresh uploaded docs after upload:", e);
      }

      alert("Upload succeeded");
    } catch (err) {
      console.error(err);
      alert(`Upload failed: ${err.message}`);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white mt-40 rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Required Documents</h2>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      {/* ✅ Required Documents */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Required Documents</h3>
        {loadingRequired ? (
          <p className="text-gray-600">Loading required documents...</p>
        ) : requiredDocs.length === 0 ? (
          <p className="text-gray-600">No required documents found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {requiredDocs.map((doc) => {
              const type =
                doc.document_type ||
                doc.type ||
                doc.field_type ||
                "Document";

              return (
                <li key={doc.id ?? doc.document_id} className="py-4">
                  <div className="mb-2">
                    <p className="font-medium text-gray-900">
                      {doc.name || doc.title || `Document ${doc.id}`}
                    </p>
                    <p className="text-xs text-gray-500">Type: {type}</p>
                  </div>

                  {type.toLowerCase() === "text" ? (
                    <textarea
                      className="w-full border rounded-md p-2 text-sm mb-2"
                      placeholder={`Enter ${doc.name || "text"}`}
                      value={textInputs[doc.id] || ""}
                      onChange={(e) =>
                        handleTextChange(doc.id, e.target.value)
                      }
                    />
                  ) : (
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      className="text-sm mb-2"
                      onChange={(e) =>
                        handleFileChange(doc.id, e.target.files[0])
                      }
                    />
                  )}

                  <button
                    onClick={() => handleUpload(doc)}
                    disabled={uploading}
                    className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                      uploading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {uploading ? "Uploading..." : "Upload"}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* ✅ Uploaded Documents */}
      <div>
        <h3 className="font-medium mb-2">Already Uploaded Documents</h3>
        {loadingUploaded ? (
          <p className="text-gray-600">Loading uploaded documents...</p>
        ) : uploadedDocs.length === 0 ? (
          <p className="text-gray-600">No documents uploaded yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {uploadedDocs.map((doc, i) => (
              <li
                key={doc.id ?? i}
                className="py-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {doc.name ||
                      doc.document_name ||
                      doc.title ||
                      `File ${i + 1}`}
                  </p>
                  <p className="text-xs text-gray-500">
                    Uploaded on:{" "}
                    {doc.created_at
                      ? new Date(doc.created_at).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
                {doc.file_url ? (
                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View / Download
                  </a>
                ) : (
                  <span className="text-sm text-gray-400">No file link</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

