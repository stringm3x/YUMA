"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Design() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const shirtRef = useRef(null);
  const buttonRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    // Timeline de entrada
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Animación del texto "DISEÑA"
    tl.fromTo(
      textRef.current,
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
      }
    )
      // Animación de la playera
      .fromTo(
        shirtRef.current,
        {
          y: 200,
          opacity: 0,
          rotation: 10,
        },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.2)",
        },
        "-=0.6"
      )
      // Animación del botón
      .fromTo(
        buttonRef.current,
        {
          y: 50,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.2)",
        },
        "-=0.4"
      );

    // Efecto parallax en el fondo
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const rect = sectionRef.current?.getBoundingClientRect();

      if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
        const progress =
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

        // Movimiento sutil de la imagen de fondo
        gsap.to(sectionRef.current, {
          backgroundPositionY: `${progress * 30}px`,
          duration: 0.1,
          ease: "none",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Hover effect en el botón
  const handleButtonHover = (isHover) => {
    gsap.to(buttonRef.current, {
      scale: isHover ? 1.05 : 1,
      backgroundColor: isHover ? "#f6c75e" : "#000000",
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(buttonRef.current.querySelector("span"), {
      color: isHover ? "#000000" : "#FFFFFF",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-[500px] md:h-[600px] lg:h-[700px] xl:h-screen overflow-hidden bg-primary-black"
    >
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0">
        <Image
          src="/field.jpeg"
          alt="Campo deportivo"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay oscuro con gradiente */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-primary-black/70 via-primary-black/30 to-primary-black/70"
        />
      </div>

      {/* Contenido principal */}
      <div className="relative h-full flex flex-col items-center justify-center">
        {/* Texto "DISEÑA" con efecto de glow */}
        <h1
          ref={textRef}
          className="text-7xl sm:text-8xl md:text-[200px] lg:text-[250px] xl:text-[300px] font-black tracking-tighter text-center leading-none"
        >
          <span className="relative">
            <span className="relative z-10 text-accent-gold drop-shadow-2xl">
              DISEÑA
            </span>
            {/* Efecto de glow detrás */}
            <span className="absolute inset-0 blur-3xl bg-accent-gold/30 animate-pulse" />
          </span>
        </h1>

        {/* Playera con sombra */}
        <div ref={shirtRef} className="relative -mt-20 md:-mt-32 lg:-mt-40">
          <Image
            src="/shirtwhite.png"
            alt="Playera blanca para diseñar"
            width={600}
            height={1000}
            className="relative z-20 w-[250px] sm:w-[350px] md:w-[450px] lg:w-[550px] xl:w-[600px] drop-shadow-2xl"
            priority
          />
          {/* Sombra de la playera */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[80%] h-8 bg-black/50 blur-2xl rounded-full" />
        </div>
      </div>

      {/* Botón de acción */}
      <Link
        href="/Design"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50"
      >
        <button
          ref={buttonRef}
          onMouseEnter={() => handleButtonHover(true)}
          onMouseLeave={() => handleButtonHover(false)}
          className="group relative px-8 py-4 bg-primary-black rounded-full overflow-hidden shadow-xl"
        >
          {/* Efecto de brillo en hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent-gold to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Texto */}
          <span className="relative z-10 text-white font-bold text-sm sm:text-base md:text-lg tracking-wider flex items-center space-x-2">
            <span>DISEÑAR AHORA</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </button>
      </Link>

      {/* Elementos decorativos */}
      <div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-accent-gold/20 rounded-tl-3xl" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-accent-gold/20 rounded-br-3xl" />
    </section>
  );
}
