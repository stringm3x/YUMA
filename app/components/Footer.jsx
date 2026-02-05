import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full text-white bg-bg">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col-reverse lg:flex-row items-start lg:items-center justify-between gap-12">
        {/* Izquierda */}
        <div className="flex flex-col space-y-6">
          {/* Instagram */}
          <div className="flex items-start space-x-3">
            <Instagram size={20} className="self-center" />
            <div className="flex flex-col leading-tight">
              <a
                href="https://instagram.com/YUMA_EQUIPMENT"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                YUMA_EQUIPMENT
              </a>
            </div>
          </div>

          {/* Facebook */}
          <div className="flex items-center space-x-3">
            <Facebook size={20} />
            <a
              href="https://facebook.com/YUMA"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              YUMA
            </a>
          </div>

          {/* Número */}
          <div className="leading-tight">
            <p className="text-zinc uppercase mb-1">Número</p>
            <p>Cel. +52 55 4344 0865</p>
          </div>

          {/* Email */}
          <div className="leading-tight">
            <p className="text-zinc uppercase mb-1">Email</p>
            <a href="mailto:yuma@outlook.com" className="hover:underline">
              yuma@outlook.com
            </a>
          </div>
        </div>

        {/* Centro */}
        <div className="flex flex-col items-center space-y-4 flex-shrink-0">
          <Image src="/YUMA.png" width={120} height={120} alt="YUMA Logo" />
          <p className="text-gray text-sm">© Derechos reservados 2025</p>
        </div>

        {/* Derecha */}
        <div className="flex flex-col space-y-4">
          <p className="text-white text-lg font-bold">Páginas</p>
          <nav className="flex flex-col space-y-1">
            <Link href="/">
              <span className="text-zinc hover:text-white">Inicio</span>
            </Link>
            <Link href="/Men">
              <span className="text-zinc hover:text-white">Hombres</span>
            </Link>
            <Link href="/Women">
              <span className="text-zinc hover:text-white">Mujeres</span>
            </Link>
            <Link href="/Design">
              <span className="text-zinc hover:text-white">Diseña</span>
            </Link>
            <Link href="/About">
              <span className="text-zinc hover:text-white">Nosotros</span>
            </Link>
          </nav>
          <Link href="/Privacy">
            <span className="underline text-white">Aviso de privacidad</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
