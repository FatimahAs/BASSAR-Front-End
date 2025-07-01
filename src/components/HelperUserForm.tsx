import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from "react-router";

export default function HelperUserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    serviceType: "سطحة",
    price: "",
  });
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const res = await fetch(
        "https://6823a18e65ba0580339768c2.mockapi.io/userHelper",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        }
      );
      const data = await res.json();
      navigate(`/helper/page/${data.id}`);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-blue-600 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          تسجيل مساعد جديد
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="الاسم الكامل"
            className="input"
            required
            autoComplete="name"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="البريد الإلكتروني"
            className="input"
            required
            autoComplete="email"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="رقم التواصل"
            className="input"
            required
            autoComplete="tel"
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="كلمة المرور"
            className="input"
            required
            autoComplete="new-password"
          />
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className="input"
          >
            <option>سطحة</option>
            <option>بطارية</option>
            <option>بنشر</option>
            <option>وقود</option>
            <option>مساعد شخصي</option>
          </select>
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="سعر الخدمة بالريال"
            className="input"
            required
            type="number"
            min={0}
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-teal-600 to-blue-700 text-white font-semibold text-lg hover:from-teal-700 hover:to-blue-800 transition"
          >
            تسجيل
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          لديك حساب؟{" "}
          <Link
            to="/helper/login"
            className="text-blue-700 hover:underline font-semibold"
          >
            تسجيل دخول
          </Link>
        </p>
      </div>
    </div>
  );
}
