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
  const [request, setRequest] = useState<RequestItem | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRequest = async () => {
    setLoading(true);
    const res = await fetch(
      "https://6823a18e65ba0580339768c2.mockapi.io/ServiceList"
    );
    const data: RequestItem[] = await res.json();
    const myRequest = data.find(
      (r) => r.helperId === helperId && r.status === "pending"
    );
    setRequest(myRequest || null);
    setLoading(false);
  };

  useEffect(() => {
    fetchRequest();
    const interval = setInterval(fetchRequest, 5000); // تحديث دوري كل 5 ثواني
    return () => clearInterval(interval);
  }, []);

  const acceptRequest = async () => {
    if (!request) return;
    await fetch(
      `https://6823a18e65ba0580339768c2.mockapi.io/ServiceList/${request.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...request, status: "accepted" }),
      }
    );
    fetchRequest();
  };

  const endRequest = async () => {
    if (!request) return;
    await fetch(
      `https://6823a18e65ba0580339768c2.mockapi.io/ServiceList/${request.id}`,
      { method: "DELETE" }
    );
    setRequest(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          الطلبات المرسلة إليك
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">جاري التحميل...</p>
        ) : !request ? (
          <p className="text-center text-gray-500">لا يوجد طلب حالياً</p>
        ) : (
          <div className="space-y-4">
            <p>
              <strong>الاسم:</strong> {request.name}
            </p>
            <p>
              <strong>رقم التواصل:</strong> {request.phone}
            </p>
            <p>
              <strong>نوع الخدمة:</strong> {request.serviceType}
            </p>
            <p>
              <strong>الموقع:</strong>{" "}
              <a
                className="text-blue-600 underline"
                href={`https://www.google.com/maps?q=${request.lat},${request.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                افتح على الخريطة
              </a>
            </p>

            {request.status === "pending" ? (
              <button
                onClick={acceptRequest}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                قبول الطلب
              </button>
            ) : (
              <button
                onClick={endRequest}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
              >
                إنهاء الطلب
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
