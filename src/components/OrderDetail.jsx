import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function OrderDetail() {
    const { id } = useParams()
    const [order, setOrder] = useState(null)
    const [items, setItems] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadOrder = async () => {
            try {
                const { data: orderData, error: orderError } = await supabase
                    .from('orders')
                    .select(`
                        *,
                        profiles:member_id (full_name, email)
                    `)
                    .eq('id', id)
                    .single()

                if (orderError) throw orderError
                setOrder(orderData)

                const { data: itemsData, error: itemsError } = await supabase
                    .from('order_items')
                    .select(`
                        *,
                        products:product_id (name)
                    `)
                    .eq('order_id', id)

                if (itemsError) throw itemsError
                setItems(itemsData || [])
            } catch (err) {
                setError("Order tidak ditemukan")
            }
        }
        loadOrder()
    }, [id])

    if (error) return <div className="text-red-600 p-4">{error}</div>
    if (!order) return <div className="p-4">Loading...</div>

    const getStatusBadge = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-700'
            case 'pending': return 'bg-yellow-100 text-yellow-700'
            case 'cancelled': return 'bg-red-100 text-red-700'
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
                Order Detail
            </h2>

            <div className="border-t pt-4 space-y-2">
                <p className="text-gray-600">
                    <span className="font-semibold">Order ID:</span> {order.id}
                </p>
                <p className="text-gray-600">
                    <span className="font-semibold">Customer:</span> {order.profiles?.full_name || order.profiles?.email || '-'}
                </p>
                <p className="text-gray-600">
                    <span className="font-semibold">Date:</span> {new Date(order.created_at).toLocaleString("id-ID")}
                </p>
                <p className="text-gray-600">
                    <span className="font-semibold">Status:</span>{" "}
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getStatusBadge(order.status)}`}>
                        {order.status}
                    </span>
                </p>

                <div className="mt-4 pt-4 border-t">
                    <h3 className="font-semibold text-lg mb-2">Order Items</h3>
                    {items.length > 0 ? (
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 text-left">Product</th>
                                    <th className="p-2 text-center">Qty</th>
                                    <th className="p-2 text-right">Price</th>
                                    <th className="p-2 text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id} className="border-t">
                                        <td className="p-2">{item.products?.name || 'Unknown'}</td>
                                        <td className="p-2 text-center">{item.quantity}</td>
                                        <td className="p-2 text-right">
                                            Rp {Number(item.price_at_purchase).toLocaleString("id-ID")}
                                        </td>
                                        <td className="p-2 text-right">
                                            Rp {(Number(item.price_at_purchase) * item.quantity).toLocaleString("id-ID")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500 text-sm">No items found.</p>
                    )}
                </div>

                <div className="mt-4 pt-4 border-t space-y-1">
                    <p className="text-gray-600 flex justify-between">
                        <span>Original Total:</span>
                        <span>Rp {Number(order.total_original).toLocaleString("id-ID")}</span>
                    </p>
                    <p className="text-green-600 flex justify-between">
                        <span>Discount:</span>
                        <span>- Rp {Number(order.discount_amount).toLocaleString("id-ID")}</span>
                    </p>
                    <p className="text-gray-800 font-semibold text-lg flex justify-between">
                        <span>Final Total:</span>
                        <span>Rp {Number(order.total_final).toLocaleString("id-ID")}</span>
                    </p>
                    <p className="text-blue-600 flex justify-between">
                        <span>Points Earned:</span>
                        <span>{order.points_earned}</span>
                    </p>
                </div>
            </div>

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-6"
                onClick={() => window.history.back()}
            >
                Back to Orders
            </button>
        </div>
    )
}