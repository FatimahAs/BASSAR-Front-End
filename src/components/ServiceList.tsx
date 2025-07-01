import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function ServiceList() {
  const { serviceType } = useParams();
  const [helpers, setHelpers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [requestSentId, setRequestSentId] = useState<string | null>(null);

  // لحساب المسافة بين نقطتين
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // نصف قطر الأرض بالكيلومتر
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const location = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      setUserLocation(location);

      fetch("https://6823a18e65ba0580339768c2.mockapi.io/userHelper")
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter(
            (helper) =>
              helper.serviceType === serviceType &&
              calculateDistance(
                location.lat,
                location.lng,
                helper.lat,
                helper.lng
              ) <= 35
          );
          setHelpers(filtered);
        });
    });
  }, [serviceType]);

  const sendRequest = async (helperId: string) => {
    const userId = localStorage.getItem("normalUserId");
    if (!userId) return alert("الرجاء تسجيل الدخول كمستخدم عادي أولاً");

    const userRes = await fetch(
      `https://6823a18e65ba0580339768c2.mockapi.io/normaluser/${userId}`
    );
    const user = await userRes.json();

    await fetch("https://6823a18e65ba0580339768c2.mockapi.io/ServiceList", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        helperId,
        userId: user.id,
        name: user.name,
        phone: user.phone,
        lat: user.lat,
        lng: user.lng,
        serviceType,
        status: "pending",
      }),
    });

    setRequestSentId(helperId);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        مزودو خدمة: {serviceType}
      </h2>
      {helpers.length === 0 ? (
        <p className="text-center">لا يوجد مساعدين قريبين لهذه الخدمة</p>
      ) : (
        <div className="space-y-4">
          {helpers.map((helper) => {
            const distance = userLocation
              ? calculateDistance(
                  userLocation.lat,
                  userLocation.lng,
                  helper.lat,
                  helper.lng
                ).toFixed(1)
              : "؟";

            return (
              <div
                key={helper.id}
                className="bg-white shadow rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-bold">{helper.name}</h3>
                  <p className="text-gray-600">رقم التواصل: {helper.phone}</p>
                  <p className="text-gray-600">المسافة: {distance} كم</p>
                  <p className="text-gray-600">السعر: {helper.price || "غير محدد"} ريال</p>
                </div>
                <div>
                  {requestSentId === helper.id ? (
                    <span className="text-green-600 font-bold">
                      تم إرسال الطلب
                    </span>
                  ) : (
                    <button
                      onClick={() => sendRequest(helper.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      طلب مساعدة
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
