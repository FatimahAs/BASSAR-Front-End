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

export default function Helper() {
  

  return (
    <div className="flex min-h-screen bg-gray-50">
       <AdminSidebar/>

      {/* Content */}
      <main className=" flex-1 p-4 md:p-8">
   <div className="flex justify-between items-start flex-wrap mb-5 gap-4">
          <div>
            <h2 className="text-xl font-bold">Welcome Admin 👋</h2>
        
          </div>
          <Button className="bg-yellow-400 text-black rounded-full flex gap-2 items-center">
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


              <span className="absolute top-2 right-2 text-xs bg-yellow-400 text-black px-2 py-0.5 rounded-full">
                New
              </span>
            </div>
          ))}
        </div>

      
			  
      </main>
    </div>
  );
}

