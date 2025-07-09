// app/components/ProductCard.jsx
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  // Extraemos la primera imagen correctamente
  const img = product.images?.edges?.[0]?.node;

  return (
    <Link href={`/product/${product.handle}`}>
      <div className="block">
        {/* Contenedor de imagen */}
        <div className="relative w-[330px] h-72 bg-white p-5">
          {img && (
            <Image
              src={img.url}
              alt={img.altText || product.title}
              fill
              className="object-cover absolute"
            />
          )}
        </div>

        {/* Información */}
        <div className="flex flex-col py-3">
          {/* Título */}
          <h1 className="text-xl font-semibold text-white">{product.title}</h1>
          {/* Descripción (ajusta esta línea para usar tu campo de descripción) */}
          <h1 className="text-sm text-gray">Camisa Futbol Americano</h1>
          {/* Precio */}
          <h1 className="text-xl text-white">
            {product.priceRange.minVariantPrice.amount}{" "}
            {product.priceRange.minVariantPrice.currencyCode}
          </h1>
        </div>
      </div>
    </Link>
  );
}
