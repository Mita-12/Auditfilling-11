import React, { useState } from "react";
import axios from "axios";

const PreviewInvoice = () => {
  const [loading, setLoading] = useState(false);

  const handlePreview = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "https://auditfiling.com/api/v1/user/payment/history",
        { user_id: 105 }
      );

      if (!response.data?.payments?.length) {
        alert("No payment records found!");
        return;
      }

      const invoice = response.data.payments[0];
      let base64Data = invoice.invoice_base64;

      if (!base64Data) {
        alert("Invoice PDF not available!");
        return;
      }

      // Remove prefix if exists
      base64Data = base64Data.replace(/^data:application\/pdf;base64,/, "");

      // Convert Base64 → Blob
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      // Create URL and open in new tab
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, "_blank");

      console.log("✅ PDF opened in a new tab!");
    } catch (error) {
      console.error("❌ Error previewing PDF:", error);
      alert("Failed to preview invoice PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePreview}
      disabled={loading}
      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
    >
      {loading ? "Opening..." : "Preview Invoice PDF"}
    </button>
  );
};

export default PreviewInvoice;