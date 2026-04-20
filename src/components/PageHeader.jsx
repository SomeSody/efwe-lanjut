export default function PageHeader({ title, breadcrumb, children }) {
    return (
        <div className="flex items-center justify-between p-4" id="pageheader-container">
            <div className="flex flex-col" id="pageheader-left">
                
                <span className="text-3xl font-semibold" id="page-title">
                    {title}
                </span>

                <div className="flex items-center font-medium space-x-2 mt-2" id="breadcrumb-links">
                    {Array.isArray(breadcrumb) ? (
                        breadcrumb.map((item, index) => (
                            <span key={index} className="flex items-center space-x-2">
                                <span className="text-gray-500">{item}</span>
                                {index < breadcrumb.length - 1 && (
                                    <span className="text-gray-500">/</span>
                                )}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-500">{breadcrumb}</span>
                    )}
                </div>
            </div>
            <div id="action-button">
                {children}
            </div>
        </div>
    );
}