import { useState } from "react";

export default function ProfileMenu() {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            {/* Avatar */}
            <img
                src="/img/syahul.jpg"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setOpen(!open)}
            />

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-xl p-2 z-50">
                    <ul className="text-sm">
                        <li className="p-2 hover:bg-gray-100 cursor-pointer rounded">
                            Ganti nama
                        </li>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer rounded">
                            Ganti Foto
                        </li>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer rounded">
                            Settings
                        </li>
                        <li className="p-2 hover:bg-red-100 text-red-500 cursor-pointer rounded">
                            Logout
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}