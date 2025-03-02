import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerBeneficiary, resetState } from "../../redux/beneficiarySlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function RegisterBeneficiary() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.beneficiary);

  const [formData, setFormData] = useState({
    total_debt: "",
    reason: "",
    category: "",
    identity_image: null, // File object
  });

  const categories = [
    "فك كربة السجناء",
    "مساعدة المرضى",
    "سداد ديون الأسر المحتاجة",
    "سداد ديون التعليم",
  ];

  // Handle text input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, identity_image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("total_debt", formData.total_debt);
    formDataToSend.append("reason", formData.reason);
    formDataToSend.append("category", formData.category);
    if (formData.identity_image) {
      formDataToSend.append("identity_image", formData.identity_image);
    }

    dispatch(registerBeneficiary(formDataToSend));
  };

  // Handle success message & navigation
  if (success) {
    Swal.fire({
      title: "تم التسجيل بنجاح!",
      text: "تم تسجيل المستفيد بنجاح.",
      icon: "success",
      confirmButtonColor: "#AAB99A",
      confirmButtonText: "حسناً",
    }).then(() => {
      dispatch(resetState()); // Reset Redux state
      navigate("/"); // Redirect to home
    });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F0F0D7]">
      <div className="w-full max-w-lg rounded-lg p-8 shadow-xl bg-[#D0DDD0]">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#727D73]">
          تسجيل مستفيد جديد
        </h2>

        {error && (
          <div className="mb-6 p-3 rounded-md text-center bg-red-100 text-red-600">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
          {/* إجمالي الدين */}
          <div className="space-y-2">
            <label className="block text-right font-medium text-[#727D73]">
              إجمالي الدين
            </label>
            <input
              type="number"
              name="total_debt"
              value={formData.total_debt}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#AAB99A] bg-white"
              placeholder="أدخل مبلغ الدين"
            />
          </div>

          {/* سبب الدين */}
          <div className="space-y-2">
            <label className="block text-right font-medium text-[#727D73]">
              سبب الدين
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#AAB99A] bg-white min-h-32"
              placeholder="أدخل تفاصيل سبب الدين"
            ></textarea>
          </div>

          {/* الفئة */}
          <div className="space-y-2">
            <label className="block text-right font-medium text-[#727D73]">
              الفئة
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#AAB99A] bg-white"
            >
              <option value="">اختر الفئة</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* تحميل صورة الهوية */}
          <div className="space-y-2">
            <label className="block text-right font-medium text-[#727D73]">
              صورة الهوية
            </label>
            <div className="relative border-2 border-dashed rounded-md p-6 text-center border-[#AAB99A] bg-white">
              <input
                type="file"
                name="identity_image"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <p className="text-[#727D73]">
                {formData.identity_image
                  ? formData.identity_image.name
                  : "انقر لتحميل صورة الهوية أو اسحب الملف هنا"}
              </p>
            </div>
          </div>

          {/* زر التسجيل */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-md mt-8 text-white font-medium transition-all duration-200"
            style={{
              backgroundColor: loading ? "#727D73" : "#AAB99A",
            }}
          >
            {loading ? "جاري التسجيل..." : "تسجيل المستفيد"}
          </button>
        </form>
      </div>
    </div>
  );
}
