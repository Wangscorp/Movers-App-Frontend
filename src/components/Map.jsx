import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  return (
    <MapContainer center={[-1.286389, 36.817223]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[-1.286389, 36.817223]}>
        <Popup>Driver Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;