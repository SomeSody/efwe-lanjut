import { useState } from "react";
import PageHeader from "../components/PageHeader";
import OrdersTable from "../components/OrdersTable";
import orders from "./orders.json";

export default function Orders() {
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        order_id: "", customer_name: "", status: "Pending", total_price: "", order_date: ""
    });

    return (
        <div id="orders-container">
            <PageHeader title="Orders Management" breadcrumb={["Orders Management"]}>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                    + Add Orders
                </button>
            </PageHeader>

            <div className="p-4">
                <OrdersTable data={orders.orders} />
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
                        <h2 className="text-lg font-semibold mb-4">Add Orders</h2>

                        {[
                            { field: "order_id", placeholder: "Order ID (e.g. O001)" },
                            { field: "customer_name", placeholder: "Customer Name" },
                            { field: "total_price", placeholder: "Total Price", type: "number" },
                            { field: "order_date", placeholder: "Order Date", type: "date" },
                        ].map(({ field, placeholder, type = "text" }) => (
                            <input
                                key={field}
                                type={type}
                                placeholder={placeholder}
                                className="w-full border rounded-lg px-3 py-2 mb-3 text-sm"
                                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                            />
                        ))}

                        <select
                            className="w-full border rounded-lg px-3 py-2 mb-4 text-sm"
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>

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