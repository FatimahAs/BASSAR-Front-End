import { useEffect, useState } from "react";
import { useParams } from "react-router";

interface RequestItem {
  id: string;
  name: string;
  phone: string;
  lat: number;
  lng: number;
  serviceType: string;
  helperId: string;
  status: string;
}

export default function HelperUserPage() {
  const { id: helperId } = useParams<{ id: string }>();
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    const res = await fetch("https://6823a18e65ba0580339768c2.mockapi.io/ServiceList");
    const data: RequestItem[] = await res.json();
    const myRequests = data.filter(r => r.helperId === helperId);
    setRequests(myRequests);
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const toRad = (val: number) => (val * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  const acceptRequest = async (request: RequestItem) => {
    await fetch(
      `https://6823a18e65ba0580339768c2.mockapi.io/ServiceList/${request.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...request, status: "accepted" }),
      }
    );
    fetchRequests();
  };

  const endRequest = async (request: RequestItem) => {
    await fetch(
      `https://6823a18e65ba0580339768c2.mockapi.io/ServiceList/${request.id}`,
      { method: "DELETE" }
    );
    fetchRequests();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          الطلبات المرسلة إليك
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">جاري التحميل...</p>
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-500">لا يوجد طلبات حالياً</p>
        ) : (
          <div className="space-y-6">
            {requests.map((req) => {
              const distance =
                userLocation &&
                calculateDistance(userLocation.lat, userLocation.lng, req.lat, req.lng);

              return (
                <div
                  key={req.id}
                  className="border p-4 rounded-lg shadow-md bg-gray-50 space-y-2"
                >
                  <p className="font-bold text-lg">{req.name}</p>
                  {distance && (
                    <p className="text-gray-600 text-sm">يبعد: {distance.toFixed(2)} كم</p>
                  )}
                  {req.status === "pending" ? (
                    <button
                      onClick={() => acceptRequest(req)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      قبول الطلب
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-gray-600 text-sm">
                        <strong>نوع الخدمة:</strong> {req.serviceType}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <strong>الموقع:</strong>{" "}
                        <a
                          href={`https://www.google.com/maps?q=${req.lat},${req.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          افتح الخريطة
                        </a>
                      </p>
                      <button
                        onClick={() => endRequest(req)}
                        className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                      >
                        إنهاء الطلب
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
