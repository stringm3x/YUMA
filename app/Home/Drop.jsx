import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../../lib/shopify";
import Image from "next/image";

export default async function Drop() {
  // 1. Trae hasta 4 productos
  const products = await getAllProducts(4);
  const count = 4;
  const displayProducts =
    products.length >= count
      ? products.slice(0, count)
      : Array.from({ length: count }, () => products[0]);

  return (
    <section className="py-20 flex flex-col gap-20">
      <div className="relative flex flex-col">
        <Image
          src="/dropimg.png"
          width={1000}
          height={1000}
          alt="Drop"
          className="relative"
        />

        <div className="absolute flex flex-col gap-5 self-center bottom-0">
          <h1 className="text-5xl md::text-8xl lg:text-9xl font-bold">NUEVO DROP</h1>
          <h1 className="text-xl md:text-4xl lg:text-5xl text-center">AGOSTO</h1>
        </div>
      </div>

      <div className="flex space-x-8 overflow-x-auto no-scrollbar px-3">
        {displayProducts.map((product, idx) => {
          // opcional: puedes añadir un badge o resaltado si quieres
          let badge = "";
          let highlighted = false;
          if (idx === 0) {
            badge = "New Drop";
            highlighted = true;
          }

          return (
            <ProductCard
              key={`${product.id}-${idx}`}
              product={product}
              badge={badge}
              highlighted={highlighted}
            />
          );
        })}
      </div>
    </section>
  );
}
