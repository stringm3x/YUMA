// app/About/components/Story.jsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Content() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(textRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(imageRef.current,
      { x: 50, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-gradient-to-b from-primary-black to-neutral-black">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={textRef} className="space-y-6">
            <span className="text-accent-gold text-sm font-bold tracking-[0.3em] uppercase">
              NUESTRA HISTORIA
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white">
              Hecho en México con <span className="text-accent-gold">pasión</span>
            </h2>
            
            <div className="w-20 h-1 bg-accent-gold" />
            
            <div className="space-y-4 text-neutral-gray text-lg">
              <p>
                YUMA nació en 2020, en medio de una cancha de fútbol rápido en la Ciudad de México. 
                Un grupo de amigos, amantes del deporte, notaron que faltaba ropa que combinara 
                rendimiento y estilo.
              </p>
              <p>
                Lo que comenzó como un proyecto entre amigos, hoy es una marca que viste a 
                atletas en todo México. Cada prenda está diseñada pensando en tu mejor versión.
              </p>
              <p>
                Nos inspira la energía de la ciudad, la disciplina del entrenamiento y la 
                satisfacción de superar tus límites.
              </p>
            </div>
            
            <div className="flex items-center space-x-4 pt-4">
              <div className="w-12 h-12 rounded-full bg-accent-gold/20 flex items-center justify-center">
                <span className="text-accent-gold font-black text-xl">5</span>
              </div>
              <div>
                <p className="text-white font-bold">Años de experiencia</p>
                <p className="text-neutral-gray text-sm">Creando calidad</p>
              </div>
            </div>
          </div>
          
          <div ref={imageRef} className="relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <Image
                src="/about/story-image.jpg"
                alt="Historia YUMA"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Elemento decorativo */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-accent-gold/20 rounded-3xl" />
            <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-accent-gold/20 rounded-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}