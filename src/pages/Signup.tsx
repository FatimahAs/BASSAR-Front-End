import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router";
import axios from 'axios';
import Swal from 'sweetalert2';
export default function SignUpPage() {
   const navigator = useNavigate();
   
   const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone:'',
   
  });

  const validateForm = () => {
    if (!form.name || !form.email || !form.password || !form.phone  ) {
      Swal.fire('خطأ', 'جميع الحقول مطلوبة', 'error');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      Swal.fire('خطأ', 'الإيميل غير صالح', 'error');
      return false;
    }

    if (form.password.length < 6) {
      Swal.fire('خطأ', 'كلمة المرور يجب أن تكون على الأقل 6 أحرف', 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const { data } = await axios.post('https://bassar-back-end.onrender.com/api/users/register-user', form);
      // تخزين التوكن في localStorage إذا أرسلته من السيرفر
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      Swal.fire('تم', 'تم التسجيل بنجاح', 'success');
      navigator('/user')
    } catch (err) {
      Swal.fire('خطأ', err.response?.data?.message || 'فشل في التسجيل', 'error');
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
          لتكن على بصيرة
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-[#272343] mb-1">
              الإسم
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-[#F8D203] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F8D203] bg-white/80 placeholder-gray-500"
                onChange={e => setForm({ ...form, name: e.target.value })} 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#272343] mb-1">
              رقم الجوال
            </label>
            <input
              type="tel"
              placeholder="+966"
              className="w-full px-4 py-2 border border-[#F8D203] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F8D203] bg-white/80 placeholder-gray-500"
                 onChange={e => setForm({ ...form, phone: e.target.value })} 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#272343] mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-[#F8D203] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F8D203] bg-white/80 placeholder-gray-500"
                 onChange={e => setForm({ ...form, email: e.target.value })} 
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-[#272343] mb-1">
              كلمة السر
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border border-[#F8D203] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F8D203] bg-white/80 placeholder-gray-500"
                onChange={e => setForm({ ...form, password: e.target.value })} 
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-9 text-[#272343] hover:text-gray-700"
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
            className="w-full mt-5 bg-[#F8D203] hover:bg-[#f8d30381] text-[#272343] font-semibold py-2 rounded-xl transition"
          >
            تسجيل
          </button>

          <div className="flex justify-center items-center">
            <p className="p-1 text-[#272343]"> لديك حساب ؟! </p>
            <Link className="underline text-[#272343]" to="/signin">
              تسجيل الدخول
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <p className="p-1 text-[#272343]">   سجل كمساعد او مقدم خدمة    </p>
            <Link className="underline text-[#272343]" to="/signuphelper">
             تسجيل
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

