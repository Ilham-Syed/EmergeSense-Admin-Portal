import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvent } from 'react-leaflet';
import { MapLayer } from './MapLayer';
import { FeatureGroup, EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

export default function Map({ center, zoom, selectedLayer, databaseMarkers }) {
  const [markers, setMarkers] = useState([]); 
  const [clickedPosition, setClickedPosition] = useState(null); 
  const [deleting, setDeleting] = useState(false); 
  const [polygon, setPolygon] = useState(null);
  const [floodLayer, setFloodLayer] = useState(null); 

  function HandleClick() {
    useMapEvent('click', (e) => {
      if (!deleting) {
        const { lat, lng } = e.latlng;
        setClickedPosition([lat, lng]);
        const newMarker = { lat, lng, id: Date.now() };
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      }
    });
  }

  
  const handlePolygonCreated = async (e) => {
    const polygonLatLngs = e.layer.getLatLngs()[0].map((latLng) => [latLng.lat, latLng.lng]);
    setPolygon(polygonLatLngs);
    await fetchFloodLayer(polygonLatLngs);
  };

  // Fetch flood layer from backend using the selected polygon
  const fetchFloodLayer = async (polygonCoordinates) => {
    try {
      const response = await fetch('http://localhost:5000/flood-mapping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ geometry: polygonCoordinates }),
      });
      const data = await response.json();
      setFloodLayer(data);
    } catch (error) {
      console.error('Error fetching flood layer:', error);
    }
  };

  useEffect(() => {
    if (databaseMarkers) {
      setMarkers((prevMarkers) => [
        ...prevMarkers,
        ...databaseMarkers.map(marker => ({ ...marker, id: Date.now() }))
      ]);
    }
  }, [databaseMarkers]);

  // Function to delete a marker
  const deleteMarker = (id) => {
    setDeleting(true);
    setMarkers((prevMarkers) => prevMarkers.filter((marker) => marker.id !== id));
    setDeleting(false);
  };

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-full w-full"
      style={{ background: '#f0f0f0' }}
      zoomControl={false}
    >
      <ZoomControl position="bottomright" />
      {selectedLayer && <MapLayer selectedLayer={selectedLayer} />}
      <HandleClick />

      {/* Render markers */}
      {markers.map((marker) => (
        <Marker key={marker.id} position={marker}>
          <Popup closeOnClick={false} className="custom-popup">
            <div className="popup-content">
              <h3>Marker Location</h3>
              <p>Latitude: {marker.lat}</p>
              <p>Longitude: {marker.lng}</p>
              <div className="popup-actions">
                <button className="delete-btn" onClick={(e) => deleteMarker(marker.id)}>
                  Delete Marker
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Polygon Drawing Control */}
      <FeatureGroup>
        <EditControl
          position="topright"
          draw={{
            rectangle: false,
            circle: false,
            circlemarker: false,
            polyline: false,
            marker: false,
            polygon: {
              shapeOptions: {
                color: '#00f',
              },
            },
          }}
          onCreated={handlePolygonCreated}
        />
      </FeatureGroup>
    </MapContainer>
  );
}
