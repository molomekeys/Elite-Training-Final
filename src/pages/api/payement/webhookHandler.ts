
import { NextApiResponse,NextApiRequest } from 'next'
import {buffer} from 'micro'
import Stripe from 'stripe'
import { env } from '~/env.mjs'
import { prisma } from '~/server/db'
export const config={
    api:{
        bodyParser:false
    }
}

export default async function webhookHandler(req:NextApiRequest,res:NextApiResponse){
   

  
        const stripe:Stripe = require('stripe')(env.STRIPE_SECRET_KEY)
        const endPointSecret='whsec_2cb155c70789924e550d846d3aa11e66f614a02abee6d5d43a11b457acba0a32'
        if(req.method==='GET'){
            res.status(200).json({momo:'slt'})
          
        }
        if(req.method==='POST'){
       

                
               
                let requestBuffer = await buffer(req)
          
                const payLoad=requestBuffer.toString()

                let sig= req.headers["stripe-signature"]
                let event:Stripe.Event;
                
           
          try {

            if(sig!=undefined)
            {
                event=stripe.webhooks.constructEvent(payLoad,sig,endPointSecret)
                if(event.type=='checkout.session.completed')
                {
                    const session =event.data.object as Stripe.Checkout.Session;
                    const {metadata}=session


                res.status(200).send('success');
                if(metadata?.billIdForDb!=undefined)
                {
                    const changeDataOnDb= await prisma.billing.update({
                        where:{
                            id:Number(metadata?.billIdForDb)
                        },data:{
                            isPaid:true
                        }
                    })
                    const changeEvent = await prisma.events.updateMany({
                        where:{
                            billing_id:Number(metadata?.billIdForDb)
                        },data:{
                            isPaid:true
                        }
                    })
                }
                }
                else{
                    console.log('autre event test ')
                }
            }
          } catch (error) {
            console.log('webhook error ')
         
            return res.status(400).send('webhook error message')
          }
       

          
        //   const changingEvent=await prisma.billing.update({
        //     where:ses
        //   })


    }



}




