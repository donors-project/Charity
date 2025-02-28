import React, { useState, useEffect } from "react";
import axios from "axios";

const BeneficiaryManagement = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/beneficiaries");

        // Log the entire response to check the structure
        console.log(response);

        // Check if the response data is an array
        if (Array.isArray(response.data)) {
          setBeneficiaries(response.data);
        } else {
          setError("Unexpected data format from the server.");
        }
      } catch (error) {
        setError("Error fetching beneficiaries.");
        console.error("Error fetching beneficiaries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeneficiaries();
  }, []);

  // Handle loading and error states
  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/beneficiaries/${id}`, { verified: true });
      alert("Beneficiary approved");
      setBeneficiaries(
        beneficiaries.map((b) => (b.id === id ? { ...b, verified: true } : b))
      );
    } catch (error) {
      console.error("Error approving beneficiary:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/beneficiaries/${id}`, { verified: false });
      alert("Beneficiary rejected");
      setBeneficiaries(
        beneficiaries.map((b) => (b.id === id ? { ...b, verified: false } : b))
      );
    } catch (error) {
      console.error("Error rejecting beneficiary:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Manage Beneficiaries</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
          <thead>
            <tr className="text-gray-700">
              <th className="px-6 py-3">Beneficiary</th>
              <th className="px-6 py-3">Total Debt</th>
              <th className="px-6 py-3">Remaining Debt</th>
              <th className="px-6 py-3">Verified</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {beneficiaries.length > 0 ? (
              beneficiaries.map((beneficiary) => (
                <tr key={beneficiary.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{beneficiary.user_id}</td>
                  <td className="px-6 py-4">{beneficiary.total_debt}</td>
                  <td className="px-6 py-4">{beneficiary.remaining_debt}</td>
                  <td className="px-6 py-4">{beneficiary.verified ? "Yes" : "No"}</td>
                  <td className="px-6 py-4">
                    {!beneficiary.verified ? (
                      <>
                        <button
                          onClick={() => handleApprove(beneficiary.id)}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(beneficiary.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span>Approved</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center px-6 py-4 text-gray-500">
                  No beneficiaries available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BeneficiaryManagement;
