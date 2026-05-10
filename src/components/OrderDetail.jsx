import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import data from "./orders.json"

export default function OrderDetail() {
    const { id } = useParams()
    const [order, setOrder] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const foundOrder = data.orders.find(
            (item) => item.order_id === id
        )

        if (!foundOrder) {
            setError("Order tidak ditemukan")
            return
        }

        setOrder(foundOrder)
    }, [id])

    if (error) return <div className="text-red-600 p-4">{error}</div>
    if (!order) return <div className="p-4">Loading...</div>

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
                Detail Order #{order.order_id}
            </h2>

            <div className="border-t pt-4 space-y-2">
                <p className="text-gray-600">
                    <span className="font-semibold">Customer:</span> {order.customer_name}
                </p>
                <p className="text-gray-600">
                    <span className="font-semibold">Tanggal Order:</span> {order.order_date}
                </p>
                <p className="text-gray-600">
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            order.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : order.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {order.status}
                    </span>
                </p>
                <p className="text-gray-800 font-semibold text-lg mt-3">
                    Total: Rp {order.total_price.toLocaleString("id-ID")}
                </p>
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