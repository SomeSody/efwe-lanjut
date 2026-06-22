import { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import CustomerTable from "./CustomerTable";
import { supabase } from "../../lib/supabaseClient";

export default function Customer() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState({ full_name: "", email: "", role: "member", tier: "bronze" });
  const [error, setError] = useState("")

  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'member')
        .order('updated_at', { ascending: false })

      if (error) throw error
      setCustomers(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      setError("")
      if (editId) {
        const { error } = await supabase
          .from('profiles')
          .update({
            full_name: form.full_name,
            tier: form.tier,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editId)
        if (error) throw error
      } else {
        // Creating customers manually is admin-only; normally they register
        // This updates an existing profile
        setError("Customers must register through the registration page.")
        return
      }

      setShowModal(false)
      setEditId(null)
      setForm({ full_name: "", email: "", role: "member", tier: "bronze" })
      loadCustomers()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEdit = (customer) => {
    setEditId(customer.id)
    setForm({
      full_name: customer.full_name || "",
      email: customer.email,
      role: customer.role,
      tier: customer.tier,
    })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditId(null)
    setForm({ full_name: "", email: "", role: "member", tier: "bronze" })
  }

  return (
    <div>
      <PageHeader title="Customer Management" 
                  breadcrumb={["Customer Management"]}>
        <button
          onClick={() => { closeModal(); setShowModal(true) }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          + Add Customer
        </button>
      </PageHeader>

      {error && (
        <div className="mx-4 mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="p-4">
        {loading ? (
          <p className="text-gray-500 text-center py-4">Loading customers...</p>
        ) : (
          <CustomerTable data={customers} onEdit={handleEdit} />
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">
              {editId ? "Edit Customer" : "Add Customer"}
            </h2>
            <input
              placeholder="Full Name"
              value={form.full_name}
              className="w-full border rounded-lg px-3 py-2 mb-3 text-sm"
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            />
            <input
              placeholder="Email"
              value={form.email}
              disabled={!!editId}
              className="w-full border rounded-lg px-3 py-2 mb-3 text-sm disabled:bg-gray-100"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <select
              value={form.tier}
              className="w-full border rounded-lg px-3 py-2 mb-3 text-sm"
              onChange={(e) => setForm({ ...form, tier: e.target.value })}
            >
              <option value="bronze">Bronze</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
              <option value="platinum">Platinum</option>
            </select>
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