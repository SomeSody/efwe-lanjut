import { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import { supabase } from "../../lib/supabaseClient";
import { Link } from "react-router-dom";

export default function Orders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        loadOrders()
    }, [])

    const loadOrders = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('orders')
                .select(`
                    *,
                    profiles:member_id (full_name, email)
                `)
                .order('created_at', { ascending: false })

            if (error) throw error
            setOrders(data || [])
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-700'
            case 'pending': return 'bg-yellow-100 text-yellow-700'
            case 'cancelled': return 'bg-red-100 text-red-700'
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    return (
        <div id="orders-container">
            <PageHeader title="Orders Management" breadcrumb={["Dashboard", "Orders Management"]}>
            </PageHeader>

            {error && (
                <div className="mx-4 mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="p-4">
                {loading ? (
                    <p className="text-gray-500 text-center py-4">Loading orders...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 bg-white rounded-lg overflow-hidden">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="px-4 py-2 border">Order ID</th>
                                    <th className="px-4 py-2 border">Customer</th>
                                    <th className="px-4 py-2 border">Status</th>
                                    <th className="px-4 py-2 border">Total Final</th>
                                    <th className="px-4 py-2 border">Discount</th>
                                    <th className="px-4 py-2 border">Points Earned</th>
                                    <th className="px-4 py-2 border">Date</th>
                                    <th className="px-4 py-2 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="text-center hover:bg-gray-50 transition">
                                        <td className="px-4 py-2 border text-sm">{order.id.slice(0, 8)}...</td>
                                        <td className="px-4 py-2 border">
                                            {order.profiles?.full_name || order.profiles?.email || '-'}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 border">
                                            Rp {Number(order.total_final).toLocaleString("id-ID")}
                                        </td>
                                        <td className="px-4 py-2 border text-green-600">
                                            - Rp {Number(order.discount_amount).toLocaleString("id-ID")}
                                        </td>
                                        <td className="px-4 py-2 border">{order.points_earned}</td>
                                        <td className="px-4 py-2 border text-sm">
                                            {new Date(order.created_at).toLocaleDateString("id-ID")}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <Link
                                                to={`/orders/${order.id}`}
                                                className="text-blue-500 hover:underline text-sm"
                                            >
                                                Detail
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}