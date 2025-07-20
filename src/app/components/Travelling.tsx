import React from 'react'
import Image from 'next/image'
import PrimaryButton from './sub/PrimaryButton'
import SecondaryButton from './sub/SecondaryButton'
const Travelling = () => {
    return (
        <div
            className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto"
            id="about"
        >
            {/* Image Section - Mobile First */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end order-first lg:order-last">
            <Image
                src="/place/itplace.jpg"
                alt="ITGG 2025 Logo"
                width={640}
                height={360}
                className="w-full max-w-[640px] aspect-video object-cover rounded-xl shadow-2xl"
            />
            </div>

            {/* Text Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left order-last lg:order-first text-white">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                    กิจกรรมจัดขึ้นที่ไหน
                </h2>
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-4 sm:mb-5">
                    กิจกรรมรอบออนไซต์จะจัดขึ้นที่ คณะเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง โดยสามารถเดินทางมายังที่คณะได้หลากหลายวิธี ทั้งรถยนต์ส่วนบุคคล รถประจำทาง รถไฟฟ้า และรถไฟ
                </p>

                {/* Button Group */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">

                    <PrimaryButton href="/know">
                        ดูวิธีการเดินทาง
                    </PrimaryButton>

                    <SecondaryButton href="/know">
                        เปิดใน Google Maps
                    </SecondaryButton>

                </div>
            </div>
        </div>
    )
}

export default Travelling