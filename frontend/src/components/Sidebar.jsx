import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { clsx } from 'clsx';


export default function Sidebar({ isOpen, onToggle }) {
    return (
        <div
            className={clsx(
                'fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 z-[1001]',
                isOpen ? 'translate-x-0' : '-translate-x-full'
            )}
            style={{ width: '300px' }}
        >
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Dashboard</h2>
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
                                <span className="font-medium">0</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Active Layer</span>
                                <span className="font-medium">OpenStreetMap</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button
                onClick={onToggle}
                className="absolute -right-10 top-4 bg-white p-2 rounded-r-lg shadow-lg"
                aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
            >
                {isOpen ? (
                    <PanelLeftClose className="w-5 h-5" />
                ) : (
                    <PanelLeftOpen className="w-5 h-5" />
                )}
            </button>
        </div>
    );
}