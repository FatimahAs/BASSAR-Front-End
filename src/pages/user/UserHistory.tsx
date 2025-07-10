import React, { useState } from "react";

import { Button } from "../../components/ui/Button";
import { Bell,SaudiRiyal,Trash,Star,Trash2 } from "lucide-react";
import UserSidebar from "../../components/UserSidebar";



type User = {
  id: string;
  name: string;
  phone: string;
  locationUrl: string;
  services: "سطحة" | "بطارية" | "شخص للمساعدة" | "وقود";
  rating: number;
  status: "قبول" | "رفض" | "مراجعة";
  date: string;
};

const users: User[] = [
  {
    id: "1",
    name: "Michael Johnson",
    phone: "phoenix@jsmastery.pro",
    locationUrl: "https://www.google.com/maps?q=24.7136,46.6753",
     services: 'بطارية',
    rating: 5,
    status: "رفض",
    date: "2025-07-07",
  },
  {
    id: "2",
    name: "Jason Wilson",
    phone: "demi@jsmastery.pro",
    locationUrl: "https://www.google.com/maps?q=24.774265,46.738586",
     services: 'بطارية',
    rating: 4,
    status: "قبول",
    date: "2025-07-07",
  },
];



export default function UserHistory() {
  //const [rating, setRating] = useState(0);
   const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRating, setNewRating] = useState<number>(0);

  const openModal = (user: User) => {
    setSelectedUser(user);
    setNewRating(user.rating);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
       <UserSidebar/>

      {/* Content */}
      <main className=" flex-1 p-4 md:p-8">
   <div className="flex justify-between items-start flex-wrap mb-5 gap-4">
          <div>
            <h2 className="text-xl font-bold">Welcome User 👋</h2>
        
          </div>

          <Button className="bg-[#F8D203] text-black rounded flex gap-2 items-center">

           <Bell color="#ffffff" />
          </Button>
        </div>

      
      


        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="min-w-full text-right text-sm">
            <thead className="border-b border-[#7a77777e] bg-gray-50">
              <tr>
                <th className="p-4 font-medium">الأسم</th>
                <th className="p-4 font-medium hidden sm:table-cell">
                  رقم الجوال 
                </th>
                {/*<th className="p-4 font-medium hidden md:table-cell">
                 تاريخ الخدمة
                </th>*/}
                <th className="p-4 font-medium hidden lg:table-cell">
                نوع الخدمة
                </th>
                 <th className="p-4 font-medium hidden lg:table-cell">
                السعر
                </th>
                <th className="p-4 font-medium">الحالة</th>
                 <th className="p-4 font-medium">التقييم</th>
                <th className="p-4 font-medium"></th>
                 {/*<th className="p-4 font-medium"></th>*/}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                 
                  className="border-b border-[#c5c1c1a6] hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 flex items-center gap-3">
                    {/*{user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                        {user.name.charAt(0)}
                      </div>
                    )}*/}
                    <span className="text-[#272343]">{user.name}</span>
                  </td>
                  <td className="p-4 hidden text-[#272343] sm:table-cell">{user.phone}</td>
                  {/*<td className="p-4 hidden text-[#272343] md:table-cell">
                    {user.dateJoined}
                  </td>*/}
                  <td className="p-4 hidden lg:table-cell">
                      <span
                      className="px-2 py-1  bg-gray-100 rounded text-xs text-[#272343] font-medium"
                    >
                      {user.services}
                    
                    </span>
                  </td>
                  <td className="p-4">
                  
                   
                      <SaudiRiyal size={'20px'} color="#272343"/>
                   
                  </td>
                  <td className="p-4">
                    <button onClick={()=> {}} className="text-gray-400 hover:text-gray-600">
                      <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                              user.status === "قبول"
                                ? "bg-green-100 text-green-600"
                                : user.status === "مراجعة"
                                ? "bg-yellow-100 text-yellow-600"
                                : user.status === "رفض"
                                ? "bg-red-100 text-red-600"
                                : ""
                            }`}
                    >
                      {user.status}
                    
                    </span>
                    </button>
                  </td>
                   
                    {/*<button onClick={()=> {}} className=" text-[#272343] hover:text-gray-400">
                      <div className="flex flex-row">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              onClick={() => setRating(star)}
                              className={`cursor-pointer text-xl ${
                                rating >= star ? "text-yellow-400" : "text-gray-300"
                              }`}
                            />
                         ))}
                        </div>
                    </button>*/}
                      <td className="p-2 text-yellow-500">
                {"⭐".repeat(user.rating)}
              </td>
                 
                    <td className="p-4">
                    <button  onClick={() => openModal(user)} className="bg-blue-100 text-blue-600 rounded px-2 py-1 hover:bg-gray-400">
                    المزيد
                    </button>
                  </td>
                   {/*<td className="p-4">
                    <button onClick={()=> {}} className="text-gray-400 hover:text-gray-600">
                     <Trash color="#e64141" />
                    </button>
                  </td>*/}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
 {/* Modal */}
     {selectedUser && (
  <div className="fixed inset-0 bg-[#ffffff0b] bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
    <div className="bg-white p-6 rounded-xl w-[90%] max-w-md relative transform transition-all duration-300 scale-95 opacity-0 animate-fadeIn">
      <h2 className="text-lg font-bold mb-4">تفاصيل المستخدم</h2>
      <p><strong>رقم الجوال:</strong> {selectedUser.phone}</p>

      <p className="mt-2"><strong>تاريخ الخدمة:</strong> {selectedUser.date}</p>

      <div className="mt-4">
        <strong>الموقع:</strong>
        <iframe
          src={selectedUser.locationUrl}
          width="100%"
          height="200"
          className="mt-2 rounded"
          allowFullScreen
        ></iframe>
      </div>

      <div className="mt-4">
        <strong>التقييم:</strong>
        <div className="flex gap-1 mt-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={24}
              className={`cursor-pointer ${
                i <= newRating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setNewRating(i)}
              fill={i <= newRating ? "#facc15" : "none"}
            />
          ))}
        </div>
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
          className="flex items-center gap-2 px-4 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded"
        >
          <Trash2 size={18} />
          حذف
        </button>
      </div>
    </div>
  </div>
)}

  
      


			  
      </main>
    </div>
  );
}

