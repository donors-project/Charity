// ----------------------------------------
// IMPORTS
// ----------------------------------------
import      React, { useState, useEffect } from "react";
import      DonationDashboard from "./DonationDashboard";
import      BeneficiaryManagement from "./BeneficiaryManagement";
import      ReportGeneration from "./ReportGeneration";
import      DonorManagement from "./DonorManagement";
import      CreateUserAndBeneficiary from "./CreateUserAndBeneficiary";
import      axios from "axios";
import      { useNavigate } from "react-router-dom";
import      Cookies from "js-cookie";
import      ContactUsMessages from "./ContactUsMessages";

// ----------------------------------------
// ADMIN COMPONENT
// ----------------------------------------

export default function Admin() {
  const [activeTab, setActiveTab] = useState("donations"),
        [isAdmin, setIsAdmin] = useState(false),
        navigate = useNavigate();

  // ----------------------------------------
  // AUTHENTICATION & ADMIN VERIFICATION
  // ----------------------------------------

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:5000/api/admin/verify-admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.role !== "Admin") {
            navigate("/");
          } else {
            setIsAdmin(true);
          }
        })
        .catch((error) => {
          console.error("Error verifying admin:", error);
          navigate("/login");
        });
    }
  }, [navigate]);

  // ----------------------------------------
  // RENDER TAB CONTENT
  // ----------------------------------------

  const renderTabContent = () => {
    if (!isAdmin) return <div>Loading...</div>;

    switch (activeTab) {
      case "donations":
        return <DonationDashboard />;
      case "donors":
        return <DonorManagement />;
      case "beneficiaries":
        return <BeneficiaryManagement />;
      case "reports":
        return <ReportGeneration />;
      case "create-beneficiary":
        return <CreateUserAndBeneficiary />;
      case "contact-us":
        return <ContactUsMessages />;
      default:
        return <DonationDashboard />;
    }
  };

  // ----------------------------------------
  // COMPONENT RETURN
  // ----------------------------------------

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          
          {/* ---------------------------------------- */}
          {/* ADMIN HEADER */}
          {/* ---------------------------------------- */}
          
          <div className="bg-gradient-to-r from-[#727D73] to-[#727D73] px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">لوحة التحكم الإدارية</h1>
          </div>

          {/* ---------------------------------------- */}
          {/* ADMIN NAVIGATION */}
          {/* ---------------------------------------- */}

          <div className="border-b border-gray-200">
            <nav className="flex px-6 -mb-px">
              <TabButton label="التبرعات" tab="donations" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton label="المتبرعون" tab="donors" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton label="المستفيدون" tab="beneficiaries" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton label="التقارير" tab="reports" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton label="إنشاء مستفيد" tab="create-beneficiary" activeTab={activeTab} setActiveTab={setActiveTab} />
              <TabButton label="الرسائل" tab="contact-us" activeTab={activeTab} setActiveTab={setActiveTab} />
            </nav>
          </div>

          {/* ---------------------------------------- */}
          {/* TAB CONTENT */}
          {/* ---------------------------------------- */}

          <div className="p-6">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------
// TAB BUTTON COMPONENT
// ----------------------------------------

const TabButton = ({ label, tab, activeTab, setActiveTab }) => (
  <button
    className={`py-4 px-6 font-medium text-sm transition-colors duration-200 ease-in-out ${
      activeTab === tab
        ? "border-b-2 border-green-500 text-green-900"
        : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`}
    onClick={() => setActiveTab(tab)}
  >
    <span className="flex items-center">
      {label}
    </span>
  </button>
);
