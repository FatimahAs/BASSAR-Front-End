import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { Map } from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { FaExclamationTriangle, FaHandsHelping } from "react-icons/fa";
import { RiChatHistoryLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import camelWarningIcon from '../assets/den3.png';
import rockfallIcon from "../assets/den2.png";
import dangerIcon from "../assets/den1.png";

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
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [
          pos.coords.longitude,
          pos.coords.latitude,
        ];
        map.flyTo({ center: coords, zoom: 14 });
        userMarkerRef.current = new mapboxgl.Marker({ color: "#F8D203" })
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
    zIndex: 1,
    padding: "10px 20px",
    fontWeight: "bold",
    borderRadius: "8px",
    backgroundColor: "#F8D203",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: '15px'
  }}
  onClick={handleStartTrip}
>
  أبدأ الرحلة
  </button>

      {/* بلّغ */}
      <button
        style={{
          position: "absolute",
          bottom: 80,
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
          bottom: 140,
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
