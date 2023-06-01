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
 const session= await stripe.checkout.sessions.create({
  line_items: [
    {
      // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
      price: 'price_1NDtCGGU6BKqDgY0joLbL5iZ',
      quantity: 10,
    },
  ],
  mode: 'payment',
 
  success_url: `${req.headers.origin}/?success=true`,
  cancel_url: `${req.headers.origin}/?canceled=true`,
});
 
  
  res.status(200).json({sessionId:session.id})
}
