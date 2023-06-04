// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PaymentIntent } from '@stripe/stripe-js';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Stripe } from 'stripe';
import { prisma } from '~/server/db';


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { items } = req.body;
  console.log(stripe)

  const referer = req.headers.referer || 'https://example.com'; // Fallback URL

  const idBill=req.body as number

  const fetchBill=await prisma.billing.findUnique({
    where:{
      id:idBill
    },select:{
      hours:true,isPaid:true,offer_prisma_id:{
        select:{
          stripe_id:true
        }
      }
    }
  })
  console.log(fetchBill)
  if(fetchBill)
  {
  const {hours,offer_prisma_id,isPaid}=fetchBill
  
 const session= await stripe.checkout.sessions.create({
  line_items: [
    {
      // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
      price: offer_prisma_id.stripe_id,
      quantity: hours,
    },
  ],
  mode: 'payment',
 
  success_url: `${referer}?success=true`,
  cancel_url: `${referer}?canceled=true`,
})
res.status(200).json({sessionId:session.id})

}
 
  
}
