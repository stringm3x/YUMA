import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="relative h-80 content-center p-10">
      <Image
        src="/women/womenhero.png"
        alt="women"
        fill
        className="absolute object-cover"
      />

      <div className="relative justify-items-start">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold">Mujeres</h1>
      </div>
    </section>
  );
};

export default Hero;
