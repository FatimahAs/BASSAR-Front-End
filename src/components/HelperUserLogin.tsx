import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router";

export default function HelperUserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch("https://683f24371cd60dca33de6ad4.mockapi.io/userHelper");
    const helpers = await res.json();
    const found = helpers.find(
      (h: any) => h.email === email && h.password === password
    );
    if (found) {
      navigate(`/helper/page/${found.id}`);
    } else {
      alert("بيانات غير صحيحة");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-700 via-teal-600 to-blue-600 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          تسجيل دخول المساعد
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
            autoComplete="email"
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
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-600 to-teal-700 text-white font-semibold text-lg hover:from-green-700 hover:to-teal-800 transition"
          >
            دخول
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          لا تملك حساب؟{" "}
          <Link
            to="/helper"
            className="text-green-700 hover:underline font-semibold"
          >
            سجل الآن
          </Link>
        </p>
      </div>
    </div>
  );
}
