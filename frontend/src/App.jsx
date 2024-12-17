import { useState } from 'react';
import MapComponent from './components/MapComponent';
import SidebarComponent from './components/SidebarComponent';

function App() {
  const [locationMappings, setLocationMappings] = useState([]);

  return (
    <div className="App flex h-screens">

      <SidebarComponent 
        locationMappings={locationMappings}
        setLocationMappings={setLocationMappings}
      />
      <MapComponent 
        locationMappings={locationMappings}
        setLocationMappings={setLocationMappings}
      />

    </div>
  );
}

export default App;
