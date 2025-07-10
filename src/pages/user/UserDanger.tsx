import React,{useState,useEffect} from "react";
import UserSidebar from "../../components/UserSidebar";
import { Button } from "../../components/ui/Button";
import { Trash, Plus, Bell } from "lucide-react"
import axios from 'axios';
import Swal from 'sweetalert2';

type Trip = {
  position: string;
  city: string;
  image: string;
  tag: string;
};

const trips: Trip[] = [
  {
    "position": "وادي الدواسر",
    "city":"الرياض",
  "image": "/assets/camell.png",
  "tag":' ممر جمال '
  },
   {
  
    "position": "مرتفعات السودة ",
    "city":"ابها",
  "image": "/assets/dangers-road.png",
  "tag":' منحدر  جبلي وعر  '
  },
    {
 
    "position": "  جبل نهران ",
    "city":"ابها",
  "image": "/assets/rock.png",
  "tag":' انهيارات صخرية'
  },
    {
 
    "position": " النفوذ ",
    "city":"الجوف - حائل ",
  "image": "/assets/desert.png",
  "tag":'  طريق مقطوعة'
}
]

const UserDanger: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  





  const [form, setForm] = useState({
    name: '',
    type: '',
     latitude: '',
  longitude: '',
  });

  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // ✅ جلب الموقع الحالي

  useEffect(() => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        setLocation({ latitude, longitude });

        // ✅ انسخ الإحداثيات إلى الفورم مباشرة
        setForm((prev) => ({
          ...prev,
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        }));
      },
      (err) => {
        Swal.fire('خطأ', 'لم يتم السماح بالوصول للموقع', 'error');
      }
    );
  } else {
    Swal.fire('خطأ', 'المتصفح لا يدعم تحديد الموقع الجغرافي', 'error');
  }
}, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!location) {
      Swal.fire('خطأ', 'لم يتم تحديد الموقع بعد', 'error');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire('خطأ', 'يجب تسجيل الدخول أولًا', 'error');
      return;
    }

    try {
      const response = await axios.post(
        'https://bassar-back-end.onrender.com/api/danger-zones/danger-zones',
        {
          name: form.name,
          type: form.type,
          latitude: location.latitude,
          longitude: location.longitude,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire('تم', 'تمت إضافة المنطقة بنجاح', 'success');
      setForm({ name: '', type: '', latitude: '',longitude: '' });
    } catch (err: any) {
      Swal.fire('خطأ', err.response?.data?.message || 'حدث خطأ أثناء الإرسال', 'error');
    }
  };

 




const getLocationNow = () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        setLocation({ latitude, longitude });

        setForm((prev) => ({
          ...prev,
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        }));

        Swal.fire('تم', 'تم تحديث الموقع الحالي بنجاح', 'success');
      },
      () => {
        Swal.fire('خطأ', 'لم يتم السماح بالوصول للموقع', 'error');
      }
    );
  } else {
    Swal.fire('خطأ', 'المتصفح لا يدعم تحديد الموقع الجغرافي', 'error');
  }
};







  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
    <UserSidebar/>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-2">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">التحذيرات المضافة </h1>
            <p className="text-gray-500 text-sm">
              اضف التحذيرات التي واجهتك على الطريق لتنبيه غيرك
            </p>
          </div>
          <div className="flex flex-row gap-3">
             <button onClick={() => setModalOpen(true)}  className="bg-[#F8D203] hover:bg-yellow-500 text-white px-4 py-2 rounded font-medium w-full md:w-auto">
          <div className="flex flex-row"><p>اضافة تحذير </p>  <Plus className="mr-2"/></div>
          </button>
           <Button className="bg-[#F8D203] rounded flex gap-2 items-center">
           <Bell color="#ffffff" />
          </Button>
         </div>
        </div>
  {/* Trips Grid */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {trips.map((trip) => (
            <div
              
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden relative"
            >
              <div className="flex justify-center items-center m-3"><img src={ trip.image} className="w-full h-[30vh]"/></div>
           
                 <div className="p-4">
                <h2 className="text-lg font-semibold">{trip.position}</h2>
                <div className="mt-2 flex flex-row justify-between items-center"><p className="text-lg text-gray-500">{trip.city}</p></div>
                <div className="mt-2 flex flex-wrap gap-1">
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                      {trip.tag}
                    </span>
               
                </div>
              </div>
               


              {/*<span className="absolute top-2 right-2 text-xs bg-yellow-400 text-black px-2 py-0.5 rounded-full">
                New
              </span>*/}
            </div>
          ))}
        </div>


        
      {/* Modal */}
 {isModalOpen && (
          <div className="fixed inset-0 bg-[#ffffff0b] bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
              <div className="bg-white w-full max-w-lg max-h-[90vh]  overflow-y-auto rounded-xl shadow-lg">

     <form onSubmit={handleSubmit} className="p-4 space-y-3">
      <input
        type="text"
        name="name"
        placeholder="اسم المنطقة"
        className="border p-2 w-full"
        value={form.name}
        onChange={handleChange}
        required
                />
          <input
  type="text"
  name="latitude"
  placeholder="خط العرض"
  className="border p-2 w-full bg-gray-100"
  value={form.latitude}
 
/>

<input
  type="text"
  name="longitude"
  placeholder="خط الطول"
  className="border p-2 w-full bg-gray-100"
  value={form.longitude}
  
/>

      <select
        name="type"
        className="border p-2 w-full"
        value={form.type}
        onChange={handleChange}
        required
      >
        <option value="">اختر نوع المنطقة</option>
        <option value="حفرة">حفرة عميقه </option>
        <option value="منطقة مقطوعة">منطقة مقطوعة</option>
                  <option value="منطقة محظورة">منطقة محظورة</option>
                  <option value="منطقة محظورة">منطقة وعرة</option>
                  <option value="منطقة محظورة"> ممر جمال </option>
                </select>
                


               <button
  type="button"
  onClick={getLocationNow}
  className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
>
  تحديث موقعي الآن
</button> 

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        إضافة
      </button>
    </form>
              </div>
  </div>
)}

      </main>
    </div>
    
  );
};

export default UserDanger;
