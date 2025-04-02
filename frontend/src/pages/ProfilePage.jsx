import { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { PhotoUploadModal } from '../components/PhotoUploadModal';
import { PasswordModal } from '../components/PasswordModal';
import { editUserProfile } from '../redux/actions/profile/editUserProfile';

export const ProfilePage = () => {
    const { user } = useSelector((state) => state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPassModalOpen, setIsPassModalOpen] = useState(false);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    });

    const UserIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    );

    const MailIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
    );

    const CheckIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    );

    const XIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    );

    const ClockIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
    );

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editUserProfile(formData))
        setIsEditing(false);
    };

    

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <NavBar name={"Home"} link={"/"} />
            <div className="min-h-screen bg-gray-200 mt-15">
                <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
                    <div className="bg-white shadow-sm rounded-lg mb-6">
                        <div className="px-6 py-5 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className={`cursor-pointer px-4 py-2 rounded-md font-medium ${isEditing ? 'bg-gray-200 text-gray-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                >
                                    {isEditing ? 'Cancel' : 'Edit Profile'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                            <div className="p-6 flex flex-col sm:flex-row sm:items-center">
                                <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                                    <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 relative" onClick={() => setIsModalOpen(true)}>
                                        <img
                                            src={user.profileImg || "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="}
                                            alt="Profile"
                                            className="w-full h-full object-cover cursor-pointer"
                                        />
                                        <span className='absolute w-full z-20 h-full top-0 flex items-center justify-center text-transparent hover:text-black hover:bg-gray-400 cursor-pointer px-1'>Upload Image</span>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-gray-900">{user.firstName} {user.lastName}</h2>
                                    <p className="text-gray-600 mt-1 flex items-center">
                                        <span className="mr-2"><MailIcon /></span>
                                        {user.email}
                                    </p>

                                    <div className="mt-3 flex items-center">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {user.status === 'active' ? <CheckIcon /> : <XIcon />}
                                            <span className="ml-1">{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span>
                                        </span>
                                    </div>

                                    <div className="mt-3 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <ClockIcon />
                                            <span className="ml-2">Member since: {formatDate(user.createdAt)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                            </div>

                            {isEditing ? (
                                <form onSubmit={handleSubmit} className="p-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                    <UserIcon />
                                                </div>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    required
                                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                    <UserIcon />
                                                </div>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                            <div className="relative">
                                                <div className="absolute -mt-5 inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                    <MailIcon />
                                                </div>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    disabled
                                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <p className="mt-1 text-xs text-gray-500">Contact support to change your email address</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="cursor-pointer mr-3 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="cursor-pointer px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="p-6">
                                    <dl className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                                <span className="text-gray-400 mr-2"><UserIcon /></span>
                                                First Name
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">{user.firstName}</dd>
                                        </div>

                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                                <span className="text-gray-400 mr-2"><UserIcon /></span>
                                                Last Name
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">{user.lastName || "—"}</dd>
                                        </div>

                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 flex items-center">
                                                <span className="text-gray-400 mr-2"><MailIcon /></span>
                                                Email Address
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                                        </div>

                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Member Since</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{formatDate(user.createdAt)}</dd>
                                        </div>
                                    </dl>
                                </div>
                            )}
                        </div>

                        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">Account Security</h3>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Change Password</h4>
                                        <p className="text-sm text-gray-500 mt-1">Update your password regularly for better security</p>
                                    </div>
                                    <button 
                                        className="cursor-pointer px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        onClick={() => setIsPassModalOpen(true)}
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PhotoUploadModal
                user={user}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <PasswordModal user={user} isOpen={isPassModalOpen} onClose={() => setIsPassModalOpen(false)} />
        </>
    );
};