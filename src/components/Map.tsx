import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { Map } from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { FaExclamationTriangle, FaHandsHelping } from "react-icons/fa";
import { RiChatHistoryLine } from "react-icons/ri";
import { useNavigate } from "react-router";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWlzaGFoMTAxIiwiYSI6ImNtY2lvampibzE3cHUybHF2czJtY2swYWwifQ.rX3EFhb68jdKgbLqd2GUuA";

// للغة العربية
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

  const navigate = useNavigate();

  const [showReportOptions, setShowReportOptions] = useState(false);
  const [showHelpOptions, setShowHelpOptions] = useState(false);
  const [activityLog, setActivityLog] = useState<
    {
      type: "بلاغ" | "مساعدة";
      content: string;
      coords: [number, number];
      timestamp: string;
    }[]
  >([]);
  const [showLog, setShowLog] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/aishah101/cmck36kem000u01sj152a4sn3",
      center: [46.6753, 24.7136],
      zoom: 6,
    });

    mapRef.current = map;

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
      language: "ar",
    });

    map.addControl(directions, "top-left");
    directionsRef.current = directions;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [
          pos.coords.longitude,
          pos.coords.latitude,
        ];
        map.flyTo({ center: coords, zoom: 14 });
        userMarkerRef.current = new mapboxgl.Marker({ color: "blue" })
          .setLngLat(coords)
          .addTo(map);
        directions.setOrigin(coords);
      },
      (err) => console.error(err)
    );

    return () => {
      map.remove();
    };
  }, []);

  const handleStartTrip = () => {
    if (!navigator.geolocation || !mapRef.current) return;

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const coords: [number, number] = [
          pos.coords.longitude,
          pos.coords.latitude,
        ];
        userMarkerRef.current?.setLngLat(coords);
        directionsRef.current?.setOrigin(coords);
        mapRef.current?.flyTo({ center: coords, zoom: 16 });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
  };

  const handleReportType = (type: string) => {
    if (!navigator.geolocation || !mapRef.current) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      const coords: [number, number] = [
        pos.coords.longitude,
        pos.coords.latitude,
      ];

      new mapboxgl.Marker({ color: "red" })
        .setLngLat(coords)
        .setPopup(new mapboxgl.Popup().setText(`بلاغ: ${type}`))
        .addTo(mapRef.current!);

      setActivityLog((prev) => [
        ...prev,
        {
          type: "بلاغ",
          content: type,
          coords,
          timestamp: new Date().toLocaleString(),
        },
      ]);

      setShowReportOptions(false);
    });
  };

  const handleHelpRequest = (type: string) => {
    navigate(`/service-list/${encodeURIComponent(type)}`);
  };

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
      {/* أبدأ الرحلة */}
      <button
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          zIndex: 10,
          background: "#2c3e50",
          border: "none",
          cursor: "pointer",
          color: "#fff",
          padding: "12px",
          borderRadius: "50%",
        }}
        onClick={handleStartTrip}
        title="أبدأ الرحلة"
      ></button>

      {/* بلّغ */}
      <button
        style={{
          position: "absolute",
          bottom: 60,
          right: 20,
          zIndex: 10,
          background: "#e74c3c",
          border: "none",
          cursor: "pointer",
          color: "#fff",
          padding: "12px",
          borderRadius: "50%",
          fontSize: "20px",
        }}
        onClick={() => setShowReportOptions(!showReportOptions)}
        title="بلّغ"
      >
        <FaExclamationTriangle />
      </button>

      {/* اطلب مساعدة */}
      <button
        style={{
          position: "absolute",
          bottom: 120,
          right: 20,
          zIndex: 10,
          background: "#27ae60",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          padding: "12px",
          borderRadius: "50%",
          fontSize: "20px",
        }}
        onClick={() => setShowHelpOptions(!showHelpOptions)}
        title="اطلب مساعدة"
      >
        <FaHandsHelping />
      </button>
      {/* السجل */}
      <button
        style={{
          position: "absolute",
          bottom: 200,
          right: 20,
          zIndex: 10,
          background: "#8e44ad",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          padding: "12px",
          borderRadius: "50%",
        }}
        onClick={() => setShowLog(!showLog)}
        title="السجل"
      >
        <RiChatHistoryLine />
      </button>
      {/* خيارات البلاغ */}
      {showReportOptions && (
        <div
          style={{
            position: "absolute",
            bottom: 100,
            right: 70,
            background: "#1f1f1f",
            padding: "10px 20px",
            borderRadius: "10px",
            zIndex: 11,
          }}
        >
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
              onClick={() => handleReportType(type)}
              style={{
                display: "block",
                marginBottom: 6,
                background: "#e74c3c",
                textAlign: "center",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "6px",
              }}
            >
              {type}
            </button>
          ))}
        </div>
      )}

      {/* خيارات المساعدة */}
      {showHelpOptions && (
        <div
          style={{
            position: "absolute",
            bottom: 100,
            right: 200,
            background: "#1f1f1f",
            border: "none",
            padding: "10px",
            borderRadius: "10px",
            zIndex: 11,
          }}
        >
          {["سطحة", "مساعد شخصي", "بطارية", "بنشر", "وقود"].map((type) => (
            <button
              key={type}
              onClick={() => handleHelpRequest(type)}
              style={{
                display: "block",
                marginBottom: 6,
                background: "#2ecc71",
                color: "#fff",
                borderRadius: "5px",
                padding: "6px",
                border: "none",
              }}
            >
              {type}
            </button>
          ))}
        </div>
      )}

      {/* سجل النشاط */}
      {showLog && (
        <div
          style={{
            position: "absolute",
            top: 70,
            right: 20,
            width: "300px",
            maxHeight: "400px",
            overflowY: "auto",
            background: "#fff",
            borderRadius: "10px",
            padding: "10px",
            zIndex: 15,
          }}
        >
          <h4>سجل النشاط:</h4>
          {activityLog.length === 0 ? (
            <p>لا يوجد بلاغات أو طلبات مساعدة</p>
          ) : (
            activityLog.map((item, index) => (
              <div key={index} style={{ marginBottom: 8 }}>
                <strong>{item.type}:</strong> {item.content}
                <br />
                <small>{item.timestamp}</small>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TripNavigator;
