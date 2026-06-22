import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { useAuth } from "../../contexts/AuthContext"
import PageHeader from "../../components/PageHeader"

const TIER_DISCOUNT = {
    bronze: 5,
    silver: 10,
    gold: 15,
    platinum: 20,
}

function calculateTier(points) {
    if (points > 7000) return 'platinum'
    if (points > 3000) return 'gold'
    if (points > 1000) return 'silver'
    return 'bronze'
}

export default function Checkout() {
    const { profile, refreshProfile } = useAuth()
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .gt('stock', 0)
                .order('name')

            if (error) throw error
            setProducts(data || [])
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const updateQuantity = (productId, delta) => {
        setCart((prev) => {
            const current = prev[productId] || 0
            const product = products.find((p) => p.id === productId)
            const newQty = Math.max(0, Math.min(current + delta, product?.stock || 0))

            if (newQty === 0) {
                const { [productId]: _, ...rest } = prev
                return rest
            }
            return { ...prev, [productId]: newQty }
        })
    }

    const setQuantity = (productId, qty) => {
        const product = products.find((p) => p.id === productId)
        const newQty = Math.max(0, Math.min(qty, product?.stock || 0))

        setCart((prev) => {
            if (newQty === 0) {
                const { [productId]: _, ...rest } = prev
                return rest
            }
            return { ...prev, [productId]: newQty }
        })
    }

    const cartItems = Object.entries(cart).map(([productId, quantity]) => {
        const product = products.find((p) => p.id === productId)
        return { ...product, quantity }
    }).filter((item) => item.name)

    const totalOriginal = cartItems.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity, 0
    )

    const tier = profile?.tier || 'bronze'
    const discountPercent = TIER_DISCOUNT[tier] || 5
    const discountAmount = Math.round(totalOriginal * (discountPercent / 100))
    const totalFinal = totalOriginal - discountAmount
    const pointsEarned = Math.floor(totalFinal / 10000)

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            setError("Your cart is empty.")
            return
        }

        setProcessing(true)
        setError("")
        setSuccess("")

        try {
            // 1. Insert order
            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .insert([{
                    member_id: profile.id,
                    total_original: totalOriginal,
                    discount_amount: discountAmount,
                    total_final: totalFinal,
                    points_earned: pointsEarned,
                    status: 'pending',
                }])
                .select()
                .single()

            if (orderError) throw orderError

            // 2. Insert order items
            const orderItems = cartItems.map((item) => ({
                order_id: orderData.id,
                product_id: item.id,
                product_name: item.name,
                quantity: item.quantity,
                price_at_purchase: Number(item.price),
                subtotal: Number(item.price) * item.quantity,
            }))

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems)

            if (itemsError) throw itemsError

            // 3. Reduce stock for each product
            for (const item of cartItems) {
                const { error: stockError } = await supabase
                    .from('products')
                    .update({ stock: item.stock - item.quantity })
                    .eq('id', item.id)

                if (stockError) {
                    console.error(`Failed to update stock for ${item.name}:`, stockError)
                }
            }

            // 4. Update member points and tier
            const newPoints = (profile.points || 0) + pointsEarned
            const newTier = calculateTier(newPoints)

            const { error: profileError } = await supabase
                .from('profiles')
                .update({ points: newPoints, tier: newTier, updated_at: new Date().toISOString() })
                .eq('id', profile.id)

            if (profileError) {
                console.error("Failed to update profile:", profileError)
            }

            // Refresh profile in context
            await refreshProfile()

            // Reset cart
            setCart({})
            setSuccess(`Order placed successfully! You earned ${pointsEarned} points. ${newTier !== tier ? `You've been upgraded to ${newTier}!` : ''}`)
            loadProducts() // Refresh product stock
        } catch (err) {
            setError(err.message || "Checkout failed. Please try again.")
        } finally {
            setProcessing(false)
        }
    }

    return (
        <div>
            <PageHeader
                title="Checkout"
                breadcrumb={["Member", "Checkout"]}
            />

            {error && (
                <div className="mx-6 mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>
            )}
            {success && (
                <div className="mx-6 mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">{success}</div>
            )}

            <div className="p-6 flex gap-6">
                {/* Products List */}
                <div className="flex-1">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Products</h3>
                        {loading ? (
                            <p className="text-gray-500">Loading products...</p>
                        ) : products.length === 0 ? (
                            <p className="text-gray-500">No products available.</p>
                        ) : (
                            <div className="space-y-3">
                                {products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                    >
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">{product.name}</p>
                                            <p className="text-sm text-gray-500">
                                                Rp {Number(product.price).toLocaleString("id-ID")} | Stock: {product.stock}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(product.id, -1)}
                                                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                value={cart[product.id] || 0}
                                                onChange={(e) => setQuantity(product.id, parseInt(e.target.value) || 0)}
                                                className="w-12 text-center border rounded py-1 text-sm"
                                                min="0"
                                                max={product.stock}
                                            />
                                            <button
                                                onClick={() => updateQuantity(product.id, 1)}
                                                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Cart Summary */}
                <div className="w-96">
                    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Cart Summary</h3>

                        {cartItems.length === 0 ? (
                            <p className="text-gray-500 text-sm">Your cart is empty.</p>
                        ) : (
                            <div className="space-y-3 mb-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-gray-600 truncate flex-1">
                                            {item.name} x{item.quantity}
                                        </span>
                                        <span className="text-gray-800 font-medium ml-2">
                                            Rp {(Number(item.price) * item.quantity).toLocaleString("id-ID")}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Subtotal</span>
                                <span>Rp {totalOriginal.toLocaleString("id-ID")}</span>
                            </div>
                            <div className="flex justify-between text-sm text-green-600">
                                <span>Discount ({tier} - {discountPercent}%)</span>
                                <span>- Rp {discountAmount.toLocaleString("id-ID")}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2">
                                <span>Total</span>
                                <span>Rp {totalFinal.toLocaleString("id-ID")}</span>
                            </div>
                            <div className="flex justify-between text-sm text-blue-600">
                                <span>Points to earn</span>
                                <span>+{pointsEarned}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={processing || cartItems.length === 0}
                            className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg
                                transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? "Processing..." : "Place Order"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
