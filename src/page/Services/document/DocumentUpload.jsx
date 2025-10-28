import React, { useEffect, useState } from "react";

export default function DocumentUpload({ serviceId }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://auditfiling.com/api/v1/service/${serviceId}`;

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

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = getAuthToken();

        const response = await fetch(apiUrl, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        const docs = data?.data?.documents || data?.documents || [];
        setDocuments(docs);
      } catch (err) {
        setError(err.message || "Failed to load documents.");
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) fetchDocuments();
  }, [serviceId]);

  return (
    <div className="max-w-4xl mx-auto bg-white mt-20 rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-3">Uploaded Documents</h2>

      {loading && <p className="text-gray-600">Loading documents...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && documents.length === 0 && (
        <p className="text-gray-600">No documents uploaded yet.</p>
      )}

      {!loading && documents.length > 0 && (
        <ul className="divide-y divide-gray-200">
          {documents.map((doc, index) => (
            <li key={index} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">{doc.name || doc.document_name}</p>
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
  );
}
