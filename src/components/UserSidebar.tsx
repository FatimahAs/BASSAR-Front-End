import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router"
import {  LogOut } from "lucide-react";

export default function AdminSidebar() {
	 const [menuOpen, setMenuOpen] = useState(false);



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

       
        <nav className="space-y-3">
				  <Link to="/user">
					   <Button variant="default" className="w-full bg-yellow-400 text-black">
            لوحة التحكم
          </Button>
				  </Link>
         <Link to="/userlist">
          <Button variant="ghost" className="w-full justify-start">
             التحذيرات المضافة
            </Button>
          </Link>
				  <Link to="/userhistory">
					   <Button variant="ghost" className="w-full justify-start">
              السجل
          </Button>
				  </Link>
				      <div className="absolute mt-10 right-6 flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700">
            A
          </div>
          <div>
            <p className="font-semibold">User</p>
            <p className="text-xs text-gray-400">user@user.com</p>
          </div>
          <LogOut className="mr-auto text-red-500 cursor-pointer" />
        </div>
        </nav>
    
      </aside>
	 </div>

  )
}
