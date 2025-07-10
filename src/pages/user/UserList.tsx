import React from "react";
import UserSidebar from "../../components/UserSidebar";
import { Button } from "../../components/ui/Button";
import { Bell } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

type Trip = {
  id: number;
  title: string;
  price: string;
  image: string;
};

const trips: Trip[] = [
  {
    id: 1,
    title: "سطحة",
    price: "200",
    image: "/assets/tow-truck.png",
  },
  {
    id: 2,
    title: "وقود",
    price: "50",
    image: "/assets/gas-pump.png",
  },
  {
    id: 3,
    title: "بطارية سيارة",
    price: "300",
    image: "/assets/accumulator.png",
  },
  {
    id: 4,
    title: "شخص للمساعدة ",
    price: "50-500",
    image: "/assets/man.png",
  },
];

const UserList: React.FC = () => {
  const handleRequestService = async (serviceType: string) => {
    if (!navigator.geolocation) {
      Swal.fire("خطأ", "المتصفح لا يدعم تحديد الموقع", "error");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const token = localStorage.getItem("token");
        if (!token) {
          Swal.fire("تنبيه", "يرجى تسجيل الدخول أولاً", "warning");
          return;
        }

        try {
          await axios.post(
            "https://bassar-back-end.onrender.com/api/services/request",
            {
              type: serviceType,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          Swal.fire("تم", "تم إرسال طلب المساعدة بنجاح", "success");
        } catch (err: any) {
          Swal.fire(
            "خطأ",
            err.response?.data?.message || "حدث خطأ أثناء الإرسال",
            "error"
          );
        }
      },
      () => {
        Swal.fire("خطأ", "لم يتم السماح بالوصول للموقع", "error");
      }
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <UserSidebar />

      <main className="flex-1 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-2">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">طلب المساعدة</h1>
            <p className="text-gray-500 text-sm">
              اطلب من الخدمات المساندة المتوفرة لديك حسب موفعك
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button className="bg-[#F8D203] rounded flex gap-2 items-center">
              <Bell color="#ffffff" />
            </Button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden relative cursor-pointer"
              onClick={() => handleRequestService(trip.title.trim())}
            >
              <div className="flex justify-center items-center m-3">
                <img src={trip.image} className="w-20 h-20" />
              </div>
              <div className="bg-white rounded-lg shadow transition relative">
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{trip.title}</h2>
                  <div className="mt-2 flex flex-row justify-between items-center">
                    <p className="text-lg text-gray-500">{trip.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserList;
