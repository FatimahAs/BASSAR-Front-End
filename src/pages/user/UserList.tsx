import React from "react";
import UserSidebar from "../../components/UserSidebar";
import { Button } from "../../components/ui/Button";
import { Trash, Plus, Bell } from "lucide-react"

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
]


const UserList: React.FC = () => {
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
             <button className="bg-[#F8D203] hover:bg-yellow-500 text-white px-4 py-2 rounded font-medium w-full md:w-auto">
          <div className="flex flex-row"><p>اضافة تحذير </p>  <Plus className="mr-2"/></div>
          </button>
           <Button className="bg-[#F8D203] rounded flex gap-2 items-center">
           <Bell color="#ffffff" />
          </Button>
         </div>
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
                <div className="mt-2 flex flex-row justify-between items-center"><p className="text-lg text-gray-500">{trip.price}</p></div>
                {/*<div className="mt-2 flex flex-wrap gap-1">
                  {trip.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>*/}
              </div>
                </div>


              <span className="absolute top-2 right-2 text-xs bg-yellow-400 text-black px-2 py-0.5 rounded-full">
                New
              </span>
            </div>
          ))}
        </div>

      </main>
    </div>
 
  );
};

export default UserList;
