import { number, z } from "zod";
import moment from "moment";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import jwt,{JwtPayload} from 'jsonwebtoken'
import { env } from "~/env.mjs";
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

import * as bcrypt from 'bcrypt'
interface CustomPayload extends JwtPayload {
    email: string;
    // Add other properties if needed
  }

export const forgetPassword=createTRPCRouter(
    {
        forgetPasswordInfo:publicProcedure.input(z.object({email:z.string()})).mutation(async ({ctx,input})=>{
                const {prisma,session}=ctx
                
                const newDate =moment().add(30, 'minutes').toDate();
                const date=moment().toDate()
                const findUser=await prisma.user.findUnique({
                    where:{
                        email:input.email
                    },select:{
                        email:true,name:true,password_reset:true
                    }})

                    console.log(findUser)
                    console.log(date)
                    if((findUser?.password_reset!=undefined&&findUser?.password_reset)>date)
                    {

                        return 'un email vous à déjà étais envoyé, veuillez vérifier votre adresse mail'
                    }
                    else if (findUser==null) {
                        return "aucun compte n'est associé à cette adresse email"
                    }
                const  updateData=await prisma.user.update({
                    where:{
                        email:input.email
                    },data:{
                        password_reset:newDate
                    }
                   
                })
                if(updateData!=null){
                    
                    const token=jwt.sign({email:input.email},env.ACCESS_TOKEN,{expiresIn:'30m' })
                    
                    const sendGridMail={
                        to: input.email,
                        from :"elitetraining38@gmail.com",
                        templateId:"d-82764b225a1f41a8afe951c28e4d98c8",
                        dynamic_template_data:{
                          url:`https://elite-training-final-6y7w-alpha.vercel.app/reset/${token}`,
                       
                            
                                user_name:updateData.name, 
                                user_email:updateData.email,elite_mail:'elitetraining38@gmail.com'
                       
                        }
                    }

                    try {
                        await sgMail.send(sendGridMail);
                        
                        return 'veuillez vérifier votre email'
                    
                    } catch (error) {
                      return `error`
                    }

                }
                

                
        }),delockJeton:publicProcedure.input(z.string()).mutation(async ({input,ctx})=>{

            
           try {
            const delockValue=jwt.verify(input,env.ACCESS_TOKEN)
                return delockValue
           } catch (error) {
            return 'invalide json'
           }
                
                
            
           

        }),changePassword:publicProcedure.input(z.object({token:z.string(),newPassword:z.string()})).
        mutation(async({ctx,input})=>{
            const {newPassword,token}=input
            const {prisma,session}=ctx
            try {
                const delockValue=jwt.verify(token,env.ACCESS_TOKEN) as CustomPayload
                const email = delockValue.email;
                const hashedPassword=await bcrypt.hash(newPassword,10)
                   if(typeof delockValue ==='object')
                   {
                    const changePassword=await prisma.user.update({
                        where:{
                            email:email
                        },data:{
                            password:hashedPassword
                        }
                    })
                    if(changePassword){
                        return 'succes'
                    }
                }

               } catch (error) {
                return 'invalide json'
               }
            


        })
    },
)