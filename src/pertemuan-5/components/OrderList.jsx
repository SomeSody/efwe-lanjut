const orders = [
    { id: "001", pesanan: "Nasi Goreng Spesial", jumlah: "Rp 45.000", status: "Terkirim" },
    { id: "002", pesanan: "Mie Ayam Bakso", jumlah: "Rp 30.000", status: "Diproses" },
    { id: "003", pesanan: "Soto Betawi", jumlah: "Rp 28.000", status: "Dibatalkan" },
    { id: "004", pesanan: "Ayam Bakar Madu", jumlah: "Rp 55.000", status: "Terkirim" },
    { id: "005", pesanan: "Es Teh Manis", jumlah: "Rp 8.000", status: "Diproses" },
];

const statusStyle = {
    Terkirim: "bg-green-100 text-green-700",
    Diproses: "bg-yellow-100 text-yellow-700",
    Dibatalkan: "bg-red-100 text-red-700",
};

export default function OrderList() {
    return (
        <div className="bg-white rounded-lg shadow-md p-5" w-full id="order-list-container">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-semibold text-gray-700">Order List</h2>
                <span className="text-xs text-gray-400">5 pesanan terbaru</span>
            </div>
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-left text-gray-400 border-b text-xs">
                        <th className="pb-2 font-medium">No.</th>
                        <th className="pb-2 font-medium">Pesanan</th>
                        <th className="pb-2 font-medium">Jumlah</th>
                        <th className="pb-2 font-medium">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((item) => (
                        <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                            <td className="py-2 text-gray-400">{item.id}</td>
                            <td className="py-2 text-gray-700">{item.pesanan}</td>
                            <td className="py-2 text-gray-700">{item.jumlah}</td>
                            <td className="py-2">
                                <span className={`text-xs font-medium px-2 py-1 rounded ${statusStyle[item.status]}`}>
                                    {item.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}