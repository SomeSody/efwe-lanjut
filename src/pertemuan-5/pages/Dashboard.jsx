import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import OrderList from "../components/OrderList";
import DeliverList from "../components/DeliverList";

export default function Dashboard() {
    return (
        <div id="dashboard-container">
            <PageHeader />
            <div className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4" id="dashboard-grid">
                <div className="flex items-center hover:bg-gray-200 space-x-5 bg-white rounded-lg shadow-md p-4" id="dashboard-orders">
                    <div className="bg-hijau rounded-full p-4" id="orders-icon">
                        <FaShoppingCart className="text-white" />
                    </div>
                    <div className="flex flex-col" id="orders-info">
                        <span className="text-2xl font-bold" id="orders-count">75</span>
                        <span className="text-gray-400" id="orders-text">Total Orders</span>
                    </div>
                </div>

                <div className="flex items-center hover:bg-gray-200 space-x-5 bg-white rounded-lg shadow-md p-4" id="dashboard-delivered">
                    <div className="bg-biru rounded-full p-4" id="delivered-icon">
                        <FaTruck className="text-white" />
                    </div>
                    <div className="flex flex-col" id="delivered-info">
                        <span className="text-2xl font-bold" id="delivered-count">175</span>
                        <span className="text-gray-400" id="delivered-text">Total Delivered</span>
                    </div>
                </div>

                <div className="flex items-center hover:bg-gray-200 space-x-5 bg-white rounded-lg shadow-md p-4" id="dashboard-canceled">
                    <div className="bg-merah rounded-full p-4" id="canceled-icon">
                        <FaBan className="text-white" />
                    </div>
                    <div className="flex flex-col" id="canceled-info">
                        <span className="text-2xl font-bold" id="canceled-count">40</span>
                        <span className="text-gray-400" id="canceled-text">Total Canceled</span>
                    </div>
                </div>

                <div className="flex items-center hover:bg-gray-200 space-x-5 bg-white rounded-lg shadow-md p-4" id="dashboard-revenue">
                    <div className="bg-kuning rounded-full p-4" id="revenue-icon">
                        <FaDollarSign className="text-white" />
                    </div>
                    <div className="flex flex-col" id="revenue-info">
                        <span className="text-2xl font-bold" id="revenue-amount">Rp.128</span>
                        <span className="text-gray-400" id="revenue-text">Total Revenue</span>
                    </div>
                </div>

                <div className="px-5 pb-5">
                    <OrderList />
                </div>
                
                <div className="px-5 pb-5">
                    <DeliverList />
                </div>
            </div>
        </div>
    );
}