import ProductDetails from './ProductDetails'
import { getProductByHandle } from '../../../lib/shopify'
import { notFound } from 'next/navigation'

export default async function ProductPage({ params }) {
  const data = await getProductByHandle(params.handle)
  if (!data) return notFound()

  return <ProductDetails product={data} />
}
