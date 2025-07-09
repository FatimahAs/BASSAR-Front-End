import React from "react";

function Header() {
  return (
    <div>
      {" "}
      <section className="flex flex-col items-center justify-center text-center p-10 bg-[#1f1c3d]">
        <h2 className="text-4xl font-bold mb-4">
          Real-Time Danger Alerts on the Go
        </h2>
        <p className="text-lg max-w-xl text-yellow-100">
          Stay safe wherever you travel. SafePath alerts you to immediate
          dangers in your surroundings using real-time data.
        </p>
        <button className="mt-6 px-6 py-3 text-lg font-semibold bg-[#F8D203] text-[#272343] rounded hover:opacity-90 transition cursor-pointer">
          Start Monitoring
        </button>
      </section>
    </div>
  );
}

export default Header;
