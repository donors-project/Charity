import React, { useState, useEffect } from "react";
import axios from "axios";

const TopDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donorRes = await axios.get("http://localhost:5000/api/top/donors");

        // Filter donors with total_donated > 0
        const filteredDonors = donorRes.data.filter(donor => donor.total_donated > 0);

        setDonors(filteredDonors);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("فشل في تحميل البيانات. يرجى المحاولة لاحقًا.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center py-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#727D73] mx-auto mb-4"></div>
        <p className="text-lg text-[#727D73]">جاري التحميل...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center py-6 text-red-600 bg-red-50 p-6 rounded-lg shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-lg font-medium">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      {/* Header with decorative elements */}
      <div className="mb-6 bg-gradient-to-r from-[#AAB99A] to-[#727D73] py-12 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-4xl font-bold text-white mb-3">قائمة أبرز المحسنين</h1>
          <p className="text-white text-lg opacity-90">قائمة الجهات والأفراد الذين تبرعوا في مختلف مجالات الخير والعطاء.</p>
        </div>
        
        {/* Decorative patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 -mt-8">
        
        {/* Donors Cards Grid */}
        {donors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {donors.map((donor, index) => (
              <div
                key={donor.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="bg-gradient-to-r from-[#f5f7f5] to-white p-4 flex justify-between items-center">
                  <div className="text-lg font-bold text-[#727D73]">
                    {donor.User?.full_name || "غير معروف"}
                  </div>
                  <div className="w-10 h-10 bg-[#AAB99A] flex items-center justify-center rounded-full text-white font-bold shadow-md">
                    {index + 1}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col items-center">
                  <div className="text-4xl font-bold text-center mb-2 text-gray-800">
                    {(donor.total_donated || 0).toLocaleString()}
                  </div>
                  <div className="text-[#AAB99A] font-semibold bg-[#f5f7f5] px-4 py-1 rounded-full">
                    دينار أردني
                  </div>
                </div>
                
                {/* Add trophy icon for top 3 donors */}
                {index < 3 && (
                  <div className="absolute top-0 left-0 bg-yellow-500 text-white p-1 rounded-br-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-xl text-gray-600">لا يوجد محسنين حاليًا</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TopDonors;
