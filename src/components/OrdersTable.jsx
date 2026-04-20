export default function CustomerTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Customer Name</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Total Price</th>
            <th className="px-4 py-2 border">Order Date</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item, index) => (
            <tr key={index} className="text-center hover:bg-gray-50 transition">
              <td className="px-4 py-2 border">{item.order_id}</td>
              <td className="px-4 py-2 border">{item.customer_name}</td>
              <td className="px-4 py-2 border">{item.status}</td>
              <td className="px-4 py-2 border">{item.total_price}</td>
              <td className="px-4 py-2 border">{item.order_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
