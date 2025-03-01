import React, { useState } from "react";
import DonationDashboard from "./DonationDashboard";
import BeneficiaryManagement from "./BeneficiaryManagement";
import ReportGeneration from "./ReportGeneration";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderTabContent = () => {
    switch (activeTab) {
      case "donations":
        return <DonationDashboard />;
      case "beneficiaries":
        return <BeneficiaryManagement />;
      case "reports":
        return <ReportGeneration />;
      default:
        return <DonationDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Admin Header */}
          <div className="bg-gradient-to-r from-[#727D73] to-[#727D73] px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">لوحة التحكم الإدارية</h1>
          </div>

          {/* Admin Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex px-6 -mb-px">
              {/* Donations Tab */}
              <button
                className={`py-4 px-6 font-medium text-sm transition-colors duration-200 ease-in-out ${
                  activeTab === "donations"
                    ? "border-b-2 border-green-500 text-green-900"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("donations")}
              >
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  التبرعات
                </span>
              </button>

              {/* Beneficiaries Tab */}
              <button
                className={`py-4 px-6 font-medium text-sm transition-colors duration-200 ease-in-out ${
                  activeTab === "beneficiaries"
                    ? "border-b-2 border-green-500 text-green-900"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("beneficiaries")}
              >
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 
                      110 5.292M15 21H3v-1a6 6 0 
                      0112 0v1zm0 0h6v-1a6 6 0 
                      00-9-5.197M13 7a4 4 0 
                      11-8 0 4 4 0 
                      018 0z"
                    />
                  </svg>
                  المستفيدون
                </span>
              </button>

              {/* Reports Tab */}
              <button
                className={`py-4 px-6 font-medium text-sm transition-colors duration-200 ease-in-out ${
                  activeTab === "reports"
                    ? "border-b-2 border-green-500 text-green-900"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("reports")}
              >
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-2m3 2v-4m3 
                      4v-6m2 10H7a2 2 0 01-2-2V5
                      a2 2 0 012-2h5.586
                      a1 1 0 01.707.293l5.414 
                      5.414a1 1 0 
                      01.293.707V19a2 
                      2 0 01-2 2z"
                    />
                  </svg>
                  التقارير
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
