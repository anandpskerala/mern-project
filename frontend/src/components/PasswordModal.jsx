import React, { useState } from "react";
import { PasswordInput } from "./PasswordInput";
import { useDispatch } from "react-redux";
import { changePassword } from "../redux/actions/profile/changePassword";

export const PasswordModal = ({ user, isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    dispatch(changePassword({id: user._id, currentPassword, newPassword}));
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/80 bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Change Password
          </h2>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <PasswordInput 
                placeholder={"Current Password"}
                password={currentPassword}
                setPassword={setCurrentPassword}
              />
            </div>

            <div className="relative">
              <PasswordInput 
                placeholder={"New Password"}
                password={newPassword}
                setPassword={setNewPassword}
              />
            </div>
            <div className="relative">
              <PasswordInput 
                placeholder={"Confirm Password"}
                password={confirmPassword}
                setPassword={setConfirmPassword}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};
