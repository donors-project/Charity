import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const BeneficiaryProfile = () => {
  // Refs & States
  const sliderRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Get user ID from Redux
  const userId = useSelector((state) => state.UID.userId);

  // Fetch user data & announcements
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        );
        setUserInfo(response.data);
      } catch (err) {
        setError("Failed to fetch user data.");
      }
    };

    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/ads/${userId}`
        );
        setAnnouncements(response.data);
      } catch (err) {
        console.error("Failed to fetch announcements.");
      }
    };

    if (userId) {
      fetchUserData();
      fetchAnnouncements();
    }
    setLoading(false);
  }, [userId]);

  // Function to update user info
  const updateInfo = async () => {
    setUpdating(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${userId}`,
        userInfo
      );
      setUserInfo(response.data);
    } catch (err) {
      console.error("Error updating user data");
    }
    setUpdating(false);
  };

  // Scroll functionality for announcements
  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 320; // Adjust based on card width
      const currentScroll = sliderRef.current.scrollLeft;

      if (direction === "left") {
        sliderRef.current.scrollTo({
          left: currentScroll - scrollAmount,
          behavior: "smooth",
        });
        setActiveCardIndex((prev) => Math.max(prev - 1, 0));
      } else {
        sliderRef.current.scrollTo({
          left: currentScroll + scrollAmount,
          behavior: "smooth",
        });
        setActiveCardIndex((prev) =>
          Math.min(prev + 1, announcements.length - 1)
        );
      }
    }
  };

  // Function to get status color for announcements
  const getStatusColor = (status) => {
    return status
      ? "bg-emerald-100 text-emerald-800"
      : "bg-amber-100 text-amber-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Show Loading */}
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : userInfo ? (
          <>
            {/* User Profile Section */}
            <div className="relative mb-20">
              <div className="absolute top-0 left-0 w-full h-56 bg-gradient-to-r from-[#D0DDD0] to-[#AAB99A] rounded-xl transform -skew-y-2"></div>
              <div className="absolute top-6 left-6 w-full h-56 bg-gradient-to-r from-[#AAB99A] to-[#727D73] rounded-xl opacity-50 transform -skew-y-1"></div>

              {/* Profile Content */}
              <div className="relative z-10 pt-24">
                <div className="bg-white rounded-xl shadow-xl px-8 py-10">
                  <div className="flex flex-col md:flex-row gap-10">
                    {/* Profile Image */}
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <img
                          src={userInfo?.image || "noimage"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Profile Form */}
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-[#727D73] mb-8">
                        Personal Information
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-[#727D73] mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            className="w-full p-3 bg-gray-50 border border-[#D0DDD0] rounded-lg"
                            value={userInfo?.full_name || ""}
                            onChange={(e) =>
                              setUserInfo({
                                ...userInfo,
                                full_name: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-[#727D73] mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            className="w-full p-3 bg-gray-50 border border-[#D0DDD0] rounded-lg"
                            value={userInfo?.email || ""}
                            onChange={(e) =>
                              setUserInfo({
                                ...userInfo,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="mt-8 flex justify-end">
                        <button
                          onClick={updateInfo}
                          disabled={updating}
                          className="px-8 py-3 bg-[#727D73] text-white rounded-lg font-medium shadow-md transition-all duration-300 hover:scale-105"
                        >
                          {updating ? "Updating..." : "Save Changes"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Announcements Section */}
            <div className="bg-white rounded-xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-[#727D73] mb-4">
                Your Announcements
              </h2>

              {/* Scroll Buttons */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => scroll("left")}
                  disabled={activeCardIndex === 0}
                  className="p-3 bg-gray-200 rounded-full"
                >
                  ◀
                </button>
                <button
                  onClick={() => scroll("right")}
                  disabled={activeCardIndex === announcements.length - 1}
                  className="p-3 bg-gray-200 rounded-full"
                >
                  ▶
                </button>
              </div>

              {/* Announcements Slider */}
              <div
                ref={sliderRef}
                className="flex overflow-x-auto pb-8 gap-6 scrollbar-hide"
              >
                {announcements.length > 0 ? (
                  announcements.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex-none w-72 bg-white rounded-xl shadow-md p-5"
                    >
                      <h3 className="text-lg font-semibold text-[#727D73]">
                        {item.reason}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
                          item.verified
                        )}`}
                      >
                        {item.verified ? "Verified" : "Pending"}
                      </span>
                      <p className="text-sm text-gray-600 mt-2">
                        {item.total_debt}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No announcements available.</p>
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default BeneficiaryProfile;
