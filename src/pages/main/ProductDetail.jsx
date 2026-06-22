import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (error) throw error
                setProduct(data)
            } catch (err) {
                setError(err.message)
            }
        }
        loadProduct()
    }, [id])

    if (error) return <div className="text-red-600 p-4">{error}</div>
    if (!product) return <div className="p-4">Loading...</div>

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-6">
            <div className="rounded-xl mb-4 w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-6xl opacity-40">📦</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            {product.description && (
                <p className="text-gray-600 mb-2">{product.description}</p>
            )}
            <p className="text-gray-600 mb-1">Stock: {product.stock}</p>
            <p className="text-gray-800 font-semibold text-lg">
                Harga: Rp {Number(product.price).toLocaleString("id-ID")}
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={() => window.history.back()}>
                Back to Products
            </button>
        </div>
    )
}