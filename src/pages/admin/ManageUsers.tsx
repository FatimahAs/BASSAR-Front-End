import React,{useState} from "react";
import AdminSidebar from "../../components/AdminSidebar";
import {Plus,SaudiRiyal,Trash2,Check} from "lucide-react"

type User = {
  name: string;
  email: string;
  dateJoined: string;
  itineraries: number;
  status: "User" | "Helper";
  avatar: string | null;
};

const users: User[] = [
  {
    name: "James Anderson",
    email: "olivia@jsmastery.pro",
    dateJoined: "Jan 6, 2022",
    itineraries: 12,
    status: "User",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Michael Johnson",
    email: "phoenix@jsmastery.pro",
    dateJoined: "Jan 6, 2022",
    itineraries: 21,
    status: "User",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "David Brown",
    email: "lana@jsmastery.pro",
    dateJoined: "Jan 6, 2022",
    itineraries: 15,
    status: "Helper",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    name: "Jason Wilson",
    email: "demi@jsmastery.pro",
    dateJoined: "Jan 5, 2022",
    itineraries: 3,
    status: "User",
    avatar: "https://randomuser.me/api/portraits/men/25.jpg",
  },
  {
    name: "Mark Davis",
    email: "candice@jsmastery.pro",
    dateJoined: "Jan 5, 2022",
    itineraries: 6,
    status: "Helper",
    avatar: null,
  },
  {
    name: "Kevin Taylor",
    email: "natali@jsmastery.pro",
    dateJoined: "Jan 5, 2022",
    itineraries: 31,
    status: "User",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
  },
  {
    name: "Brian Miller",
    email: "drew@jsmastery.pro",
    dateJoined: "Jan 4, 2022",
    itineraries: 17,
    status: "User",
    avatar: "https://randomuser.me/api/portraits/men/61.jpg",
  },
  {
    name: "Orlando Diggs",
    email: "orlando@jsmastery.pro",
    dateJoined: "Jan 5, 2022",
    itineraries: 26,
    status: "Helper",
    avatar: "https://randomuser.me/api/portraits/men/71.jpg",
  },
];


const ManageUsers: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRating, setNewRating] = useState<number>(0);


  const [isModalOpen, setModalOpen] = useState(false);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [location, setLocation] = useState("");
const [password, setPassword] = useState("");
const [role, setRole] = useState<"User" | "Helper">("User");
const [services, setServices] = useState<string[]>([]);
  const openModal = (user: User) => {
    setSelectedUser(user);
    
  };

  const closeModal = () => {
    setSelectedUser(null);
  };
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-2">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">ادارة المستخدمين  </h1>
            <p className="text-gray-500 text-sm">
              يمكنك ادارة المستخدمين مثل تعديل وحذف واضافة
            </p>
          </div>
          <button onClick={() => setModalOpen(true)} className="bg-[#F8D203] hover:bg-yellow-500 text-white px-4 py-2 rounded font-medium w-full md:w-auto">
          <div className="flex flex-row"><p>اضافة مستخدمين </p>  <Plus className="mr-2"/></div>
          </button>
        </div>

        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="min-w-full text-right text-sm">
            <thead className="border-b border-[#7a77777e] bg-gray-50">
              <tr>
                <th className="p-4 font-medium">الاسم</th>
                <th className="p-4 font-medium hidden sm:table-cell">
                 البريد الالكتروني
                </th>
              
               
                <th className="p-4 font-medium">الحاله</th>
                <th className="p-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                 
                  className="border-b border-[#c5c1c1a6] hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 flex items-center gap-3">
                   {user.name}
                   
                  </td>
                  <td className="p-4 hidden sm:table-cell">{user.email}</td>
                 
                 
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === "User"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                    <td className="p-4">
                   <button  onClick={() => openModal(user)} className="bg-blue-100 text-blue-600 rounded px-2 py-1 hover:bg-gray-400">
                    المزيد
                    </button>
                  </td>
                  <td className="p-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       

         {/* Modal */}
 {isModalOpen && (
          <div className="fixed inset-0 bg-[#ffffff0b] bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
              <div className="bg-white w-full max-w-lg max-h-[90vh]  overflow-y-auto rounded-xl shadow-lg">

    <form
      onSubmit={(e) => {
        e.preventDefault();
        // هنا تضيف دالة إرسال البيانات للـAPI
        console.log({ name, email, phone, location, password, role, services });
        setModalOpen(false); // إغلاق بعد الحفظ
      }}
      className="bg-white p-6 rounded-xl w-[90%] max-w-md relative transform transition-all duration-300 scale-95 opacity-0 animate-fadeIn"
    >
      <h2 className="text-lg font-bold mb-4">إضافة / تعديل مستخدم</h2>

      {/* الاسم */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">الاسم</label>
        <input type="text" className="w-full border border-[#7a77777e] rounded px-3 py-2" required value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      {/* الايميل */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
        <input type="email" className="w-full border border-[#7a77777e] rounded px-3 py-2" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      {/* رقم الجوال */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">رقم الجوال</label>
        <input type="tel" className="w-full border border-[#7a77777e] rounded px-3 py-2" required value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>

      {/* الموقع */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">الموقع</label>
        <input type="text" className="w-full border border-[#7a77777e] rounded px-3 py-2" placeholder="رابط الموقع " value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>

      {/* كلمة المرور */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">كلمة المرور</label>
        <input type="password" className="w-full border border-[#7a77777e] rounded px-3 py-2" required value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      {/* الدور */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">الدور</label>
        <select className="w-full border border-[#7a77777e] rounded px-3 py-2" value={role} onChange={(e) => setRole(e.target.value as "User" | "Helper")}>
          <option value="User">مستخدم</option>
          <option value="Helper">مساعد</option>
        </select>
      </div>

      {/* الخدمات (إذا كان مساعد) */}
      {role === "Helper" && (
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">الخدمات</label>
          <select
            multiple
            className="w-full border border-[#7a77777e] rounded px-3 py-2"
            value={services}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
              setServices(selected);
            }}
          >
            <option value="سطحه">سطحة</option>
            <option value="بطارية">بطارية</option>
            <option value="وقود">وقود</option>
            <option value="لتقديم المساعدة الشخصية">لتقديم المساعدة الشخصية</option>
          
          </select>
        </div>
      )}

      {/* الاسعار (إذا كان مساعد) */}
      {role === "Helper" && (
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">السعر</label>
          <select
            multiple
            className="w-full border border-[#7a77777e] rounded px-3 py-2"
            value={services}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
              setServices(selected);
            }}
          >
                    <option value="10-100">10-100 <SaudiRiyal /></option>
                    <option value="200-300">200-500 <SaudiRiyal /></option>
                     <option value="500>">اكثر من 500 <SaudiRiyal/></option>
            
           
          
          </select>
        </div>
      )}
      {/* الأزرار */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={() => setModalOpen(false)}
          className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300"
        >
          إغلاق
        </button>

        <button
          type="submit"
          className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          حفظ
        </button>

        <button
          type="button"
          onClick={() => {
            // هنا تضيف دالة الحذف
            console.log("تم الحذف");
            setModalOpen(false);
          }}
          className="flex items-center gap-2 px-4 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded"
        >
          <Trash2 size={18} />
          حذف
        </button>
      </div>
              </form>
              </div>
  </div>
)}


        
          {selectedUser && (
  <div className="fixed inset-0 bg-[#ffffff0b] bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
    <div className="bg-white p-6 rounded-xl w-[90%] max-w-md relative transform transition-all duration-300 scale-95 opacity-0 animate-fadeIn">
      <h2 className="text-lg font-bold mb-4">تفاصيل المستخدم</h2>
      <p><strong>رقم الجوال:</strong> i</p>

      <p className="mt-2"><strong>تاريخ الخدمة:</strong> oo</p>

      <div className="mt-4">
        <strong>الموقع:</strong>
        <iframe
          src=''
          width="100%"
          height="200"
          className="mt-2 rounded"
          allowFullScreen
        ></iframe>
      </div>

     

      <div className="flex justify-between mt-6">
        <button
          onClick={closeModal}
          className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300"
        >
          إغلاق
                </button>
                 <button
          onClick={() => {
            alert("تم الحذف");
            closeModal();
          }}
          className="flex items-center gap-2 px-4 py-1 bg-green-100 text-green-700 hover:bg-green-200 rounded"
        >
          <Check  size={18} />
          حفظ
        </button>
    
      </div>
    </div>
  </div>
)}

      </main>
    </div>
  );
};

export default ManageUsers;
