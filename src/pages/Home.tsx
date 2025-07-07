import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Timeline from "../components/Timeline";
import Footer from "../components/Footer";
import MapComponent from "../components/MapComponent.jsx";

export default function Home() {
  return (
    <>
      <div className="bg-[#1E1C3D] h-[100vh] text-white">
        {" "}
        <Nav />
        <div className="flex justify-center h-screen items-center">
          {" "}
          <Header />
        </div>
      </div>

      <div className="min-h-screen bg-[#272343]  text-white">
        <Hero />
        <Timeline />
        <MapComponent />
        <Footer />
      </div>
    </>
  );
}
