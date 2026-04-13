import { CiDeliveryTruck } from "react-icons/ci"; 
import { BsCalendarEvent } from "react-icons/bs"; 
import { AiFillCustomerService } from "react-icons/ai"; 
import { BsBorderStyle } from "react-icons/bs"; 
import { MdDashboard } from "react-icons/md"; 

export default function Sidebar() {
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
	                    <div className="hover:text-hijau flex cursor-pointer items-center 
                            rounded-xl p-4 font-medium text-gray-600 gap-2 hover:bg-green-200 
                            hover:font-extrabold" id="menu-1"><MdDashboard />Dashboard</div>
	                  </li>
                    <li>
	                    <div className="hover:text-hijau flex cursor-pointer items-center 
                            rounded-xl p-4 font-medium text-gray-600 gap-2 hover:bg-green-200 
                            hover:font-extrabold" id="menu-2"><BsBorderStyle />Orders</div>
	                  </li>
	                  <li>
	                    <div className="hover:text-hijau flex cursor-pointer items-center 
                            rounded-xl p-4 font-medium text-gray-600 gap-2 hover:bg-green-200 
                            hover:font-extrabold" id="menu-3"><AiFillCustomerService />Customers</div>
	                  </li>
	                  <li>
	                    <div className="hover:text-hijau flex cursor-pointer items-center 
                            rounded-xl p-4 font-medium text-gray-600 gap-2 hover:bg-green-200 
                            hover:font-extrabold" id="menu-3"><CiDeliveryTruck/>Deliverer</div>
	                  </li>
	                  <li>
	                    <div className="hover:text-hijau flex cursor-pointer items-center 
                            rounded-xl p-4 font-medium text-gray-600 gap-2 hover:bg-green-200 
                            hover:font-extrabold" id="menu-3"><BsCalendarEvent />Revenue</div>
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
