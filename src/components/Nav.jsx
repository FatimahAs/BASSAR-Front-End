import React from "react";
import navLogo from "../../public/assets/logo-remove.png";
function Nav() {
  return (
    <div>
      {" "}
      <nav className="bg-[#1E1C3D] shadow p-6 flex justify-between items-center">
        <button className="bg-[#F8D203] text-[#272343] font-bold py-2 px-4 rounded hover:opacity-90 transition cursor-pointer">
          Get Started
        </button>
        <img src={navLogo} width={150} />
      </nav>
    </div>
  );
}

export default Nav;
