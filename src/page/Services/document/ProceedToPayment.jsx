
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const ProceedToPayment = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { state } = useLocation();

//   const {
//     serviceData = {},
//     company = {},
//     pricing = {},
//     paymentType = "full",
//     partialPercent = "100",
//     payableAmount = 0,
//   } = state || {};

//   const user = JSON.parse(localStorage.getItem("user")) || {};
//   console.log(user.id);
  

//   const API_BASE = "https://auditfiling.com/api/v1/services/payment";

//   // ✅ Load Razorpay SDK
//   useEffect(() => {
//     const loadRazorpay = async () => {
//       if (window.Razorpay) return;
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.async = true;
//       document.body.appendChild(script);
//       await new Promise((resolve, reject) => {
//         script.onload = resolve;
//         script.onerror = reject;
//       });
//       console.log("✅ Razorpay SDK loaded");
//     };
//     loadRazorpay().catch((err) => console.error("SDK load failed:", err));
//   }, []);

//   // ✅ Initiate Payment
//   const handlePayment = async () => {
//     if (!user?.id || !serviceData?.id) {
//       alert("Missing user or service data");
//       return;
//     }

//     try {
//       setLoading(true);
//       console.log("Initiating payment...");

//       const response = await axios.post(`http://192.168.1.19:8000/api/v1/services/payment/initiate`, {
//         user_id: String(user.id),
//         service_id: String(serviceData.id),
//         coupon_code: null,
//         amount: String(pricing.amount || payableAmount),
//         total_amount: String(payableAmount),
//         percent: String(partialPercent || "100"),
//         company_id: company?.id ? String(company.id) : null,
//         payment_type: paymentType,
//       });

//       console.log("Initiate Response:", response.data);

//       const order = response.data?.data;
//       if (!order || !order.order_id) {
//         alert("❌ Failed to create Razorpay order");
//         return;
//       }

//       openRazorpay(order);
//     } catch (error) {
//       console.error("Payment initiate error:", error);
//       alert("Error initiating payment. Check console for details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Open Razorpay Checkout
//   const openRazorpay = (order) => {
//     if (!window.Razorpay) {
//       alert("Razorpay SDK not loaded. Please refresh the page and try again.");
//       return;
//     }

//     console.log("Opening Razorpay popup...");

//     const options = {
//       key: order.razorpay_key || "rzp_test_xxxxxx", // ✅ backend sends razorpay_key
//       amount: parseFloat(order.amount) * 100, // Razorpay expects paise
//       currency: order.currency || "INR",
//       name: "AuditFiling",
//       description: order.service_name || "Service Payment",
//       order_id: order.order_id, // ✅ correct field name
//       handler: async function (response) {
//         console.log("Payment Success Response:", response);
//         await verifyPayment(response, order);
//       },
//       prefill: {
//         name: order.user_name || user?.name || "User",
//         email: order.user_email || user?.email || "user@example.com",
//         contact: user?.phone || "9999999999",
//       },
//       theme: {
//         color: "#1e3a8a",
//       },
//     };

//     try {
//       const razor = new window.Razorpay(options);
//       razor.open();

//       razor.on("payment.failed", function (response) {
//         console.error("Payment failed:", response.error);
//         alert("❌ Payment failed: " + response.error.description);
//       });
//     } catch (err) {
//       console.error("Error creating Razorpay instance:", err);
//       alert("Error opening Razorpay. Please refresh and try again.");
//     }
//   };

//   // ✅ Verify Payment
//   const verifyPayment = async (response, order) => {
//     try {
//       const verifyRes = await axios.post(`http://192.168.1.19:8000/api/v1/services/payment/verify`, {
//         razorpay_order_id: order.order_id, // ✅ corrected key
//         razorpay_payment_id: response.razorpay_payment_id,
//         razorpay_signature: response.razorpay_signature,
//         user_id:user.id

//       });

//       console.log("Verification Response:", verifyRes.data);

//       if (verifyRes.data?.success) {
//         navigate("/payment-success", {
//           replace: true,
//           state: {
//             paymentDetails: {
//               razorpay_order_id: order.order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               amount: order.amount,
//             },
//           },
//         });
//       } else {
//         alert("❌ Payment verification failed.");
//       }
//     } catch (error) {
//       console.error("Verification error:", error);
//       alert("Error verifying payment.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
//       <h1 className="text-3xl font-semibold mb-4 text-gray-900">
//         Proceed to Payment
//       </h1>
//       <p className="text-lg mb-8 text-gray-600">
//         Pay securely for your {serviceData?.service_name || "selected service"}
//       </p>
//       <button
//         onClick={handlePayment}
//         disabled={loading}
//         className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 disabled:opacity-50"
//       >
//         {loading ? "Processing..." : `Pay ₹${payableAmount || 0}`}
//       </button>
//     </div>
//   );
// };

// export default ProceedToPayment;
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ProceedToPayment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    serviceData = {},
    company = {},
    pricing = {},
    paymentType = "full",
    partialPercent = "100",
    payableAmount = 0,
  } = state || {};

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const API_BASE = "https://auditfiling.com/api/v1/services/payment";

  // ✅ Load Razorpay SDK & trigger payment immediately
  useEffect(() => {
    const loadAndPay = async () => {
      try {
        // Load Razorpay script
        if (!window.Razorpay) {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.async = true;
          document.body.appendChild(script);
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
          });
        }

        // Initiate payment
        const response = await axios.post(`http://192.168.1.19:8000/api/v1/services/payment/initiate`, {
          user_id: String(user.id),
          service_id: String(serviceData.id),
          coupon_code: null,
          amount: String(pricing.amount || payableAmount),
          total_amount: String(payableAmount),
          percent: String(partialPercent || "100"),
          company_id: company?.id ? String(company.id) : null,
          payment_type: paymentType,
        });

        console.log("Initiate Response:", response.data);

        const order = response.data?.data;
        if (!order || !order.order_id) {
          alert("❌ Failed to create Razorpay order");
          return;
        }

        // Open Razorpay directly
        const options = {
          key: order.razorpay_key || "rzp_test_xxxxxx",
          amount: parseFloat(order.amount) * 100,
          currency: order.currency || "INR",
          name: "AuditFiling",
          description: order.service_name || "Service Payment",
          order_id: order.order_id,
          handler: async function (response) {
            console.log("Payment Success Response:", response);
            await verifyPayment(response, order);
          },
          prefill: {
            name: order.user_name || user?.name || "User",
            email: order.user_email || user?.email || "user@example.com",
            contact: user?.phone || "9999999999",
          },
          theme: {
            color: "#1e3a8a",
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();

        razor.on("payment.failed", function (response) {
          console.error("Payment failed:", response.error);
          alert("❌ Payment failed: " + response.error.description);
        });
      } catch (err) {
        console.error("Error during payment process:", err);
        alert("Something went wrong. Please try again.");
      }
    };

    loadAndPay();
  }, []); // run only once

  // ✅ Verify Payment
  const verifyPayment = async (response, order) => {
    try {
      const verifyRes = await axios.post(`http://192.168.1.19:8000/api/v1/services/payment/verify`, {
        razorpay_order_id: order.order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        user_id:user.id
      });

      console.log("Verification Response:", verifyRes.data);

      if (verifyRes.data?.success) {
        navigate("/payment-success", {
          replace: true,
          state: {
            paymentDetails: {
              razorpay_order_id: order.order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              amount: order.amount,
            },
          },
        });
      } else {
        alert("❌ Payment verification failed.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert("Error verifying payment.");
    }
  };

  // 🔇 Nothing is rendered — Razorpay opens automatically
  return null;
};

export default ProceedToPayment;
