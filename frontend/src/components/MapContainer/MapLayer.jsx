import { useEffect } from 'react';
import { TileLayer, useMap } from 'react-leaflet';
import { MAP_LAYERS } from '../../constants/mapLayers';

<<<<<<< HEAD

=======
>>>>>>> 5b2a5da4acbd17d425d65baea5ece41c98da9a6f
export function MapLayer({ selectedLayer }) {
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