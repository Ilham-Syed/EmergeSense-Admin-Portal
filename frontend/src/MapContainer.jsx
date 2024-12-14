import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { MAP_LAYERS } from '../constants/mapLayers';
import 'leaflet/dist/leaflet.css';

function MapLayerComponent({ selectedLayer }) {
    const map = useMap();
    const layer = MAP_LAYERS.find((l) => l.id === selectedLayer) || MAP_LAYERS[0];

    useEffect(() => {
        map.invalidateSize();
    }, [map]);

    return (
        <TileLayer
            url={layer.url}
            attribution={layer.attribution}
        />
    );
}

export default function Map({ center, zoom, selectedLayer }) {
    return (
        <MapContainer
            center={center}
            zoom={zoom}
            className="h-full w-full"
            style={{ background: '#f0f0f0' }}
        >
            <MapLayerComponent selectedLayer={selectedLayer} />
        </MapContainer>
    );
}