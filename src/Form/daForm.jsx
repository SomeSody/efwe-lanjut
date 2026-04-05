import { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";

const hargaLayanan = {
    cuci: 5000,
    cuci_setrika: 8000,
};

const Kecepatan = {
    reguler: 1,
    express: 1.5,
};

export default function Aform() {

    const [form, setForm] = useState({
        nama: "",
        berat: "",
        catatan: "",
        layanan: "",
        kecepatan: ""
    });

    const [errors, setErrors] = useState({});
    const [result, setResult] = useState(null);

    const validate = (data) => {
        const newErrors = {};

        if (!data.nama.trim())
            newErrors.nama = "Nama tidak boleh kosong";
        else if (data.nama.length < 3)
            newErrors.nama = "Nama minimal 3 karakter";
        else if (/\d/.test(data.nama))
            newErrors.nama = "Nama tidak boleh mengandung angka";

        if (!data.berat.trim())
            newErrors.berat = "Berat tidak boleh kosong";
        else if (isNaN(data.berat))
            newErrors.berat = "Berat harus berupa angka";
        else if (Number(data.berat) < 1)
            newErrors.berat = "Berat minimal 1 kg";

        if (!data.catatan.trim())
            newErrors.catatan = "Catatan tidak boleh kosong";
        else if (data.catatan.length < 5)
            newErrors.catatan = "Catatan minimal 5 karakter";
        else if (data.catatan.length > 100)
            newErrors.catatan = "Catatan maksimal 100 karakter";

        if (!data.layanan)
            newErrors.layanan = "Layanan harus dipilih";

        if (!data.kecepatan)
            newErrors.kecepatan = "Kecepatan harus dipilih";

        return newErrors;
    };

    const handleChange = (e) => {
        const updated = { ...form, [e.target.name]: e.target.value };
        setForm(updated);
        setErrors(validate(updated));
        setResult(null);
    };

    const handleSubmit = () => {
        const harga = hargaLayanan[form.layanan] * Number(form.berat) * Kecepatan[form.kecepatan];
        setResult({
            ...form,
            totalHarga: harga,
        });
    };

    const semuaTerisi = Object.values(form).every((v) => v.trim() !== "");
    const tidakAdaError = Object.keys(errors).length === 0;
    const bolehSubmit = semuaTerisi && tidakAdaError;

    return (
        <div className="flex flex-col items-center justify-center m-10 p-5 bg-gray-100 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-1 text-gray-700">Form Laundry</h2>
                <p className="text-center text-gray-400 text-sm mb-5">Isi data untuk menghitung biaya laundry</p>

                <InputField
                    label="Nama Pelanggan"
                    name="nama"
                    placeholder="Masukkan nama lengkap"
                    onChange={handleChange}
                    error={errors.nama}
                />

                <InputField
                    label="Berat Cucian (kg)"
                    name="berat"
                    placeholder="Contoh: 3"
                    onChange={handleChange}
                    error={errors.berat}
                />

                <InputField
                    label="Catatan"
                    name="catatan"
                    placeholder="Contoh: jangan pakai pewangi"
                    onChange={handleChange}
                    error={errors.catatan}
                />

                <SelectField
                    label="Layanan"
                    name="layanan"
                    options={[
                        { value: "cuci", label: "Cuci Saja (Rp5.000/kg)" },
                        { value: "cuci_setrika", label: "Cuci + Setrika (Rp8.000/kg)" },
                    ]}
                    onChange={handleChange}
                    error={errors.layanan}
                />

                <SelectField
                    label="Kecepatan"
                    name="kecepatan"
                    options={[
                        { value: "reguler", label: "Reguler (normal)" },
                        { value: "express", label: "Express (1.5x harga)" },
                    ]}
                    onChange={handleChange}
                    error={errors.kecepatan}
                />

                {bolehSubmit && (
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-500 text-white py-2 rounded 
						hover:bg-blue-600 transition font-semibold"
                    >
                        Hitung & Kirim
                    </button>
                )}

                {result && (
                    <div className="mt-5 p-4 bg-green-50 border border-green-300 rounded-lg">
                        <h3 className="text-lg font-semibold text-green-700 mb-2">Hasil Pesanan</h3>
                        <table className="w-full text-sm text-gray-700">
                            <tbody>
                                <tr><td className="py-1 font-medium">Nama</td><td>: {result.nama}</td></tr>
                                <tr><td className="py-1 font-medium">Berat</td><td>: {result.berat} kg</td></tr>
                                <tr><td className="py-1 font-medium">Layanan</td><td>: {result.layanan === "cuci" ? "Cuci Saja" : "Cuci + Setrika"}</td></tr>
                                <tr><td className="py-1 font-medium">Kecepatan</td><td>: {result.kecepatan === "reguler" ? "Reguler" : "Express"}</td></tr>
                                <tr><td className="py-1 font-medium">Catatan</td><td>: {result.catatan}</td></tr>
                                <tr className="border-t border-green-300">
                                    <td className="pt-2 font-bold text-green-700">Total</td>
                                    <td className="pt-2 font-bold text-green-700">
                                        : Rp{result.totalHarga.toLocaleString("id-ID")}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}