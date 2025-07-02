import { Link } from "react-router";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-1 w-full">
      <h1 className="text-3xl font-bold mb-8">أهلاً بك!</h1>
      <div className="space-y-4">
        <Link to="/normaluser/login">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl w-64 m-2">
            الدخول كمستخدم عادي
          </button>
        </Link>
        <Link to="/helper/login">
          <button className="bg-green-600 text-white px-6 py-3 rounded-xl w-64 m-2">
            الدخول كمساعد
          </button>
        </Link>
      </div>
    </div>
  );
}
