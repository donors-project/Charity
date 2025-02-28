import React, { useState } from "react";
import DonorDashboard from "./DonorDashboard";  
import BeneficiaryManagement from "./BeneficiaryManagement"; 
import ReportGeneration from "./ReportGeneration"; 

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DonorDashboard />;
      case "beneficiaries":
        return <BeneficiaryManagement />;
      case "reports":
        return <ReportGeneration />;
      default:
        return <DonorDashboard />;
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Admin Dashboard Navbar */}
      <div className="flex space-x-6 mb-6">
        <button
          className={`text-lg font-semibold ${activeTab === "dashboard" ? "text-blue-500" : "text-gray-700"}`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`text-lg font-semibold ${activeTab === "beneficiaries" ? "text-blue-500" : "text-gray-700"}`}
          onClick={() => setActiveTab("beneficiaries")}
        >
          Beneficiaries
        </button>
        <button
          className={`text-lg font-semibold ${activeTab === "reports" ? "text-blue-500" : "text-gray-700"}`}
          onClick={() => setActiveTab("reports")}
        >
          Reports
        </button>
      </div>

      {/* Content */}
      <div>{renderTabContent()}</div>
    </div>
  );
}
