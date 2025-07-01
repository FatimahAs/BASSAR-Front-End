import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { Map } from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
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


  const [savedLocations, setSavedLocations] = useState<[number, number][]>([]);
  const [hasZoomedOnce, setHasZoomedOnce] = useState(false);

  // Load saved locations from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("savedLocations");
    if (stored) {
      const parsed: [number, number][] = JSON.parse(stored);
      setSavedLocations(parsed);
    }
  }, []);

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
     //for="mapbox-directions-profile-driving-traffic" for="mapbox-directions-profile-walking" for="mapbox-directions-profile-cycling"
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
        trafficLabel.textContent = "بالسيارة";   
        walkinggLabel.textContent = "سيرًا على الأقدام";
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

    // Add markers for saved locations
    savedLocations.forEach((loc) => {
      new mapboxgl.Marker({ color: "green" })
        .setLngLat(loc)
        .setPopup(new mapboxgl.Popup().setText("Saved Location"))
        .addTo(mapRef.current!);
    });

    // Set initial user location if possible
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

    // Cleanup function
    return () => {
      mapRef.current?.remove();
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      observerRef.current?.disconnect();
    };
  }, [savedLocations]);

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

  // Save current location and add marker
  const handleSaveLocation = () => {
    if (!navigator.geolocation || !mapRef.current) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.longitude, pos.coords.latitude];
        const updated = [...savedLocations, coords];
        setSavedLocations(updated);
        localStorage.setItem("savedLocations", JSON.stringify(updated));

        new mapboxgl.Marker({ color: "green" })
          .setLngLat(coords)
          .setPopup(new mapboxgl.Popup().setText("Saved Location"))
          .addTo(mapRef.current!);
      },
      (err) => {
        console.error("Error saving location:", err);
      }
    );
  };

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
<button
  style={{
    position: "absolute",
    bottom: 20,
    right: 20, // instead of left
    zIndex: 1,
    padding: "10px 20px",
    fontWeight: "bold",
    borderRadius: "8px",
    backgroundColor: "#2c3e50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  }}
  onClick={handleStartTrip}
>
  أبدأ الرحلة
</button>

<button
  style={{
    position: "absolute",
    bottom: 20,
    right: 150, // instead of left
    zIndex: 1,
    padding: "10px 20px",
    fontWeight: "bold",
    borderRadius: "8px",
    backgroundColor: "#27ae60",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  }}
  onClick={handleSaveLocation}
>
  بلِّغ
</button>

    </div>
  );
};

export default TripNavigator;
