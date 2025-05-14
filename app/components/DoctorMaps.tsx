
import React, { useState, useEffect, useCallback } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  useMap, 
  Marker, 
  Popup 
} from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';

// Need to fix Leaflet default icon issue in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Define the TypeScript interfaces
interface Doctor {
  id: number;
  name: string;
  specialty: string;
  lat: number;
  lng: number;
  imageUrl: string;
}

interface DoctorMarkerProps {
  doctor: Doctor;
  onClick: (doctor: Doctor) => void;
}

// Sample data
const doctorsData: Doctor[] = [
    { id: 1, name: "Dr. Smith", specialty: "Cardiology", lat: 45.463, lng: 9.188, imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=50&auto=format&fit=crop" },
    { id: 2, name: "Dr. Johnson", specialty: "Neurology", lat: 45.464, lng: 9.191, imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=50&auto=format&fit=crop" },
    { id: 3, name: "Dr. Williams", specialty: "Pediatrics", lat: 45.462, lng: 9.189, imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=50&auto=format&fit=crop" },
    { id: 4, name: "Dr. Brown", specialty: "Dermatology", lat: 45.466, lng: 9.185, imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=50&auto=format&fit=crop" },
    { id: 5, name: "Dr. Jones", specialty: "Orthopedics", lat: 45.461, lng: 9.192, imageUrl: "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?q=80&w=50&auto=format&fit=crop" },
    { id: 6, name: "Dr. Miller", specialty: "Ophthalmology", lat: 45.465, lng: 9.187, imageUrl: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=50&auto=format&fit=crop" },
    { id: 7, name: "Dr. Davis", specialty: "Psychiatry", lat: 45.460, lng: 9.194, imageUrl: "https://images.unsplash.com/photo-1613918108466-292b78a8ef95?q=80&w=50&auto=format&fit=crop" },
    { id: 8, name: "Dr. Garcia", specialty: "Gynecology", lat: 45.467, lng: 9.186, imageUrl: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?q=80&w=50&auto=format&fit=crop" },
    { id: 9, name: "Dr. Rodriguez", specialty: "Urology", lat: 45.459, lng: 9.193, imageUrl: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?q=80&w=50&auto=format&fit=crop" },
    { id: 10, name: "Dr. Wilson", specialty: "Endocrinology", lat: 45.468, lng: 9.190, imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=50&auto=format&fit=crop" },
  ];

// Fix default icon issues
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom icon for doctor markers
const createDoctorIcon = (imageUrl: string) => {
  return L.divIcon({
    html: `<div class="doctor-marker">
             <img src="${imageUrl}" alt="Doctor" class="doctor-image" />
           </div>`,
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

// Custom icon for cluster
const createClusterCustomIcon = (cluster: any) => {
  return L.divIcon({
    html: `<div class="cluster-marker">
             <span>${cluster.getChildCount()}</span>
           </div>`,
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

// Custom Doctor Marker Component
const DoctorMarker: React.FC<DoctorMarkerProps> = ({ doctor, onClick }) => {
  const customIcon = createDoctorIcon(doctor.imageUrl);
  
  return (
    <Marker 
      position={[doctor.lat, doctor.lng]} 
      icon={customIcon}
      eventHandlers={{
        click: () => onClick(doctor)
      }}
    >
      <Popup>
        <div className="doctor-popup">
          <img src={doctor.imageUrl} alt={doctor.name} className="w-16 h-16 rounded-full mb-2" />
          <h3 className="font-bold text-lg text-black">{doctor.name}</h3>
          <p className="text-sm text-gray-600">{doctor.specialty}</p>
        </div>
      </Popup>
    </Marker>
  );
};

const ZoomHandler: React.FC<{ onZoomChange: (zoom: number) => void }> = ({ onZoomChange }) => {
  const map = useMap();
  
  useEffect(() => {
    const handleZoom = () => {
      onZoomChange(map.getZoom());
    };
    
    map.on('zoom', handleZoom);
    
    return () => {
      map.off('zoom', handleZoom);
    };
  }, [map, onZoomChange]);
  
  return null;
};

const DoctorMap: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [currentZoom, setCurrentZoom] = useState<number>(13);
  const [mapCenter] = useState<[number, number]>([45.464, 9.189]);
  
  const handleDoctorClick = useCallback((doctor: Doctor) => {
    setSelectedDoctor(doctor);
  }, []);
  
  const handleZoomChange = useCallback((zoom: number) => {
    setCurrentZoom(zoom);
  }, []);

  return (
    <div className="w-full h-screen flex">
      <div className="w-3/4 h-full relative">
        <MapContainer 
          center={mapCenter} 
          zoom={13} 
          className="w-full h-full"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <ZoomHandler onZoomChange={handleZoomChange} />
          
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createClusterCustomIcon}
          >
            {doctorsData.map(doctor => (
              <DoctorMarker 
                key={doctor.id} 
                doctor={doctor} 
                onClick={handleDoctorClick} 
              />
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
      
      <div className="w-1/4 p-4 bg-white overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Doctors</h2>
        {selectedDoctor ? (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <img 
                src={selectedDoctor.imageUrl} 
                alt={selectedDoctor.name} 
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="font-bold text-lg text-black">{selectedDoctor.name}</h3>
                <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
              </div>
            </div>
            <p className="text-sm mb-2">
              <span className="font-semibold">Location:</span> {selectedDoctor.lat.toFixed(4)}, {selectedDoctor.lng.toFixed(4)}
            </p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors w-full">
              Book Appointment
            </button>
          </div>
        ) : (
          <p>Select a doctor to view details</p>
        )}
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">All Doctors</h3>
          <ul className="space-y-2">
            {doctorsData.map(doctor => (
              <li 
                key={doctor.id}
                className={`p-2 rounded cursor-pointer flex items-center ${selectedDoctor?.id === doctor.id ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
                onClick={() => handleDoctorClick(doctor)}
              >
                <img 
                  src={doctor.imageUrl} 
                  alt={doctor.name} 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium text-black">{doctor.name}</p>
                  <p className="text-xs text-gray-600">{doctor.specialty}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// CSS for custom markers
const styles = `
  .doctor-marker {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #3b82f6;
    background-color: white;
  }
  
  .doctor-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .cluster-marker {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: #3b82f6;
    color: white;
    border-radius: 50%;
    font-weight: bold;
    border: 2px solid white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;

const DoctorMapApp: React.FC = () => {
  return (
    <>
      <style>{styles}</style>
      <DoctorMap />
    </>
  );
};

export default DoctorMapApp;