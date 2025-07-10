import React from "react";
import {Link} from 'react-router'

function Header() {
  return (
    <div>
      {" "}
      <section className="flex flex-col items-center justify-center text-center p-10 bg-[#1f1c3d]">
        <h2 className="text-4xl font-bold mb-4">بصّار، لتكن على بصيرة </h2>
        <p className="text-lg max-w-xl text-yellow-100">
          سافر واطمّن – بصار يكشف لك المخاطر أول بأول باستخدام تحديثات مباشرة.
        </p>
        <Link to="map">
           <button className="mt-6 px-6 py-3 text-lg font-semibold bg-[#F8D203] text-[#272343] rounded hover:opacity-90 transition cursor-pointer">
          ابدأ الآن
        </button>
       </Link>
      </section>
    </div>
  );
}

export default Header;