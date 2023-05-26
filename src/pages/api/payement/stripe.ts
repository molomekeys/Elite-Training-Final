// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PaymentIntent } from '@stripe/stripe-js';
import type { NextApiRequest, NextApiResponse } from 'next'


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { items } = req.body;
  console.log(stripe)
  const paymentIntent:PaymentIntent = await stripe.paymentIntents.create({
    amount: 50,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
