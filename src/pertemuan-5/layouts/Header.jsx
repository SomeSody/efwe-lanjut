import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";
import ProfileMenu from "../components/ProfileMenu";

export default function Header() {
    return (
        <div className="flex justify-between items-center p-4" id="header-container">
            {/* Search Bar */}
            <div className="relative w-full max-w-lg" id="search-bar">
                <input className="border border-gray-100 p-2 pr-10 bg-white w-full max-w-lg rounded-md outline-none"
                    id="search-input"
                    type="text"
                    placeholder="Search Here..."
                />
                <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" id="search-icon" />
            </div>

            {/* Icon & Profile Section */}
            <div className="flex items-center space-x-4" id="icons-container">
                {/* Icons */}
                <div className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer" id="notification-icon">
                    <FaBell />
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-200
                            rounded-full px-2 py-1 text-xs" id="notification-badge">50</span>
                </div>
                <div className="p-3 bg-blue-100 rounded-2xl cursor-pointer" id="chart-icon">
                    <FcAreaChart />
                </div>
                <div className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer" id="settings-icon">
                    <SlSettings />
                </div>
             

                {/* Profile Section */}
                <div className="flex items-center space-x-4 border-l pl-4 border-gray-300" id="profile-container">
                    <span id="profile-text">
                        Hello, <b>Udin Samsudin Huan</b>
                    </span>
                    <ProfileMenu />
                </div>
            </div>
        </div>
    );
}
