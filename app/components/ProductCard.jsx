import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  const img = product.images?.edges?.[0]?.node;

  // Verifica si el producto es personalizable/conjunto
  const isCustom = product.options?.some(
    (opt) =>
      opt.name.toLowerCase() === "personalizable" &&
      opt.values.some((val) => val.toLowerCase() === "custom")
  );

  // Ruta según el tipo de producto
  const href = isCustom
    ? `/Design/${product.handle}`
    : `/product/${product.handle}`;

  return (
    <Link href={href}>
      <div className="block cursor-pointer">
        <div className="relative w-[220px] h-64 lg:w-[250px] lg:h-64 bg-white p-5">
          {img && (
            <Image
              src={img.url}
              alt={img.altText || product.title}
              fill
              className="object-cover absolute"
            />
          )}
        </div>
        <div className="flex flex-col py-3">
          <h1 className="text-xl font-semibold text-white">{product.title}</h1>
          <h1 className="text-xl text-white">
            {product.priceRange?.minVariantPrice?.amount}{" "}
            {product.priceRange?.minVariantPrice?.currencyCode}
          </h1>
        </div>
      </div>
    </Link>
  );
}
