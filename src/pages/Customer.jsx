import { useState } from "react";
import PageHeader from "../components/PageHeader";
import CustomerTable from "../components/CustomerTable";
import customers from "./customers.json";

export default function Customer() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", status: "Active" });

  return (
    <div>
      <PageHeader title="Customer Management" breadcrumb={["Customer Management"]}>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          + Add Customer
        </button>
      </PageHeader>

      <div className="p-4">
        <CustomerTable data={customers.customers} />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Add Customer</h2>
            {["name", "email", "phone"].map((field) => (
              <input
                key={field}
                placeholder={field}
                className="w-full border rounded-lg px-3 py-2 mb-3 text-sm"
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              />
            ))}
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm border rounded-lg">Cancel</button>
              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}