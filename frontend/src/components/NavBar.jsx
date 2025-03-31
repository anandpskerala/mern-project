import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/auth/logout";
import { Loader } from "./Loader";

export const NavBar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { user, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (loading) return (<Loader />);

    return (
        <nav className="fixed top-0 w-full bg-white text-gray-800 py-4 px-6 flex justify-between items-center shadow-md z-30">
            <Link to="/" className="text-2xl font-semibold">Home</Link>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition transform hover:scale-105 cursor-pointer"
                    aria-label="Profile Menu"
                >
                    {user?.profileImg ? (
                        <img
                            className="w-full h-full rounded-full object-cover"
                            src={user.profileImg}
                            alt="Profile"
                        />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5 fill-gray-600">
                            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
                        </svg>
                    )}
                </button>

                {dropdownOpen && (
                    <div
                        className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-300 transform origin-top-right scale-95 animate-fade-in"
                    >
                        <Link
                            to="/profile"
                            className="block px-4 py-2 hover:bg-gray-100 transition"
                        >
                            Profile
                        </Link>
                        {user?.role == "admin" && (
                            <Link 
                                to="/admin/dashboard"
                                className="block px-4 py-2 hover:bg-gray-100 transition"
                            >
                                Admin Dashboard
                            </Link>
                        )}
                        <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
                            onClick={() => {
                                dispatch(logout());
                                navigate("/auth")
                            }}
                        >
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
