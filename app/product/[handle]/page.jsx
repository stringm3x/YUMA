import { notFound } from "next/navigation";
import { getProductByHandle } from "../../../lib/shopify";
import ProductDetails from "./ProductDetails";

export default async function ProductPage({ params }) {
  const { handle } = params;
  let product;

  try {
    product = await getProductByHandle(handle);
  } catch (e) {
    console.error(e);
    return notFound();
  }
  if (!product) return notFound();

  return <ProductDetails product={product} />;
}
