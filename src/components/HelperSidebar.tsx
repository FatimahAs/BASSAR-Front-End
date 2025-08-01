import React, { useState } from "react";
import { Button } from "./ui/Button";
import { Link,useLocation } from "react-router"
import {  LogOut } from "lucide-react";

export default function AdminSidebar() {
	 const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;



  const handleOverlayClick = () => {
    setMenuOpen(false);
  };
  return (
	  <div className="min-h-screen bg-gray-50 flex">
		     {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={handleOverlayClick}
        ></div>
      )}
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 border-r border-[#d8d0d090] hidden md:block">
        <div className="flex justify-center items-center">
           <img src="/assets/logo.png" className=" w-25 mb-9" />
          </div>

       

      
    
        

 <nav className="space-y-3 relative">
      <Link to="/helper">
        <Button
          variant={currentPath === "/helper" ? "default" : "ghost"}
          className={`w-full ${
            currentPath === "/helper"
              ? "bg-yellow-400 text-black"
              : "justify-start"
          }`}
        >
          لوحة التحكم
        </Button>
      </Link>
      <Link to="/helpreq">
        <Button
          variant={currentPath === "/helpreq" ? "default" : "ghost"}
          className={`w-full ${
            currentPath === "/helpreq"
              ? "bg-yellow-400 text-black"
              : "justify-start"
          }`}
        >
        طلبات المساعدة 
        </Button>
      </Link>
      <Link to="/helphistory">
        <Button
          variant={currentPath === "/helphistory" ? "default" : "ghost"}
          className={`w-full ${
            currentPath === "/helphistory"
              ? "bg-yellow-400 text-black"
              : "justify-start"
          }`}
        >
         السجل
        </Button>
      </Link>

      <div className="absolute mt-10 right-6 flex items-center space-x-3">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700">
          A
        </div>
        <div>
          <p className="font-semibold">Helper</p>
          <p className="text-xs text-gray-400">helper@helper.com</p>
        </div>
        <LogOut className="mr-auto text-red-500 cursor-pointer" />
      </div>
    </nav>







      </aside>
	 </div>

  )
}
