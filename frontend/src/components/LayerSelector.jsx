import { ChevronDown } from 'lucide-react';
import { MAP_LAYERS } from '../constants/mapLayers';

export default function LayerSelector({ selectedLayer, onLayerChange }) {
    return (
        <div className="absolute top-4 right-4 z-[1000]">
            <div className="relative">
                <select
                    value={selectedLayer}
                    onChange={(e) => onLayerChange(e.target.value)}
                    className="appearance-none bg-white px-4 py-2 pr-8 rounded-lg shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {MAP_LAYERS.map((layer) => (
                        <option key={layer.id} value={layer.id}>
                            {layer.name}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
        </div>
    );
}