import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">

      <Image
        src="/YUMASTAR.png"
        alt="YUMA"
        width={1500}
        height={1000}
        objectFit="cover"
        className="top-0 left-0 z-10"
        priority
      />
    </section>
  );
};

export default Hero;
