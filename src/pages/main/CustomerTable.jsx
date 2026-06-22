import { Link } from "react-router-dom"; 

export default function CustomerTable({ data, onEdit }) {
  const getTierBadgeColor = (tier) => {
    switch (tier) {
      case 'platinum': return 'bg-gray-800 text-white'
      case 'gold': return 'bg-yellow-400 text-gray-900'
      case 'silver': return 'bg-gray-300 text-gray-800'
      default: return 'bg-orange-300 text-gray-800'
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Tier</th>
            <th className="px-4 py-2 border">Points</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item) => (
            <tr key={item.id} className="text-center hover:bg-gray-50 transition">
              <td className="px-4 py-2 border">
                  <Link to={`/customer/${item.id}`} className="text-emerald-400 hover:text-emerald-500">
                        {item.full_name || '-'}
                  </Link>
              </td>
              <td className="px-4 py-2 border">{item.email}</td>
              <td className="px-4 py-2 border">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getTierBadgeColor(item.tier)}`}>
                  {item.tier}
                </span>
              </td>
              <td className="px-4 py-2 border">{item.points}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => onEdit(item)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}