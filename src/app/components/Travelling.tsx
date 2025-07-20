import React, { useState } from 'react';
import Image from 'next/image';
import { X, Train, Car, Bus, TrainFront, Truck } from 'lucide-react';
import PrimaryButton from './sub/PrimaryButton';
import SecondaryButton from './sub/SecondaryButton';

const TravelModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[#2A1810] via-[#342016] to-[#1F1209] rounded-2xl w-full max-w-[90dvw] md:max-w-[80dvw] lg:max-w-[60dvw] overflow-y-auto relative shadow-lg mt-12">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200 z-10"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="p-6 md:p-10 text-white flex flex-col space-y-8">
          <h2 className="text-3xl font-bold text-center">
            วิธีการเดินทางมา คณะเทคโนโลยีสารสนเทศ สจล.
          </h2>

          {/* รถไฟฟ้า */}
          <div>
            <div className="flex items-center mb-3">
              <TrainFront className="w-7 h-7 mr-3" />
              <h3 className="text-xl font-semibold">รถไฟฟ้า</h3>
            </div>
            <p className="text-sm leading-relaxed">
              รถไฟฟ้าสายสีเขียวคาดยศทหารบรรดาศักดิ์จากสถานีหุ้งหงใหญ่ (SA City Line)
              ลงที่สถานีสุวรรณภูมิ แล้วต่อรถไฟฟ้าสายใหม่ รถไฟฟ้าสีทองหรือรถโดยสารประจำทาง
            </p>
          </div>

          {/* รถไฟ */}
          <div>
            <div className="flex items-center mb-3">
              <Train className="w-7 h-7 mr-3" />
              <h3 className="text-xl font-semibold">รถไฟ</h3>
            </div>
            <p className="text-sm leading-relaxed">
              รถไฟสายตะวันออก ลงที่ป้ายหยุดรถไฟพระจอมเกล้าฯ หรือสถานีหัวตะเข้
            </p>
          </div>

          {/* รถโดยสารประจำทาง */}
          <div>
            <div className="flex items-center mb-3">
              <Bus className="w-7 h-7 mr-3" />
              <h3 className="text-xl font-semibold">รถโดยสารประจำทาง</h3>
            </div>
            <p className="text-sm mb-2 leading-relaxed">
              รถโดยสารประจำทางที่ผ่านหน้าคณะเทคโนโลยีสารสนเทศ:
            </p>
            <ul className="text-sm space-y-2 pl-4 list-disc">
              <li><span className="font-medium">143(1-47) (TSB):</span> นิมมานฯ - ยืนบุรี</li>
              <li><span className="font-medium">517(1-56) (TSB):</span> อนุสาวรีย์ชัยฯ - พระจอมเกล้าลาดกระบัง</li>
              <li><span className="font-medium">3-34 (TSB):</span> บางนา - นิคมอุตสาหกรรมลาดกระบัง</li>
              <li><span className="font-medium">552(3-25E) (TSB):</span> ปากน้ำ - นิคมอุตสาหกรรมลาดกระบัง</li>
              <li><span className="font-medium">152(1-49) (TSB):</span> แฮปปี้แลนด์ - พระจอมเกล้าลาดกระบัง</li>
            </ul>
          </div>

          {/* รถสองแถว */}
          <div>
            <div className="flex items-center mb-3">
              <Truck className="w-7 h-7 mr-3" />
              <h3 className="text-xl font-semibold">รถสองแถว</h3>
            </div>
            <p className="text-sm mb-2 leading-relaxed">
              รถสองแถวที่ผ่านหน้าคณะเทคโนโลยีสารสนเทศ:
            </p>
            <ul className="text-sm space-y-2 pl-4 list-disc">
              <li><span className="font-medium">1013(555):</span> วัดราษฎร์ใหญ่ - เคหะร่มเกล้า</li>
              <li><span className="font-medium">1013(777) ARL:</span> สถานีลาดกระบัง - พระจอมเกล้าลาดกระบัง</li>
              <li><span className="font-medium">1269(HONDA):</span> หัวตะเข้ - ฮอนด้า - วิทยาลัยพณิชยการ</li>
            </ul>
          </div>

          {/* รถส่วนตัว */}
          <div>
            <div className="flex items-center mb-3">
              <Car className="w-7 h-7 mr-3" />
              <h3 className="text-xl font-semibold">รถส่วนตัว</h3>
            </div>
            <p className="text-sm leading-relaxed">
              ขับรถมาตามแผนที่มายังคณะเทคโนโลยีสารสนเทศ สจล. ได้เลย
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


const Travelling = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
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
            <button
              onClick={() => setIsModalOpen(true)}
              className="whitespace-nowrap w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 rounded-md border border-amber-700 text-amber-700 bg-white hover:bg-amber-700 hover:text-white shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out h-11 px-6 py-2 text-lg sm:text-xl font-bold"
            >
              ดูวิธีการเดินทาง
            </button>

            <SecondaryButton
              href="https://maps.app.goo.gl/heBpHSrB8KABpFwN8"
              target="_blank"
              rel="noopener noreferrer"
            >
              เปิดใน Google Maps
            </SecondaryButton>
          </div>
        </div>
      </div>

      {/* Travel Modal */}
      <TravelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Travelling;