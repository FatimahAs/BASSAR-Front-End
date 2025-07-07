import React from "react";
import { motion } from "framer-motion";

function Timeline() {
  const timeline = [
    {
      step: "Start",
      description: "You launch the app and location is locked.",
    },
    {
      step: "Detection",
      description: "System checks for real-time threats.",
    },
    {
      step: "Alert",
      description: "User is notified immediately of a nearby danger.",
    },
    {
      step: "Navigate",
      description: "Suggestions provided to avoid threats safely.",
    },
  ];

  return (
    <section className="px-6 py-16 max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 text-center mb-12">
        How It Works
      </h2>
      <ol className="relative border-l-4 border-yellow-400 pl-6">
        {timeline.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: index * 0.2,
            }}
            className="mb-12 relative"
          >
            <span className="absolute w-4 h-4 bg-yellow-400 rounded-full -left-6 top-1.5 border-2 border-[#1d1a33]" />
            <div className="bg-[#32305a] p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-yellow-200 mb-2">
                {item.step}
              </h3>
              <p className="text-yellow-100">{item.description}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

export default Timeline;
