import React from "react";
import { AlertTriangle, MapPin, WifiOff, ShieldOff } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <AlertTriangle className="h-8 w-8 text-yellow-400" />,
    title: "تحذيرات عبور الحيوانات",
    description: "بصار ينبهك فورًا إذا تم رصد حيوانات قريبة منك.",
  },
  {
    icon: <WifiOff className="h-8 w-8 text-yellow-400" />,
    title: "انقطاع الإرسال",
    description: "تعرف على الأماكن اللي تنقطع فيها الإشارة قبل لا توصلها.",
  },
  {
    icon: <ShieldOff className="h-8 w-8 text-yellow-400" />,
    title: "تحذير المناطق المحظورة",
    description: "تنبيهات فورية عند دخول مناطق محظورة",
  },
  {
    icon: <MapPin className="h-8 w-8 text-yellow-400" />,
    title: "التضاريس الخطرة",
    description:
      "يتم رصد المنحدرات والمنعطفات الحادة والمناطق عالية الخطورة في الوقت الحقيقي لضمان سلامتك.",
  },
];

function Hero() {
  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-[#32305a] p-6 rounded-2xl shadow hover:shadow-md transition duration-300"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3, duration: 0.9 }}
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