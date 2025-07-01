import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { Map } from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWlzaGFoMTAxIiwiYSI6ImNtY2lvampibzE3cHUybHF2czJtY2swYWwifQ.rX3EFhb68jdKgbLqd2GUuA";

mapboxgl.setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
  () => console.log("RTL plugin loaded"),
  true
);

const TripNavigator: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const directionsRef = useRef<InstanceType<typeof MapboxDirections> | null>(
    null
  );
  const observerRef = useRef<MutationObserver | null>(null);

  const [showReportOptions, setShowReportOptions] = useState(false);
  const [hasZoomedOnce, setHasZoomedOnce] = useState(false);

  const mockApiUrl = "https://68638e0088359a373e954fdb.mockapi.io/reports"; // ← غيّر هذا

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/aishah101/cmck36kem000u01sj152a4sn3",
      center: [46.6753, 24.7136],
      zoom: 6,
    });

    const directions = new MapboxDirections(
      {
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        profile: "mapbox/driving",
        interactive: true,
        language: "ar",
      },
      { flyTo: false }
    );

    directionsRef.current = directions;
    mapRef.current.addControl(directions, "top-left");

    observerRef.current = new MutationObserver(() => {
      const originInput = document.querySelector(
        "#mapbox-directions-origin-input input"
      );
      const destinationInput = document.querySelector(
        "#mapbox-directions-destination-input input"
      );

      if (originInput)
        originInput.setAttribute("placeholder", "اختر نقطة البداية");
      if (destinationInput)
        destinationInput.setAttribute("placeholder", "اختر الوجهة");

      observerRef.current?.disconnect();
    });

    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true,
    });

    mapRef.current.on("style.load", () => {
      const layers = mapRef.current?.getStyle().layers;
      if (!layers) return;

      layers.forEach((layer) => {
        if (
          layer.type === "symbol" &&
          layer.layout &&
          "text-field" in layer.layout
        ) {
          mapRef.current?.setLayoutProperty(layer.id, "text-writing-mode", [
            "horizontal",
            "vertical",
          ]);
          mapRef.current?.setLayoutProperty(layer.id, "text-justify", "right");
          // @ts-ignore
          mapRef.current?.setLayoutProperty(layer.id, "text-direction", "rtl");
        }
      });
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLocation: [number, number] = [
            pos.coords.longitude,
            pos.coords.latitude,
          ];

          directionsRef.current?.setOrigin(userLocation);

          if (!userMarkerRef.current) {
            userMarkerRef.current = new mapboxgl.Marker({ color: "blue" })
              .setLngLat(userLocation)
              .addTo(mapRef.current!);
          }

          if (!hasZoomedOnce) {
            mapRef.current?.flyTo({ center: userLocation, zoom: 14 });
            setHasZoomedOnce(true);
          }
        },
        (err) => console.error("Error getting location:", err)
      );
    }

    return () => {
      mapRef.current?.remove();
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      observerRef.current?.disconnect();
    };
  }, []);

  const handleStartTrip = () => {
    if (!navigator.geolocation || !mapRef.current) {
      alert("المتصفح لا يدعم الموقع الجغرافي");
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const coords: [number, number] = [
          pos.coords.longitude,
          pos.coords.latitude,
        ];

        if (!userMarkerRef.current) {
          userMarkerRef.current = new mapboxgl.Marker({ color: "blue" })
            .setLngLat(coords)
            .addTo(mapRef.current!);
        } else {
          userMarkerRef.current.setLngLat(coords);
        }

        directionsRef.current?.setOrigin(coords);

        mapRef.current?.flyTo({ center: coords, zoom: 17 });
      },
      (error) => console.error("Error watching position:", error),
      { enableHighAccuracy: true }
    );
  };

  const handleReportType = async (type: string) => {
    if (!navigator.geolocation || !mapRef.current) return;

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const coords: [number, number] = [
        pos.coords.longitude,
        pos.coords.latitude,
      ];

      const report = {
        type,
        coords: {
          longitude: coords[0],
          latitude: coords[1],
        },
        timestamp: new Date().toISOString(),
      };

      try {
        const res = await fetch(mockApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(report),
        });

        if (!res.ok) throw new Error("فشل إرسال البلاغ");

        // أضف ماركر للخريطة
        new mapboxgl.Marker({ color: "red" })
          .setLngLat(coords)
          .setPopup(new mapboxgl.Popup().setText(`بلاغ: ${type}`))
          .addTo(mapRef.current!);

        setShowReportOptions(false);
      } catch (err) {
        console.error(err);
        alert("حدث خطأ أثناء إرسال البلاغ");
      }
    });
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
          right: 150,
          zIndex: 1,
          padding: "10px 20px",
          fontWeight: "bold",
          borderRadius: "8px",
          backgroundColor: "#e74c3c",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => setShowReportOptions((prev) => !prev)}
      >
        بلِّغ
      </button>

      {showReportOptions && (
        <div
          style={{
            position: "absolute",
            bottom: 70,
            right: 150,
            zIndex: 2,
            background: "#fff",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          }}
        >
          <p style={{ marginBottom: 10 }}>اختر نوع البلاغ:</p>
          {[
            "حفرة",
            "حادث",
            "إغلاق طريق",
            "مياه راكدة",
            "عبور جمال",
            "منحدرات",
            "شيء آخر",
          ].map((type) => (
            <button
              key={type}
              style={{
                display: "block",
                width: "100%",
                marginBottom: "5px",
                background: "#3498db",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "6px",
                cursor: "pointer",
              }}
              onClick={() => handleReportType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripNavigator;
