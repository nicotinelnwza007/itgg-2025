import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Travelling = () => {
    return (
        <div
            className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto"
            id="about"
        >
            {/* Image Section - Mobile First */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end order-first lg:order-last">
                <Image
                    src="/logo.jpg"
                    alt="ITGG 2025 Logo"
                    width={400}
                    height={300}
                    className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] object-cover rounded-lg shadow-lg"
                />
            </div>

            {/* Text Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left order-last lg:order-first">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                    กิจกรรมจัดขึ้นที่ไหน
                </h2>
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-4 sm:mb-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto inventore
                    corporis, nesciunt rem exercitationem nobis fuga consectetur accusantium sit
                    eum dolorum culpa id assumenda hic natus, minus amet, qui optio!
                </p>
                
                {/* Button Group */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                    <Link href="/login" className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 rounded-md bg-amber-700 text-white shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-bold">
                            ดูวิธีการเดินทาง
                        </button>
                    </Link>

                    <Link href="/know" className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 rounded-md border border-amber-700 text-amber-700 bg-white hover:bg-amber-700 hover:text-white shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-bold">
                            เปิดใน Google Maps
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Travelling