// components/ConfirmDeleteModal.js
import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

export const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl w-96 max-w-sm p-6 transform transition-transform duration-300 scale-100">
        <div className="flex items-center mb-4">
          <FaExclamationTriangle className="text-red-500 text-3xl mr-3 animate-pulse" />
          <h3 className="text-xl font-semibold text-gray-800">
            Confirm Deletion!
          </h3>
        </div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this{" "}
          <span className="font-semibold">Examination?</span> <br />
          This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-8 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-8 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 flex items-center"
          >
            <FaExclamationTriangle className="mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export const ConfirmDeleteModalMidTest = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl w-96 max-w-sm p-6 transform transition-transform duration-300 scale-100">
        <div className="flex items-center mb-4">
          <FaExclamationTriangle className="text-red-500 text-3xl mr-3 animate-pulse" />
          <h3 className="text-xl font-semibold text-gray-800">
            Confirm Deletion!
          </h3>
        </div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this{" "}
          <span className="font-semibold">Mid Test Examination?</span> <br />
          This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-8 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-8 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 flex items-center"
          >
            <FaExclamationTriangle className="mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
