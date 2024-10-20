import React from "react";

const RazorpayButton = ({ amount, cartValues }) => {
  const handlePayment = async () => {
    const email = localStorage.getItem("email"); // Use email from localStorage
    if (!email) {
      alert("Email not found. Please log in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/razorpay-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, cartValues, email }), // Send email with order request
      });

      if (!response.ok) throw new Error("Failed to create order");

      const data = await response.json();

      const options = {
        key: "rzp_test_cpMZ5WyKsUNW88",
        amount: data.amount,
        currency: data.currency,
        name: "HALACHENNAI",
        description: "Order Description",
        image: "poda", 
        order_id: data.id,
        handler: async function (paymentResponse) {
          console.log("Payment Successful:", paymentResponse);

          // Send payment details, email, and cart values to the backend
          try {
            const postPaymentResponse = await fetch("http://localhost:4000/confirm-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                order_id: data.id,
                payment_id: paymentResponse.razorpay_payment_id,
                cartValues,
                email,
                amount:amount // Include email for order confirmation and saving to database
              }),
            });

            if (!postPaymentResponse.ok) throw new Error("Failed to confirm payment");

            const confirmationData = await postPaymentResponse.json();
            console.log("Payment Confirmation:", confirmationData);
            alert("Payment confirmed successfully!");
          } catch (error) {
            console.error("Payment confirmation error:", error);
            alert("Failed to confirm payment. Please try again.");
          }
        },
        prefill: {
          name: "Customer Name", // Optionally prefill using stored data
          email: email,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <button onClick={handlePayment} className="razorpay-button">
      PROCEED TO CHECKOUT
    </button>
  );
};

export default RazorpayButton;


