export default function InputField({ label, name, placeholder, onChange, error }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">{label}</label>
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
                    error ? "border-red-500" : "border-gray-300"
                }`}
                onChange={onChange}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}