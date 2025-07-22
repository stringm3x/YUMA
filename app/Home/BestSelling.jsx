import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../../lib/shopify";

export default async function BestSelling() {
  const products = await getAllProducts(8);
  const count = 4;

  const displayProducts =
    products.length >= count
      ? products.slice(0, count)
      : Array.from({ length: count }, () => products[0]);

  return (
    <section className="py-12 space-y-20">
      <h1 className="text-3xl lg:text-5xl text-white mb-8 px-5 md:px-10">
        LO MÁS VENDIDO
      </h1>

      <div className="flex space-x-8 overflow-x-auto no-scrollbar px-3">
        {displayProducts.map((product, idx) => {
          let badge = "";
          let highlighted = false;
          if (idx === 0) {
            badge = "New Drop";
            highlighted = true;
          }
          if (idx === 2) badge = "Personalizados";

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
