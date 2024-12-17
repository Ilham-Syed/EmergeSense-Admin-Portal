import React, { useState } from 'react';
import {PanelLeftClose, PanelLeftOpen} from 'lucide-react';


function SidebarComponent() {
    // State to manage sidebar open/close
    const [isOpen, setIsOpen] = useState(true);

    // Toggle function
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div 
                className='flex items-center bg-gray-800 text-white '
            >
                <div
                    className={`h-screen transition-all duration-300 ${isOpen ? 'w-[400px]' : 'w-0'}`}
                    style={{ overflow: 'hidden' }}
                >
                    <div className="h-full flex justify-between items-center">
                        <div className="p-4">SidebarComponent</div>
                    </div>
                </div>
                <button
                    onClick={toggleSidebar}
                >
                    {!isOpen ? <PanelLeftOpen /> : <PanelLeftClose />}
                </button>
            </div>
        </>
    );
}

export default SidebarComponent;
