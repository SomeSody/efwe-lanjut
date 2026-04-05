import { useState } from "react";

export default function Aform() {

    const [form, setForm] = useState({
        nama: "",
        berat: "",
        catatan: "",
        layanan: "",
        kecepatan: ""
    });

	const [errors, setErrors] = useState({});
	const [isValid, setIsValid] = useState(false);
	const [result, setResult] = useState(null);
	
    return(
        <div className="flex flex-col items-center justify-center m-10 p-5 bg-gray-100">
			<div className="bg-white p-6 rounded-lg shadow-lg w-110">
				<h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">Anu</h2>

                <div className="mb-4">
					<label className="block text-gray-700 font-medium mb-1">
						Nama
					</label>
					<input
						type="text"
						placeholder="Masukkan Nama"
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setForm({...form, nama: e.target.value})}
                    />
                </div>

                <div className="mb-4">
					<label className="block text-gray-700 font-medium mb-1">
						Berat
					</label>
					<input
						type="text"
						placeholder="Masukkan Nama"
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setForm({...form, berat: e.target.value})}
                    />
                </div>

                <div className="mb-4">
					<label className="block text-gray-700 font-medium mb-1">
						Catatan
					</label>
					<input
						type="text"
						placeholder="Masukkan Nama"
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setForm({...form, catatan: e.target.value})}
                    />
                </div>

                <div className="mb-4">
					<label className="block text-gray-700 font-medium mb-1">
						Layanan
					</label>
					
					<select
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
						onChange={(e) => setForm({...form, layanan: e.target.value})}
					>
						<option value="">-- Pilih Layanan --</option>
						<option value="cuci">Cuci Saja</option>
						<option value="cuci_setrika">Cuci + Setrika</option>
					</select>
				</div>

                <div className="mb-4">
					<label className="block text-gray-700 font-medium mb-1">
						Kecepatan
					</label>
					
					<select
						className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
						onChange={(e) => setForm({...form, layanan: e.target.value})}
					>
						<option value="">-- Pilih Kecepatan --</option>
						<option value="cuci">Reguler</option>
						<option value="cuci_setrika">Express</option>
					</select>
				</div>
            </div>
        </div>
    );
}