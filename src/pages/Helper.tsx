import React, { useState } from "react";
import {
  Menu,
  X,
  LogOut,
  Plus,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

type Trip = {
  id: number;
  title: string;
  location: string;
  tags: string[];
  image: string;
};

const trips: Trip[] = [
  {
    id: 1,
    title: "Abha",
    location: "Abha, Saudi Arabia",
    tags: ["Mountains", "City"],
    image: "/images/abha.jpg",
  },
  {
    id: 2,
    title: "Dammam",
    location: "Eastern Province, Saudi Arabia",
    tags: ["Budget", "Beach"],
    image: "/images/dammam.jpg",
  },
  {
    id: 3,
    title: "Jazan",
    location: "Eastern Province, Saudi Arabia",
    tags: ["Luxury", "Beach"],
    image: "/images/jazan.jpg",
  },
  {
    id: 4,
    title: "Taif",
    location: "Siberia, Russia",
    tags: ["Sports", "Adventurous"],
    image: "/images/taif.jpg",
  },
  {
    id: 5,
    title: "Hofuf",
    location: "Eastern Province, Saudi Arabia",
    tags: ["Beach", "Adventurous"],
    image: "/images/hofuf.jpg",
  },
  {
    id: 6,
    title: "Madinah",
    location: "Al Madinah Region, Saudi Arabia",
    tags: ["Sports", "Adventurous"],
    image: "/images/madinah.jpg",
  },
  {
    id: 7,
    title: "AlUla",
    location: "Al Madinah Region, Saudi Arabia",
    tags: ["Mountains", "Budget"],
    image: "/images/alula.jpg",
  },
  {
    id: 8,
    title: "Al-Ahsa Oasis",
    location: "Eastern Province, Saudi Arabia",
    tags: ["Solo travel", "City"],
    image: "/images/alhasa.jpg",
  },
];

export default function Helper() {
  

  return (
    <div className="flex min-h-screen bg-gray-50">
       <Sidebar/>

      {/* Content */}
      <main className=" flex-1 p-4 md:p-8">
  

        {/* Trips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden relative"
            >
              <div
                className="h-36 bg-cover bg-center"
                style={{ backgroundImage: `url(${trip.image})` }}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{trip.title}</h2>
                <p className="text-sm text-gray-500">{trip.location}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {trip.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className="absolute top-2 right-2 text-xs bg-yellow-400 text-black px-2 py-0.5 rounded-full">
                New
              </span>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
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
			  </div>
			  
      </main>
    </div>
  );
}

