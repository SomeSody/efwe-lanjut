import { useState } from "react";

import airData from "./airports.json";
import AirportView from "./AirportView";

export default function Airport() {
    const [dataForm, setDataForm] = useState({
        searchTerm: "",
        selectedCountry: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const _searchTerm = dataForm.searchTerm.toLowerCase();

    const filteredAir = airData.airports.filter((airport) => {
        const matchesSearch =
            airport.code.toLowerCase().includes(_searchTerm) ||
            airport.name.toLowerCase().includes(_searchTerm) ||
            airport.city.toLowerCase().includes(_searchTerm) ||
            airport.country.toLowerCase().includes(_searchTerm);

        const matchesCountry = dataForm.selectedCountry
            ? airport.country === dataForm.selectedCountry
            : true;

        return matchesSearch && matchesCountry;
    });

    const allCountries = [...new Set(airData.airports.map((a) => a.country))];

    return (
        <div className="p-8">
            <input
                type="text"
                name="searchTerm"
                placeholder="Search airports..."
                className="w-full p-2 border border-gray-300 rounded mb-4"
                onChange={handleChange}
            />

            <select
                name="selectedCountry"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                onChange={handleChange}
            >
                <option value="">All Countries</option>
                {allCountries.map((country, index) => (
                    <option key={index} value={country}>
                        {country}
                    </option>
                ))}
            </select>

            <AirportView dataList={filteredAir} />
        </div>
    );
}