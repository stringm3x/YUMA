import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="relative h-80 content-center p-10">
      <Image
        src="/men/heromen.png"
        alt="men"
        fill
        className="absolute object-cover"
      />

      <div className="relative justify-items-end">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold">HOMBRES</h1>
      </div>
    </section>
  );
};

export default Hero;
