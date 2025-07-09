import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

function Timeline() {
  const timeline = [
    {
      step: "Start",
      description: "You launch the app and location is locked.",
    },
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

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const pathD = `
    M20 0 
    C 80 40, -40 100, 20 140 
    C 80 180, -40 240, 20 280 
    C 80 320, -40 380, 20 420
  `;

  return (
    <section
      ref={containerRef}
      className="relative px-6 py-16 max-w-3xl mx-auto"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 text-center mb-12">
        How It Works
      </h2>

      {/* SVG Path */}
      <svg
        className="absolute left-4 top-[112px] hidden md:block"
        width="100"
        height="460"
        viewBox="0 0 100 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* The visible path */}
        <motion.path
          d={pathD}
          stroke="#facc15"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Moving dot on path */}
        {isInView && (
          <motion.circle
            r="6"
            fill="#facc15"
            animate={{
              offsetDistance: ["0%", "33%", "66%", "100%"],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              times: [0, 0.33, 0.66, 1],
            }}
            style={{
              offsetPath: `path('${pathD}')`,
              offsetRotate: "auto",
            }}
          />
        )}
      </svg>

      <ol className="relative pl-14">
        {timeline.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: index * 0.3,
            }}
            className="mb-20 relative"
          >
            {/* Dot aligned visually */}
            <span className="absolute w-4 h-4 bg-yellow-400 rounded-full left-0 top-2 border-2 border-[#1d1a33]" />

            {/* Content */}
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
