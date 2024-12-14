import { useState } from 'react';
import Map from './components/MapContainer';
import LayerSelector from './components/LayerSelector';
import Sidebar from './components/Sidebar';
import { DEFAULT_CENTER, DEFAULT_ZOOM, DEFAULT_LAYER } from './constants/mapDefaults';
import { findMapLayer } from './utils/map';
import { MAP_LAYERS } from './constants/mapLayers';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mapState, setMapState] = useState({
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
    selectedLayer: DEFAULT_LAYER
  });

  const handleLayerChange = (layerId) => {
    setMapState((prev) => ({ ...prev, selectedLayer: layerId }));
  };

  const activeLayer = findMapLayer(MAP_LAYERS, mapState.selectedLayer);

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        activeLayer={activeLayer.name}
      />
      <div
        className={`h-full transition-all duration-300 ${isSidebarOpen ? 'ml-[300px]' : 'ml-0'
          }`}
      >
        <LayerSelector
          selectedLayer={mapState.selectedLayer}
          onLayerChange={handleLayerChange}
        />
        <div className="h-full w-full relative">
          <Map
            center={mapState.center}
            zoom={mapState.zoom}
            selectedLayer={mapState.selectedLayer}
          />
        </div>
      </div>
    </div>
  );
}