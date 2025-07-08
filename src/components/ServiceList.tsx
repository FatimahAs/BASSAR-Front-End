import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import UserSidebar from "./UserSidebar";

interface HelperUser {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  location: {
    lat: number;
    lng: number;
  };
  type: string;
}

interface ServiceItem {
  _id: string;
  name: string;
  price: number;
}

export default function ServiceList() {
  const { serviceType } = useParams<{ serviceType: string }>();
  const [helpers, setHelpers] = useState<HelperUser[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  }, []);

  useEffect(() => {
    // Fetch helpers
    fetch("http://localhost:3001/api/users/helpers")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((h: HelperUser) => h.type === serviceType);
        setHelpers(filtered);
      });

    // Fetch services
    fetch("http://localhost:3001/api/services")
      .then((res) => res.json())
      .then(setServices);
  }, [serviceType]);

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

  const sendRequest = async (helper: HelperUser) => {
    const userData = localStorage.getItem("normalUser");
    const token = localStorage.getItem("token");
    if (!userData || !token || !userLocation) {
      alert("الرجاء تسجيل الدخول والموافقة على الموقع");
      return;
    }

    // ابحث عن الخدمة المناسبة
    const matchedService = services.find(s => s.name === serviceType);
    if (!matchedService) {
      alert("الخدمة غير متوفرة");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3001/api/services/request/${matchedService._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        }
      );

      const result = await res.json();
      if (res.ok) {
        alert("تم إرسال الطلب. سيتم تحويلك لصفحة الدفع.");
        window.open(result.checkoutUrl, "_blank");
      } else {
        alert(result.message || "حدث خطأ أثناء إرسال الطلب");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("فشل إرسال الطلب");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <UserSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-2">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">المساعدين لخدمة: {serviceType}</h1>
            <p className="text-gray-500 text-sm">اختر المساعد المناسب لك</p>
          </div>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-medium w-full md:w-auto"
            onClick={() => window.location.reload()}
          >
            تحديث القائمة
          </button>
        </div>

        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="min-w-full text-right text-sm">
            <thead className="border-b border-[#7a77777e] bg-gray-50">
              <tr>
                <th className="p-4 font-medium">الاسم</th>
                <th className="p-4 font-medium hidden sm:table-cell">رقم الجوال</th>
                <th className="p-4 font-medium hidden md:table-cell">البريد الإلكتروني</th>
                <th className="p-4 font-medium hidden lg:table-cell">المسافة</th>
                <th className="p-4 font-medium">السعر</th>
                <th className="p-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {helpers.map((helper) => {
                const distance = userLocation
                  ? calculateDistance(
                      userLocation.lat,
                      userLocation.lng,
                      helper.location?.lat,
                      helper.location?.lng
                    )
                  : null;
                const price =
                  services.find((s) => s.name === serviceType)?.price || "—";

                return (
                  <tr key={helper._id} className="border-b border-[#c5c1c1a6] hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium">{helper.name}</td>
                    <td className="p-4 hidden sm:table-cell">{helper.phoneNumber}</td>
                    <td className="p-4 hidden md:table-cell">{helper.email || "—"}</td>
                    <td className="p-4 hidden lg:table-cell">
                      {distance ? distance.toFixed(2) + " كم" : "—"}
                    </td>
                    <td className="p-4">{price} ريال</td>
                    <td className="p-4">
                      <button
                        onClick={() => sendRequest(helper)}
                        className="text-blue-600 hover:underline"
                      >
                        طلب مساعدة
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
