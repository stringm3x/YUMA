"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.inOut" }
    )
      .fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "back.out(1.2)" },
        "-=1"
      )
      .fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden"
    >
      <Image
        src="/about/hero-about.jpg"
        alt="YUMA - Pasión por el deporte"
        fill
        className="object-cover"
        priority
      />

      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-r from-primary-black via-primary-black/80 to-transparent"
      />

      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            <span className="text-accent-gold text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-4 block">
              YUMA EST. 2020
            </span>

            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-6"
            >
              MÁS QUE <span className="text-accent-gold">ROPA</span>
            </h1>

            <div className="w-24 h-1 bg-accent-gold mb-8" />

            <p
              ref={subtitleRef}
              className="text-neutral-gray text-lg md:text-xl lg:text-2xl max-w-xl"
            >
              Somos una marca mexicana que nace del amor por el deporte y la
              pasión por el diseño.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
