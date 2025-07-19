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
            <div className="w-full lg:w-1/2 text-center lg:text-left text-white">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                    กิจกรรม ITGG คืออะไร?
                </h2>
                <div className="text-base md:text-lg mt-4 lg:text-xl mb-6">
                    ITGG (InfoTech GateGame) คือมหกรรมการแข่งขันภายในคณะเทคโนโลยีสารสนเทศ สจล. (KMITL) ที่รวมความมันส์ ความคิดสร้างสรรค์ และทักษะด้านเทคโนโลยีเข้าด้วยกัน ผ่านกิจกรรมที่ทั้งสนุกและท้าทาย
                    ในปี 2025 นี้ ITGG กลับมาอีกครั้งในรูปแบบที่ยิ่งใหญ่กว่าเดิม! กับการแข่งขันสุดมันส์หลากหลายประเภท ทั้ง E-Sports (ROV, Valorant ฯลฯ), การแข่งขันความรู้/ทักษะไอที, กิจกรรมลับสมอง/สร้างสรรค์ และอีกมากมาย
                    ไม่ว่าคุณจะเป็นสายเกม สายโค้ด สายฮา หรือสายเชียร์ — ที่นี่คือเวทีสำหรับคุณ!
                </div>

            </div>
        </div>
    );
};

export default About;
