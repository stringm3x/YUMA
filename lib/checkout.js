import { shopifyFetch } from './shopify';

export async function createCheckout(lines) {
  const mutation = `
    mutation CheckoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout { webUrl }
        userErrors { message }
      }
    }
  `;
  const variables = { input: { lineItems: lines } };
  const data = await shopifyFetch(mutation, variables);

  if (data.checkoutCreate.userErrors.length) {
    throw new Error(data.checkoutCreate.userErrors
      .map(err => err.message).join('; ')
    );
  }

  return data.checkoutCreate.checkout.webUrl;
}
