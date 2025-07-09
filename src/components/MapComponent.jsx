import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default icon issue in Leaflet when used with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const locations = [
  { lat: 24.7136, lng: 46.6753, title: "منطقة محظورة", desc: "تقع في الرياض" },
  { lat: 21.3891, lng: 39.8579, title: "منطقة محظورة", desc: "تقع في مكة" },
  {
    lat: 21.4858,
    lng: 39.1925,
    title: "بحر محظور للسباحة",
    desc: "في مدينة جدة",
  },
  {
    lat: 26.4207,
    lng: 50.0888,
    title: "منطقة مقطوعة",
    desc: "في المنطقة الشرقية",
  },
];

const MapComponent = () => {
  return (
    <div style={{ height: "500px", borderRadius: "12px", overflow: "hidden" }}>
      <MapContainer
        center={[24.7136, 46.6753]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />
        {locations.map((loc, index) => (
          <Marker key={index} position={[loc.lat, loc.lng]}>
            <Popup>
              <strong>{loc.title}</strong>
              <br />
              {loc.desc}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
