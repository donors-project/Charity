import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerDonor, resetState } from "../../redux/donorSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function RegisterDonor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.donor);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    address: "",
    phone: "",
    image: null,
  });

  // Handle text input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password match
    if (formData.password !== formData.confirm_password) {
      Swal.fire({
        title: "خطأ!",
        text: "كلمات المرور غير متطابقة.",
        icon: "error",
        confirmButtonColor: "#AAB99A",
      });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("full_name", formData.full_name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("phone", formData.phone);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    dispatch(registerDonor(formDataToSend));
  };

  // Handle success message & navigation
  if (success) {
    Swal.fire({
      title: "تم التسجيل بنجاح!",
      text: "تم إنشاء الحساب بنجاح، يمكنك الآن تسجيل الدخول.",
      icon: "success",
      confirmButtonColor: "#AAB99A",
      confirmButtonText: "حسناً",
    }).then(() => {
      dispatch(resetState());
      navigate("/login");
    });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F0F0D7]">
      <div className="w-full max-w-lg rounded-lg p-8 shadow-xl bg-[#D0DDD0]">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#727D73]">
          إنشاء حساب متبرع جديد
        </h2>

        {error && (
          <div className="mb-6 p-3 rounded-md text-center bg-red-100 text-red-600">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
          {/* الاسم الكامل */}
          <div className="space-y-2">
            <label className="block text-right font-medium text-[#727D73]">
              الاسم الكامل
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-[#AAB99A] bg-white"
              placeholder="أدخل اسمك الكامل"
            />
          </div>

          {/* البريد الإلكتروني */}
          <div className="space-y-2">
            <label className="block text-right font-medium text-[#727D73]">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-[#AAB99A] bg-white"
              placeholder="أدخل بريدك الإلكتروني"
            />
          </div>

          {/* كلمة المرور */}
          <div className="space-y-2">
            <label className="block text-right font-medium text-[#727D73]">
              كلمة المرور
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-[#AAB99A] bg-white"
              placeholder="أدخل كلمة المرور"
            />
          </div>

          {/* تأكيد كلمة المرور */}
          <div className="space-y-2">
            <label className="block text-right font-medium text-[#727D73]">
              تأكيد كلمة المرور
            </label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-[#AAB99A] bg-white"
              placeholder="أعد إدخال كلمة المرور"
            />
          </div>

          {/* العنوان */}
          <div className="space-y-2">
            <label className="block text-right font-medium text-[#727D73]">
              العنوان
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-[#AAB99A] bg-white"
              placeholder="أدخل عنوانك"
            />
          </div>

          {/* الهاتف */}
          <div className="space-y-2">
            <label className="block text-right font-medium text-[#727D73]">
              رقم الهاتف
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-[#AAB99A] bg-white"
              placeholder="أدخل رقم هاتفك"
            />
          </div>

          {/* تحميل صورة */}
          <div className="space-y-2">
            <label className="block text-right font-medium text-[#727D73]">
              تحميل صورة
            </label>
            <label
              htmlFor="image-upload"
              className="flex items-center justify-center border-2 border-dashed rounded-md p-6 text-center border-[#AAB99A] bg-white cursor-pointer"
            >
              <span className="text-[#727D73]">
                {formData.image
                  ? formData.image.name
                  : "انقر لتحميل صورة أو اسحب الملف هنا"}
              </span>
              <input
                id="image-upload"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* زر التسجيل */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-md mt-8 text-white font-medium bg-[#AAB99A]"
          >
            {loading ? "جاري التسجيل..." : "إنشاء الحساب"}
          </button>
        </form>
      </div>
    </div>
  );
}
