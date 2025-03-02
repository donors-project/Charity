import React, { useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie for handling cookies

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in HTTP-only cookie
        Cookies.set("token", data.token, { expires: 1 }); // Expires in 1 day

        setMessage("Login successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/"; // Redirect to the dashboard
        }, 1500);
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error logging in.");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side decorative panel */}
      <div className="hidden md:flex md:w-1/2 bg-[#AAB99A] flex-col justify-center items-center">
        <div className="p-12 max-w-md">
          <div className="w-24 h-24 bg-[#727D73] rounded-full mb-8 mx-auto"></div>
          <h1 className="text-4xl font-bold text-[#F0F0D7] mb-6 text-center">مرحباً بعودتك</h1>
          <p className="text-[#F0F0D7] text-lg text-center">
            نحن سعداء برؤيتك مرة أخرى. سجل دخولك للوصول إلى حسابك.
          </p>
        </div>
      </div>

      {/* Right side login form */}
      <div className="w-full md:w-1/2 bg-[#F0F0D7] flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-[#AAB99A]">
            <h2 className="text-3xl font-bold text-[#727D73] mb-8 text-right">
              تسجيل الدخول
            </h2>

            {message && (
              <div className={`mb-6 p-4 rounded-lg text-center ${
                message.includes("successful") 
                  ? "bg-[#D0DDD0]/30 text-[#727D73]" 
                  : "bg-red-100 text-red-600"
              }`}>
                <p>{message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-[#727D73] text-right font-medium">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    dir="rtl"
                    className="w-full px-5 py-4 bg-[#F0F0D7] rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-[#AAB99A]"
                    placeholder="أدخل البريد الإلكتروني"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-[#727D73] text-right font-medium">
                  كلمة المرور
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    dir="rtl"
                    className="w-full px-5 py-4 bg-[#F0F0D7] rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-[#AAB99A]"
                    placeholder="أدخل كلمة المرور"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#727D73] text-white py-4 rounded-lg hover:bg-[#5a645a] transition-all duration-300 font-medium text-lg relative overflow-hidden group"
                >
                  <div className="absolute inset-0 w-3 bg-[#AAB99A] transition-all duration-500 ease-out group-hover:w-full opacity-20"></div>
                  <span className="relative">
                    {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                  </span>
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-[#727D73] text-sm">
                ليس لديك حساب؟{" "}
                <a href="/signup" className="text-[#AAB99A] font-medium hover:underline">
                  إنشاء حساب جديد
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}