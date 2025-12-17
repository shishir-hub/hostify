"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

const DefaultIcon = L.Icon.Default.extend({
  options: {
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  },
});

L.Marker.prototype.options.icon = new DefaultIcon();

const MyMap = ({
  lat,
  long,
  name,
}: {
  lat: number;
  long: number;
  name: string;
}) => {
  const center: LatLngTuple = [lat, long];
  const markerRef = useRef<L.Marker | null>(null);

useEffect(() => {
  if (markerRef.current) {
    markerRef.current.openPopup();
  }
}, []);
  return (
    <MapContainer
      center={center}
      zoom={15}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center} ref={markerRef}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;
