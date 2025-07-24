import ProductCard from "../../components/ProductCard";
import { getAllProducts } from "../../../lib/shopify";

export default async function Sets() {
  const products = await getAllProducts(8);
  const count = 4;

  const customProducts = products.filter((p) =>
    p.options?.some(
      (opt) =>
        opt.name.toLowerCase() === "personalizable" &&
        opt.values.some((val) => val.toLowerCase() === "custom")
    )
  );

  console.log(
    products.map((p) => ({
      title: p.title,
      options: p.options,
      variants: p.variants,
    }))
  );

  const displayProducts = customProducts.slice(0, count);

  return (
    <section className="py-12 space-y-20">
      <h1 className="text-3xl lg:text-5xl text-white mb-8 px-5 md:px-10">
        Elige un Conjunto
      </h1>

      <div className="flex space-x-8 overflow-x-auto no-scrollbar px-3">
        {displayProducts.length === 0 ? (
          <div className="text-white text-xl">
            No hay conjuntos personalizables aún.
          </div>
        ) : (
          displayProducts.map((product, idx) => {
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
          })
        )}
      </div>
    </section>
  );
}
