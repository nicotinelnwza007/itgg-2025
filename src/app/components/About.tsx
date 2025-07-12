import React from 'react';
import Image from 'next/image';

const About = () => {
    return (
        <div
            className="flex flex-col lg:flex-row items-center justify-between gap-8 px-6 py-12 max-w-6xl mx-auto"
            id="about"
        >
            {/* Logo Section */}
            <div className="flex justify-center w-full lg:w-1/2">
                <Image
                    src="/logo.jpg"
                    width={500}
                    height={500}
                    alt="ITGG 2025 Logo"
                    className="w-full max-w-[180px] sm:max-w-[220px] md:max-w-[280px] lg:max-w-[384px] h-auto object-contain"
                />
            </div>

            {/* Text Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                    กิจกรรม ITGG คืออะไร?
                </h2>
                <p className="text-base sm:text-lg leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto inventore
                    corporis, nesciunt rem exercitationem nobis fuga consectetur accusantium sit
                    eum dolorum culpa id assumenda hic natus, minus amet, qui optio!
                </p>
            </div>
        </div>
    );
};

export default About;
