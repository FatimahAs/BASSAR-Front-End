import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, MapPin, WifiOff, ShieldOff } from "lucide-react";

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

function Hero() {
  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: index * 0.2, // ← تأخير تدريجي لكل بطاقة
            }}
            className="bg-[#32305a] p-6 rounded-2xl shadow hover:shadow-md transition duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              {feature.icon}
              <h3 className="text-xl font-semibold text-yellow-300">
                {feature.title}
              </h3>
            </div>
            <p className="text-yellow-100">{feature.description}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}

export default Hero;
