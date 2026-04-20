const deliveries = [
    { id: "001", pelanggan: "Budi", alamat: "Jl. Merdeka 1", kurir: "JNE", status: "Terkirim" },
    { id: "002", pelanggan: "Siti", alamat: "Jl. Sudirman 2", kurir: "J&T", status: "Dalam Perjalanan" },
    { id: "003", pelanggan: "Andi", alamat: "Jl. Malioboro 3", kurir: "SiCepat", status: "Dibatalkan" },
    { id: "004", pelanggan: "Rina", alamat: "Jl. Diponegoro 4", kurir: "JNE", status: "Terkirim" },
    { id: "005", pelanggan: "Dewi", alamat: "Jl. Gatot Subroto 5", kurir: "AnterAja", status: "Dalam Perjalanan" },
];

const statusStyle = {
    Terkirim: "bg-green-100 text-green-700",
    "Dalam Perjalanan": "bg-blue-100 text-blue-700",
    Dibatalkan: "bg-red-100 text-red-700",
};

export default function DeliveryList() {
    return (
        <div className="bg-white rounded-lg shadow-md p-5 w-full" id="delivery-list-container">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-semibold text-gray-700">Delivery List</h2>
                <span className="text-xs text-gray-400">5 pengiriman terbaru</span>
            </div>

            <table className="w-full text-sm">
                <thead>
                    <tr className="text-left text-gray-400 border-b text-xs">
                        <th className="pb-2 font-medium">No.</th>
                        <th className="pb-2 font-medium">Pelanggan</th>
                        <th className="pb-2 font-medium">Alamat</th>
                        <th className="pb-2 font-medium">Kurir</th>
                        <th className="pb-2 font-medium">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {deliveries.map((item) => (
                        <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                            <td className="py-2 text-gray-400">{item.id}</td>
                            <td className="py-2 text-gray-700">{item.pelanggan}</td>
                            <td className="py-2 text-gray-700">{item.alamat}</td>
                            <td className="py-2 text-gray-700">{item.kurir}</td>
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