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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Admin Header */}
          <div className="bg-gradient-to-r from-[#727D73] to-[#AAB99A] px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          </div>
          
          {/* Admin Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex px-6 -mb-px">
              <button
                className={`py-4 px-6 font-medium text-sm transition-colors duration-200 ease-in-out ${
                  activeTab === "dashboard" 
                    ? "border-b-2 border-green-500 text-green-900" 
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  Dashboard
                </span>
              </button>
              <button
                className={`py-4 px-6 font-medium text-sm transition-colors duration-200 ease-in-out ${
                  activeTab === "beneficiaries" 
                    ? "border-b-2 border-blue-500 text-blue-600" 
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("beneficiaries")}
              >
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Beneficiaries
                </span>
              </button>
              <button
                className={`py-4 px-6 font-medium text-sm transition-colors duration-200 ease-in-out ${
                  activeTab === "reports" 
                    ? "border-b-2 border-blue-500 text-blue-600" 
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("reports")}
              >
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Reports
                </span>
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}