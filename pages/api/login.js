import { shopifyFetch } from '../../lib/shopify'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body

  const mutation = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken { accessToken expiresAt }
        customerUserErrors { message }
      }
    }
  `

  const data = await shopifyFetch(mutation, { input: { email, password } })
  const errors = data.customerAccessTokenCreate.customerUserErrors
  if (errors.length) return res.status(400).json({ error: errors[0].message })

  return res.status(200).json({
    accessToken: data.customerAccessTokenCreate.customerAccessToken.accessToken
  })
}
