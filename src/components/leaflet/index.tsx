import React, { useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import Cookies from "js-cookie";

interface LeafletProps {
  onMarkerMove: (lat: number, lng: number) => void;
  lat: number;
  lng: number;
}

const Leaflet: React.FC<LeafletProps> = ({ onMarkerMove, lat, lng }) => {
  const initialMarkerPosition: LatLngTuple = [lat, lng];
  const [markerPosition, setMarkerPosition] = useState(initialMarkerPosition);

  const handleMarkerDragEnd = (event: any) => {
    const { lat, lng } = event.target?.getLatLng?.() || { lat: 0, lng: 0 };
    setMarkerPosition([lat, lng]);
    onMarkerMove(lat, lng);
    console.log("Marker moved to:", { lat, lng });
    Cookies.set("finalLat", lat);
    Cookies.set("finalLng", lng);
    return;
  };

  return (
    <div>
      <MapContainer
        center={initialMarkerPosition}
        zoom={13}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={markerPosition}
          draggable={true}
          eventHandlers={{ dragend: handleMarkerDragEnd }}
        ></Marker>
      </MapContainer>
    </div>
  );
};

export default Leaflet;
