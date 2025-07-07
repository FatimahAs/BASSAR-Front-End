import React from "react";
import Hero from "../components/Hero";
import Timeline from "../components/Timeline";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <div id="timeline-section">
        <Timeline />
      </div>
    </div>
  );
};

export default Index;
