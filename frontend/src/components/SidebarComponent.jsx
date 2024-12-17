import React, { useState } from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import axios from 'axios';

function SidebarComponent({
    locationMappings,
    setLocationMappings
}) {
    const [isOpen, setIsOpen] = useState(true);


    const handleFetchLocations = async () => {
        try {
            const response = await axios.get("http://localhost:3000/admin/locationMapping");
            console.log(response.data);

            setLocationMappings(response.data);

        } catch (error) {
            console.log(error);

        }
    }

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="relative flex items-start min-h-screen">
                {/* Sidebar */}
                <div
                    className={`h-screen bg-gray-900 bg-opacity-70 backdrop-blur-md text-white shadow-md transition-all duration-500 ${isOpen ? 'w-[350px]' : 'w-0'
                        }`}
                    style={{ overflow: 'hidden' }}
                >
                    <div className="h-full flex flex-col justify-center items-center">
                        <h2 className="text-2xl font-bold mb-6">Sidebar Menu</h2>
                        <button
                            onClick={handleFetchLocations}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
                        >
                            Fetch Map Locations
                        </button>
                    </div>
                </div>

                {/* Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className="absolute top-1/2 tranform -translate-y-1/2 left-[350px] bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-md transition-transform transform hover:scale-110"
                    style={{ zIndex: 10 }}
                >
                    {isOpen ? <PanelLeftClose size={24} /> : <PanelLeftOpen size={24} />}
                </button>
            </div>
        </>
    );
}

export default SidebarComponent;
