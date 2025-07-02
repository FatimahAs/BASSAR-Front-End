import { useState, type ChangeEvent, type FormEvent } from "react";
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

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.serviceType ||
      !formData.price
    ) {
      setError("يرجى تعبئة جميع الحقول");
      setLoading(false);
      return;
    }

    try {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const payload = {
            ...formData,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };

          const res = await fetch(
            "https://683f24371cd60dca33de6ad4.mockapi.io/userHelper",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }
          );

          if (!res.ok) {
            setError("فشل التسجيل. حاول لاحقاً.");
            setLoading(false);
            return;
          }

          const data = await res.json();
          navigate(`/helper/page/${data.id}`);
        },
        () => {
          setError("يرجى السماح بمشاركة الموقع الجغرافي.");
          setLoading(false);
        }
      );
    } catch (err) {
      setError("حدث خطأ أثناء الإرسال.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-blue-600 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          تسجيل مساعد جديد
        </h2>

        {error && (
          <p className="mb-4 text-red-600 text-sm text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="الاسم الكامل"
            className="input"
            required
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="البريد الإلكتروني"
            className="input"
            required
          />
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="رقم التواصل"
            className="input"
            required
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="كلمة المرور"
            className="input"
            required
          />
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className="input"
          >
            <option value="سطحة">سطحة</option>
            <option value="بطارية">بطارية</option>
            <option value="بنشر">بنشر</option>
            <option value="وقود">وقود</option>
            <option value="مساعد شخصي">مساعد شخصي</option>
          </select>
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="سعر الخدمة بالريال"
            type="number"
            className="input"
            min={0}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg bg-gradient-to-r from-teal-600 to-blue-700 text-white font-semibold text-lg transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:from-teal-700 hover:to-blue-800"
            }`}
          >
            {loading ? "جاري التسجيل..." : "تسجيل"}
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
