import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { Map } from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import camelWarningIcon from '../assets/den3.png';
import rockfallIcon from "../assets/den2.png";
import dangerIcon from "../assets/den1.png";


   mapboxgl.accessToken =
  "pk.eyJ1IjoiYWlzaGFoMTAxIiwiYSI6ImNtY2lvampibzE3cHUybHF2czJtY2swYWwifQ.rX3EFhb68jdKgbLqd2GUuA";
  mapboxgl.setRTLTextPlugin(
  'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
  () => {
    console.log('RTL text plugin loaded');
  },
  true
);
const TripNavigator: React.FC = () => {

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const directionsRef = useRef<InstanceType<typeof MapboxDirections> | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);

  const [hasZoomedOnce, setHasZoomedOnce] = useState(false);

  // Initialize map and add saved location markers
  useEffect(() => {
    if (!mapContainerRef.current) return;
    // Initialize Mapbox map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/aishah101/cmck36kem000u01sj152a4sn3",
      center: [46.6753, 24.7136],
      zoom: 6,
    });
    // Initialize directions control
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
      interactive: true,
      language: "ar",
    },{flyTo: false});
    directionsRef.current = directions;
    mapRef.current.addControl(directions, "top-left");
    // MutationObserver to detect when inputs exist and set placeholders
    observerRef.current = new MutationObserver(() => {
      const originContainer = document.getElementById("mapbox-directions-origin-input");
      const originInput = originContainer?.querySelector("input");
      const destinationContainer = document.getElementById("mapbox-directions-destination-input");
      const destinationInput = destinationContainer?.querySelector("input");
      const drivingLabel = document.querySelector('label[for="mapbox-directions-profile-driving"]');
      const trafficLabel = document.querySelector('label[for="mapbox-directions-profile-driving-traffic"]');
      const walkinggLabel = document.querySelector('label[for="mapbox-directions-profile-walking"]');
      const cyclingLabel = document.querySelector('label[for="mapbox-directions-profile-cycling"]');
    
      if (originInput && destinationInput && drivingLabel && trafficLabel && walkinggLabel && cyclingLabel) {
        originInput.setAttribute("placeholder", "اختر نقطة البداية");
        destinationInput.setAttribute("placeholder", "اختر الوجهة");
        drivingLabel.textContent = "القيادة"; 
        trafficLabel.textContent = "تفادى الازدحام";   
        walkinggLabel.textContent = "سيرًا ";
        cyclingLabel.textContent = "بالدراجة";    

        const clearButton = document.querySelector(".mapboxgl-ctrl-directions-clear");
        if (clearButton) clearButton.textContent = "مسح";

        // Disconnect observer after placeholders set
        observerRef.current?.disconnect();
      }
    });

    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // RTL text fixes on style load
    mapRef.current.on("style.load", () => {
      const layers = mapRef.current?.getStyle().layers;
      if (!layers) return;

      layers.forEach((layer) => {
        if (layer.type === "symbol" && layer.layout && "text-field" in layer.layout) {
          mapRef.current?.setLayoutProperty(layer.id, "text-writing-mode", ["horizontal", "vertical"]);
          mapRef.current?.setLayoutProperty(layer.id, "text-justify", "right");
          // @ts-ignore
          mapRef.current?.setLayoutProperty(layer.id, "text-direction", "rtl");
        }
      });
    });
    //add warnings on map
const warningLocations: { coordinates: [number, number]; message: string; icon : string }[] = [
    { coordinates: [46.5, 24.7], message: "تحذير: عبور جمال", icon: camelWarningIcon },
    { coordinates: [46.48, 24.71], message: "تحذير: عبور جمال", icon: camelWarningIcon },
    { coordinates: [46.49, 24.68], message: "تحذير: عبور جمال", icon: camelWarningIcon },
    { coordinates: [46.51, 24.72], message: "تحذير: عبور جمال", icon: camelWarningIcon },
    { coordinates: [46.52, 24.69], message: "تحذير: عبور جمال" , icon: camelWarningIcon},
    { coordinates: [46.47, 24.7],  message: "تحذير: عبور جمال", icon: camelWarningIcon },
    { coordinates: [46.6, 24.8], message: "تحذير: حيوانات سائبة", icon: dangerIcon  },
    { coordinates: [46.55, 24.75], message: "تحذير: منطقة خطرة", icon: dangerIcon },
    { coordinates: [46.53, 24.74], message: "تحذير: منطقة خطرة", icon: dangerIcon  },
    { coordinates: [46.57, 24.76], message: "تحذير: منطقة خطرة", icon: dangerIcon },
    { coordinates: [46.56, 24.73], message: "تحذير: منطقة خطرة", icon: dangerIcon  },
    { coordinates: [46.54, 24.76], message: "تحذير: منطقة خطرة", icon: dangerIcon  },
    { coordinates: [46.58, 24.75], message: "تحذير: منطقة خطرة" , icon: dangerIcon },
    { coordinates: [46.68, 24.68], message: "تحذير: خطر انزلاق الصخور", icon: rockfallIcon },
    { coordinates: [46.67, 24.69], message: "تحذير: خطر انزلاق الصخور", icon: rockfallIcon  },
    { coordinates: [46.66, 24.685], message: "تحذير: خطر انزلاق الصخور", icon: rockfallIcon  },
    { coordinates: [46.69, 24.695], message: "تحذير: خطر انزلاق الصخور", icon: rockfallIcon   },
    { coordinates: [46.70, 24.69], message: "تحذير: خطر انزلاق الصخور", icon: rockfallIcon   },
];

warningLocations.forEach((location) => {
  const el = document.createElement("div");
  el.style.backgroundImage = `url(${location.icon})`;
  el.style.width = "32px";
  el.style.height = "32px";
  el.style.backgroundSize = "contain";
  el.style.backgroundRepeat = "no-repeat";

  new mapboxgl.Marker(el)
    .setLngLat(location.coordinates)
    .setPopup(new mapboxgl.Popup().setText(location.message))
    .addTo(mapRef.current!);
});

    // Set initial user location 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation: [number, number] = [
            position.coords.longitude,
            position.coords.latitude,
          ];

          directionsRef.current?.setOrigin(userLocation);

          if (!userMarkerRef.current) {
            userMarkerRef.current = new mapboxgl.Marker({ color: "blue" })
              .setLngLat(userLocation)
              .addTo(mapRef.current!);
          } else {
            userMarkerRef.current.setLngLat(userLocation);
          }

            if (!hasZoomedOnce) {
           mapRef.current?.flyTo({ center: userLocation, zoom: 14 });
           setHasZoomedOnce(true);
}
        },
        (error) => {
          console.error("Error getting initial position:", error);
        }
      );
    }
      return () => {
    mapRef.current?.remove();
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }
    observerRef.current?.disconnect();
  };

  },[])
  // Start trip with live location tracking
  const handleStartTrip = () => {
    if (!navigator.geolocation || !mapRef.current) {
      alert("Geolocation not supported");
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.longitude, pos.coords.latitude];

        if (!userMarkerRef.current) {
          userMarkerRef.current = new mapboxgl.Marker({ color: "blue" })
            .setLngLat(coords)
            .addTo(mapRef.current!);
        } else {
          userMarkerRef.current.setLngLat(coords);
        }

        directionsRef.current?.setOrigin(coords);

        mapRef.current?.flyTo({
          center: coords,
          zoom: 17,
          essential: true,
        });
      },
      (error) => {
        console.error("Error watching position:", error);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 30000 }
    );
  };
 return (
    <div>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
<button
  style={{
    position: "absolute",
    bottom: 20,
    right: 20, 
    zIndex: 1,
    padding: "10px 20px",
    fontWeight: "bold",
    borderRadius: "8px",
    backgroundColor: "#F8D203",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  }}
  onClick={handleStartTrip}
>
  أبدأ الرحلة
  </button>
  </div>
  );
};

export default TripNavigator;
