'use client';
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: "/dessert/hawaii.svg",
    title: "AND",
    description: "เหมือนการคูณ เงื่อนไขทั้งสองต้องเป็นจริงเท่านั้นถึงจะผ่าน",
    bgColor: "bg-[#070158]",
    borderColor: "border-blue-300",
    accentColor: "bg-blue-500",
  },
  {
    icon: "/dessert/matcha.svg",
    title: "OR",
    description: "เงื่อนไขอย่างน้อยหนึ่งข้อ หรือทั้งสองข้อ ต้องเป็นจริง",
    bgColor: "bg-[#1a2f1c]",
    borderColor: "border-green-300",
    accentColor: "bg-green-500",
  },
  {
    icon: "/dessert/strawberry.svg",
    title: "NOR",
    description: "เงื่อนไขทั้งสองข้อจะต้องไม่เป็นจริงเลย เป็นตรงข้ามกับ OR",
    bgColor: "bg-[#390101]",
    borderColor: "border-pink-300",
    accentColor: "bg-pink-500",
  },
  {
    icon: "/dessert/macaron.svg",
    title: "NOT",
    description: "กลับค่าความจริง เช่น จริงจะกลายเป็นเท็จ และเท็จจะกลายเป็นจริง",
    bgColor: "bg-[#230d3d]",
    borderColor: "border-purple-300",
    accentColor: "bg-purple-500",
  },
];

const Benefits = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = benefits[activeIndex];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4">
            Logic Gate
          </h1>
          <p className="text-lg sm:text-xl text-slate-300">
            Select a gate
          </p>
        </div>

        {/* Character Selector */}
        <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4 lg:gap-6 p-2 sm:p-4 bg-white/5 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/10 max-w-full">
            {benefits.map((item, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveIndex(i)}
                className={`relative p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl transition-all duration-300 min-w-0 flex-1 sm:flex-initial ${
                  i === activeIndex
                    ? `${item.bgColor} ${item.borderColor} border-2 shadow-lg`
                    : "bg-white/10 hover:bg-white/20 border border-white/20"
                }`}
              >
                <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mx-auto mb-1 sm:mb-2">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-white font-semibold text-xs sm:text-sm">
                  {item.title}
                </div>
                {i === activeIndex && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 ${item.accentColor} rounded-full`}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Main Character Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-center">
          {/* Character Portrait */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 flex justify-center order-1 lg:order-none"
          >
            <div className={`relative p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl ${active.bgColor} ${active.borderColor} border-2 shadow-2xl`}>
              <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto">
                <Image
                  src={active.icon}
                  alt={active.title}
                  width={192}
                  height={192}
                  className="w-full h-full object-contain filter drop-shadow-lg"
                />
              </div>
              <div className={`absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-4 h-4 sm:w-6 sm:h-6 ${active.accentColor} rounded-full shadow-lg`} />
              <div className={`absolute -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 w-3 h-3 sm:w-4 sm:h-4 ${active.accentColor} rounded-full shadow-lg`} />
            </div>
          </motion.div>

          {/* Character Info */}
          <motion.div
            key={`info-${activeIndex}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-none"
          >
            {/* Name Badge */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4">
              <div className={`px-3 py-1 sm:px-4 sm:py-2 ${active.accentColor} rounded-full`}>
                <span className="text-white font-bold text-xs sm:text-sm">LOGIC GATE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center sm:text-left">
                {active.title}
              </h2>
            </div>

            {/* Description Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-4">Ability Description</h3>
              <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed">
                {active.description}
              </p>
            </div>

            {/* Stats/Properties */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white/5 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/10">
                <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Type</h4>
                <p className="text-slate-300 text-xs sm:text-sm lg:text-base">Boolean Logic Operator</p>
              </div>
              <div className="bg-white/5 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/10">
                <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Complexity</h4>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                        i < (activeIndex === 3 ? 2 : activeIndex === 0 ? 3 : activeIndex === 1 ? 2 : 4)
                          ? active.accentColor
                          : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;