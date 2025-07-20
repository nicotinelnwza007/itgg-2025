import Image from "next/image";

const DessertBackground: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-50] bg-gradient-to-br from-[#2A1810] via-[#342016] to-[#1F1209] overflow-hidden">

      {/* Static SVG Pattern Background */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-5"
        style={{
          backgroundImage: 'url(/line.svg)',
        }}
      />

      {/* Soft Gradient Blurs - Optimized with fewer + simpler ones */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#B2842E] opacity-10 blur-[60px] rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#E6C79C] opacity-10 blur-[60px] rounded-full" />
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] bg-[#B2842E] opacity-5 blur-[100px] rounded-full" />

      {/* Animated Dessert Images - Reduced, GPU-optimized with translateY */}
      <FloatingImage src="/dessert/hawaii.svg" alt="Hawaii" className="top-[8%] left-[5%]" width={100} delay="0s" />
      <FloatingImage src="/dessert/macaron.svg" alt="Macaron" className="top-[25%] right-[6%]" width={120} delay="1s" />
      <FloatingImage src="/dessert/matcha.svg" alt="Matcha" className="bottom-[20%] left-[8%]" width={110} delay="2s" />
      <FloatingImage src="/dessert/strawberry.svg" alt="Strawberry" className="bottom-[8%] right-[12%]" width={110} delay="3s" />
      <FloatingImage src="/dessert/cake.svg" alt="Cake" className="top-[15%] left-[35%]" width={80} delay="4s" />

      {/* Ping Dots */}
      <PingDot top="20%" left="20%" delay="0.5s" />
      <PingDot top="70%" left="60%" delay="2.1s" />
      <PingDot top="40%" right="15%" delay="3.7s" />
      <PingDot bottom="30%" left="70%" delay="1.3s" />
    </div>
  );
};

// Floating image component with animation
function FloatingImage({
  src,
  alt,
  className,
  width,
  delay,
}: {
  src: string;
  alt: string;
  className: string;
  width: number;
  delay: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={width}
      className={`absolute ${className} animate-floating transition-opacity duration-300 opacity-70 hover:opacity-100`}
      style={{
        animationDelay: delay,
        zIndex: 3,
      }}
    />
  );
}

// Ping dot component
function PingDot({
  top,
  left,
  right,
  bottom,
  delay,
}: {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: string;
}) {
  return (
    <div
      className="absolute w-1.5 h-1.5 bg-[#E6C79C] rounded-full animate-ping opacity-40"
      style={{
        top,
        left,
        right,
        bottom,
        animationDelay: delay,
        zIndex: 4,
      }}
    />
  );
}

export default DessertBackground;
