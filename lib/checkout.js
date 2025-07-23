import { shopifyFetch } from "./shopify";

export async function createCheckout(lines) {
  const mutation = `
    mutation CheckoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout { webUrl }
        userErrors { message }
      }
    }
  `;
  const lineItems = lines.map((item) => ({
    variantId: item.variantId,
    quantity: item.quantity,
  }));

  const variables = { input: { lineItems } };
  const data = await shopifyFetch(mutation, variables);

  if (data.checkoutCreate.userErrors.length) {
    throw new Error(
      data.checkoutCreate.userErrors.map((err) => err.message).join("; ")
    );
  }

  return data.checkoutCreate.checkout.webUrl;
}
