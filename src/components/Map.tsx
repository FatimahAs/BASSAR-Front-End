import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { Map } from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";import { FaExclamationTriangle, FaHandsHelping } from "react-icons/fa";
import { RiChatHistoryFill } from "react-icons/ri";
import camelWarningIcon from '../assets/den3.png';
import rockfallIcon from '../assets/den2.png';
import dangerIcon from '../assets/den1.png';
import '../App.css';
import axios from "axios";
//fix live tracking and responsive 
//add backend endpoint and test map
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
    // Wait for instructions to appear and move them
const moveInstructions = () => {
  const fullWrapper = document.querySelector(".directions-control-directions");
  const stepsContainer = document.getElementById("mapbox-directions-steps");

  if (fullWrapper && stepsContainer && !stepsContainer.contains(fullWrapper)) {
    stepsContainer.appendChild(fullWrapper);
  }

};

const stepsObserver = new MutationObserver(() => {
  moveInstructions();
});

stepsObserver.observe(document.body, {
  childList: true,
  subtree: true,
});

const stepsContainer = document.getElementById("mapbox-directions-steps");
if (stepsContainer) stepsContainer.style.display = "none";

directions.on("route", (e: any) => {
  if (stepsContainer && e.route && e.route.length > 0) {
    stepsContainer.style.display = "block";
  }
});

directions.on("clear", () => {
  if (stepsContainer) stepsContainer.style.display = "none";
});

const defaultPanel = document.querySelector(".mapboxgl-ctrl-top-left");
const customPanel = document.getElementById("directions-panel");

if (defaultPanel && customPanel) {
  const directionsUI = defaultPanel.querySelector(".mapboxgl-ctrl-directions");
  if (directionsUI) {
    customPanel.appendChild(directionsUI);
  }
}


    // RTL text fixes on style load
mapRef.current.on("load", () => {
  const layers = mapRef.current?.getStyle().layers;
  if (!layers) return;

  layers.forEach((layer) => {
    if (
      layer.type === "symbol" &&
      layer.layout &&
      typeof layer.layout["text-field"] !== "undefined"
    ) {
      try {
        if (mapRef.current?.getLayoutProperty(layer.id, "text-writing-mode") !== undefined) {
          mapRef.current.setLayoutProperty(layer.id, "text-writing-mode", ["horizontal", "vertical"]);
        }

        if (mapRef.current?.getLayoutProperty(layer.id, "text-justify") !== undefined) {
          mapRef.current.setLayoutProperty(layer.id, "text-justify", "right");
        }

        // @ts-ignore
        if (mapRef.current?.getLayoutProperty(layer.id, "text-direction") !== undefined) {
          // @ts-ignore
          mapRef.current.setLayoutProperty(layer.id, "text-direction", "rtl");
        }
      } catch (err) {
        console.warn(`❗ Failed to update layout for layer: ${layer.id}`, err);
      }
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
    const { data: dangerZones } = await axios.get("https://bassar-back-end.onrender.com/api/danger-zones/danger-zones");

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
      showNotification("لا توجد تحذيرات على المسار المختار.");
    }
  } catch (err) {
    console.error("Error fetching danger zones:", err);
    showNotification("فشل تحميل بيانات التحذيرات.");
  }
};
  const getDangerIcon = (name: string): string => {
          if (name.includes("جمال")) return camelWarningIcon;
          if (name.includes("انزلاق") || name.includes("صخور")) return rockfallIcon;
          return dangerIcon;
        };

const handleReportType = async (type: string) => {
  if (!navigator.geolocation || !mapRef.current) return;

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const coords: [number, number] = [
      pos.coords.longitude,
      pos.coords.latitude,
    ];

  
    const icon = getDangerIcon(type);

  
    let description = "تحذير عام";
    if (type.includes("جمال")) description = "تحذير من الجمال";
    else if (type.includes("منحدر") || type.includes("صخور")) description = "منحدر أو خطر صخور";


    let cityName = "غير معروف";
    try {
      const geocodeRes = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords[0]},${coords[1]}.json?access_token=${Access_Token}&language=ar`
      );

      const features = geocodeRes.data.features;
      const place = features.find((f: any) =>
        f.place_type.includes("place")
      );
      if (place) cityName = place.text;
    } catch (err) {
      console.error("Reverse geocoding failed", err);
    }

 
    try {
      const res = await axios.post("https://bassar-back-end.onrender.com/api/danger-zones/danger-zones/report", {
        name: type,
        description,
        location: {
          lat: coords[1],
          lng: coords[0],
        },
        city: cityName,
      });

      if (res.status === 200 || res.status === 201) {
        const el = document.createElement("div");
        el.style.backgroundImage = `url(${icon})`;
        el.style.width = "32px";
        el.style.height = "32px";
        el.style.backgroundSize = "contain";
        el.style.backgroundRepeat = "no-repeat";

        new mapboxgl.Marker(el)
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
      } else {
        showNotification("فشل إرسال البلاغ إلى الخادم");
      }
    } catch (error) {
      console.error("Error reporting danger zone:", error);
      showNotification("حدث خطأ أثناء إرسال البلاغ.");
    }

    setShowReportOptions(false);
  });
};



  //  const handleHelpRequest = (type: string) => {
  //   navigate(`/service-list/${encodeURIComponent(type)}`);
  // };

  

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
  )}
  const loadDangerZones = async () => {
  if (!mapRef.current) return;

  try {
    const { data } = await axios.get("https://bassar-back-end.onrender.com/api/danger-zones/danger-zones");

    if (!Array.isArray(data)) {
      console.warn("No valid danger zone data received");
      return;
    }

    data.forEach((zone: any) => {
      const el = document.createElement("div");
      el.style.width = "32px";
      el.style.height = "32px";
      el.style.backgroundSize = "contain";
      el.style.backgroundRepeat = "no-repeat";

      // Choose icon
      if (zone.name.includes("جمال")) {
        el.style.backgroundImage = `url(${camelWarningIcon})`;
      } else if (zone.name.includes("انزلاق") || zone.name.includes("صخور")) {
        el.style.backgroundImage = `url(${rockfallIcon})`;
      } else {
        el.style.backgroundImage = `url(${dangerIcon})`;
      }

      new mapboxgl.Marker(el)
        .setLngLat([zone.location.lng, zone.location.lat])
        .setPopup(new mapboxgl.Popup().setText(zone.name))
        .addTo(mapRef.current!);
    });

    if (data.length === 0) {
      showNotification("لا توجد مناطق تحذير حالياً");
    }
  } catch (error) {
    console.error("فشل جلب بيانات المناطق الخطرة:", error);
    showNotification("فشل تحميل بيانات التحذيرات");
  }
};

const checkNearbyDangerZones = async (coords: [number, number]) => {
  try {
    const { data: dangerZones } = await axios.get("https://bassar-back-end.onrender.com/api/danger-zones/danger-zones");

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

  requestAnimationFrame(() => {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerText = message;

    container.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 5000);
  });
}

 return(
  <React.Fragment>
    <div className="layout-container bg-black">
  <div id="notification-container" className="absolute top-4 right-4 z-50 flex flex-col items-end gap-2" />
  <div className="relative h-screen w-screen overflow-hidden">
  <div ref={mapContainerRef} className="absolute map-container  inset-0 z-0" />
  <div id="mapbox-directions-steps" className="absolute top-4 left-4 z-10 max-h-[300px] w-[350px] overflow-y-auto bg-white bg-opacity-90 p-4 rounded-lg shadow" />

<div
  id="directions-panel"
  className="absolute top-4 right-4 z-10 bg-white bg-opacity-90
   p-4  rounded-lg shadow-md max-w-xs w-[320px] 
   flex flex-col-reverse gap-5 justify-center items-center"
>
  {/* Start Trip Button under the input UI */}
  <button
    className=" top-40 right-1 z-10 w-full bg-yellow-400 text-white font-bold px-6 py-2 rounded-md shadow-md hover:bg-yellow-500"
    onClick={handleStartTrip}
  >
    ابدأ الرحلة
  </button>
  </div>

  {/* Bottom Navigation */}
  <div className="absolute bottom-0 w-full z-10 bg-[#f3f8fe] 
  bg-opacity-90 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 flex flex-row
  items-center justify-center gap-3 sh">
    <button
      className="flex items-center gap-2 border border-red-600 text-red-600 px-4 py-2 rounded font-semibold hover:bg-red-100"
      onClick={() => setShowReportOptions(true)}
    >
      بلّغ 
      <FaExclamationTriangle className="hidden lg:block"/>
    </button>
    <button
      className="flex items-center gap-2 border border-green-600 text-green-600 px-4 py-2 rounded font-semibold hover:bg-green-100"
      onClick={() => setShowHelpOptions(true)}
    >
      اطلب مساعدة 
     <FaHandsHelping className="hidden lg:block"/>
    </button>
    <button
      className="flex items-center gap-2 border border-purple-600 text-purple-600 px-4 py-2 rounded font-semibold hover:bg-purple-100"
      onClick={() => setShowLog(true)}
    >
      السجل 
      <RiChatHistoryFill className="hidden lg:block"/>
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
