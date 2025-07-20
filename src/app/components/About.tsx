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
                    className="w-full max-w-[520px] h-auto object-contain rounded-3xl"
                />
            </div>

            {/* Text Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left text-white">
                <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold mb-4 leading-snug ">
                    กิจกรรม ITGG คืออะไร?
                </h2>
                <div className="text-lg sm:text-base lg:text-lg mt-2 leading-normal">
                    ITGG (Infotech Tournament GateGame) คือ มหกรรมเกมภายในคณะเทคโนโลยีสารสนเทศ สจล. (KMITL) ที่รวมทั้งความมันส์ ความคิดสร้างสรรค์  ผ่านกิจกรรมที่ทั้งสนุก ท้าทาย และในปี 2025 นี้ ITGG จะกลับมาอีกครั้งในรูปแบบที่ยิ่งใหญ่กว่าเดิม! เตรียมพบกับการแข่งขันที่น่าตื่นใจหลากหลายประเภท ทั้งกีฬา , E-Sports (ROV, Valorant ฯลฯ), กิจกรรมลับสมอง/สร้างสรรค์ และอีกมากมาย ไม่ว่าคุณจะเป็นสายเกม สายโค้ด สายฮา หรือสายเชียร์ — ที่นี่คือเวทีสำหรับคุณ!
                </div>
            </div>
        </div>
    );
};

export default About;
