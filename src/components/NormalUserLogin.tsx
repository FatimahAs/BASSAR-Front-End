import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router";

export default function NormalUserLogin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      "https://683f24371cd60dca33de6ad4.mockapi.io/normaluser"
    );
    const users = await res.json();
    const found = users.find(
      (u: { phone: string; password: string; }) => u.phone === phone && u.password === password
    );
    if (found) {
      navigate("/map");
    } else {
      alert("بيانات غير صحيحة");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          تسجيل دخول مستخدم عادي
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="tel"
            placeholder="رقم التواصل"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
            required
            autoComplete="tel"
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
            autoComplete="current-password"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-semibold text-lg hover:from-indigo-700 hover:to-purple-800 transition"
          >
            دخول
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          لا تملك حساب؟{" "}
          <Link
            to="/normal"
            className="text-indigo-700 hover:underline font-semibold"
          >
            سجل الآن
          </Link>
        </p>
      </div>
    </div>
  );
}
