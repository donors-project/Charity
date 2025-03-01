import React, { useState } from "react";
import axios from "axios";

const ModifyStatusModal = ({ isOpen, onClose, beneficiary, onUpdate }) => {
  const [status, setStatus] = useState(beneficiary?.verified);

  if (!isOpen || !beneficiary) return null; // Don't render if not open

  // Handle status change
  const handleStatusChange = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/beneficiaries/${beneficiary.id}`, {
        verified: status,
      });

      onUpdate(beneficiary.id, status); // Update state in parent
      onClose(); // Close modal
    } catch (error) {
      console.error("Error updating verification status:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">Modify Verification Status</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-gray-600">Change the verification status for <strong>{beneficiary.user_id}</strong>:</p>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value === "true" ? true : e.target.value === "false" ? false : null)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="null">Pending</option>
            <option value="true">Approved</option>
            <option value="false">Rejected</option>
          </select>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={handleStatusChange} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyStatusModal;
