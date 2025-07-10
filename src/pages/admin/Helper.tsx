import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import AdminSidebar from "../../components/AdminSidebar";
import { ArrowUpRight, Bell,SaudiRiyal } from "lucide-react";
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
  }

];
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
export default function Helper() {
  

  return (
    <div className="flex min-h-screen bg-gray-50">
       <AdminSidebar/>

      {/* Content */}
      <main className=" flex-1 p-4 md:p-8">
   <div className="flex justify-between items-start flex-wrap mb-5 gap-4">
          <div>
            <h2 className="text-xl font-bold">مرحبا Admin 👋</h2>
        
          </div>
          <Button className="bg-yellow-400 text-black rounded flex gap-2 items-center">
           <Bell color="#ffffff" />
          </Button>
        </div>

        {/* Trips Grid */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden relative"
            >
              <div className="flex justify-center items-center m-3"><img src={ trip.image} className="w-20 h-20 "/></div>
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden relative">
                 <div className="p-4">
                <h2 className="text-lg font-semibold">{trip.title}</h2>
                <div className="mt-2 flex flex-row justify-between items-center"><p className="text-lg text-gray-500">{trip.price}</p><SaudiRiyal color="#f8d203" /></div>
              
              </div>
                </div>

{/*
              <span className="absolute top-2 right-2 text-xs bg-yellow-400 text-black px-2 py-0.5 rounded-full">
                New
              </span>*/}
            </div>
          ))}
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
                    <button  onClick={() => {}} className="bg-blue-100 text-blue-600 rounded px-2 py-1 hover:bg-gray-400">
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
      
			  
      </main>
    </div>
  );
}

