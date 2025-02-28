import React, { useState } from "react";
import axios from "axios";

const ReportGeneration = () => {
  const [reports, setReports] = useState([]);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    donorId: "",
    beneficiaryId: "",
  });

  const handleGenerateReport = async () => {
    try {
      const { startDate, endDate, donorId, beneficiaryId } = filters;
      const response = await axios.get("/api/admin/reports", {
        params: { startDate, endDate, donorId, beneficiaryId },
      });
      setReports(response.data.donations);
    } catch (error) {
      console.error("Error generating reports:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Generate Reports</h2>
      <div className="space-x-4 mb-4">
        <input
          type="date"
          className="border rounded p-2"
          value={filters.startDate}
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
        />
        <input
          type="date"
          className="border rounded p-2"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />
        <input
          type="text"
          className="border rounded p-2"
          placeholder="Donor ID"
          value={filters.donorId}
          onChange={(e) => setFilters({ ...filters, donorId: e.target.value })}
        />
        <input
          type="text"
          className="border rounded p-2"
          placeholder="Beneficiary ID"
          value={filters.beneficiaryId}
          onChange={(e) => setFilters({ ...filters, beneficiaryId: e.target.value })}
        />
        <button
          onClick={handleGenerateReport}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Generate Report
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
          <thead>
            <tr className="text-gray-700">
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Payment Method</th>
              <th className="px-6 py-3">Payment Status</th>
              <th className="px-6 py-3">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{report.amount}</td>
                <td className="px-6 py-4">{report.payment_method}</td>
                <td className="px-6 py-4">{report.payment_status}</td>
                <td className="px-6 py-4">{new Date(report.payment_date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportGeneration;
