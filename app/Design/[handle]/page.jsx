import { getProductByHandle } from "../../../lib/shopify";
import CustomizerPage from "../components/CustomizerPage";

export default async function Page({ params }) {
  const { handle } = params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return (
      <div className="text-white text-2xl p-10">
        El conjunto no existe o fue removido.
      </div>
    );
  }

  return <CustomizerPage product={product} />;
}
