import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import data from "./customers.json"

export default function CustomerDetail() {
    const { id } = useParams()
    const [customer, setCustomer] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const foundCustomer = data.customers.find(
            (item) => item.customer_id === id
        )

        if (!foundCustomer) {
            setError("Customer tidak ditemukan")
            return
        }

        setCustomer(foundCustomer)
    }, [id])

    if (error) return <div className="text-red-600 p-4">{error}</div>
    if (!customer) return <div className="p-4">Loading...</div>

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-6">
            <div className="w-20 h-20 rounded-full bg-blue-500 text-white
                flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                {customer.customer_name.charAt(0)}
            </div>

            <h2 className="text-2xl font-bold mb-2 text-center">
                {customer.customer_name}
            </h2>

            <p className="text-gray-600 mb-1">Customer ID: {customer.customer_id}</p>
            <p className="text-gray-600 mb-1">Email: {customer.email}</p>
            <p className="text-gray-600 mb-1">Phone: {customer.phone}</p>
            <p className="text-gray-800 font-semibold text-lg">
                Loyalty: {customer.loyalty}
            </p>

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                onClick={() => window.history.back()}
            >
                Back to Customers
            </button>
        </div>
    )
}