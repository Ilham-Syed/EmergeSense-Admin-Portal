import { GoogleMap, LoadScript, Marker, Polygon } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '@/config/API_KEYS';

const center = {
    lat: 19.0330,
    lng: 73.0297,
};

const polygonCoords = [
    { lat: 19.0330, lng: 73.0297 },
    { lat: 19.0350, lng: 73.0310 },
    { lat: 19.0320, lng: 73.0320 },
    { lat: 19.0330, lng: 73.0297 },
];

const MapComponent = () => {

    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} >
            <GoogleMap
                mapContainerClassName="w-full h-auto"
                center={center}
                zoom={15}
            >
                <Marker position={center} />


                <Polygon
                    paths={polygonCoords}
                    options={{
                        fillColor: 'lightblue',
                        fillOpacity: 0.5,
                        strokeColor: 'blue',
                        strokeOpacity: 1,
                        strokeWeight: 2,
                    }}
                />


            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
