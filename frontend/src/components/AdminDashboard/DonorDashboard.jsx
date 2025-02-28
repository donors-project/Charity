import React, { useState, useEffect } from "react";
import axios from "axios";

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/donations");
        
        // Ensure the response data is an array
        if (Array.isArray(response.data)) {
          setDonations(response.data);
        } else {
          console.log(response.data);
          setError("Unexpected data format from the server.");
        }
      } catch (error) {
        setError("Error fetching donations.");
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // Handle loading and error states
  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Donor Contributions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
          <thead>
            <tr className="text-gray-700">
              <th className="px-6 py-3">Donor</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Payment Method</th>
              <th className="px-6 py-3">Payment Status</th>
              <th className="px-6 py-3">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.length > 0 ? (
              donations.map((donation) => (
                <tr key={donation.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{donation.Donor?.total_donated}</td>
                  <td className="px-6 py-4">{donation.amount}</td>
                  <td className="px-6 py-4">{donation.payment_method}</td>
                  <td className="px-6 py-4">{donation.payment_status}</td>
                  <td className="px-6 py-4">
                    {new Date(donation.payment_date).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center px-6 py-4 text-gray-500">
                  No donations available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonorDashboard;
