import PageHeader from "../../components/PageHeader";
import data from "./produk.json";
import { Link } from "react-router-dom";

export default function Produk() {
    return (
        <div>
            <PageHeader
                title="Produk"
                breadcrumb={["Dashboard", "Produk"]}
            >
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Product
                </button>
            </PageHeader>

            <div className="p-4">
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">Code</th>
                            <th className="p-2">Title</th>
                            <th className="p-2">Category</th>
                            <th className="p-2">Brand</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.products.map((item, index) => (
                            <tr key={index} className="text-center border-t">
                                <td className="p-2">{item.code}</td>
                                <td className="px-6 py-4">
                                    <Link to={`/products/${item.id}`} className="text-emerald-400 hover:text-emerald-500">
                                        {item.title}
                                    </Link>
                                </td>
                                <td className="p-2">{item.category}</td>
                                <td className="p-2">{item.brand}</td>
                                <td className="p-2">
                                    Rp {item.price.toLocaleString()}
                                </td>
                                <td className="p-2">{item.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

