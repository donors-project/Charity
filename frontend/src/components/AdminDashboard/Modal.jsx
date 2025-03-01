// ViewDetailsModal.jsx
import React from "react";

const ViewDetailsModal = ({ isOpen, onClose, user, beneficiary }) => {
  if (!isOpen) return null; // Don’t render if the modal is closed.

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
      >
        <h2 className="text-2xl font-bold mb-4">View Details</h2>

        {user && beneficiary ? (
          <div>
            {/* User Details */}
            <h3 className="text-lg font-semibold">User Info</h3>
            <p><strong>User ID:</strong> {user.id}</p>
            <p><strong>Full Name:</strong> {user.full_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <hr className="my-3" />

            {/* Beneficiary Details */}
            <h3 className="text-lg font-semibold">Beneficiary Info</h3>
            <p><strong>Total Debt:</strong> ${beneficiary.total_debt}</p>
            <p><strong>Remaining Debt:</strong> ${beneficiary.remaining_debt}</p>
            <p><strong>Reason:</strong> {beneficiary.reason}</p>
            <p><strong>Status:</strong> {beneficiary.verified ? "Verified" : "Unverified"}</p>
          </div>
        ) : (
          <p>Loading details...</p>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
