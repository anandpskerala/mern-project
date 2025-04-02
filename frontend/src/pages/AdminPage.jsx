import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { NavBar } from '../components/NavBar';
import { UserModal } from '../components/UserModal';
import axiosInstance from '../utils/axios';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const SaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

export const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const timeoutId = useRef(null);

  const handleOpenModal = (user = {}) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = async (userData) => {
    try {
      let res;
      if (Object.keys(selectedUser).length > 0) {
        res = await axiosInstance.patch("/admin/edit-user", userData);
      } else {
        res = await axiosInstance.post("/admin/create-user", userData);
      }
      getResponse();
      toast.success(res.data.message);
      setSelectedUser({});
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const openDeleteModal = (userId) => {
    setUserToDelete(userId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const deleteUser = async (id) => {
    try {
      const res = await axiosInstance.delete(`/admin/delete-user/${id}`);
      toast.success(res.data.message);
      closeDeleteModal();
      getResponse(); // Re-fetch the user list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete user');
      closeDeleteModal();
    }
  };


  const getResponse = async () => {
    try {
      const response = await axiosInstance.post("/admin/get-users");
      let users = response.data.users || [];
      users = users.map((user) => ({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,
        status: user.status,
      }));
      setUsers(users);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    }
  };


  useEffect(() => {
    getResponse();

    return () => clearTimeout(timeoutId.current);
  }, []);

  const handleSearch = (e) => {
    const newQuery = e.target.value;
    setSearchTerm(newQuery);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(async () => {
      try {
        const response = await axiosInstance.post("/admin/get-users", { query: newQuery });
        let users = response.data.users || [];
        users = users.map((user) => ({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role,
          status: user.status,
        }));
        setUsers(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, 500);
  };

  return (
    <>
      <NavBar name={"Admin"} link={"/admin/dashboard"} />
      <main className="min-h-screen relative mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-15 bg-gray-200">
        <div className="bg-white shadow rounded-lg p-6 border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center border bg-gray-200 px-4 py-2 rounded-md w-1/2 lg:w-1/4">
              <span className="text-gray-500 mr-2">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search users..."
                className="bg-transparent focus:outline-none w-full"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <button
              onClick={() => handleOpenModal()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md flex items-center cursor-pointer"
            >
              <span className="mr-2">
                <PlusIcon />
              </span>
              Add User
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                        }`}>
                        {user.role.slice(0, 1).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {user.status.slice(0, 1).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => {
                          handleOpenModal(user);
                          setSelectedUser(user);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-4 cursor-pointer"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => openDeleteModal(user.id)}
                        className="text-red-600 hover:text-red-900 cursor-pointer"
                      >
                        <TrashIcon />
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-1/3 p-6 shadow-lg relative">
            <button
              onClick={closeDeleteModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <XIcon />
            </button>
            <h3 className="text-lg font-semibold text-gray-800">Are you sure you want to delete this user?</h3>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteUser(userToDelete)}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        user={selectedUser}
      />
    </>
  )
}
