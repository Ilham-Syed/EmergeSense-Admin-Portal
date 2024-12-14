
export function SidebarContent({ activeLayer, markersCount }) {
    return (
        <div className="space-y-4">
            <div className="p-4 bg-gray-100 rounded-lg">
                <h3 className="font-semibold mb-2">Map Information</h3>
                <p className="text-sm text-gray-600">
                    This interactive map allows you to explore different map layers and locations.
                    Use the layer selector in the top right to switch between different map views.
                </p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
                <h3 className="font-semibold mb-2">Statistics</h3>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Markers</span>
                        <span className="font-medium">{markersCount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Active Layer</span>
                        <span className="font-medium">{activeLayer}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}