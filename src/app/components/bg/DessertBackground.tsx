import Image from "next/image";

const DessertBackground: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-50] bg-gradient-to-br from-[#2A1810] via-[#342016] to-[#1F1209] overflow-hidden">
      <div 
        className="absolute -top-[120px] -left-[120px] w-96 h-96 bg-gradient-to-r from-[#B2842E] to-[#D4A574] opacity-15 blur-[80px] rounded-full animate-pulse" 
      />
      <div 
        className="absolute top-[20%] -right-[100px] w-80 h-80 bg-gradient-to-l from-[#C9965F] to-[#B2842E] opacity-12 blur-[70px] rounded-full animate-pulse"
        style={{ animationDelay: '1s' }} 
      />
      <div 
        className="absolute -bottom-[100px] -right-[100px] w-96 h-96 bg-gradient-to-t from-[#B2842E] to-[#E6C79C] opacity-15 blur-[80px] rounded-full animate-pulse"
        style={{ animationDelay: '0.5s' }} 
      />
      <div 
        className="absolute bottom-[30%] -left-[80px] w-72 h-72 bg-gradient-to-br from-[#D4A574] to-[#B2842E] opacity-10 blur-[60px] rounded-full animate-pulse"
        style={{ animationDelay: '2s' }} 
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#B2842E] opacity-5 blur-[120px] rounded-full animate-pulse"
        style={{ animationDelay: '1.5s' }} 
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#342016]/20 to-[#342016]/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#342016]/30 via-transparent to-[#342016]/20" />

      <Image
        src="/dessert/strawberry.svg"
        alt="Strawberry"
        width={120}
        height={120}
        className="absolute top-[8%] left-[5%] dessert-float-up opacity-80 hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
        style={{ 
          animationDuration: '7s',
          animationDelay: '0s' 
        }}
      />
      
      <Image
        src="/dessert/cake.svg"
        alt="Cake"
        width={150}
        height={150}
        className="absolute top-[25%] right-[6%] dessert-float-right opacity-90 hover:opacity-100 transition-opacity duration-300 drop-shadow-xl"
        style={{ 
          animationDuration: '8s',
          animationDelay: '1.5s' 
        }}
      />
      
      <Image
        src="/dessert/matcha.svg"
        alt="Matcha"
        width={130}
        height={130}
        className="absolute bottom-[20%] left-[8%] dessert-float-left opacity-85 hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
        style={{ 
          animationDuration: '6.5s',
          animationDelay: '3s' 
        }}
      />
      
      <Image
        src="/dessert/bluehawaii.svg"
        alt="Blue Hawaii"
        width={140}
        height={140}
        className="absolute bottom-[8%] right-[12%] dessert-float-diagonal opacity-90 hover:opacity-100 transition-opacity duration-300 drop-shadow-xl"
        style={{ 
          animationDuration: '7.5s',
          animationDelay: '0.8s' 
        }}
      />
      
      <Image
        src="/dessert/macaron.svg"
        alt="Macaron"
        width={100}
        height={100}
        className="absolute top-[15%] left-[35%] dessert-float-up opacity-75 hover:opacity-100 transition-opacity duration-300 drop-shadow-md"
        style={{ 
          animationDuration: '6s',
          animationDelay: '2.2s' 
        }}
      />

      <Image
        src="/dessert/strawberry.svg"
        alt="Strawberry"
        width={80}
        height={80}
        className="absolute top-[60%] left-[25%] dessert-float-right opacity-60 hover:opacity-90 transition-opacity duration-300 drop-shadow-md"
        style={{ 
          animationDuration: '8.5s',
          animationDelay: '4.1s' 
        }}
      />
      
      <Image
        src="/dessert/macaron.svg"
        alt="Macaron"
        width={110}
        height={110}
        className="absolute bottom-[40%] right-[40%] dessert-float-left opacity-70 hover:opacity-95 transition-opacity duration-300 drop-shadow-lg"
        style={{ 
          animationDuration: '7.2s',
          animationDelay: '5.3s' 
        }}
      />
      
      <Image
        src="/dessert/cake.svg"
        alt="Cake"
        width={90}
        height={90}
        className="absolute top-[45%] right-[25%] dessert-float-diagonal opacity-65 hover:opacity-90 transition-opacity duration-300 drop-shadow-md"
        style={{ 
          animationDuration: '6.8s',
          animationDelay: '1.7s' 
        }}
      />

      <div 
        className="absolute top-[20%] left-[20%] w-2 h-2 bg-[#E6C79C] rounded-full animate-ping opacity-40"
        style={{ animationDelay: '0.5s' }}
      />
      <div 
        className="absolute top-[70%] left-[60%] w-1 h-1 bg-[#D4A574] rounded-full animate-ping opacity-50"
        style={{ animationDelay: '2.1s' }}
      />
      <div 
        className="absolute top-[40%] right-[15%] w-1.5 h-1.5 bg-[#B2842E] rounded-full animate-ping opacity-45"
        style={{ animationDelay: '3.7s' }}
      />
      <div 
        className="absolute bottom-[30%] left-[70%] w-1 h-1 bg-[#E6C79C] rounded-full animate-ping opacity-40"
        style={{ animationDelay: '1.3s' }}
      />
    </div>
  );
};

export default DessertBackground;