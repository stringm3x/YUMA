import { getProductByHandle } from "../../../lib/shopify";
import Image from "next/image";

export default async function DesignProductPage({ params }) {
  const { handle } = params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return (
      <div className="p-20 text-center text-white">
        <h1>No se encontró el conjunto</h1>
      </div>
    );
  }

  return (
    <section className="flex flex-col lg:flex-row gap-8 p-20 h-screen">
      {/* Muestra las prendas incluidas */}
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold">{product.title}</h1>
        <p className="text-gray text-lg">{product.description}</p>
        {product.images?.edges?.map((img, i) => (
          <div key={i} className="w-64 h-64 relative">
            <Image
              src={img.node.url}
              alt={img.node.altText || ""}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* colores, logos, uploads, etc */}
      <div className="flex-1 bg-black rounded-lg p-6">
        <h2 className="text-2xl mb-4 text-white">Personaliza tu conjunto</h2>
        <p className="text-gray">Ejemplo de zona para colores, logos, etc.</p>
      </div>
    </section>
  );
}
