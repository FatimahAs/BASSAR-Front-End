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
    { coordinates: [50.1, 18.3], message: "تحذير: عبور جمال", icon: camelWarningIcon },   
    { coordinates: [42.7, 19.5], message: "تحذير: عبور جمال", icon: camelWarningIcon },   
    { coordinates: [39.5, 21.5], message: "تحذير: عبور جمال", icon: camelWarningIcon },   
    { coordinates: [45.4, 25.1], message: "تحذير: عبور جمال", icon: camelWarningIcon },   
    { coordinates: [41.8, 17.5], message: "تحذير: عبور جمال", icon: camelWarningIcon },   
    { coordinates: [49.8, 26.3], message: "تحذير: منطقة خطرة", icon: dangerIcon },       
    { coordinates: [38.5, 24.8], message: "تحذير: منطقة خطرة", icon: dangerIcon },       
    { coordinates: [41.2, 27.0], message: "تحذير: منطقة خطرة", icon: dangerIcon },      
    { coordinates: [43.9, 22.3], message: "تحذير: منطقة خطرة", icon: dangerIcon },       
    { coordinates: [44.7, 20.2], message: "تحذير: منطقة خطرة", icon: dangerIcon },      
    { coordinates: [46.6, 24.8], message: "تحذير: حيوانات سائبة", icon: dangerIcon  },
    { coordinates: [46.55, 24.75], message: "تحذير: منطقة خطرة", icon: dangerIcon },
    { coordinates: [46.53, 24.74], message: "تحذير: منطقة خطرة", icon: dangerIcon  },
    { coordinates: [46.57, 24.76], message: "تحذير: منطقة خطرة", icon: dangerIcon },
    { coordinates: [46.56, 24.73], message: "تحذير: منطقة خطرة", icon: dangerIcon  },
    { coordinates: [46.54, 24.76], message: "تحذير: منطقة خطرة", icon: dangerIcon  },
    { coordinates: [46.58, 24.75], message: "تحذير: منطقة خطرة" , icon: dangerIcon },
    { coordinates: [36.5, 30.0], message: "تحذير: خطر انزلاق الصخور", icon: rockfallIcon },  
    { coordinates: [35.5, 27.5], message: "تحذير: خطر انزلاق الصخور", icon: rockfallIcon },  
    { coordinates: [38.1, 20.0], message: "تحذير: خطر انزلاق الصخور", icon: rockfallIcon }, 
    { coordinates: [42.0, 18.9], message: "تحذير: خطر انزلاق الصخور", icon: rockfallIcon },  
    { coordinates: [46.2, 23.8], message: "تحذير: خطر انزلاق الصخور", icon: rockfallIcon },  
    { coordinates: [46.68, 24.68], message: "تحذير: خطر انزلاق الصخور", icon: rockfallIcon },
    { coordinates: [46.67, 24.69], message: "تحذير: خطر انزلاق الصخور", icon: rockfallIcon  },
    { coordinates: [46.66, 24.685], message: "تحذير: خطر انزلاق الصخور", icon: rockfallIcon  },
    { coordinates: [46.69, 24.695], message: "تحذير: خطر انزلاق الصخور", icon: rockfallIcon   },
    { coordinates: [46.70, 24.69], message: "تحذير: خطر انزلاق الصخور", icon: rockfallIcon   },
  // ── Central (Riyadh) ──
  { coordinates: [46.6753, 24.7136], message: "تحذير: طريق غير ممهد", icon: dangerIcon },
  { coordinates: [46.7000, 24.7500], message: "تحذير: منطقة رمال متحركة", icon: rockfallIcon },
  { coordinates: [46.6500, 24.6800], message: "تحذير: عبور جمال", icon: camelWarningIcon },
  { coordinates: [46.6200, 24.7300], message: "تحذير: منعطف خطير", icon: dangerIcon },
  { coordinates: [46.6800, 24.7200], message: "تحذير: مطب صناعي", icon: dangerIcon },

  // ── Mecca Region ──
{ coordinates: [39.8200, 21.4225], message: "تحذير: ازدحام مروري", icon: dangerIcon }, // Mecca
{ coordinates: [39.8700, 21.4400], message: "تحذير: عبور جمال", icon: camelWarningIcon }, // Mecca outskirts
{ coordinates: [39.2300, 21.6100], message: "تحذير: صيانة طريق", icon: dangerIcon }, // Near Jeddah south
{ coordinates: [40.4200, 21.2900], message: "تحذير: طريق جبلي خطر", icon: rockfallIcon }, // Taif
{ coordinates: [40.4100, 21.2500], message: "تحذير: حيوانات سائبة", icon: camelWarningIcon }, // Taif south
{ coordinates: [39.7300, 21.5400], message: "تحذير: عبور مشاة", icon: dangerIcon }, // North of Jeddah


  // ── Medina Region ──
  { coordinates: [39.5700, 24.4700], message: "تحذير: منطقة منخفضة الرؤية", icon: dangerIcon },
  { coordinates: [39.6000, 24.5000], message: "تحذير: عبور جمال", icon: camelWarningIcon },
  { coordinates: [39.6500, 24.4500], message: "تحذير: رياح قوية", icon: dangerIcon },
  { coordinates: [39.5500, 24.5200], message: "تحذير: عبور حيوانات برية", icon: camelWarningIcon },
  { coordinates: [39.6100, 24.4800], message: "تحذير: خطر انزلاق الصخور", icon: rockfallIcon },

  // ── Eastern Province ──
  { coordinates: [50.0755, 26.3927], message: "تحذير: طريق بحري زلق", icon: dangerIcon },
  { coordinates: [49.5850, 26.2000], message: "تحذير: عبور جمال", icon: camelWarningIcon },
  { coordinates: [50.0000, 26.3000], message: "تحذير: صيانة طرق", icon: dangerIcon },
  { coordinates: [49.8000, 26.4000], message: "تحذير: رمال متحركة", icon: rockfallIcon },
  { coordinates: [50.1000, 26.3500], message: "تحذير: مفرق مزدحم", icon: dangerIcon },

  // ── Asir / Al-Baha ──
  { coordinates: [42.5000, 18.2169], message: "تحذير: عبور جمال", icon: camelWarningIcon },
  { coordinates: [42.3500, 18.6000], message: "تحذير: انزلاق صخور", icon: rockfallIcon },
  { coordinates: [42.2000, 18.2500], message: "تحذير: منعطف جبلي", icon: dangerIcon },
  { coordinates: [41.8000, 18.1000], message: "تحذير: أعمال بناء", icon: dangerIcon },
  { coordinates: [42.4000, 18.3000], message: "تحذير: طريق وعر", icon: dangerIcon },

  // ── Tabuk Region ──
  { coordinates: [36.6000, 28.3830], message: "تحذير: منطقة منخفضة الرؤية", icon: dangerIcon },
  { coordinates: [36.3000, 28.3830], message: "تحذير: عبور جمال", icon: camelWarningIcon },
  { coordinates: [36.5000, 28.4500], message: "تحذير: خطر انزلاق الصخور", icon: rockfallIcon },
  { coordinates: [36.7000, 28.3500], message: "تحذير: دوار أمامك", icon: dangerIcon },
  { coordinates: [36.5500, 28.3000], message: "تحذير: طريق غير ممهد", icon: dangerIcon },

  // ── Northern Borders ──
  { coordinates: [41.5000, 31.6500], message: "تحذير: رياح قوية", icon: dangerIcon },
  { coordinates: [41.8000, 31.5000], message: "تحذير: عبور جمال", icon: camelWarningIcon },
  { coordinates: [42.0000, 31.6000], message: "تحذير: انزلاق صخور", icon: rockfallIcon },
  { coordinates: [41.6000, 31.7000], message: "تحذير: منطقة عمل", icon: dangerIcon },
  { coordinates: [41.7000, 31.5500], message: "تحذير: منعطف خطير", icon: dangerIcon },

  // ── Jazan / Najran ──
  { coordinates: [42.5000, 17.0000], message: "تحذير: عبور جمال", icon: camelWarningIcon },
  { coordinates: [42.8000, 17.5000], message: "تحذير: طريق زلق", icon: dangerIcon },
  { coordinates: [42.2000, 17.2500], message: "تحذير: انزلاق صخور", icon: rockfallIcon },
  { coordinates: [42.4000, 17.3000], message: "تحذير: طرق ضيقة", icon: dangerIcon },
  { coordinates: [42.3000, 17.1000], message: "تحذير: منطقة رملية", icon: dangerIcon },
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
            userMarkerRef.current = new mapboxgl.Marker({ color: "#F8D203" })
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
    fontSize: '20px'
  }}
  onClick={handleStartTrip}
>
  أبدأ الرحلة
  </button>
  </div>
  );
};

export default TripNavigator;
