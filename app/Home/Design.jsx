import Image from "next/image";
import Link from "next/link";

export default function Design() {
  return (
    <section className="relative h-80 md:h-96 xl:h-screen py-10">
      {/* Imagen de fondo */}
      <Image
        src="/field.jpeg"
        alt="field"
        fill
        className="absolute inset-0 object-cover"
      />

      {/* Contenido principal */}
      <div className="h-full relative flex flex-col items-center">
        <h1 className="absolute text-8xl sm:text-7xl md:text-[200px] xl:text-[300px] text-red font-black tracking-tight text-center px-4">
          DISEÑA
        </h1>

        <Image
          src="/shirtwhite.png"
          alt="whiteshirt"
          width={600}
          height={1000}
          className="relative bottom-[-170px] w-[300px] sm:w-[400px] md:w-[500px] xl:w-[600px]"
        />
      </div>

      {/* Botón centrado abajo */}
      <Link href="/Design">
        <button className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 bg-bg w-44 sm:w-52 h-12 sm:h-14 rounded-full flex items-center justify-center">
          <span className="text-base sm:text-xl font-bold text-white">
            Diseñar ahora
          </span>
        </button>
      </Link>
    </section>
  );
}
