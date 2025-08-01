import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router";
import Swal from 'sweetalert2';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setphone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("https://bassar-back-end.onrender.com/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone,
        password: password,
      }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      Swal.fire('تم', 'تم التسجيل بنجاح', 'success');

      // خزّن التوكن
      localStorage.setItem("token", data.token);

      // ✅ التوجيه حسب الدور
      const role = data.user?.role;

      if (role === "user") {
        navigate("/user");
      } else if (role === "helper") {
        navigate("/helpre"); // أو "/helper" إذا كانت هذي الصحيحة
      } else if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/map"); // fallback في حال ما فيه role معروف
      }
    } else {
      Swal.fire('خطأ', data.message || "رقم الجوال أو كلمة السر غير صحيحة", 'error');
    }
  } catch (err) {
    console.error(err);
    Swal.fire('خطأ', "حدث خطأ أثناء تسجيل الدخول", 'error');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-90 via-yellow-100 to-white-200 px-4">
      <div className="relative bg-white/60 backdrop-blur-xl border border-white/70 rounded-3xl shadow-xl w-full max-w-md p-8 md:p-10">
        <div className="flex flex-col justify-center items-center">
          <img src="/assets/logo-remove.png" alt="logo" className="w-30" />
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center">
            بصّار
          </h2>
        </div>

      

        <form className="space-y-4" onSubmit={handleLogin}>
          <p className="text-[#272343] text-center mt-1 mb-6 text-sm">
            {" "}
            لتكن على بصيرة{" "}
          </p>

          <div>
            <label className="block text-sm font-medium text-[#272343] mb-1">
              رقم الجوال
            </label>
            <input
              type="tel"
              placeholder="+966"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              className="w-full px-4 py-2 border border-[#F8D203] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F8D203] bg-white/80 placeholder-gray-500"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-[#272343] mb-1">
              كلمة السر
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder=""
              className="w-full px-4 py-2 border border-[#F8D203] rounded-xl  focus:outline-none focus:ring-2 focus:ring-[#F8D203] bg-white/80 placeholder-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute left-3 top-9 text-[#272343] hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeIcon className="w-5 h-5 cursor-pointer" />
              ) : (
                <EyeSlashIcon className="w-5 h-5 cursor-pointer" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full mt-5 bg-[#F8D203] hover:bg-[#f8d30381] text-[#272343] font-semibold py-2 rounded-xl transition cursor-pointer"
          >
            تسجيل الدخول
          </button>
          <div className="flex justify-center items-center">
            <p className="p-1 text-[#272343]"> لاتملك حساب ؟! </p>
            <Link className="underline text-[#272343]" to="/signup">
              {" "}
              تسجيل{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

