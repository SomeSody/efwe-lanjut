import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function CustomerDetail() {
    const { id } = useParams()
    const [customer, setCustomer] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadCustomer = async () => {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (error) throw error
                setCustomer(data)
            } catch (err) {
                setError("Customer tidak ditemukan")
            }
        }
        loadCustomer()
    }, [id])

    if (error) return <div className="text-red-600 p-4">{error}</div>
    if (!customer) return <div className="p-4">Loading...</div>

    const getTierBadgeColor = (tier) => {
        switch (tier) {
            case 'platinum': return 'bg-gray-800 text-white'
            case 'gold': return 'bg-yellow-400 text-gray-900'
            case 'silver': return 'bg-gray-300 text-gray-800'
            default: return 'bg-orange-300 text-gray-800'
        }
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-6">
            <div className="w-20 h-20 rounded-full bg-blue-500 text-white
                flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                {(customer.full_name || customer.email).charAt(0).toUpperCase()}
            </div>

            <h2 className="text-2xl font-bold mb-2 text-center">
                {customer.full_name || customer.email}
            </h2>

            <p className="text-gray-600 mb-1">Email: {customer.email}</p>
            <p className="text-gray-600 mb-1">Role: <span className="capitalize">{customer.role}</span></p>
            <p className="text-gray-600 mb-1">
                Tier: <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getTierBadgeColor(customer.tier)}`}>
                    {customer.tier}
                </span>
            </p>
            <p className="text-gray-800 font-semibold text-lg">
                Points: {customer.points}
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