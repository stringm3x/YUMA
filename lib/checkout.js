import { shopifyFetch } from "./shopify";

export async function createCheckout(lines) {
  const mutation = `
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors { message }
      }
    }
  `;
  const variables = {
    input: {
      lines: lines.map((line) => ({
        merchandiseId: line.variantId,
        quantity: line.quantity,
      })),
    },
  };

  const data = await shopifyFetch(mutation, variables);

  if (data.cartCreate.userErrors.length) {
    throw new Error(
      data.cartCreate.userErrors.map((err) => err.message).join("; ")
    );
  }

  return data.cartCreate.cart.checkoutUrl;
}
