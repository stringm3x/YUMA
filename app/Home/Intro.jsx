"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar plugin de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: "1",
    title: "PERSONALIZADO",
    img: "/sections/personalizado.png",
    link: "/Design",
    color: "from-accent-purple",
  },
  {
    id: "2",
    title: "MUJERES",
    img: "/sections/mujeres.png",
    link: "/Women",
    color: "from-accent-gold",
  },
  {
    id: "3",
    title: "HOMBRES",
    img: "/sections/hombre.png",
    link: "/Men",
    color: "from-accent-blue",
  },
  {
    id: "4",
    title: "DISEÑA",
    img: "/sections/diseña.png",
    link: "/Design",
    color: "from-accent-green",
  },
];

const Intro = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const videoRef = useRef(null);
  const videoTextRef = useRef(null);

  useEffect(() => {
    // Animación de entrada del título
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    ).fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    // Animación de las cards con stagger
    gsap.fromTo(
      cardsRef.current,
      { y: 100, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animación de la sección de video
    gsap.fromTo(
      videoRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      videoTextRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Hover effect para las cards con GSAP
  const handleCardHover = (index, isHover) => {
    gsap.to(cardsRef.current[index], {
      scale: isHover ? 1.05 : 1,
      boxShadow: isHover
        ? "0 20px 40px rgba(0,0,0,0.3)"
        : "0 10px 20px rgba(0,0,0,0.2)",
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(cardsRef.current[index].querySelector(".card-overlay"), {
      opacity: isHover ? 1 : 0,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(cardsRef.current[index].querySelector(".card-image"), {
      scale: isHover ? 1.1 : 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-primary-black py-24 md:py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-20">
          <p
            ref={titleRef}
            className="text-neutral-gray text-lg md:text-xl tracking-[0.3em] uppercase mb-4"
          >
            Bienvenido a
          </p>
          <h2
            ref={subtitleRef}
            className="font-black text-6xl md:text-7xl lg:text-8xl text-white relative inline-block"
          >
            YUMA
            <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-accent-gold to-accent-purple rounded-full" />
          </h2>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-32">
          {cards.map((item, index) => (
            <Link key={item.id} href={item.link} className="block">
              <div
                ref={(el) => (cardsRef.current[index] = el)}
                onMouseEnter={() => handleCardHover(index, true)}
                onMouseLeave={() => handleCardHover(index, false)}
                className="relative group cursor-pointer"
              >
                {/* Card principal */}
                <div className="relative h-[400px] sm:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden bg-neutral-black">
                  {/* Gradiente de fondo */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${item.color} to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-500 z-10`}
                  />

                  {/* Imagen de fondo */}
                  <div className="absolute inset-0">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover card-image transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>

                  {/* Overlay con efecto */}
                  <div className="card-overlay absolute inset-0 bg-gradient-to-t from-primary-black via-transparent to-transparent opacity-0 transition-opacity duration-300 z-20" />

                  {/* Contenido de la card */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                    <h3 className="text-white text-3xl md:text-4xl font-black mb-2 drop-shadow-lg">
                      {item.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-accent-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm uppercase tracking-wider">
                        Explorar
                      </span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Etiqueta decorativa */}
                  <div className="absolute top-4 right-4 z-30">
                    <span className="text-xs font-bold text-white bg-primary-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                      0{index + 1}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Sección de video/destacado */}
        <div ref={videoRef} className="relative origin-left">
          <div className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden">
            {/* Fondo con gradiente animado */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple via-accent-gold to-accent-blue animate-gradient" />

            {/* Overlay oscuro */}
            <div className="absolute inset-0 bg-primary-black/60 backdrop-blur-sm" />

            {/* Contenido */}
            <div
              ref={videoTextRef}
              className="relative h-full flex flex-col items-center justify-center text-center px-4"
            >
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4">
                Diseñados para ganar.
              </h3>
              <p className="text-neutral-gray text-base md:text-xl lg:text-2xl max-w-2xl">
                Descubre nuestros nuevos drop del mes.
              </p>

              {/* Botón de acción */}
              <button className="mt-8 group flex items-center space-x-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 py-3 rounded-full transition-all duration-300 border border-white/20">
                <span className="uppercase text-sm tracking-wider">
                  Ver colección
                </span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Intro;
