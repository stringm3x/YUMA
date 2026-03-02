"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: "SHORTS",
    img: "/men/mockupall.png",
    link: "/Men/Shorts",
    color: "from-accent-gold",
    size: "small",
  },
  {
    title: "PROMOCIONES",
    img: "/men/promotion.jpeg",
    link: "/Men/Promotions",
    color: "from-accent-red",
    size: "large",
    featured: true,
  },
  {
    title: "CONJUNTOS",
    img: "/men/mockupall.png",
    link: "/Men/Sets",
    color: "from-accent-blue",
    size: "medium",
  },
  {
    title: "PLAYERAS",
    img: "/men/mockupall.png",
    link: "/Men/Tshirts",
    color: "from-accent-purple",
    size: "medium",
  },
  {
    title: "PANTS",
    img: "/men/mockupall.png",
    link: "/Men/Pants",
    color: "from-accent-green",
    size: "small",
  },
];

const Menu = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Animación de entrada
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    ).fromTo(
      cardsRef.current,
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.2)",
      },
      "-=0.3"
    );
  }, []);

  // Función para hover effects
  const handleCardHover = (index, isHover) => {
    gsap.to(cardsRef.current[index], {
      scale: isHover ? 1.02 : 1,
      boxShadow: isHover
        ? "0 30px 60px rgba(0,0,0,0.5)"
        : "0 20px 40px rgba(0,0,0,0.3)",
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(cardsRef.current[index].querySelector(".card-image"), {
      scale: isHover ? 1.1 : 1,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(cardsRef.current[index].querySelector(".card-button"), {
      backgroundColor: isHover ? "#f6c75e" : "#000000",
      color: isHover ? "#000000" : "#FFFFFF",
      scale: isHover ? 1.05 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título de sección */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            CATEGORÍAS
          </h2>
          <p className="text-neutral-gray text-base md:text-lg max-w-2xl mx-auto">
            Explora nuestra colección para hombre, diseñada para cada momento de
            tu día
          </p>
          <div className="w-24 h-1 bg-accent-gold mx-auto mt-6 rounded-full" />
        </div>

        {/* Grid de categorías */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]">
          {categories.map((category, index) => {
            // Definir tamaño según la propiedad
            let colSpan = "md:col-span-1";
            let rowSpan = "md:row-span-1";

            if (category.size === "large") {
              colSpan = "md:col-span-2";
              rowSpan = "md:row-span-2";
            } else if (category.size === "medium") {
              rowSpan = "md:row-span-2";
            }

            return (
              <Link
                key={category.title}
                href={category.link}
                className={`${colSpan} ${rowSpan}`}
              >
                <div
                  ref={(el) => (cardsRef.current[index] = el)}
                  onMouseEnter={() => handleCardHover(index, true)}
                  onMouseLeave={() => handleCardHover(index, false)}
                  className="relative h-full rounded-3xl overflow-hidden cursor-pointer group"
                >
                  {/* Imagen de fondo */}
                  <div className="absolute inset-0">
                    <Image
                      src={category.img}
                      alt={category.title}
                      fill
                      className="object-cover card-image transition-transform duration-700"
                    />
                  </div>

                  {/* Overlay con gradiente */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${category.color} via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500`}
                  />

                  {/* Overlay oscuro adicional */}
                  <div className="absolute inset-0 bg-primary-black/40 group-hover:bg-primary-black/30 transition-colors duration-500" />

                  {/* Contenido */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center">
                    <h3 className="text-white text-3xl md:text-4xl font-black mb-4 drop-shadow-2xl">
                      {category.title}
                    </h3>

                    <button className="card-button px-8 py-3 bg-primary-black text-white font-bold rounded-full transform transition-all duration-300 hover:shadow-xl border-2 border-white/20">
                      Ver Colección
                    </button>

                    {/* Badge de oferta para promociones */}
                    {category.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-accent-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                          HASTA 50% OFF
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-shine" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Categorías adicionales en grid inferior */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {["ACCESORIOS", "CALZADO", "BOLSOS", "GORRAS"].map((item, idx) => (
            <Link
              key={item}
              href={`/Men/${item.toLowerCase()}`}
              className="group"
            >
              <div className="relative h-32 bg-neutral-black/50 rounded-2xl overflow-hidden border border-neutral-zinc/20 hover:border-accent-gold/50 transition-all duration-300">
                <div className="absolute inset-0 flex items-center justify-between px-6">
                  <span className="text-white font-bold text-lg group-hover:text-accent-gold transition-colors">
                    {item}
                  </span>
                  <svg
                    className="w-5 h-5 text-neutral-gray group-hover:text-accent-gold transform group-hover:translate-x-1 transition-all duration-300"
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
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        .animate-shine {
          animation: shine 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default Menu;
