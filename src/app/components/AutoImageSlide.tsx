"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type AutoImageSliderProps = {
  images: string[];
  interval?: number;
};

function AutoImageSlider({ images, interval = 3000 }: AutoImageSliderProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-50 overflow-hidden rounded-2xl shadow-lg">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt={`Slide ${index + 1}`}
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const images = [
  "/it.png",
  "/logo.jpg",
  "/cedt.png",
  "/it_kmitl.png"
];

export default function ImageSlider() {
  return (
    <section className="my-16 px-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#2c4673]">บรรยากาศกิจกรรม</h2>
      <AutoImageSlider images={images} />
    </section>
  );
}
