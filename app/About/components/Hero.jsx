import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="relative h-screen content-center p-5 sm:p-10">
      <Image
        src="/men/ll.png"
        alt="men"
        fill
        className="absolute object-cover"
      />

      <div className="relative justify-items-center">
        <h1 className="text-6xl sm:text-8xl lg:text-9xl xl:text-[200px] font-black">BIENVENIDO</h1>
      </div>
    </section>
  );
};

export default Hero;

