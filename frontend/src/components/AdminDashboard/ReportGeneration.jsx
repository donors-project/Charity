import React, { useState } from "react";
import axios from "axios";

const ReportGeneration = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    donorId: "",
    beneficiaryId: "",
  });

  const handleGenerateReport = async () => {
    try {
      setLoading(true);
      const { startDate, endDate, donorId, beneficiaryId } = filters;
      const response = await axios.get("/api/admin/reports", {
        params: { startDate, endDate, donorId, beneficiaryId },
      });
      setReports(response.data.donations);
    } catch (error) {
      console.error("Error generating reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Donation Reports</h2>
      
      {/* Filter section with better layout */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Filter Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Donor ID</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter donor ID"
              value={filters.donorId}
              onChange={(e) => setFilters({ ...filters, donorId: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Beneficiary ID</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter beneficiary ID"
              value={filters.beneficiaryId}
              onChange={(e) => setFilters({ ...filters, beneficiaryId: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleGenerateReport}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              "Generate Report"
            )}
          </button>
        </div>
      </div>

      {/* Results section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Report Results</h3>
        {reports.length === 0 ? (
          <div className="bg-gray-50 p-8 text-center rounded-lg border border-gray-200">
            <p className="text-gray-500">No data available. Please generate a report using the filters above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{formatCurrency(report.amount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{report.payment_method}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        report.payment_status === 'Completed' ? 'bg-green-100 text-green-800' :
                        report.payment_status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        report.payment_status === 'Failed' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {report.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{new Date(report.payment_date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Summary section */}
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
              <p className="text-sm text-gray-500">Showing {reports.length} donation records</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportGeneration;