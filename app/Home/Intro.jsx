import Image from "next/image";
import React from "react";

const cards = [
  {
    id: "1",
    title: "PERSONALIZADO",
    img: "/sections/personalizado.png",
  },
  {
    id: "2",
    title: "MUJERES",
    img: "/sections/mujeres.png",
  },
  {
    id: "3",
    title: "HOMBRES",
    img: "/sections/hombre.png",
  },
  {
    id: "4",
    title: "DISEÑA",
    img: "/sections/diseña.png",
  },
];

const Intro = () => {
  return (
    <section className="flex flex-col gap-20 py-20">
      <div className="flex flex-col gap-8 items-center">
        <h1 className="text-3xl">Bienvenido a</h1>
        <h1 className="font-passion text-8xl ">YUMA</h1>
      </div>

      <div className="flex flex-wrap gap-10 xl:gap-0 justify-around">
        {cards.map((item) => (
          <div
            key={item.id}
            className="relative group w-64 h-80 p-5 bg-white content-center justify-items-center rounded-2xl overflow-hidden"
          >
            <h1 className="relative z-10 text-red text-[40px] font-black">
              {item.title}
            </h1>
            <div className="absolute inset-0 flex items-center justify-center z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Image
                src={item.img}
                alt={item.title}
                width={600}
                height={500}
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Video */}
      <div className="w-full h-72 border-y-2 border-white content-center">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold">Diseñados para ganar.</h1>
          <h1 className="text-sm sm:text-xl lg:text-2xl text-gray">
            Descubre nuestros nuevos drop del mes.
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Intro;
