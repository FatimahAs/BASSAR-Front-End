import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router";
import { LogOut } from "lucide-react";
import Swal from "sweetalert2";

export default function AdminSidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) setUserName(storedName);
  }, []);

  const handleOverlayClick = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "لا يوجد مستخدم مسجل دخول",
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
        headers: {
          token: `${token}`,
        },
      });

      if (res.ok) {
        // حذف البيانات من التخزين
        localStorage.removeItem("token");
        localStorage.removeItem("name");

        Swal.fire({
          icon: "success",
          title: "تم تسجيل الخروج بنجاح",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/signin");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "فشل تسجيل الخروج",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "خطأ في الاتصال بالخادم",
      });
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

      <aside className="w-64 bg-white p-6 border-r border-[#d8d0d090] hidden md:block">
        <div className="flex justify-center items-center">
          <img src="/assets/logo.png" className="w-25 mb-9" />
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
              طلب المساعدة
            </Button>
          </Link>

          <div className="absolute mt-10 right-6 flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700">
              {userName ? userName.charAt(0).toUpperCase() : "A"}
            </div>
            <div>
              <p className="font-semibold">{userName || "User"}</p>
              <p className="text-xs text-gray-400">user@user.com</p>
            </div>
            <LogOut
              className="mr-auto text-red-500 cursor-pointer"
              onClick={handleLogout}
            />
          </div>
        </nav>
      </aside>
    </div>
  );
}
