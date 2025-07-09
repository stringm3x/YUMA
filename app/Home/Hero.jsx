import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <h1 className="absolute font-passion text-[40vw] md:text-[30vw] leading-none text-white">
        YUMA
      </h1>

      <Image
        src="/hero.png"
        alt="hero"
        width={1000}
        height={1000}
        objectFit="cover"
        className="top-0 left-0 z-10"
        priority
      />
    </section>
  );
};

export default Hero;
