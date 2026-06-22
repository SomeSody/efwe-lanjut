import { useEffect, useState } from "react";
import Card from "../../components/Card";
import PageHeader from "../../components/PageHeader";
import { supabase } from "../../lib/supabaseClient";
import { Link } from "react-router-dom";

export default function Produk() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editId, setEditId] = useState(null)
    const [form, setForm] = useState({ name: "", description: "", price: "", stock: "" })
    const [error, setError] = useState("")

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setProducts(data || [])
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async () => {
        try {
            setError("")
            const productData = {
                name: form.name,
                description: form.description || null,
                price: parseFloat(form.price),
                stock: parseInt(form.stock),
            }

            if (editId) {
                const { error } = await supabase
                    .from('products')
                    .update(productData)
                    .eq('id', editId)
                if (error) throw error
            } else {
                const { error } = await supabase
                    .from('products')
                    .insert([productData])
                if (error) throw error
            }

            setShowModal(false)
            setEditId(null)
            setForm({ name: "", description: "", price: "", stock: "" })
            loadProducts()
        } catch (err) {
            setError(err.message)
        }
    }

    const handleEdit = (product) => {
        setEditId(product.id)
        setForm({
            name: product.name,
            description: product.description || "",
            price: product.price.toString(),
            stock: product.stock.toString(),
        })
        setShowModal(true)
    }

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this product?")) return
        try {
            const { error } = await supabase.from('products').delete().eq('id', id)
            if (error) throw error
            loadProducts()
        } catch (err) {
            setError(err.message)
        }
    }

    const closeModal = () => {
        setShowModal(false)
        setEditId(null)
        setForm({ name: "", description: "", price: "", stock: "" })
    }

    return (
        <div>
            <PageHeader
                title="Produk"
                breadcrumb={["Dashboard", "Produk"]}
            >
                <button
                    onClick={() => { closeModal(); setShowModal(true) }}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Product
                </button>
            </PageHeader>

            {error && (
                <div className="mx-4 mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <Card>
                {loading ? (
                    <p className="text-gray-500 text-center py-4">Loading products...</p>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2">Name</th>
                                <th className="p-2">Description</th>
                                <th className="p-2">Price</th>
                                <th className="p-2">Stock</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item) => (
                                <tr key={item.id} className="text-center border-t">
                                    <td className="px-6 py-4">
                                        <Link to={`/products/${item.id}`} className="text-emerald-400 hover:text-emerald-500">
                                            {item.name}
                                        </Link>
                                    </td>
                                    <td className="p-2 text-sm text-gray-500">{item.description || '-'}</td>
                                    <td className="p-2">
                                        Rp {Number(item.price).toLocaleString("id-ID")}
                                    </td>
                                    <td className="p-2">{item.stock}</td>
                                    <td className="p-2">
                                        <div className="flex gap-2 justify-center">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="bg-yellow-400 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </Card>

            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
                        <h2 className="text-lg font-semibold mb-4">
                            {editId ? "Edit Product" : "Add Product"}
                        </h2>
                        {["name", "description", "price", "stock"].map((field) => (
                            <input
                                key={field}
                                type={field === "price" || field === "stock" ? "number" : "text"}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                value={form[field]}
                                className="w-full border rounded-lg px-3 py-2 mb-3 text-sm"
                                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                            />
                        ))}
                        <div className="flex gap-2 justify-end">
                            <button onClick={closeModal} className="px-4 py-2 text-sm border rounded-lg">Cancel</button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
                            >
                                {editId ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
