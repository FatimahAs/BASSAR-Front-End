import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { Map } from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
//import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import { FaExclamationTriangle, FaHandsHelping } from "react-icons/fa";
import { RiChatHistoryFill } from "react-icons/ri";
//import camelWarningIcon from '../assets/den3.png';
//import rockfallIcon from '../assets/den2.png';
//import dangerIcon from '../assets/den1.png';
import '../App.css';
import axios from "axios";


const camelWarningIcon = "../assets/den3.png";
const rockfallIcon = '../assets/den2.png';
const dangerIcon = '../assets/den1.png';

export const Access_Token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
   mapboxgl.accessToken = Access_Token
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

  // const navigate = useNavigate();

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
  const [hasZoomedOnce, setHasZoomedOnce] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/aishah101/cmck36kem000u01sj152a4sn3",
      center: [46.6753, 24.7136],
      zoom: 6,
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
      interactive: true,
      language: "ar",
    },{flyTo: false});
if (mapRef.current && !mapRef.current.hasControl(directions)) {
  mapRef.current.addControl(directions, "top-left");
  
}
const DerctionIcons = document.getElementsByClassName('.directions-icon ')[0] as HTMLElement
if(DerctionIcons) DerctionIcons.style.fill = "#272343 "; 

const markerA = document.getElementsByClassName("marker-a")[0] as HTMLDivElement;
const markerB = document.getElementsByClassName("marker-b")[0] as HTMLDivElement;
console.log("marker a :", markerB);

if (markerA) markerA.style.display = "none";
if (markerB) markerB.style.display = "none";


//move the control UI to custom panel
const defaultPanel = document.querySelector(".mapboxgl-ctrl-top-left");
const customPanel = document.getElementById("directions-panel");

if (defaultPanel && customPanel) {
  const directionsUI = defaultPanel.querySelector(".mapboxgl-ctrl-directions");
  if (directionsUI) {
    customPanel.appendChild(directionsUI);

    
  }
}
    directionsRef.current = directions;
    //observer to detect when inputs exist and set placeholders
    observerRef.current = new MutationObserver(() => {
      const originContainer = document.getElementById("mapbox-directions-origin-input");
      const originInput = originContainer?.querySelector("input");
      const destinationContainer = document.getElementById("mapbox-directions-destination-input");
      const destinationInput = destinationContainer?.querySelector("input");
      const drivingLabel = document.querySelector('label[for="mapbox-directions-profile-driving"]');
      const trafficLabel = document.querySelector('label[for="mapbox-directions-profile-driving-traffic"]');
      const walkingLabel = document.querySelector('label[for="mapbox-directions-profile-walking"]');
      const cyclingLabel = document.querySelector('label[for="mapbox-directions-profile-cycling"]');
        const control = document.getElementsByClassName('directions-control-instructions')
                

      if (originInput && destinationInput && drivingLabel && 
        trafficLabel && walkingLabel && cyclingLabel && control) {
        originInput.setAttribute("placeholder", "اختر نقطة البداية");
        destinationInput.setAttribute("placeholder", "اختر الوجهة");
        drivingLabel.textContent = "القيادة"; 
        trafficLabel.textContent = "تفادى الازدحام";   
        walkingLabel.textContent = "سيرًا ";
        cyclingLabel.textContent = "بالدراجة";    
        const clearButton = document.querySelector(".mapboxgl-ctrl-directions-clear");
        if (clearButton) clearButton.textContent = "مسح";

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
    //initial user location 
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
           setHasZoomedOnce(true);}
          },(error) => {
          console.error("Error getting initial position:", error);
        }
      );
    }
    directionsRef.current?.on("route", () => {
  DisplayWarningsOnRoute();
});
      return () => {
    mapRef.current?.remove();
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }
    observerRef.current?.disconnect();
  };

  },[])
      //add warnings on map function 
 const DisplayWarningsOnRoute = async () => {
  if (!mapRef.current || !directionsRef.current) return;

  const routes = directionsRef.current.getRoutes();
  if (!routes || routes.length === 0) {
    console.warn("No route available");
    return;
  }

  const routeCoords = routes[0].geometry.coordinates; // [lng, lat][]

  try {
    const { data: dangerZones } = await axios.get("https://localhost:3000/api/danger-zones");

    const matchingZones = dangerZones.filter((zone: any) => {
      return routeCoords.some(([lng, lat]: [number, number]) => {
        const threshold = 0.01; 
        return (
          Math.abs(zone.location.lng - lng) < threshold &&
          Math.abs(zone.location.lat - lat) < threshold
        );
      });
    });

    matchingZones.forEach((zone: any) => {
      const el = document.createElement("div");
      el.style.backgroundImage = `url(${getDangerIcon(zone.name)})`;
      el.style.width = "32px";
      el.style.height = "32px";
      el.style.backgroundSize = "contain";
      el.style.backgroundRepeat = "no-repeat";

      new mapboxgl.Marker(el)
        .setLngLat([zone.location.lng, zone.location.lat])
        .setPopup(new mapboxgl.Popup().setText(zone.name))
        .addTo(mapRef.current!);
    });

    if (matchingZones.length === 0) {
      alert("لا توجد تحذيرات على المسار المختار.");
    }
  } catch (err) {
    console.error("Error fetching danger zones:", err);
    alert("فشل تحميل بيانات التحذيرات.");
  }
};
           const getDangerIcon = (name: string): string => {
          if (name.includes("جمال")) return camelWarningIcon;
          if (name.includes("انزلاق") || name.includes("صخور")) return rockfallIcon;
          return dangerIcon;
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

  //  const handleHelpRequest = (type: string) => {
  //   navigate(`/service-list/${encodeURIComponent(type)}`);
  // };


  //start trip with live location tracking
const handleStartTrip = () => {
  if (!navigator.geolocation || !mapRef.current) {
    alert("Geolocation غير مدعومة");
    return;
  }


  if (watchIdRef.current !== null) {
    navigator.geolocation.clearWatch(watchIdRef.current);
  }

  watchIdRef.current = navigator.geolocation.watchPosition(
    (pos) => {
      const coords: [number, number] = [pos.coords.longitude, pos.coords.latitude];

      if (!userMarkerRef.current) {
        userMarkerRef.current = new mapboxgl.Marker({ color: "#F8D203" })
          .setLngLat(coords)
          .addTo(mapRef.current!);
      } else {
        userMarkerRef.current.setLngLat(coords);
      }

      mapRef.current?.flyTo({
        center: coords,
        zoom: 16,
        speed: 0.8,
        essential: true,
      });

      directionsRef.current?.setOrigin(coords);

      //check if user is near danger zones
      checkNearbyDangerZones(coords);
    },
    (error) => {
      console.error("خطأ في تتبع الموقع:", error);
      showNotification("تعذر تتبع الموقع");
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 20000,
    }
  );
};

const checkNearbyDangerZones = async (coords: [number, number]) => {
  try {
    const { data: dangerZones } = await axios.get("https://localhost:3000/api/danger-zones");

    const nearbyZones = dangerZones.filter((zone: any) => {
      const threshold = 0.01; 
      return (
        Math.abs(zone.location.lng - coords[0]) < threshold &&
        Math.abs(zone.location.lat - coords[1]) < threshold
      );
    });

    nearbyZones.forEach((zone: any) => {
      showNotification(`⚠️ منطقة خطرة قريبة: ${zone.name}`);
    });
  } catch (err) {
    console.error("فشل جلب بيانات المناطق الخطرة", err);
  }
};
function showNotification(message: string) {
  const container = document.getElementById("notification-container");
  if (!container) return;

  const notification = document.createElement("div");
  notification.className = "notification";
  notification.innerText = message;

  container.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 5000); 
}

 return(
  <React.Fragment>
    <div className="layout-container">
      <div id="notification-container" className="notification-container"></div>
    <div ref={mapContainerRef} className="map-container"/>
      <button className="panel-toggle" onClick={() => {
        const panel = document.getElementById("directions-panel");
        panel?.classList.toggle("collapsed");
      }}>
        ☰ القائمة
      </button>
    <div id="directions-panel" className="panel"
    style={{ 
      padding: '10px', maxHeight: '100%', overflowY: 'auto', 
      color: '#000', fontFamily: 'Arial, sans-serif'}} >
      <div className="buttonsDiv" 
      style={{ display: 'flex',flexDirection:
       'column', justifyContent: 'center', 
       alignContent: 'center'}}>
      <div   className="FunctionBtns"
       style={{
          position: "absolute",
          bottom: 100,
          zIndex: 10,
          display: "flex",
          gap: "5px",
          justifyContent: 'center',
          width: "100%",
          flexShrink: "0"
         }} >
           {/* بلّغ */}
  <button
    style={{
      border: "2px solid #e74c3c",
      cursor: "pointer",
      color: "#e74c3c",
      padding: "12px",
      borderRadius: "10px",
      fontSize: "15px",
      display: "flex",
    flexDirection: "row" ,
     gap: "5px"  ,
     width: '25%',
     justifyContent:"center",
      alignItems: "center",
      fontWeight: "bold"
 }}
    onClick={() => setShowReportOptions(!showReportOptions)}
    title="بلّغ"
  >
    بلّغ
    <FaExclamationTriangle />
  </button>

  {/* اطلب مساعدة */}
  <button
    style={{
      color: "#27ae60",
      border: "2px solid #27ae60",
      cursor: "pointer",
      padding: "12px",
      borderRadius: "10px",
      fontSize: "15px",
      display: "flex",
     flexDirection: "row" ,
      gap: "5px" ,
      width: '35%' ,
      justifyContent:"center",
      alignItems: "center",
      fontWeight: "bold"
    }}
    onClick={() => setShowHelpOptions(!showHelpOptions)}
    title="اطلب مساعدة"
  >
    اطلب مساعدة
    <FaHandsHelping />
  </button>

  {/* السجل */}
  <button
    style={{
      color: "#8e44ad",
      border: "2px solid #8e44ad",
      cursor: "pointer",
      padding: "12px",
      borderRadius: "10px",
      fontSize: "15px",
      display: "flex",
      flexDirection: "row" ,
      gap: "5px",
      width: "25%",
      height: "50px",
      justifyContent:"center",
      alignItems: "center",
      fontWeight: "bold"
    }}
    onClick={() => setShowLog(!showLog)}
    title="السجل"
  >
    السجل
<RiChatHistoryFill />
  </button>
 </div>
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
        fontSize: '20px',
        width: "320px"
      }}
      className="startBtn"
      onClick={handleStartTrip}
    >
      أبدأ الرحلة
    </button>
    </div>
    </div>
             {/* خيارات المساعدة */}
{showHelpOptions && (
  <div
   className="modal-overlay"
    onClick={() => setShowHelpOptions(false)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="modal-content"
    >
                  {/* X Button */}
      <button
        className="modal-close"
        onClick={() => setShowHelpOptions(false)}
      >
        &times;
      </button>
      <h3 style={{ marginBottom: "15px" }}>اطلب مساعدة:</h3>
      {["سطحة", "مساعد شخصي", "بطارية", "بنشر", "وقود"].map((type) => (
        <button
          key={type}
          onClick={() => handleHelpRequest(type)}
          style={{
            display: "block",
            width: "100%",
            marginBottom: 10,
            background: "#27ae60",
            color: "#fff",
            borderRadius: "6px",
            padding: "10px",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {type}
        </button>
      ))}
    </div>
  </div>
)}

      {/* خيارات البلاغ */}
{showReportOptions && (
  <div
   className="modal-overlay"
    onClick={() => setShowReportOptions(false)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="modal-content"
    >
            {/* X Button */}
      <button
        className="modal-close"
        onClick={() => setShowReportOptions(false)}
      >
        &times;
      </button>
      <h3 style={{ marginBottom: "15px" }}>اختر نوع البلاغ:</h3>
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
            width: "100%",
            marginBottom: 10,
            background: "#e74c3c",
            color: "#fff",
            borderRadius: "6px",
            padding: "10px",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {type}
        </button>
      ))}
    </div>
  </div>
)}

{/* خيارات السجل */}
{showLog && (
  <div
   className="modal-overlay"
    onClick={() => setShowLog(false)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="modal-content"
    >
       {/* X Button */}
      <button
        className="modal-close"
        onClick={() => setShowLog(false)}
      >
        &times;
      </button>
      <h3 style={{ marginBottom: "15px" }}>سجل النشاط:</h3>
      {activityLog.length === 0 ? (
        <p>لا يوجد بلاغات أو طلبات مساعدة</p>
      ) : (
        activityLog.map((item, index) => (
          <div key={index} style={{ marginBottom: 10 }}>
            <strong>{item.type}:</strong> {item.content}
            <br />
            <small>{item.timestamp}</small>
          </div>
        ))
      )}
    </div>
  </div>
)}
   
    </div>
</React.Fragment>
    )
    }
export default TripNavigator;