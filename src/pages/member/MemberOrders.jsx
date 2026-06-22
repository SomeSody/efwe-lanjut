import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { useAuth } from "../../contexts/AuthContext"
import PageHeader from "../../components/PageHeader"

export default function MemberOrders() {
    const { profile } = useAuth()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [orderItems, setOrderItems] = useState([])

    useEffect(() => {
        loadOrders()
    }, [])

    const loadOrders = async () => {
        if (!profile) return
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('member_id', profile.id)
                .order('created_at', { ascending: false })

            if (error) throw error
            setOrders(data || [])
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const viewOrderDetail = async (order) => {
        setSelectedOrder(order)
        try {
            const { data, error } = await supabase
                .from('order_items')
                .select(`
                    *,
                    products:product_id (name)
                `)
                .eq('order_id', order.id)

            if (error) throw error
            setOrderItems(data || [])
        } catch (err) {
            console.error("Error loading order items:", err)
            setOrderItems([])
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
        <div>
            <PageHeader
                title="My Orders"
                breadcrumb={["Member", "Order History"]}
            />

            {error && (
                <div className="mx-6 mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>
            )}

            <div className="p-6">
                {loading ? (
                    <p className="text-gray-500 text-center py-4">Loading orders...</p>
                ) : orders.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-lg p-10 text-center">
                        <p className="text-gray-500 text-lg">You haven't placed any orders yet.</p>
                        <p className="text-gray-400 text-sm mt-2">Go to Checkout to place your first order!</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <table className="min-w-full border border-gray-200">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="px-4 py-3 border">Order ID</th>
                                    <th className="px-4 py-3 border">Date</th>
                                    <th className="px-4 py-3 border">Status</th>
                                    <th className="px-4 py-3 border">Total</th>
                                    <th className="px-4 py-3 border">Discount</th>
                                    <th className="px-4 py-3 border">Points</th>
                                    <th className="px-4 py-3 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="text-center hover:bg-gray-50 transition">
                                        <td className="px-4 py-3 border text-sm">{order.id.slice(0, 8)}...</td>
                                        <td className="px-4 py-3 border text-sm">
                                            {new Date(order.created_at).toLocaleDateString("id-ID")}
                                        </td>
                                        <td className="px-4 py-3 border">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 border font-medium">
                                            Rp {Number(order.total_final).toLocaleString("id-ID")}
                                        </td>
                                        <td className="px-4 py-3 border text-green-600 text-sm">
                                            - Rp {Number(order.discount_amount).toLocaleString("id-ID")}
                                        </td>
                                        <td className="px-4 py-3 border text-blue-600">
                                            +{order.points_earned}
                                        </td>
                                        <td className="px-4 py-3 border">
                                            <button
                                                onClick={() => viewOrderDetail(order)}
                                                className="text-blue-500 hover:underline text-sm"
                                            >
                                                Detail
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Order Detail Modal */}
                {selectedOrder && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl max-h-[80vh] overflow-y-auto">
                            <h2 className="text-lg font-semibold mb-4">Order Detail</h2>

                            <div className="space-y-2 mb-4">
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Order ID:</span> {selectedOrder.id}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Date:</span> {new Date(selectedOrder.created_at).toLocaleString("id-ID")}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Status:</span>{" "}
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(selectedOrder.status)}`}>
                                        {selectedOrder.status}
                                    </span>
                                </p>
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="font-semibold text-sm mb-2">Items</h3>
                                {orderItems.length > 0 ? (
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="p-2 text-left">Product</th>
                                                <th className="p-2 text-center">Qty</th>
                                                <th className="p-2 text-right">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderItems.map((item) => (
                                                <tr key={item.id} className="border-t">
                                                    <td className="p-2">{item.products?.name || 'Unknown'}</td>
                                                    <td className="p-2 text-center">{item.quantity}</td>
                                                    <td className="p-2 text-right">
                                                        Rp {(Number(item.price_at_purchase) * item.quantity).toLocaleString("id-ID")}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-gray-500 text-sm">Loading items...</p>
                                )}
                            </div>

                            <div className="border-t pt-4 mt-4 space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Original:</span>
                                    <span>Rp {Number(selectedOrder.total_original).toLocaleString("id-ID")}</span>
                                </div>
                                <div className="flex justify-between text-sm text-green-600">
                                    <span>Discount:</span>
                                    <span>- Rp {Number(selectedOrder.discount_amount).toLocaleString("id-ID")}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg border-t pt-2">
                                    <span>Total:</span>
                                    <span>Rp {Number(selectedOrder.total_final).toLocaleString("id-ID")}</span>
                                </div>
                                <div className="flex justify-between text-sm text-blue-600">
                                    <span>Points Earned:</span>
                                    <span>+{selectedOrder.points_earned}</span>
                                </div>
                            </div>

                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => { setSelectedOrder(null); setOrderItems([]) }}
                                    className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
