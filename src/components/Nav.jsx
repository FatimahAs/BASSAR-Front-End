import React from "react";
import navLogo from "../../public/assets/logo-remove.png";
import { Link } from "react-router";
function Nav() {
  return (
    <nav className="bg-[#1d1a33] shadow-md px-6 py-4 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* الشعار */}
        <div className="flex items-center ">
          <img src={navLogo} alt="Logo" className="h-10" />
          <span className="text-yellow-300 font-bold text-lg">بّصار</span>
        </div>

        {/* روابط التنقل */}
        <ul className="hidden md:flex gap-6 text-yellow-100 font-medium">
          <li>
            <a href="#home" className="hover:text-yellow-300 transition">
              الصفحة الرئيسية
            </a>
          </li>
          <li>
            <a href="#features" className="hover:text-yellow-300 transition">
              المميزات
            </a>
          </li>
          <li>
            <a href="#timeline" className="hover:text-yellow-300 transition">
              كيف يعمل
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-yellow-300 transition">
              تواصل
            </a>
          </li>
        </ul>

        {/* الزر */}
        <Link to="/signup">
          <button className="bg-yellow-400 text-[#272343] font-semibold py-2 px-4 rounded-lg hover:bg-yellow-300 transition duration-300 cursor-pointer">
            ابدأ الآن
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
