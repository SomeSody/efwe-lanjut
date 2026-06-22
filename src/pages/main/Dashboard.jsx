import { useEffect, useState } from "react";
import { FaShoppingCart, FaTruck, FaUsers, FaDollarSign } from "react-icons/fa";
import { supabase } from "../../lib/supabaseClient";
import Dash from "../../components/Dash";
import InterestCategories from "../../components/InterestCategories";
import ExperienceCards from "../../components/ExperienceCards";

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalCustomers: 0,
        totalRevenue: 0,
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadStats()
    }, [])

    const loadStats = async () => {
        try {
            const [productsRes, ordersRes, customersRes] = await Promise.all([
                supabase.from('products').select('*', { count: 'exact', head: true }),
                supabase.from('orders').select('total_final', { count: 'exact' }),
                supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'member'),
            ])

            const totalRevenue = ordersRes.data
                ? ordersRes.data.reduce((sum, o) => sum + (parseFloat(o.total_final) || 0), 0)
                : 0

            setStats({
                totalProducts: productsRes.count || 0,
                totalOrders: ordersRes.count || 0,
                totalCustomers: customersRes.count || 0,
                totalRevenue,
            })
        } catch (err) {
            console.error("Error loading stats:", err)
        } finally {
            setLoading(false)
        }
    }

    const statCards = [
        {
            title: "Total Products",
            value: stats.totalProducts,
            icon: <FaShoppingCart className="text-blue-500 text-2xl" />,
            bg: "bg-blue-50",
        },
        {
            title: "Total Orders",
            value: stats.totalOrders,
            icon: <FaTruck className="text-green-500 text-2xl" />,
            bg: "bg-green-50",
        },
        {
            title: "Total Customers",
            value: stats.totalCustomers,
            icon: <FaUsers className="text-purple-500 text-2xl" />,
            bg: "bg-purple-50",
        },
        {
            title: "Total Revenue",
            value: `Rp ${stats.totalRevenue.toLocaleString("id-ID")}`,
            icon: <FaDollarSign className="text-yellow-500 text-2xl" />,
            bg: "bg-yellow-50",
        },
    ]

    return (
        <div className="bg-white font-[Trebuchet_MS,sans-serif]">
            {/* Admin Stats Cards */}
            <div className="px-6 pt-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Overview</h2>
                {loading ? (
                    <p className="text-gray-500">Loading statistics...</p>
                ) : (
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        {statCards.map((card) => (
                            <div
                                key={card.title}
                                className={`${card.bg} rounded-xl p-5 flex items-center gap-4 shadow-sm`}
                            >
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                    {card.icon}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">{card.title}</p>
                                    <p className="text-xl font-bold text-gray-800">{card.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Dash />
            <InterestCategories />
            <ExperienceCards />
        </div>
    );
}