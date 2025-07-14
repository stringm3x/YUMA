import Image from "next/image";
import React from "react";

const Add = () => {
  return (
    <section className="relative h-80 p-3 sm:p-10">
      <Image
        src="/women/addwomen.png"
        alt="add"
        fill
        className="object-cover absolute brightness-75"
      />

      <div className="relative text-5xl sm:text-7xl lg:text-8xl font-bold leading-1">
        <h1>DESCUBRE</h1>
        <h1>NUEVAS</h1>
        <h1>PROMOCIONES</h1>
      </div>

      <div className="relative">
        <button className="w-32 py-2 rounded-2xl bg-white text-black font-bold">
          Ver
        </button>
      </div>
    </section>
  );
};

export default Add;
