'use client';
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const benefits = [
	{
		icon: "/dessert/hawaii.svg",
		title: "AND",
		description: "อาณาจักรบลูฮาวาย ดินแดนที่เต็มเปี่ยมไปด้วยความซ่า พร้อมความหวานอมเปรี้ยวของไซรัปสีฟ้า เติมความสดใสในทุกจังหวะของอารมณ์",
		bgColor: "bg-[#070158]",
		borderColor: "border-blue-300",
		accentColor: "bg-blue-500",
	},
	{
		icon: "/dessert/matcha.svg",
		title: "OR",
		description: "อาณาจักรชาเขียว ดินแดนแห่งความสงบและความสมดุลท่ามกลางกลิ่นหอมของใบชาเขียวขจี ให้ความรู้สึกผ่อนคลาย อบอุ่น แต่แฝงไปด้วยความแข็งแกร่ง",
		bgColor: "bg-[#1a2f1c]",
		borderColor: "border-green-300",
		accentColor: "bg-green-500",
	},
	{
		icon: "/dessert/strawberry.svg",
		title: "NOR",
		description: "อาณาจักรเค้กสตรอว์เบอร์รี ดินแดนที่มาพร้อมรอยยิ้มอันสดใสดั่งผลสตรอว์เบอร์รีสีแดงฉ่ำ พร้อมส่งต่อพลังบวกที่อบอุ่นและหอมหวานในทุกคำที่ลิ้มลอง",
		bgColor: "bg-[#390101]",
		borderColor: "border-red-300",
		accentColor: "bg-red-500",
	},
	{
		icon: "/dessert/macaron.svg",
		title: "NOT",
		description: "อาณาจักรมาการอง ดินแดนอันพราวเสน่ห์และน่าค้นหา แฝงไปด้วยความซับซ้อนในรสชาติ ภายใต้เปลือกบางกรอบ และไส้อันหลากหลายที่ไม่อาจคาดเดาได้",
		bgColor: "bg-[#230d3d]",
		borderColor: "border-purple-300",
		accentColor: "bg-purple-500",
	},
];

const Benefits = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const active = benefits[activeIndex];

	return (
		<div className="min-h-screen p-10 sm:p-12 lg:p-16 mt-14">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8 sm:mb-12">
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4">
						Logic Gate
					</h1>
					<p className="text-lg sm:text-xl text-slate-300">Select a gate</p>
				</div>

				{/* Character Selector */}
				<div className="flex justify-center mb-8 sm:mb-12 lg:mb-16 overflow-x-auto no-scrollbar">
					<div className="flex gap-3 p-2 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 max-w-full min-w-[320px] sm:min-w-auto">
						{benefits.map((item, i) => {
							const isActive = i === activeIndex;
							return (
								<motion.button
									key={i}
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setActiveIndex(i)}
									className={`
                    relative
                    rounded-lg sm:rounded-xl
                    transition-all duration-300
                    flex flex-col items-center
                    flex-shrink-0
                    cursor-pointer
                    border
                    ${isActive
											? `${item.bgColor} ${item.borderColor} border-2 shadow-lg`
											: "bg-white/10 hover:bg-white/20 border-white/20"
										}
                    ${
										// Make selected button bigger on mobile
										isActive
											? "w-24 sm:w-28 lg:w-32 p-4 sm:p-5"
											: "w-16 sm:w-20 lg:w-24 p-2 sm:p-3"
										}
                  `}
								>
									<div className={`w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mb-1 sm:mb-2`}>
										<Image
											src={item.icon}
											alt={item.title}
											width={64}
											height={64}
											className="w-full h-full object-contain"
										/>
									</div>
									<div
										className={`text-white font-semibold ${isActive ? "text-sm sm:text-base" : "text-xs sm:text-sm"
											}`}
									>
										{item.title}
									</div>
									{isActive && (
										<motion.div
											layoutId="activeIndicator"
											className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 sm:w-3 sm:h-3 ${item.accentColor} rounded-full`}
										/>
									)}
								</motion.button>
							);
						})}
					</div>
				</div>

				{/* Main Character Display */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-center">
					{/* Character Portrait */}
					<motion.div
						key={activeIndex}
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
						className="lg:col-span-1 flex justify-center order-1 lg:order-none"
					>
						<div
							className={`relative p-6 rounded-2xl sm:rounded-3xl ${active.bgColor} ${active.borderColor} border-2 shadow-2xl`}
							style={{ maxWidth: "250px", width: "100%" }}
						>
							<div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto">
								<Image
									src={active.icon}
									alt={active.title}
									quality={125}
									width={192}
									height={192}
									className="w-full h-full object-contain filter drop-shadow-lg"
								/>
							</div>
							<div
								className={`absolute -top-3 -right-3 w-6 h-6 ${active.accentColor} rounded-full shadow-lg`}
							/>
							<div
								className={`absolute -bottom-3 -left-3 w-4 h-4 ${active.accentColor} rounded-full shadow-lg`}
							/>
						</div>
					</motion.div>

					{/* Character Info */}
					<motion.div
						key={`info-${activeIndex}`}
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="lg:col-span-2 space-y-6 order-2 lg:order-none px-2 sm:px-0"
					>
						{/* Name Badge */}
						<div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-5">
							<div
								className={`px-4 py-2 ${active.accentColor} rounded-full shrink-0`}
							>
								<span className="text-white font-bold text-sm sm:text-base">
									LOGIC GATE
								</span>
							</div>
							<h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center sm:text-left">
								{active.title}
							</h2>
						</div>

						{/* Description Card */}
						<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
							<h3 className="text-xl font-bold text-white mb-3">
								Ability Description
							</h3>
							<p className="text-base text-slate-200 leading-relaxed">
								{active.description}
							</p>
						</div>

						{/* Stats/Properties */}
						<div className="grid grid-cols-1 gap-4">
							<div className="bg-white/5 rounded-xl p-6 border border-white/10">
								<h4 className="text-white font-semibold mb-2 text-base">
									Type
								</h4>
								<p className="text-slate-300 text-sm lg:text-base">
									Boolean Logic Operator
								</p>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Benefits;
