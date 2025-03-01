import React, { useState, useEffect } from "react";
import axios from "axios";
import ViewDetailsModal from "./ViewDetailsModal"; 
import ModifyStatusModal from "./ModifyStatusModal"; 

const BeneficiaryManagement = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Modals State
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/beneficiaries");
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

  // Open "Details" Modal
  const openDetailsModal = async (beneficiaryId, userId) => {
    try {
      const beneficiaryRes = await axios.get(`http://localhost:5000/api/admin/beneficiaries/${beneficiaryId}`);
      const userRes = await axios.get(`http://localhost:5000/api/admin/users/${userId}`);

      setSelectedBeneficiary(beneficiaryRes.data);
      setSelectedUser(userRes.data);
      setIsDetailsModalOpen(true);
    } catch (err) {
      console.error("Error fetching beneficiary/user details:", err);
    }
  };

  // Open "Modify Status" Modal
  const openStatusModal = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setIsStatusModalOpen(true);
  };

  // Close Modals
  const closeModals = () => {
    setIsDetailsModalOpen(false);
    setIsStatusModalOpen(false);
    setSelectedBeneficiary(null);
    setSelectedUser(null);
  };

  // Update Beneficiary Status in UI
  const updateBeneficiaryStatus = (id, newStatus) => {
    setBeneficiaries((prev) =>
      prev.map((b) => (b.id === id ? { ...b, verified: newStatus } : b))
    );
  };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" /></div>;
  if (error) return <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded my-4">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Page Title & Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-800">Manage Beneficiaries</h2>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Field */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search beneficiaries..."
              className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="py-2 px-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Beneficiaries</option>
            <option value="verified">Approved Only</option>
            <option value="unverified">Pending Only</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Total Debt</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Remaining</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {beneficiaries.map((beneficiary) => (
                <tr key={beneficiary.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-900">{beneficiary.user_id}</td>
                  <td className="px-6 py-4">${beneficiary.total_debt.toLocaleString()}</td>
                  <td className="px-6 py-4">${beneficiary.remaining_debt.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    {beneficiary.verified === null ? "Pending" : beneficiary.verified ? "Approved" : "Rejected"}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => openDetailsModal(beneficiary.id, beneficiary.user_id)}
                      className="bg-[#727D73] text-white px-3 py-1 rounded-lg hover:bg-[#D0DDD0] transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => openStatusModal(beneficiary)}
                      className="bg-[#AAB99A] text-white px-3 py-1 rounded-lg hover:bg-[#D0DDD0] transition"
                    >
                      Edit Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <ViewDetailsModal isOpen={isDetailsModalOpen} onClose={closeModals} beneficiary={selectedBeneficiary} user={selectedUser} />
      <ModifyStatusModal isOpen={isStatusModalOpen} onClose={closeModals} beneficiary={selectedBeneficiary} onUpdate={updateBeneficiaryStatus} />
    </div>
  );
};

export default BeneficiaryManagement;
