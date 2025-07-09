import React, { useState } from "react";
import navLogo from "/assets/logo-remove.png";
import { Link } from "react-router";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/10 backdrop-blur-xl shadow-md px-6 py-4 border-b border-b-white/20 w-[70%] mx-auto">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* الشعار */}
        <div className="flex items-center">
          <img src={navLogo} alt="Logo" className="h-10" />
          <span className="text-yellow-300 font-bold text-lg ml-2">بّصار</span>
        </div>

        {/* زر القائمة للجوال */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-yellow-100 focus:outline-none"
          >
            {/* أيقونة الهامبرجر */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* روابط التنقل لسطح المكتب */}
        <ul className="hidden md:flex gap-6 text-yellow-100 font-medium">
          <li>
            <a href="#home" className="hover:text-yellow-300 transition">
              الصفحة الرئيسية
            </a>
          </li>
          <Link to="/Map">
            <li className="hover:text-yellow-300 transition cursor-pointer">
              المميزات
            </li>
          </Link>
          <Link to="/Map">
            <li className="hover:text-yellow-300 transition cursor-pointer">
              الخريطة
            </li>
          </Link>
          <Link to="/contact">
            <li className="hover:text-yellow-300 transition">تواصل</li>
          </Link>
        </ul>

        {/* الزر */}
        <Link to="/signup">
          <button className="hidden md:block bg-yellow-400 text-[#272343] font-semibold py-2 px-4 rounded-lg hover:bg-yellow-300 transition duration-300 cursor-pointer">
            ابدأ الآن
          </button>
        </Link>
      </div>

      {/* القائمة المنسدلة في الجوال */}
      {isOpen && (
        <div className="md:hidden mt-4 text-yellow-100 space-y-4">
          <a href="#home" className="block hover:text-yellow-300">
            الصفحة الرئيسية
          </a>
          <Link to="/Map" className="block hover:text-yellow-300">
            المميزات
          </Link>
          <Link to="/Map" className="block hover:text-yellow-300">
            الخريطة
          </Link>
          <Link to="/contact" className="block hover:text-yellow-300">
            تواصل
          </Link>
          <Link to="/signup">
            <button className="mt-2 bg-yellow-400 text-[#272343] font-semibold py-2 px-4 rounded-lg hover:bg-yellow-300 transition duration-300 w-full">
              ابدأ الآن
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Nav;

