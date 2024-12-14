import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { clsx } from 'clsx';
import { SidebarContent } from './SidebarContent';



export default function Sidebar({ isOpen, onToggle, activeLayer }) {
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
                <SidebarContent activeLayer={activeLayer} markersCount={0} />
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