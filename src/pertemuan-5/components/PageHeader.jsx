export default function PageHeader() {
    return (
        <div className="flex items-center justify-between p-4" id="pageheader-container">
            <div className="flex flex-col" id="pageheader-left">
                <span className="text-3xl font-semibold" id="page-title">
                    Dashboard
                </span>
                <div className="flex items-center font-medium space-x-2 mt-2" id="breadcrumb-links">
                    <span className="text-gray-500" id="breadcrumb-home">Dashboard</span>
                    <span className="text-gray-500" id="breadcrumb-separator">/</span>
                    <span className="text-gray-500" id="breadcrumb-current">Order List</span>
                </div>
            </div>
            <div id="action-button">
                <button className="bg-hijau text-white px-4 py-2 rounded-lg" id="add-button">
		                Add Button
		            </button>
            </div>
        </div>
    );
}