import React from 'react';
import { Link } from "react-router-dom";

function OurStory() {
  return (
    // <section className="bg-gradient-to-b from-[#AAB99A] to-[#C5D2B8] py-5">
    //   <div className="container mx-auto px-4 max-w-8xl">
    //     <div className="bg-white rounded-lg shadow-xl overflow-hidden">
    //       <div className="p-8 md:p-12">
    //         <h2 className="text-4xl font-bold text-center text-[#4A5D3F] mb-8 border-b-2 border-[#AAB99A] pb-4">قصتنا</h2>
            
    //         <div className="text-right space-y-6 leading-relaxed text-gray-700 text-lg" dir="rtl">
    //           <p className="text-xl">
    //             في عالم يزداد تعقيدًا، يعاني الكثيرون من أعباء الديون التي قد تقلب حياتهم رأسًا على عقب. هناك من فقد حريته بسبب دين لم يستطع سداده، وهناك من يواجه خطر انقطاع العلاج بسبب فاتورة مستشفى متراكمة، وآخرون يعيشون تحت ضغط الديون التي تثقل كاهلهم يومًا بعد يوم.
    //           </p>
              
    //           <div className="py-4 bg-[#F5F8F2] rounded-lg p-6 border-r-4 border-[#4A5D3F]">
    //             <p className="font-semibold text-[#2C3A24] text-xl mb-2">
    //               من هنا، وُلدت منصتنا برؤية واضحة: <span className="font-bold text-2xl block mt-2">أن نكون جسر الأمل بين القادرين على العطاء والمحتاجين للمساعدة.</span>
    //             </p>
    //           </div>
    //         </div>
            
    //         <div className="mt-12 flex justify-center">
    //           <Link 
    //             to="/Announcements" 
    //             className="bg-[#4A5D3F] text-white font-bold py-3 px-10 rounded-full shadow-lg hover:bg-[#3A4A32] transition duration-300 text-xl flex items-center"
    //           >
    //             <span>ساهم الآن</span>
    //             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    //             </svg>
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
<div className="bg-gray-50 min-h-32 flex items-center justify-between px-12 w-full">
  <div className="flex items-center">
    <img 
      src="https://ehsan.sa/ehsan-ui/images/waqf-home-bg.png" 
      alt="Plant seedling in hand" 
      className="h-50 w-auto mr-25"
    />
  </div>
  
  <div className="text-right flex flex-col items-end ml-10 pr-15">
    <h2 className="text-4xl font-bold text-[#AAB99A] mb-4 ">عطاء يبقى أثره</h2>
    <p className="text-xl text-black mb-6">صدقة جارية يدوم نفعها ويتضاعف أجرها </p>
    <button className="bg-[#AAB99A] hover:bg-[#727D73] text-white font-bold py-2 px-6 rounded-md transition duration-300">
      ساهم بعطائك
    </button>
  </div>
</div>

  );
}

export default OurStory;