import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { MapLayer } from './MapLayer';
import 'leaflet/dist/leaflet.css';


export default function Map({ center, zoom, selectedLayer }) {
    return (
        <MapContainer
            center={center}
            zoom={zoom}
            className="h-full w-full"
            style={{ background: '#f0f0f0' }}
            zoomControl={false}
        >
            <ZoomControl position="bottomright" />
            <MapLayer selectedLayer={selectedLayer} />
        </MapContainer>
    );
} 