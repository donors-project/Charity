import React, { useState, useEffect } from 'react';

const SweetAlert = ({ onClose }) => {
  useEffect(() => {
    // Auto close after 3 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
      <div className="bg-white rounded-lg max-w-md w-full mx-4 overflow-hidden shadow-xl transform transition-all">
        <div className="p-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#D0DDD0] mb-4">
            <svg className="h-10 w-10 text-[#727D73]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-center text-lg leading-6 font-medium text-gray-900">تم تحديث الملف الشخصي!</h3>
          <div className="mt-3">
            <p className="text-center text-sm text-gray-500">
              تم تحديث معلومات ملفك الشخصي بنجاح.
            </p>
          </div>
          <div className="mt-5">
            <button 
              type="button" 
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#727D73] text-base font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#AAB99A] transition-all duration-300"
            >
              حسناً
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DonorProfile = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  
  // Function to handle the save button click and show sweet alert
  const handleSaveChanges = () => {
    // In a real implementation, you would normally save the data first
    // Then show the success message
    setShowAlert(true);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl" dir="rtl">
      {showAlert && <SweetAlert onClose={() => setShowAlert(false)} />}
      
      <h1 className="text-3xl font-bold text-gray-800 mb-8">المتبرع</h1>
      
      {/* Profile Information Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 transition-all duration-300 hover:shadow-xl">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden mb-4 transition-transform duration-500 hover:scale-105 group">
              <img 
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMMAAACUCAMAAAAZKm3XAAAAMFBMVEXk5ueutLenrrHn6eqqsbTh4+TCx8nd4OHq7O20ubzIzM64vcC/xMbP09TZ3N3U19mupoR+AAAEqUlEQVR4nO2c27qjIAxGxYCc4f3fdsA6uyfbCkSD/bpuZvZd/oYEDAnD8OPHjx8/flAAQG1BA5CslzJIKYWY/zgbADKaydkLzk0+inPJUNI4zRhPMLb8q7U1Qp1EBqhoZ9NX0PEMzoDB8/GFgsTIPLWFnwDh9RsFswrtRce+AHi9im5V2Eht6UtAGLZBQopxZjp1BYQtTliwskcREPR2CckVoUMRsUBBZvTdifAf0tEJRJRL6E0E+MKFtNDRfge+SsF89KC2fSFlpEoN/aRY4epWUoI7auMXTEU8/2c01NZnINQryJ7oYq8rOGGsadD0GqBmZ7ilg10CmryQ0dQSlGnWwAyxI0S7BKYlqQQw7RKoHSGqd+gbuBWEEqoPSg+QHpsmhHBIjpjoFIBs29/+sHRRjbWUSA8cCJvDDOHJT9Yfuu/hlkxD/bfPE1TZFQKSG9JiCkQaqooZLzRQVQcEVkjnHYIqMWGFdMISaRBIO1yG6msO5cC3wKk04ElgI5UGvKX0HRpoJPw0PGr4xXS9hm/IrV+wx33FWQOnIpChO/NV3sKtaSC7mYt43w9U30CNtyd3kFX6vqEmgFab4XS1mdqr9SdGuoYmkBZHA2GtEmuX4xNh8R6r4Ep6rYh0h0J6mQUTggbqS0V5/jvFQbl2DY76kh3az0yUN4ozqqVrJsOpr9gzJS2ha3QgAUqbQh/c0EU7XNPn3Eh4rXtLww0vp86r/2noSdRddJFl6jtP6Puv/oDKj6Ee0uqVml2ij57KK1AuYiSrKb2kdDn15oWZMhG8o3C+AnH7qYP3k1TvAeG2zjS5XnrVnwDwW7Zsrn3P04ogP46Xjcx064QLMEjzbtaSsykMfUuYEWYcV53BR27IP9o2olRwbGVNTeEss8cZUCD9ZK1esNb5AIrarGLmWfwQYghBijPO4mcFCXXh8ge1SdvJhoNIv783xkwX0v98jEEOsxxqC9+SrB9k9C6FwWpizYEx+ZCVUJu6DuQoZiP/tFHnBxKcCZ29u5GMEdI49mJXWN8pRj2F/O4GtfEZSGvfT/rz77+ig6WEK8llwBCM09t//2cZ1kRJuaxAeKfLHXAvg+skg8gZoKLT274XPslg2lKcxpMCxO6lzPFPPXiG1quxwPl0YN1yw2MmdSrS19ExgQEi2j0U/Kk4gOgaM9F7FXb3uAC5sXTRgN33VkXFne2/4PZLtNA47r2d/WbN4p6B8CBily6U/DDRgXCL7wpA63vbKkJjF5VL6sFYItiEWgdJ+ehoCVkFZn7CeDSgSoRFO3rU3hhiiMDatA9NSI8icGrkhBKQPIHWw1otol1CW1cMhgjXmGIBo1+PWATmyE89bTv2wQeMFzRdBJOmpCsNTbwNfUnI1M8WNLyVhk7trA15Wr3Ca2fPqA2/pe7FL4U3/YZB3UDpXoWwOrgp3+lURwF9obhKAJLa5CeKHaFQhjNQ0aWOEEgTV5gUpia016EQKX5jtLuIZsVHP6zhPVTKpj3gmPp2IYVFWLJqzFuKjuA9nVhvKCrpdxkOZRP7iA+NoVIUEHgPBaBStEP0GdIpqLf7AfHhDGQK1pIdO6UguYpOu4HXzfoHxL5DQ+GSU6IAAAAASUVORK5CYII=" 
                alt="الصورة الشخصية" 
                className="w-full h-full object-cover transition-all duration-500 group-hover:saturate-150"
              />
            </div>
        
          </div>
          
          {/* Profile Details */}
          <div className="flex-1 w-full">
            <h2 className="text-2xl font-semibold mb-6">المعلومات الشخصية</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">الاسم الكامل</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-[#AAB99A] rounded-md focus:ring-2 focus:ring-[#727D73] focus:border-[#727D73] transition-all duration-300"
                  defaultValue="ali mohmmad"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  className="w-full p-3 border border-[#AAB99A] rounded-md focus:ring-2 focus:ring-[#727D73] focus:border-[#727D73] transition-all duration-300"
                  defaultValue="ali@example.com"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">كلمة المرور الحالية</label>
                <input 
                  type="password" 
                  className="w-full p-3 border border-[#AAB99A] rounded-md focus:ring-2 focus:ring-[#727D73] focus:border-[#727D73] transition-all duration-300"
                  placeholder="أدخل كلمة المرور الحالية"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">كلمة المرور الجديدة</label>
                <input 
                  type="password" 
                  className="w-full p-3 border border-[#AAB99A] rounded-md focus:ring-2 focus:ring-[#727D73] focus:border-[#727D73] transition-all duration-300"
                  placeholder="أدخل كلمة المرور الجديدة"
                />
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleSaveChanges}
                className="bg-[#727D73] text-white px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 relative overflow-hidden"
              >
                <span className="relative z-10">حفظ التغييرات</span>
                <span className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modern Animated Financial Card Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#727D73] mb-4 relative overflow-hidden">
          ملخص التبرعات
          <span className="absolute bottom-0 right-0 w-24 h-1 bg-[#AAB99A] transform transition-all duration-500 ease-in-out origin-right scale-x-100"></span>
        </h2>
        
        {/* Modern Card with Animations */}
        <div 
          className="bg-gradient-to-br from-[#D0DDD0] to-[#AAB99A] rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 hover:shadow-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className={`relative p-8 transition-all duration-500 ${isExpanded ? "pb-32" : "pb-8"}`}>
            {/* Card Content */}
            <div className={`transition-all duration-500 ${isHovered ? "transform -translate-y-2" : ""}`}>
              {/* Card Header */}
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-[#727D73]">قرض تعليمي</h3>
                <div className="flex items-center justify-center h-12 w-12 bg-white bg-opacity-30 backdrop-blur-md rounded-xl transform transition-transform duration-300 hover:rotate-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#727D73]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-[#727D73] mb-8 transition-all duration-500 ease-in-out">
                قرض طلابي للدراسات العليا في جامعة التكنولوجيا. يغطي التمويل الرسوم الدراسية والكتب ونفقات المعيشة لبرنامج مدته عامين.
              </p>
              
              {/* Financial Information */}
              <div className="grid grid-cols-2 gap-6">
                <div className={`transition-all duration-500 ease-in-out ${isHovered ? "transform -translate-y-1" : ""}`}>
                  <h4 className="text-sm uppercase tracking-wider text-[#727D73] opacity-70 mb-1">تبرعت ب:</h4>
                  <div className="text-2xl font-bold text-[#727D73]">$1,500</div>
                  <div className="mt-2 relative h-2 bg-white bg-opacity-30 rounded-full overflow-hidden">
                    <div className="absolute top-0 right-0 h-full bg-[#727D73] rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  <div className="text-xs text-[#727D73] mt-1">نسبة المساهمة 50%</div>
                </div>
                
                <div className={`transition-all duration-500 ease-in-out ${isHovered ? "transform -translate-y-1 delay-100" : ""}`}>
                  <h4 className="text-sm uppercase tracking-wider text-[#727D73] opacity-70 mb-1">المبلغ الإجمالي</h4>
                  <div className="text-2xl font-bold text-[#727D73]">$3,000</div>
                  <div className="flex items-center mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#727D73] ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs text-[#727D73]">البداية: سبتمبر 2023</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Expandable Content */}
            <div 
              className={`absolute left-0 right-0 px-8 transition-all duration-500 ease-in-out overflow-hidden ${
                isExpanded ? "opacity-100 max-h-96 translate-y-0" : "opacity-0 max-h-0 translate-y-10"
              }`}
              style={{ top: '16rem' }}
            >
              
            </div>
          </div>
          
          {/* Card Footer */}
          <div className="px-8 py-4 bg-[#727D73] bg-opacity-10 backdrop-blur-sm flex justify-between items-center">
            <div className="text-sm text-[#727D73] font-medium">
              <span className={`inline-block transition-transform duration-300 ml-1 ${isExpanded ? "rotate-180" : ""}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
              {isExpanded ? "إخفاء التفاصيل" : "عرض التفاصيل"}
            </div>
    
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;