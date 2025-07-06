import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import UserSidebar from "./UserSidebar";
import { Trash } from "lucide-react";

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

  useEffect(() => {
    fetch("https://683f24371cd60dca33de6ad4.mockapi.io/helper")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((helper: HelperUser) => helper.serviceType === serviceType);
        setHelpers(filtered);
      });
  }, [serviceType]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      setLoading(false);
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

  const sendRequest = async (helper: HelperUser) => {
    if (!userLocation) return;
    const userData = localStorage.getItem("normalUser");
    if (!userData) {
      alert("لم يتم العثور على بيانات المستخدم");
      return;
    }
    const { name, phone } = JSON.parse(userData);
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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <UserSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-2">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">المساعدين لخدمة: {serviceType}</h1>
            <p className="text-gray-500 text-sm">اختر المساعد المناسب لك</p>
          </div>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-medium w-full md:w-auto">
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
                  ? calculateDistance(userLocation.lat, userLocation.lng, helper.lat, helper.lng)
                  : null;
                return (
                  <tr key={helper.id} className="border-b border-[#c5c1c1a6] hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium">{helper.name}</td>
                    <td className="p-4 hidden sm:table-cell">{helper.phone}</td>
                    <td className="p-4 hidden md:table-cell">{helper.email}</td>
                    <td className="p-4 hidden lg:table-cell">{distance?.toFixed(2)} كم</td>
                    <td className="p-4">{helper.price} ريال</td>
                    <td className="p-4">
                      <button onClick={() => sendRequest(helper)} className="text-blue-600 hover:underline">
                        طلب مساعدة
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2">
          <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
            ⬅️ السابق
          </button>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6].map((page) => (
              <button
                key={page}
                className={`w-8 h-8 rounded ${
                  page === 1
                    ? "bg-yellow-400 text-black font-medium"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
            التالي ➡️
          </button>
        </div>
      </main>
    </div>
  );
}
