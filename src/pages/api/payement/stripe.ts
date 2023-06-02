// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PaymentIntent } from '@stripe/stripe-js';
import type { NextApiRequest, NextApiResponse } from 'next'


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { items } = req.body;
  console.log(stripe)

  const referer = req.headers.referer || 'https://example.com'; // Fallback URL

 const session= await stripe.checkout.sessions.create({
  line_items: [
    {
      // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
      price: 'price_1NDtlEL8uKxb9Hfaz5CIb6M6',
      quantity: 10,
    },
  ],
  mode: 'payment',
 
  success_url: `${referer}?success=true`,
  cancel_url: `${referer}?canceled=true`,
});
 
  
  res.status(200).json({sessionId:session.id})
}
