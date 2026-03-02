// app/About/components/Values.jsx
"use client";

import { useEffect, useRef } from "react";
import { FaHeart, FaLeaf, FaHandsHelping, FaRocket } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: FaHeart,
    title: "Pasión",
    description: "Amamos lo que hacemos y se refleja en cada prenda",
    color: "from-accent-gold",
  },
  {
    icon: FaLeaf,
    title: "Sustentabilidad",
    description: "Materiales reciclados y producción responsable",
    color: "from-accent-green",
  },
  {
    icon: FaHandsHelping,
    title: "Comunidad",
    description: "Apoyamos el deporte local y talento mexicano",
    color: "from-accent-blue",
  },
  {
    icon: FaRocket,
    title: "Innovación",
    description: "Tecnología y diseño para máximo rendimiento",
    color: "from-accent-purple",
  },
];

export default function Teams() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
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
        stagger: 0.15,
        ease: "back.out(1.2)",
      },
      "-=0.3"
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-primary-black">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-accent-gold text-sm font-bold tracking-[0.3em] uppercase">
            LO QUE NOS MUEVE
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mt-4 mb-6">
            Nuestros valores
          </h2>
          <div className="w-24 h-1 bg-accent-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="group relative bg-neutral-black/50 rounded-3xl p-8 border border-neutral-zinc/20 hover:border-accent-gold/50 transition-all duration-500"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-b ${value.color} to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
              />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-accent-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="text-accent-gold text-3xl" />
                </div>

                <h3 className="text-white text-2xl font-bold mb-3">
                  {value.title}
                </h3>

                <p className="text-neutral-gray">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
