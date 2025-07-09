import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("كلمة المرور غير متطابقة");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, email, password })
      });

      const data = await res.json();

      if (res.ok && data.token) {
        alert("تم التسجيل بنجاح!");
        localStorage.setItem("token", data.token); // حفظ التوكن
        navigate("/map");
      } else {
        alert(data.message || "حدث خطأ أثناء التسجيل");
      }
    } catch (err) {
      console.error(err);
      alert("فشل الاتصال بالخادم");
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

        <p className="text-[#272343] text-center mt-1 mb-6 text-sm">
          {" "}
          لتكن على بصيرة{" "}
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <div>
            <label className=" block text-sm font-medium text-[#272343] mb-1">
              الاسم
            </label>
            <input
              type="text"

              
              placeholder=" "
              className="w-full px-4 py-2 border border-[#F8D203] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F8D203] bg-white/80 placeholder-gray-500"

              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-[#F8D203] rounded-full focus:outline-none focus:ring-2 focus:ring-[#F8D203] bg-white/80 placeholder-gray-500"

              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#272343] mb-1">
              رقم الجوال
            </label>
            <input
              type="tel"

              placeholder=""
              className="w-full px-4 py-2 border border-[#F8D203] rounded-xl  focus:outline-none focus:ring-2 focus:ring-[#F8D203] bg-white/80 placeholder-gray-500"

              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-[#F8D203] rounded-full  focus:outline-none focus:ring-2 focus:ring-[#F8D203] bg-white/80 placeholder-gray-500"

              required
            />
          </div>



            <div>
            <label className="block text-sm font-medium text-[#272343] mb-1">
              البريد الألكتروني 
            </label>
            <input
              type="email"
              placeholder=" "
              className="w-full px-4 py-2 border border-[#F8D203] rounded-xl  focus:outline-none focus:ring-2 focus:ring-[#F8D203] bg-white/80 placeholder-gray-500"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#272343] mb-1">
              البريد الألكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-[#F8D203] rounded-full  focus:outline-none focus:ring-2 focus:ring-[#F8D203] bg-white/80 placeholder-gray-500"

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
              className="w-full px-4 py-2 border border-[#F8D203] rounded-full  focus:outline-none focus:ring-2 focus:ring-[#F8D203] bg-white/80 placeholder-gray-500"

              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}

              className="absolute left-3 top-9 text-[#272343] hover:text-gray-700"

              className="absolute left-3 top-8 text-[#272343] hover:text-gray-700"

            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-[#272343] mb-1">

تأكيد كلمة السر            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder=""
              className="w-full px-4 py-2 border border-[#F8D203] rounded-xl  focus:outline-none focus:ring-2 focus:ring-[#F8D203] bg-white/80 placeholder-gray-500"/>

            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-[#F8D203] rounded-full  focus:outline-none focus:ring-2 focus:ring-[#F8D203] bg-white/80 placeholder-gray-500"

              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-9 text-[#272343] hover:text-gray-700"

              className="absolute left-3 top-8 text-[#272343] hover:text-gray-700"

            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            type="submit"

            className="w-full mt-5 bg-[#F8D203] hover:bg-[#f8d30381] text-[#272343] font-semibold py-2 rounded-xl transition"
          >
             تسجيل
          </button>
          <div className="flex justify-center items-center">
            <p className="p-1 text-[#272343]"> لديك حساب ؟! </p>
            <Link className="underline text-[#272343]" to="/signin"> تسجيل الدخول</Link> 
         </div>
        </form>

    </div></div>
  );
}


