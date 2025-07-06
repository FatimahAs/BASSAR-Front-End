import React from "react";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/button";
import { ArrowUpRight, Bell } from "lucide-react";
import HelperSidebar from "../../components/HelperSidebar";

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



const HelperDashboard = () => {



  return (
    <div className="min-h-screen bg-gray-50 flex text-gray-800">
      <HelperSidebar/>

      {/* Main content */}
      <main className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold">Welcome Helper 👋</h2>
            <p className="text-sm text-gray-500">لتكن على بصيرة</p>
          </div>
          <Button className="bg-yellow-400 text-black rounded-full flex gap-2 items-center">
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
            {dangers.map((danger) => (
              //<Card  className="relative">
              //  <span className="absolute top-2 right-2 bg-yellow-300 text-xs px-2 py-1 rounded-full font-bold">New</span>
                
              //  <div className="h-32 bg-white rounded-t flex flex-col justify-center items-center">
              //    <img src={danger.image}  className="w-full h-48 object-cover"/>
              //  </div>
              //  <CardContent className="p-4 border-1 rounded-xl border-[#f2dd3b64]">
                 
              //    <h5 className="font-bold text-sm">{danger.position}</h5>
              //    <p className="text-xs text-gray-500">{danger.city} </p>
              //    <div className="flex flex-wrap gap-2 mt-2">
              //      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{ danger.tag}</span>
              //      {/*<span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">Beach</span>*/}
              //    </div>
              //  </CardContent>
              //</Card>

              <div className="rounded-xl overflow-hidden border border-yellow-200 shadow-md">
  <div className="relative">
    <img src={danger.image} alt="dangers-zone" className="w-90 h-42 object-cover" />
    <span className="absolute top-2 right-2 bg-yellow-400 text-black text-sm font-bold px-2 py-1 rounded-full">
      New
    </span>
  </div>
  <div className="p-4 text-right">
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

    
      </main>
    </div>
  );
};

export default HelperDashboard;


