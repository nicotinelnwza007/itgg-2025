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
    <div className="relative w-full min-h-[200px] sm:min-h-[250px] md:min-h-[350px] lg:min-h-[450px] aspect-video mx-auto overflow-hidden rounded-3xl sm:rounded-xl md:rounded-2xl shadow-lg">
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
            className="object-cover"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const images = [
  "/imageslide/imageslide1.jpg",
  "/imageslide/imageslide3.jpg",
  "/imageslide/imageslide4.jpg"
];

export default function ImageSlider() {
  return (
    <section className="my-8 md:my-16 px-4">
      <h2 className="text-3xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-white">บรรยากาศกิจกรรม</h2>
      <AutoImageSlider images={images} />
    </section>
  );
}