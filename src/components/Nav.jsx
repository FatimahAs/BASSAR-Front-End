import React from "react";

function Nav() {
  return (
    <div>
      {" "}
      <nav className="bg-[#1d1a33] shadow p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">SafePath Alerts</h1>
        <button className="bg-[#F8D203] text-[#272343] font-bold py-2 px-4 rounded hover:opacity-90 transition cursor-pointer">
          Get Started
        </button>
      </nav>
    </div>
  );
}

export default Nav;
