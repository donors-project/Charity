import React from "react";
import { useLocation } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const PaymentPage = () => {
  const location = useLocation();
  const { id: debtor_id, amount } = location.state || {};

  // PayPal client ID (replace with your actual PayPal client ID)
  const paypalClientId =
    "AQO_lrXGFsV-gcb9dl11jWIu-BW84qeQbOxa31FnSsbeJj_fpHAMK3sb-c2aJjJSnjuaN4CDAxvT3tL1";

  // PayPal SDK options
  const initialOptions = {
    "client-id": paypalClientId,
    currency: "USD", // Change to your desired currency
    intent: "capture",
  };

  const sendDonationData = async (paymentDetails) => {
    try {
      // Get the token from cookies
      const token = Cookies.get("token");

      if (!token) {
        throw new Error("No authentication token found.");
      }

      const requestBody = {
        debtor_id,
        amount,
        payment_method: "Paypal", // This will be dynamic based on the selected payment method
        payment_status: "Completed",
      };

      const response = await axios.post(
        "http://localhost:5000/api/donations",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "تم التبرع بنجاح!",
        text: "شكراً لدعمك",
        confirmButtonText: "موافق",
        confirmButtonColor: "#727D73",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "فشل التبرع",
        text: "حدث خطأ أثناء إرسال التبرع. يرجى المحاولة مرة أخرى.",
        confirmButtonText: "حسناً",
        confirmButtonColor: "#d33",
      });
    }
  };

  // Handle PayPal payment approval
  const handleApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      sendDonationData(details);
    });
  };

  // Handle Cliq payment approval (replace with actual logic)
  const handleCliqPayment = async () => {
    try {
      // This is a placeholder function. Replace with actual "Cliq" payment logic
      const response = await axios.post(
        "http://localhost:5000/api/cliq-payment",
        {
          debtor_id,
          amount,
        }
      );

      sendDonationData(response.data); // After the payment is processed
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "فشلت عملية الدفع عبر Cliq",
        text: "يرجى المحاولة مرة أخرى",
        confirmButtonText: "حسناً",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div
      className="bg-[#F0F0D7] min-h-screen flex items-center justify-center p-4 font-sans"
      dir="rtl"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-[#727D73] text-white p-6 text-center">
          <h1 className="text-2xl font-bold">صفحة الدفع</h1>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Payment Details */}
          <div className="bg-[#D0DDD0] rounded-lg p-5">
            <h2 className="text-xl font-bold text-[#727D73] mb-3">
              تفاصيل الدفع
            </h2>
            <div className="border-b border-[#AAB99A] py-2 flex justify-between">
              <span className="font-semibold">رقم المستفيد:</span>
              <span>{debtor_id}</span>
            </div>
            <div className="py-2 flex justify-between">
              <span className="font-semibold">المبلغ:</span>
              <span className="text-lg">{amount} دينار</span>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-xl font-bold text-[#727D73] mb-4">
              اختر طريقة الدفع
            </h2>

            {/* PayPal Container */}
            <div className="border-2 border-[#AAB99A] rounded-lg p-5 mb-4">
              <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: amount,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={handleApprove}
                  onError={(err) => {
                    Swal.fire({
                      icon: "error",
                      title: "فشلت عملية الدفع",
                      text: "يرجى المحاولة مرة أخرى",
                      confirmButtonText: "حسناً",
                      confirmButtonColor: "#d33",
                    });
                  }}
                />
              </PayPalScriptProvider>
            </div>

            {/* Cliq Container */}
            <div className="border-2 border-[#AAB99A] rounded-lg p-5">
              <button
                className="w-full py-2 px-4 bg-[#727D73] text-white rounded-lg"
                onClick={handleCliqPayment}
              >
                الدفع عبر Cliq
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#D0DDD0] p-4 text-center text-[#727D73] text-sm">
          <p>جميع المعاملات آمنة ومشفرة</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
