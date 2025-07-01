import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from "react-router";

export default function NormalUserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const res = await fetch(
        "https://683f24371cd60dca33de6ad4.mockapi.io/normaluser",
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
      if (res.ok) navigate("/map");
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          تسجيل مستخدم عادي
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="name"
            type="text"
            placeholder="الاسم الكامل"
            value={formData.name}
            onChange={handleChange}
            className="input"
            required
            autoComplete="name"
          />
          <input
            name="email"
            type="email"
            placeholder="البريد الإلكتروني"
            value={formData.email}
            onChange={handleChange}
            className="input"
            required
            autoComplete="email"
          />
          <input
            name="phone"
            type="tel"
            placeholder="رقم التواصل"
            value={formData.phone}
            onChange={handleChange}
            className="input"
            required
            autoComplete="tel"
          />
          <input
            name="password"
            type="password"
            placeholder="كلمة المرور"
            value={formData.password}
            onChange={handleChange}
            className="input"
            required
            autoComplete="new-password"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transition"
          >
            تسجيل
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          لديك حساب؟{" "}
          <Link
            to="/normaluser/login"
            className="text-indigo-700 hover:underline font-semibold"
          >
            تسجيل دخول
          </Link>
        </p>
      </div>
    </div>
  );
}
