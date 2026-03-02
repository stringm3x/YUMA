"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Add = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    ).fromTo(
      buttonRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.2)" },
      "-=0.4"
    );
  }, []);

  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden">
      <Image
        src="/men/addmen.jpeg"
        alt="Promociones"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-r from-primary-black via-primary-black/70 to-transparent" />

      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6">
          <div ref={textRef} className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white">
              DESCUBRE NUEVAS
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black">
              <span className="text-accent-gold">PROMOCIONES</span>
            </h1>
          </div>

          <button
            ref={buttonRef}
            className="mt-8 px-8 py-3 bg-accent-gold text-primary-black font-bold rounded-full hover:bg-accent-gold/90 transition-all duration-300 transform hover:scale-105"
          >
            Ver ofertas
          </button>
        </div>
      </div>
    </section>
  );
};

export default Add;
