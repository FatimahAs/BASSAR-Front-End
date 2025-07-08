import React, { useState } from "react";
import { Button } from "../../components/ui/button";

import { Bell,SaudiRiyal } from "lucide-react";
import UserSidebar from "../../components/UserSidebar";
import { Link } from "react-router";
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
    title: "بطارية",
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

export default function UserHistory() {
  

  return (
    <div className="flex min-h-screen bg-gray-50">
       <UserSidebar/>

      <main className=" flex-1 p-4 md:p-8">
   <div className="flex justify-between items-start flex-wrap mb-5 gap-4">
          <div>
            <h2 className="text-xl font-bold">
  Welcome {localStorage.getItem("name") || "User"} 👋
</h2>
        
          </div>
          <Button className="bg-yellow-400 text-black rounded-full flex gap-2 items-center">
           <Bell color="#ffffff" />
          </Button>
        </div>

        {/* Trips Grid */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trips.map((trip) => (
            <Link to={`/service-list/${encodeURIComponent(trip.title)}`}>
            <div
              key={trip.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden relative"
            >
              <div className="flex justify-center items-center m-3"><img src={ trip.image} className="w-20 h-20 "/></div>
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden relative">
                 <div className="p-4">
                <h2 className="text-lg font-semibold">{trip.title}</h2>
                <div className="mt-2 flex flex-row justify-between items-center"><p className="text-lg text-gray-500">{trip.price}</p><SaudiRiyal color="#f8d203" /></div>
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
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {/*<div className="flex justify-center mt-6 space-x-2">
          <button className="px-3 py-1 bg-white border border-[#d8d0d090] rounded hover:bg-gray-100">
            Previous
          </button>
          {[1, 2, 3, 4, 5, 6].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded ${
                page === 1
                  ? "bg-yellow-400 font-semibold"
                  : "bg-white border border-[#d8d0d090] hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-1 bg-white border rounded border-[#d8d0d090] hover:bg-gray-100">
            Next
          </button>
			  </div>*/}
			  
      </main>
    </div>
  );
}

