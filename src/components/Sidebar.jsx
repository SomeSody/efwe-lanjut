import { CiDeliveryTruck } from "react-icons/ci"; 
import { BsCalendarEvent } from "react-icons/bs"; 
import { AiFillCustomerService } from "react-icons/ai"; 
import { BsBorderStyle } from "react-icons/bs"; 
import { MdDashboard } from "react-icons/md"; 
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {

        const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-4  space-x-2
        ${isActive ? 
            "text-hijau bg-green-200 font-extrabold" : 
            "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
        }`

    return (
        <div className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg" 
                id="sidebar">
            {/* Logo */}
            <div className="flex flex-col" id="sidebar-logo">
                <span className="font-poppins text-[48px] text-gray-900" id="logo-title">
		                Sedap <b className="text-hijau" id="logo-dot">.</b>
		            </span>
                <span className="font-semibold text-gray-400" id="logo-subtitle">Modern Admin Dashboard</span>
            </div>

            {/* List Menu */}
            <div className="mt-10" id="sidebar-menu">
                <ul className="space-y-3" id="menu-list">
                    <li>
	                    <NavLink className={menuClass} id="menu-1" to="/"><MdDashboard />Dashboard</NavLink>
	                </li>
                    <li>
	                    <NavLink className={menuClass} id="menu-2" to="orders"><BsBorderStyle />Orders</NavLink>
	                </li>
	                <li>
	                    <NavLink className={menuClass} id="menu-3" to="customer"><AiFillCustomerService />Customers</NavLink>
	                </li>
	                <li>
	                    <NavLink className={menuClass} id="menu-4" to="/deliverer"><CiDeliveryTruck/>Deliverer</NavLink>
	                </li>
	                <li>
	                    <NavLink className={menuClass} id="menu-5" to="/revenue"><BsCalendarEvent />Revenue</NavLink>
	                </li>
                    <li>
                        <NavLink className={menuClass} to="/400">Error 400</NavLink>
                    </li>
                    <li>
                        <NavLink className={menuClass} to="/401">Error 401</NavLink>
                    </li>
                    <li>
                        <NavLink className={menuClass} to="/403">Error 403</NavLink>
                    </li>
                </ul>
            </div>

            {/* Footer */}
            <div className="mt-auto" id="sidebar-footer">
                <div className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center" id="footer-card">
                    <div className="text-white text-sm" id="footer-text">
                        <span>Please organize your menus through button below!</span>
                        <div className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2" id="add-menu-button">
                            <span className="text-gray-600 flex items-center">Add Menus</span>
                        </div>
                    </div>
                    <img className="w-20 rounded-full" id="footer-avatar" src="/img/syahul.jpg" />
                </div>
                <span className="font-bold text-gray-400" id="footer-brand">Sedap Restaurant Admin Dashboard</span>
                <p className="font-light text-gray-400" id="footer-copyright">&copy; 2025 All Right Reserved</p>
            </div>
        </div>
    );
}
