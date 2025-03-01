import React from "react";

const ViewDetailsModal = ({ isOpen, onClose, user, beneficiary }) => {
  if (!isOpen) return null; // Don’t render if modal is closed

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      {/* 
        We wrap the modal in a flex container that can shrink to fit 
        and set max-h to 90vh so it never overflows the screen.
      */}
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing on inner click
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">Beneficiary Details</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-50 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body: make it scrollable */}
        <div className="px-6 py-6 overflow-y-auto flex-1 space-y-8">
          {user && beneficiary ? (
            <>
              {/* USER SECTION */}
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  {/* USER IMAGE */}
                  {user.image && (
                    <img
                      src={user.image}
                      alt="User"
                      className="w-24 h-24 rounded-xl object-cover border-2 border-gray-100"
                    />
                  )}
                  <div className="space-y-1 text-sm text-gray-600">
                    <h4 className="text-lg font-semibold text-gray-900">{user.full_name}</h4>
                    <p>
                      <span className="font-medium text-gray-700">Email:</span> {user.email}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Phone:</span> {user.phone}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Role:</span> {user.role}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Address:</span> {user.address}
                    </p>
                  </div>
                </div>

                {/* Additional User Fields */}
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-700">User ID:</span> {user.id}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Created At:</span>{" "}
                    {new Date(user.created_at).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Updated At:</span>{" "}
                    {new Date(user.updated_at).toLocaleString()}
                  </p>
                </div>

                <hr className="border-gray-200" />

                {/* BENEFICIARY SECTION */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">Beneficiary Info</h4>

                  {/* Basic Beneficiary Fields */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-700 font-medium">Beneficiary ID:</p>
                      <p className="text-gray-600">{beneficiary.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">User ID Ref:</p>
                      <p className="text-gray-600">{beneficiary.user_id}</p>
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">Total Debt:</p>
                      <p className="text-gray-600">${(+beneficiary.total_debt).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">Remaining Debt:</p>
                      <p className="text-gray-600">${(+beneficiary.remaining_debt).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">Status:</p>
                      <p className="text-gray-600">
                        {beneficiary.verified ? "Verified" : "Unverified"}
                      </p>
                    </div>
                  </div>

                  {/* Reason / Additional Fields */}
                  {beneficiary.reason && (
                    <div>
                      <p className="text-gray-700 font-medium">Reason:</p>
                      <p className="text-gray-600">{beneficiary.reason}</p>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <div>
                      <p className="text-gray-700 font-medium">Created At:</p>
                      <p className="text-gray-600">
                        {new Date(beneficiary.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">Updated At:</p>
                      <p className="text-gray-600">
                        {new Date(beneficiary.updated_at).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Identity Image */}
                  {beneficiary.identity_image && (
                    <div className="mt-3">
                      <p className="font-medium text-gray-700 mb-1">Identity Document</p>
                      <img
                        src={beneficiary.identity_image}
                        alt="Identity"
                        className="rounded-lg border-2 border-gray-100 w-full max-w-md"
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            // Loading
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto" />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-gray-600 hover:text-gray-800 font-medium 
            rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
