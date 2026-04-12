import { useState } from "react";

import frameworkData from "./framework.json";

export default function FrameworkListSearchFilter() {
    const [dataForm, setDataForm] = useState({
			searchTerm: "",
			selectedTag: "",
			/*Tambah state lain beserta default value*/
			});
		
		/*Inisialisasi Handle perubahan nilai input form*/
		const handleChange = (evt) => {
			const { name, value } = evt.target;
			setDataForm({
				...dataForm,
				[name]: value,
			});
		};
    // const [searchTerm, setSearchTerm] = useState("");
    // const [selectedTag, setSelectedTag] = useState("");

    const _searchTerm = dataForm.searchTerm.toLowerCase();
    const filteredFrameworks = frameworkData.filter((framework) => {
        const matchesSearch =
        framework.name
                    .toLowerCase()
                    .includes(_searchTerm) ||
        framework.description
                    .toLowerCase()
                    .includes(_searchTerm) ||
        framework.details.developer
                    .toLowerCase()
                    .includes(_searchTerm);

        const matchesTag = dataForm.selectedTag ? framework.tags.includes(dataForm.selectedTag) : true;

        return matchesSearch && matchesTag;
    });

        const allTags = [
        ...new Set(frameworkData.flatMap((framework) => framework.tags)),
    ];

    return (
        <div className="p-8">
            <input
                type="text"
                name="searchTerm"
                placeholder="Search framework..."
                className="w-full p-2 border border-gray-300 rounded mb-4"
                onChange={handleChange}
            />

            <select
                name="selectedTag"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                onChange={handleChange}
            >
                <option value="">All Tags</option>
                    {allTags.map((tag, index) => (
                        <option key={index} value={tag}>
                        {tag}
                        </option>
                    ))}
            </select>

            {filteredFrameworks.map((item) => (
		            <div key={item.id} className="border p-4 mb-4 ml-5 inline-block w-100
                                                    hover:bg-amber-200 transition duration-300
                                                    rounded-lg shadow-md 
                                                    bg-white">
		                <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
		                <p className="text-gray-600">{item.description}</p>
		                
                        <p className="text-red-600">{item.details.developer}</p>
                        
                        <a href={item.details.officialWebsite} 
                            className="text-blue-600 underline" target="_blank">
                                Link?
                        </a>
                        <br></br>
                        {item.tags.map((tag,index)=>(
                            <div key={index} className="bg-blue-200 mb-1 text-center inline-block
                                                        hover:rotate-10 hover:bg-red-400
                                                        text-gray-700 px-2 py-1 text-xs 
                                                        rounded-full mr-2">
                                {tag}
                            </div>
                        ))}
		            </div>
            ))}
            </div>  
    )
}
