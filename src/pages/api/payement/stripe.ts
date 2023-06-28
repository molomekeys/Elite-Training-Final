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
      hours:true,isPaid:true,type_offer:true,offer_prisma_id:{
        select:{
          stripe_id:true
        }
      },programme_selling_id:{
        select:{
          stripe_id:true
        }
      }
    }
  })
  console.log(fetchBill)
  if(fetchBill)
  {
  const {hours,offer_prisma_id,isPaid,programme_selling_id,type_offer}=fetchBill
  


 const session= await stripe.checkout.sessions.create({
  line_items: [
    {
      // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
      price: type_offer.toLocaleLowerCase()=='coaching'? offer_prisma_id?.stripe_id : programme_selling_id?.stripe_id ,
      quantity: type_offer.toLocaleLowerCase()=='coaching'? hours: 1,
    },
  ],
  mode: 'payment',
 metadata:{
billIdForDb:`${idBill}`
 },
  success_url: `${referer}?success=true`,
  cancel_url: `${referer}?canceled=true`,
})
res.status(200).json({sessionId:session.id})

}
 
  
}
