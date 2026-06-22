import { CiDeliveryTruck } from "react-icons/ci"; 
import { BsCalendarEvent } from "react-icons/bs"; 
import { AiFillCustomerService } from "react-icons/ai"; 
import { BsBorderStyle } from "react-icons/bs"; 
import { MdDashboard } from "react-icons/md"; 
import { FiLogOut, FiShoppingBag, FiClipboard, FiUser } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Sidebar() {
    const { profile, logout } = useAuth()
    const navigate = useNavigate()
    const isAdmin = profile?.role === 'admin'

    const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4  space-x-2
    ${isActive ? 
        "text-hijau bg-green-200 font-extrabold" : 
        "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
    }`

    const handleLogout = async () => {
        try {
            await logout()
            navigate("/login")
        } catch (err) {
            console.error("Logout error:", err)
        }
    }

    const getTierBadgeColor = (tier) => {
        switch (tier) {
            case 'platinum': return 'bg-gray-800 text-white'
            case 'gold': return 'bg-yellow-400 text-gray-900'
            case 'silver': return 'bg-gray-300 text-gray-800'
            default: return 'bg-orange-300 text-gray-800'
        }
    }

    return (
        <div className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg" 
                id="sidebar">
            {/* Logo */}
            <div className="flex flex-col" id="sidebar-logo">
                <span className="font-poppins text-[48px] text-gray-900" id="logo-title">
                    TravelingGo
                </span>
                <span className="font-semibold text-gray-400" id="logo-subtitle">Modern Admin Dashboard</span>
            </div>

            {/* User Info */}
            {profile && (
                <div className="mt-6 p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                        <FiUser className="text-gray-500" />
                        <span className="text-sm font-medium text-gray-700 truncate">
                            {profile.full_name || profile.email}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 capitalize">{profile.role}</span>
                        {!isAdmin && profile.tier && (
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${getTierBadgeColor(profile.tier)}`}>
                                {profile.tier}
                            </span>
                        )}
                        {!isAdmin && (
                            <span className="text-xs text-gray-400">
                                {profile.points} pts
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* List Menu */}
            <div className="mt-10" id="sidebar-menu">
                <ul className="space-y-3" id="menu-list">
                    {isAdmin ? (
                        <>
                            <li>
                                <NavLink className={menuClass} id="menu-1" to="/"><MdDashboard />Dashboard</NavLink>
                            </li>
                            <li>
                                <NavLink className={menuClass} id="menu-3" to="customer"><AiFillCustomerService />Customers</NavLink>
                            </li>
                            <li>
                                <NavLink className={menuClass} id="menu-4" to="produk"><CiDeliveryTruck />Products</NavLink>
                            </li>
                            <li>
                                <NavLink className={menuClass} id="menu-2" to="orders"><BsCalendarEvent />Orders</NavLink>
                            </li>
                            <li>
                                <NavLink className={menuClass} id="menu-6" to="fitur-xyz"><BsBorderStyle />Fitur XYZ</NavLink>
                            </li>
                            <li>
                                <NavLink className={menuClass} id="menu-7" to="note"><BsBorderStyle />Note</NavLink>
                            </li>
                            <li>
                                <NavLink className={menuClass} to="/components"><BsBorderStyle />Components</NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink className={menuClass} to="/member/dashboard"><MdDashboard />Dashboard</NavLink>
                            </li>
                            <li>
                                <NavLink className={menuClass} to="/member/checkout"><FiShoppingBag />Checkout</NavLink>
                            </li>
                            <li>
                                <NavLink className={menuClass} to="/member/orders"><FiClipboard />My Orders</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {/* Footer */}
            <div className="mt-auto" id="sidebar-footer">
                <div className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center" id="footer-card">
                    <div className="text-white text-sm" id="footer-text">
                        <span>Please organize your menus through button below!</span>
                        <div className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2" id="add-menu-button">
                            <span className="text-gray-600 flex items-center">Contact Us</span>
                        </div>
                    </div>
                    <img className="w-20 rounded-full" id="footer-avatar" src="/img/syahul.jpg" />
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 mb-4 px-4 py-3 
                        bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors
                        font-medium text-sm"
                >
                    <FiLogOut />
                    Logout
                </button>

                <span className="font-bold text-gray-400" id="footer-brand">TravelingGo Admin Dashboard</span>
                <p className="font-light text-gray-400" id="footer-copyright">&copy; 2025 All Right Reserved</p>
            </div>
        </div>
    );
}
