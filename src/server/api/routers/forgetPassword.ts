import { number, z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import jwt from 'jsonwebtoken'
import { env } from "~/env.mjs";
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
export const forgetPassword=createTRPCRouter(
    {
        forgetPasswordInfo:publicProcedure.input(z.object({email:z.string()})).mutation(async ({ctx,input})=>{
                const {prisma,session}=ctx
                const {email}=input
                const findUser=await prisma.user.findUnique({
                    where:{
                        email:email
                    },select:{
                        password:true,email:true,name:true
                    }
                   
                })
                if(findUser!=null){
                    const token=jwt.sign({email:email},env.ACCESS_TOKEN,{expiresIn:'15m' })
                    
                    const sendGridMail={
                        to: email,
                        from :"elitetraining38@gmail.com",
                        templateId:"d-82764b225a1f41a8afe951c28e4d98c8",
                        dynamic_template_data:{
                          url:`https://elite-training-final-6y7w-alpha.vercel.app/reset/${token}`,
                       
                            
                                user_name:findUser.name, user_email:findUser.email,elite_mail:'elitetraining38@gmail.com'
                       
                        }
                    }
                    try {
                        await sgMail.send(sendGridMail);
                        
                        return 'veuillez vérifier votre email'
                    
                    } catch (error) {
                      return `error`
                    }

                }
                else {
                    return "aucun compte n'est associé à cette adresse email"
                }

                
        }),delockJeton:publicProcedure.input(z.string()).mutation(async ({input,ctx})=>{

            
           try {
            const delockValue=jwt.verify(input,env.ACCESS_TOKEN)
                return delockValue
           } catch (error) {
            return 'invalide json'
           }
                
                
            
           

        })
    },
)