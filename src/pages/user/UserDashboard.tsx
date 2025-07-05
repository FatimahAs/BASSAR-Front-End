import React from "react";
import { Card, CardContent } from "../../components/ui/Card";
import { ArrowUpRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";
import Sidebar from "../../components/AdminSidebar";





const UserDashboard = () => {



  return (
    <div className="min-h-screen bg-gray-50 flex text-gray-800">
      <Sidebar/>

      {/* Main content */}
      <main className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold">مرحبا  👋</h2>
            <p className="text-sm text-gray-500">لتكن على بصيرة
            </p>
          </div>
         
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold">12,450</h3>
              <p className="text-xs text-green-500 flex items-center gap-1">
                <ArrowUpRight size={14} /> 12% vs last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Total danger zones</p>
              <h3 className="text-2xl font-bold">3,210</h3>
              <p className="text-xs text-red-500">-2% vs last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Active helpers</p>
              <h3 className="text-2xl font-bold">520</h3>
              <p className="text-xs text-green-500">+2% vs last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Trips section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Trips</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {["Hofuf", "Madinah", "AlUla", "Al-Ahsa Oasis"].map((city, i) => (
              <Card key={i} className="relative">
                <span className="absolute top-2 right-2 bg-yellow-300 text-xs px-2 py-1 rounded-full font-bold">New</span>
                
                <div className="h-32 bg-white rounded-t flex flex-col justify-center items-center">
                  <img src="/assets/camell.png"  className="w-30 "/>
                </div>
                <CardContent className="p-4 border-1 rounded-xl border-[#f2dd3b64]">
                 
                  <h5 className="font-bold text-sm">{city}</h5>
                  <p className="text-xs text-gray-500">Saudi Arabia</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Adventurous</span>
                    <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">Beach</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Charts section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      

        

     

      
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;


