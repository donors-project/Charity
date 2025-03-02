import React, { useState } from "react";

export default function Contact() {
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("success");
    // هنا يمكنك إرسال بيانات النموذج إلى الخادم/قاعدة البيانات
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white flex flex-col">
     
      {/* قسم الاتصال (النموذج والمعلومات الجانبية) */}
      <div className="max-w-6xl w-full mx-auto px-6 mt-20 mb-20">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* القسم الأيسر: النموذج (3 أعمدة) */}
            <div className="p-8 md:p-10 col-span-3 border-b md:border-b-0 md:border-r border-gray-200">
              <h2 className="text-2xl font-bold mb-8 text-[#AAB99A]">
                أرسل لنا رسالة
              </h2>

              {formStatus === "success" ? (
                <div className="bg-[#D0DDD0] border border-[#D0DDD0] rounded-lg p-6 text-center">
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-[#AAB99A]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3 className="text-xl font-medium mb-2 text-[#AAB99A]">
                    شكراً لك!
                  </h3>
                  <p className="text-[#AAB99A]">
                    تم استلام رسالتك. سنعاود الاتصال بك قريباً.
                  </p>
                  <button
                    onClick={() => setFormStatus(null)}
                    className="mt-4 px-4 py-2 rounded-md font-medium text-white bg-[#AAB99A] hover:bg-[#D0DDD0]"
                  >
                    إرسال رسالة أخرى
                  </button>
                </div>
              ) : (
                <form className="space-y-5 mt-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#AAB99A]">
                        الاسم الأول
                      </label>
                      <input
                        type="text"
                        className="block w-full px-4 py-3 rounded-md border border-[#D0DDD0] focus:outline-none focus:ring-2 focus:ring-[#AAB99A]"
                        placeholder="اسمك الأول"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#AAB99A]">
                        الاسم الأخير
                      </label>
                      <input
                        type="text"
                        className="block w-full px-4 py-3 rounded-md border border-[#D0DDD0] focus:outline-none focus:ring-2 focus:ring-[#AAB99A]"
                        placeholder="اسمك الأخير"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-[#AAB99A]">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      className="block w-full px-4 py-3 rounded-md border border-[#D0DDD0] focus:outline-none focus:ring-2 focus:ring-[#AAB99A]"
                      placeholder="بريدك الإلكتروني"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-[#AAB99A]">
                      كيف تود المساعدة؟
                    </label>
                    <select className="block w-full px-4 py-3 rounded-md border border-[#D0DDD0] focus:outline-none focus:ring-2 focus:ring-[#AAB99A]">
                      <option value="">اختر خياراً</option>
                      <option value="donate">التبرع</option>
                      <option value="volunteer">تطوع</option>
                      <option value="fundraise">
                        تنظيم حملة لجمع التبرعات
                      </option>
                      <option value="partner">أصبح شريكاً</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-[#AAB99A]">
                      الرسالة
                    </label>
                    <textarea
                      rows="4"
                      className="block w-full px-4 py-3 rounded-md border border-[#D0DDD0] focus:outline-none focus:ring-2 focus:ring-[#AAB99A]"
                      placeholder="أخبرنا كيف تود المشاركة..."
                      required
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-md text-white font-medium bg-[#AAB99A] hover:bg-[#D0DDD0] focus:outline-none focus:ring-2 focus:ring-[#AAB99A]"
                    >
                      إرسال رسالتك
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* القسم الأيمن: معلومات التواصل وتأثير المساهمات (عمودان) */}
            <div className="col-span-2 p-8 md:p-10 bg-gray-50">
              <h3 className="text-xl font-bold mb-6 text-[#AAB99A]">
                كيف تساعد مساهمتك؟
              </h3>

              <div className="space-y-6">
                {/* إحصائيات التأثير */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full mr-4 bg-[#D0DDD0]">
                      <svg
                        className="w-6 h-6 text-[#AAB99A]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#AAB99A]">5,000+</h4>
                      <p className="text-sm text-[#AAB99A]">
                        أشخاص يتم مساعدتهم سنوياً
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full mr-4 bg-[#D0DDD0]">
                      <svg
                        className="w-6 h-6 text-[#AAB99A]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#AAB99A]">200+</h4>
                      <p className="text-sm text-[#AAB99A]">متطوعين نشطين</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full mr-4 bg-[#D0DDD0]">
                      <svg
                        className="w-6 h-6 text-[#AAB99A]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#AAB99A]">15</h4>
                      <p className="text-sm text-[#AAB99A]">مراكز مجتمعية</p>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* معلومات التواصل */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-[#AAB99A]">
                    تواصل معنا
                  </h3>
                  <div className="space-y-3 text-[#AAB99A]">
                    <div className="flex items-start">
                      <svg
                        className="w-5 h-5 mt-1 ml-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        ></path>
                      </svg>
                      <span>(123) 456-7890</span>
                    </div>

                    <div className="flex items-start">
                      <svg
                        className="w-5 h-5 mt-1 ml-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <span>contact@yourcharity.org</span>
                    </div>

                    <div className="flex items-start">
                      <svg
                        className="w-5 h-5 mt-1 ml-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      <span>
                        شارع الجمعية 123
                        <br />
                        اسم المدينة، الرمز 12345
                      </span>
                    </div>
                  </div>
                </div>

                {/* روابط التواصل الاجتماعي */}
                <div className="pt-4">
                  <div className="flex space-x-4 justify-end">
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-[#AAB99A] hover:bg-[#D0DDD0] transition-colors duration-300"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.515c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-[#AAB99A] hover:bg-[#D0DDD0] transition-colors duration-300"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105 13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-[#AAB99A] hover:bg-[#D0DDD0] transition-colors duration-300"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C8.74 0 8.333.015 7.053.072c-1.278.06-2.148.262-2.913.558-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14c-.297.765-.499 1.636-.558 2.913C.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.262 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.078 2.126 1.384.765.297 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.012 4.947-.072c1.277-.06 2.148-.261 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.336 1.384-2.126.297-.765.499-1.636.558-2.913C23.988 15.667 24 15.26 24 12s-.012-3.667-.072-4.947c-.06-1.277-.261-2.148-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319.935 20.65.63 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.015 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.422.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zm0 10.107a3.945 3.945 0 110-7.89 3.945 3.945 0 010 7.89zm7.846-10.405a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
