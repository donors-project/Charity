import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDonationAmount } from "../../redux/donationSlice";

const SinglePage = () => {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [donationFor, setDonationFor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const getIdFromUrl = () => {
    const path = window.location.pathname;
    const pathSegments = path.split("/");
    return pathSegments[pathSegments.length - 1];
  };

  const cardId = params?.id || getIdFromUrl();

  const handleDonation = () => {
    if (!amount) {
      alert("يرجى إدخال مبلغ التبرع");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      dispatch(setDonationAmount(amount));
      navigate(`/payment`, {
        state: {
          id: cardId,
          amount: amount,
          donationFor: donationFor
        },
      });
      setIsSubmitting(false);
    }, 800);
  };

  const handleAmountClick = (value) => {
    setAmount(value);
    setSelectedAmount(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching data for ID:", cardId);

        const response = await axios.get("http://localhost:5000/api/BFY");

        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Invalid data format");
        }

        console.log("API Response:", response.data);

        const foundCard = response.data.find(
          (card) =>
            String(card.id) === String(cardId) ||
            card._id === cardId ||
            card.id === parseInt(cardId)
        );

        console.log("Found card:", foundCard);

        if (!foundCard) {
          setError("البطاقة غير موجودة");
        } else {
          setCardData(foundCard);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("فشل في تحميل البيانات. الرجاء المحاولة مرة أخرى.");
        setLoading(false);
      }
    };

    if (cardId) {
      fetchData();
    } else {
      setError("معرف البطاقة غير موجود");
      setLoading(false);
    }
  }, [cardId]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#8da474] mx-auto mb-4"></div>
        <p className="text-xl font-medium text-gray-600">جاري التحميل...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center bg-red-50 p-8 rounded-lg shadow-md max-w-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-xl font-medium text-red-700 mb-2">خطأ</p>
        <p className="text-gray-600">{error}</p>
      </div>
    </div>
  );
  
  if (!cardData) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center bg-gray-50 p-8 rounded-lg shadow-md max-w-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xl font-medium text-gray-700 mb-2">لم يتم العثور على البطاقة</p>
        <p className="text-gray-500">يرجى التحقق من الرابط والمحاولة مرة أخرى</p>
      </div>
    </div>
  );

  // Calculate progress percentage
  const collectedAmount = cardData.remaining_debt || 0;
  const totalAmount = cardData.total_debt || 0;
  const remainingAmount = totalAmount - collectedAmount;
  const progressPercentage = Math.round((collectedAmount / totalAmount) * 100);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card Details Section */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden" dir="rtl">
              {/* Header with decorative elements */}
              <div className="bg-gradient-to-br from-[#8da474] to-[#AAB99A] p-6 relative">
                <div className="absolute top-0 right-0 w-full h-full opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,0 L100,0 L100,100 Z" fill="white" />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4 relative z-10">تفاصيل الحالة</h2>
                
                {/* Case Info Card */}
                <div className="bg-white rounded-lg p-6 shadow-md relative z-10">
                  <p className="text-lg font-medium text-gray-800 text-center leading-relaxed">
                    محتاجة    أرملة، بحاجة إلى مسكن يمنحها الاستقرار، تبقى على توفيره لها {cardData.total_debt} دينار
                  </p>
                </div>
              </div>
              
              {/* Progress Section */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500">المبلغ المتبقي: {remainingAmount} دينار</span>
                  <span className="text-sm font-medium text-[#8da474]">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-[#8da474] to-[#AAB99A] h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-gray-700">الهدف: {totalAmount} دينار</span>
                  <span className="font-semibold text-gray-700">تم جمع: {collectedAmount} دينار</span>
                </div>
              </div>
              
              {/* Case Information */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700">{cardData.id}</span>
                  <span className="font-semibold text-gray-800">:رقم الحالة</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-[#8da474] font-bold mb-2">سبب الدين</p>
                    <p className="font-medium text-gray-800">{cardData.reason}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-[#8da474] font-bold mb-2">نوع المستفيد</p>
                    <p className="font-medium text-gray-800">المواطنون</p>
                  </div>
                </div>
              </div>
              
              {/* Statistics */}
              <div className="grid grid-cols-3 gap-px bg-gray-200">
                <div className="bg-white p-5 text-center">
                  <p className="text-[#8da474] font-bold mb-2">تم جمع</p>
                  <p className="text-xl font-bold">{collectedAmount} <span className="text-sm">دينار</span></p>
                </div>
                <div className="bg-white p-5 text-center">
                  <p className="text-[#8da474] font-bold mb-2">المبلغ المتبقي</p>
                  <p className="text-xl font-bold">{remainingAmount} <span className="text-sm">دينار</span></p>
                </div>
                <div className="bg-white p-5 text-center">
                  <p className="text-[#8da474] font-bold mb-2">عدد المستفيدين</p>
                  <p className="text-xl font-bold">0 <span className="text-sm">مستفيد</span></p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Donation Form Section */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-xl shadow-lg p-8" dir="rtl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">تبرع الآن</h2>
              
              <div className="space-y-6">
                {/* Suggested Amounts */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">اختر مبلغ التبرع</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[100, 50, 10].map((value) => (
                      <button
                        key={value}
                        onClick={() => handleAmountClick(value.toString())}
                        className={`py-3 px-4 border-2 rounded-lg text-center transition-colors duration-200 ${
                          selectedAmount === value.toString()
                            ? "border-[#8da474] bg-[#8da474] bg-opacity-10 text-[#69844c]"
                            : "border-gray-200 hover:border-[#8da474] hover:bg-[#8da474] hover:bg-opacity-5 text-gray-700"
                        }`}
                      >
                        <span className="text-lg font-medium">{value} دينار</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Custom Amount */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">أو أدخل مبلغ آخر</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                        setSelectedAmount(null);
                      }}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg text-right pr-24 focus:outline-none focus:ring-2 focus:ring-[#8da474] focus:border-transparent text-lg transition-all duration-200"
                      placeholder="أدخل المبلغ..."
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <span className="text-gray-500 font-medium">دينار</span>
                    </div>
                  </div>
                </div>
                
               
                
            {/* Submit Button */}
            <button
              onClick={handleDonation}
              disabled={isSubmitting}
              className={`w-full py-4 px-6 mt-4 bg-gradient-to-r from-[#8da474] to-[#69844c] text-white text-lg font-bold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "جارٍ التبرع..." : "تبرع الآن"}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default SinglePage;
