import React, { useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl, { Map } from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWlzaGFoMTAxIiwiYSI6ImNtY2lvampibzE3cHUybHF2czJtY2swYWwifQ.rX3EFhb68jdKgbLqd2GUuA';

const TripNavigator: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const directionsRef = useRef<InstanceType<typeof MapboxDirections> | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/navigation-guidance-night-v4',
      center: [46.6753, 24.7136], // Riyadh
      zoom: 6,
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      interactive: true,
    });

    directionsRef.current = directions;
    mapRef.current.addControl(directions, 'top-left');

    // Fix for Arabic labels inversion:
    mapRef.current.on('style.load', () => {
      const layers = mapRef.current!.getStyle().layers;
      if (!layers) return;

      layers.forEach((layer) => {
        if (
          layer.type === 'symbol' &&
          layer.layout &&
          'text-field' in layer.layout
        ) {
          mapRef.current!.setLayoutProperty(layer.id, 'text-writing-mode', ['horizontal', 'vertical']);
          mapRef.current!.setLayoutProperty(layer.id, 'text-justify', 'right');
          // @ts-ignore - helps with RTL text, even if not official
          mapRef.current!.setLayoutProperty(layer.id, 'text-direction', 'rtl');
        }
      });
    });

    // Immediately get and set user location as origin
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation: [number, number] = [
            position.coords.longitude,
            position.coords.latitude,
          ];

          directionsRef.current?.setOrigin(userLocation);

          if (!userMarkerRef.current) {
            userMarkerRef.current = new mapboxgl.Marker({ color: 'blue' })
              .setLngLat(userLocation)
              .addTo(mapRef.current!);
          } else {
            userMarkerRef.current.setLngLat(userLocation);
          }

          mapRef.current?.flyTo({ center: userLocation, zoom: 14 });
        },
        (error) => {
          console.error('Error getting initial position:', error);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }

    return () => {
      mapRef.current?.remove();
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

const handleStartTrip = () => {
  if (!navigator.geolocation || !mapRef.current) {
    alert('Geolocation not supported');
    return;
  }

  watchIdRef.current = navigator.geolocation.watchPosition(
    (pos) => {
      const coords: [number, number] = [
        pos.coords.longitude,
        pos.coords.latitude,
      ];

      // Set or update user marker
      if (!userMarkerRef.current) {
        userMarkerRef.current = new mapboxgl.Marker({ color: 'blue' })
          .setLngLat(coords)
          .addTo(mapRef.current!);
      } else {
        userMarkerRef.current.setLngLat(coords);
      }

      // Set current location as origin for directions
      directionsRef.current?.setOrigin(coords);

      // Smooth zoom and pan to user location
      mapRef.current?.flyTo({
        center: coords,
        zoom: 17, // Adjust zoom level as needed
        essential: true,
      });
    },
    (error) => {
      console.error('Error watching position:', error);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 30000, // Increased timeout to reduce GPS failures
    }
  );
};


  return (
    <div>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />
      <button
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          zIndex: 1,
          padding: '10px 20px',
          fontWeight: 'bold',
          borderRadius: '8px',
          backgroundColor: '#2c3e50',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={handleStartTrip}
      >
        Start Trip
      </button>
    </div>
  );
};

export default TripNavigator;
