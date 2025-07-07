import React from "react";
import { AlertTriangle, MapPin, WifiOff, ShieldOff } from "lucide-react";
import Nav from "../components/Nav";
const features = [
  {
    icon: <AlertTriangle className="h-8 w-8 text-yellow-400" />,
    title: "Wildlife Crossings",
    description: "Get notified instantly when animals are detected nearby.",
  },
  {
    icon: <WifiOff className="h-8 w-8 text-yellow-400" />,
    title: "Transmission Blackouts",
    description: "Stay aware of signal drop zones and prepare ahead.",
  },
  {
    icon: <ShieldOff className="h-8 w-8 text-yellow-400" />,
    title: "Restricted Areas",
    description:
      "Get real-time alerts when approaching restricted or unsafe zones.",
  },
  {
    icon: <MapPin className="h-8 w-8 text-yellow-400" />,
    title: "Dangerous Terrain",
    description:
      "Cliffs, sharp turns, and high-risk areas detected in real-time.",
  },
];

const timeline = [
  { step: "Start", description: "You launch the app and location is locked." },
  { step: "Detection", description: "System checks for real-time threats." },
  {
    step: "Alert",
    description: "User is notified immediately of a nearby danger.",
  },
  {
    step: "Navigate",
    description: "Suggestions provided to avoid threats safely.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#272343] flex flex-col text-white">
      <Nav></Nav>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#32305a] p-6 rounded-2xl shadow hover:shadow-md transition duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              {feature.icon}
              <h3 className="text-xl font-semibold text-yellow-300">
                {feature.title}
              </h3>
            </div>
            <p className="text-yellow-100">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="px-6 py-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
        <ol className="relative border-l-4 border-yellow-400 ml-4">
          {timeline.map((item, index) => (
            <li key={index} className="mb-10 ml-6">
              <span className="absolute w-4 h-4 bg-yellow-400 rounded-full -left-2 animate-pulse" />
              <h3 className="text-xl font-semibold text-yellow-300">
                {item.step}
              </h3>
              <p className="text-yellow-100">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <footer className="mt-auto p-6 text-center text-yellow-200 text-sm bg-[#1d1a33]">
        &copy; {new Date().getFullYear()} SafePath Inc. All rights reserved.
      </footer>
    </main>
  );
}
