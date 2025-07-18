const ConfirmModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Delete Confirmation</h2>
        <p className="mb-6">Are you sure you want to delete this coffee?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition shadow-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
