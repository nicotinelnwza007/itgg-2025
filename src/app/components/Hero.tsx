import React from "react";
import Image from "next/image";
const Hero = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4 w-full h-screen md:h-[90vh] lg:h-screen">
            <Image
                src="/logo.jpg"
                width={400}
                height={400}
                alt="Picture of the author"
            />

            <div className="flex flex-col gap-4 py-4 text-center">
                <h4 className="text-[#FCD9C5] font-bold text-4xl"> </h4>
                <h2 className="text-[#FCD9C5] text-2xl"> </h2>
            </div>
        </div>
    );
};
export default Hero;
