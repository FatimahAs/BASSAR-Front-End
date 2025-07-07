import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Timeline from "../components/Timeline";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#272343]  text-white">
      <Nav></Nav>
      <Header />
      <Hero />
      <Timeline />
      <Footer />
    </div>
  );
}
