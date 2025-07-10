import React from "react";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { ArrowUpRight, Bell } from "lucide-react";
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


import {highestRisksData,highestRiskCitiesData} from "../../types/chart"
import AdminSidebar from "../../components/AdminSidebar";

const dangers = [
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



const AdminDashboard = () => {



  return (
    <div className="min-h-screen bg-gray-50 flex text-gray-800">
      <AdminSidebar/>

      {/* Main content */}
       {/* Main content */}
      <main className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold">مرحبا Admin  👋</h2>
            <p className="text-sm text-gray-500">بصّـار | لتكن على بصيرة </p>
          </div>
          <Button className="bg-yellow-400 text-black rounded flex gap-2 items-center">
           <Bell color="#ffffff" />
          </Button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold">12,450</h3>
              <p className="text-xs text-green-500 flex items-center gap-1">
                <ArrowUpRight size={14} /> 12% last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">مجموع المناطق الخطرة  </p>
              <h3 className="text-2xl font-bold">3,210</h3>
              <p className="text-xs text-red-500">-2%  last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">المساعدين النشطيين </p>
              <h3 className="text-2xl font-bold">520</h3>
              <p className="text-xs text-green-500">+2%  last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Trips section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">المناطق الخطرة</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dangers.map((danger) => (
           

              <div className="rounded-xl overflow-hidden border border-yellow-200 shadow-md">
                <div className="relative">
                  <img src={danger.image} alt="dangers-zone" className="w-100 h-42 object-cover" />
                  {/*<span className="absolute top-2 right-2 bg-yellow-400 text-black text-sm font-bold px-2 py-1 rounded-full">
                    New
                  </span>*/}
                </div>
                <div className="p-4 text-right border border-yellow-200">
                  <h3 className="text-sm font-bold"> {danger.position}</h3>
                  <p className="text-sm text-gray-500">{danger.city}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-gray-100 rounded text-xs">
                    { danger.tag}
                  </span>
                </div>
            </div>

            ))}
          </div>
        </div>

        {/* Charts section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
     

<Card>
  <CardContent className="p-4">
    <h4 className="font-semibold">الأعلى خطورة </h4>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={highestRisksData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" reversed />
          <YAxis orientation="right"  tickFormatter={(value) => value.toLocaleString("en-EG")} />
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
    <h4 className="font-semibold">المدن الأعلى في مستوى الخطورة  </h4>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={highestRiskCitiesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" reversed />
          <YAxis orientation="right"/>
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#e11d48" radius={[4, 4, 0, 0]} />
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


