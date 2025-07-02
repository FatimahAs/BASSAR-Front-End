import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

interface HelperUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  lat: number;
  lng: number;
  serviceType: string;
  price: string;
}

export default function ServiceList() {
  const { serviceType } = useParams<{ serviceType: string }>();
  const [helpers, setHelpers] = useState<HelperUser[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // جلب المساعدين
  useEffect(() => {
    fetch("https://683f24371cd60dca33de6ad4.mockapi.io/userHelper")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((helper: HelperUser) => helper.serviceType === serviceType);
        setHelpers(filtered);
      });
  }, [serviceType]);

  // تحديد موقع المستخدم
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      setLoading(false);
    });
  }, []);

  // حساب المسافة بالكيلومتر
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

  // إرسال الطلب
  const sendRequest = async (helper: HelperUser) => {
    if (!userLocation) return;

    const name = prompt("اكتب اسمك:");
    const phone = prompt("اكتب رقم التواصل:");

    if (!name || !phone) return;

    await fetch("https://6823a18e65ba0580339768c2.mockapi.io/ServiceList", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        lat: userLocation.lat,
        lng: userLocation.lng,
        serviceType,
        helperId: helper.id,
        status: "pending",
      }),
    });

    alert("تم إرسال الطلب للمساعد");
    navigate(`/map`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
          المساعدين المتاحين لخدمة: {serviceType}
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">جارٍ تحميل الموقع...</p>
        ) : helpers.length === 0 ? (
          <p className="text-center text-red-500">لا يوجد مساعدون لهذه الخدمة حالياً</p>
        ) : (
          <div className="space-y-6">
            {helpers.map((helper) => {
              const distance = userLocation
                ? calculateDistance(userLocation.lat, userLocation.lng, helper.lat, helper.lng)
                : null;

              return (
                <div
                  key={helper.id}
                  className="border p-4 rounded-lg shadow-sm flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold text-lg">{helper.name}</p>
                    <p className="text-sm text-gray-600">المسافة: {distance?.toFixed(2)} كم</p>
                    <p className="text-sm text-gray-600">السعر: {helper.price} ريال</p>
                  </div>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => sendRequest(helper)}
                  >
                    طلب مساعدة
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
