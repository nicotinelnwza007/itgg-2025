import React from 'react';
import Image from 'next/image';

const About = () => {
    return (
        <div
            className="flex flex-col lg:flex-row items-center justify-between gap-12 px-8 py-20 max-w-7xl mx-auto w-full min-h-screen max-h-[1552px]"
            id="about"
        >
            {/* Logo Section */}
            <div className="flex justify-center w-full lg:w-1/2">
                <Image
                    src="/imageslide/imageslide1.jpg"
                    width={700}
                    height={700}
                    alt="ITGG 2025 Logo"
                    className="w-full max-w-[520px] h-auto object-contain"
                />
            </div>

            {/* Text Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left text-white">
                <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold mb-4 leading-snug ">
                    กิจกรรม ITGG คืออะไร?
                </h2>
                <div className="text-lg sm:text-base lg:text-lg mt-2 leading-normal">
                    ITGG (InfoTech GateGame) คือมหกรรมการแข่งขันภายในคณะเทคโนโลยีสารสนเทศ สจล. (KMITL) ที่รวมความมันส์ ความคิดสร้างสรรค์ และทักษะด้านเทคโนโลยีเข้าด้วยกัน ผ่านกิจกรรมที่ทั้งสนุกและท้าทาย<br /><br />
                    ในปี 2025 นี้ ITGG กลับมาอีกครั้งในรูปแบบที่ยิ่งใหญ่กว่าเดิม! กับการแข่งขันสุดมันส์หลากหลายประเภท ทั้ง E-Sports (ROV, Valorant ฯลฯ), การแข่งขันความรู้/ทักษะไอที, กิจกรรมลับสมอง/สร้างสรรค์ และอีกมากมาย<br /><br />
                    ไม่ว่าคุณจะเป็นสายเกม สายโค้ด สายฮา หรือสายเชียร์ — ที่นี่คือเวทีสำหรับคุณ!
                </div>
            </div>
        </div>
    );
};

export default About;
