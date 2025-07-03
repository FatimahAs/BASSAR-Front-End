import React from "react";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/button";
import { ArrowUpRight, PlusCircle } from "lucide-react";
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
import Sidebar from "../../components/Sidebar";

const userGrowthData = [
  { name: "Jan", users: 1200 },
  { name: "Feb", users: 1900 },
  { name: "Mar", users: 3000 },
  { name: "Apr", users: 1800 },
  { name: "May", users: 2000 },
  { name: "Jun", users: 1500 },
];

const highestRisksData = [
  { name: "Camel", value: 20 },
  { name: "Rockfall", value: 25 },
  { name: "Fog", value: 15 },
  { name: "Narrow", value: 30 },
  { name: "Wet Roads", value: 40 },
  { name: "Fuel", value: 18 },
  { name: "Signal", value: 10 },
];

const highestRiskCitiesData = [
  { name: "Taif", value: 1800 },
  { name: "Madinah", value: 2900 },
  { name: "Abha", value: 3100 },
  { name: "Tabuk", value: 1600 },
  { name: "Hail", value: 1200 },
  { name: "Jazan", value: 1300 },
];

const riskAccuracyData = [
  { name: "Camel", value: 20 },
  { name: "Rockfall", value: 22 },
  { name: "Fog", value: 15 },
  { name: "Narrow", value: 30 },
  { name: "Wet Roads", value: 40 },
  { name: "Fuel", value: 18 },
  { name: "Signal", value: 10 },
];




const AdminDashboard = () => {



  return (
    <div className="min-h-screen bg-gray-50 flex text-gray-800">
      <Sidebar/>

      {/* Main content */}
      <main className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold">Welcome Admin 👋</h2>
            <p className="text-sm text-gray-500">Track activity, trends, and popular destinations in real time</p>
          </div>
          <Button className="bg-yellow-400 text-black flex gap-2 items-center">
            <PlusCircle size={18} /> Create a trip
          </Button>
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
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold">User Growth</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold">Highest risks</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={highestRisksData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold">Highest-risk cities</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={highestRiskCitiesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#e11d48" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold">Risk accuracy</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={riskAccuracyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;


