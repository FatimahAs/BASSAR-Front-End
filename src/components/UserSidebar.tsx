import React, { useState } from "react";
import { Button } from "./ui/Button";
import { Link,useLocation,useNavigate } from "react-router"
import {  LogOut } from "lucide-react";

export default function AdminSidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();


  const handleOverlayClick = () => {
    setMenuOpen(false);
  };


  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("لا يوجد مستخدم مسجل دخول");
      return;
    }

    try {
      const res = await fetch("https://bassar-back-end.onrender.com/api/users/logout", {
        method: "POST",
        headers: {
          token: `${token}`,
        },
      });

      if (res.ok) {
        localStorage.removeItem("token");
        alert("تم تسجيل الخروج بنجاح");
        navigate("/signin");
      } else {
        alert("فشل تسجيل الخروج");
      }
    } catch (err) {
      console.error(err);
      alert("خطأ في الاتصال بالخادم");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {menuOpen && (

        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={handleOverlayClick}
        ></div>
      )}

      {/* Sidebar **/}
      <aside className="w-64 bg-white p-6 border-r border-[#d8d0d090] hidden md:block">
        <div className="flex justify-center items-center">
           <img src="/assets/logo.png" className=" w-25 mb-9" />
          </div>
    
        


 <nav className="space-y-3 relative">
      <Link to="/user">
        <Button
          variant={currentPath === "/user" ? "default" : "ghost"}
          className={`w-full ${
            currentPath === "/user"
              ? "bg-yellow-400 text-black"
              : "justify-start"
          }`}
        >
          لوحة التحكم
        </Button>
      </Link>
      <Link to="/userlist">
        <Button
          variant={currentPath === "/userlist" ? "default" : "ghost"}
          className={`w-full ${
            currentPath === "/userlist"
              ? "bg-yellow-400 text-black"
              : "justify-start"
          }`}
        >
        طلب المساعدة
        </Button>
          </Link>
             <Link to="/dangerlist">
        <Button
          variant={currentPath === "/dangerlist" ? "default" : "ghost"}
          className={`w-full ${
            currentPath === "/dangerlist"
              ? "bg-yellow-400 text-black"
              : "justify-start"
          }`}
        >
         التحذيرات المضافة
        </Button>
      </Link>
      <Link to="/userhistory">
        <Button
          variant={currentPath === "/userhistory" ? "default" : "ghost"}
          className={`w-full ${
            currentPath === "/userhistory"
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
          <p className="font-semibold">User</p>
          <p className="text-xs text-gray-400">user@user.com</p>
        </div>
        <LogOut className="mr-auto text-red-500 cursor-pointer" />
      </div>
    </nav>




      </aside>
	 </div>

  )


    
   
  ;

}
