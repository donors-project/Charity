import React, { useState, useEffect } from "react";
import axios from "axios";


const TopDonors = () => {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/top/donor");

                setDonors(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("فشل في تحميل البيانات. يرجى المحاولة لاحقًا.");
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="text-center py-6">جاري التحميل...</div>;
    if (error) return <div className="text-center py-6 text-red-600">{error}</div>;

    return (
        <div className="min-h-screen mb-20 bg-white font-sans" dir="rtl">

            {/* Main Content */}
            <main className="max-w-6xl mx-auto p-4 pt-15">
                {/* Title Section */}
                <div className="text-right mb-8">
                    <h1 className="text-3xl font-bold text-[#727D73] mb-2">قائمة ابرز المحسنين</h1>
                    <p className="text-black">قائمة الجهات والأفراد الذين تبرعوا في مختلف مجالات الخير والعطاء.</p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="البحث في القائمة"
                            className="w-full border rounded-md p-3 pr-10"
                        />
                        <div className="absolute left-3 top-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Donors List */}
                <div className="border rounded-lg overflow-hidden" dir="rtl">
                    <div className="bg-white">
                        {donors.map((donor, index) => (
                            <div key={donor.id} className="flex flex-row-reverse justify-between p-4 border-b">
                                <div className="text-left"> {/* اسم المتبرع */}
                                <div className="text-lg font-bold">{donor.full_name}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-[#AAB99A] flex items-center justify-center rounded-full">
                                        {index + 1}
                                    </div> {/* الترتيب */}
                                    <div className="text-right font-bold mr-4">
                                        {donor.total_donated.toLocaleString()}{" "}
                                        <span className="text-[#AAB99A]">دينار أردني</span>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
};

export default TopDonors;