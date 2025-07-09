import React from "react";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

import { ArrowUpRight, Bell } from "lucide-react";
import UserSidebar from "../../components/UserSidebar";

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



const UserDashboard = () => {



  return (
    <div className="min-h-screen bg-gray-50 flex text-gray-800">
      <UserSidebar/>

      {/* Main content */}
      <main className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold">Welcome User 👋</h2>
            <p className="text-sm text-gray-500">لتكن على بصيرة</p>
          </div>
          <Button className="bg-yellow-400 text-black rounded-full flex gap-2 items-center">
           <Bell color="#ffffff" />
          </Button>
        </div>

       

        {/* Trips section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Trips</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dangers.map((danger) => (
      

              <div className="rounded-xl overflow-hidden border border-yellow-200 shadow-md">
  <div className="relative">

    <img src={danger.image} alt="dangers-zone" className="w-60 h-42 object-cover" />

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

export default UserDashboard;


