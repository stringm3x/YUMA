import React from "react";
import Image from "next/image";

const sections = [
  {
    title: "Equipo",
    img: "/sections/equipo.png",
    bg: "bg-gray",
    span: "",
  },
  {
    title: "Nuevo",
    img: "/sections/nuevo.png",
    bg: "bg-gray",
    span: "",
  },
  {
    title: "Ropa YUMA",
    img: "/sections/ropa.png",
    bg: "bg-gray",
    span: "",
  },
  {
    title: "Promociones",
    img: "/sections/promociones.png",
    bg: "",
    span: "row-span-2",
  },
  {
    title: "Personalizados",
    img: "/sections/personalizados.png",
    bg: "bg-gray",
    span: "",
  },
];

const Menu = () => {
  return (
    <section className="sm:h-screen py-20 px-5 lg:px-10">
      <div className="h-full grid grid-rows-12 md:grid-cols-3 md:grid-rows-5 gap-5">
        {/* Shorts */}
        <div className="relative bg-white border col-span-1 row-span-2 justify-items-center p-5 overflow-hidden">
          <Image
            className="absolute"
            src="/men/mockupall.png"
            alt="mockupall"
            width={90}
            height={100}
          />
          <div className="relative flex flex-col h-full justify-end">
            <h1 className="text-red text-3xl lg:text-4xl font-bold">SHORTS</h1>
            <button className="border-2 w-44 py-2 rounded-2xl bg-black">
              Ver
            </button>
          </div>
        </div>

        {/* Promociones */}
        <div className="relative col-span-1 row-span-5 bg-white content-end justify-items-center p-5 overflow-hidden">
          <Image
            src="/men/promotion.jpeg"
            fill
            alt="promotion"
            className="absolute object-cover"
          />
          <div className="relative flex flex-col gap-3 items-center">
            <h1 className="text-2xl lg:text-3xl  font-bold">PROMOCIONES</h1>
            <button className="border-2 w-44 py-2 rounded-2xl">Ver</button>
          </div>
        </div>

        {/* Conjuntos */}
        <div className="relative col-span-1 row-span-3 bg-gray justify-items-center p-5 overflow-hidden">
          <Image
            className="absolute"
            src="/men/mockupall.png"
            alt="mockupall"
            width={180}
            height={200}
          />
          <div className="relative flex flex-col h-full justify-end">
            <h1 className="text-black text-3xl lg:text-4xl font-bold">CONJUNTOS</h1>
            <button className="border-2 w-44 py-2 rounded-2xl bg-black">
              Ver
            </button>
          </div>
        </div>

        {/* Playeras */}
        <div className="relative col-span-1 row-span-3 bg-gray justify-items-center p-5 overflow-hidden">
          <Image
            className="absolute"
            src="/men/mockupall.png"
            alt="mockupall"
            width={180}
            height={200}
          />
          <div className="relative flex flex-col h-full justify-end">
            <h1 className="text-black text-3xl lg:text-4xl font-bold">PLAYERAS</h1>
            <button className="border-2 w-44 py-2 rounded-2xl bg-black">
              Ver
            </button>
          </div>
        </div>

        {/* Pants */}
        <div className="relative col-span-1 row-span-2 bg-white justify-items-center p-5 overflow-hidden">
          <Image
            className="absolute"
            src="/men/mockupall.png"
            alt="mockupall"
            width={90}
            height={200}
          />
          <div className="relative flex flex-col h-full justify-end">
            <h1 className="text-red text-3xl lg:text-4xl font-bold">PANTS</h1>
            <button className="border-2 w-44 py-2 rounded-2xl bg-black">
              Ver
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
